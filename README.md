# Diamond Dashboard (Next.js)

A modern dashboard application built with **Next.js**, featuring authentication, interactive charts, data tables, and a responsive sidebar layout.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org) 16 (App Router)
- **UI:** React 19, [Tailwind CSS](https://tailwindcss.com), [Radix UI](https://www.radix-ui.com)
- **Charts & Data:** [Recharts](https://recharts.org), [TanStack Table](https://tanstack.com/table)
- **Forms & Validation:** [Zod](https://zod.dev)
- **Icons:** Lucide React, Tabler Icons
- **Theming:** next-themes (light/dark mode)

## Project Structure

```
dashboard-next/
├── dashboard/          # Next.js application
│   ├── app/            # App Router pages & layouts
│   │   ├── (auth)/     # Auth-protected routes (dashboard)
│   │   ├── login/      # Login page
│   │   └── providers/  # Theme & other providers
│   ├── components/     # UI components (sidebar, charts, tables, forms)
│   ├── actions/        # Server actions (e.g. login)
│   └── lib/            # Utilities
└── README.md
```

## Getting Started

1. **Install dependencies** (from the `dashboard` directory):

   ```bash
   cd dashboard
   npm install
   ```

2. **Run the development server:**

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Command       | Description              |
| ------------- | ------------------------ |
| `npm run dev` | Start development server |
| `npm run build` | Build for production   |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint              |

## Features

- **Authentication** — Login flow with server actions
- **Dashboard** — Main dashboard view with charts and data
- **Sidebar** [WIP] — Collapsible app sidebar with navigation
- **Data tables** [WIP] — Sortable, filterable tables (TanStack Table)
- **Charts** [WIP] — Interactive area charts (Recharts)
- **Theme** — Light/dark mode via next-themes
- **Responsive** [WIP] — Mobile-friendly layout and components

For more details on the Next.js app setup, see [dashboard/README.md](dashboard/README.md).
