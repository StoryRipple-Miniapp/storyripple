export const walletLogos: Record<string, string> = {
  'MetaMask': '/assets/wallets/metamask.svg',
  'Coinbase Wallet': '/assets/wallets/coinbase.svg',
  'WalletConnect': '/assets/wallets/walletconnect.svg',
  'Injected': '/assets/wallets/browser-wallet.svg',
  'Farcaster': '/assets/wallets/farcaster.svg'
}

// Helper function to get wallet logo URL
export const getWalletLogo = (walletName: string): string => {
  return walletLogos[walletName] || '/assets/wallets/browser-wallet.svg'
} 