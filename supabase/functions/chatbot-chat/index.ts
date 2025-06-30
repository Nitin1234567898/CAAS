import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-api-key',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      status: 200,
      headers: corsHeaders 
    })
  }

  try {
    // Get API key
    const apiKey = req.headers.get('X-Api-Key');
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'Missing API key' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }
    
    // Get request body
    const body = await req.json()
    console.log('Request body:', body)
    
    const { chatbotId, message, userId } = body

    if (!chatbotId || !message || !userId) {
      console.log('Missing required fields:', { chatbotId, message, userId })
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Create a Supabase client with the Service Role Key to bypass RLS
    const supabaseAdminClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    // Get chatbot configuration from database using the API key for authentication
    console.log('Fetching chatbot with ID:', chatbotId)
    const { data: chatbot, error: chatbotError } = await supabaseAdminClient
      .from('chatbots')
      .select('*')
      .eq('id', chatbotId)
      .eq('api_key', apiKey) // Authenticate using the API key
      .single()

    console.log('Chatbot query result:', { chatbot, error: chatbotError })

    if (chatbotError || !chatbot) {
      return new Response(
        JSON.stringify({ error: 'Chatbot not found or API key is invalid' }),
        { 
          status: 401, // Use 401 for unauthorized
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Additionally, check if the chatbot is active
    if (chatbot.status !== 'active') {
      return new Response(
        JSON.stringify({ error: 'This chatbot is currently inactive' }),
        { 
          status: 403, // Forbidden
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Get Gemini API key
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY')
    console.log('Gemini API key exists:', !!geminiApiKey)
    
    if (!geminiApiKey) {
      return new Response(
        JSON.stringify({ error: 'Gemini API key not configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Create system prompt with custom personality and knowledge
    const systemPrompt = `You are a custom chatbot with the following configuration:
    
Name: ${chatbot.name}
Personality: ${chatbot.personality || 'Helpful and friendly'}
Knowledge Base: ${chatbot.knowledge_base || 'General knowledge'}

Please respond as this chatbot would, maintaining the specified personality and using the knowledge base when relevant. Keep responses helpful, accurate, and aligned with the chatbot's purpose.`

    console.log('Calling Gemini API...')
    
    // Call Gemini API
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: systemPrompt },
                { text: `User message: ${message}` }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        })
      }
    )

    console.log('Gemini response status:', geminiResponse.status)

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text()
      console.error('Gemini API error:', errorText)
      return new Response(
        JSON.stringify({ error: 'Failed to get response from AI', details: errorText }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const geminiData = await geminiResponse.json()
    console.log('Gemini response data:', geminiData)
    
    const botResponse = geminiData.candidates[0].content.parts[0].text

    // Save chat message to database
    console.log('Saving chat message...')
    await supabaseAdminClient
      .from('chat_messages')
      .insert({
        chatbot_id: chatbotId,
        user_message: message,
        bot_response: botResponse,
        user_id: userId
      })

    if (chatbotError) {
      console.error('Error saving chat message:', chatbotError)
    }

    // Update message count
    console.log('Updating message count...')
    await supabaseAdminClient
      .from('chatbots')
      .update({ message_count: (chatbot.message_count || 0) + 1 })
      .eq('id', chatbotId)

    console.log('Function completed successfully')

    return new Response(
      JSON.stringify({ 
        response: botResponse,
        chatbot: {
          id: chatbot.id,
          name: chatbot.name,
          personality: chatbot.personality
        }
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Function error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
}) 