# User Registration App

> A simple web form that collects user details (name, email, occupation), stores them in a database, and notifies an admin via email.

## Overview

This application provides a clean registration form where users submit their name, email address, and occupation. On submission the data is:
1. **Saved** to a local SQLite database
2. **Emailed** to a configured admin address via SMTP

## Tech Stack

### Frontend
- Framework: React 18
- Language: TypeScript
- Bundler: Vite
- HTTP Client: Axios

### Backend
- Framework: Express (Node.js)
- Language: TypeScript
- Database: SQLite (`better-sqlite3`)
- Email: Nodemailer (SMTP)
- Validation: express-validator

## Features

- [x] Registration form — name, email, occupation
- [x] Server-side input validation & sanitisation
- [x] Store submission in SQLite with timestamp
- [x] Send email notification to admin on every submission
- [x] Graceful handling when email fails (DB save still succeeds)
- [x] Loading state + success/error feedback in the UI
- [x] Health check endpoint (`GET /health`)

## Getting Started

### Prerequisites

- Node.js v18+
- npm v9+

### Installation

```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### Environment Setup

Copy `.env.example` to `.env` in the **backend** folder and fill in your SMTP details:

```bash
cp .env.example backend/.env
```

Key variables to configure:

| Variable | Description |
|---|---|
| `SMTP_HOST` | Your SMTP server hostname |
| `SMTP_PORT` | SMTP port (usually 587) |
| `SMTP_USER` | SMTP username / sender email |
| `SMTP_PASSWORD` | SMTP password |
| `ADMIN_EMAIL` | Where submission emails are sent |
| `FRONTEND_ORIGIN` | Frontend URL for CORS (default: http://localhost:3000) |

> **Tip:** Use [Mailtrap](https://mailtrap.io) or [Ethereal](https://ethereal.email) for SMTP in development.

### Running Locally

```bash
# Terminal 1 — Start backend (port 8000)
cd backend
npm run dev

# Terminal 2 — Start frontend (port 3000)
cd frontend
npm run dev
```

Open http://localhost:3000 in your browser.

## Project Structure

```
Project/
├── frontend/
│   ├── src/
│   │   ├── api/               # Axios API calls
│   │   │   └── submissions.ts
│   │   ├── components/        # React components
│   │   │   └── RegistrationForm.tsx
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   ├── vite.config.ts         # Vite + proxy to backend
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts    # SQLite init & schema
│   │   ├── models/
│   │   │   └── submission.ts  # TypeScript interface
│   │   ├── routes/
│   │   │   └── submissions.ts # POST /api/submissions
│   │   ├── services/
│   │   │   ├── dbService.ts   # DB insert logic
│   │   │   └── emailService.ts# Nodemailer SMTP
│   │   ├── app.ts             # Express app setup
│   │   └── server.ts          # HTTP server entry point
│   ├── data/                  # SQLite database file (git-ignored)
│   └── package.json
│
├── docs/
│   └── project-brief.md
├── .github/
│   └── copilot-instructions.md
├── .env.example
└── README.md
```

## API Reference

### `POST /api/submissions`

Submit a registration.

**Request body:**
```json
{ "name": "Jane Doe", "email": "jane@example.com", "occupation": "Developer" }
```

**Success (201):**
```json
{ "success": true, "message": "Thank you! Your registration has been received.", "emailSent": true }
```

**Validation error (400):**
```json
{ "success": false, "message": "A valid email address is required", "emailSent": false }
```

### `GET /health`
Returns `{ "status": "ok", "timestamp": "..." }`

## License

MIT
