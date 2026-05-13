import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Upload from './Pages/Upload'
import Myupload from './Pages/Myupload'
import Navbar from './Components/Navbar'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/myupload" element={<Myupload />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;