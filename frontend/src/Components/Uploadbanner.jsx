import { Link } from 'react-router-dom';
import { Upload, BookOpen, Users, ArrowRight } from 'lucide-react';

function Uploadbanner() {
  return (
    <div className="bg-[#0f1117] px-6 pb-16">
      <div className="max-w-7xl mx-auto">

        <div
          className="rounded-2xl px-10 py-12 flex items-center
                     justify-between gap-10 border border-[#2a2d3a]"
          style={{
            background: 'linear-gradient(135deg, #1a1730 0%, #111827 60%, #1a1a2e 100%)',
          }}
        >
          <div className="flex-1">
            <span className="inline-block bg-[#1e1a3a] text-[#9f97e8]
                             text-xs px-4 py-1.5 rounded-full border
                             border-[#3a3560] mb-4">
              Contribute to the community
            </span>
            <h2 className="text-2xl font-bold text-[#e8e6f8] mb-3 leading-snug">
              Want to share your notes,<br />
              <span className="text-[#7f77dd]">books or PPTs?</span>
            </h2>
            <p className="text-sm text-[#7a7890] leading-relaxed mb-6 max-w-sm">
              Upload your study materials and help thousands of students
              in your community learn better.
            </p>
            <Link
              to="/upload"
              className="inline-flex items-center gap-2 bg-[#534AB7]
                         hover:bg-[#6358cc] text-white text-sm font-semibold
                         px-6 py-3 rounded-xl transition-colors duration-200"
            >
              <Upload size={15} />
              Upload now
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="hidden md:flex flex-col gap-4 flex-shrink-0 w-64">
            <div className="flex items-start gap-3 bg-[#16181f] border
                            border-[#22253a] rounded-xl px-4 py-3">
              <div className="w-8 h-8 rounded-lg bg-[#1e1a3a] flex
                              items-center justify-center flex-shrink-0 mt-0.5">
                <Upload size={14} className="text-[#7f77dd]" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#c8c4f0] mb-0.5">
                  Easy upload
                </p>
                <p className="text-xs text-[#4a4860] leading-relaxed">
                  PDF, DOCX, PPTX supported
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-[#16181f] border
                            border-[#22253a] rounded-xl px-4 py-3">
              <div className="w-8 h-8 rounded-lg bg-[#1a2a22] flex
                              items-center justify-center flex-shrink-0 mt-0.5">
                <Users size={14} className="text-[#1D9E75]" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#c8c4f0] mb-0.5">
                  Help others
                </p>
                <p className="text-xs text-[#4a4860] leading-relaxed">
                  Shared with all students
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-[#16181f] border
                            border-[#22253a] rounded-xl px-4 py-3">
              <div className="w-8 h-8 rounded-lg bg-[#0e1a2a] flex
                              items-center justify-center flex-shrink-0 mt-0.5">
                <BookOpen size={14} className="text-[#378ADD]" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#c8c4f0] mb-0.5">
                  Free forever
                </p>
                <p className="text-xs text-[#4a4860] leading-relaxed">
                  No cost to upload or download
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Uploadbanner;