# M STUDIO Hub

A responsive React web application for rewards, wallet, shopping, trade-in, and membership features.

M STUDIO Hub is a premium rewards, cashback, shopping, membership, and customer-support
platform built as a mobile-first responsive web app with React + TypeScript + Vite.

> **Frontend-only / mock data.** This project runs entirely in the browser. All data
> (accounts, balances, products, orders, trade-in valuations, notifications) is **mock
> data** stored in LocalStorage. There is no backend, no real authentication, and no
> real payments or data transmission.

## Project overview

M STUDIO Hub simulates a loyalty and commerce experience for the M STUDIO brand. Users
sign in, track reward cashback, shop for devices and accessories, redeem promo codes,
manage membership tiers, and submit device trade-ins through a guided valuation flow.
The UI emphasises a clean "liquid glass" design system with smooth Framer Motion
animations and full responsive layouts.

## Main features

- **Authentication (mock):** login, registration, OTP verification, password reset,
  and protected routes.
- **Rewards & cashback:** reward balance card, reward catalogue, membership progress
  tiers, and promo code redemption.
- **Wallet:** balance overview, transaction history, and reward/cashback tracking.
- **Shopping:** product catalogue, category filtering, sorting, product detail pages,
  wishlist, cart with quantity controls, checkout, and order confirmation.
- **Trade-in:** device selection, condition questionnaire, instant valuation estimate,
  photo upload, submission confirmation, history, and detail tracking.
- **Profile & settings:** manage profile, security, language selection, branch locator,
  service centre, about, and terms.
- **Notifications:** notification bell and panel with read/unread state.
- **UX:** toasts, glass modals/bottom sheets, skeleton/empty/error states, and
  reduced-motion support.

## Tech stack

- **React 18** + **TypeScript**
- **Vite 5** (build tool / dev server)
- **React Router 7** (client-side routing)
- **Tailwind CSS 3** (styling)
- **Zustand 5** (state management, persisted to LocalStorage)
- **Framer Motion** (animations)
- **Lucide React** (icons)
- **React Hook Form** (forms & validation)
- **ESLint** (linting)

## Installation

Requires Node.js 20+ (React Router 7 requires Node 20 or newer).

```bash
npm install
```

## Development command

```bash
npm run dev
```

The dev server starts on the URL printed in the terminal (default
`http://localhost:5173`).

## Production build command

```bash
npm run build
```

This runs the TypeScript compiler (`tsc -b`) and then builds optimized assets to
`dist/`.

## Preview command

```bash
npm run preview
```

Serves the production build from `dist/` locally for verification.

## Linting

```bash
npm run lint
```

## Environment variables

This project is **frontend-only and requires no environment variables**. It does not
read from `process.env` or `import.meta.env`, and no API keys or secrets are used.

If you later add environment variables with Vite, prefix them with `VITE_` and place
them in a local `.env` file (for example `VITE_API_URL=`). Never commit a real `.env`
file — only commit an `.env.example` containing variable names with empty or
placeholder values. `.env` and `.env.*` are already listed in `.gitignore`.

## Mock account credentials

Any mobile number (6+ chars) and any password (4+ chars) will log you in. OTP: any 4
digits.

- Default user: **Rachel** · Silver Member · 5 Purchases · 100,000 MMK balance
- Promo code (store/cart): **MSTUDIO10** for 10% off

These are demo-only mock values, not real credentials.

## Available routes

| Path | Description |
| --- | --- |
| `/` | Redirects to `/splash` |
| `/splash` | Splash screen |
| `/login` | Login |
| `/register` | Registration |
| `/verify-code` | OTP verification |
| `/forgot-password` | Password reset |
| `/home` | Home dashboard (protected) |
| `/wallet` | Wallet & transactions (protected) |
| `/store` | Product catalogue (protected) |
| `/store/product/:id` | Product detail (protected) |
| `/cart` | Shopping cart (protected) |
| `/checkout` | Checkout (protected) |
| `/order-success` | Order confirmation (protected) |
| `/profile` | Profile (protected) |
| `/profile/manage` | Manage profile (protected) |
| `/profile/security` | Security settings (protected) |
| `/profile/about-ceir` | About (protected) |
| `/profile/branches` | Branch locations (protected) |
| `/profile/service-center` | Service centre (protected) |
| `/profile/language` | Language settings (protected) |
| `/profile/terms` | Terms (protected) |
| `/trade-in` | Trade-in landing (protected) |
| `/trade-in/device` | Select device (protected) |
| `/trade-in/condition` | Condition questionnaire (protected) |
| `/trade-in/estimate` | Valuation estimate (protected) |
| `/trade-in/confirmation` | Submission confirmation (protected) |
| `/trade-in/history` | Trade-in history (protected) |
| `/trade-in/:id` | Trade-in detail (protected) |
| `*` | 404 Not found |

## Deployment

The app is a static single-page application (SPA), so all routes must fall back to
`index.html`.

### Vercel

This repository includes a `vercel.json` with an SPA rewrite. Either import the repo in
the Vercel dashboard or run:

```bash
npm i -g vercel
vercel
```

- Framework preset: **Vite**
- Build command: `npm run build`
- Output directory: `dist`

### Netlify

This repository includes `public/_redirects` (`/* /index.html 200`) which copies into
the build output for SPA routing. Either drag-and-drop the `dist/` folder or connect
the repo with:

- Build command: `npm run build`
- Publish directory: `dist`

## Disclaimer

M STUDIO Hub is a **frontend-only demo**. All accounts, products, rewards, balances,
orders, and trade-in data are mock and generated in the browser. Nothing is sent to a
server, and no real credentials, payments, or personal data are processed.
