import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Zap, ChevronRight } from 'lucide-react';
import { MOCK_NEWS } from '@/lib/data';

export default function MediaInsight({ onSeeAll }: { onSeeAll: () => void }) {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 mt-10 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-500" fill="currentColor" /> Media Insight
        </h2>
        <button onClick={onSeeAll} className="text-xs font-bold text-slate-400 hover:text-slate-800 uppercase tracking-widest transition-colors flex items-center gap-1">
          Lihat Semua <ChevronRight className="w-3 h-3" />
        </button>
      </div>
      <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-6 pb-4 md:pb-0 no-scrollbar snap-x">
        {MOCK_NEWS.slice(0, 3).map((news) => (
          <Link href={news.url} key={news.id} target="_blank" rel="noopener noreferrer" className="min-w-[280px] md:min-w-0 bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-[0_10px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 group flex flex-col snap-start">
            <div className="relative h-44 overflow-hidden bg-slate-100">
              <img src={news.image} alt={news.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute top-4 left-4"><span className="bg-white/90 backdrop-blur-sm text-slate-800 text-[9px] font-black uppercase px-2.5 py-1.5 rounded-lg shadow-sm">{news.tag}</span></div>
            </div>
            <div className="p-5 flex flex-col flex-1">
              <p className="text-[10px] font-bold text-yellow-600 mb-2 uppercase tracking-wider">{news.date}</p>
              <h3 className="font-bold text-slate-800 text-sm leading-snug mb-3 group-hover:text-blue-600 transition-colors line-clamp-3">{news.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
