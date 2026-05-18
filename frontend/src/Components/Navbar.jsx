import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { BookOpen, Home, Upload, Files, LogOut, UserPlus, Info } from 'lucide-react'

function Navbar() {
  const navigate = useNavigate()
  const { token, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-[#0f1117] border-b border-[#22253a] px-6 h-[60px] 
                    flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2">
        <div className="w-8 h-8 bg-[#7c6fcd] rounded-lg flex items-center justify-center">
          <BookOpen size={16} color="#fff" />
        </div>
        <span className="text-[#c8c4f0] text-[17px] font-medium">StudyVault</span>
      </Link>

      <div className="flex items-center gap-1.5">
        {token ? (
          <>
            <Link to="/"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[13px]
                         text-[#9d99c0] hover:text-[#c8c4f0] hover:bg-[#16181f]
                         border border-transparent hover:border-[#22253a] transition-all">
              <Home size={15} /> Home
            </Link>
            <Link to="/upload"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[13px]
                         text-[#9d99c0] hover:text-[#c8c4f0] hover:bg-[#16181f]
                         border border-transparent hover:border-[#22253a] transition-all">
              <Upload size={15} /> Upload
            </Link>
            <Link to="/myupload"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[13px]
                         text-[#9d99c0] hover:text-[#c8c4f0] hover:bg-[#16181f]
                         border border-transparent hover:border-[#22253a] transition-all">
              <Files size={15} /> My Uploads
            </Link>

            <div className="w-px h-5 bg-[#22253a] mx-1" />

            <button onClick={handleLogout}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[13px]
                         text-[#9d99c0] hover:text-[#c8c4f0] hover:bg-[#16181f]
                         border border-[#22253a] transition-all cursor-pointer">
              <LogOut size={15} /> Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[13px]
                         text-[#9d99c0] hover:text-[#c8c4f0] hover:bg-[#16181f]
                         border border-transparent hover:border-[#22253a] transition-all">
              <Home size={15} /> Home
            </Link>
            <Link to="/about"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[13px]
                         text-[#9d99c0] hover:text-[#c8c4f0] hover:bg-[#16181f]
                         border border-transparent hover:border-[#22253a] transition-all">
              <Info size={15} /> About
            </Link>

            <div className="w-px h-5 bg-[#22253a] mx-1" />

            <Link to="/login"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[13px]
                         text-[#9d99c0] hover:text-[#c8c4f0] hover:bg-[#16181f]
                         border border-[#22253a] transition-all">
              Login
            </Link>
            <Link to="/register"
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-[13px]
                         font-medium bg-[#7c6fcd] hover:bg-[#9080e0]
                         text-white transition-all">
              <UserPlus size={14} /> Register
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar;