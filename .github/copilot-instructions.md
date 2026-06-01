# GitHub Copilot Instructions

These instructions guide GitHub Copilot's behavior for this project.

## Project Context

- **Project Name**: User Registration App
- **Purpose**: Web form that collects name, email, occupation — saves to SQLite and emails admin via SMTP
- **Stack**: React + TypeScript (frontend) / Express + TypeScript (backend) / SQLite / Nodemailer

## Tech Stack

- **Frontend**: React 18 + TypeScript, Vite, Axios
- **Backend**: Node.js + Express + TypeScript, ts-node-dev
- **Database**: SQLite via `better-sqlite3`
- **Email**: Nodemailer (SMTP)
- **Validation**: express-validator (server-side)

## Coding Standards

### General
- Use TypeScript strictly — no `any` types
- Use camelCase for variables/functions, PascalCase for types/components
- Write clean, readable code — only comment complex logic
- Prefer functional patterns (no classes unless necessary)

### Frontend
- One component per file in `frontend/src/components/`
- All API calls go through `frontend/src/api/` using Axios
- No inline styles except in `RegistrationForm.tsx` (existing pattern)
- Never put SMTP or backend secrets in frontend code

### Backend
- All routes in `backend/src/routes/`
- Business logic in `backend/src/services/`
- Use `express-validator` for ALL input validation before any DB or email call
- Return consistent JSON shape: `{ success: boolean, message: string, emailSent: boolean }`
- Use correct HTTP status codes: 201 (created), 400 (validation), 500 (server error)
- DB success is the primary success criterion — email failure must NOT fail the request
- Log errors with `console.error('[Context] message:', err)` pattern

### Database
- Use `better-sqlite3` parameterised statements — never string-interpolate SQL
- Schema lives in `backend/src/config/database.ts`
- All columns have NOT NULL constraints where appropriate

## Security Rules (IMPORTANT)

- NEVER hardcode SMTP credentials, API keys, or DB paths in source code
- NEVER commit `.env` files — use `.env.example` as template
- Always validate AND sanitise (trim, normalise) user inputs server-side
- CORS is restricted to `FRONTEND_ORIGIN` env variable only

## Folder Conventions

```
frontend/src/
  api/          # Axios API functions (one file per resource)
  components/   # Reusable React components (one per file)
  App.tsx       # Root component

backend/src/
  config/       # DB initialisation and schema
  models/       # TypeScript interfaces
  routes/       # Express route handlers
  services/     # Business logic (DB operations, email)
  utils/        # Shared helpers
  app.ts        # Express app setup
  server.ts     # HTTP server entry point

backend/data/   # SQLite .db file lives here (git-ignored)
```

## What Copilot Should Prioritize

- Security: no hardcoded secrets, always validate inputs
- Consistent error handling and HTTP status codes
- Graceful degradation: DB save must succeed independently of email
- DRY: reuse existing service functions rather than duplicating logic
- Testability: keep business logic in services, not in route handlers

## Out of Scope

- User authentication / sessions
- Admin dashboard or CSV export (not in MVP)
- Cloud infrastructure or Docker (this is a local POC)
