'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Search, MapPin, Users, Newspaper, Zap, Bell, 
  TrendingUp, Filter, ChevronRight, Award, Menu
} from 'lucide-react';
import { MOCK_MEMBERS, KOMISI_LIST } from '@/lib/data';

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
  const [visibleCount, setVisibleCount] = useState(6); // Awal: 6 kartu
  
  const initialMembers = useMemo(() => MOCK_MEMBERS, []);
  
  // Odometer Effect
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
    return () => clearInterval(timer);
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
    <div className="min-h-screen bg-[#F8FAFC] pb-32 lg:pb-12 relative font-sans overflow-x-hidden">
      
      <div className="max-w-7xl mx-auto">
        {/* Dynamic Header */}
        <header className={`sticky top-0 z-[100] px-6 py-5 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-xl shadow-lg border-b border-neutral-100' : 'bg-transparent'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-200">
                <Zap size={20} fill="white" className="text-white" />
              </div>
              <div>
                <h1 className="text-xs font-black uppercase tracking-widest text-neutral-900 leading-none">Dashboard 102</h1>
                <p className="text-[8px] font-bold text-neutral-400 uppercase mt-1">Fraksi Partai Golkar</p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="hidden lg:flex items-center gap-8 mr-6">
                <button className="text-[10px] font-black uppercase text-yellow-600 hover:text-yellow-500 transition-colors">Anggota</button>
                <button className="text-[10px] font-black uppercase text-neutral-500 hover:text-neutral-900 transition-colors">Berita</button>
                <button className="text-[10px] font-black uppercase text-neutral-500 hover:text-neutral-900 transition-colors">Dapil</button>
                <button className="text-[10px] font-black uppercase text-neutral-500 hover:text-neutral-900 transition-colors">Analisis</button>
              </div>
              <button className="p-2.5 bg-white rounded-xl border border-neutral-100 text-neutral-400 shadow-sm"><Bell size={18} /></button>
              <button className="p-2.5 bg-neutral-900 rounded-xl text-white shadow-lg lg:hidden"><Menu size={18} /></button>
            </div>
          </div>
        </header>

        {/* Hero: Bento & Odometer */}
        <section className="px-6 mt-4 grid grid-cols-12 gap-4 lg:gap-6">
          <div className="col-span-12 lg:col-span-7 bg-neutral-900 rounded-[2.5rem] p-8 lg:p-12 text-white relative overflow-hidden shadow-2xl flex flex-col justify-center">
            <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-400/10 rounded-full blur-[80px] -mr-16 -mt-16"></div>
            <div className="relative z-10">
              <h2 className="text-2xl lg:text-4xl font-black leading-tight mb-6 lg:mb-10 tracking-tight">Suara Rakyat <br/><span className="text-yellow-400">Terakomodasi Digital.</span></h2>
              <div className="flex items-end gap-2">
                <span className="text-4xl lg:text-5xl font-black tracking-tighter text-yellow-400">{count.toLocaleString()}</span>
                <span className="text-[10px] lg:text-xs font-bold text-neutral-500 uppercase mb-2 lg:mb-3 tracking-widest">Aspirasi Rakyat</span>
              </div>
            </div>
          </div>

          <div className="col-span-7 lg:col-span-3 bg-emerald-900 rounded-[2rem] p-6 lg:p-8 text-white shadow-lg relative overflow-hidden group flex flex-col justify-end min-h-[160px]">
            <div className="absolute right-[-10px] top-[-10px] opacity-20 group-hover:scale-125 transition-transform"><TrendingUp size={80} /></div>
            <div>
              <p className="text-[9px] lg:text-[10px] font-black uppercase opacity-70 mb-1">Trending Isu</p>
              <p className="text-sm lg:text-lg font-black leading-tight">Digitalisasi Desa & Pertanian</p>
            </div>
          </div>
          
          <div className="col-span-5 lg:col-span-2 bg-white border border-neutral-100 rounded-[2rem] p-6 shadow-sm flex flex-col justify-between">
            <Award size={24} className="text-yellow-500" />
            <div>
              <p className="text-[9px] font-black uppercase text-neutral-400 mb-1">Terpopuler</p>
              <p className="text-sm lg:text-base font-black text-neutral-900">Komisi I</p>
            </div>
          </div>
        </section>

        {/* Media Insight / Sorotan Golkar */}
        <section className="px-6 mt-10 lg:mt-12">
          <div className="flex items-center justify-between mb-4 lg:mb-6">
            <h3 className="text-xs lg:text-sm font-black text-neutral-900 flex items-center gap-2 tracking-widest uppercase">
              <Zap className="text-yellow-500" size={16} fill="currentColor" /> Media Insight
            </h3>
            <button className="text-[10px] lg:text-xs font-black text-neutral-400 uppercase tracking-widest hover:text-yellow-600 transition-colors">Semua</button>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 snap-x">
            {MOCK_NEWS.map(news => (
              <Link key={news.id} href={(news as any).url || '#'} target="_blank" rel="noopener noreferrer" className="w-[280px] lg:w-[320px] shrink-0 bg-white rounded-3xl border border-neutral-50 p-4 shadow-sm snap-center hover:shadow-xl transition-all group block">
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

        {/* Smart Filters */}
        <section className="px-6 mt-6 lg:mt-10 lg:flex lg:items-center lg:justify-between lg:gap-8">
          <div className="relative group mb-6 lg:mb-0 lg:w-96 shrink-0 z-20">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-300 group-focus-within:text-yellow-500 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Cari Isu, Nama, atau Dapil..." 
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

        {/* Members List (Compact & Paginated) */}
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

        {/* Floating Navbar (Mobile Only) */}
        <nav className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[110] w-[90%] max-w-[400px] lg:hidden">
          <div className="bg-neutral-900/95 backdrop-blur-2xl rounded-[3rem] p-3 flex items-center shadow-2xl border border-white/10">
            <button className="flex-1 flex flex-col items-center gap-1 text-yellow-400"><Users size={20} /><span className="text-[8px] font-black uppercase">Anggota</span></button>
            <button className="flex-1 flex flex-col items-center gap-1 text-neutral-500"><Newspaper size={20} /><span className="text-[8px] font-black uppercase">Berita</span></button>
            <div className="w-14 h-14 bg-yellow-400 rounded-full -mt-12 border-8 border-[#F8FAFC] flex items-center justify-center text-neutral-900 shadow-xl active:scale-90 transition-transform"><Zap size={24} fill="currentColor" /></div>
            <button className="flex-1 flex flex-col items-center gap-1 text-neutral-500"><MapPin size={20} /><span className="text-[8px] font-black uppercase">Dapil</span></button>
            <button className="flex-1 flex flex-col items-center gap-1 text-neutral-500"><TrendingUp size={20} /><span className="text-[8px] font-black uppercase">Analisis</span></button>
          </div>
        </nav>
      </div>
    </div>
  );
};
