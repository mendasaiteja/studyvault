import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import api from '../Api/api';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [college, setCollege] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setsuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api.post("/auth/register", { name, email, password, college });
      setsuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
      setsuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { label: 'Name', type: 'text', placeholder: 'Enter your name', value: name, onChange: setName },
    { label: 'Email', type: 'email', placeholder: 'Enter your email', value: email, onChange: setEmail },
    { label: 'Password', type: 'password', placeholder: 'Create a password', value: password, onChange: setPassword },
    { label: 'College', type: 'text', placeholder: 'Enter your college', value: college, onChange: setCollege },
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
          Create an account
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
            disabled={loading}
            className="mt-2 w-full bg-[#7c6fcd] hover:bg-[#9080e0]
                       text-white font-medium text-sm py-3 rounded-xl
                       transition-all duration-150 cursor-pointer disabled:opacity-60"
          >
            {loading ? "Registering..." : "Register"}
          </button>
          {error && (
            <p className="text-center text-red-400 text-sm mt-2">
              {error}
            </p>
          )}

          {success && (
            <p className="text-center text-green-400 text-sm mt-2">
              Registered Successfully
            </p>
          )}
        </form>

        <p className="text-center text-[#4a4860] text-sm mt-5">
          Already have an account?{' '}
          <Link to="/login" className="text-[#7c6fcd] hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  )
}

export default Register;
