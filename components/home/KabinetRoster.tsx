import React from 'react';
import Image from 'next/image';
import { Briefcase } from 'lucide-react';
import { KABINET_ROSTER } from '@/lib/data';

export default function KabinetRoster() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-yellow-500" fill="currentColor" /> Kader Partai di Kabinet
        </h2>
      </div>
      <div className="flex overflow-x-auto gap-4 md:gap-5 pb-4 no-scrollbar snap-x">
        {KABINET_ROSTER.map((kabinet, i) => (
          <div key={i} className="min-w-[200px] md:min-w-[240px] bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-5 border border-slate-700 shadow-xl relative overflow-hidden group snap-start cursor-pointer hover:-translate-y-1 transition-all duration-300">
             <div className="absolute -right-6 -top-6 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl group-hover:bg-yellow-500/20 transition-colors duration-500"></div>
             <div className="relative z-10 flex flex-col items-center text-center">
               <div className="relative w-16 h-16 md:w-20 md:h-20 mb-4 rounded-full overflow-hidden border-2 border-slate-600 group-hover:scale-105 transition-transform duration-300 bg-slate-700">
                  <Image src={kabinet.img} alt={kabinet.name} fill className="object-cover" sizes="(max-width: 768px) 64px, 80px" />
               </div>
               <span className={`text-[8px] md:text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded border mb-2 ${
                  kabinet.type === 'Menteri' ? 'bg-yellow-400 text-slate-900 border-yellow-300' :
                  kabinet.type === 'Wakil Menteri' ? 'bg-slate-700 text-yellow-400 border-slate-600' :
                  'bg-slate-200 text-slate-800 border-slate-300'
               }`}>
                 {kabinet.type}
               </span>
               <p className="text-[10px] md:text-[11px] font-semibold text-slate-300 leading-snug min-h-[32px] line-clamp-2 mb-1">{kabinet.role}</p>
               <h3 className="font-bold text-white text-sm md:text-base leading-tight group-hover:text-yellow-400 transition-colors">{kabinet.name}</h3>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}