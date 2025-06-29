# 🚀 Deployment Guide for Your Chatbot Service

## 📋 Step-by-Step Setup

### Step 1: Environment Variables ✅
Create `.env.local` file in your project root:

```env
# Supabase Configuration
REACT_APP_SUPABASE_URL=https://hpeivvcyazpxfxenoglk.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwZWl2dmN5YXpweGZ4ZW5vZ2xrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExOTAyMDMsImV4cCI6MjA2Njc2NjIwM30.Wnz9xpvGlHpc8EFrxhOv8ldGtE7EhyeZLK25yeL9wbk

# Google Gemini API (Get this from Google AI Studio)
REACT_APP_GEMINI_API_KEY=your_gemini_api_key_here

# Clerk Authentication
REACT_APP_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
```

### Step 2: Set Up Database ✅
1. Go to: https://supabase.com/dashboard/project/hpeivvcyazpxfxenoglk
2. Click **SQL Editor** in the left sidebar
3. Copy the entire content from `supabase/schema.sql`
4. Paste it in the SQL editor
5. Click **Run** button

### Step 3: Get Gemini API Key
1. Visit: https://makersuite.google.com/app/apikey
2. Sign in with Google account
3. Click **Create API Key**
4. Copy the key and update your `.env.local` file

### Step 4: Deploy Edge Function (Alternative Method)

Since CLI installation had issues, let's deploy manually:

1. **Go to Supabase Dashboard**
   - Navigate to: https://supabase.com/dashboard/project/hpeivvcyazpxfxenoglk
   - Click **Edge Functions** in the left sidebar

2. **Create New Function**
   - Click **Create a new function**
   - Name: `chatbot-chat`
   - Copy the content from `supabase/functions/chatbot-chat/index.ts`
   - Paste it in the function editor

3. **Set Environment Variables**
   - In the Edge Functions section, click **Settings**
   - Add environment variable:
     - Key: `GEMINI_API_KEY`
     - Value: Your Gemini API key

4. **Deploy Function**
   - Click **Deploy** button

### Step 5: Test Your Setup

1. **Start the frontend**:
   ```bash
   npm start
   ```

2. **Create a test chatbot**:
   - Go to Dashboard
   - Click "Create New Chatbot"
   - Fill in the details
   - Click "Create Chatbot"

3. **Test the chat**:
   - Click "Test Chat" on your chatbot
   - Send a message
   - You should see Gemini respond with your custom personality!

## 🔧 Troubleshooting

### If you get CORS errors:
- Make sure the Edge Function is deployed
- Check that the function name is exactly `chatbot-chat`

### If you get authentication errors:
- Verify your Supabase URL and anon key are correct
- Check that the database schema was run successfully

### If Gemini doesn't respond:
- Verify your Gemini API key is correct
- Check the Edge Function logs in Supabase dashboard
- Make sure you have quota available in Google AI Studio

## 🎯 What Should Work After Setup

✅ **Dashboard loads** with empty chatbot list  
✅ **Create chatbot** form works  
✅ **Chatbot appears** in the list with API key  
✅ **Test Chat** opens chat interface  
✅ **Gemini responds** with custom personality  
✅ **Messages are saved** to database  

## 📞 Need Help?

1. Check browser console for errors
2. Check Supabase Edge Function logs
3. Verify all environment variables are set
4. Make sure database schema was applied

---

**🎉 Once you complete these steps, your chatbot service will be fully functional!**

# Deployment Guide

This guide will help you deploy your chatbot-as-a-service platform to production.

## 🚀 Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Build your project**
   ```bash
   npm run build
   ```

3. **Deploy to Vercel**
   ```bash
   vercel
   ```

4. **Set environment variables in Vercel dashboard:**
   - `REACT_APP_SUPABASE_URL`
   - `REACT_APP_SUPABASE_ANON_KEY`
   - `REACT_APP_CLERK_PUBLISHABLE_KEY`

### Option 2: Netlify

1. **Build your project**
   ```bash
   npm run build
   ```

2. **Drag and drop the `build` folder to Netlify**

3. **Set environment variables in Netlify dashboard**

### Option 3: GitHub Pages

1. **Add homepage to package.json**
   ```json
   {
     "homepage": "https://yourusername.github.io/your-repo-name"
   }
   ```

2. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Add deploy script to package.json**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

## 🔧 Backend Deployment

### Supabase Setup

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Note your project URL and anon key

2. **Deploy Database Schema**
   ```bash
   # Copy your schema.sql content and run it in Supabase SQL editor
   ```

3. **Deploy Edge Functions**
   ```bash
   # Install Supabase CLI
   npm install -g supabase

   # Login to Supabase
   supabase login

   # Link your project
   supabase link --project-ref your-project-ref

   # Deploy functions
   supabase functions deploy chatbot-chat
   ```

4. **Set Environment Variables**
   - Go to Supabase Dashboard → Settings → Edge Functions
   - Add your `GEMINI_API_KEY`

## 🔐 Authentication Setup

### Clerk Configuration

1. **Create Clerk Application**
   - Go to [clerk.com](https://clerk.com)
   - Create a new application
   - Get your publishable key

2. **Configure Allowed Origins**
   - Add your domain to allowed origins
   - Add localhost for development

3. **Set up OAuth providers (optional)**
   - Google, GitHub, etc.

## 🌐 Domain Configuration

### Custom Domain Setup

1. **Vercel/Netlify**
   - Add custom domain in dashboard
   - Update DNS records

2. **Clerk**
   - Add domain to allowed origins
   - Configure OAuth redirect URLs

3. **Supabase**
   - Add domain to allowed origins if needed

## 📊 Environment Variables

### Frontend (.env)
```env
REACT_APP_SUPABASE_URL=https://your-project-ref.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-supabase-anon-key
REACT_APP_CLERK_PUBLISHABLE_KEY=pk_test_your-clerk-key
```

### Backend (Supabase Dashboard)
```env
GEMINI_API_KEY=your-gemini-api-key
```

## 🔍 Post-Deployment Checklist

- [ ] Test user registration/login
- [ ] Test chatbot creation
- [ ] Test chatbot chat functionality
- [ ] Test API key generation
- [ ] Test integration code
- [ ] Check error logs
- [ ] Monitor performance
- [ ] Set up analytics (optional)

## 🛠️ Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check Supabase allowed origins
   - Verify API endpoints

2. **Authentication Issues**
   - Check Clerk configuration
   - Verify environment variables

3. **Function Deployment Failures**
   - Check Supabase CLI version
   - Verify function code syntax

4. **Database Connection Issues**
   - Check Supabase URL and keys
   - Verify RLS policies

## 📈 Monitoring & Analytics

### Supabase Dashboard
- Monitor function invocations
- Check database performance
- Review error logs

### Vercel/Netlify Analytics
- Track page views
- Monitor performance
- Check error rates

## 🔒 Security Considerations

1. **Environment Variables**
   - Never commit secrets to git
   - Use secure environment variable storage

2. **API Keys**
   - Rotate keys regularly
   - Monitor usage

3. **CORS Configuration**
   - Only allow necessary origins
   - Review regularly

4. **Rate Limiting**
   - Implement if needed
   - Monitor abuse

## 🚀 Production Optimization

1. **Performance**
   - Enable gzip compression
   - Optimize images
   - Use CDN

2. **SEO**
   - Add meta tags
   - Configure sitemap
   - Set up analytics

3. **Monitoring**
   - Set up error tracking
   - Monitor uptime
   - Track user behavior

## 📞 Support

If you encounter issues during deployment:

1. Check the troubleshooting section
2. Review error logs
3. Verify all environment variables
4. Test locally first
5. Contact support if needed

## 🎉 Launch Checklist

Before going live:

- [ ] All features tested
- [ ] Environment variables configured
- [ ] Domain configured
- [ ] SSL certificate active
- [ ] Analytics set up
- [ ] Error monitoring active
- [ ] Backup strategy in place
- [ ] Documentation updated
- [ ] Support channels ready 