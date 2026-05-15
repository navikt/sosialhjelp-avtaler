# Copilot Instructions

## Project Overview

Self-service frontend for municipalities (kommuner) to sign agreements (avtaler) with NAV for the Digisos platform. Built as a pnpm monorepo with two packages:

- **`client/`** – React 19 / Vite SPA
- **`server/`** – Express BFF (Backend-for-Frontend) that serves the SPA and proxies API calls to `sosialhjelp-avtaler-api`

## Commands

```bash
pnpm install          # Install all dependencies (requires GitHub npm registry login)
pnpm run dev          # Start client dev server (with MSW mocking)
pnpm test             # Run all tests (client + server in parallel)
pnpm test:client      # Client tests only
pnpm test:server      # Server tests only
pnpm run lint         # ESLint across the whole repo
pnpm run build        # Build client + server in parallel
```

**Run a single test:**
```bash
# From repo root:
pnpm --filter sosialhjelp-avtaler-client test -- --reporter=verbose -t "test name"
pnpm --filter sosialhjelp-avtaler-server test -- -t "test name"

# From package directory:
cd client && npx vitest run --dir src -t "test name"
cd server && npx vitest run -t "test name"
```

## Architecture

### Request flow
```
Browser → Express (server/) → IDPorten token verification
                             → /api/* → TokenX OBO exchange → sosialhjelp-avtaler-api
                             → /*     → serve SPA (index.html via Mustache + NAV decorator)
```

The server injects the NAV decorator (`@navikt/nav-dekoratoren-moduler`) server-side in production, and the Vite dev plugin fetches it at build time in development.

### URL base path
In production the app lives at `/sosialhjelp/avtaler/`. Client-side routing and API calls must use `baseUrl()` / `apiUrl()` from `client/src/api/http.ts` to get the correct prefix. In development the base is `/`.

### Auth (server)
Controlled by the `MILJO` env var:
- `mock` – auth stubbed out (used in local dev and tests)
- anything else – real IDPorten token validation + TokenX OBO token exchange before proxying

### MSW mocking (client)
The `USE_MSW` setting (from `window.appSettings`, set by `server/src/routes.ts:settingsHandler`) activates MSW in the browser. Mock handlers are in `client/src/mocks/browser.ts`. In dev (`pnpm run dev`) MSW is always active.

## Key Conventions

### Norwegian in code
Variable names, comments, and identifiers throughout the codebase are in Norwegian. Follow this convention (e.g., `avtale`, `kommune`, `orgnr`, `innsender`).

### Data fetching patterns
- **GET / read data** → `useGet<T>(url)` (SWR-based). Errors are automatically forwarded to the nearest `ErrorBoundary` via `showBoundary`.
- **POST / PUT / mutations** → `usePost<B, T>(url)` or `usePut<B, T>(url)`. Returns `Resultat<T>` (`{ data?, error?, loading? }`). Errors are also forwarded to `ErrorBoundary`.
- Pass `null` as URL to `useGet` to defer a fetch (e.g., wait for a previous result).

### i18n
- Translations are in `client/src/locales/nb_translation.json` (bokmål) and `nn_translation.json` (nynorsk).
- Language is driven by the `decorator-language` cookie, defaulting to `nb`.
- Both `ingress`/`ingressNynorsk` and `kvitteringstekst`/`kvitteringstekstNynorsk` fields exist on `AvtaleResponse` — render the correct one based on `i18n.language`.
- Use `useTranslation()` hook; translation keys use flat dot-free strings (separator disabled).

### Styling
- Styled-components for component-scoped styles, placed at the **bottom** of each file after the component definition.
- NAV Aksel (`@navikt/ds-react`) for UI primitives. Import CSS from `@navikt/ds-css`.
- Media query breakpoints via `client/src/styles/enhet.ts`.

### Component conventions
- Named exports (no default exports for components).
- All shared components in `client/src/components/`.
- Page-level hooks (`usePageTitle`, `useBreadcrumbs`) are called at the top of page components.

### Amplitude analytics
Log user interactions via helpers in `client/src/utils/amplitude.ts`, which wrap `logAmplitudeEvent` from `@navikt/nav-dekoratoren-moduler`. Use the `amplitude_taxonomy` enum for event names.

### Tooling
- **pnpm only** – `only-allow pnpm` is enforced via a preinstall hook.
- Prettier + ESLint run automatically on staged files via Husky/lint-staged.
- TypeScript strict mode in both packages.
- Server tests use `nock` for HTTP mocking and `supertest` via a shared `test-app.ts` helper.
