# Aura Shop

> A responsive e-commerce frontend built with React and TypeScript, combining product discovery, cart and wishlist state, checkout flows, form validation, and motion-driven UI.

## Overview

Aura Shop is a frontend-focused e-commerce application designed around a realistic shopping journey rather than a collection of isolated screens.

The project focuses on **component architecture, client-side state management, typed data models, validation, responsive UI, and user-flow design**.

The product catalog is currently mock-data driven, making the project intentionally focused on frontend engineering rather than pretending to be a production commerce backend.

## Key Features

- Product browsing with category and price/rating filters
- Search and product discovery
- Product detail pages with variants and reviews
- Persistent cart and wishlist state
- Coupon and checkout flow
- Account area with profile, orders, and wishlist views
- Light/dark theme switching
- Responsive layouts for desktop and mobile
- Animated interactions and transitions
- Form validation with React Hook Form and Zod
- Reusable UI primitives built with Radix UI

## Tech Stack

| Area | Technology |
|---|---|
| Language | TypeScript |
| UI | React 18 |
| Build | Vite |
| Styling | Tailwind CSS |
| State Management | Zustand |
| Routing | React Router |
| Animation | Framer Motion |
| Forms | React Hook Form + Zod |
| UI Primitives | Radix UI |
| Charts | Recharts |
| Testing | Vitest + Testing Library + Playwright |
| Code Quality | ESLint |

## Architecture

```
                 ┌─────────────────────┐
                 │    React Router     │
                 └──────────┬──────────┘
                            │
             ┌──────────────┼──────────────┐
             ▼              ▼              ▼
         Home / Shop     Product       Account
             │            Details          │
             └──────────────┬──────────────┘
                            ▼
                    ┌──────────────┐
                    │ Zustand Store│
                    │              │
                    │ Cart         │
                    │ Wishlist     │
                    │ User         │
                    │ Theme        │
                    └──────┬───────┘
                           │
                           ▼
                    Mock Product Data
```

The application keeps shared shopping state in Zustand while route-level pages compose reusable UI components.

## Engineering Highlights

### State Management

Zustand centralizes cross-page state for:

- cart items
- wishlist items
- user/account state
- theme preferences

This avoids passing shopping state through deeply nested component trees.

### Type-Safe Forms

React Hook Form handles form state while Zod provides schema-based validation.

This keeps validation rules explicit and makes form behavior easier to reason about.

### Component Reuse

The UI is organized around reusable primitives and feature-specific components rather than duplicating page-level markup.

### Responsive Interaction Design

Framer Motion is used for purposeful transitions and micro-interactions, while Tailwind handles responsive layout and visual states.

## Project Structure

```text
src/
├── components/
│   ├── home/          # Hero, product sections, deals, discovery UI
│   ├── layout/        # Navbar, footer, shared layout
│   └── ui/            # Reusable UI primitives
├── data/
│   └── products.ts    # Typed mock product catalog
├── pages/             # Route-level screens
├── store/
│   └── useStore.ts    # Global Zustand state
├── App.tsx
└── index.css          # Global styles and design tokens
```

## Local Development

### Requirements

- Node.js 18+
- npm

### Install and run

```bash
git clone https://github.com/sshailaja03/aura-shop.git
cd aura-shop
npm install
npm run dev
```

Vite will print the local development URL in the terminal.

## Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Production build
npm run lint       # ESLint checks
npm test           # Vitest test suite
npm run test:watch # Watch tests during development
```

The repository also includes Playwright dependencies for browser-level testing.

## Current Scope & Future Work

Aura Shop is currently a **frontend-focused prototype** backed by mock product data.

Potential next steps:

- Connect a real product/API backend
- Add server-side authentication
- Persist carts and orders
- Integrate a real payment provider
- Add product search indexing
- Expand automated component and end-to-end coverage
- Add accessibility audits and performance budgets

## Engineering Takeaways

This project demonstrates:

- TypeScript + React application development
- Global state management with Zustand
- Component-based UI architecture
- Client-side routing
- Schema-driven form validation
- Responsive frontend engineering
- Animation and interaction design
- Linting, testing, and production-build workflows

---

**Shailaja Singh** · Software Engineering Student · React · TypeScript · Full-Stack Development
