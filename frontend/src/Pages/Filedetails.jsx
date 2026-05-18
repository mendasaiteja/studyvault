import React from 'react'
import { Download, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { getTheme, BookArt } from '../Components/fileUtils.jsx'
import { useAuth } from '../context/AuthContext.jsx'  

function Filedetails({ files = [] }) {
  const navigate = useNavigate();
  const { token } = useAuth();

  const handleDownload = (e, downloadUrl) => {
    e.preventDefault();
    e.stopPropagation();
    if (!token) {
      navigate('/login');  
      return;
    }
    window.open(downloadUrl, '_blank', 'noreferrer');
  };

  if (files.length === 0) return (
    <p className="text-center text-[#4a4860] py-20 bg-[#0f1117]">
      No files yet.
    </p>
  );

  return (
    <div className="bg-[#0f1117] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="flex items-center justify-between py-5">
          <h2 className="text-base font-semibold text-[#c8c4f0]">
            Recent uploads
          </h2>
          <span className="text-xs text-[#4a4860]">
            {files.length} files
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {files.map((file) => {
            const theme = getTheme(file.subject);
            return (
              <div
                key={file._id}
                className="rounded-xl overflow-hidden cursor-pointer border transition-all duration-200 hover:-translate-y-1"
                style={{ background: '#16181f', borderColor: '#22253a' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = theme.border}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#22253a'}
              >
                <div
                  className="h-40 flex items-center justify-center border-b border-[#1e2130]"
                  style={{ backgroundColor: theme.bg }}
                >
                  <BookArt subject={file.subject} theme={theme} />
                </div>

                <div className="p-4">
                  <p
                    className="text-xs font-bold uppercase tracking-widest mb-2"
                    style={{ color: theme.text }}
                  >
                    {file.subject}
                  </p>
                  <h3 className="text-sm font-semibold text-[#d8d4f0] leading-snug mb-5">
                    {file.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-xs text-[#4a4860]">
                      <User size={12} />
                      {file.uploadedBy?.name || 'Unknown'}
                    </span>

                    <button
                      onClick={(e) => handleDownload(e, file.downloadUrl)}
                      title={token ? 'Download' : 'Login to download'}
                      className="flex items-center justify-center w-9 h-9 rounded-lg border transition-colors duration-200"
                      style={{
                        borderColor: theme.border,
                        color: theme.text,
                        backgroundColor: theme.badge,
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.backgroundColor = theme.border;
                        e.currentTarget.style.color = '#fff';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.backgroundColor = theme.badge;
                        e.currentTarget.style.color = theme.text;
                      }}
                    >
                      <Download size={15} className='cursor-pointer'/>
                    </button>
                  </div>

                  {!token && (
                    <p className="text-xs text-[#4a4860] mt-2">
                      <span
                        className="underline cursor-pointer hover:text-[#c8c4f0]"
                        onClick={() => navigate('/login')}
                      >
                        Login
                      </span> to download
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Filedetails;