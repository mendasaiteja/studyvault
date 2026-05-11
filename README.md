# StudyVault — Frontend

A React-based frontend for StudyVault, a platform where students can upload, browse, and download study materials like PDFs and documents.

---

## Tech Stack

- **React** (Vite)
- **React Router DOM** — client-side routing
- **Axios** — API calls with automatic auth header injection
- **Tailwind CSS** *(optional, swap with your preferred styling)*

---

## Features

- User registration and login with JWT authentication
- Browse all uploaded study files (visible to guests too)
- Upload PDF / DOCX / PPTX files with title and subject
- View and download files
- "My Uploads" page — see only your own uploaded files
- Protected routes — redirects to login if not authenticated

---

## Project Structure

```
frontend/
├── src/
│   ├── api.js                  # Axios instance with auth interceptor
│   ├── main.jsx
│   ├── App.jsx                 # Routes setup
│   ├── pages/
│   │   ├── Register.jsx
│   │   ├── Login.jsx
│   │   ├── Home.jsx            # Browse all files
│   │   ├── Upload.jsx          # Upload a new file
│   │   ├── MyUploads.jsx       # Logged-in user's files
│   │   └── FileDetail.jsx      # Preview + download a file
│   └── components/
│       └── ProtectedRoute.jsx  # Redirects to /login if no token
├── .env
├── index.html
└── package.json
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/studyvault-frontend.git
cd studyvault-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

> Change the URL to your deployed backend when pushing to production.

### 4. Start the development server

```bash
npm run dev
```

App runs at `http://localhost:5173` by default.

---

## Environment Variables

| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Base URL of the backend API |

---

## API Integration

All API calls go through `src/api.js`:

```js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
```

The interceptor automatically attaches the JWT token to every request — no need to manually set headers in each page.

---

## Pages and Routes

| Route | Page | Auth required |
|---|---|---|
| `/register` | Register | No |
| `/login` | Login | No |
| `/` | Home — all files | No (partial data) |
| `/upload` | Upload a file | Yes |
| `/my-uploads` | My uploaded files | Yes |
| `/files/:id` | File detail + download | Yes |

---

## Uploading Files

Files are sent as `multipart/form-data`. Do **not** set `Content-Type` manually — Axios sets it automatically when you pass a `FormData` object:

```js
const formData = new FormData();
formData.append("title", title);
formData.append("subject", subject);
formData.append("file", selectedFile); // File object from input

await api.post("/files/upload", formData);
```

---

## Authentication Flow

1. User logs in → backend returns a JWT token
2. Token is saved to `localStorage`
3. Every subsequent API request includes `Authorization: Bearer <token>`
4. On logout, token is removed from `localStorage`
5. `ProtectedRoute` checks for the token and redirects to `/login` if missing

---

## Backend Repository

The backend (Node.js + Express + MongoDB + Cloudinary) lives here:

> [studyvault-backend](https://github.com/your-username/studyvault-backend)

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |

---

## Contributing

Pull requests are welcome. For major changes, open an issue first to discuss what you'd like to change.

---

## License

[MIT](LICENSE)
