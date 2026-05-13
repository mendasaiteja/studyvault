import { useState, useEffect } from 'react';
import { FileText, Users, Folder } from 'lucide-react';
import api from "../Api/api.js";
import Filecard from '../Components/Filecard.jsx';

function Home() {
  const [filecount, setFilecount] = useState(0);
  const [usercount, setUsercount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/files/files-count');
        setFilecount(response.data.count||0);
        const users = await api.get('/auth/users');
        setUsercount(users.data.users.length || 0);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
    <div className="min-h-screen bg-[#0f1117] text-white">
      <div className="max-w-7xl px-6 mx-auto">

        <div className="flex items-center justify-between py-14 gap-10">

          <div className="flex-1">
            <span className="inline-block bg-[#1e1a3a] text-[#9f97e8] text-lg px-5 py-2.5 rounded-full border border-[#3a3560] mb-5">
              Student resource library
            </span>
            <h1 className="text-5xl font-bold text-[#e8e6f8] leading-tight mb-1"> 
              Study smarter,
            </h1>
            <h2 className="text-4xl font-bold text-[#7f77dd] leading-tight mb-5">
              share knowledge
            </h2>
            <p className="text-sm text-[#7a7890] leading-relaxed max-w-sm">
              Upload and access notes, papers, and study materials shared by students across colleges.
            </p>
          </div>

          <div className="shrink-0 w-52 h-44 flex items-center justify-center">
            <svg width="300" height="300" viewBox="0 0 200 170" fill="none">
              <rect x="10" y="72" width="100" height="100" rx="4" fill="#1e1a3a" stroke="#534AB7" strokeWidth="1.5"/>
              <rect x="16" y="80" width="60" height="3" rx="1" fill="#534AB7" opacity=".8"/>
              <rect x="16" y="87" width="60" height="2" rx="1" fill="#3a3560"/>
              <rect x="16" y="92" width="40" height="2" rx="1" fill="#3a3560" opacity=".7"/>
              <rect x="16" y="97" width="30" height="2" rx="1" fill="#3a3560" opacity=".5"/>
              <rect x="16" y="102" width="38" height="2" rx="1" fill="#3a3560" opacity=".4"/>

              <rect x="52" y="54" width="100" height="100" rx="4" fill="#1a2a22" stroke="#1D9E75" strokeWidth="1.5"/>
              <rect x="58" y="62" width="44" height="3" rx="1" fill="#1D9E75" opacity=".8"/>
              <rect x="58" y="69" width="32" height="2" rx="1" fill="#0F6E56"/>
              <rect x="58" y="74" width="38" height="2" rx="1" fill="#0F6E56" opacity=".7"/>
              <rect x="58" y="79" width="26" height="2" rx="1" fill="#0F6E56" opacity=".5"/>

              <rect x="94" y="38" width="100" height="100" rx="4" fill="#2a1a0a" stroke="#D85A30" strokeWidth="1.5"/>
              <rect x="100" y="46" width="44" height="3" rx="1" fill="#D85A30" opacity=".8"/>
              <rect x="100" y="53" width="28" height="2" rx="1" fill="#993C1D"/>
              <rect x="100" y="58" width="36" height="2" rx="1" fill="#993C1D" opacity=".7"/>
              <rect x="100" y="63" width="22" height="2" rx="1" fill="#993C1D" opacity=".5"/>

              <rect x="136" y="60" width="100" height="100" rx="4" fill="#0e1a2a" stroke="#378ADD" strokeWidth="1.5"/>
              <rect x="141" y="68" width="44" height="3" rx="1" fill="#378ADD" opacity=".8"/>
              <rect x="141" y="75" width="30" height="2" rx="1" fill="#185FA5"/>
              <rect x="141" y="80" width="36" height="2" rx="1" fill="#185FA5" opacity=".7"/>
              <rect x="141" y="85" width="24" height="2" rx="1" fill="#185FA5" opacity=".5"/>

              <circle cx="122" cy="26" r="18" fill="#1e1a3a" stroke="#534AB7" strokeWidth="1.5"/>
              <path d="M113 26L119 32L131 20" stroke="#7f77dd" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 pb-12">
          <div className="bg-[#16181f] border border-[#22253a] rounded-xl px-8 py-6">
            <p className="text-3xl font-bold text-[#c8c4f0] mb-1">{filecount}</p>
            <p className="text-xs text-[#4a4860] flex items-center gap-1.5">
              <FileText size={13} /> Files
            </p>
          </div>
          <div className="bg-[#16181f] border border-[#22253a] rounded-xl px-8 py-6">
            <p className="text-3xl font-bold text-[#c8c4f0] mb-1">{usercount}</p>
            <p className="text-xs text-[#4a4860] flex items-center gap-1.5">
              <Users size={13} /> Contributors
            </p>
          </div>
          <div className="bg-[#16181f] border border-[#22253a] rounded-xl px-8 py-6">
            <p className="text-3xl font-bold text-[#c8c4f0] mb-1">12</p>
            <p className="text-xs text-[#4a4860] flex items-center gap-1.5">
              <Folder size={13} /> Subjects
            </p>
          </div>
        </div>

      </div>
    </div>
    <Filecard/>
    </>
  );
}

export default Home;