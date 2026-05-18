# BlogSphere 🚀

A modern full-stack blogging platform where users can explore articles, authors can publish content, and admins can manage the platform.

Built with React, Node.js, Express, MongoDB, Tailwind CSS, Zustand, JWT Authentication, and Cloudinary.

---

# 🌐 Live Demo

## Frontend
https://capstone-project-1-theta.vercel.app/

## Backend API
https://capstone-project-1-zhbo.onrender.com

---

# ✨ Features

## Authentication
- JWT Authentication
- HTTP-only secure cookies
- Persistent login with `check-auth`
- Protected routes
- Role-based authorization

## User Features
- Register/Login
- Read articles
- Comment on articles
- Explore all published blogs
- Responsive modern UI

## Author Features
- Create articles
- Edit articles
- Soft delete/restore articles
- View authored articles

## Admin Features
- Block users
- Unblock users

## UI/UX
- Modern glassmorphism design
- Fully responsive
- Smooth transitions
- Toast notifications
- Professional article layouts

---

# 🛠️ Tech Stack

## Frontend
- React
- React Router DOM
- Tailwind CSS
- Axios
- Zustand
- React Hook Form
- React Hot Toast
- Lucide React
- Vite

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Multer
- Cloudinary

---

# 📁 Project Structure

```bash
CAPSTONE_PROJECT_1/
│
├── FRONTEND/
│   ├── src/
│   │   ├── COMPONENTS/
│   │   ├── STORES/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── README.md
│
├── BACKEND/
│   ├── APIs/
│   ├── config/
│   ├── MIDDLEWARES/
│   ├── MODELS/
│   ├── SERVICES/
│   ├── package.json
│   └── README.md
│
└── README.md
```

---

# 🔐 Authentication Flow

## Login
1. User enters credentials
2. Backend validates credentials
3. JWT token generated
4. Token stored in HTTP-only cookie
5. Frontend updates Zustand store

## Persistent Login
On refresh:

```js
checkAuth()
```

validates token using backend API.

---

# 👥 Roles

| Role | Permissions |
|------|-------------|
| USER | Read articles, comment |
| AUTHOR | Create/edit/delete articles |
| ADMIN | Block/unblock users |

---

# 📚 API Overview

## Common APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/common-api/login` | Login |
| GET | `/common-api/logout` | Logout |
| GET | `/common-api/check-auth` | Validate user |
| PUT | `/common-api/change-password` | Change password |

---

## User APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/user-api/users` | Register user |
| GET | `/user-api/articles` | Get all articles |
| POST | `/user-api/comment` | Add comment |

---

## Author APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/author-api/users` | Register author |
| POST | `/author-api/articles` | Create article |
| GET | `/author-api/articles/:id` | Get author articles |
| PUT | `/author-api/articles` | Edit article |
| PATCH | `/author-api/articles/delete/status` | Soft delete/restore article |

---

## Admin APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/admin-api/block` | Block user |
| POST | `/admin-api/unblock` | Unblock user |

---

# 🧾 Database Schemas

## User Schema

```js
{
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  profileImageUrl: String,
  role: ["USER", "AUTHOR", "ADMIN"],
  isActive: Boolean
}
```

---

## Article Schema

```js
{
  author: ObjectId,
  title: String,
  category: String,
  content: String,
  comments: [],
  isArticleActive: Boolean
}
```

---

# ☁️ Image Uploads

Profile images are uploaded using:

- Multer
- Cloudinary

Uploaded images are stored in Cloudinary and URLs are saved in MongoDB.

---

# ⚙️ Installation

# 1️⃣ Clone Repository

```bash
git clone <repository-url>
```

---

# 2️⃣ Frontend Setup

```bash
cd FRONTEND
npm install
npm run dev
```

---

# 3️⃣ Backend Setup

```bash
cd BACKEND
npm install
npm start
```

---

# 🚀 Deployment

## Frontend
Deployed on Vercel

## Backend
Deployed on Render

---

# ⚠️ Important Vercel Fix

Create:

```json
vercel.json
```

inside frontend root:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/"
    }
  ]
}
```

This fixes React Router refresh issues.

---

# 🎨 UI Highlights

- Dark modern theme
- Responsive layouts
- Smooth hover animations
- Professional article cards
- Elegant article reading page
- Styled comments section

---

# 🔮 Future Improvements

- Rich text editor
- Article likes
- Search & filters
- Pagination
- Bookmark articles
- Admin dashboard
- Notifications
- AI article suggestions

---

# 👨‍💻 Author

Developed by Akash

---
