import React from 'react'
import { Link } from 'react-router-dom'
import { BookOpen } from 'lucide-react'

function Footer() {
  return (
    <footer className="bg-[#0f1117] border-t border-[#22253a] px-6 pt-10 pb-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-3 gap-8 mb-8">

          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-[#7c6fcd] rounded-lg flex items-center justify-center">
                <BookOpen size={16} color="#fff" />
              </div>
              <span className="text-[#c8c4f0] text-[17px] font-medium">StudyVault</span>
            </div>
            <p className="text-[#4a4860] text-[13px] leading-relaxed max-w-[220px]">
              A platform for students to share and discover study resources across subjects.
            </p>
          </div>

          <div>
            <h4 className="text-[11px] font-medium text-[#7c78a0] uppercase tracking-widest mb-3">
              Navigation
            </h4>
            {[
              { to: '/',        label: 'Home' },
              { to: '/about',   label: 'About' },
              { to: '/upload',  label: 'Upload' },
              { to: '/myupload',label: 'My Uploads' },
            ].map(({ to, label }) => (
              <Link key={to} to={to}
                className="block text-[13px] text-[#4a4860] hover:text-[#c8c4f0] 
                           mb-2 transition-colors">
                {label}
              </Link>
            ))}
          </div>

          <div>
            <h4 className="text-[11px] font-medium text-[#7c78a0] uppercase tracking-widest mb-3">
              Account
            </h4>
            {[
              { to: '/login',    label: 'Login' },
              { to: '/register', label: 'Register' },
            ].map(({ to, label }) => (
              <Link key={to} to={to}
                className="block text-[13px] text-[#4a4860] hover:text-[#c8c4f0] 
                           mb-2 transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div className="border-t border-[#22253a] pt-5 flex items-center justify-between">
          <p className="text-[12px] text-[#4a4860]">© 2026 StudyVault. All rights reserved.</p>
          <p className="text-[12px] text-[#4a4860]">Built for students, by Saiteja.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;