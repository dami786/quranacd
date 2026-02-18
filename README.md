# Quran Academy - Full-Stack Web Application

A full-stack web application that replicates the design and functionality of the Babul Quran reference website. Built with **React (Vite)** + **Tailwind CSS** on the frontend and **Node.js** + **Express** + **MongoDB** on the backend. All data is served from MongoDB via REST APIs; no Local Storage is used for permanent data.

---

## Project Structure

```
quranacd/
├── frontend/                 # React (Vite) + Tailwind
│   ├── src/
│   │   ├── components/       # Navbar, Footer, Hero, Cards, CardItem, Forms, Buttons, Modals
│   │   ├── pages/            # Home, About, Contact, Login, Register, Profile, Dashboard, Details
│   │   ├── services/         # api.js (Axios)
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── backend/                  # Node.js + Express + MongoDB
│   ├── config/               # db.js
│   ├── controllers/          # authController, dataController
│   ├── models/               # User, Item
│   ├── routes/               # authRoutes, dataRoutes
│   ├── middleware/           # authMiddleware (JWT)
│   ├── server.js
│   └── package.json
└── README.md
```

---

## Prerequisites

- **Node.js** (v18 or later)
- **MongoDB** (local installation or MongoDB Atlas connection string)
- **npm** or **yarn**

---

## How to Connect MongoDB

### Option 1: Local MongoDB

1. Install MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community).
2. Start MongoDB service (e.g. on Windows: run `mongod` or start MongoDB from Services).
3. Use connection string: `mongodb://localhost:27017/quranacd`

### Option 2: MongoDB Atlas (Cloud)

1. Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas).
2. Create a database user and get the connection string (e.g. `mongodb+srv://user:pass@cluster.mongodb.net/quranacd`).
3. In the backend folder, create a `.env` file and set:
   ```env
   MONGODB_URI=mongodb+srv://your-user:your-password@cluster.xxxxx.mongodb.net/quranacd
   ```

---

## How to Install

### Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder (optional; defaults work for local dev):

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/quranacd
JWT_SECRET=your-super-secret-jwt-key-change-in-production
```

### Frontend

```bash
cd frontend
npm install
```

No `.env` required for frontend if backend runs on `http://localhost:5000`. For a different API URL, create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## How to Run

### 1. Start MongoDB (if local)

Ensure MongoDB is running on your machine (e.g. `mongod` or MongoDB service started).

### 2. Run Backend

```bash
cd backend
npm run dev
```

Server runs at **http://localhost:5000**. You should see: `MongoDB Connected` and `Server running on port 5000`.

### 3. Run Frontend

```bash
cd frontend
npm run dev
```

Frontend runs at **http://localhost:3000**. Vite proxies `/api` to the backend, so API calls from the frontend go to the same origin.

---

## API Reference

### Auth (no auth required for register/login)

| Method | Endpoint           | Description        |
|--------|--------------------|--------------------|
| POST   | `/api/auth/register` | Register user    |
| POST   | `/api/auth/login`    | Login user       |
| GET    | `/api/auth/profile`  | Get profile (JWT) |

### Items (courses)

| Method | Endpoint        | Description           | Auth   |
|--------|-----------------|-----------------------|--------|
| GET    | `/api/items`    | List all items        | No     |
| GET    | `/api/items/:id`| Get single item       | No     |
| POST   | `/api/items`    | Create item           | JWT    |
| PUT    | `/api/items/:id`| Update item           | JWT    |
| DELETE | `/api/items/:id`| Delete item           | JWT    |

Item schema: `title`, `description`, `image`, `price`, `createdAt`.

---

## Design (Reference Match)

- **Colors:** Primary teal (`#0d9488`), primary-dark (`#0f766e`), accent orange (`#d97706`), bg-alt (`#f0fdfa`), footer dark (`#134e4a`).
- **Layout:** Top bar (email, phone), sticky navbar (logo, Courses dropdown, FREE TRIAL, Login/Register), hero, steps, features, course cards, teachers, price, CTA, FAQ, contact form, footer, WhatsApp float.
- **Responsive:** Mobile, tablet, desktop via Tailwind breakpoints.

---

## Features

- **Frontend:** React Router, Axios, Tailwind-only styling, loading/error states, reusable components.
- **Backend:** MVC, async/await, JWT auth, Mongoose models (User, Item).
- **Data:** All course data and user auth from MongoDB via APIs; no Local Storage for permanent data (JWT token is stored in localStorage only for sending Authorization header).

---

## Quick Test

1. Open http://localhost:3000.
2. **Register** a user (Register → fill form → submit).
3. Go to **Dashboard** (or Profile → Dashboard). You must be logged in.
4. **Add Course** (title, description, image URL optional, price). Data is saved in MongoDB.
5. View courses on **Home** (courses section) and open **Details** for any course.
6. **Edit** or **Delete** courses from Dashboard.

You now have a full-stack app that matches the reference design and uses MongoDB for all data.
