import React from 'react';
import { Briefcase, AtSign } from 'lucide-react';
import { KABINET_ROSTER } from '@/lib/data';

// Custom Social Icons SVG (Digunakan agar aman dari perubahan versi library)
const IconX = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
const IconFacebook = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
const IconInstagram = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>;
const IconYoutube = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 7.1C2.6 5.8 3.6 4.8 5 4.7 7.4 4.5 12 4.5 12 4.5s4.6 0 7 .2c1.4.1 2.4 1.1 2.5 2.4.2 1.6.2 4.9.2 4.9s0 3.3-.2 4.9c-.1 1.3-1.1 2.3-2.5 2.4-2.4.2-7 .2-7 .2s-4.6 0-7-.2c-1.4-.1-2.4-1.1-2.5-2.4-.2-1.6-.2-4.9-.2-4.9s0-3.3.2-4.9z"/><path d="M10 15l5-3-5-3v6z"/></svg>;

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
          <div key={i} className="min-w-[200px] md:min-w-[250px] bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-5 border border-slate-700 shadow-xl relative overflow-hidden group snap-start hover:-translate-y-1 transition-all duration-300">
             <div className="absolute -right-6 -top-6 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl group-hover:bg-yellow-500/20 transition-colors duration-500 pointer-events-none"></div>
             <div className="relative z-10 flex flex-col items-center text-center">
               <div className="relative w-16 h-16 md:w-20 md:h-20 mb-4 rounded-full overflow-hidden border-2 border-slate-600 group-hover:scale-105 transition-transform duration-300 bg-slate-700 shadow-inner">
                  {/* Gunakan img standar utk bypass error Next Image di sumber URL luar */}
                  <img src={kabinet.img} alt={kabinet.name} className="w-full h-full object-cover" />
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
               
               {/* Icon Social Media */}
               <div className="flex items-center gap-3 mt-4 opacity-75 group-hover:opacity-100 transition-opacity">
                  {kabinet.socials?.x && <a href={kabinet.socials.x} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="X / Twitter"><IconX /></a>}
                  {kabinet.socials?.ig && <a href={kabinet.socials.ig} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-pink-400 transition-colors" aria-label="Instagram"><IconInstagram /></a>}
                  {kabinet.socials?.fb && <a href={kabinet.socials.fb} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-500 transition-colors" aria-label="Facebook"><IconFacebook /></a>}
                  {kabinet.socials?.yt && <a href={kabinet.socials.yt} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-red-500 transition-colors" aria-label="YouTube"><IconYoutube /></a>}
                  {kabinet.socials?.threads && <a href={kabinet.socials.threads} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="Threads"><AtSign size={14} /></a>}
               </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}