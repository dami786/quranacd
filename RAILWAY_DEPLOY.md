# Railway Backend Deploy – "Application failed to respond" fix

## 1. Railway Service Settings

- **Root Directory:** `backend` (zaroor set karo – repo root pe package.json nahi hai)
- **Build Command:** *(empty / default)* → Railway `backend` folder me `npm install` chalayega
- **Start Command:** `npm start` ya `node server.js`

## 2. Variables (Railway → Service → Variables)

| Variable            | Value (apna daalo) |
|---------------------|--------------------|
| `MONGODB_URI`       | `mongodb+srv://...` (MongoDB Atlas connection string) |
| `JWT_SECRET`        | koi bhi strong secret string |
| `SUPER_ADMIN_EMAIL` | super admin email |
| `SUPER_ADMIN_PASSWORD` | super admin password |

**Note:** `PORT` Railway khud set karta hai, mat add karo.

## 3. Deploy ke baad

- **Deployments → Latest → View Logs** me check karo:
  - `Server started on port XXXX` dikhna chahiye
  - `MongoDB Connected: ...` dikhna chahiye
- Agar **MongoDB connection error** aaye to `MONGODB_URI` Railway Variables me sahi daalo (same jo `.env` me hai).

## 4. URL

- Backend URL: `https://quranacd-production.up.railway.app`
- Health check: `https://quranacd-production.up.railway.app/api/health`
