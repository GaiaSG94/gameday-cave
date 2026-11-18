# Cave

A daily deduction game for Reddit, built on [Devvit Web](https://developers.reddit.com/).

Tonight the cellar's five flasks lost their labels: water, wine, oil, honey and
poison. The old ledger gives a handful of facts — "flask 3 holds the honey",
"the wine sits immediately right of the water", "the poison is not in flask 1",
"the oil sits in an even flask". Rebuild the rack.

## How to play

1. Read the ledger.
2. For each liquid, tap the flask number where it belongs.
3. Tap **Cap the rack** when every flask is filled. Every liquid appears exactly
   once, and the puzzle is generated so the rack is unique.

One cellar per day, the same for everyone; streaks stored per user in Redis.

## Stack

- React 19 + Tailwind 4 + Vite (client inside a Reddit post)
- Hono server on Devvit (`/api/init`, `/api/submit`), Redis persistence
- Deterministic daily generation (UTC seed), uniqueness brute-forced (120 racks),
  unit-tested

## Development

```bash
npm install
npm run dev
npm test
npm run type-check
npm run build
```

## Submission (Reddit's Game of the Day Hackathon)

- App listing: `developers.reddit.com/apps/gameday-cave` (private until judging ends)
- Demo post: public test subreddit, post running the game
