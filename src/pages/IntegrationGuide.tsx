import React, { useState } from 'react';

const IntegrationGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'html' | 'react'>('html');
  const [showHtmlCode, setShowHtmlCode] = useState(false);
  const [showReactCode, setShowReactCode] = useState(false);

  const handleBtnMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    btn.style.setProperty('--x', `${x}%`);
  };

  return (
    <div className="integration-guide-root">
      <div className="integration-guide-container">
        {/* Header */}
        <div className="integration-guide-header">
          <h1 className="integration-guide-title">Integration Guide</h1>
          <p className="integration-guide-desc">
            Learn how to integrate your custom chatbots into your website
          </p>
        </div>
        <div className="integration-guide-grid">
          {/* Main Content */}
          <div className="integration-guide-main">
            {/* Quick Start */}
            <div className="integration-guide-card">
              <h2 className="integration-guide-section-title">🚀 Quick Start</h2>
              <div className="integration-guide-steps">
                <div className="integration-guide-step blue">
                  <h3 className="integration-guide-step-title">Step 1: Get Your API Key</h3>
                  <ol className="integration-guide-step-list">
                    <li> Log into your chatbot dashboard</li>
                    <li> Find your chatbot in the list</li>
                    <li> Copy the API key (starts with <code>cb_live_</code>)</li>
                    <li> Note your chatbot ID</li>
                  </ol>
                </div>
                <div className="integration-guide-step green">
                  <h3 className="integration-guide-step-title">Step 2: Choose Integration Method</h3>
                  <ul className="integration-guide-step-list">
                    <li> <strong>HTML/JavaScript</strong> - For basic websites</li>
                    <li> <strong>React Component</strong> - For React applications</li>
                    <li> <strong>Custom Implementation</strong> - For advanced users</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Integration Method Choice */}
            <div className="integration-guide-card">
              <h2 className="integration-guide-section-title">📋 Choose Your Integration Method</h2>
              <div className="integration-guide-choice-btns">
                <button
                  onClick={(e) => {
                    setShowHtmlCode((prev) => !prev);
                    setShowReactCode(false);
                    // Ripple effect
                    const btn = e.currentTarget;
                    const ripple = btn.querySelector('.ripple-effect') as HTMLSpanElement;
                    if (ripple) {
                      ripple.classList.remove('show');
                      void ripple.offsetWidth; // trigger reflow
                      ripple.classList.add('show');
                      const rect = btn.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const y = e.clientY - rect.top;
                      ripple.style.left = `${x}px`;
                      ripple.style.top = `${y}px`;
                    }
                  }}
                  className={"integration-guide-choice-btn gradient-cursor-btn html-btn" + (showHtmlCode ? " active" : "")}
                  onMouseMove={handleBtnMouseMove}
                >
                  <div className="integration-guide-btn-label-wrapper" style={{marginBottom: '2.2rem', width: '100%'}}>
                    <span className="integration-guide-btn-label">HTML/JS</span>
                  </div>
                  <span className="integration-guide-btn-desc">Embed the chatbot in any website using a simple HTML/JavaScript snippet.</span>
                  <span className="sparkle-effect"></span>
                  <span className="ripple-effect"></span>
                </button>
                <button
                  onClick={(e) => {
                    setShowReactCode((prev) => !prev);
                    setShowHtmlCode(false);
                    // Ripple effect
                    const btn = e.currentTarget;
                    const ripple = btn.querySelector('.ripple-effect') as HTMLSpanElement;
                    if (ripple) {
                      ripple.classList.remove('show');
                      void ripple.offsetWidth;
                      ripple.classList.add('show');
                      const rect = btn.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const y = e.clientY - rect.top;
                      ripple.style.left = `${x}px`;
                      ripple.style.top = `${y}px`;
                    }
                  }}
                  className={"integration-guide-choice-btn gradient-cursor-btn react-btn" + (showReactCode ? " active" : "")}
                  onMouseMove={handleBtnMouseMove}
                >
                  <div className="integration-guide-btn-label-wrapper" style={{marginBottom: '2.2rem', width: '100%'}}>
                    <span className="integration-guide-btn-label">React</span>
                  </div>
                  <span className="integration-guide-btn-desc">Integrate the chatbot as a React component in your React app.</span>
                  <span className="sparkle-effect"></span>
                  <span className="ripple-effect"></span>
                </button>
              </div>
              <div className="integration-guide-choice-codearea">
                { (showHtmlCode || showReactCode) && (
                  <button
                    className="integration-guide-back-link"
                    onClick={() => {
                      setShowHtmlCode(false);
                      setShowReactCode(false);
                    }}
                  >
                    &larr; Back to integration method choice
                  </button>
                )}
                {showHtmlCode && (
                  <div>
                    <h3 className="integration-guide-code-title">HTML/JavaScript Integration</h3>
                    <p className="integration-guide-code-desc">
                      Add this code to your website's HTML to embed your chatbot:
                    </p>
                    <div className="integration-guide-code-block html">
                      <pre>
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
                {showReactCode && (
                  <div>
                    <h3 className="integration-guide-code-title">React Integration</h3>
                    <p className="integration-guide-code-desc">
                      For React applications, create a chatbot component:
                    </p>
                    <div className="integration-guide-code-block react">
                      <pre>
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
                    <div className="integration-guide-usage-block">
                      <h4 className="integration-guide-usage-title">Usage in Your React App:</h4>
                      <pre>
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
            <div className="integration-guide-card">
              <h2 className="integration-guide-section-title">🔧 API Documentation</h2>
              <div className="integration-guide-api-docs">
                <div>
                  <h3 className="integration-guide-api-title">Endpoint</h3>
                  <code className="integration-guide-api-code">
                    POST https://your-project-ref.supabase.co/functions/v1/chatbot-chat
                  </code>
                </div>
                <div>
                  <h3 className="integration-guide-api-title">Headers</h3>
                  <pre className="integration-guide-api-pre">
{`Content-Type: application/json
Authorization: Bearer YOUR_API_KEY`}
                  </pre>
                </div>
                <div>
                  <h3 className="integration-guide-api-title">Request Body</h3>
                  <pre className="integration-guide-api-pre">
{`{
  "chatbotId": "your-chatbot-uuid",
  "message": "User's message here",
  "userId": "unique-user-identifier"
}`}
                  </pre>
                </div>
                <div>
                  <h3 className="integration-guide-api-title">Response</h3>
                  <pre className="integration-guide-api-pre">
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
          <div className="integration-guide-sidebar">
            <div className="integration-guide-card">
              <h3 className="integration-guide-sidebar-title">💡 Pro Tips</h3>
              <ul className="integration-guide-tips-list">
                <li>• Replace <code>your-project-ref</code> with your actual Supabase project reference</li>
                <li>• Customize the styling to match your website's design</li>
                <li>• Add error handling for better user experience</li>
                <li>• Consider adding loading states while waiting for responses</li>
                <li>• Test the integration thoroughly before going live</li>
              </ul>
            </div>
            <div className="integration-guide-card">
              <h3 className="integration-guide-sidebar-title"> Troubleshooting</h3>
              <div className="integration-guide-troubleshooting-list">
                <div>
                  <h4 className="integration-guide-troubleshooting-title">CORS Errors</h4>
                  <p className="integration-guide-troubleshooting-desc">Check Supabase allowed origins and verify API endpoints</p>
                </div>
                <div>
                  <h4 className="integration-guide-troubleshooting-title">Authentication Errors</h4>
                  <p className="integration-guide-troubleshooting-desc">Verify your API key and ensure you're using the Bearer prefix</p>
                </div>
                <div>
                  <h4 className="integration-guide-troubleshooting-title">Chatbot Not Responding</h4>
                  <p className="integration-guide-troubleshooting-desc">Check that your chatbot is active and the ID is correct</p>
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