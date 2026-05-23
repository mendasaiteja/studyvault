import React, { useState } from 'react'
import { BookOpen } from 'lucide-react'
import api from '../Api/api';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from "../context/ProtectedRoute.jsx";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [college, setCollege] = useState("");
  const [error, setError] = useState("");
  const [success, setsuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await api.post("auth/login", {
        email, password
      });
      login(response.data.token);
      setsuccess(true);
      setTimeout(() => {
        Navigate("/");
      }, 1000);
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
      setsuccess(false);
    } finally {
      setLoading(false);
    }
  }

  const fields = [
    { label: 'Email', type: 'email', placeholder: 'Enter your email', value: email, onChange: setEmail },
    { label: 'Password', type: 'password', placeholder: 'Enter your password', value: password, onChange: setPassword }
  ];

  return (
    <div className="min-h-screen bg-[#0f1117] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#16181f] border border-[#22253a] rounded-3xl p-10">
        <div className="flex items-center justify-center gap-2.5 mb-7">
          <div className="w-9 h-9 bg-[#7c6fcd] rounded-xl flex items-center justify-center">
            <BookOpen size={18} color="#fff" />
          </div>
          <span className="text-[#c8c4f0] text-xl font-medium">StudyVault</span>
        </div>
        <h2 className="text-center text-[#d8d4f0] text-2xl font-medium mb-1">
          Login
        </h2>
        <p className="text-center text-[#4a4860] text-sm mb-8">
          Join thousands of students sharing resources
        </p>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {fields.map(({ label, type, placeholder, value, onChange }) => (
            <div key={label}>
              <label className="block text-[11px] font-medium text-[#7c78a0] uppercase tracking-widest mb-1.5">
                {label}
              </label>
              <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-[#0f1117] border border-[#2a2d45] rounded-xl px-3.5 py-2.5
                           text-sm text-[#d8d4f0] placeholder-[#3a3858]
                           outline-none focus:border-[#7c6fcd] transition-colors duration-150"
                required
              />
            </div>
          ))}

          <button
            type="submit"
            className="mt-2 w-full bg-[#7c6fcd] hover:bg-[#9080e0]
                       text-white font-medium text-sm py-3 rounded-xl
                       transition-all duration-150 cursor-pointer"
          >
            {loading ? "Logging..." : "Login"}
          </button>
          {error && (
            <p className="text-center text-red-400 text-sm mt-2">
              {error}
            </p>
          )}

          {success && (
            <p className="text-center text-green-400 text-sm mt-2">
              Loggined Successfully
            </p>
          )}
        </form>

        <p className="text-center text-[#4a4860] text-sm mt-5">
          Don't have an account?{' '}
          <Link href="/register" className="text-[#7c6fcd] hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  )
}

export default Register;
