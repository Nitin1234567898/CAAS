import React, { useState, useRef, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { supabase } from '../lib/supabase';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatInterfaceProps {
  chatbotId: string;
  chatbotName: string;
  onClose: () => void;
  apiKey: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ chatbotId, chatbotName, onClose, apiKey }) => {
  const { user } = useUser();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading || !user) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Call Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('chatbot-chat', {
        headers: {
          'X-Api-Key': apiKey,
        },
        body: {
          chatbotId,
          message: inputMessage,
          userId: user.id
        }
      });

      if (error) throw error;

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error. Please try again.',
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-modal-overlay">
      <div className="chat-modal">
        {/* Header */}
        <div className="chat-header">
          <div className="chat-header-content">
            <div className="chat-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div>
              <h3 className="chat-title">{chatbotName}</h3>
              <p className="chat-subtitle">AI Chatbot</p>
            </div>
          </div>
          <button
            onClick={(e) => {
              onClose();
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
            className="fancy-btn chat-close-btn"
            style={{padding: '0.5rem', minWidth: 'unset', minHeight: 'unset'}}
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span className="ripple-effect"></span>
          </button>
        </div>

        {/* Messages */}
        <div className="chat-messages">
          {messages.length === 0 ? (
            <div className="chat-empty-state">
              <div className="chat-empty-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <p className="chat-empty-title">Start chatting with {chatbotName}</p>
              <p className="chat-empty-subtitle">Type a message below to begin</p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`chat-message ${message.isUser ? 'user' : ''}`}
              >
                <div className={`chat-message-bubble ${message.isUser ? 'user' : ''}`}>
                  <p className="chat-message-text">{message.text}</p>
                  <p className={`chat-message-time ${message.isUser ? 'user' : ''}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))
          )}
          
          {isLoading && (
            <div className="chat-loading">
              <div className="chat-loading-bubble">
                <div className="chat-loading-content">
                  <div className="chat-spinner"></div>
                  <span className="chat-loading-text">Typing...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="chat-input-container">
          <div className="chat-input-wrapper">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="input chat-textarea"
              rows={1}
              disabled={isLoading}
            />
            <button
              onClick={(e) => {
                sendMessage();
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
              className="fancy-btn chat-send-btn"
              disabled={!inputMessage.trim() || isLoading}
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <span className="ripple-effect"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface; 