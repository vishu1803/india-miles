# IndiaMiles 🇮🇳

**IndiaMiles** is a modern, premium, mobile-first travel discovery and identity platform. It is designed to instantly allow users to explore culturally significant places near them without friction, while providing a dark, native-app-like glassmorphic dashboard experience.

![IndiaMiles Dashboard](https://img.shields.io/badge/Status-Production%20Ready-success) ![Next.js](https://img.shields.io/badge/Framework-Next.js%2016-black) ![Express](https://img.shields.io/badge/Backend-Express.js-gray) ![Supabase](https://img.shields.io/badge/Database-Supabase-green)

---

## 🚀 How We Built This (Phase by Phase)

IndiaMiles was built incrementally, focusing on performance, modularity, and a premium user experience. Here is the exact architectural breakdown of how the application was optimized from the ground up:

### Phase 1: Location Intelligence
Instead of asking users to type their city, we built an **Automatic User Location Detection** system:
- Implemented the browser `navigator.geolocation` API to pinpoint the user's coordinates.
- Built a custom reverse-geocoding service to translate coordinates into `City`, `District`, `State`, and `Pincode`.
- Designed a sleek, widget-style `LocationCard` to display this data gracefully.

### Phase 2: Database & Discovery
We integrated **Supabase** (PostgreSQL) to serve as our geographical backend.
- Fetched nearby places dynamically based on the detected `District` and `State`.
- Implemented a custom client-side mathematical utility (Haversine formula) to calculate the exact distance in kilometers from the user's GPS coordinates to the attraction.
- Automatically sorted the feed so the nearest places appear first.

### Phase 3: Bulletproof Authentication
We engineered a completely custom, highly secure authentication architecture from scratch without relying on heavy third-party lock-ins (like Auth0/Clerk).
- **Custom JWT Auth**: Hand-rolled authentication using `bcryptjs` and JSON Web Tokens.
- **Refresh Token Rotation**: Built a secure backend cookie system using `sameSite: lax` and `httpOnly` cookies. Access tokens expire quickly (15m), but the backend automatically intercepts 401s and utilizes a long-lived database-stored Refresh Token to keep the user logged in silently.
- **Google OAuth**: Integrated Google OAuth via Passport.js, seamlessly merging social logins with standard email/password accounts in the database.

### Phase 4: Premium App-Shell Redesign
We completely stripped away the standard "website landing page" look.
- Transformed the `page.js` interface into a **native-feeling web application**.
- Enforced a strict dark theme (`bg-black`), sleek glassmorphic panels, and a fixed bottom tab-navigation layout mimicking premium iOS applications (like Spotify or Notion).
- Rebuilt the `/profile` page to match this dark aesthetic, displaying dynamic user travel stats (Places visited, States unlocked, Explorer Badges).

### Phase 5: Smart Client-Side Caching
To achieve production-grade performance and prevent hammering APIs/Databases, we built a highly intelligent caching layer (`lib/cacheManager.js`):
- **30-Minute Expiry**: Location and nearby places are stored in `localStorage` for 30 minutes.
- **500m Movement Threshold**: When the app loads, it compares the user's new coordinates with the cached coordinates. If the user moved **less than 500 meters**, it reuses the cached database fetch entirely, dropping Supabase bandwidth costs to zero for stationary users.

### Phase 6: Enterprise Testing & CI/CD
To guarantee zero regressions, we wrapped the application in strict quality controls:
- **Frontend Tests**: Implemented `Vitest`, `jsdom`, and `React Testing Library` to test caching logic and distance calculators.
- **Backend API Tests**: Implemented `Jest` and `Supertest` to mock PostgreSQL and rigorously test all authentication endpoints (Register, Login, Refresh, Logout).
- **Pre-commit Hooks**: Installed `Husky` and `lint-staged`. Developers cannot commit broken code; every `git commit` triggers `eslint --fix` and `prettier --write`.
- **GitHub Actions**: Built `.github/workflows/ci.yml`. On every push, GitHub spins up a Node 22 runner, installs dependencies, lints, runs both Vitest and Jest suites, and attempts a dummy production build before allowing deployment.

---

## 🛠 Tech Stack

**Frontend:**
- Next.js (App Router)
- React 19
- Tailwind CSS 4 (Custom Utilities, Glassmorphism)
- Vitest & React Testing Library

**Backend:**
- Node.js & Express.js
- PostgreSQL (Hosted on Supabase)
- JSON Web Tokens (JWT) & bcryptjs
- Passport.js (Google OAuth)
- Jest & Supertest

**DevOps & Tooling:**
- GitHub Actions (CI Pipeline)
- Husky & lint-staged
- ESLint & Prettier

---

## 🏃‍♂️ Running Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/vishu1803/india-miles.git
   cd india-miles
   ```

2. **Install Dependencies**
   ```bash
   # Install frontend dependencies
   npm install

   # Install backend dependencies
   cd backend
   npm install
   ```

3. **Set up Environment Variables**
   Create `.env.local` in the root and `.env` in the `backend/` directory with your Supabase, JWT secret, and Google OAuth credentials.

4. **Start the Development Servers**
   ```bash
   # Run frontend (Root directory)
   npm run dev

   # Run backend (In another terminal, /backend directory)
   npm run dev
   ```

5. **Run Tests**
   ```bash
   # Frontend
   npx vitest run

   # Backend
   cd backend
   npx jest
   ```
