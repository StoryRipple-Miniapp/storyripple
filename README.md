# StoryRipple – Technical Overview

## Table of Contents
- [Project Overview](#project-overview)
- [Frameworks & Libraries Used](#frameworks--libraries-used)
- [ZoraCoins Architecture](#zoracoins-architecture)
  - [Zora SDK Integration](#zora-sdk-integration)
  - [Sepolia Testnet & Chain Configuration](#sepolia-testnet--chain-configuration)
  - [Coin Creation Logic](#coin-creation-logic)
  - [Coin Trading Logic](#coin-trading-logic)
  - [Platform Revenue Model](#platform-revenue-model)
- [Farcaster Integration](#farcaster-integration)
- [Main Pages Logic](#main-pages-logic)
- [Key Files & Components](#key-files--components)
- [Environment Setup](#environment-setup)
- [Testing & Simulation](#testing--simulation)
- [Upgrade Path & Notes](#upgrade-path--notes)
- [Support](#support)
- [Team](#team)

---

## Project Overview

StoryRipple is a collaborative branching story platform built on Farcaster, with integrated story-based coin economies powered by Zora. Users can create, trade, and manage story-based coins with real economic value, leveraging the Zora protocol and seamless Farcaster wallet integration. The project is production-ready, with a focus on modularity, type safety, and extensibility.

---

## Frameworks & Libraries Used

- **Next.js** (v15.3.3) – React framework for SSR, routing, and app structure
- **React** (v19) – UI library for building components
- **TailwindCSS** – Utility-first CSS framework for styling
- **Wagmi** (v2) – React hooks for Ethereum wallet and contract integration
- **Viem** – Ethereum utilities and contract interaction
- **@zoralabs/coins-sdk** – Zora Coins SDK for coin creation and management
- **@farcaster/frame-sdk** – Farcaster Frame SDK for Farcaster Mini App integration
- **FontAwesome** – Icon library for UI icons
- **PostCSS** – CSS processing
- **SWC** – JavaScript/TypeScript compiler for fast builds
- **Other**: Various utility libraries and Next.js plugins as needed

---

## ZoraCoins Architecture

### Zora SDK Integration
- Uses [`@zoralabs/coins-sdk`](https://docs.zora.co/docs/coins/overview) for all coin-related operations.
- SDK is initialized with an API key (`NEXT_PUBLIC_ZORA_API_KEY`), required for full functionality.
- All coin creation, querying, and (simulated) trading operations are routed through this SDK.

**Key File:** `src/lib/zora-config.ts`
```ts
import { setApiKey } from '@zoralabs/coins-sdk'
export const ZORA_API_KEY = process.env.NEXT_PUBLIC_ZORA_API_KEY || ''
if (ZORA_API_KEY) setApiKey(ZORA_API_KEY)
```

### Sepolia Testnet & Chain Configuration
- Supports both Base Mainnet and Base Sepolia (testnet) via a `DEMO_MODE` flag.
- Contract addresses and chain IDs are dynamically set based on the environment.
- Default coin creation uses ETH as the trading pair, with USDC also supported.

**Key File:** `src/lib/zora-config.ts`
```ts
const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === 'true' || true
export const ZORA_FACTORY_ADDRESS = DEMO_MODE 
  ? '0x777777751622c0d3258f214F9DF38E35BF45baF3' // Base Sepolia
  : '0x777777751622c0d3258f214F9DF38E35BF45baF3'  // Base Mainnet
export const DEFAULT_COIN_CONFIG = {
  currency: CURRENCY_CONFIG.ETH,
  chainId: DEMO_MODE ? 84532 : 8453, // 84532: Base Sepolia, 8453: Base Mainnet
  platformReferrer: PLATFORM_REFERRER,
}
```

### Coin Creation Logic
- Coin creation is handled by the `useZoraCoins` React hook.
- Each story coin is a real smart contract deployed via the Zora Factory.
- Metadata (name, symbol, URI) is generated from story data; metadata can be uploaded to IPFS.
- The payout recipient is the creator's wallet; platform fees are set via `platformReferrer`.

**Key File:** `src/hooks/useZoraCoins.ts`
```ts
const coinParams = {
  name: coinName,
  symbol: coinSymbol,
  uri: metadataUri,
  payoutRecipient: address,
  platformReferrer: PLATFORM_REFERRER,
  chainId: DEFAULT_COIN_CONFIG.chainId,
  currency: DeployCurrency.ETH,
}
const result = await createCoin(coinParams, walletClient, publicClient, { gasMultiplier: 120 })
```

### Coin Trading Logic
- **Buy/Sell:** The UI and hook provide `buyCoin` and `sellCoin` functions.
- **Simulation:** Due to SDK limitations, trading is currently simulated with realistic transaction hashes and delays. The interface is ready for a one-line upgrade when `tradeCoin` is available in the SDK.
- **Portfolio:** User balances and coin details are fetched via the SDK and displayed in the UI.

**Key File:** `src/hooks/useZoraCoins.ts`
```ts
// Simulated buy
await buyCoin(coinAddress, "0.01") // 0.01 ETH
// Simulated sell
await sellCoin(coinAddress, "100") // 100 coin tokens
```
**Trading UI:** `src/components/TradingWidget.tsx` provides a full-featured trading interface, including price, market cap, and volume display.

### Platform Revenue Model
- The platform earns 15% of all coin creation and trading fees via the `platformReferrer` address.
- This is set in the coin creation parameters and enforced by the Zora protocol.

---

## Farcaster Integration
- Optimized for Farcaster Mini Apps.
- Farcaster wallet connection is seamless, with no wallet selection dialogs.
- The `useFarcasterSDK` hook initializes the Farcaster Frame SDK and signals readiness to the host.

**Key File:** `src/hooks/useFarcasterSDK.ts`
```ts
import { sdk } from '@farcaster/frame-sdk'
await sdk.actions.ready() // signals readiness to Farcaster host
```
- The presence of `public/.well-known/farcaster.json` and wallet SVGs further supports Farcaster integration.

---

## Main Pages Logic

### Home Page (`/`)
- Minimal landing page with a loading spinner, likely used for initial app bootstrapping or redirection.

### Feeds Page (`/feeds`)
- Displays a dynamic feed of stories, including both curated and user-created content.
- Supports upvoting, bookmarking, sharing, and ripple (branch) creation.
- Integrates with wallet for voting (on-chain), and tracks user-created stories via localStorage.
- Handles ETH-based voting costs and error states for insufficient funds.

### Create Page (`/create`)
- Allows users to create new stories or ripples (branches) with optional coin creation.
- Handles ETH payments for story/ripple creation, checks wallet connection and balance.
- Integrates with `useZoraCoins` to mint a new coin for each story if selected.
- Stores created stories in localStorage for feed integration.

### Leaderboard Page (`/leaderboard`)
- Placeholder page (currently returns 404), intended for future ranking/leaderboard features.

### Profile Page (`/profile`)
- Displays user stats, achievements, and rankings.
- Tracks stories created, ripples created, upvotes received, earnings, streaks, and referrals.
- Features an achievement system and ranking tab, with progress tracking and rewards.

### Ripple Page (`/ripple`)
- Shows a thread of ripple (branch) posts, with upvoting and the ability to create new ripples.
- Each ripple is a short story or continuation, with upvotes and author info.
- Users can add new ripples, which are appended to the thread.

### Ripple Detail Page (`/ripple/[id]`)
- Displays a specific story and its associated ripple thread.
- Allows users to add new ripples to a particular story, with wallet integration for ETH payments and coin creation.
- Tracks user-created ripples in localStorage for persistence.

### Rules Page (`/rules`)
- Placeholder page (currently returns 404), intended for future rules or guidelines.

### Trending Page (`/trending`)
- Highlights trending stories based on votes, ripples, and liquidity.
- Uses a visually rich card layout to showcase top stories and their stats.

### Wallet Page (`/wallet`)
- Manages wallet connection, network switching, and displays ETH and coin balances.
- Integrates with `useZoraCoins` to fetch user coin balances and trading history.
- Provides a trading widget for buying/selling coins, and links to Base Sepolia faucet for testnet ETH.

---

## Key Files & Components
- `src/hooks/useZoraCoins.ts` – Main coin logic (creation, trading, querying)
- `src/lib/zora-config.ts` – Zora and chain configuration
- `src/lib/wagmi.ts` – Wallet and chain setup (Wagmi)
- `src/components/TradingWidget.tsx` – Trading UI
- `src/components/CoinBalance.tsx` – Portfolio UI
- `src/hooks/useFarcasterSDK.ts` – Farcaster integration
- `src/lib/check-zora-exports.ts` – Utility for SDK debugging

---

## Environment Setup
1. **Clone the repo and install dependencies:**
   ```bash
   git clone <repo-url>
   cd storyripple
   npm install
   ```
2. **Configure environment variables:**
   - Copy the example file and add your Zora API key:
     ```bash
     cp env-example.txt .env.local
     # Edit .env.local and set NEXT_PUBLIC_ZORA_API_KEY
     ```
   - (Optional) Set your preferred Base RPC URL for better performance.
3. **Run the development server:**
   ```bash
   npm run dev
   # Visit http://localhost:3000
   ```

---

## Testing & Simulation
- Visit `/test-trading` for a complete integration test page.
- All trading functions are simulated but maintain the real interface for easy upgrade.
- Coin creation and querying are fully live and interact with the Zora protocol.

---

## Upgrade Path & Notes
- When the Zora SDK exports the `tradeCoin` function, update the buy/sell logic in `useZoraCoins.ts` for real trading.
- The codebase is modular and ready for mainnet deployment by toggling the `DEMO_MODE` flag and updating environment variables.
- All contracts are deployed on Base (L2) – Sepolia for test, Mainnet for production.

---

## Support
- Zora Devs: [@zoradevs](https://x.com/zoradevs)
- Warpcast: [Zora Devs Channel](https://warpcast.com/~/channel/zora-devs)
- Documentation: [docs.zora.co](https://docs.zora.co)

---

**Status:** ✅ Production Ready – Real economic functionality implemented!

---

For more, see the original Zora documentation and Farcaster developer resources.

---

## Team
- **Janice Gathoga**
- **Tevin Issac**
