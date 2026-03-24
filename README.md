# Happenly

**Discover, Track & Visualize Events That Matter**

A progressive web app that lets you explore upcoming tech events across European cities, filter by location, and visualize event data through interactive charts.

**[Live Demo](https://itshappenly.vercel.app/)**

---

## Tech Stack

**Frontend:** React 19, TypeScript, Vite, Recharts, SCSS
**Backend:** Node.js, AWS Lambda, Serverless Framework
**APIs:** Google Calendar API (service account auth)
**Testing:** Jest, React Testing Library, Puppeteer (E2E)
**Deployment:** Vercel (frontend), AWS API Gateway + Lambda (backend)
**PWA:** Workbox service worker for offline support

## Architecture

The app fetches live event data from a Google Calendar through a serverless backend:

```
Browser  -->  Vercel (static)  -->  AWS API Gateway  -->  Lambda  -->  Google Calendar API
                                                            |
                                                    Service Account Auth
                                                    (no user login required)
```

## Features

- **City filtering** — Search and filter events by city with autocomplete suggestions
- **Adjustable event count** — Control how many events are displayed
- **Expandable details** — Show/hide event descriptions inline
- **Data visualization** — Scatter chart (events by city) and pie chart (events by topic)
- **Offline support** — PWA with service worker caching for offline access
- **Installable** — Add to home screen on mobile devices

## Getting Started

```bash
git clone https://github.com/nicovece/happenly.git
cd happenly
npm install
npm run dev
```

The app runs on `http://localhost:5173` and uses mock data in development.

### Backend (auth-server)

The serverless backend is in `auth-server/`. To deploy:

```bash
cd auth-server
npm install
npx serverless deploy
```

Requires AWS credentials and a `config.json` with Google API credentials (see `serverless.yml` for required env vars).

## Testing

```bash
npm test              # Run all unit/integration tests
npm run test:e2e      # Run end-to-end tests (requires Puppeteer)
```
