import React, { useState } from 'react';
import GlassCard from '../components/GlassCard';
import styles from './IntegrationGuide.module.css';

const htmlSnippet = `<!-- Add this to your website -->
<div id="chatbot-widget" style="position: fixed; bottom: 20px; right: 20px; z-index: 1000;">
  <button id="chatbot-toggle" style="width: 60px; height: 60px; border-radius: 50%; background: #2563eb; color: white; border: none; cursor: pointer; font-size: 24px;">💬</button>

  <div id="chatbot-container" style="display: none; position: fixed; bottom: 100px; right: 20px; width: 350px; height: 500px; background: white; border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.15);">
    <div style="padding: 16px; background: #2563eb; color: white; border-radius: 12px 12px 0 0; font-weight: bold;">AI Assistant</div>
    <div id="chatbot-messages" style="padding: 16px; overflow-y: auto; max-height: 350px;">
      <div style="margin-bottom: 12px; padding: 8px 12px; border-radius: 8px; background: #f5f5f5;">Hello! How can I help you today?</div>
    </div>
    <div style="padding: 16px; border-top: 1px solid #eee;">
      <input type="text" id="message-input" placeholder="Type your message..." style="width: 100%; padding: 8px 12px; border: 1px solid #ddd; border-radius: 20px; outline: none;">
      <button onclick="sendMessage()" style="margin-top: 8px; padding: 8px 16px; background: #2563eb; color: white; border: none; border-radius: 20px; cursor: pointer;">Send</button>
    </div>
  </div>
</div>

<script>
const API_KEY = 'YOUR_API_KEY_HERE';
const CHATBOT_ID = 'YOUR_CHATBOT_ID_HERE';
const SUPABASE_URL = 'https://your-project-ref.supabase.co';

let isChatbotOpen = false;
const userId = 'user_' + Math.random().toString(36).substring(2, 11);

document.getElementById('chatbot-toggle').onclick = function () {
  const container = document.getElementById('chatbot-container');
  isChatbotOpen = !isChatbotOpen;
  container.style.display = isChatbotOpen ? 'block' : 'none';
  if (isChatbotOpen) {
    document.getElementById('message-input').focus();
  }
};

document.getElementById('message-input').onkeypress = function (event) {
  if (event.key === 'Enter') sendMessage();
};

async function sendMessage() {
  const input = document.getElementById('message-input');
  const message = input.value.trim();
  if (!message) return;

  addMessage(message, 'user');
  input.value = '';

  try {
    const response = await fetch(SUPABASE_URL + '/functions/v1/chatbot-chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': API_KEY
      },
      body: JSON.stringify({
        chatbotId: CHATBOT_ID,
        message,
        userId
      })
    });
    const data = await response.json();
    addMessage(data.response || 'Sorry, I encountered an error. Please try again.', 'bot');
  } catch (error) {
    addMessage('Sorry, I encountered an error. Please try again.', 'bot');
  }
}

function addMessage(text, sender) {
  const box = document.getElementById('chatbot-messages');
  const item = document.createElement('div');
  item.style.marginBottom = '12px';
  item.style.padding = '8px 12px';
  item.style.borderRadius = '8px';
  item.style.maxWidth = '80%';
  item.style.background = sender === 'user' ? '#e3f2fd' : '#f5f5f5';
  if (sender === 'user') item.style.marginLeft = 'auto';
  item.textContent = text;
  box.appendChild(item);
  box.scrollTop = box.scrollHeight;
}
</script>`;

const reactSnippet = `import React, { useMemo, useState } from 'react';

type Message = { text: string; sender: 'user' | 'bot' };

export default function ChatbotWidget({
  apiKey,
  chatbotId,
  supabaseUrl
}: {
  apiKey: string;
  chatbotId: string;
  supabaseUrl: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: 'Hello! How can I help you today?', sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const userId = useMemo(
    () => 'user_' + Math.random().toString(36).substring(2, 11),
    []
  );

  async function sendMessage() {
    if (!inputValue.trim() || isLoading) return;
    const userMessage = { text: inputValue, sender: 'user' as const };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch(supabaseUrl + '/functions/v1/chatbot-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': apiKey
        },
        body: JSON.stringify({
          chatbotId,
          message: userMessage.text,
          userId
        })
      });
      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { text: data.response || 'Sorry, I encountered an error.', sender: 'bot' }
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { text: 'Sorry, I encountered an error.', sender: 'bot' }
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div style={{ position: 'fixed', right: 20, bottom: 20, zIndex: 1000 }}>
      <button
        onClick={() => setIsOpen((v) => !v)}
        style={{
          width: 60,
          height: 60,
          borderRadius: '50%',
          border: 'none',
          background: '#2563eb',
          color: 'white',
          fontSize: 24,
          cursor: 'pointer'
        }}
      >
        💬
      </button>
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            right: 20,
            bottom: 100,
            width: 350,
            height: 500,
            display: 'flex',
            flexDirection: 'column',
            background: 'white',
            borderRadius: 12,
            boxShadow: '0 8px 32px rgba(0,0,0,0.15)'
          }}
        >
          <div style={{ padding: 16, background: '#2563eb', color: 'white', fontWeight: 'bold' }}>
            AI Assistant
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  marginBottom: 12,
                  padding: '8px 12px',
                  borderRadius: 8,
                  maxWidth: '80%',
                  background: m.sender === 'user' ? '#e3f2fd' : '#f5f5f5',
                  marginLeft: m.sender === 'user' ? 'auto' : 0
                }}
              >
                {m.text}
              </div>
            ))}
            {isLoading && <div style={{ color: '#666' }}>Typing...</div>}
          </div>
          <div style={{ padding: 16, borderTop: '1px solid #eee' }}>
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type your message..."
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: 20 }}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading}
              style={{ marginTop: 8, padding: '8px 16px', border: 'none', borderRadius: 20, background: '#2563eb', color: 'white' }}
            >
              {isLoading ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}`;

const IntegrationGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState<null | 'html' | 'react'>(null);

  return (
    <div className={`page-wrap ${styles.root}`}>
      <div className={styles.grid}>
        <main>
          <header className={styles.header}>
            <p className="ui-label">Developer Docs</p>
            <h1>Integration Guide</h1>
            <p className="ui-muted">Connect your chatbot with plain HTML/JS or a React component workflow.</p>
          </header>

          <GlassCard className={styles.card}>
            <h2>Quick Start</h2>
            <ol>
              <li>Log into your chatbot dashboard.</li>
              <li>Find your chatbot and copy its API key.</li>
              <li>Use chatbot ID + API key in one of the methods below.</li>
            </ol>
          </GlassCard>

          <GlassCard className={styles.card}>
            <h2>Choose Integration Method</h2>
            {activeTab === null && (
              <div className={styles.tabRow}>
                <button className="glass-button glass-button--primary" onClick={() => setActiveTab('html')}>
                  HTML / JS
                </button>
                <button className="glass-button glass-button--secondary" onClick={() => setActiveTab('react')}>
                  React
                </button>
              </div>
            )}

            {activeTab !== null && (
              <button className={`glass-button glass-button--secondary ${styles.backBtn}`} onClick={() => setActiveTab(null)}>
                Back
              </button>
            )}

            {activeTab === 'html' && (
              <pre className={styles.code}>{htmlSnippet}</pre>
            )}

            {activeTab === 'react' && (
              <pre className={styles.code}>{reactSnippet}</pre>
            )}
          </GlassCard>

          <GlassCard className={styles.card}>
            <h2>API Contract</h2>
            <p className="ui-label">Endpoint</p>
            <code className={styles.inline}>POST https://your-project.supabase.co/functions/v1/chatbot-chat</code>
            <p className="ui-label">Required Headers</p>
            <pre className={styles.code}>{`Content-Type: application/json
X-Api-Key: YOUR_API_KEY`}</pre>
          </GlassCard>
        </main>

        <aside className={styles.sidebar}>
          <GlassCard className={styles.card}>
            <h3>Pro Tips</h3>
            <ul>
              <li>Keep chatbot IDs environment-specific.</li>
              <li>Add retries and timeout handling on frontend calls.</li>
              <li>Log errors with request IDs for faster debugging.</li>
            </ul>
          </GlassCard>

          <GlassCard className={styles.card}>
            <h3>Troubleshooting</h3>
            <ul>
              <li>CORS error: verify allowed origins in Supabase.</li>
              <li>401 error: validate `X-Api-Key` value.</li>
              <li>No response: confirm chatbot status is active.</li>
            </ul>
          </GlassCard>
        </aside>
      </div>
    </div>
  );
};

export default IntegrationGuide;
