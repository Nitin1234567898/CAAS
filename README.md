# 🤖 Chatbot-as-a-Service

A modern, full-stack chatbot platform that allows users to create, customize, and deploy AI-powered chatbots for their websites with just an API key.

## ✨ Features

- **🚀 Quick Setup**: Create custom chatbots in minutes with an intuitive interface
- **🎨 Customizable Personality**: Define your chatbot's tone, style, and knowledge base
- **🔌 Easy Integration**: Simple API integration for any website
- **📊 Analytics Dashboard**: Monitor chatbot performance and usage
- **🔐 Secure Authentication**: Built with Clerk for secure user management
- **⚡ Real-time AI**: Powered by Groq AI for intelligent responses
- **🎯 Multiple Integration Methods**: HTML/JavaScript and React component support

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **regukar CSS** for styling
- **React Router** for navigation
- **Clerk** for authentication

### Backend
- **Supabase** for database and backend services
- **PostgreSQL** database
- **Supabase Edge Functions** for API endpoints
- **Groq AI** for chatbot responses

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Supabase account
- Clerk account
- Groq API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd chatbot-service
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   REACT_APP_SUPABASE_URL=your_supabase_url
   REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase**
   - Create a new Supabase project
   - Run the SQL schema from `supabase/schema.sql`
   - Deploy the Edge Functions from `supabase/functions/`
   - Set up environment variables in Supabase dashboard

5. **Start the development server**
   ```bash
   npm start
   ```

## 📁 Project Structure

```
chatbot-service/
├── public/                 # Static files
├── src/
│   ├── components/         # Reusable React components
│   ├── pages/             # Page components
│   ├── lib/               # Utility libraries
│   └── index.tsx          # App entry point
├── supabase/
│   ├── functions/         # Edge Functions
│   └── schema.sql         # Database schema
├── package.json
└── README.md
```

## 🔧 Configuration

### Supabase Setup
1. Create a new Supabase project
2. Execute the schema from `supabase/schema.sql`
3. Deploy Edge Functions:
   ```bash
   supabase functions deploy chatbot-chat
   ```
4. Set environment variables in Supabase dashboard:
   - `GROQ_API_KEY`: Your Groq API key

### Clerk Setup
1. Create a Clerk application
2. Configure authentication settings
3. Add your domain to allowed origins

## 📖 API Documentation

### Chatbot Chat Endpoint
```
POST /functions/v1/chatbot-chat
```

**Headers:**
```
Content-Type: application/json
Authorization: Bearer YOUR_API_KEY
```

**Request Body:**
```json
{
  "chatbotId": "your-chatbot-uuid",
  "message": "User's message here",
  "userId": "unique-user-identifier"
}
```

**Response:**
```json
{
  "response": "AI-generated response from your chatbot",
  "chatbot": {
    "id": "chatbot-uuid",
    "name": "Your Chatbot Name",
    "personality": "Your chatbot's personality"
  }
}
```

## 🔗 Integration Examples

### HTML/JavaScript Integration
```html
<script>
const API_KEY = 'YOUR_API_KEY_HERE';
const CHATBOT_ID = 'YOUR_CHATBOT_ID_HERE';
const SUPABASE_URL = 'https://your-project-ref.supabase.co';

// Add your chatbot integration code here
</script>
```

### React Integration
```jsx
import ChatbotWidget from './ChatbotWidget';

function App() {
  return (
    <div>
      <ChatbotWidget 
        apiKey="YOUR_API_KEY_HERE"
        chatbotId="YOUR_CHATBOT_ID_HERE"
        supabaseUrl="https://your-project-ref.supabase.co"
      />
    </div>
  );
}
```

## 🚀 Deployment

### Frontend Deployment
1. Build the production version:
   ```bash
   npm run build
   ```
2. Deploy to your preferred hosting service (Vercel, Netlify, etc.)

### Backend Deployment
- Supabase Edge Functions are automatically deployed when you push to the repository
- Ensure environment variables are set in Supabase dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:
1. Check the [Integration Guide](INTEGRATION_GUIDE.md)
2. Review the [Deployment Guide](DEPLOYMENT_GUIDE.md)
3. Open an issue on GitHub

## 🎯 Roadmap

- [ ] Multi-language support
- [ ] Advanced analytics and reporting
- [ ] Custom chatbot themes
- [ ] Voice chat integration
- [ ] Mobile app
- [ ] Enterprise features

---

Built with ❤️ using React, Supabase, and Groq AI