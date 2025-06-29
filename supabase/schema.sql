-- Enable Row Level Security
-- ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create chatbots table
CREATE TABLE IF NOT EXISTS chatbots (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  personality TEXT NOT NULL,
  knowledge_base TEXT,
  api_key VARCHAR(255) UNIQUE NOT NULL,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  message_count INTEGER DEFAULT 0,
  user_id TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create chat_messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  chatbot_id UUID REFERENCES chatbots(id) ON DELETE CASCADE,
  user_message TEXT NOT NULL,
  bot_response TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id TEXT NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_chatbots_user_id ON chatbots(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_chatbot_id ON chat_messages(chatbot_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_user_id ON chat_messages(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON chat_messages(created_at);

-- Enable Row Level Security
ALTER TABLE chatbots ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for chatbots table (allowing all operations for now)
CREATE POLICY "Allow all operations on chatbots" ON chatbots
  FOR ALL USING (true);

-- Create policies for chat_messages table (allowing all operations for now)
CREATE POLICY "Allow all operations on chat_messages" ON chat_messages
  FOR ALL USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_chatbots_updated_at 
  BEFORE UPDATE ON chatbots 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to generate API key
CREATE OR REPLACE FUNCTION generate_api_key()
RETURNS TRIGGER AS $$
BEGIN
  NEW.api_key := 'cb_live_' || substr(md5(random()::text), 1, 16);
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for API key generation
CREATE TRIGGER generate_chatbot_api_key
  BEFORE INSERT ON chatbots
  FOR EACH ROW EXECUTE FUNCTION generate_api_key(); 