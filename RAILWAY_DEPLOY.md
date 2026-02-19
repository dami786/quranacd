# Railway Backend Deploy – "Application failed to respond" fix

## 1. Root Directory kahan set karein

Railway me **Root Directory** option ye jagah pe milta hai:

1. **Project** kholo → us **service** pe click karo (jo backend hona chahiye).
2. Upar **Settings** tab pe jao (ya right side **Settings** panel).
3. Scroll karo – **"Source"** ya **"Build"** section me dekho:
   - **Root Directory** / **Source Directory** / **Monorepo Root** jaisa option ho sakta hai.
   - Value daalo: **`backend`** (sirf ye word, slash ke bina ya `/backend` bhi chal sakta hai).
4. Agar **Settings** me nahi dikh raha to:
   - **Service** pe click karo → **Configure** / **Service Settings** (gear icon).
   - Ya **Deploy** tab ke andar **Build** settings me ho sakta hai.

**Agar ab bhi option nahi mile:** Naya service banao → **"+ New"** → **"GitHub Repo"** → repo select karo. Service banate waqt ya baad me **"Set root directory"** / **"Select directory"** option a sakta hai. Wahan `backend` select karo.

## 2. Service Settings (jo set karna hai)

- **Root Directory:** `backend` (zaroor – repo root pe package.json nahi hai)
- **Build Command:** *(khali chhod do – default)*
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
