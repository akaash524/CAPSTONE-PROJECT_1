# BlogSphere

A modern full-stack blogging platform where users can explore articles, authors can publish content, and administrators can manage the platform.

Built with React, Node.js, Express.js, MongoDB, Tailwind CSS, Zustand, JWT Authentication, and Cloudinary.

---

# Live Demo

## Frontend
https://capstone-project-1-theta.vercel.app/

## Backend API
https://capstone-project-1-zhbo.onrender.com

---

# Features

## Authentication
- JWT-based authentication
- HTTP-only secure cookies
- Persistent login using `check-auth`
- Protected routes
- Role-based authorization

## User Features
- User registration and login
- Read published articles
- Comment on articles
- Explore all blogs
- Responsive user interface

## Author Features
- Create articles
- Edit articles
- Soft delete and restore articles
- View authored articles

## Admin Features
- Block users
- Unblock users

## UI/UX
- Modern responsive design
- Glassmorphism-inspired interface
- Smooth transitions and interactions
- Toast notifications
- Professional article layouts

---

# Tech Stack

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

# Project Structure

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

# Authentication Flow

## Login Process

1. User enters credentials  
2. Backend validates credentials  
3. JWT token is generated  
4. Token is stored in an HTTP-only cookie  
5. Frontend updates the Zustand store  

## Persistent Login

On refresh:

```js
checkAuth()
```

The backend validates the token and restores the authenticated session.

---

# Roles and Permissions

| Role  | Permissions |
|--------|-------------|
| USER   | Read articles and comment |
| AUTHOR | Create, edit, and manage articles |
| ADMIN  | Block and unblock users |

---

# API Overview

## Common APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/common-api/login` | User login |
| GET | `/common-api/logout` | User logout |
| GET | `/common-api/check-auth` | Validate authenticated user |
| PUT | `/common-api/change-password` | Change password |

---

## User APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/user-api/users` | Register user |
| GET | `/user-api/articles` | Fetch all articles |
| POST | `/user-api/comment` | Add comment to article |

---

## Author APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/author-api/users` | Register author |
| POST | `/author-api/articles` | Create article |
| GET | `/author-api/articles/:id` | Fetch author articles |
| PUT | `/author-api/articles` | Edit article |
| PATCH | `/author-api/articles/delete/status` | Soft delete or restore article |

---

## Admin APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/admin-api/block` | Block user |
| POST | `/admin-api/unblock` | Unblock user |

---

# Database Schemas

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

# Image Uploads

Profile images are handled using:
- Multer
- Cloudinary

Uploaded images are stored in Cloudinary, and image URLs are saved in MongoDB.

---

# Installation

## Clone the Repository

```bash
git clone <repository-url>
```

---

## Frontend Setup

```bash
cd FRONTEND
npm install
npm run dev
```

---

## Backend Setup

```bash
cd BACKEND
npm install
npm start
```

---

# Deployment

## Frontend
Deployed on Vercel

## Backend
Deployed on Render

---

# Vercel Configuration

Create a `vercel.json` file inside the frontend root directory:

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

This configuration resolves React Router refresh issues on deployment.

---

# UI Highlights

- Responsive layouts
- Modern dark theme
- Smooth hover animations
- Professional article cards
- Elegant article detail pages
- Styled comment section

---

# Future Improvements

- Rich text editor
- Article likes and reactions
- Search and filtering
- Pagination
- Bookmark functionality
- Admin dashboard
- Notifications
- AI-powered article suggestions

---

# Author

Developed by Akash