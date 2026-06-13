# TechTitans AI — Portfolio Workspace

TechTitans AI is a modern, high-performance monorepo-based portfolio web application. It features a stunning, cinematic React frontend, and a production-grade Express API backend backed by a PostgreSQL database using Prisma ORM.

---

## 🚀 Key Features

- **Frontend**: Vite + React, TailwindCSS, Framer Motion (cinematic micro-animations), React Query, and Wouter routing.
- **Backend**: Modular Node.js / Express API Server.
- **Database**: PostgreSQL (Supabase, Neon, etc.) managed via **Prisma ORM** for type safety and easy migrations.
- **JWT Authentication**: Custom stateless JWT authentication (securing admin and mutation endpoints) replacing Supabase client dependencies.
- **Auto-Seeding**: Automatic self-seeding of default portfolio projects into PostgreSQL on server startup if the database is empty.
- **Parallel Dev Server**: Concurrently runs both the backend and frontend dev environments with a single command.

---

## 📂 Project Structure

```text
TechTitans-AI/
├── artifacts/
│   ├── api-server/         # Express API Server (Backend)
│   │   ├── src/
│   │   │   ├── lib/        # Storage engine & database helpers
│   │   │   ├── middlewares/# JWT authentication middleware
│   │   │   ├── routes/     # Admin and public endpoints routing
│   │   │   └── index.ts    # Server startup & DB verification
│   │   └── package.json
│   └── techtitans-ai/      # Vite + React Client (Frontend)
│       ├── src/
│       │   ├── components/ # Cinematic elements & standard UI
│       │   ├── pages/      # Home, Portfolio, CaseStudy, Admin panel
│       │   └── lib/        # API client connection utilities
│       └── package.json
├── lib/
│   └── db/                 # Database Package (Shared Workspace)
│       ├── prisma/
│       │   └── schema.prisma# Prisma models & configuration
│       └── src/
│           ├── schema/     # Type exports
│           └── index.ts    # Singleton PrismaClient initialization
├── package.json            # Root monorepo configuration
└── pnpm-workspace.yaml     # Monorepo packages mapping
```

---

## 🛠️ Environment Variables Configuration

Create a `.env` file in the project's root directory:

```env
# PostgreSQL Database Connection String (e.g. from Neon or Supabase)
DATABASE_URL="postgresql://<username>:<password>@<host>:<port>/<dbname>?sslmode=require"

# Secret key for signing JSON Web Tokens (JWT)
JWT_SECRET="generate_a_secure_long_secret_key"

# Express Backend Port (Vite proxies /api requests here)
PORT=8080

# Admin Portal Password (defaults to techtitans2024 if empty)
ADMIN_PASSWORD="your_admin_panel_password"
```

---

## 💻 Getting Started (Local Development)

### 1. Install Dependencies
Ensure you have Node.js installed. Run this command in the project root:
```bash
npm install
```
*(This triggers a workspace-wide dependency resolution skipping OS preinstall hooks).*

### 2. Push Database Schema
To initialize the tables (`User`, `Project`, `Event`, `DynamicContent`) in your PostgreSQL instance, execute:
```bash
npx prisma db push --schema=lib/db/prisma/schema.prisma
```

### 3. Generate Prisma Client
Generate the type definitions for database queries:
```bash
npx prisma generate --schema=lib/db/prisma/schema.prisma
```

### 4. Boot up Development Servers
Run the parallel dev server in the project root:
```bash
npm run dev
```
This runs the Express server on `http://localhost:8080` (verifying database connection and auto-seeding projects) and the React app on `http://localhost:5173`.
