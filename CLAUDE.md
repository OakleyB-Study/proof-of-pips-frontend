# Proof of Pips — Claude Code Instructions

## Project Overview
Verified prop trader leaderboard. React frontend (CRA + Tailwind) deployed to cPanel via GitHub Actions FTP. Express backend deployed to Railway (auto-deploy on push). Supabase for database.

## Repos
- **Frontend**: `OakleyB-Study/proof-of-pips-frontend` → cPanel (GitHub Actions)
- **Backend**: `OakleyB-Study/proof-of-pips-backend` → Railway (auto-deploy)
- Backend lives at `proof-of-pips-backend/` inside the frontend repo as a git submodule/nested repo.

## Key Architecture
- JWT httpOnly cookies for stateless sessions (no sessions table)
- Twitter OAuth 2.0 PKCE flow
- Tradovate + TradeSyncer adapters for trading platform sync
- Cron-based sync every 6 hours
- All API routes duplicated under `/api/` and `/api/v1/`

## Before Completing Any Task, Run These Checks

### Security Scan
- [ ] No hardcoded secrets, API keys, passwords, or tokens in code
- [ ] No secrets in comments, error messages, or console.log output
- [ ] All user inputs validated (use `validateTwitterUsername`, `validateConnectionType`, `sanitizeString`)
- [ ] No SQL injection vectors (all DB access goes through Supabase client, never raw SQL)
- [ ] No shell injection (no `exec`, `spawn`, or template strings in shell commands)
- [ ] No path traversal in any file operations
- [ ] `credentials: 'include'` on all frontend fetch calls to the backend
- [ ] `httpOnly: true`, `secure: true`, `sameSite: 'none'` on all cookies in production

### Code Quality
- [ ] No `console.log` in production backend code (use structured JSON logging)
- [ ] All new backend routes have rate limiting applied
- [ ] Error responses never leak internal details (stack traces, DB errors, file paths)
- [ ] Null-safe access on all optional fields (use `?.` and `??`)
- [ ] Both camelCase and snake_case handled for Supabase RPC responses

### Build Verification
- [ ] `react-scripts build` succeeds with no errors
- [ ] No TypeScript/ESLint warnings that indicate real bugs
- [ ] Test suite passes: `npm test` (frontend), `npm test` (backend)

## Constraints
- Never add paid services without asking the user first
- Never modify Supabase schema without asking first
- Never modify Railway environment variables without asking first
- Always use `C:/ProofOfPips/node.exe` for local builds (user's portable Node)

## File Naming Conventions
- Frontend components: `src/components/PascalCase.js`
- Backend routes: `proof-of-pips-backend/routes/camelCase.js`
- Backend middleware: `proof-of-pips-backend/middleware/camelCase.js`
- Backend utils: `proof-of-pips-backend/utils/camelCase.js`

## Environment Variables (Backend — Railway)
- `SUPABASE_URL`, `SUPABASE_KEY` — database
- `TWITTER_CLIENT_ID`, `TWITTER_CLIENT_SECRET`, `TWITTER_CALLBACK_URL` — OAuth
- `JWT_SECRET` — session signing (min 32 chars)
- `SYNC_API_KEY` — cron sync auth
- `ENCRYPTION_KEY` — credential encryption at rest
- `FRONTEND_URL` — CORS + redirect target
- `NODE_ENV` — production/development
