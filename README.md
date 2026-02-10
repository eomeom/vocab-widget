# Vocab Widget MVP

A lightweight vocabulary widget API that serves rotating vocabulary
across multiple languages for use in widgets, apps, and extensions.

## Supported Languages (MVP)
- English
- Chinese (Simplified)
- Korean
- Malay (planned)
- French (planned)

## Features
- Hourly vocabulary rotation
- Multiple dictionary providers (API + scrape fallback)
- Node.js backend
- Python fetchers (future expansion)

## Tech Stack
- Node.js (Express)
- Python (fetching & preprocessing)
- GitHub
- Future deployment: Render / Railway / Vercel

## Running locally

### Backend
```bash
cd api
npm install
npm run dev

Server runs on:

http://localhost:3000

Health check:

GET /health

Roadmap

- Vocabulary caching
- Language toggle
- Widget UI
- Deployment
- Rate limiting


Save the file.

---

### Commit README
```bash
git add README.md
git commit -m "Add initial project README"
