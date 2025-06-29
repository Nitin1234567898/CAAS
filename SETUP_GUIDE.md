# Chatbot Service Setup Guide

## 🚀 Today's Progress: Supabase + Gemini Integration

Your chatbot service is now set up with:
- ✅ **Frontend**: React + TypeScript with Clerk auth
- ✅ **Backend**: Supabase (Database + Edge Functions)
- ✅ **AI**: Google Gemini API integration
- ✅ **Chat Interface**: Real-time chat testing

## 📋 Setup Steps

### 1. Supabase Setup

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Sign up/login and create a new project
   - Note your project URL and anon key

2. **Set Environment Variables**
   Create a `.env.local` file in your project root:
   ```env
   REACT_APP_SUPABASE_URL=your_supabase_url_here
   REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   REACT_APP_GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. **Run Database Schema**
   - Go to your Supabase dashboard
   - Navigate to SQL Editor
   - Copy and paste the contents of `supabase/schema.sql`
   - Run the SQL to create tables and policies

### 2. Google Gemini API Setup

1. **Get API Key**
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Add it to your `.env.local` file

### 3. Deploy Edge Function

1. **Install Supabase CLI**
   ```bash
   npm install -g supabase
   ```

2. **Login to Supabase**
   ```bash
   supabase login
   ```

3. **Link your project**
   ```bash
   supabase link --project-ref your-project-ref
   ```

4. **Deploy the function**
   ```bash
   supabase functions deploy chatbot-chat
   ```

5. **Set environment variables in Supabase**
   ```bash
   supabase secrets set GEMINI_API_KEY=your_gemini_api_key_here
   ```

## 🎯 How It Works

### User Flow:
1. **User creates chatbot** with custom personality and knowledge
2. **Frontend saves** to Supabase database
3. **User tests chatbot** via chat interface
4. **Edge Function calls Gemini** with custom inputs
5. **Gemini responds** as the customized chatbot
6. **Chat history** is saved to database

### Key Features:
- ✅ **Custom Personalities**: Professional, Friendly, Casual, etc.
- ✅ **Knowledge Base**: Custom information for each chatbot
- ✅ **Real-time Chat**: Test chatbots instantly
- ✅ **Message History**: Track all conversations
- ✅ **API Keys**: Each chatbot gets unique API key
- ✅ **User Isolation**: Users only see their own chatbots

## 🔧 Testing Your Setup

1. **Start the frontend**:
   ```bash
   npm start
   ```

2. **Create a chatbot**:
   - Go to Dashboard
   - Click "Create New Chatbot"
   - Fill in name, description, personality, and knowledge base

3. **Test the chatbot**:
   - Click "Test Chat" on any chatbot
   - Send messages and see Gemini respond with custom personality

## 📁 Project Structure

```
CB/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   └── ChatInterface.tsx    # Chat testing interface
│   ├── pages/
│   │   ├── Dashboard.tsx        # Main dashboard (updated)
│   │   ├── HomePage.tsx
│   │   └── LoginPage.tsx
│   └── lib/
│       └── supabase.ts          # Supabase client & types
├── supabase/
│   ├── functions/
│   │   └── chatbot-chat/        # Gemini integration
│   └── schema.sql              # Database schema
└── env.example                 # Environment variables template
```

## 🎉 What's Working Now

- ✅ **User Authentication** with Clerk
- ✅ **Dashboard** with chatbot management
- ✅ **Chatbot Creation** with custom inputs
- ✅ **Supabase Integration** for data storage
- ✅ **Gemini API Integration** for AI responses
- ✅ **Real-time Chat Testing**
- ✅ **Message History** tracking
- ✅ **API Key Generation** for each chatbot

## 🚀 Next Steps

1. **Test the integration** - Create a chatbot and test the chat
2. **Add more features** - Analytics, message export, etc.
3. **Deploy to production** - Vercel for frontend, Supabase for backend
4. **Add more AI models** - Support for other providers

## 🔍 Troubleshooting

### Common Issues:
1. **CORS errors**: Make sure Supabase Edge Function is deployed
2. **Authentication errors**: Check Clerk configuration
3. **Gemini API errors**: Verify API key and quota
4. **Database errors**: Run the schema.sql in Supabase

### Need Help?
- Check Supabase logs in dashboard
- Check browser console for frontend errors
- Verify all environment variables are set

---

**🎯 Your chatbot service is now ready for testing!** 

The core functionality is complete - users can create custom chatbots with specific personalities and knowledge bases, and test them in real-time using Google Gemini AI. 