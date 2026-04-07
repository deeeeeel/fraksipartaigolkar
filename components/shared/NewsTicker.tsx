import React from 'react';

export const NewsTicker = () => (
  <div className="bg-slate-900 text-white py-2 overflow-hidden whitespace-nowrap flex items-center border-b border-white/10">
    <div className="flex animate-marquee items-center gap-8">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
          <span className="text-[10px] font-black uppercase tracking-widest">Update: Fraksi Golkar kawal RUU ITE terbaru di Komisi I</span>
          <span className="text-slate-500 mx-4">|</span>
          <span className="text-[10px] font-black uppercase tracking-widest text-yellow-400">Dapil Jatim 3: Penyaluran Alsintan ke 50 Kelompok Tani</span>
        </div>
      ))}
    </div>
  </div>
);
