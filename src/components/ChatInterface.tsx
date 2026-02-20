import React, { useState, useRef, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { supabase } from '../lib/supabase';
import GlassButton from './GlassButton';
import GlassCard from './GlassCard';
import styles from './ChatInterface.module.css';

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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading || !user) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('chatbot-chat', {
        headers: {
          'X-Api-Key': apiKey,
        },
        body: {
          chatbotId,
          message: inputMessage,
          userId: user.id,
        },
      });

      if (error) throw error;

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: 'Sorry, I encountered an error. Please try again.',
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className={styles.overlay}>
      <GlassCard className={styles.modal}>
        <div className={styles.header}>
          <div>
            <p className="ui-label">Live Test</p>
            <h3>{chatbotName}</h3>
          </div>
          <GlassButton variant="secondary" onClick={onClose}>
            Close
          </GlassButton>
        </div>

        <div className={styles.messages}>
          {messages.length === 0 && <p className="ui-muted">Start chatting with {chatbotName}.</p>}

          {messages.map((message) => (
            <div key={message.id} className={`${styles.bubble} ${message.isUser ? styles.user : styles.bot}`}>
              <p>{message.text}</p>
              <small>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </small>
            </div>
          ))}

          {isLoading && <p className={styles.typing}>Typing...</p>}
          <div ref={messagesEndRef} />
        </div>

        <div className={styles.inputRow}>
          <textarea
            value={inputMessage}
            onChange={(event) => setInputMessage(event.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message"
            className="glass-textarea"
            rows={2}
            disabled={isLoading}
          />
          <GlassButton variant="primary" onClick={sendMessage} disabled={!inputMessage.trim() || isLoading}>
            Send
          </GlassButton>
        </div>
      </GlassCard>
    </div>
  );
};

export default ChatInterface;
