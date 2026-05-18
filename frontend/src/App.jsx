import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Upload from './Pages/Upload'
import Myupload from './Pages/Myupload'
import Navbar from './Components/Navbar'
import ProtectedRoute from './context/ProtectedRoute';
import Footer from './Components/Footer';
import About from './Pages/About';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/"         element={<Home />} />
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />

          <Route path="/upload"   element={<ProtectedRoute><Upload /></ProtectedRoute>} />
          <Route path="/myupload" element={<ProtectedRoute><Myupload /></ProtectedRoute>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;