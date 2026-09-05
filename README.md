# ☕ Brew & Bite — Full-Stack Restaurant & Coffee Shop Website (MERN)

A complete, working online ordering + reservation + admin management system for a coffee shop / restaurant, built with MongoDB, Express, React and Node.js.

## What's included

**Customer side**
- Browse menu by category, search, sort, filter
- Product detail pages with reviews & ratings
- Cart, checkout (delivery or pickup), Cash on Delivery
- Order placement + live order tracking (Pending → Confirmed → Preparing → Ready → Out for Delivery → Delivered)
- Register / Login with JWT authentication
- Order history, profile management
- Table reservations

**Admin side** (`/admin`, requires an admin account)
- Dashboard with revenue, orders, users, reservations, a 7-day sales chart, and popular items
- Menu item management (add / edit / delete, availability, featured flag)
- Category management
- Order management with status updates
- Reservation management
- User management (search, activate/deactivate, delete)

**Design**
- Warm coffee-brown theme (espresso, cinnamon, cream, gold), responsive on mobile/tablet/desktop
- Loading skeletons and friendly error states with retry
- Real food photography (Unsplash) wired in via the seed script — swap for the client's own photos any time by changing the `image` field on a product/category

---

## 1. Requirements

- [Node.js](https://nodejs.org) v18 or newer
- A MongoDB database — easiest option is a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) cluster (or a local MongoDB install)

## 2. Backend setup

```bash
cd server
npm install
cp .env
```

Open `.env` and fill in:
- `MONGO_URI` — your MongoDB Atlas (or local) connection string
- `JWT_SECRET` — any long random string
- `CLIENT_URL` — the URL your frontend runs on (default `http://localhost:5173`)

Seed the database with demo categories, products, sample reviews and an admin account:

```bash
npm run seed
```

This creates an admin login:
```
email: admin@brewandbite.com
password: Admin@123
```
**Change this password (or delete/recreate the admin user) before going live.**

Start the API:

```bash
npm run dev      # with auto-reload (nodemon)
# or
npm start
```

The API runs on `http://localhost:5000` by default. Visit `http://localhost:5000/api/health` to confirm it's running.

## 3. Frontend setup

In a separate terminal:

```bash
cd client
npm install
cp .env.example .env
npm run dev
```

Open `http://localhost:5173` in your browser. The site talks to the API at the URL set in `client/.env` (`VITE_API_URL`).

## 4. Trying it out

1. Register a new customer account, browse the menu, add items to the cart, and place an order.
2. Log in as the admin (`admin@brewandbite.com` / `Admin@123`) and go to `/admin` to see the dashboard, update the order's status, and watch it update on the customer's Order Tracking page after a refresh.
3. Add your own menu items, categories, and images from the Admin → Menu Items / Categories pages. Any public image URL works in the "Image URL" field — for real product photos, upload the client's photos to a host like Cloudinary or Imgur and paste the link.

## 5. Going live (deployment)

- **Database:** MongoDB Atlas (free tier is enough to start).
- **Backend:** deploy the `server/` folder to Render, Railway, or a VPS. Set the same environment variables as your `.env` in the host's dashboard.
- **Frontend:** deploy the `client/` folder to Vercel or Netlify (`npm run build` produces a `dist/` folder). Set `VITE_API_URL` to your deployed backend's URL.
- Update `CLIENT_URL` in the backend's environment variables to your deployed frontend URL, so CORS allows it.
- Replace the demo Unsplash images with the restaurant's real food photography for the final client handoff.

## 6. Project structure

```
brew-and-bite/
├── server/      Express + MongoDB API (models, controllers, routes, middleware)
└── client/      React + Tailwind frontend (pages, admin panel, cart/auth state)
```

See the code comments and file names inside each folder — they follow the standard MVC/REST structure (models, controllers, routes) on the backend and a pages/components/context structure on the frontend, so it's straightforward to extend (e.g. adding Stripe payments, email notifications, or a favorites page).

---

Built as a real working MERN application — not a static template — so every button, form, and admin action is wired to the actual database.
