import { http, createConfig } from 'wagmi'
import { base, mainnet } from 'wagmi/chains'
import { farcasterFrame as miniAppConnector } from '@farcaster/frame-wagmi-connector'

export const config = createConfig({
  chains: [base, mainnet],
  transports: {
    [base.id]: http(),
    [mainnet.id]: http(),
  },
  connectors: [
    miniAppConnector()
  ]
})

// Zora coins are primarily deployed on Base
export const ZORA_CHAIN = base
export const USDC_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913' // USDC on Base 