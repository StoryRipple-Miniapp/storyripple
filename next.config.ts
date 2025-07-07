import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Performance optimizations
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  
  // Optimize images
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      }
    ],
    minimumCacheTTL: 3600,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Optimize fonts and reduce layout shift
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@fortawesome/react-fontawesome', '@fortawesome/free-solid-svg-icons'],
  },
  
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Headers for better caching
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Content-Security-Policy',
            value: process.env.NODE_ENV === 'development' 
              ? "default-src 'self'; connect-src 'self' https://metamask-sdk.api.cx.metamask.io https://cloud.walletconnect.com https://*.walletconnect.com https://sepolia.base.org https://mainnet.base.org https://eth-sepolia.public.blastapi.io https://eth-mainnet.alchemyapi.io https://*.infura.io https://*.alchemy.com https://*.ankr.com https://*.quicknode.com https://*.publicnode.com https://*.drpc.org https://*.rpc.thirdweb.com https://rpc.ankr.com https://base.publicnode.com https://base-sepolia.publicnode.com https://base-sepolia.g.alchemy.com https://base-mainnet.g.alchemy.com https://api.zora.co https://*.zora.co https://api.coingecko.com https://*.coingecko.com https://api.coinmarketcap.com https://*.coinmarketcap.com; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; object-src 'none';"
              : "default-src 'self'; connect-src 'self' https://metamask-sdk.api.cx.metamask.io https://cloud.walletconnect.com https://*.walletconnect.com https://sepolia.base.org https://mainnet.base.org https://eth-sepolia.public.blastapi.io https://eth-mainnet.alchemyapi.io https://*.infura.io https://*.alchemy.com https://*.ankr.com https://*.quicknode.com https://*.publicnode.com https://*.drpc.org https://*.rpc.thirdweb.com https://rpc.ankr.com https://base.publicnode.com https://base-sepolia.publicnode.com https://base-sepolia.g.alchemy.com https://base-mainnet.g.alchemy.com https://api.zora.co https://*.zora.co https://api.coingecko.com https://*.coingecko.com https://api.coinmarketcap.com https://*.coinmarketcap.com; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; object-src 'none';"
          }
        ],
      },
    ];
  },
};

export default nextConfig;
