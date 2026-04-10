'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Search, MapPin, Users, Newspaper, Zap, Bell, 
  TrendingUp, Filter, ChevronRight, Award, Menu,
  Activity, AlertCircle, BarChart3, ChevronDown
} from 'lucide-react';
import { MOCK_MEMBERS, KOMISI_LIST } from '@/lib/data';
import IndonesiaMap from '@/components/shared/IndonesiaMap';
// Asumsi komponen ini ada, jika tidak ada, bisa dikomen dulu
// import ElectionTrend from '@/components/home/ElectionTrend';
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
  const [activeTab, setActiveTab] = useState<'peta' | 'direktori' | 'berita'>('peta');
  const [currentTime, setCurrentTime] = useState<string>('');
  const [greeting, setGreeting] = useState('Selamat Datang');

  const members = propsMembers || MOCK_MEMBERS;
  const komisi = propsKomisi || ['Semua', ...KOMISI_LIST];

  // Set Waktu dan Greeting
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

  // Filter Members
  const filteredMembers = useMemo(() => {
    return members.filter((m: any) => {
      const matchName = m.name.toLowerCase().includes(search.toLowerCase());
      const matchDapil = m.dapil?.toLowerCase().includes(search.toLowerCase());
      const matchKomisi = activeKomisi === 'Semua' || m.komisi?.includes(activeKomisi);
      return (matchName || matchDapil) && matchKomisi;
    });
  }, [search, activeKomisi, members]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 md:pb-0 font-sans selection:bg-yellow-200">
      
      {/* 1. EXECUTIVE HERO SECTION */}
      <div className="relative bg-slate-900 pt-8 pb-32 px-4 md:px-8 overflow-hidden">
        {/* Abstract Background Decoration */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[600px] h-[600px] bg-yellow-400/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Topbar */}
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-400/20">
                <Award className="text-slate-900 w-6 h-6" />
              </div>
              <div>
                <h1 className="text-white font-black text-xl tracking-tight leading-none">F-PG</h1>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">DPR Republik Indonesia</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <span className="text-slate-300 text-sm font-medium flex items-center gap-2">
                <Activity className="w-4 h-4 text-green-400" />
                Live Update Data
              </span>
              <div className="h-4 w-[1px] bg-slate-700"></div>
              <span className="text-slate-400 text-sm font-medium">{currentTime}</span>
            </div>

            <button className="md:hidden text-white bg-slate-800 p-2 rounded-lg border border-slate-700">
              <Bell className="w-5 h-5" />
            </button>
          </div>

          {/* Hero Content */}
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700 backdrop-blur-md mb-6">
              <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
              <span className="text-xs font-bold text-slate-300 tracking-wide uppercase">{greeting}, Rakyat Indonesia</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-[1.1] tracking-tight">
              Kawal Aspirasi,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">Bangun Bangsa.</span>
            </h2>
            <p className="text-slate-400 text-base md:text-lg max-w-xl font-medium leading-relaxed">
              Portal informasi resmi dan analitik geospasial Fraksi Partai Golkar DPR RI Periode 2024-2029. Transparan, akuntabel, dan berbasis data.
            </p>
          </div>
        </div>
      </div>

      {/* 2. QUICK STATS (BENTO CARDS) - Overlapping Hero */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-20 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div className="bg-white p-5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col justify-between group hover:-translate-y-1 transition-transform duration-300">
            <div className="w-10 h-10 rounded-xl bg-yellow-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-3xl font-black text-slate-800 tracking-tight">102</p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Kursi Parlemen</p>
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col justify-between group hover:-translate-y-1 transition-transform duration-300">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Activity className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-3xl font-black text-slate-800 tracking-tight">23.2<span className="text-lg">Jt</span></p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Suara Sah (2024)</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col justify-between group hover:-translate-y-1 transition-transform duration-300">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <MapPin className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-3xl font-black text-slate-800 tracking-tight">84</p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Daerah Pemilihan</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 p-5 rounded-2xl shadow-lg shadow-yellow-500/20 flex flex-col justify-between text-slate-900 group hover:-translate-y-1 transition-transform duration-300">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform backdrop-blur-sm">
              <TrendingUp className="w-5 h-5 text-slate-900" />
            </div>
            <div>
              <p className="text-3xl font-black tracking-tight">#2</p>
              <p className="text-xs font-bold text-slate-800 uppercase tracking-wider mt-1">Peringkat Nasional</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. MAIN DASHBOARD CONTENT */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12 mb-8">
        
        {/* Sleek Segmented Tabs */}
        <div className="flex bg-slate-200/60 p-1.5 rounded-2xl mb-8 w-full md:w-fit backdrop-blur-sm border border-slate-200">
          <button 
            onClick={() => setActiveTab('peta')}
            className={`flex-1 md:flex-none px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 ${activeTab === 'peta' ? 'bg-white text-slate-800 shadow-[0_2px_10px_rgba(0,0,0,0.06)]' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}
          >
            <MapPin className="w-4 h-4" /> Peta Geospasial
          </button>
          <button 
            onClick={() => setActiveTab('direktori')}
            className={`flex-1 md:flex-none px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 ${activeTab === 'direktori' ? 'bg-white text-slate-800 shadow-[0_2px_10px_rgba(0,0,0,0.06)]' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}
          >
            <Users className="w-4 h-4" /> Direktori Anggota
          </button>
          <button 
            onClick={() => setActiveTab('berita')}
            className={`hidden md:flex flex-1 md:flex-none px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 items-center justify-center gap-2 ${activeTab === 'berita' ? 'bg-white text-slate-800 shadow-[0_2px_10px_rgba(0,0,0,0.06)]' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}
          >
            <Newspaper className="w-4 h-4" /> Update Fraksi
          </button>
        </div>

        {/* TAB 1: PETA GEOSPASIAL */}
        {activeTab === 'peta' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="bg-white p-2 md:p-6 rounded-[2.5rem] shadow-sm border border-slate-100">
               <IndonesiaMap members={members} />
             </div>
          </div>
        )}

        {/* TAB 2: DIREKTORI ANGGOTA */}
        {activeTab === 'direktori' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Search & Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="Cari nama anggota atau dapil..."
                  className="w-full pl-11 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent shadow-sm transition-shadow"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                {komisi.map((k: string) => (
                  <button
                    key={k}
                    onClick={() => setActiveKomisi(k)}
                    className={`px-5 py-3.5 rounded-2xl text-sm font-bold whitespace-nowrap transition-all border ${
                      activeKomisi === k 
                        ? 'bg-slate-800 text-white border-slate-800 shadow-md' 
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {k === 'Semua' ? 'Semua Komisi' : k}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid Members */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMembers.length > 0 ? (
                filteredMembers.map((member: any) => (
                  <div key={member.id} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer" onClick={() => router.push(`/anggota/${member.slug}`)}>
                    <div className="h-48 bg-slate-100 relative overflow-hidden flex items-end justify-center">
                       {/* Abstract pattern back of photo */}
                       <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 to-transparent"></div>
                       <Image 
                         src={member.image || "/api/placeholder/400/320"} 
                         alt={member.name}
                         width={200} height={200}
                         className="object-cover object-bottom h-[90%] w-auto group-hover:scale-105 transition-transform duration-500 relative z-10"
                       />
                       <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-slate-900/60 to-transparent z-20"></div>
                       <span className="absolute bottom-3 left-4 z-30 text-[10px] font-black px-2 py-1 bg-yellow-400 text-slate-900 rounded-md uppercase tracking-wider shadow-sm">
                         {member.komisi || 'Fraksi'}
                       </span>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-slate-800 text-base leading-tight mb-1 group-hover:text-yellow-600 transition-colors line-clamp-1">{member.name}</h3>
                      <div className="flex items-center text-slate-500 text-xs font-medium gap-1.5 mb-4">
                        <MapPin className="w-3.5 h-3.5" />
                        <span className="truncate">{member.dapil}</span>
                      </div>
                      
                      <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                        <div>
                          <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Suara Sah</p>
                          <p className="font-black text-slate-700 text-sm">{(Number(member.perolehan_suara)||0).toLocaleString('id-ID')}</p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-yellow-50 group-hover:text-yellow-600 transition-colors">
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-20 flex flex-col items-center justify-center text-slate-400">
                  <Search className="w-12 h-12 mb-4 opacity-20" />
                  <p className="text-lg font-medium">Anggota tidak ditemukan</p>
                  <p className="text-sm">Coba gunakan kata kunci atau filter lain.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: BERITA FRAKSI */}
        {activeTab === 'berita' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {MOCK_NEWS.map((news: any) => (
                  <Link href={news.url} key={news.id} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition-all group flex flex-col h-full">
                    <div className="relative h-56 overflow-hidden bg-slate-100">
                      {news.image ? (
                        <Image src={news.image} alt={news.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400"><Newspaper size={40}/></div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur-sm text-slate-800 text-[10px] font-black uppercase px-3 py-1.5 rounded-lg shadow-sm">
                          {news.tag}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <p className="text-xs font-semibold text-yellow-600 mb-2">{news.date}</p>
                      <h3 className="font-bold text-slate-800 text-lg leading-snug mb-4 group-hover:text-blue-600 transition-colors line-clamp-3">{news.title}</h3>
                      <div className="mt-auto flex items-center text-slate-400 text-xs font-bold uppercase tracking-wider group-hover:text-slate-600 transition-colors">
                        Baca Selengkapnya <ChevronRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </Link>
               ))}
            </div>
          </div>
        )}
      </div>

      {/* 4. SLEEK MOBILE BOTTOM NAVIGATION (FLOATING DOCK) */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[340px] z-[100]">
        <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-700 shadow-2xl rounded-3xl p-2 flex items-center justify-between relative">
            
            <button onClick={() => setActiveTab('peta')} className={`flex-1 flex flex-col items-center justify-center py-2 transition-colors ${activeTab === 'peta' ? 'text-yellow-400' : 'text-slate-400 hover:text-slate-200'}`}>
              <MapPin className="w-5 h-5 mb-1" />
              <span className="text-[9px] font-bold uppercase tracking-wider">Peta</span>
            </button>
            
            <button onClick={() => setActiveTab('direktori')} className={`flex-1 flex flex-col items-center justify-center py-2 transition-colors ${activeTab === 'direktori' ? 'text-yellow-400' : 'text-slate-400 hover:text-slate-200'}`}>
              <Users className="w-5 h-5 mb-1" />
              <span className="text-[9px] font-bold uppercase tracking-wider">Anggota</span>
            </button>

            {/* Center Main Action (Zap) */}
            <div className="relative -top-8 px-2">
              <div className="w-14 h-14 bg-gradient-to-b from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center shadow-lg shadow-yellow-500/30 border-4 border-[#F8FAFC] transform active:scale-95 transition-transform cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <Zap className="w-6 h-6 text-slate-900" fill="currentColor" />
              </div>
            </div>

            <button onClick={() => setActiveTab('berita')} className={`flex-1 flex flex-col items-center justify-center py-2 transition-colors ${activeTab === 'berita' ? 'text-yellow-400' : 'text-slate-400 hover:text-slate-200'}`}>
              <Newspaper className="w-5 h-5 mb-1" />
              <span className="text-[9px] font-bold uppercase tracking-wider">Berita</span>
            </button>

            <button onClick={() => router.push('/analisis')} className="flex-1 flex flex-col items-center justify-center py-2 text-slate-400 hover:text-slate-200 transition-colors">
              <BarChart3 className="w-5 h-5 mb-1" />
              <span className="text-[9px] font-bold uppercase tracking-wider">Data</span>
            </button>
        </div>
      </div>

    </div>
  );
};