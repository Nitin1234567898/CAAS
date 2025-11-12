import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useUser } from '@clerk/clerk-react';
import { supabase, Chatbot } from '../lib/supabase';
import ChatInterface from '../components/ChatInterface';
import styles from './Dashboard.module.css';

const Dashboard: React.FC = () => {
  const { user } = useUser();
  const [chatbots, setChatbots] = useState<Chatbot[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [showIntegrationModal, setShowIntegrationModal] = useState(false);
  const [selectedChatbot, setSelectedChatbot] = useState<Chatbot | null>(null);
  const [newChatbot, setNewChatbot] = useState({
    name: '',
    description: '',
    personality: 'professional',
    knowledgeBase: ''
  });
  const [showEditKBModal, setShowEditKBModal] = useState(false);
  const [editKBValue, setEditKBValue] = useState('');
  const [editKBLoading, setEditKBLoading] = useState(false);
  const [editKBError, setEditKBError] = useState('');
  const [editKBChatbot, setEditKBChatbot] = useState<Chatbot | null>(null);

  const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;

  const editKBModalRef = useRef<HTMLDivElement | null>(null);

  // Fetch chatbots from Supabase
  const fetchChatbots = useCallback(async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('chatbots')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setChatbots(data || []);
    } catch (error) {
      console.error('Error fetching chatbots:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchChatbots();
    }
  }, [user, fetchChatbots]);

  useEffect(() => {
    if (showEditKBModal && editKBModalRef.current) {
      editKBModalRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [showEditKBModal]);

  const handleCreateChatbot = async () => {
    if (!user) return;

    try {
      // Generate a unique API key
      const newApiKey = `cb_live_${[...Array(24)].map(() => Math.random().toString(36)[2]).join('')}`;

      const { data, error } = await supabase
        .from('chatbots')
        .insert({
          name: newChatbot.name,
          description: newChatbot.description,
          personality: newChatbot.personality,
          knowledge_base: newChatbot.knowledgeBase,
          user_id: user.id,
          api_key: newApiKey, // Save the new API key
        })
        .select()
        .single();

      if (error) throw error;

      setChatbots([data, ...chatbots]);
      setNewChatbot({ name: '', description: '', personality: 'professional', knowledgeBase: '' });
      setShowCreateModal(false);
    } catch (error) {
      console.error('Error creating chatbot:', error);
    }
  };

  const toggleChatbotStatus = async (id: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      const { error } = await supabase
        .from('chatbots')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      setChatbots(chatbots.map(bot => 
        bot.id === id ? { ...bot, status: newStatus as 'active' | 'inactive' } : bot
      ));
    } catch (error) {
      console.error('Error updating chatbot status:', error);
    }
  };

  const copyApiKey = (apiKey: string) => {
    navigator.clipboard.writeText(apiKey);
    // You could add a toast notification here
  };

  const openChatModal = (chatbot: Chatbot) => {
    setSelectedChatbot(chatbot);
    setShowChatModal(true);
  };

  const closeChatModal = () => {
    setShowChatModal(false);
    setSelectedChatbot(null);
  };

  const openIntegrationModal = (chatbot: Chatbot) => {
    setSelectedChatbot(chatbot);
    setShowIntegrationModal(true);
  };

  const closeIntegrationModal = () => {
    setShowIntegrationModal(false);
    setSelectedChatbot(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-color mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your chatbots...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.dashboardRoot}>
      <div className="container">
        <div className={styles.dashboardHeader}>
          <h1 className={styles.dashboardTitle}>Welcome back, {user?.firstName || 'User'}!</h1>
          <p className={styles.dashboardSubtitle}>Manage your chatbots and monitor their performance</p>
        </div>
        <div className={styles.statsGrid}>
          <div className={styles.statsCard}>
            <div className={styles.statsIcon}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div>
              <p className={styles.statsLabel}>Total Chatbots</p>
              <p className={styles.statsValue}>{chatbots.length}</p>
            </div>
          </div>

          <div className={styles.statsCard}>
            <div className={styles.statsIcon}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className={styles.statsLabel}>Active Bots</p>
              <p className={styles.statsValue}>
                {chatbots.filter(bot => bot.status === 'active').length}
              </p>
            </div>
          </div>

          <div className={styles.statsCard}>
            <div className={styles.statsIcon}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <p className={styles.statsLabel}>Total Messages</p>
              <p className={styles.statsValue}>
                {chatbots.reduce((sum, bot) => sum + bot.message_count, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardTitle}>Your Chatbots</div>
          <div className={styles.chatbotList}>
            {chatbots.length === 0 ? (
              <div className={styles.emptyChatbotCard}>
                <h3 className={styles.emptyChatbotTitle}>No chatbots</h3>
                <p className={styles.emptyChatbotSubtitle}>Get started by creating your first chatbot.</p>
                <div className={styles.emptyChatbotButton}>
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className={styles.emptyChatbotButton}
                  >
                    Create Chatbot
                  </button>
                </div>
              </div>
            ) : (
              chatbots.map((chatbot) => (
                <div key={chatbot.id} className={styles.chatbotCard}>
                  <div>
                    <div className={styles.chatbotName}>{chatbot.name}</div>
                    <span className={chatbot.status === 'active' ? styles.chatbotStatus : styles.chatbotStatus + ' ' + styles.inactive}>{chatbot.status}</span>
                    <p className={styles.chatbotDesc}>{chatbot.description}</p>
                    <label className={styles.apiKeyLabel}>API Key</label>
                    <div className={styles.apiKeyInputRow}>
                      <input type="text" value={chatbot.api_key} readOnly className={styles.apiKeyInput} />
                      <button
                        onClick={(e) => {
                          copyApiKey(chatbot.api_key);
                        }}
                        className={styles.secondaryBtn}
                      >
                        Copy
                      </button>
                    </div>
                    <div className={styles.buttonRow}>
                      <button
                        onClick={(e) => {
                          toggleChatbotStatus(chatbot.id, chatbot.status);
                        }}
                        className={styles.secondaryBtn}
                      >
                        {chatbot.status === 'active' ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        onClick={(e) => {
                          openChatModal(chatbot);
                        }}
                        className={styles.secondaryBtn}
                      >
                        Test Chat
                      </button>
                    </div>
                  </div>
                  <div className={styles.buttonRow}>
                    <button
                      onClick={(e) => {
                        setEditKBChatbot(chatbot);
                        setEditKBValue(chatbot.knowledge_base || '');
                        setEditKBError('');
                        setShowEditKBModal(true);
                      }}
                      className={styles.secondaryBtn}
                    >
                      Edit Knowledge Base
                    </button>
                    <button
                      onClick={() => openIntegrationModal(chatbot)}
                      className={styles.secondaryBtn}
                    >
                      Integration Guide
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Create Chatbot Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">Create New Chatbot</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Chatbot Name
                  </label>
                  <input
                    type="text"
                    value={newChatbot.name}
                    onChange={(e) => setNewChatbot({...newChatbot, name: e.target.value})}
                    className="input w-full"
                    placeholder="e.g., Customer Support Bot"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={newChatbot.description}
                    onChange={(e) => setNewChatbot({...newChatbot, description: e.target.value})}
                    className="input w-full"
                    rows={3}
                    placeholder="What does this chatbot do?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Personality
                  </label>
                  <select
                    value={newChatbot.personality}
                    onChange={(e) => setNewChatbot({...newChatbot, personality: e.target.value})}
                    className="input w-full"
                  >
                    <option value="professional">Professional</option>
                    <option value="friendly">Friendly</option>
                    <option value="casual">Casual</option>
                    <option value="formal">Formal</option>
                    <option value="humorous">Humorous</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Knowledge Base (Optional)
                  </label>
                  <textarea
                    value={newChatbot.knowledgeBase}
                    onChange={(e) => setNewChatbot({...newChatbot, knowledgeBase: e.target.value})}
                    className="input w-full"
                    rows={4}
                    placeholder="Specific information, FAQs, or context for the chatbot..."
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={(e) => {
                    setShowCreateModal(false);
                  }}
                  className={styles.fancyBtn}
                >
                  Cancel
                </button>
                <button
                  onClick={(e) => {
                    handleCreateChatbot();
                  }}
                  className={styles.fancyBtn}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Chat Modal */}
        {showChatModal && selectedChatbot && (
          <ChatInterface
            chatbotId={selectedChatbot.id}
            chatbotName={selectedChatbot.name}
            apiKey={selectedChatbot.api_key}
            onClose={closeChatModal}
          />
        )}

        {/* Integration Guide Modal */}
        {showIntegrationModal && selectedChatbot && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Integration Guide for {selectedChatbot.name}</h2>
                <button onClick={closeIntegrationModal} className="text-gray-500 hover:text-gray-700">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Your Integration Details</h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <div>
                      <span className="font-medium">API Key:</span> 
                      <code className="ml-2 bg-white px-2 py-1 rounded text-sm">{selectedChatbot.api_key}</code>
                    </div>
                    <div>
                      <span className="font-medium">Chatbot ID:</span> 
                      <code className="ml-2 bg-white px-2 py-1 rounded text-sm">{selectedChatbot.id}</code>
                    </div>
                    <div>
                      <span className="font-medium">Supabase URL:</span> 
                      <code className="ml-2 bg-white px-2 py-1 rounded text-sm">{supabaseUrl}</code>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Quick Integration (HTML/JavaScript)</h3>
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm">
{`<!-- Add this to your website -->
<div id="chatbot-widget" style="position: fixed; bottom: 20px; right: 20px; z-index: 1000;">
  <button id="chatbot-toggle" style="width: 60px; height: 60px; border-radius: 50%; background: #007bff; color: white; border: none; cursor: pointer; font-size: 24px;">💬</button>
  
  <div id="chatbot-container" style="display: none; position: fixed; bottom: 100px; right: 20px; width: 350px; height: 500px; background: white; border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.15);">
    <div style="padding: 16px; background: #007bff; color: white; border-radius: 12px 12px 0 0; font-weight: bold;">${selectedChatbot.name}</div>
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
// Replace with your actual values
const API_KEY = '${selectedChatbot.api_key}';
const CHATBOT_ID = '${selectedChatbot.id}';
const SUPABASE_URL = '${supabaseUrl}';

let isChatbotOpen = false;
const userId = 'user_' + Math.random().toString(36).substr(2, 9);

document.getElementById('chatbot-toggle').onclick = function() {
  const container = document.getElementById('chatbot-container');
  isChatbotOpen = !isChatbotOpen;
  container.style.display = isChatbotOpen ? 'block' : 'none';
  
  if (isChatbotOpen) {
    document.getElementById('message-input').focus();
  }
};

document.getElementById('message-input').onkeypress = function(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
};

async function sendMessage() {
  const input = document.getElementById('message-input');
  const message = input.value.trim();
  
  if (!message) return;
  
  addMessage(message, 'user');
  input.value = '';
  
  try {
    const response = await fetch(\`\${SUPABASE_URL}/functions/v1/chatbot-chat\`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': API_KEY
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

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">API Endpoint</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>URL:</strong> <code>{supabaseUrl}/functions/v1/chatbot-chat</code>
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Method:</strong> POST
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Headers:</strong>
                    </p>
                    <pre className="text-sm bg-white p-2 rounded">
{`Content-Type: application/json
X-Api-Key: ${selectedChatbot.api_key}`}
                    </pre>
                    <p className="text-sm text-gray-600 mt-2">
                      <strong>Request Body:</strong>
                    </p>
                    <pre className="text-sm bg-white p-2 rounded">
{`{
  "chatbotId": "${selectedChatbot.id}",
  "message": "User's message here",
  "userId": "unique-user-identifier"
}`}
                    </pre>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">💡 Pro Tips</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Replace <code>your-project-ref</code> with your actual Supabase project reference</li>
                    <li>• Customize the styling to match your website's design</li>
                    <li>• Add error handling for better user experience</li>
                    <li>• Consider adding loading states while waiting for responses</li>
                    <li>• Test the integration thoroughly before going live</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {showEditKBModal && editKBChatbot && (
          <div ref={editKBModalRef} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">Edit Knowledge Base</h2>
              <textarea
                className="input w-full mb-4"
                rows={8}
                value={editKBValue}
                onChange={e => setEditKBValue(e.target.value)}
                placeholder="Enter knowledge base content..."
                disabled={editKBLoading}
              />
              {editKBError && <div className="text-red-500 text-sm mb-2">{editKBError}</div>}
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowEditKBModal(false)}
                  className={styles.btn}
                  disabled={editKBLoading}
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    setEditKBLoading(true);
                    setEditKBError('');
                    try {
                      const { error } = await supabase
                        .from('chatbots')
                        .update({ knowledge_base: editKBValue })
                        .eq('id', editKBChatbot.id);
                      if (error) throw error;
                      setChatbots(chatbots.map(bot => bot.id === editKBChatbot.id ? { ...bot, knowledge_base: editKBValue } : bot));
                      setShowEditKBModal(false);
                    } catch (err: any) {
                      setEditKBError('Failed to update knowledge base.');
                    } finally {
                      setEditKBLoading(false);
                    }
                  }}
                  className={styles.fancyBtn}
                  disabled={editKBLoading}
                >
                  {editKBLoading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 