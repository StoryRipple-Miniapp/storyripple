import { setApiKey } from '@zoralabs/coins-sdk'

// Zora API configuration
export const ZORA_API_KEY = process.env.NEXT_PUBLIC_ZORA_API_KEY || ''

// Initialize Zora SDK with API key
if (ZORA_API_KEY) {
  setApiKey(ZORA_API_KEY)
}

// Zora Factory Contract Address on Base
export const ZORA_FACTORY_ADDRESS = '0x777777751622c0d3258f214F9DF38E35BF45baF3'

// Currency configuration for Zora coins
export const CURRENCY_CONFIG = {
  ETH: '0x0000000000000000000000000000000000000000', // ETH address
  USDC: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', // USDC on Base
}

// Platform referrer address (your platform's address for earning fees)
export const PLATFORM_REFERRER = process.env.NEXT_PUBLIC_PLATFORM_REFERRER || ''

// Default coin creation parameters
export const DEFAULT_COIN_CONFIG = {
  currency: CURRENCY_CONFIG.ETH, // Use ETH as default trading pair
  chainId: 8453, // Base chain ID
  platformReferrer: PLATFORM_REFERRER,
} 