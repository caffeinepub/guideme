# GuideMe

## Current State
- Subject Helper searches Wikipedia and returns kid-friendly results, but no YouTube video links are shown
- Resources page has 47+ resources in FALLBACK_RESOURCES but the hero badge says "15 resources curated" and shows incorrect count
- Quest reward system opens RewardModal and grants coins/gems, but ShopPage reads `loadProgress()` only on render — no reactivity when coins/gems change from quests
- No opening/splash animation when the website first loads

## Requested Changes (Diff)

### Add
- YouTube video section in SubjectHelperPage WikiResultCard: after the main answer, show 3 curated YouTube video links relevant to the topic/subject. Use a static map of subject → curated YouTube search links (YouTube search URLs), so it works without an API key. Map should cover Math, Science, English, General Knowledge, Wellbeing, each with 3–5 relevant educational channel links.
- Opening splash/intro animation: a full-screen overlay that plays when the app first loads (once per session), showing the GuideMe logo/name with a slick tech-savvy animation (scan lines, glitch text, fade-in), then slides away to reveal the app. Implemented in App.tsx or a new SplashScreen component, using framer-motion.

### Modify
- ResourcesPage: Fix the hero badge from hardcoded "15+" to the actual count derived from FALLBACK_RESOURCES.length. The page already has 47 resources in FALLBACK_RESOURCES — just update the badge text to show the real number.
- ShopPage: Make coins/gems balance reactive. Instead of calling `loadProgress()` once at render, use React state + a storage event listener (or a custom hook / polling) so when quests grant coins/gems and save to localStorage, the Shop immediately reflects the new balance without requiring a page refresh.
- QuestsPage: Ensure the balance strip (coins/gems) also stays in sync. Currently `handleRewardClaimed` refreshes state after reward — verify this is working. If Shop still shows stale values, add a window `storage` event listener in ShopPage that refreshes state.

### Remove
- Nothing to remove

## Implementation Plan
1. **SubjectHelperPage.tsx** — Add a `YOUTUBE_LINKS` map keyed by Subject with 3 curated YouTube search/channel URLs per subject (e.g. Khan Academy Math, Numberphile, 3Blue1Brown for Math). Render a "Watch & Learn" section in `WikiResultCard` below the main answer card, showing the links as clickable pill cards with a YouTube icon and channel name.
2. **ResourcesPage.tsx** — Change the hero badge from hardcoded `"15+"` / `FALLBACK_RESOURCES.length` reference to use the actual array length dynamically: `{FALLBACK_RESOURCES.length}+`.  (It already uses `.length` but the badge text says "15+ resources curated" as a string — fix it.)
3. **ShopPage.tsx** — Convert `const state = loadProgress()` from a plain const to a `useState` initialized from `loadProgress()`. Add a `useEffect` that listens for `window storage` events (key = `guideme_progress`) and re-reads progress on change. Also call `refresh()` to trigger re-render inside the listener.
4. **SplashScreen.tsx** — New component. Full-screen overlay with dark bg, animated GuideMe logo text with glitch/scan effect, neon cyan accent lines, auto-dismisses after ~2.5s with a smooth slide-up exit. Uses `sessionStorage` to only show once per browser session.
5. **App.tsx** — Import and render `<SplashScreen />` at the root level inside `ConfettiProvider`.
