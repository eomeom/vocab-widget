Test feature branch workflow

# Vocab Widget

A multilingual vocabulary widget MVP. Fetches words and definitions in multiple languages and displays them in a simple frontend widget.

---

## Features

- English (EN) and Chinese (ZH) supported
- Hourly word rotation
- Definitions fetched from dictionary APIs (EN) and CC-CEDICT (ZH)
- Lightweight React frontend for embedding anywhere
- Backend Node.js API, deployable on Render
- Frontend deployable on Vercel
- Error handling and caching headers implemented

---

## Tech Stack

- **Backend:** Node.js, Express
- **Frontend:** React + Vite
- **Data Sources:** dictionaryapi.dev, CC-CEDICT
- **Deployment:** Render (Backend), Vercel (Frontend)

---

## Getting Started

### Prerequisites

- Node.js 18 (or as specified in `.nvmrc`)
- npm

### Installation

```bash
git clone https://github.com/eomeom/vocab-widget.git
cd vocab-widget/api
npm install
npm start  # Runs backend locally
