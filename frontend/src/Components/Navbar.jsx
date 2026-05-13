import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Home, User, UserPlus,NotebookText } from "lucide-react";
function Navbar() {
    const navigate = useNavigate();
    const { token, logout } = useAuth();
    const handleLogout = () => {
        logout();
        navigate("/login");
    };
    return (
        <nav className='py-4 text-white flex items-center justify-between px-4 text-base' style={{ backgroundColor: 'oklch(20.5% 0 0)' }}>
            <div className='flex items-center justify-between gap-1'>
                <Link to="/" className='text-xl font-medium flex items-center gap-1 justify-center'><span>StudyVault</span><NotebookText size={20}/></Link>
            </div>
            <div className='flex items-center justify-between gap-4'>
                {
                    token ? (
                        <>
                            <Link to="/upload" className='bg-blue-400 px-3 py-2 rounded'>Upload</Link>
                            <Link to="/myupload" className='bg-blue-400 px-3 py-2 rounded'>MyUpload</Link>
                            <button onClick={handleLogout} className='bg-blue-400 px-3 py-2 rounded'>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/" className='bg-blue-400 px-3 py-2 rounded flex items-center justify-center gap-1'>
                                <span>Home</span>
                                <Home size={15} />
                            </Link>
                            <Link to="/login" className='bg-blue-400 px-3 py-2 rounded flex items-center justify-center gap-1'>
                                <span>Login</span>
                                <User size={15} />
                            </Link>
                            <Link to="/register" className='bg-blue-400 px-3 py-2 rounded flex items-center justify-center gap-1'>
                                <span>Register</span>
                                <UserPlus size={15} />
                            </Link>
                        </>
                    )
                }
            </div>
        </nav>
    );
}
export default Navbar;