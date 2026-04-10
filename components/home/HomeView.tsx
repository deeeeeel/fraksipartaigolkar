'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Search, MapPin, Users, Newspaper, Zap, Bell, 
  TrendingUp, Filter, ChevronRight, Award, Menu,
  Activity, AlertCircle
} from 'lucide-react';
import { MOCK_MEMBERS, KOMISI_LIST } from '@/lib/data';
import IndonesiaMap from '@/components/shared/IndonesiaMap';
import ElectionTrend from '@/components/home/ElectionTrend';

import MOCK_NEWS from '@/lib/news.json';

interface HomeViewProps {
  initialMembers?: any;
  komisiList?: any;
}

export const HomeView = ({ initialMembers: propsMembers, komisiList: propsKomisi }: HomeViewProps = {}) => {
  const router = useRouter();
  
  // States
  const [search, setSearch] = useState('');
  const [activeKomisi, setActiveKomisi] = useState('Semua');
  const [count, setCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const [activeTab, setActiveTab] = useState('home');
  const [currentTime, setCurrentTime] = useState<string>('');
  
  const scrollToSection = (id: string) => {
    setActiveTab(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const initialMembers = useMemo(() => MOCK_MEMBERS, []);

  // Clock
  useEffect(() => {
    setCurrentTime(new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' WIB');
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' WIB');
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  
  // Odometer Effect & Live Auto-Increment
  useEffect(() => {
    let start = 0;
    const end = 12450;
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    // Fake live data stream after initial counter
    const liveTick = setInterval(() => {
      if (Math.random() > 0.6) {
        setCount(prev => prev + Math.floor(Math.random() * 3) + 1);
      }
    }, 3500);

    return () => {
      clearInterval(timer);
      clearInterval(liveTick);
    };
  }, []);

  // Scroll Header Effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const komisiList = ['Semua', ...KOMISI_LIST];

  // Smart Filtering
  const filteredMembers = useMemo(() => {
    return initialMembers.filter(member => {
      const matchSearch = member.name.toLowerCase().includes(search.toLowerCase()) || 
                          member.dapil.toLowerCase().includes(search.toLowerCase());
      const matchKomisi = activeKomisi === 'Semua' || member.komisi === activeKomisi;
      return matchSearch && matchKomisi;
    });
  }, [search, activeKomisi, initialMembers]);

  // Reset pagination when search/filter changes
  useEffect(() => {
    setVisibleCount(6);
  }, [search, activeKomisi]);

  return (
    <div className="min-h-screen bg-slate-50 pb-32 lg:pb-12 relative font-sans overflow-x-hidden selection:bg-yellow-200">
      
      {/* Ambient Glassmorphism Orbs */}
      <div className="fixed top-0 left-0 w-[50vw] h-[50vw] bg-yellow-400/10 rounded-full blur-[100px] pointer-events-none animate-pulse duration-[10s] -translate-x-1/4 -translate-y-1/4 z-0"></div>
      <div className="fixed bottom-0 right-0 w-[60vw] h-[60vw] bg-emerald-400/5 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[15s] translate-x-1/3 translate-y-1/3 z-0"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Dynamic Header */}
        <header className={`sticky top-0 z-[100] px-6 py-5 transition-all duration-500 ${isScrolled ? 'bg-white/80 backdrop-blur-2xl shadow-lg border-b border-neutral-100' : 'bg-transparent'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => scrollToSection('home')}>
              <div className="w-10 h-10 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-[0_4px_20px_rgba(250,204,21,0.4)] group-active:scale-95 transition-all duration-300 border border-yellow-300">
                <Zap size={20} fill="white" className="text-white drop-shadow-md" />
              </div>
              <div>
                <h1 className="text-xs font-black uppercase tracking-widest text-neutral-900 leading-none group-hover:text-yellow-600 transition-colors">Dashboard 102</h1>
                <div className="flex items-center gap-1.5 mt-1">
                   <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_5px_rgba(16,185,129,0.8)]"></div>
                   <p className="text-[8px] font-bold text-neutral-500 uppercase tracking-widest">{currentTime || 'CONNECTING...'}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="hidden lg:flex items-center gap-8 mr-6">
                <button onClick={() => scrollToSection('anggota')} className={`text-[10px] font-black uppercase transition-colors ${activeTab === 'anggota' ? 'text-yellow-600' : 'text-neutral-500 hover:text-neutral-900'}`}>Anggota</button>
                <button onClick={() => scrollToSection('berita')} className={`text-[10px] font-black uppercase transition-colors ${activeTab === 'berita' ? 'text-yellow-600' : 'text-neutral-500 hover:text-neutral-900'}`}>Berita</button>
                <button onClick={() => scrollToSection('dapil')} className={`text-[10px] font-black uppercase transition-colors ${activeTab === 'dapil' ? 'text-yellow-600' : 'text-neutral-500 hover:text-neutral-900'}`}>Dapil</button>
                <button onClick={() => scrollToSection('analisis')} className={`text-[10px] font-black uppercase transition-colors ${activeTab === 'analisis' ? 'text-yellow-600' : 'text-neutral-500 hover:text-neutral-900'}`}>Analisis</button>
              </div>
              <button className="p-2.5 bg-white rounded-xl border border-neutral-100 text-neutral-400 shadow-sm hover:shadow-md transition-all"><Bell size={18} /></button>
              <button className="p-2.5 bg-neutral-900 rounded-xl text-white shadow-lg lg:hidden active:scale-95 transition-transform"><Menu size={18} /></button>
            </div>
          </div>
        </header>

        {/* Tech Command Center News Ticker */}
        <div className="px-6 mt-2 relative z-10 w-full overflow-hidden">
           <style dangerouslySetInnerHTML={{__html: `
            @keyframes marquee {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
            }
            .animate-marquee {
              display: flex;
              width: max-content;
              animation: marquee 30s linear infinite;
            }
            .animate-marquee:hover {
              animation-play-state: paused;
            }
          `}} />
          <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl py-2.5 lg:py-3 overflow-hidden flex shadow-[0_10px_30px_rgba(15,23,42,0.15)] relative cursor-default">
            
            {/* Live Indicator Overlay */}
            <div className="absolute inset-y-0 left-0 bg-slate-900 z-20 flex items-center px-4 lg:px-6 border-r border-slate-700/50 shadow-[10px_0_20px_rgba(15,23,42,0.95)]">
                <div className="flex items-center gap-2 lg:gap-2.5">
                   <div className="w-2 h-2 rounded-full bg-red-500 animate-[pulse_1.5s_infinite] shadow-[0_0_8px_rgba(239,68,68,0.9)]"></div>
                   <span className="text-[9px] lg:text-[10px] font-black text-white tracking-[0.2em] uppercase">LIVE</span>
                </div>
            </div>

            {/* Gradient Masks */}
            <div className="absolute inset-y-0 left-[70px] lg:left-[100px] w-8 lg:w-16 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-8 lg:w-16 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none"></div>

            <div className="animate-marquee flex items-center gap-10 text-[9px] lg:text-[10px] font-bold uppercase tracking-[0.1em] pl-[80px] lg:pl-[120px] pr-8 text-slate-300">
               {/* Set 1 */}
               <span className="flex items-center gap-2 hover:text-white transition-colors"><div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div> <strong className="text-white font-black">ASPIRASI:</strong> 320 Masukan baru dari Jabar hari ini</span>
               <span className="flex items-center gap-2 hover:text-white transition-colors"><div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div> <strong className="text-white font-black">SENTIMEN:</strong> RUU Penyiaran di angka Netral (45%)</span>
               <span className="flex items-center gap-2 hover:text-white transition-colors"><div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div> <strong className="text-white font-black">HOT ISU:</strong> Digitalisasi Pertanian jadi Trending #1</span>
               <span className="flex items-center gap-2 hover:text-white transition-colors"><div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div> <strong className="text-white font-black">KINERJA:</strong> Kepuasan layanan Dapil 102 naik 4.2%</span>
               {/* Set 2 (Duplicate for loop) */}
               <span className="flex items-center gap-2 hover:text-white transition-colors"><div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div> <strong className="text-white font-black">ASPIRASI:</strong> 320 Masukan baru dari Jabar hari ini</span>
               <span className="flex items-center gap-2 hover:text-white transition-colors"><div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div> <strong className="text-white font-black">SENTIMEN:</strong> RUU Penyiaran di angka Netral (45%)</span>
               <span className="flex items-center gap-2 hover:text-white transition-colors"><div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div> <strong className="text-white font-black">HOT ISU:</strong> Digitalisasi Pertanian jadi Trending #1</span>
               <span className="flex items-center gap-2 hover:text-white transition-colors"><div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div> <strong className="text-white font-black">KINERJA:</strong> Kepuasan layanan Dapil 102 naik 4.2%</span>
            </div>
          </div>
        </div>

        {/* --- DYNAMIC SPA BODY --- */}
        <div className="min-h-[50vh] pb-10">
          
          {/* TAB: ANALISIS & HOME PREVIEW */}
          {(activeTab === 'home' || activeTab === 'analisis') && (
            <section className="px-6 mt-4 grid grid-cols-12 gap-4 lg:gap-6">
              
              {/* Main Card */}
              <div className="col-span-12 lg:col-span-5 bg-neutral-900 border border-neutral-800 hover:border-yellow-500/30 rounded-[2.5rem] p-8 lg:p-10 text-white relative overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.15)] flex flex-col justify-center transition-colors duration-500 group animate-in fade-in slide-in-from-bottom-8 duration-700" style={{ animationFillMode: 'both' }}>
                <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-400/10 rounded-full blur-[80px] -mr-16 -mt-16 group-hover:bg-yellow-400/20 transition-colors duration-500"></div>
                <div className="relative z-10">
                  <h2 className="text-2xl lg:text-3xl font-black leading-tight mb-4 lg:mb-8 tracking-tight">Dashboard Kinerja <br/><span className="text-yellow-400">Legislator Fraksi.</span></h2>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl lg:text-5xl font-black tracking-tighter text-yellow-400 drop-shadow-md">{count.toLocaleString()}</span>
                    <span className="text-[9px] lg:text-[10px] font-bold text-neutral-500 uppercase mb-1.5 lg:mb-2 tracking-widest border border-neutral-800 px-2 py-1 rounded-md bg-neutral-900/50 backdrop-blur-sm">Aspirasi Masuk</span>
                  </div>
                </div>
              </div>

              {/* Trending Isu */}
              <div className="col-span-12 lg:col-span-3 bg-gradient-to-br from-emerald-900 to-emerald-950 border border-emerald-800 rounded-[2rem] p-6 lg:p-8 text-white shadow-lg relative overflow-hidden group flex flex-col justify-end min-h-[160px] hover:shadow-emerald-900/50 hover:-translate-y-1 transition-all duration-300 animate-in fade-in slide-in-from-bottom-8 duration-700" style={{ animationDelay: '150ms', animationFillMode: 'both' }}>
                <div className="absolute right-[-10px] top-[-10px] opacity-20 group-hover:scale-110 transition-transform duration-500"><TrendingUp size={80} /></div>
                
                {/* Sparkline Graphic */}
                <div className="absolute inset-x-0 bottom-0 opacity-40 group-hover:opacity-80 transition-opacity duration-500 flex items-end">
                  <svg viewBox="0 0 100 40" className="w-full h-20" preserveAspectRatio="none">
                    <path d="M0 40 L10 30 L20 35 L30 20 L40 25 L50 10 L60 15 L70 5 L80 10 L90 0 L100 0 L100 40 Z" fill="url(#sparkline-gradient)" />
                    <path d="M0 40 L10 30 L20 35 L30 20 L40 25 L50 10 L60 15 L70 5 L80 10 L90 0" fill="none" stroke="#fbbf24" strokeWidth="1.5" />
                    <defs>
                      <linearGradient id="sparkline-gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                <div className="relative z-10">
                  <p className="text-[9px] lg:text-[10px] font-black uppercase text-emerald-300 mb-1">Trending Isu</p>
                  <p className="text-sm lg:text-lg font-black leading-tight text-white group-hover:text-yellow-300 transition-colors">Digitalisasi Pertanian</p>
                </div>
              </div>
              
              {/* AI Sentiment Insight */}
              <div className="col-span-12 lg:col-span-4 bg-white/60 backdrop-blur-2xl border border-white/60 rounded-[2.5rem] p-6 lg:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-xl hover:border-yellow-200/50 transition-all hover:-translate-y-1 duration-300 group flex flex-col justify-center animate-in fade-in slide-in-from-bottom-8 duration-700" style={{ animationDelay: '300ms', animationFillMode: 'both' }}>
                <div className="flex items-center justify-between mb-5 lg:mb-6">
                   <div className="flex items-center gap-2">
                     <Activity size={20} className="text-neutral-400 group-hover:text-yellow-500 transition-colors" />
                     <p className="text-[10px] lg:text-[11px] font-black uppercase text-neutral-400 tracking-widest">Sentimen Nasional</p>
                   </div>
                   <div className="px-2.5 py-1 bg-green-50 rounded-lg text-[9px] font-black text-green-600 uppercase border border-green-100 flex items-center gap-1"><TrendingUp size={10}/> +2.4%</div>
                </div>
                
                <div className="space-y-4 lg:space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="w-8 text-[9px] lg:text-[10px] font-black text-neutral-500 uppercase tracking-widest text-right">Pos</div>
                    <div className="flex-1 h-2 lg:h-2.5 bg-neutral-100 rounded-full overflow-hidden relative">
                      <div className="absolute inset-y-0 left-0 w-[68%] bg-green-500 rounded-full group-hover:shadow-[0_0_12px_rgba(34,197,94,0.8)] transition-all duration-300"></div>
                    </div>
                    <div className="w-8 text-[9px] lg:text-[10px] font-black text-green-600">68%</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-8 text-[9px] lg:text-[10px] font-black text-neutral-500 uppercase tracking-widest text-right">Net</div>
                    <div className="flex-1 h-2 lg:h-2.5 bg-neutral-100 rounded-full overflow-hidden relative">
                      <div className="absolute inset-y-0 left-0 w-[22%] bg-yellow-400 rounded-full group-hover:shadow-[0_0_12px_rgba(250,204,21,0.8)] transition-all duration-300"></div>
                    </div>
                    <div className="w-8 text-[9px] lg:text-[10px] font-black text-yellow-600">22%</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-8 text-[9px] lg:text-[10px] font-black text-neutral-500 uppercase tracking-widest text-right">Neg</div>
                    <div className="flex-1 h-2 lg:h-2.5 bg-neutral-100 rounded-full overflow-hidden relative">
                      <div className="absolute inset-y-0 left-0 w-[10%] bg-red-500 rounded-full group-hover:shadow-[0_0_12px_rgba(239,68,68,0.8)] transition-all duration-300"></div>
                    </div>
                    <div className="w-8 text-[9px] lg:text-[10px] font-black text-red-600">10%</div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* TAB: DEEP DIVE ANALISIS (ELECTION TREND) */}
          {activeTab === 'analisis' && (
            <section className="px-6 mt-8 lg:mt-10 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
               <ElectionTrend />
            </section>
          )}

          {/* TAB: MEDIA INSIGHT (CAROUSEL PREVIEW FOR HOME) */}
          {activeTab === 'home' && (
            <section className="px-6 mt-10 lg:mt-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between mb-4 lg:mb-6">
                <h3 className="text-xs lg:text-sm font-black text-neutral-900 flex items-center gap-2 tracking-widest uppercase">
                  <Zap className="text-yellow-500" size={16} fill="currentColor" /> Media Insight
                </h3>
                <button onClick={() => scrollToSection('berita')} className="text-[10px] lg:text-xs font-black text-neutral-400 uppercase tracking-widest hover:text-yellow-600 transition-colors">Lihat Semua</button>
              </div>
              <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 snap-x">
                {MOCK_NEWS.map(news => (
                  <Link key={news.id} href={(news as any).url || '#'} target="_blank" rel="noopener noreferrer" className="w-[280px] lg:w-[320px] shrink-0 bg-white/90 backdrop-blur-xl rounded-3xl border border-neutral-100 p-4 shadow-sm snap-center hover:shadow-2xl hover:border-yellow-200/60 hover:-translate-y-1 transition-all duration-300 group block">
                    <div className="w-full h-32 lg:h-40 bg-neutral-50 rounded-2xl mb-4 overflow-hidden relative border border-neutral-100">
                      <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-neutral-900 text-[9px] font-black uppercase px-2.5 py-1 rounded-lg shadow-sm border border-neutral-100">{news.tag}</div>
                    </div>
                    <h4 className="text-xs lg:text-sm font-black text-neutral-900 leading-snug line-clamp-2 mb-3 group-hover:text-yellow-600 transition-colors">{news.title}</h4>
                    <div className="flex items-center gap-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                       <p className="text-[8px] font-black text-neutral-400 uppercase tracking-widest">{news.date}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* TAB: BERITA (FULL PAGE GRID) */}
          {activeTab === 'berita' && (
            <section className="px-6 mt-6 lg:mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between mb-6 lg:mb-8">
                <div>
                  <h3 className="text-sm lg:text-base font-black text-neutral-900 flex items-center gap-2 tracking-widest uppercase">
                    <Zap className="text-yellow-500" size={18} fill="currentColor" /> Media Insight
                  </h3>
                  <p className="text-[10px] font-bold text-neutral-400 mt-1 uppercase tracking-widest">Berita & Sorotan Fraksi Terkini</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                {MOCK_NEWS.map(news => (
                  <Link key={news.id} href={(news as any).url || '#'} target="_blank" rel="noopener noreferrer" className="w-full bg-white/90 backdrop-blur-xl rounded-3xl border border-neutral-100 p-4 shadow-sm hover:shadow-2xl hover:border-yellow-200/60 hover:-translate-y-1 transition-all duration-300 group block">
                    <div className="w-full h-40 lg:h-48 bg-neutral-50 rounded-2xl mb-4 overflow-hidden relative border border-neutral-100">
                      <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-neutral-900 text-[9px] font-black uppercase px-2.5 py-1 rounded-lg shadow-sm border border-neutral-100">{news.tag}</div>
                    </div>
                    <h4 className="text-xs lg:text-sm font-black text-neutral-900 leading-snug line-clamp-3 mb-4 group-hover:text-yellow-600 transition-colors">{news.title}</h4>
                    <div className="flex items-center gap-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                       <p className="text-[8px] font-black text-neutral-400 uppercase tracking-widest">{news.date}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* TAB: ANGGOTA & HOME PREVIEW */}
          {(activeTab === 'home' || activeTab === 'anggota') && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <section className="px-6 mt-6 lg:mt-8 lg:flex lg:items-center lg:justify-between lg:gap-8">
                <div className="relative group mb-6 lg:mb-0 lg:w-96 shrink-0 z-20">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-300 group-focus-within:text-yellow-500 transition-colors" size={20} />
                  <input 
                    type="text" 
                    placeholder="Cari Nama Anggota atau Dapil..." 
                    className="w-full bg-white border border-neutral-100 rounded-3xl pl-14 pr-6 py-5 text-sm font-bold shadow-sm focus:ring-4 focus:ring-yellow-400/10 outline-none transition-all"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                <div className="flex gap-3 overflow-x-auto no-scrollbar py-2 lg:flex-wrap lg:justify-end">
                  {komisiList.map((num) => (
                    <button 
                      key={num}
                      onClick={() => setActiveKomisi(num === 'Semua' ? 'Semua' : `Komisi ${num}`)}
                      className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase whitespace-nowrap transition-all ${
                        (num === 'Semua' && activeKomisi === 'Semua') || activeKomisi === `Komisi ${num}`
                        ? 'bg-yellow-400 text-neutral-900 shadow-lg shadow-yellow-200 scale-105' 
                        : 'bg-white text-neutral-400 border border-neutral-100 hover:border-yellow-200'
                      }`}
                    >
                      {num === 'Semua' ? 'Semua' : `Komisi ${num}`}
                    </button>
                  ))}
                </div>
              </section>

              <main className="px-6 mt-8 lg:mt-10 mb-8">
                <div className="flex items-center justify-between mb-4 lg:mb-6 lg:col-span-full">
                    <h3 className="text-[10px] font-black text-neutral-400 uppercase tracking-widest flex items-center gap-1.5"><Users size={14}/> Anggota Terdaftar ({filteredMembers.length})</h3>
                    <Filter size={14} className="text-neutral-300" />
                </div>
                
                <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 xl:grid-cols-3 lg:gap-6">
                  {filteredMembers.slice(0, visibleCount).map((member) => (
                    <div 
                      key={member.id} 
                      onClick={() => router.push(`/anggota/${member.slug}`)}
                      className="bg-white rounded-[2rem] border border-neutral-50 p-4 lg:p-5 shadow-sm hover:shadow-xl active:scale-[0.98] transition-all flex items-center gap-4 cursor-pointer group"
                    >
                      <div className="w-16 h-16 lg:w-16 lg:h-16 rounded-2xl bg-neutral-50 overflow-hidden relative shrink-0 border border-neutral-100">
                        <Image src={member.image} alt={member.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm lg:text-base font-black text-neutral-900 truncate">{member.name}</h4>
                        <div className="flex items-center gap-2 mt-1.5">
                           <span className="text-[8px] lg:text-[9px] font-black text-yellow-600 bg-yellow-50 border border-yellow-100/50 px-2 py-0.5 rounded-md uppercase">{member.komisi}</span>
                           <span className="text-[9px] lg:text-[10px] font-bold text-neutral-400 uppercase tracking-tighter truncate">Dapil {member.dapil}</span>
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-300 group-hover:bg-yellow-400 group-hover:text-neutral-900 transition-colors shrink-0">
                        <ChevronRight size={16} />
                      </div>
                    </div>
                  ))}
                </div>

                {filteredMembers.length === 0 && (
                  <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-neutral-200 mt-4">
                    <Search size={40} className="mx-auto text-neutral-200 mb-4" />
                    <p className="text-xs font-black text-neutral-400 uppercase tracking-widest">Data Tidak Ditemukan</p>
                  </div>
                )}

                {/* Load More Button */}
                {visibleCount < filteredMembers.length && (
                  <div className="mt-8 flex justify-center w-full">
                    <button 
                      onClick={() => setVisibleCount(prev => prev + 6)}
                      className="bg-white border border-neutral-200 text-neutral-500 hover:text-neutral-900 hover:border-neutral-300 hover:shadow-lg hover:scale-105 active:scale-95 px-8 py-4 rounded-[2rem] text-[10px] font-black uppercase tracking-widest shadow-sm transition-all flex items-center gap-3"
                    >
                       <Users size={16} /> Muat Lebih Banyak ({filteredMembers.length - visibleCount})
                    </button>
                  </div>
                )}
              </main>
            </div>
          )}

          {/* TAB: DAPIL */}
          {activeTab === 'dapil' && (
            <section className="px-6 mt-6 lg:mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col items-center justify-center min-h-[50vh]">
               <div className="w-full max-w-5xl bg-white border border-neutral-200 rounded-[3rem] p-6 lg:p-10 text-center shadow-lg relative overflow-hidden">
                  <div className="relative z-10">
                    <h3 className="text-xl lg:text-2xl font-black text-neutral-900 mb-2">Peta Sebaran Fraksi Golkar</h3>
                    <p className="text-[10px] font-bold text-neutral-400 mb-6 uppercase tracking-widest flex items-center justify-center gap-1.5"><MapPin size={12} className="text-yellow-500" fill="currentColor"/> Interaktif Map (Menunggu Integrasi Data Spasial)</p>
                    
                    <div className="w-full h-[350px] lg:h-[500px] bg-slate-50/50 rounded-[2rem] border border-slate-200 relative overflow-hidden group hover:border-yellow-300 transition-colors shadow-inner">
                       <div className="absolute inset-0 z-0 opacity-20 hidden lg:block" style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
                       
                       {/* Indonesia Interactive Map */}
                       <div className="absolute inset-0 z-10 w-full h-full flex items-center justify-center">
                           <IndonesiaMap />
                       </div>
                    </div>
                  </div>
               </div>
            </section>
          )}

        </div>

        {/* Floating Navbar (Mobile Only) */}
        <nav className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[110] w-[90%] max-w-[400px] lg:hidden">
          <div className="bg-neutral-900/95 backdrop-blur-2xl rounded-[3rem] p-3 flex items-center shadow-2xl border border-white/10">
            <button onClick={() => scrollToSection('anggota')} className={`flex-1 flex flex-col items-center gap-1 ${activeTab === 'anggota' ? 'text-yellow-400' : 'text-neutral-500 hover:text-neutral-300 transition-colors'}`}><Users size={20} /><span className="text-[8px] font-black uppercase">Anggota</span></button>
            <button onClick={() => scrollToSection('berita')} className={`flex-1 flex flex-col items-center gap-1 ${activeTab === 'berita' ? 'text-yellow-400' : 'text-neutral-500 hover:text-neutral-300 transition-colors'}`}><Newspaper size={20} /><span className="text-[8px] font-black uppercase">Berita</span></button>
            <div onClick={() => scrollToSection('home')} className="w-14 h-14 bg-yellow-400 rounded-full -mt-12 border-8 border-[#F8FAFC] flex items-center justify-center text-neutral-900 shadow-xl active:scale-90 cursor-pointer transition-transform"><Zap size={24} fill="currentColor" /></div>
            <button onClick={() => scrollToSection('dapil')} className={`flex-1 flex flex-col items-center gap-1 ${activeTab === 'dapil' ? 'text-yellow-400' : 'text-neutral-500 hover:text-neutral-300 transition-colors'}`}><MapPin size={20} /><span className="text-[8px] font-black uppercase">Dapil</span></button>
            <button onClick={() => scrollToSection('analisis')} className={`flex-1 flex flex-col items-center gap-1 ${activeTab === 'analisis' ? 'text-yellow-400' : 'text-neutral-500 hover:text-neutral-300 transition-colors'}`}><TrendingUp size={20} /><span className="text-[8px] font-black uppercase">Analisis</span></button>
          </div>
        </nav>
      </div>
    </div>
  );
};
