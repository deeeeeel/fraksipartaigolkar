'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { 
  Search, MapPin, Users, Newspaper, Zap, BarChart3,
  Megaphone, MessageSquare, Calendar, Star, Clock, ArrowRight, ChevronRight, Activity
} from 'lucide-react';

import { 
  KOMISI_LIST, MOCK_NEWS, TICKER_NEWS, 
  VIP_ROSTER, AGENDA_ITEMS, MOCK_MEMBERS 
} from '@/lib/data';

import HeroSection from './HeroSection';
import QuickStats from './QuickStats';
import KabinetRoster from './KabinetRoster';
import MediaInsight from './MediaInsight';

// 1. DYNAMIC IMPORT PETA (Kunci agar Leaflet aman di Vercel)
const IndonesiaMap = dynamic(() => import('@/components/shared/IndonesiaMap'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-[450px] bg-slate-50 rounded-[1.5rem] flex flex-col items-center justify-center border-2 border-dashed border-slate-200 animate-pulse">
      <MapPin className="w-10 h-10 text-slate-300 mb-3" />
      <p className="text-slate-500 font-bold text-sm">Memuat Peta Interaktif...</p>
    </div>
  )
});

interface HomeViewProps {
  initialMembers?: any[];
  komisiList?: string[];
}

export const HomeView = ({ initialMembers, komisiList }: HomeViewProps = {}) => {
  const [search, setSearch] = useState('');
  const [activeKomisi, setActiveKomisi] = useState('Semua');
  const [activeTab, setActiveTab] = useState<'peta' | 'direktori' | 'berita'>('peta');
  const [currentTime, setCurrentTime] = useState<string>('');
  const [greeting, setGreeting] = useState('Selamat Datang');

  // Fallback data
  const members = initialMembers || MOCK_MEMBERS;
  const komisi = komisiList || ['Semua', ...KOMISI_LIST];

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }));
      const hour = now.getHours();
      if (hour < 11) setGreeting('Selamat Pagi'); 
      else if (hour < 15) setGreeting('Selamat Siang'); 
      else if (hour < 18) setGreeting('Selamat Sore'); 
      else setGreeting('Selamat Malam');
    };
    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  const filteredMembers = useMemo(() => {
    return members.filter((m: any) => {
      const matchName = m.name?.toLowerCase().includes(search.toLowerCase()); // Sesuaikan field jika aslinya 'nama'
      const matchDapil = m.dapil?.toLowerCase().includes(search.toLowerCase());
      const matchKomisi = activeKomisi === 'Semua' || m.komisi?.includes(activeKomisi);
      return (matchName || matchDapil) && matchKomisi;
    });
  }, [search, activeKomisi, members]);

  const komisiDistribution = useMemo(() => {
    const counts: Record<string, number> = {};
    members.forEach((m: any) => {
      const k = m.komisi || 'Lainnya';
      counts[k] = (counts[k] || 0) + 1;
    });
    const sorted = Object.entries(counts).filter(([k]) => k !== 'Lainnya' && k !== 'Semua').sort((a, b) => b[1] - a[1]).slice(0, 5);
    const totalTop = sorted.reduce((sum, [, count]) => sum + count, 0);
    return sorted.map(([name, count]) => ({ name, count, percentage: Math.round((count / (totalTop || 1)) * 100) }));
  }, [members]);

  const barColors = ['bg-yellow-400', 'bg-blue-500', 'bg-emerald-500', 'bg-rose-500', 'bg-purple-500'];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 md:pb-0 font-sans selection:bg-yellow-200 overflow-x-hidden">
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes ticker { 0% { transform: translateX(100vw); } 100% { transform: translateX(-100%); } }
        .animate-ticker { animation: ticker 35s linear infinite; white-space: nowrap; }
        .animate-ticker:hover { animation-play-state: paused; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}} />

      <HeroSection greeting={greeting} currentTime={currentTime} />
      <QuickStats />

      {/* TICKER */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-6">
        <div className="bg-white rounded-2xl p-3 shadow-sm border border-slate-100 flex items-center overflow-hidden">
          <div className="bg-yellow-400 text-slate-900 font-black text-[10px] uppercase tracking-widest px-4 py-2 rounded-xl shrink-0 z-10 shadow-sm flex items-center gap-2">
            <Megaphone className="w-4 h-4" /> Info Update
          </div>
          <div className="flex-1 overflow-hidden ml-4 relative h-6 flex items-center">
            <div className="animate-ticker absolute text-sm font-semibold text-slate-600 flex gap-12 cursor-pointer hover:text-slate-900 transition-colors">
              {TICKER_NEWS.map((news, i) => (
                <span key={i} className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>{news}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <KabinetRoster />
      <MediaInsight onSeeAll={() => setActiveTab('berita')} />

      {/* BANNER ASPIRASI */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-8">
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between border border-slate-700 shadow-xl overflow-hidden relative group cursor-pointer">
           <div className="absolute right-0 top-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl"></div>
           <div className="relative z-10 flex items-center gap-6 mb-6 md:mb-0">
             <div className="w-14 h-14 bg-slate-800 border border-slate-600 rounded-2xl flex items-center justify-center shadow-inner shrink-0">
               <MessageSquare className="w-7 h-7 text-yellow-400" />
             </div>
             <div>
               <h3 className="text-xl md:text-2xl font-black text-white mb-1 tracking-tight">Punya Aspirasi untuk Daerah Anda?</h3>
               <p className="text-slate-400 text-sm font-medium">Sampaikan keluhan, masukan, atau ide langsung ke perwakilan Fraksi Partai Golkar.</p>
             </div>
           </div>
           <button className="relative z-10 w-full md:w-auto bg-yellow-400 hover:bg-yellow-300 text-slate-900 px-8 py-3.5 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(250,204,21,0.3)] flex items-center justify-center gap-2">
             Tulis Aspirasi Sekarang <ArrowRight className="w-4 h-4" />
           </button>
        </div>
      </div>

      {/* MAIN DASHBOARD CONTENT (TABS) */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-10 mb-12">
        <div className="sticky top-4 z-40 flex bg-white/80 p-1.5 rounded-2xl mb-8 w-full md:w-fit backdrop-blur-xl border border-slate-200 shadow-sm mx-auto md:mx-0 transition-all">
          <button onClick={() => setActiveTab('peta')} className={`flex-1 md:flex-none px-5 md:px-6 py-3 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 ${activeTab === 'peta' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}><MapPin className="w-4 h-4" /> Peta</button>
          <button onClick={() => setActiveTab('direktori')} className={`flex-1 md:flex-none px-5 md:px-6 py-3 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 ${activeTab === 'direktori' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}><Users className="w-4 h-4" /> Anggota DPR</button>
          <button onClick={() => setActiveTab('berita')} className={`hidden md:flex flex-1 md:flex-none px-5 md:px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 items-center justify-center gap-2 ${activeTab === 'berita' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}><Newspaper className="w-4 h-4" /> Update Fraksi</button>
        </div>

        {/* TAB 1: PETA */}
        {activeTab === 'peta' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="bg-white p-2 md:p-6 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
               <IndonesiaMap members={members} />
             </div>
          </div>
        )}

        {/* TAB 2: DIREKTORI */}
        {activeTab === 'direktori' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-10">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" fill="currentColor" /> Pimpinan Fraksi DPR RI
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {VIP_ROSTER.map((vip, i) => (
                  <div key={i} className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 border border-slate-700 shadow-xl relative overflow-hidden group">
                    <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-yellow-500/20 rounded-full blur-2xl"></div>
                    <div className="flex items-center gap-5 relative z-10">
                      <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-slate-600 bg-slate-700">
                         <Image src={vip.img} alt={vip.name} fill className="object-cover" sizes="80px" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-yellow-400 uppercase tracking-widest mb-1">{vip.role}</p>
                        <h4 className="text-white font-bold text-xl mb-1">{vip.name}</h4>
                        <div className="flex items-center text-slate-400 text-xs gap-1"><MapPin className="w-3 h-3" /> {vip.dapil}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2"><Activity className="w-4 h-4 text-slate-400" /> Distribusi Anggota (Top 5 Komisi)</h3>
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex mb-4">
                {komisiDistribution.map((kd, i) => (
                  <div key={i} style={{ width: `${kd.percentage}%` }} className={`h-full ${barColors[i]} border-r border-white/20 relative group cursor-help`}>
                     <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded font-bold whitespace-nowrap transition-opacity z-10">{kd.name} ({kd.count})</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-4 mt-2">
                {komisiDistribution.map((kd, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-600"><span className={`w-2.5 h-2.5 rounded-sm ${barColors[i]}`}></span>{kd.name} <span className="text-slate-400">({kd.percentage}%)</span></div>
                ))}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white p-2 rounded-3xl border border-slate-200 shadow-sm">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none"><Search className="h-5 w-5 text-slate-400" /></div>
                <input type="text" placeholder="Cari nama anggota atau dapil..." className="w-full pl-12 pr-4 py-4 bg-transparent rounded-2xl text-sm font-semibold text-slate-800 focus:outline-none" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 px-2 md:px-0 no-scrollbar">
                {komisi.slice(0, 5).map((k: string) => (
                  <button key={k} onClick={() => setActiveKomisi(k)} className={`px-5 py-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${activeKomisi === k ? 'bg-yellow-400 text-slate-900 border-yellow-400 shadow-sm' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}`}>{k === 'Semua' ? 'Semua' : k}</button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMembers.map((member: any, idx: number) => (
                <div key={idx} className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_15px_35px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300 group cursor-pointer">
                  <div className="h-56 bg-slate-100 relative overflow-hidden flex items-end justify-center">
                     <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-400 to-slate-200"></div>
                     <img src={"/api/placeholder/400/320"} alt={member.name || member.nama} className="object-cover object-bottom h-[95%] w-auto group-hover:scale-105 transition-transform duration-500 relative z-10" />
                     <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent z-20"></div>
                     <div className="absolute bottom-4 left-5 right-5 z-30 flex justify-between items-end">
                       <span className="text-[10px] font-black px-2.5 py-1 bg-yellow-400 text-slate-900 rounded-md uppercase tracking-wider shadow-sm border border-yellow-300">{member.komisi || 'Fraksi'}</span>
                     </div>
                  </div>
                  <div className="p-6 relative">
                    <div className="absolute -top-6 right-5 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border border-slate-50 text-slate-300 group-hover:text-yellow-600 transition-all duration-300 z-30"><ChevronRight className="w-5 h-5" /></div>
                    <h3 className="font-black text-slate-800 text-lg leading-tight mb-2 group-hover:text-yellow-600 transition-colors line-clamp-1 pr-6">{member.name || member.nama}</h3>
                    <div className="flex items-center text-slate-500 text-xs font-semibold gap-1.5 mb-5"><MapPin className="w-4 h-4 text-slate-400" /><span className="truncate">{member.dapil}</span></div>
                    <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                      <div><p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-0.5">Suara Sah 2024</p><p className="font-black text-slate-800 text-base">{(member.perolehan_suara || 0).toLocaleString('id-ID')}</p></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: BERITA */}
        {activeTab === 'berita' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                 {MOCK_NEWS.map((news: any, index: number) => (
                  <Link href={news.url} target="_blank" rel="noopener noreferrer" key={news.id} className={`bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-[0_15px_35px_rgb(0,0,0,0.06)] hover:-translate-y-1.5 transition-all duration-300 group flex flex-col ${index === 0 ? 'md:col-span-2' : ''} h-full`}>
                    <div className={`relative overflow-hidden bg-slate-100 ${index === 0 ? 'h-64' : 'h-52'}`}>
                      <Image src={news.image} alt={news.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 66vw" />
                      <div className="absolute top-5 left-5"><span className="bg-yellow-400 text-slate-900 text-[10px] font-black uppercase px-3 py-1.5 rounded-lg shadow-md border border-yellow-300 tracking-wider">{news.tag}</span></div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3"><span className="w-2 h-2 rounded-full bg-slate-300"></span><p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{news.date}</p></div>
                      <h3 className={`font-black text-slate-800 leading-snug mb-4 group-hover:text-yellow-600 transition-colors ${index === 0 ? 'text-2xl' : 'text-lg line-clamp-3'}`}>{news.title}</h3>
                      <div className="mt-auto pt-4 flex items-center text-slate-500 text-xs font-bold uppercase tracking-wider group-hover:text-yellow-600 transition-colors">Baca Selengkapnya <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" /></div>
                    </div>
                  </Link>
                 ))}
               </div>
               <div className="lg:col-span-1">
                  <div className="bg-white rounded-[2rem] p-6 md:p-8 border border-slate-100 shadow-sm sticky top-28">
                    <div className="flex items-center justify-between mb-8"><h3 className="font-black text-xl text-slate-800 tracking-tight">Agenda Parlemen</h3><div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center"><Calendar className="w-5 h-5 text-slate-400" /></div></div>
                    <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2.5 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-slate-200 before:to-transparent">
                       {AGENDA_ITEMS.map((agenda) => (
                         <div key={agenda.id} className="relative flex items-start gap-4">
                           <div className={`relative z-10 w-5 h-5 rounded-full border-4 border-white ${agenda.color} shrink-0 mt-1`}></div>
                           <div className="flex-1 bg-slate-50 rounded-2xl p-4 border border-slate-100 hover:bg-white hover:shadow-md transition-all group cursor-pointer">
                              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block">{agenda.type}</span>
                              <h4 className="text-sm font-bold text-slate-700 leading-snug group-hover:text-yellow-600 transition-colors mb-2">{agenda.title}</h4>
                              <div className="flex items-center gap-3 text-[10px] font-semibold text-slate-400">
                                <span className="flex items-center gap-1"><Calendar size={12}/> {agenda.date}</span>
                                <span className="flex items-center gap-1"><Clock size={12}/> {agenda.time}</span>
                              </div>
                           </div>
                         </div>
                       ))}
                    </div>
                  </div>
               </div>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER BANYAN MEDIA */}
      <footer className="max-w-7xl mx-auto px-4 md:px-8 mt-12 mb-28 md:mb-12">
        <div className="py-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-lg flex items-center justify-center shadow-sm border border-yellow-200">
              <span className="text-xs font-black text-slate-900">BM</span>
            </div>
            <span className="text-sm font-black text-slate-800 tracking-tight">Banyan Media</span>
          </div>
          <p className="text-xs font-bold text-slate-400 text-center md:text-right">
            &copy; {new Date().getFullYear()} Banyan Media. All rights reserved. <br className="md:hidden" />
            <span className="hidden md:inline"> | </span> Dashboard Fraksi Partai Golkar.
          </p>
        </div>
      </footer>

      {/* MOBILE BOTTOM NAVIGATION */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[340px] z-[100]">
        <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-700 shadow-2xl rounded-[2rem] p-2 flex items-center justify-between relative">
            <button onClick={() => setActiveTab('peta')} className={`flex-1 flex flex-col items-center justify-center py-2 transition-colors ${activeTab === 'peta' ? 'text-yellow-400' : 'text-slate-400'}`}><MapPin className="w-5 h-5 mb-1.5" /><span className="text-[9px] font-bold uppercase">Peta</span></button>
            <button onClick={() => setActiveTab('direktori')} className={`flex-1 flex flex-col items-center justify-center py-2 transition-colors ${activeTab === 'direktori' ? 'text-yellow-400' : 'text-slate-400'}`}><Users className="w-5 h-5 mb-1.5" /><span className="text-[9px] font-bold uppercase tracking-wider">Anggota</span></button>
            <div className="relative -top-8 px-2"><div className="w-14 h-14 bg-gradient-to-b from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center shadow-lg border-[5px] border-[#F8FAFC]" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><Zap className="w-6 h-6 text-slate-900" fill="currentColor" /></div></div>
            <button onClick={() => setActiveTab('berita')} className={`flex-1 flex flex-col items-center justify-center py-2 transition-colors ${activeTab === 'berita' ? 'text-yellow-400' : 'text-slate-400'}`}><Newspaper className="w-5 h-5 mb-1.5" /><span className="text-[9px] font-bold uppercase tracking-wider">Berita</span></button>
            <button onClick={() => {}} className="flex-1 flex flex-col items-center justify-center py-2 text-slate-400"><BarChart3 className="w-5 h-5 mb-1.5" /><span className="text-[9px] font-bold uppercase tracking-wider">Data</span></button>
        </div>
      </div>

    </div>
  );
};
