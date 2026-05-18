import React from 'react'
import { BookOpen, Upload, Download, Users } from 'lucide-react'

const features = [
  { icon: Upload,   title: 'Share resources',   desc: 'Upload your notes, slides, and PDFs for others to access.' },
  { icon: Download, title: 'Download freely',   desc: 'Access study materials uploaded by students like you.' },
  { icon: Users,    title: 'Community driven',  desc: 'Built by students, for students across all subjects.' },
  { icon: BookOpen, title: 'All subjects',      desc: 'From Maths to Computer Science — everything in one place.' },
]

function About() {
  return (
    <div className="min-h-screen bg-[#0f1117]">
      <div className="max-w-3xl mx-auto px-6 py-20">

        <div className="text-center mb-16">
          <div className="w-14 h-14 bg-[#7c6fcd] rounded-2xl flex items-center 
                          justify-center mx-auto mb-6">
            <BookOpen size={26} color="#fff" />
          </div>
          <h1 className="text-[#d8d4f0] text-4xl font-medium mb-4">About StudyVault</h1>
          <p className="text-[#4a4860] text-base leading-relaxed max-w-xl mx-auto">
            StudyVault is a free platform where students can upload, share, and 
            download study resources — making quality education accessible to everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title}
              className="bg-[#16181f] border border-[#22253a] rounded-2xl p-6
                         hover:border-[#7c6fcd]/40 transition-colors duration-200">
              <div className="w-9 h-9 bg-[#7c6fcd]/15 rounded-lg flex items-center 
                              justify-center mb-4">
                <Icon size={18} className="text-[#7c6fcd]" />
              </div>
              <h3 className="text-[#d8d4f0] font-medium text-sm mb-2">{title}</h3>
              <p className="text-[#4a4860] text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#16181f] border border-[#22253a] rounded-2xl p-8 text-center">
          <h2 className="text-[#d8d4f0] text-xl font-medium mb-3">Our mission</h2>
          <p className="text-[#4a4860] text-sm leading-relaxed max-w-lg mx-auto">
            We believe every student deserves access to good study material regardless 
            of their college or background. StudyVault removes the barrier by letting 
            students help each other — for free, forever.
          </p>
        </div>

      </div>
    </div>
  )
}

export default About