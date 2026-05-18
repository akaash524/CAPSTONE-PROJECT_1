# BlogSphere Frontend

Modern blogging platform frontend built using React, Tailwind CSS, Zustand, React Router, Axios, and React Hook Form.

## Live Demo

Frontend: https://capstone-project-1-theta.vercel.app/

Backend API: https://capstone-project-1-zhbo.onrender.com

---

# Features

- Modern responsive UI
- JWT Authentication with HTTP-only cookies
- User & Author roles
- Protected routes
- Create, edit, delete, and restore articles
- Read articles with comments
- Add comments to articles
- Image upload support
- Toast notifications
- Persistent login using `check-auth`
- Fully responsive layouts

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
- Lucide React Icons
- Vite

---

# Project Structure

```bash
FRONTEND/
│
├── src/
│   ├── COMPONENTS/
│   │   ├── ArticleById.jsx
│   │   ├── AuthorArticles.jsx
│   │   ├── AuthorProfile.jsx
│   │   ├── EditArticle.jsx
│   │   ├── ErrorBoundary.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── Register.jsx
│   │   ├── RootLayout.jsx
│   │   ├── Unauthorized.jsx
│   │   ├── UserProfile.jsx
│   │   └── WriteArticle.jsx
│   │
│   ├── STORES/
│   │   └── authStore.js
│   │
│   ├── styles/
│   │   └── common.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   ├── App.css
│   └── index.css
│
├── package.json
└── README.md
```

---

# Installation

## Clone Repository

```bash
git clone <repository-url>
```

## Navigate

```bash
cd FRONTEND
```

## Install Dependencies

```bash
npm install
```

## Run Development Server

```bash
npm run dev
```

---

# Authentication Flow

## Login

- User logs in using email & password
- Backend sends JWT token as HTTP-only cookie
- Frontend stores authenticated user in Zustand store

## Persistent Login

On refresh:

```js
checkAuth()
```

is automatically called from:

```jsx
RootLayout.jsx
```

This validates the cookie using backend API.

---

# Routing

## Public Routes

- `/`
- `/login`
- `/register`

## Protected User Routes

- `/user-profile`
- `/article/:id`

## Protected Author Routes

- `/author-profile`
- `/write-article`
- `/edit-article`

---

# State Management

Global authentication state is managed using Zustand.

## Store Includes

- currentUser
- isAuthenticated
- loading
- error
- login()
- logout()
- checkAuth()

---

# Main Pages

## Home Page

Displays all published articles in a modern card layout.

## Login Page

- Form validation
- Toast notifications
- Role-based redirection

## Register Page

- User/Author role selection
- Image upload preview
- Validation support

## User Profile

- User details
- Explore all articles
- Read article navigation

## Author Dashboard

- View authored articles
- Edit articles
- Delete/Restore articles

## Article Page

- Full article reading UI
- Comments section
- Add comments
- Show more comments functionality

---

# API Integration

Axios is used for all backend communication.

Example:

```js
axios.get(
  "https://capstone-project-1-zhbo.onrender.com/user-api/articles",
  {
    withCredentials: true,
  }
);
```

---

# Styling

Tailwind CSS is used for:

- Responsive layouts
- Glassmorphism effects
- Professional article cards
- Smooth transitions
- Dark modern UI

---

# Deployment

## Frontend

Deployed on Vercel.

## Important Vercel Configuration

Create `vercel.json`

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

This fixes refresh issues on React Router routes.

---

# Common Issues

## 401 Unauthorized on Refresh

Expected behavior when user is not logged in.

Handled safely inside:

```js
checkAuth()
```

## Vercel Route Refresh 404

Solved using:

```json
vercel.json
```

rewrites configuration.

---

# Future Improvements

- Search articles
- Like system
- Bookmark articles
- Rich text editor
- Article categories page
- Admin dashboard
- Pagination
- Dark/Light theme toggle

---

# Author

Developed by Akash

---