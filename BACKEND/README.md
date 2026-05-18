# BlogSphere Backend API

A scalable backend for the **BlogSphere** blogging platform built using:

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Cloudinary Image Upload
- Multer
- bcryptjs

---

# Features

- User & Author Registration
- JWT Authentication
- Secure Cookie-Based Login
- Article CRUD
- Soft Delete / Restore Articles
- Comment System
- Role-Based Authorization
- Profile Image Uploads
- Cloudinary Integration

---

# Project Structure

```bash
BACKEND/
│
├── APIS/
│   ├── adminAPI.js
│   ├── authorAPI.js
│   ├── commonAPI.js
│   └── userAPI.js
│
├── config/
│   ├── cloudinary.js
│   ├── cloudinaryUpload.js
│   └── multer.js
│
├── MIDDLEWARES/
│   ├── checkAuthor.js
│   ├── checkUser.js
│   └── verifyToken.js
│
├── MODELS/
│   ├── articleModel.js
│   └── userModel.js
│
├── SERVICES/
│   └── autthService.js
│
├── .env
├── package.json
└── README.md
```

---

# Authentication

The backend uses:

- JWT Tokens
- HTTP Only Cookies
- Role-Based Authorization

After successful login:

```js
res.cookie("token", token, {
  httpOnly: true,
  sameSite: "none",
  secure: true,
});
```

---

# User Roles

| Role | Access |
|------|--------|
| USER | Read articles, comment |
| AUTHOR | Create & manage articles |
| ADMIN | Block / unblock users |

---

# Schemas

## User Schema

```js
{
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  profileImageUrl: String,
  role: "AUTHOR" | "USER" | "ADMIN",
  isActive: Boolean
}
```

### Features

- Unique Email Validation
- Role Validation
- Active / Blocked Status
- Password Hashing

---

## Article Schema

```js
{
  author: ObjectId,
  title: String,
  category: String,
  content: String,
  comments: [
    {
      user: ObjectId,
      comment: String
    }
  ],
  isArticleActive: Boolean
}
```

### Features

- Author Relation
- Embedded Comments
- Soft Delete
- Timestamps

---

# Base URL

```bash
https://your-domain.com
```

---

# Common APIs

Base Route:

```bash
/common-api
```

---

## Login

### Endpoint

```http
POST /common-api/login
```

### Request Body

```json
{
  "email": "user@gmail.com",
  "password": "123456"
}
```

### Response

```json
{
  "message": "Login Success",
  "payload": {
    "userId": "USER_ID",
    "role": "USER"
  }
}
```

---

## Logout

### Endpoint

```http
GET /common-api/logout
```

### Response

```json
{
  "message": "logged out succesfully"
}
```

---

## Check Authentication

### Endpoint

```http
GET /common-api/check-auth
```

### Protected Roles

- USER
- AUTHOR
- ADMIN

### Response

```json
{
  "message": "authenticated",
  "payload": {}
}
```

---

## Change Password

### Endpoint

```http
PUT /common-api/change-password
```

### Request Body

```json
{
  "email": "user@gmail.com",
  "currentPassword": "123",
  "newPassword": "456"
}
```

---

# User APIs

Base Route:

```bash
/user-api
```

---

## Register User

### Endpoint

```http
POST /user-api/users
```

### FormData

```bash
firstName
lastName
email
password
profileImageUrl
```

### Features

- Uploads image to Cloudinary
- Stores image URL in DB
- Rollback if DB save fails

---

## Get All Articles

### Endpoint

```http
GET /user-api/articles
```

### Protected Roles

- USER
- AUTHOR
- ADMIN

### Response

```json
{
  "message": "Articles",
  "payload": []
}
```

---

## Add Comment

### Endpoint

```http
POST /user-api/comment
```

### Protected Roles

- USER

### Request Body

```json
{
  "articleId": "ARTICLE_ID",
  "comment": "Great article!"
}
```

### Response

```json
{
  "message": "Commnet Added",
  "payload": {}
}
```

---

# Author APIs

Base Route:

```bash
/author-api
```

---

## Register Author

### Endpoint

```http
POST /author-api/users
```

### FormData

```bash
firstName
lastName
email
password
profileImageUrl
```

---

## Create Article

### Endpoint

```http
POST /author-api/articles
```

### Protected Roles

- AUTHOR

### Request Body

```json
{
  "author": "AUTHOR_ID",
  "title": "My Blog",
  "category": "Technology",
  "content": "Article content"
}
```

---

## Get Author Articles

### Endpoint

```http
GET /author-api/articles/:id
```

### Protected Roles

- AUTHOR

---

## Edit Article

### Endpoint

```http
PUT /author-api/articles
```

### Protected Roles

- AUTHOR

### Request Body

```json
{
  "articleId": "ARTICLE_ID",
  "title": "Updated Title",
  "category": "Technology",
  "content": "Updated content"
}
```

---

## Soft Delete / Restore Article

### Endpoint

```http
PATCH /author-api/articles/delete/status
```

### Protected Roles

- AUTHOR

### Request Body

```json
{
  "article": "ARTICLE_ID",
  "isArticleActive": false
}
```

---

# Admin APIs

Base Route:

```bash
/admin-api
```

---

## Block User

### Endpoint

```http
POST /admin-api/block
```

### Request Body

```json
{
  "id": "USER_ID"
}
```

---

## Unblock User

### Endpoint

```http
POST /admin-api/unblock
```

### Request Body

```json
{
  "id": "USER_ID"
}
```

---

# Middleware

## verifyToken.js

Handles:

- JWT Verification
- Role Authorization
- Token Expiry Validation

### Example

```js
verifyToken("USER", "AUTHOR")
```

---

# File Upload Flow

1. Multer stores image in memory
2. Cloudinary uploads image
3. Secure URL stored in MongoDB
4. Rollback if DB save fails

---

# Security Features

- HTTP Only Cookies
- Secure Cookies
- JWT Authentication
- Password Hashing using bcrypt
- Protected Routes
- Role-Based Authorization

---

# Environment Variables

```env
PORT=5000

MONGO_DB_URL=

JWT_SECRECT=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

# Installation

```bash
npm install
```

---

# Run Server

```bash
npm run dev
```

---

# Technologies Used

- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Multer
- Cloudinary
- dotenv

---

# Future Improvements

- Likes System
- Bookmarks
- Rich Text Editor
- Notifications
- Search & Filtering
- Pagination
- Admin Dashboard
- Article Tags
- Image Uploads in Articles

---

# Author

Built with ❤️ using MERN Stack.