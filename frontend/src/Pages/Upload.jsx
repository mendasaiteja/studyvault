import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CloudUpload, FileText, X } from 'lucide-react'
import api from '../Api/api'

const SUBJECTS = [
  "Mathematics", "Physics", "Chemistry",
  "Computer Science", "English", "Economics",
  "Engineering","M1","M2","M3","M4","Other"
];

function Upload() {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFile = (selected) => {
    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ];
    if (!allowed.includes(selected.type)) {
      setError("Only PDF, DOC, DOCX, PPT, PPTX files are allowed");
      return;
    }
    setError("");
    setFile(selected);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) handleFile(dropped);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !subject || !file) {
      setError("All fields are required");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("subject", subject);
      formData.append("file", file);

      await api.post("/files/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      navigate('/myupload');
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1117] flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-[#16181f] border border-[#22253a] rounded-3xl p-10">

        <h2 className="text-[#d8d4f0] text-2xl font-medium mb-1">Upload a file</h2>
        <p className="text-[#4a4860] text-sm mb-8">Share your study resources with others</p>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>

          <div>
            <label className="block text-[11px] font-medium text-[#7c78a0] uppercase tracking-widest mb-1.5">
              Title
            </label>
            <input
              type="text"
              placeholder="e.g. Chapter 3 Notes"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#0f1117] border border-[#2a2d45] rounded-xl px-3.5 py-2.5
                         text-sm text-[#d8d4f0] placeholder-[#3a3858]
                         outline-none focus:border-[#7c6fcd] transition-colors duration-150"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-[#7c78a0] uppercase tracking-widest mb-1.5">
              Subject
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-[#0f1117] border border-[#2a2d45] rounded-xl px-3.5 py-2.5
                         text-sm text-[#d8d4f0] outline-none focus:border-[#7c6fcd]
                         transition-colors duration-150 cursor-pointer"
            >
              <option value="" disabled>Select a subject</option>
              {SUBJECTS.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-[#7c78a0] uppercase tracking-widest mb-1.5">
              File
            </label>
            <div
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => document.getElementById('fileInput').click()}
              className="relative flex flex-col items-center justify-center gap-3
                         border-2 border-dashed rounded-xl py-10 cursor-pointer
                         transition-colors duration-150"
              style={{ borderColor: dragging ? '#7c6fcd' : '#2a2d45',
                       backgroundColor: dragging ? '#1a1730' : 'transparent' }}
            >
              <input
                id="fileInput"
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx,.ppt,.pptx"
                onChange={(e) => { if (e.target.files[0]) handleFile(e.target.files[0]); }}
              />
              {file ? (
                <>
                  <FileText size={28} className="text-[#7c6fcd]" />
                  <p className="text-sm text-[#d8d4f0] font-medium">{file.name}</p>
                  <p className="text-xs text-[#4a4860]">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setFile(null); }}
                    className="absolute top-3 right-3 text-[#4a4860] hover:text-red-400 
                               transition-colors cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </>
              ) : (
                <>
                  <CloudUpload size={28} className="text-[#4a4860]" />
                  <p className="text-sm text-[#d8d4f0]">
                    Drag & drop or <span className="text-[#7c6fcd]">browse</span>
                  </p>
                  <p className="text-xs text-[#4a4860]">PDF, DOC, DOCX, PPT, PPTX — max 50MB</p>
                </>
              )}
            </div>
          </div>

          {error && <p className="text-xs text-red-400 -mt-2">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#7c6fcd] hover:bg-[#9080e0] disabled:opacity-50
                       text-white font-medium text-sm py-3 rounded-xl
                       transition-all duration-150 cursor-pointer mt-1"
          >
            {loading ? 'Uploading...' : 'Upload File'}
          </button>

        </form>
      </div>
    </div>
  )
}
export default Upload;