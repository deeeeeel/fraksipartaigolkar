import React from 'react';
import { Award, Bell } from 'lucide-react';

interface HeroProps {
  greeting: string;
  currentTime: string;
}

export default function HeroSection({ greeting, currentTime }: HeroProps) {
  return (
    <div className="relative bg-slate-900 pt-8 pb-36 px-4 md:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[600px] h-[600px] bg-yellow-400/15 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[400px] h-[400px] bg-blue-500/15 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-14">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/20 border border-yellow-200/50">
              <Award className="text-slate-900 w-6 h-6" />
            </div>
            <div>
              <h1 className="text-white font-black text-2xl tracking-tight leading-none">F-PG</h1>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-0.5">DPR Republik Indonesia</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-6 bg-slate-800/50 backdrop-blur-md px-5 py-2.5 rounded-full border border-slate-700/50">
            <span className="text-slate-300 text-xs font-bold flex items-center gap-2 uppercase tracking-wider">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              Live Data
            </span>
            <div className="h-4 w-[1px] bg-slate-600"></div>
            <span className="text-slate-400 text-xs font-semibold">{currentTime}</span>
          </div>

          <button className="md:hidden text-white bg-slate-800 p-2.5 rounded-xl border border-slate-700">
            <Bell className="w-5 h-5" />
          </button>
        </div>

        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/60 border border-slate-700 backdrop-blur-md mb-6 shadow-sm">
            <span className="text-[11px] font-black text-yellow-400 tracking-widest uppercase">{greeting}, Rakyat Indonesia</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-6 leading-[1.1] tracking-tight">
            Kawal Aspirasi,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-600">Bangun Bangsa.</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-xl font-medium leading-relaxed mb-2">
            Portal informasi resmi dan analitik geospasial Fraksi Partai Golkar DPR RI Periode 2024-2029. Transparan, akuntabel, dan berbasis data.
          </p>
        </div>
      </div>
    </div>
  );
}
