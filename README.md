# StudyVault

A full-stack platform where students can upload, browse, and download study materials like PDFs and documents.

🔗 **Live Demo:** [https://studyvault-flame.vercel.app](https://studyvault-flame.vercel.app)

---

## Tech Stack

### Frontend
- **React** (Vite)
- **React Router DOM** — client-side routing
- **Axios** — API calls with automatic auth header injection
- **Tailwind CSS** — styling

### Backend
- **Node.js + Express** — REST API
- **MongoDB + Mongoose** — database
- **Cloudinary** — file storage
- **JWT** — authentication
- **Multer + Streamifier** — file upload handling

---

## Features

- User registration and login with JWT authentication
- Browse all uploaded study files (visible to guests)
- Upload PDF / DOCX / PPTX / PPT / DOC files with title and subject
- Download files (login required)
- My Uploads page — view and delete your own uploaded files
- Protected routes — redirects to login if not authenticated
- Axios interceptor — auto attaches token + handles token expiry
- About page with platform info
- Responsive Navbar and Footer

---

## Project Structure

```
studyvault/
├── frontend/
│   ├── src/
│   │   ├── Api/
│   │   │   └── api.js
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── Components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── fileUtils.jsx
│   │   ├── Pages/
│   │   │   ├── Register.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Upload.jsx
│   │   │   ├── Myupload.jsx
│   │   │   └── About.jsx
│   │   └── App.jsx
│   ├── .env
│   └── package.json
│
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── fileController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── uploadMiddleware.js
│   │   └── protectgetFiles.js
│   ├── models/
│   │   ├── User.models.js
│   │   └── File.models.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── fileRoutes.js
│   ├── config/
│   │   ├── db.js
│   │   └── cloudinary.js
│   ├── .env
│   └── index.js
│
└── README.md
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/mendasaiteja/studyvault.git
cd studyvault
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=3000
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
FRONTEND_URL=http://localhost:5173
```

```bash
node index.js
```

### 3. Setup Frontend

```bash
cd frontend
npm install
```

Create a `.env` file inside `frontend/`:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

```bash
npm run dev
```

App runs at `http://localhost:5173`

---

## Environment Variables

### Backend

| Variable | Description |
|---|---|
| `MONGO_URL` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT signing |
| `PORT` | Server port |
| `CLOUD_NAME` | Cloudinary cloud name |
| `CLOUD_API_KEY` | Cloudinary API key |
| `CLOUD_API_SECRET` | Cloudinary API secret |
| `FRONTEND_URL` | Frontend URL for CORS |

### Frontend

| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Backend API base URL |

---

## Pages and Routes

| Route | Page | Auth Required |
|---|---|---|
| `/` | Home — browse all files | No |
| `/about` | About StudyVault | No |
| `/login` | Login | No |
| `/register` | Register | No |
| `/upload` | Upload a file | Yes |
| `/myupload` | My uploaded files | Yes |

---

## Authentication Flow

1. User registers → credentials saved to MongoDB (passwords hashed with bcrypt)
2. User logs in → backend returns JWT token
3. Token saved to `localStorage`
4. Every API request includes `Authorization: Bearer <token>`
5. Token expiry → auto redirect to `/login`
6. On logout → token removed from `localStorage`

---

## File Upload Flow

1. User selects file (PDF, DOC, DOCX, PPT, PPTX — max 50MB)
2. File sent as `multipart/form-data` to backend
3. Backend streams file to Cloudinary with `resource_type: "raw"`
4. Cloudinary returns a secure URL
5. File metadata saved to MongoDB
6. Download URL served only to logged-in users

---

## Deployment

| Service | Platform |
|---|---|
| Frontend | [Vercel](https://vercel.com) |
| Backend | [Render](https://render.com) |
| Database | [MongoDB Atlas](https://cloud.mongodb.com) |
| File Storage | [Cloudinary](https://cloudinary.com) |

---

## Scripts

### Frontend

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

### Backend

| Command | Description |
|---|---|
| `node index.js` | Start server |

---

## License

[MIT](LICENSE)
