import React, { useState } from 'react';

const IntegrationGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'html' | 'react'>('html');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Integration Guide
          </h1>
          <p className="text-gray-600">
            Learn how to integrate your custom chatbots into your website
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Start */}
            <div className="card">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">🚀 Quick Start</h2>
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-medium text-blue-900 mb-2">Step 1: Get Your API Key</h3>
                  <ol className="text-sm text-blue-800 space-y-1">
                    <li>1. Log into your chatbot dashboard</li>
                    <li>2. Find your chatbot in the list</li>
                    <li>3. Copy the API key (starts with <code>cb_live_</code>)</li>
                    <li>4. Note your chatbot ID</li>
                  </ol>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-medium text-green-900 mb-2">Step 2: Choose Integration Method</h3>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• <strong>HTML/JavaScript</strong> - For basic websites</li>
                    <li>• <strong>React Component</strong> - For React applications</li>
                    <li>• <strong>Custom Implementation</strong> - For advanced users</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Integration Method Tabs */}
            <div className="card">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">📋 Choose Your Integration Method</h2>
                
                {/* Tab Buttons */}
                <div className="flex space-x-2 mb-6">
                  <button
                    onClick={() => setActiveTab('html')}
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                      activeTab === 'html'
                        ? 'bg-primary-color text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    HTML/JavaScript
                  </button>
                  <button
                    onClick={() => setActiveTab('react')}
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                      activeTab === 'react'
                        ? 'bg-primary-color text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                    </svg>
                    React Component
                  </button>
                </div>

                {/* Tab Content */}
                {activeTab === 'html' && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">HTML/JavaScript Integration</h3>
                    <p className="text-gray-600 mb-4">
                      Add this code to your website's HTML to embed your chatbot:
                    </p>
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-sm">
{`<!-- Add this to your website -->
<div id="chatbot-widget" style="position: fixed; bottom: 20px; right: 20px; z-index: 1000;">
  <button id="chatbot-toggle" style="width: 60px; height: 60px; border-radius: 50%; background: #007bff; color: white; border: none; cursor: pointer; font-size: 24px;">💬</button>
  
  <div id="chatbot-container" style="display: none; position: fixed; bottom: 100px; right: 20px; width: 350px; height: 500px; background: white; border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.15);">
    <div style="padding: 16px; background: #007bff; color: white; border-radius: 12px 12px 0 0; font-weight: bold;">AI Assistant</div>
    <div id="chatbot-messages" style="flex: 1; padding: 16px; overflow-y: auto; max-height: 350px;">
      <div style="margin-bottom: 12px; padding: 8px 12px; border-radius: 8px; background: #f5f5f5;">Hello! How can I help you today?</div>
    </div>
    <div style="padding: 16px; border-top: 1px solid #eee;">
      <input type="text" id="message-input" placeholder="Type your message..." style="width: 100%; padding: 8px 12px; border: 1px solid #ddd; border-radius: 20px; outline: none;">
      <button onclick="sendMessage()" style="margin-top: 8px; padding: 8px 16px; background: #007bff; color: white; border: none; border-radius: 20px; cursor: pointer;">Send</button>
    </div>
  </div>
</div>

<script>
// ⚠️ IMPORTANT: Replace these with your actual values
const API_KEY = 'YOUR_API_KEY_HERE'; // Replace with your API key
const CHATBOT_ID = 'YOUR_CHATBOT_ID_HERE'; // Replace with your chatbot ID
const SUPABASE_URL = 'https://your-project-ref.supabase.co'; // Replace with your Supabase URL

let isChatbotOpen = false;
const userId = 'user_' + Math.random().toString(36).substr(2, 9);

// Toggle chatbot visibility
document.getElementById('chatbot-toggle').onclick = function() {
  const container = document.getElementById('chatbot-container');
  isChatbotOpen = !isChatbotOpen;
  container.style.display = isChatbotOpen ? 'block' : 'none';
  
  if (isChatbotOpen) {
    document.getElementById('message-input').focus();
  }
};

// Handle Enter key
document.getElementById('message-input').onkeypress = function(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
};

// Send message function
async function sendMessage() {
  const input = document.getElementById('message-input');
  const message = input.value.trim();
  
  if (!message) return;
  
  // Add user message to chat
  addMessage(message, 'user');
  input.value = '';
  
  try {
    // Call your chatbot API
    const response = await fetch(\`\${SUPABASE_URL}/functions/v1/chatbot-chat\`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': \`Bearer \${API_KEY}\`
      },
      body: JSON.stringify({
        chatbotId: CHATBOT_ID,
        message: message,
        userId: userId
      })
    });
    
    const data = await response.json();
    
    if (data.response) {
      addMessage(data.response, 'bot');
    } else {
      addMessage('Sorry, I encountered an error. Please try again.', 'bot');
    }
  } catch (error) {
    console.error('Error:', error);
    addMessage('Sorry, I encountered an error. Please try again.', 'bot');
  }
}

// Add message to chat
function addMessage(text, sender) {
  const messagesContainer = document.getElementById('chatbot-messages');
  const messageDiv = document.createElement('div');
  messageDiv.style.marginBottom = '12px';
  messageDiv.style.padding = '8px 12px';
  messageDiv.style.borderRadius = '8px';
  messageDiv.style.maxWidth = '80%';
  
  if (sender === 'user') {
    messageDiv.style.background = '#e3f2fd';
    messageDiv.style.marginLeft = 'auto';
  } else {
    messageDiv.style.background = '#f5f5f5';
  }
  
  messageDiv.textContent = text;
  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
</script>`}
                      </pre>
                    </div>
                  </div>
                )}

                {activeTab === 'react' && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">React Integration</h3>
                    <p className="text-gray-600 mb-4">
                      For React applications, create a chatbot component:
                    </p>
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-sm">
{`import React, { useState } from 'react';

const ChatbotWidget = ({ apiKey, chatbotId, supabaseUrl }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: 'Hello! How can I help you today?', sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const userId = 'user_' + Math.random().toString(36).substr(2, 9);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = { text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch(\`\${supabaseUrl}/functions/v1/chatbot-chat\`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': \`Bearer \${apiKey}\`
        },
        body: JSON.stringify({
          chatbotId: chatbotId,
          message: userMessage.text,
          userId: userId
        })
      });

      const data = await response.json();
      
      if (data.response) {
        setMessages(prev => [...prev, { text: data.response, sender: 'bot' }]);
      } else {
        setMessages(prev => [...prev, { text: 'Sorry, I encountered an error.', sender: 'bot' }]);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { text: 'Sorry, I encountered an error.', sender: 'bot' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: '#007bff',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          fontSize: '24px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }}
      >
        💬
      </button>
      
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '100px',
          right: '20px',
          width: '350px',
          height: '500px',
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{
            padding: '16px',
            background: '#007bff',
            color: 'white',
            borderRadius: '12px 12px 0 0',
            fontWeight: 'bold'
          }}>
            AI Assistant
          </div>
          
          <div style={{
            flex: 1,
            padding: '16px',
            overflowY: 'auto',
            maxHeight: '350px'
          }}>
            {messages.map((msg, index) => (
              <div key={index} style={{
                marginBottom: '12px',
                padding: '8px 12px',
                borderRadius: '8px',
                maxWidth: '80%',
                background: msg.sender === 'user' ? '#e3f2fd' : '#f5f5f5',
                marginLeft: msg.sender === 'user' ? 'auto' : '0'
              }}>
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div style={{
                marginBottom: '12px',
                padding: '8px 12px',
                borderRadius: '8px',
                background: '#f5f5f5',
                fontStyle: 'italic'
              }}>
                Typing...
              </div>
            )}
          </div>
          
          <div style={{
            padding: '16px',
            borderTop: '1px solid #eee'
          }}>
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #ddd',
                borderRadius: '20px',
                outline: 'none'
              }}
            />
            <button 
              onClick={sendMessage}
              disabled={isLoading}
              style={{
                marginTop: '8px',
                padding: '8px 16px',
                background: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '20px',
                cursor: 'pointer',
                opacity: isLoading ? 0.6 : 1
              }}
            >
              {isLoading ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotWidget;`}
                      </pre>
                    </div>
                    
                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">Usage in Your React App:</h4>
                      <pre className="text-sm text-blue-800">
{`import ChatbotWidget from './ChatbotWidget';

function App() {
  return (
    <div>
      {/* Your website content */}
      <h1>Welcome to My Website</h1>
      
      {/* Add your chatbot */}
      <ChatbotWidget 
        apiKey="YOUR_API_KEY_HERE"
        chatbotId="YOUR_CHATBOT_ID_HERE"
        supabaseUrl="https://your-project-ref.supabase.co"
      />
    </div>
  );
}`}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* API Documentation */}
            <div className="card">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">🔧 API Documentation</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Endpoint</h3>
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                    POST https://your-project-ref.supabase.co/functions/v1/chatbot-chat
                  </code>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Headers</h3>
                  <pre className="bg-gray-100 p-3 rounded text-sm">
{`Content-Type: application/json
Authorization: Bearer YOUR_API_KEY`}
                  </pre>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Request Body</h3>
                  <pre className="bg-gray-100 p-3 rounded text-sm">
{`{
  "chatbotId": "your-chatbot-uuid",
  "message": "User's message here",
  "userId": "unique-user-identifier"
}`}
                  </pre>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Response</h3>
                  <pre className="bg-gray-100 p-3 rounded text-sm">
{`{
  "response": "AI-generated response from your chatbot",
  "chatbot": {
    "id": "chatbot-uuid",
    "name": "Your Chatbot Name",
    "personality": "Your chatbot's personality"
  }
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Links */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
              <div className="space-y-2">
                <button 
                  onClick={() => setActiveTab('html')}
                  className={`w-full text-left p-2 rounded transition-colors ${
                    activeTab === 'html' 
                      ? 'bg-primary-color text-white' 
                      : 'text-blue-600 hover:text-blue-800 hover:bg-blue-50'
                  }`}
                >
                  📋 HTML/JavaScript
                </button>
                <button 
                  onClick={() => setActiveTab('react')}
                  className={`w-full text-left p-2 rounded transition-colors ${
                    activeTab === 'react' 
                      ? 'bg-primary-color text-white' 
                      : 'text-blue-600 hover:text-blue-800 hover:bg-blue-50'
                  }`}
                >
                  ⚛️ React Component
                </button>
                <a href="#api-docs" className="block text-blue-600 hover:text-blue-800 p-2 rounded hover:bg-blue-50">
                  🔧 API Documentation
                </a>
              </div>
            </div>

            {/* Pro Tips */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 Pro Tips</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Replace <code>your-project-ref</code> with your actual Supabase project reference</li>
                <li>• Customize the styling to match your website's design</li>
                <li>• Add error handling for better user experience</li>
                <li>• Consider adding loading states while waiting for responses</li>
                <li>• Test the integration thoroughly before going live</li>
              </ul>
            </div>

            {/* Troubleshooting */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">🚨 Troubleshooting</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-800">CORS Errors</h4>
                  <p className="text-sm text-gray-600">Check Supabase allowed origins and verify API endpoints</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Authentication Errors</h4>
                  <p className="text-sm text-gray-600">Verify your API key and ensure you're using the Bearer prefix</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Chatbot Not Responding</h4>
                  <p className="text-sm text-gray-600">Check that your chatbot is active and the ID is correct</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationGuide; 