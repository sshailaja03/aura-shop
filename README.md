# LuxeCart — AI-Enhanced Shopping Experience

A modern, glassmorphism-styled e-commerce storefront built with React, featuring AI-curated recommendations, real-time search, and a seamless two-step checkout flow.

## Features

- **Smart Search** — Fuzzy search with auto-suggestions across products, categories, and brands
- **AI Recommendations** — Personalized product suggestions on the homepage
- **Flash Deals** — Countdown timers on limited-time offers
- **Category Browsing** — Filter by price, rating, brand, and more
- **Product Details** — Image galleries, variant selection, reviews, and Q&A tabs
- **Cart & Checkout** — Two-step flow with shipping and payment forms
- **Wishlist** — Save items for later from any product card
- **Account Dashboard** — Manage profile, view order history, and track shipments
- **Dark / Light Theme** — Toggle between themes from account settings
- **Fully Responsive** — Mobile-first layout with adaptive navigation

## Tech Stack

| Layer | Tool |
|-------|------|
| Framework | React 18 + TypeScript |
| Build | Vite |
| Styling | Tailwind CSS + custom glassmorphism tokens |
| Animation | Framer Motion |
| State | Zustand |
| Routing | React Router v6 |
| Icons | Lucide React |

## Getting Started

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be available at `http://localhost:8080`.

## How to Use

### Shopping

1. **Browse** — Scroll the homepage to explore trending products, AI picks, deals, and categories.
2. **Search** — Use the search bar in the navbar to find products by name or keyword.
3. **Filter** — Navigate to any category and use the sidebar filters (price range, minimum rating) and sort options to narrow results.
4. **View Details** — Click any product card to see full details, select a variant, read reviews, and check delivery info.

### Cart & Checkout

1. **Add to Cart** — Click "Add to Cart" on any product card or product page.
2. **Review Cart** — Click the cart icon in the navbar to view items, adjust quantities, or remove products.
3. **Apply Coupons** — Enter a promo code in the cart summary panel.
4. **Checkout** — Click "Proceed to Checkout", fill in shipping details, choose a payment method, and place your order.
5. **Confirmation** — After placing an order you'll be redirected to a confirmation page with your order summary.

### Wishlist

- Click the **heart icon** on any product card to save it to your wishlist.
- View and manage saved items from the **Account → Wishlist** tab.
- Move wishlist items directly to your cart with one click.

### Account

- Navigate to **Account** via the user icon in the navbar.
- **Profile** — Edit your name, email, and phone number.
- **Orders** — View past orders with status tracking (Processing → Shipped → Delivered).
- **Wishlist** — Browse and manage saved products.
- **Settings** — Toggle between light and dark themes.

## Project Structure

```
src/
├── components/
│   ├── home/          # Hero, TrendingCarousel, DealsGrid, etc.
│   ├── layout/        # Navbar, Footer
│   └── ui/            # Reusable UI primitives (shadcn/ui)
├── data/
│   └── products.ts    # Mock product catalog
├── pages/             # Route-level page components
├── store/
│   └── useStore.ts    # Zustand global state (cart, wishlist, user, theme)
└── index.css          # Tailwind config + glassmorphism design tokens
```

## License

MIT
