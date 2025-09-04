# Next.js Base Mini App

A modern Next.js application built with OnchainKit, featuring wallet connectivity, Base network integration, and web3 functionality.

## 🚀 Features

- **Next.js 14** with App Router
- **OnchainKit Integration** for seamless web3 interactions
- **Coinbase Smart Wallet** connectivity
- **Base Network** support (mainnet and testnet)
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Responsive Design** with modern UI components
- **PWA Support** with manifest.json

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Web3**: OnchainKit, Wagmi, Viem
- **Wallet**: Coinbase Wallet SDK
- **Icons**: Lucide React
- **State Management**: React Query

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- OnchainKit API key (optional but recommended)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nextjs-base-mini-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your values in `.env.local`:
   ```env
   NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_api_key_here
   NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:3000`

## 🏗️ Building

Build for production:
```bash
npm run build
```

Start the production server:
```bash
npm run start
```

Type check:
```bash
npm run type-check
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── providers.tsx      # Context providers
├── components/            # React components
│   ├── Header.tsx         # App header
│   └── WalletConnect.tsx  # Wallet connection
├── lib/                   # Utility libraries
│   ├── utils.ts           # Helper functions
│   └── wagmi.ts           # Wagmi configuration
├── hooks/                 # Custom React hooks
└── utils/                 # Utility functions
```

## 🔗 OnchainKit Integration

This app uses OnchainKit for:

- **Wallet Connection**: Seamless wallet connectivity with Coinbase Smart Wallet
- **Identity Components**: Display user avatar, name, address, and balance
- **Base Network**: Built-in support for Base mainnet and testnet
- **Type Safety**: Full TypeScript support for all components

### Key Components Used:

- `ConnectWallet`: Wallet connection button
- `Wallet`: Main wallet component wrapper
- `WalletDropdown`: Dropdown menu for connected wallet
- `Identity`: User identity display (avatar, name, address, balance)
- `Avatar`, `Name`, `Address`, `EthBalance`: Individual identity components

## 🌐 Base Network

The app is configured to work with:

- **Base Mainnet**: For production use
- **Base Sepolia**: For testing and development

The network configuration is handled automatically by OnchainKit and Wagmi.

## 🎨 Styling

The app uses a modern design system with:

- **CSS Variables**: For consistent theming
- **Dark/Light Mode**: Support for both themes
- **Responsive Design**: Mobile-first approach
- **Component Classes**: Reusable button and card styles
- **Base Brand Colors**: Official Base blue colors

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_ONCHAINKIT_API_KEY` | OnchainKit API key for enhanced features | No |
| `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` | WalletConnect project ID | No |
| `NEXT_PUBLIC_APP_NAME` | App display name | No |
| `NEXT_PUBLIC_APP_URL` | App URL for redirects | No |

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms

1. Build the project: `npm run build`
2. Serve the `.next` folder using any Node.js hosting service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run type check: `npm run type-check`
5. Build the project: `npm run build`
6. Commit your changes: `git commit -m 'Add amazing feature'`
7. Push to the branch: `git push origin feature/amazing-feature`
8. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:

- Check the [OnchainKit documentation](https://onchainkit.xyz)
- Visit the [Base documentation](https://docs.base.org)
- Open an issue in this repository

## 🔗 Links

- [OnchainKit](https://onchainkit.xyz)
- [Base](https://base.org)
- [Next.js](https://nextjs.org)
- [Wagmi](https://wagmi.sh)
- [Tailwind CSS](https://tailwindcss.com)
