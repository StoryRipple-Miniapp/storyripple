# Environment Setup for StoryRipple Zora Integration

## Required Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Zora API Configuration
NEXT_PUBLIC_ZORA_API_KEY=your_zora_api_key_here

# Platform Configuration (your address to receive referral fees)
NEXT_PUBLIC_PLATFORM_REFERRER=your_platform_address_here

# RPC URLs (optional - for better performance)
NEXT_PUBLIC_BASE_RPC_URL=https://mainnet.base.org
NEXT_PUBLIC_MAINNET_RPC_URL=https://eth-mainnet.alchemyapi.io/v2/your-api-key

# Farcaster SDK Configuration
NEXT_PUBLIC_FARCASTER_APP_URL=https://your-app-domain.com
```

## Getting Your Zora API Key

1. Visit [Zora Developer Settings](https://zora.co/developer)
2. Create an account or log in
3. Generate a new API key
4. Copy the API key to your `.env.local` file

## Platform Referrer Address

This is your Ethereum address that will receive:
- 15% of fees from coins created through your platform
- 15% of fees from trades made through your platform

Make sure to use an address you control.

## Testing

After setting up the environment variables:

1. Restart your development server
2. Navigate to `/test-trading` to test coin creation and trading
3. Check the browser console for any configuration issues

## Security Note

Never commit your `.env.local` file to version control. The API key should be kept secret. 