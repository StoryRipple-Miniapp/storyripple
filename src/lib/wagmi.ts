import { http, createConfig } from 'wagmi'
import { base, mainnet } from 'wagmi/chains'
import { farcasterFrame as miniAppConnector } from '@farcaster/frame-wagmi-connector'

// RPC URLs from environment or fallback to public RPCs
const baseRpcUrl = process.env.NEXT_PUBLIC_BASE_RPC_URL || 'https://mainnet.base.org'
const mainnetRpcUrl = process.env.NEXT_PUBLIC_MAINNET_RPC_URL || 'https://eth-mainnet.alchemyapi.io/v2/demo'

export const config = createConfig({
  chains: [base, mainnet],
  transports: {
    [base.id]: http(baseRpcUrl),
    [mainnet.id]: http(mainnetRpcUrl),
  },
  connectors: [
    miniAppConnector()
  ]
})

// Zora coins are primarily deployed on Base
export const ZORA_CHAIN = base
export const USDC_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913' // USDC on Base

// Helper function to check if we're in a Farcaster context
export const isFarcasterContext = () => {
  if (typeof window === 'undefined') return false
  return window.parent !== window || 
         window.location !== window.parent.location ||
         document.referrer.includes('warpcast.com') ||
         document.referrer.includes('farcaster.xyz')
} 