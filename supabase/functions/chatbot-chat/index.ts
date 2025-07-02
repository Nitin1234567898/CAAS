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

    // Always fetch the latest knowledge_base for this chatbot from the database
    // (This is already done by selecting the chatbot by id above)
    // Use chatbot.knowledge_base in the systemPrompt below
    const systemPrompt = `You are a custom chatbot with the following configuration:
    
Name: ${chatbot.name}
Personality: ${chatbot.personality || 'Helpful and friendly'}
Knowledge Base: ${chatbot.knowledge_base || 'General knowledge'}

Please respond as this chatbot would, maintaining the specified personality and using the knowledge base when relevant. Keep responses helpful, accurate, and aligned with the chatbot's purpose.`