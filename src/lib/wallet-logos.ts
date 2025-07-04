export const walletLogos: { [key: string]: string } = {
  'MetaMask': '/assets/wallets/metamask.svg',
  'Phantom': '/assets/wallets/phantom.svg',
  'Rainbow': '/assets/wallets/rainbow.svg',
  'Coinbase Wallet': '/assets/wallets/coinbase.svg',
  'WalletConnect': '/assets/wallets/walletconnect.svg',
  'Farcaster': '/assets/wallets/farcaster.svg',
  // Add fallback for other wallets
  'default': '/assets/wallets/browser-wallet.svg'
};

// Helper function to get wallet logo URL
export const getWalletLogo = (walletName: string): string => {
  return walletLogos[walletName] || '/assets/wallets/browser-wallet.svg'
} 