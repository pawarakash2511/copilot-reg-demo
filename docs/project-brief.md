# Project Brief

## Project Name
User Registration App

## Problem Statement
Teams and event organisers need a quick, reliable way to collect user contact and professional information without a heavyweight CRM or form builder. This app provides a self-hosted, lightweight registration form with instant data capture and email notification.

## Goals & Objectives
- Goal 1: Capture user registrations (name, email, occupation) through a clean web form
- Goal 2: Persist all submissions to a local database for later review or export
- Goal 3: Notify an admin via email for every new submission in real time

## Target Users
- **End users** — Any person filling out a registration or contact form
- **Admin / owner** — Person or team who receives email notifications and reviews stored data

## Key Features / Requirements

### Must Have (MVP)
- [x] Web form with name, email, occupation fields
- [x] Server-side validation of all inputs (required, email format, max length)
- [x] Store submission in SQLite with auto-timestamp
- [x] Email admin on each new submission via SMTP
- [x] Success / error feedback in the UI
- [x] Graceful degradation — DB save succeeds even if email fails

### Nice to Have
- [ ] Admin dashboard to view all submissions
- [ ] Export submissions to CSV
- [ ] Duplicate email detection
- [ ] Rate limiting / CAPTCHA

### Out of Scope
- User authentication / login
- Multi-tenant support
- Cloud database (this is a local SQLite POC)

## Architecture Overview

```
Browser (React + Vite :3000)
        │  POST /api/submissions
        ▼
Express API (:8000)
  ├── Validate input (express-validator)
  ├── Insert into SQLite (better-sqlite3)
  └── Send email (nodemailer SMTP)
```

## Integrations
| System | Purpose | Type |
|--------|---------|------|
| SQLite (better-sqlite3) | Store submission records | Local file DB |
| SMTP server (e.g. Mailtrap) | Email admin on new submission | SMTP / Nodemailer |

## Timeline
| Milestone | Target Date |
|-----------|------------|
| Project setup & scaffolding | Day 1 |
| Backend API + DB complete | Day 1 |
| Frontend form complete | Day 1 |
| Email integration | Day 1 |
| MVP complete | Day 1 |

## Success Metrics
- Form submission response time < 2 seconds (excluding email send)
- All submitted data correctly stored in SQLite
- Admin receives email within 30 seconds of submission
- Validation rejects empty fields and invalid email formats
