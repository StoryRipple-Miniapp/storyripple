// src/app/head.tsx
export default function Head() {
  return (
    <>
      {/* Farcaster embed metadata */}
      <meta
        name="fc:frame"
        content={JSON.stringify({
          name: "Story Ripple",
          iconUrl: "https://your-deployed-url.com/assets/icon-200x200.png",
          previewImageUrl: "https://your-deployed-url.com/assets/preview-1200x800.png",
          homeUrl: "https://your-deployed-url.com"
        })}
      />
      {/* Update the icon and preview image references */}
      <link rel="icon" href="/assets/icon.png" />
      <meta name="description" content="Control the narrative of every story" />
      <meta property="og:image" content="/assets/preview-1200x800.png" />
      <meta property="twitter:image" content="/assets/preview-1200x800.png" />
    </>
  );
} 