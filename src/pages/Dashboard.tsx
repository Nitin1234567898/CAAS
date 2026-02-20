import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useUser } from '@clerk/clerk-react';
import { supabase, Chatbot } from '../lib/supabase';
import ChatInterface from '../components/ChatInterface';
import GlassCard from '../components/GlassCard';
import GlassButton from '../components/GlassButton';
import CompletionOverlay from '../features/completion/CompletionOverlay';
import styles from './Dashboard.module.css';

const Dashboard: React.FC = () => {
  const { user } = useUser();
  const [chatbots, setChatbots] = useState<Chatbot[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [showIntegrationModal, setShowIntegrationModal] = useState(false);
  const [selectedChatbot, setSelectedChatbot] = useState<Chatbot | null>(null);
  const [showCompletionOverlay, setShowCompletionOverlay] = useState(false);

  const [newChatbot, setNewChatbot] = useState({
    name: '',
    description: '',
    personality: 'professional',
    knowledgeBase: '',
  });

  const [showEditKBModal, setShowEditKBModal] = useState(false);
  const [editKBValue, setEditKBValue] = useState('');
  const [editKBLoading, setEditKBLoading] = useState(false);
  const [editKBError, setEditKBError] = useState('');
  const [editKBChatbot, setEditKBChatbot] = useState<Chatbot | null>(null);

  const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
  const createSectionRef = useRef<HTMLDivElement | null>(null);

  const triggerConfetti = (x?: number, y?: number) => {
    window.dispatchEvent(
      new CustomEvent('app:confetti', {
        detail: { x: x ?? window.innerWidth / 2, y: y ?? window.innerHeight / 2 },
      })
    );
  };

  const evaluateGroupCompletion = (bots: Chatbot[]) => {
    if (bots.length > 0 && bots.every((bot) => bot.status === 'active')) {
      setShowCompletionOverlay(true);
    }
  };

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

  const handleCreateChatbot = async (x?: number, y?: number) => {
    if (!user) return;

    try {
      const newApiKey = `cb_live_${[...Array(24)]
        .map(() => Math.random().toString(36)[2])
        .join('')}`;

      const { data, error } = await supabase
        .from('chatbots')
        .insert({
          name: newChatbot.name,
          description: newChatbot.description,
          personality: newChatbot.personality,
          knowledge_base: newChatbot.knowledgeBase,
          user_id: user.id,
          api_key: newApiKey,
        })
        .select()
        .single();

      if (error) throw error;

      const nextBots = [data, ...chatbots];
      setChatbots(nextBots);
      setNewChatbot({ name: '', description: '', personality: 'professional', knowledgeBase: '' });
      setShowCreateModal(false);
      triggerConfetti(x, y);
      evaluateGroupCompletion(nextBots);
    } catch (error) {
      console.error('Error creating chatbot:', error);
    }
  };

  const toggleChatbotStatus = async (id: string, currentStatus: string, x?: number, y?: number) => {
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      const { error } = await supabase.from('chatbots').update({ status: newStatus }).eq('id', id);

      if (error) throw error;

      const nextBots = chatbots.map((bot) =>
        bot.id === id ? { ...bot, status: newStatus as 'active' | 'inactive' } : bot
      );
      setChatbots(nextBots);

      if (newStatus === 'active') {
        triggerConfetti(x, y);
      }

      evaluateGroupCompletion(nextBots);
    } catch (error) {
      console.error('Error updating chatbot status:', error);
    }
  };

  const deleteChatbot = async (id: string) => {
    try {
      const { error } = await supabase.from('chatbots').delete().eq('id', id);
      if (error) throw error;

      setChatbots((prev) => prev.filter((bot) => bot.id !== id));

      if (selectedChatbot?.id === id) {
        closeChatModal();
      }

      if (editKBChatbot?.id === id) {
        setShowEditKBModal(false);
        setEditKBChatbot(null);
      }
    } catch (error) {
      console.error('Error deleting chatbot:', error);
    }
  };

  const copyApiKey = (apiKey: string, x?: number, y?: number) => {
    navigator.clipboard.writeText(apiKey);
    triggerConfetti(x, y);
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

  const handleOpenCreateModal = () => {
    if (chatbots.length > 0 && createSectionRef.current) {
      createSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => setShowCreateModal(true), 320);
    } else {
      setShowCreateModal(true);
    }
  };

  if (loading) {
    return (
      <div className={`page-wrap ${styles.center}`}>
        <div className={styles.loadingLayout}>
          <div className={styles.loadingHeader}>
            <div className={`${styles.skeleton} ${styles.skeletonLabel}`} />
            <div className={`${styles.skeleton} ${styles.skeletonTitle}`} />
            <div className={`${styles.skeleton} ${styles.skeletonText}`} />
          </div>
          <div className={styles.loadingStats}>
            <GlassCard className={styles.loadingCard}>
              <div className={`${styles.skeleton} ${styles.skeletonLabel}`} />
              <div className={`${styles.skeleton} ${styles.skeletonValue}`} />
            </GlassCard>
            <GlassCard className={styles.loadingCard}>
              <div className={`${styles.skeleton} ${styles.skeletonLabel}`} />
              <div className={`${styles.skeleton} ${styles.skeletonValue}`} />
            </GlassCard>
            <GlassCard className={styles.loadingCard}>
              <div className={`${styles.skeleton} ${styles.skeletonLabel}`} />
              <div className={`${styles.skeleton} ${styles.skeletonValue}`} />
            </GlassCard>
          </div>
          <GlassCard className={styles.loadingListCard}>
            <div className={`${styles.skeleton} ${styles.skeletonSectionTitle}`} />
            <div className={styles.loadingRows}>
              <div className={`${styles.skeleton} ${styles.skeletonRow}`} />
              <div className={`${styles.skeleton} ${styles.skeletonRow}`} />
              <div className={`${styles.skeleton} ${styles.skeletonRow}`} />
            </div>
          </GlassCard>
        </div>
      </div>
    );
  }

  return (
    <div className={`page-wrap ${styles.root}`}>
      <CompletionOverlay
        open={showCompletionOverlay}
        title="All Chatbots Active"
        subtitle="Every bot in this workspace is now live."
        onDone={() => setShowCompletionOverlay(false)}
      />

      <div className={styles.header}>
        <div>
          <p className="ui-label">Dashboard</p>
          <h1 className={styles.title}>Welcome back, {user?.firstName || 'User'}</h1>
          <p className="ui-muted">Manage your chatbots and integration settings.</p>
        </div>
        <GlassButton variant="primary" onClick={handleOpenCreateModal}>
          Create Chatbot
        </GlassButton>
      </div>

      <div className={styles.statsGrid}>
        <GlassCard className={styles.statCard}>
          <p className="ui-label">Total Chatbots</p>
          <strong>{chatbots.length}</strong>
        </GlassCard>
        <GlassCard className={styles.statCard}>
          <p className="ui-label">Active Bots</p>
          <strong>{chatbots.filter((bot) => bot.status === 'active').length}</strong>
        </GlassCard>
        <GlassCard className={styles.statCard}>
          <p className="ui-label">Total Messages</p>
          <strong>{chatbots.reduce((sum, bot) => sum + bot.message_count, 0)}</strong>
        </GlassCard>
      </div>

      <GlassCard className={styles.listCard}>
        <div className={styles.listHeader}>
          <h2>Your Chatbots</h2>
          <GlassButton variant="secondary" onClick={handleOpenCreateModal}>
            New Chatbot
          </GlassButton>
        </div>

        {chatbots.length === 0 ? (
          <div className={styles.emptyState}>
            <h3>No chatbots yet</h3>
            <p className="ui-muted">Create your first chatbot to start testing.</p>
            <GlassButton variant="primary" onClick={handleOpenCreateModal}>
              Create Chatbot
            </GlassButton>
          </div>
        ) : (
          <div className={styles.chatbotList}>
            {chatbots.map((chatbot) => (
              <GlassCard key={chatbot.id} className={styles.chatbotCard}>
                <div className={styles.rowTop}>
                  <div>
                    <h3>{chatbot.name}</h3>
                    <span className={`${styles.status} ${chatbot.status === 'active' ? styles.active : styles.inactive}`}>
                      {chatbot.status}
                    </span>
                    <p className="ui-muted">{chatbot.description || 'No description provided yet.'}</p>
                  </div>
                </div>

                <label className="ui-label">API Key</label>
                <div className={styles.apiRow}>
                  <input type="text" value={chatbot.api_key} readOnly className="glass-input" />
                  <GlassButton
                    variant="secondary"
                    onClick={(event) => copyApiKey(chatbot.api_key, event.clientX, event.clientY)}
                  >
                    Copy
                  </GlassButton>
                </div>

                <div className={styles.actions}>
                  <GlassButton
                    variant="secondary"
                    onClick={(event) => toggleChatbotStatus(chatbot.id, chatbot.status, event.clientX, event.clientY)}
                  >
                    {chatbot.status === 'active' ? 'Deactivate' : 'Activate'}
                  </GlassButton>
                  <GlassButton variant="secondary" onClick={() => openChatModal(chatbot)}>
                    Test Chat
                  </GlassButton>
                  <GlassButton
                    variant="secondary"
                    onClick={() => {
                      setEditKBChatbot(chatbot);
                      setEditKBValue(chatbot.knowledge_base || '');
                      setEditKBError('');
                      setShowEditKBModal(true);
                    }}
                  >
                    Edit Knowledge Base
                  </GlassButton>
                  <GlassButton variant="secondary" onClick={() => openIntegrationModal(chatbot)}>
                    Integration Guide
                  </GlassButton>
                  <GlassButton
                    variant="danger"
                    onClick={() => {
                      if (window.confirm(`Are you sure you want to delete ${chatbot.name}? This action cannot be undone.`)) {
                        deleteChatbot(chatbot.id);
                      }
                    }}
                  >
                    Delete
                  </GlassButton>
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </GlassCard>

      <div ref={createSectionRef} className={styles.anchor} />

      {showCreateModal && (
        <div className="modal-overlay">
          <GlassCard className={`${styles.modal} modal-panel`}>
            <h2>Create New Chatbot</h2>
            <div className={styles.formGrid}>
              <div>
                <label className="ui-label">Chatbot Name</label>
                <input
                  type="text"
                  value={newChatbot.name}
                  onChange={(event) => setNewChatbot({ ...newChatbot, name: event.target.value })}
                  className="glass-input"
                  placeholder="Customer Support Bot"
                />
              </div>

              <div>
                <label className="ui-label">Description</label>
                <textarea
                  value={newChatbot.description}
                  onChange={(event) => setNewChatbot({ ...newChatbot, description: event.target.value })}
                  className="glass-textarea"
                  rows={3}
                  placeholder="What this chatbot helps with"
                />
              </div>

              <div>
                <label className="ui-label">Personality</label>
                <select
                  value={newChatbot.personality}
                  onChange={(event) => setNewChatbot({ ...newChatbot, personality: event.target.value })}
                  className="glass-select"
                >
                  <option value="professional">Professional</option>
                  <option value="friendly">Friendly</option>
                  <option value="casual">Casual</option>
                  <option value="formal">Formal</option>
                  <option value="humorous">Humorous</option>
                </select>
              </div>

              <div>
                <label className="ui-label">Knowledge Base</label>
                <textarea
                  value={newChatbot.knowledgeBase}
                  onChange={(event) => setNewChatbot({ ...newChatbot, knowledgeBase: event.target.value })}
                  className="glass-textarea"
                  rows={4}
                  placeholder="FAQs or domain context"
                />
              </div>
            </div>

            <div className={styles.modalActions}>
              <GlassButton variant="secondary" onClick={() => setShowCreateModal(false)}>
                Cancel
              </GlassButton>
              <GlassButton
                variant="primary"
                onClick={(event) => handleCreateChatbot(event.clientX, event.clientY)}
                disabled={!newChatbot.name.trim()}
              >
                Create
              </GlassButton>
            </div>
          </GlassCard>
        </div>
      )}

      {showIntegrationModal && selectedChatbot && (
        <div className="modal-overlay">
          <GlassCard className={`${styles.modalWide} modal-panel`}>
            <div className={styles.modalHeaderRow}>
              <h2>Integration Guide: {selectedChatbot.name}</h2>
              <GlassButton variant="secondary" onClick={closeIntegrationModal}>
                Close
              </GlassButton>
            </div>

            <div className={styles.integrationBlock}>
              <p className="ui-label">Integration Details</p>
              <pre className={styles.pre}>{`API Key: ${selectedChatbot.api_key}
Chatbot ID: ${selectedChatbot.id}
Supabase URL: ${supabaseUrl}`}</pre>
            </div>

            <div className={styles.integrationBlock}>
              <p className="ui-label">Endpoint</p>
              <pre className={styles.pre}>{`${supabaseUrl}/functions/v1/chatbot-chat
Method: POST
Headers: Content-Type, X-Api-Key`}</pre>
            </div>
          </GlassCard>
        </div>
      )}

      {showEditKBModal && editKBChatbot && (
        <div className="modal-overlay">
          <GlassCard className={`${styles.modal} modal-panel`}>
            <h2>Edit Knowledge Base</h2>
            <textarea
              className="glass-textarea"
              rows={10}
              value={editKBValue}
              onChange={(event) => setEditKBValue(event.target.value)}
              disabled={editKBLoading}
            />

            {editKBError && <p className={styles.error}>{editKBError}</p>}

            <div className={styles.modalActions}>
              <GlassButton variant="secondary" onClick={() => setShowEditKBModal(false)} disabled={editKBLoading}>
                Cancel
              </GlassButton>
              <GlassButton
                variant="primary"
                disabled={editKBLoading}
                onClick={async () => {
                  setEditKBLoading(true);
                  setEditKBError('');
                  try {
                    const { error } = await supabase
                      .from('chatbots')
                      .update({ knowledge_base: editKBValue })
                      .eq('id', editKBChatbot.id);
                    if (error) throw error;

                    setChatbots(
                      chatbots.map((bot) =>
                        bot.id === editKBChatbot.id ? { ...bot, knowledge_base: editKBValue } : bot
                      )
                    );
                    setShowEditKBModal(false);
                  } catch {
                    setEditKBError('Failed to update knowledge base.');
                  } finally {
                    setEditKBLoading(false);
                  }
                }}
              >
                {editKBLoading ? 'Saving...' : 'Save'}
              </GlassButton>
            </div>
          </GlassCard>
        </div>
      )}

      {showChatModal && selectedChatbot && (
        <ChatInterface
          chatbotId={selectedChatbot.id}
          chatbotName={selectedChatbot.name}
          apiKey={selectedChatbot.api_key}
          onClose={closeChatModal}
        />
      )}
    </div>
  );
};

export default Dashboard;
