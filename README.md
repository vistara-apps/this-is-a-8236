# Task Weaver AI

A powerful AI-driven task automation platform built with React, Vite, and modern web technologies.

## 🚀 Features

- **AI Agent Management**: Create and manage custom AI agents for various tasks
- **Data Source Integration**: Connect multiple data sources (files, APIs, text, URLs)
- **Task Automation**: Automate complex workflows with AI-powered agents
- **Real-time Dashboard**: Monitor tasks, usage, and performance metrics
- **Subscription Management**: Integrated billing with Stripe
- **Secure Authentication**: Powered by Supabase Auth

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, TypeScript/JavaScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (Database, Auth, Real-time)
- **AI**: OpenAI GPT models
- **Payments**: Stripe
- **Charts**: Recharts
- **Forms**: React Hook Form
- **State Management**: Zustand
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- OpenAI API key
- Stripe account (for payments)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-weaver-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your actual values in `.env.local`:
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key
   - `VITE_OPENAI_API_KEY`: Your OpenAI API key
   - `VITE_STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key

4. **Set up the database**
   
   Run the SQL scripts in the `database/` folder in your Supabase SQL editor:
   ```bash
   # First run the schema
   database/schema.sql
   
   # Then optionally run the seed data (for development)
   database/seed.sql
   ```

## 🚀 Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 🏗️ Building

Build for production:
```bash
npm run build
```

Build with verification:
```bash
npm run build:verify
```

Preview the production build:
```bash
npm run preview
```

Type check:
```bash
npm run type-check
```

Verify build output:
```bash
npm run verify-build
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── contexts/           # React contexts (Auth, etc.)
├── pages/              # Page components
├── services/           # External service integrations
├── lib/                # Utility libraries
├── config/             # Configuration files
└── App.jsx             # Main app component
```

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Supabase project URL | Yes |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `VITE_OPENAI_API_KEY` | OpenAI API key | Yes |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | Yes |
| `VITE_APP_URL` | App URL (for redirects) | No |
| `VITE_APP_NAME` | App display name | No |
| `VITE_APP_VERSION` | App version | No |

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

1. Build the project: `npm run build`
2. Serve the `dist` folder using any static file server

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and build
5. Submit a pull request

## 📞 Support

For support, please open an issue in the repository or contact the development team.
