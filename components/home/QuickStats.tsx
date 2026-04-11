import React from 'react';
import { Users, Activity, MapPin, Award, TrendingUp, ArrowUpRight, Smile, Meh, Frown, Info } from 'lucide-react';
import { SENTIMENT_DATA } from '@/lib/data';

export default function QuickStats() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-24 relative z-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* STATS */}
        <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div className="bg-white p-5 md:p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between group hover:-translate-y-1.5 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-yellow-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-4xl font-black text-slate-800 tracking-tight">102</p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1 mb-3">Kursi Parlemen</p>
              <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 w-fit px-2.5 py-1 rounded-md">
                <ArrowUpRight className="w-3 h-3" /> +17 dari 2019
              </div>
            </div>
          </div>
          <div className="bg-white p-5 md:p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between group hover:-translate-y-1.5 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-4xl font-black text-slate-800 tracking-tight">23.2<span className="text-xl text-slate-500 ml-1">Jt</span></p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1 mb-3">Suara Sah</p>
              <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 w-fit px-2.5 py-1 rounded-md">
                <ArrowUpRight className="w-3 h-3" /> Naik 5.98 Jt
              </div>
            </div>
          </div>
          <div className="bg-white p-5 md:p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between group hover:-translate-y-1.5 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <MapPin className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-4xl font-black text-slate-800 tracking-tight">84</p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1 mb-3">Dapil RI</p>
              <div className="flex items-center gap-1 text-[10px] font-bold text-slate-600 bg-slate-100 w-fit px-2.5 py-1 rounded-md">Cakupan Nasional</div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 p-5 md:p-6 rounded-3xl shadow-xl shadow-yellow-500/25 flex flex-col justify-between text-slate-900 group hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden">
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform backdrop-blur-sm border border-white/20 relative z-10">
              <Award className="w-6 h-6 text-slate-900" />
            </div>
            <div className="relative z-10">
              <p className="text-4xl font-black tracking-tight text-slate-900">#2</p>
              <p className="text-xs font-bold text-slate-800 uppercase tracking-wider mt-1 mb-3">Peringkat</p>
              <div className="flex items-center gap-1 text-[10px] font-bold text-slate-900 bg-white/30 backdrop-blur-sm w-fit px-2.5 py-1 rounded-md border border-white/20">
                <ArrowUpRight className="w-3 h-3" /> Naik 1 Level
              </div>
            </div>
          </div>
        </div>

        {/* SENTIMENT */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col group hover:-translate-y-1.5 transition-all duration-300">
          <div className="flex items-center justify-between mb-5">
             <div className="flex items-center gap-2">
               <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center"><TrendingUp className="w-5 h-5 text-indigo-600" /></div>
               <h3 className="font-black text-slate-800 text-sm uppercase tracking-wider">Sentimen Publik</h3>
             </div>
             <div className="flex items-center gap-1 text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
               {SENTIMENT_DATA.trend} <ArrowUpRight className="w-3 h-3" />
             </div>
          </div>
          <div className="space-y-4 flex-1 justify-center flex flex-col">
             <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] font-bold uppercase tracking-tight"><span className="flex items-center gap-1.5 text-emerald-600"><Smile className="w-3.5 h-3.5" /> Positif</span><span className="text-slate-800">{SENTIMENT_DATA.positive}%</span></div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden"><div style={{ width: `${SENTIMENT_DATA.positive}%` }} className="h-full bg-emerald-500 rounded-full"></div></div>
             </div>
             <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] font-bold uppercase tracking-tight"><span className="flex items-center gap-1.5 text-yellow-600"><Meh className="w-3.5 h-3.5" /> Netral</span><span className="text-slate-800">{SENTIMENT_DATA.neutral}%</span></div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden"><div style={{ width: `${SENTIMENT_DATA.neutral}%` }} className="h-full bg-yellow-400 rounded-full"></div></div>
             </div>
             <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] font-bold uppercase tracking-tight"><span className="flex items-center gap-1.5 text-rose-600"><Frown className="w-3.5 h-3.5" /> Negatif</span><span className="text-slate-800">{SENTIMENT_DATA.negative}%</span></div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden"><div style={{ width: `${SENTIMENT_DATA.negative}%` }} className="h-full bg-rose-500 rounded-full"></div></div>
             </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase tracking-widest">
             <span>Total Mentions: {SENTIMENT_DATA.totalMentions}</span><Info className="w-3 h-3 cursor-help" />
          </div>
        </div>
      </div>
    </div>
  );
}