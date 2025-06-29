import { http, createConfig } from 'wagmi'
import { base, baseSepolia, mainnet, sepolia } from 'wagmi/chains'
import { farcasterFrame as miniAppConnector } from '@farcaster/frame-wagmi-connector'
import { metaMask } from 'wagmi/connectors'
import { walletConnect } from 'wagmi/connectors'
import { coinbaseWallet } from 'wagmi/connectors'
import { injected } from 'wagmi/connectors'

// Demo/Testnet mode configuration
const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === 'true' || true // Enable testnet for demo

// RPC URLs from environment or fallback to public RPCs
const baseRpcUrl = DEMO_MODE 
  ? (process.env.NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL || 'https://sepolia.base.org')
  : (process.env.NEXT_PUBLIC_BASE_RPC_URL || 'https://mainnet.base.org')
const mainnetRpcUrl = DEMO_MODE
  ? (process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL || 'https://eth-sepolia.public.blastapi.io')
  : (process.env.NEXT_PUBLIC_MAINNET_RPC_URL || 'https://eth-mainnet.alchemyapi.io/v2/demo')

// Create connectors with error handling
const createConnectors = () => {
  const connectors = [
    miniAppConnector(),
    injected(), // Browser wallets (MetaMask, Brave, etc.)
    metaMask(),
    coinbaseWallet({
      appName: 'StoryRipple',
      appLogoUrl: '/assets/icon.png',
    }),
  ];

  // Only add WalletConnect if we have a valid project ID and not in development hot reload
  const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;
  if (walletConnectProjectId && walletConnectProjectId !== 'demo-project-id') {
    try {
      connectors.push(
        walletConnect({
          projectId: walletConnectProjectId,
          metadata: {
            name: 'StoryRipple',
            description: 'Collaborative branching stories',
            url: typeof window !== 'undefined' ? window.location.origin : 'https://storyripple.com',
            icons: ['/assets/icon.png']
          },
          showQrCodeModal: true,
        })
      );
    } catch (error) {
      console.warn('WalletConnect initialization skipped:', error);
    }
  }

  return connectors;
};

// Singleton config to prevent multiple initializations
let configInstance: ReturnType<typeof createConfig> | null = null;

const createWagmiConfig = () => {
  if (configInstance) {
    return configInstance;
  }

  configInstance = createConfig({
    chains: DEMO_MODE ? [baseSepolia, sepolia] : [base, mainnet],
    transports: DEMO_MODE ? {
      [baseSepolia.id]: http(baseRpcUrl),
      [sepolia.id]: http(mainnetRpcUrl),
    } : {
      [base.id]: http(baseRpcUrl),
      [mainnet.id]: http(mainnetRpcUrl),
    },
    connectors: createConnectors(),
    ssr: true, // Enable SSR support
  });

  return configInstance;
};

export const config = createWagmiConfig();

// Zora coins are primarily deployed on Base
export const ZORA_CHAIN = DEMO_MODE ? baseSepolia : base
export const USDC_ADDRESS = DEMO_MODE 
  ? '0x036CbD53842c5426634e7929541eC2318f3dCF7e' // USDC on Base Sepolia
  : '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913' // USDC on Base

// Demo mode indicator
export const IS_DEMO_MODE = DEMO_MODE

// Helper function to check if we're in a Farcaster context
export const isFarcasterContext = () => {
  if (typeof window === 'undefined') return false
  return window.parent !== window || 
         window.location !== window.parent.location ||
         document.referrer.includes('warpcast.com') ||
         document.referrer.includes('farcaster.xyz')
} 