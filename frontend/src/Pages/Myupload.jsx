import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload, FileText, Trash2 } from 'lucide-react'
import api from '../Api/api'
import { getTheme, BookArt } from '../Components/fileUtils.jsx'

function Myupload() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyUploads = async () => {
      try {
        const response = await api.get('/files/my-uploads');
        setFiles(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load uploads");
      } finally {
        setLoading(false);
      }
    };
    fetchMyUploads();
  }, []);

  const handleDelete = async (fileId) => {
    if (!window.confirm("Delete this file?")) return;
    try {
      await api.delete(`/files/${fileId}`);
      setFiles(prev => prev.filter(f => f._id !== fileId));
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  // Loading state
  if (loading) return (
    <div className="min-h-screen bg-[#0f1117] flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-[#7c6fcd] border-t-transparent 
                      rounded-full animate-spin" />
    </div>
  );

  // Error state
  if (error) return (
    <div className="min-h-screen bg-[#0f1117] flex items-center justify-center">
      <p className="text-red-400 text-sm">{error}</p>
    </div>
  );

  // Empty state
  if (files.length === 0) return (
    <div className="min-h-screen bg-[#0f1117] flex flex-col items-center justify-center gap-4">
      <div className="w-16 h-16 rounded-2xl bg-[#16181f] border border-[#22253a] 
                      flex items-center justify-center">
        <FileText size={28} className="text-[#4a4860]" />
      </div>
      <p className="text-[#d8d4f0] font-medium">No uploads yet</p>
      <p className="text-[#4a4860] text-sm">Share your first study resource</p>
      <button
        onClick={() => navigate('/upload')}
        className="flex items-center gap-2 mt-2 px-5 py-2.5 bg-[#7c6fcd] 
                   hover:bg-[#9080e0] text-white text-sm font-medium 
                   rounded-xl transition-colors cursor-pointer"
      >
        <Upload size={15} />
        Upload a file
      </button>
    </div>
  );

  // Files grid
  return (
    <div className="bg-[#0f1117] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="flex items-center justify-between py-5">
          <h2 className="text-base font-semibold text-[#c8c4f0]">My Uploads</h2>
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#4a4860]">{files.length} files</span>
            <button
              onClick={() => navigate('/upload')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#7c6fcd]
                         hover:bg-[#9080e0] text-white text-xs font-medium
                         rounded-lg transition-colors cursor-pointer"
            >
              <Upload size={13} />
              Upload
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {files.map((file) => {
            const theme = getTheme(file.subject);
            return (
              <div
                key={file._id}
                className="rounded-xl overflow-hidden border transition-all duration-200 hover:-translate-y-1"
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
                  <p className="text-xs font-bold uppercase tracking-widest mb-2"
                     style={{ color: theme.text }}>
                    {file.subject}
                  </p>
                  <h3 className="text-sm font-semibold text-[#d8d4f0] leading-snug mb-5">
                    {file.title}
                  </h3>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#4a4860]">
                      {new Date(file.createdAt).toLocaleDateString()}
                    </span>
                    <button
                      onClick={() => handleDelete(file._id)}
                      className="flex items-center justify-center w-9 h-9 rounded-lg 
                                 border border-red-900/40 text-red-400 
                                 hover:bg-red-900/30 transition-colors cursor-pointer"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Myupload;