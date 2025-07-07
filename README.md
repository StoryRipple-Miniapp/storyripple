# StoryRipple 🌊

A collaborative branching story platform built on Farcaster with integrated story-based coin economies powered by Zora.

## 🌟 Features

- **Story Creation & Branching**: Create and branch interactive stories
- **Economic Layer**: Story-based coins with real economic value using Zora CoinV4
- **Farcaster Integration**: Seamless integration with Farcaster ecosystem
- **Web3 Wallet Support**: Multiple wallet connections including:
  - Farcaster Mini App connector
  - MetaMask
  - WalletConnect
  - Coinbase Wallet
  - Injected wallets (Brave, etc.)
- **Beautiful UI**: Modern, responsive design with animated galaxy background
- **Revenue Model**: 15% platform fees on creation and trading

## 🚀 Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- A Zora API key
- (Optional) Custom RPC URLs for better performance

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/storyripple.git
cd storyripple
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env-example.txt .env.local
```

4. Configure your `.env.local` with required values:
```env
# Get your API key from: https://zora.co/settings/developer
NEXT_PUBLIC_ZORA_API_KEY=your_zora_api_key_here

# Optional: Custom RPC URLs for better performance
NEXT_PUBLIC_BASE_RPC_URL=your_base_rpc_url
NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL=your_base_sepolia_rpc_url

# Optional: WalletConnect Project ID
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id
```

5. Run the development server:
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the app.

## 🏗️ Architecture

### Tech Stack

- **Frontend**: Next.js 15.3.3 with React 19
- **Styling**: TailwindCSS with custom theme
- **Web3**: 
  - Wagmi v2
  - Viem
  - Zora Coins SDK
  - Farcaster Frame SDK
- **Performance**: 
  - SWC minification
  - Optimized images and fonts
  - CSS optimization
  - Security headers

### Key Components

- `WalletProvider`: Manages Web3 wallet connections
- `GalaxyBackground`: Animated background with 3D effects
- `AppInitializer`: Handles app bootstrapping
- `useZoraCoins`: Custom hook for Zora integration

## 💰 Economic Model

StoryRipple implements a unique economic model where:

- Each story can have its own coin
- Coins are created using Zora CoinV4 protocol
- Platform earns 15% of:
  - Coin creation fees
  - Trading fees
  - Through the `platformReferrer` system

## 🔒 Security

- CSP headers configured for production
- API keys and sensitive data properly managed
- Secure wallet connections
- XSS protection enabled
- Frame protection headers

## 🧪 Testing

The app includes a test environment for trying out features:

```bash
# Run in development mode
npm run dev

# Visit the test trading page
http://localhost:3000/test-trading
```

## 🛠️ Development Mode

For testing and development, the app includes a demo mode that:
- Uses Base Sepolia testnet
- Provides test ETH functionality
- Maintains identical features to production
- Shows clear testnet indicators

To enable demo mode:
```env
NEXT_PUBLIC_DEMO_MODE=true
```

## 📱 Responsive Design

The app is fully responsive with:
- Mobile-first design
- Animated components
- Custom scrollbars
- Performance optimizations
- Font optimization

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🌐 Links

- [Zora Documentation](https://docs.zora.co)
- [Base Network](https://base.org)
- [Farcaster](https://farcaster.xyz)

## 🙏 Acknowledgments

- Zora team for the Coins SDK
- Farcaster team for the Frame SDK
- Base team for the L2 infrastructure
