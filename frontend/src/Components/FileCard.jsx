import React from 'react';
import api from '../Api/api.js';
import { useEffect } from 'react';
import { Download } from 'lucide-react';
function Filecard() {
    useEffect(()=>{
        const fetchFiles=async ()=>{
            try {
            const response=await api.get('/files');
            console.log(response);
        } catch (error) {
            console.log("error during fetching");
        }
    }
fetchFiles();
},[]);
  return (
    <div className='max-w-5xl bg-[#0d0449] flex items-center justify-center col-auto'>
        <div className="top">
            <rect x="10" y="72" width="100" height="100" rx="4" fill="#1e1a3a" stroke="#534AB7" strokeWidth="1.5"/>
              <rect x="16" y="80" width="60" height="3" rx="1" fill="#534AB7" opacity=".8"/>
              <rect x="16" y="87" width="60" height="2" rx="1" fill="#3a3560"/>
              <rect x="16" y="92" width="40" height="2" rx="1" fill="#3a3560" opacity=".7"/>
              <rect x="16" y="97" width="30" height="2" rx="1" fill="#3a3560" opacity=".5"/>
              <rect x="16" y="102" width="38" height="2" rx="1" fill="#3a3560" opacity=".4"/>
        </div>
        <div className="content">
            {
                fetchFiles.map((file)=>{
                    <><h2>{file.title}</h2>
                    <p>{file.subject}</p>
                    <div className="down">
                        <span>username</span>
                        <span><Download/></span>
                    </div>
                    </>
                })
            }
        </div>
    </div>
  )
}

export default Filecard;