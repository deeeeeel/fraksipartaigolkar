'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, MapPin, Users, Newspaper, Zap, Bell, 
  TrendingUp, ChevronRight, Award,
  Activity, BarChart3, ArrowUpRight,
  Megaphone, MessageSquare, Calendar, Star, Clock, ArrowRight,
  Smile, Meh, Frown, Info, Briefcase
} from 'lucide-react';

/**
 * ============================================================================
 * CATATAN PENTING UNTUK DEPLOY VERCEL:
 * ============================================================================
 * Di lingkungan preview ini, import Next.js (next/image, next/link, next/dynamic)
 * akan menyebabkan error. Oleh karena itu saya menggantinya dengan tag standar.
 * * SAAT ANDA MENYALIN KODE INI KE PROJECT LOKAL ANDA, PASTIKAN ANDA MENGGUNAKAN
 * DYNAMIC IMPORT UNTUK PETA AGAR TIDAK CRASH DI VERCEL.
 * * Silakan ganti komponen <IndonesiaMap /> dummy di bawah dengan import ini
 * di bagian atas file Anda:
 * * import dynamic from 'next/dynamic';
 * const IndonesiaMap = dynamic(() => import('@/components/shared/IndonesiaMap'), { 
 * ssr: false,
 * loading: () => <div className="w-full h-[450px] bg-slate-50 animate-pulse rounded-[1.5rem]"></div>
 * });
 * ============================================================================
 */

const IndonesiaMap = ({ members }: { members?: any[] }) => (
  <div className="w-full h-[450px] bg-slate-50 rounded-[1.5rem] flex flex-col items-center justify-center border-2 border-dashed border-slate-200">
    <MapPin className="w-10 h-10 text-slate-300 mb-3" />
    <p className="text-slate-500 font-bold text-sm">Modul Peta Interaktif</p>
    <p className="text-xs text-slate-400 mt-2 text-center px-4 max-w-sm">
      (Di local/Vercel Anda, gunakan <b>next/dynamic</b> import dengan <b>ssr: false</b> agar peta Leaflet berfungsi sempurna)
    </p>
  </div>
);

// ============================================================================
// 2. DATA STATIS & MOCK (Pindahkan ke lib/data.ts nanti jika diperlukan)
// ============================================================================
const KOMISI_LIST = ['Komisi I', 'Komisi II', 'Komisi III', 'Komisi IV', 'Komisi V', 'Komisi VI', 'Komisi VII', 'Komisi VIII', 'Komisi IX', 'Komisi X', 'Komisi XI', 'Komisi XII', 'Komisi XIII'];

const MOCK_NEWS = [
  { id: 1, title: "Di Balik Stabilitas Indonesia, Ada Airlangga Hartarto dan Bahlil Lahadalia yang Bertarung di Tengah Krisis Global", date: "10 April 2026", tag: "Ekonomi Politik", url: "https://golkarpedia.com/di-balik-stabilitas-indonesia-ada-airlangga-hartarto-dan-bahlil-lahadalia-yang-bertarung-di-tengah-krisis-global/", image: "/1-14.jpg" },
  { id: 2, title: "Menteri ESDM Bahlil Lahadalia Ajak Warga Hemat Energi Mulai Dari Hal Sepele: Matikan Lampu!", date: "09 April 2026", tag: "Energi", url: "https://golkarpedia.com/menteri-esdm-bahlil-lahadalia-ajak-warga-hemat-energi-mulai-dari-hal-sepele-matikan-lampu/", image: "/1203-bahlil-lahadalia-esdm.jpg" },
  { id: 3, title: "Dari Konsolidasi Senyap ke Kemenangan Nyata, Legacy Ace Hasan Syadzily di Partai Golkar Jabar", date: "08 April 2026", tag: "Politik", url: "https://golkarpedia.com/dari-konsolidasi-senyap-ke-kemenangan-nyata-legacy-ace-hasan-syadzily-di-partai-golkar-jabar/", image: "/1-3.jpeg" },
  { id: 4, title: "Sarmuji Sentil Isu Jatuhkan Prabowo: Ibarat Kereta, Rakyat yang Akan Dirugikan", date: "07 April 2026", tag: "Nasional", url: "https://golkarpedia.com/sarmuji-sentil-isu-jatuhkan-prabowo-ibarat-kereta-rakyat-yang-akan-dirugikan/", image: "/0303-sekjen-golkar-sarmuji.jpg" },
  { id: 5, title: "Perang Global Guncang Industri, Menperin Agus Gumiwang Wanti-wanti Rantai Pasok Terganggu", date: "06 April 2026", tag: "Industri", url: "https://golkarpedia.com/perang-global-guncang-industri-menperin-agus-gumiwang-wanti-wanti-rantai-pasok-terganggu-inflasi-mengintai/", image: "/0203-agus-gumiwang-kartasasmita.jpg" },
  { id: 6, title: "Situasi Lebanon Mencekam, TNI Diperintahkan Masuk Bunker, Dave Laksono: Langkah Darurat Tepat", date: "05 April 2026", tag: "Pertahanan", url: "https://golkarpedia.com/situasi-lebanon-mencekam-tni-diperintahkan-masuk-bunker-dave-laksono-ini-langkah-darurat-yang-tepat/", image: "/0503-dave-laksono-dpr.jpg" },
  { id: 7, title: "Airlangga Hartarto Teken MoU Industri Perairan, RI Siap Jadi Pemain Baru Offshore Dunia", date: "04 April 2026", tag: "Ekonomi", url: "https://golkarpedia.com/airlangga-hartarto-teken-mou-industri-perairan-ri-siap-jadi-pemain-baru-offshore-dunia/", image: "/0603-airlangga-hartarto-menko.jpeg" },
  { id: 8, title: "Darah Prajurit RI Tumpah di Lebanon, Sari Yuliati Murka: Serangan Keji Tak Bisa Dibiarkan!", date: "03 April 2026", tag: "Internasional", url: "https://golkarpedia.com/darah-prajurit-ri-tumpah-di-lebanon-sari-yuliati-murka-ini-serangan-keji-yang-tak-bisa-dibiarkan/", image: "/7540d57a36f-9269-4c2f-aeb5-1761ba6e2bc2 (1).jpeg" }
];

const TICKER_NEWS = [
  "EKONOMI: Di Balik Stabilitas Indonesia, Ada Airlangga & Bahlil yang Bertarung di Tengah Krisis Global",
  "NASIONAL: Sarmuji Sentil Isu Jatuhkan Prabowo: Ibarat Kereta, Rakyat yang Akan Dirugikan",
  "INTERNASIONAL: Situasi Lebanon Mencekam, Dave Laksono & Sari Yuliati Kecam Serangan Terhadap Pasukan Perdamaian",
  "INDUSTRI: Menperin Wanti-wanti Rantai Pasok Terganggu, Airlangga Teken MoU Industri Perairan Offshore"
];

const VIP_ROSTER = [
  { role: "Ketua Fraksi", name: "M. Sarmuji", dapil: "Jawa Timur VI", img: "/0303-sekjen-golkar-sarmuji.jpg" },
  { role: "Sekretaris Fraksi", name: "Sari Yuliati", dapil: "Nusa Tenggara Barat II", img: "/7540d57a36f-9269-4c2f-aeb5-1761ba6e2bc2 (1).jpeg" },
  { role: "Bendahara Fraksi", name: "Puteri Anneta Komaruddin", dapil: "Jawa Barat VII", img: "/api/placeholder/400/400" } // Placeholder krn blm ada fotonya
];

const AGENDA_ITEMS = [
  { id: 1, date: "Hari Ini", time: "10:00 WIB", title: "Rapat Paripurna DPR RI Ke-14 Masa Persidangan IV", type: "Paripurna", color: "bg-red-500" },
  { id: 2, date: "Besok", time: "13:30 WIB", title: "Raker Komisi XI dengan Menteri Keuangan RI", type: "Raker Komisi", color: "bg-blue-500" },
  { id: 3, date: "18 Apr 2026", time: "09:00 WIB", title: "Kunjungan Spesifik Komisi V ke Kawasan IKN", type: "Kunker", color: "bg-emerald-500" },
  { id: 4, date: "20 Apr 2026", time: "19:00 WIB", title: "Konsolidasi Internal Pimpinan Fraksi Golkar", type: "Internal", color: "bg-yellow-500" },
];

const KABINET_ROSTER = [
  { role: "Menko Perekonomian", name: "Airlangga Hartarto", type: "Menteri", img: "/0603-airlangga-hartarto-menko.jpeg" },
  { role: "Menteri ESDM", name: "Bahlil Lahadalia", type: "Menteri", img: "/1203-bahlil-lahadalia-esdm.jpg" },
  { role: "Menteri Perindustrian", name: "Agus Gumiwang Kartasasmita", type: "Menteri", img: "/0203-agus-gumiwang-kartasasmita.jpg" },
  { role: "Menteri Komunikasi dan Digital", name: "Meutya Hafid", type: "Menteri", img: "/api/placeholder/200/200" },
  { role: "Menteri Kependudukan", name: "Wihaji", type: "Menteri", img: "/api/placeholder/200/200" },
  { role: "Menteri ATR/BPN", name: "Nusron Wahid", type: "Menteri", img: "/api/placeholder/200/200" },
  { role: "Menteri UMKM", name: "Maman Abdurahman", type: "Menteri", img: "/api/placeholder/200/200" },
  { role: "Menteri PPMI", name: "Mukhtarudin", type: "Menteri", img: "/api/placeholder/200/200" },
  { role: "Gubernur Lemhannas", name: "Ace Hasan Syadzily", type: "Setingkat Menteri", img: "/1-3.jpeg" },
  { role: "Wamen PPMI", name: "Christina Aryani", type: "Wakil Menteri", img: "/api/placeholder/200/200" },
  { role: "Wamen Perdagangan", name: "Dyah Roro Esty", type: "Wakil Menteri", img: "/api/placeholder/200/200" },
];

// ============================================================================
// 3. SUB-KOMPONEN UI (Modularisasi)
// ============================================================================

const HeroSection = ({ greeting, currentTime }: { greeting: string, currentTime: string }) => (
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

const QuickStatsAndSentiment = () => {
  const SENTIMENT_DATA = { positive: 68, neutral: 22, negative: 10, trend: "+2.4%", totalMentions: "142.5K" };
  
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
};

const SectionKabinet = () => (
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
           </div>
        </div>
      ))}
    </div>
  </div>
);

const SectionMediaInsight = ({ onSeeAll }: { onSeeAll: () => void }) => (
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
        <a href={news.url} key={news.id} target="_blank" rel="noopener noreferrer" className="min-w-[280px] md:min-w-0 bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-[0_10px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 group flex flex-col snap-start">
          <div className="relative h-44 overflow-hidden bg-slate-100">
            <img src={news.image} alt={news.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute top-4 left-4"><span className="bg-white/90 backdrop-blur-sm text-slate-800 text-[9px] font-black uppercase px-2.5 py-1.5 rounded-lg shadow-sm">{news.tag}</span></div>
          </div>
          <div className="p-5 flex flex-col flex-1">
            <p className="text-[10px] font-bold text-yellow-600 mb-2 uppercase tracking-wider">{news.date}</p>
            <h3 className="font-bold text-slate-800 text-sm leading-snug mb-3 group-hover:text-blue-600 transition-colors line-clamp-3">{news.title}</h3>
          </div>
        </a>
      ))}
    </div>
  </div>
);

// ============================================================================
// 4. KOMPONEN UTAMA (HomeView)
// ============================================================================

interface HomeViewProps {
  initialMembers?: any[];
  komisiList?: string[];
}

export const HomeView = ({ initialMembers: propsMembers, komisiList: propsKomisi }: HomeViewProps = {}) => {
  // States
  const [search, setSearch] = useState('');
  const [activeKomisi, setActiveKomisi] = useState('Semua');
  const [activeTab, setActiveTab] = useState<'peta' | 'direktori' | 'berita'>('peta');
  const [currentTime, setCurrentTime] = useState<string>('');
  const [greeting, setGreeting] = useState('Selamat Datang');

  // Fallback data
  const members = propsMembers || MOCK_MEMBERS;
  const komisi = propsKomisi || ['Semua', ...KOMISI_LIST];

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }));
      const hour = now.getHours();
      if (hour < 11) setGreeting('Selamat Pagi'); else if (hour < 15) setGreeting('Selamat Siang'); else if (hour < 18) setGreeting('Selamat Sore'); else setGreeting('Selamat Malam');
    };
    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  const filteredMembers = useMemo(() => {
    return members.filter((m: any) => {
      const matchName = m.name?.toLowerCase().includes(search.toLowerCase());
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
      
      {/* GLOBAL STYLES UTK COMPONENT INI */}
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
      
      <QuickStatsAndSentiment />

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

      <SectionKabinet />

      <SectionMediaInsight onSeeAll={() => setActiveTab('berita')} />

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
               {/* Komponen Peta dipanggil di sini. Di local Anda pastikan pakai dynamic import */}
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
                         <img src={vip.img} alt={vip.name} className="w-full h-full object-cover" />
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
                {komisi.map((k: string) => (
                  <button key={k} onClick={() => setActiveKomisi(k)} className={`px-5 py-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${activeKomisi === k ? 'bg-yellow-400 text-slate-900 border-yellow-400 shadow-sm' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}`}>{k === 'Semua' ? 'Semua' : k}</button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMembers.map((member: any) => (
                <div key={member.id} className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_15px_35px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300 group cursor-pointer">
                  <div className="h-56 bg-slate-100 relative overflow-hidden flex items-end justify-center">
                     <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-400 to-slate-200"></div>
                     <img src={member.image} alt={member.name} className="object-cover object-bottom h-[95%] w-auto group-hover:scale-105 transition-transform duration-500 relative z-10" />
                     <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent z-20"></div>
                     <div className="absolute bottom-4 left-5 right-5 z-30 flex justify-between items-end">
                       <span className="text-[10px] font-black px-2.5 py-1 bg-yellow-400 text-slate-900 rounded-md uppercase tracking-wider shadow-sm border border-yellow-300">{member.komisi || 'Fraksi'}</span>
                     </div>
                  </div>
                  <div className="p-6 relative">
                    <div className="absolute -top-6 right-5 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border border-slate-50 text-slate-300 group-hover:text-yellow-600 transition-all duration-300 z-30"><ChevronRight className="w-5 h-5" /></div>
                    <h3 className="font-black text-slate-800 text-lg leading-tight mb-2 group-hover:text-yellow-600 transition-colors line-clamp-1 pr-6">{member.name}</h3>
                    <div className="flex items-center text-slate-500 text-xs font-semibold gap-1.5 mb-5"><MapPin className="w-4 h-4 text-slate-400" /><span className="truncate">{member.dapil}</span></div>
                    <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                      <div><p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-0.5">Suara Sah 2024</p><p className="font-black text-slate-800 text-base">{member.perolehan_suara.toLocaleString('id-ID')}</p></div>
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
                  <a href={news.url} target="_blank" rel="noopener noreferrer" key={news.id} className={`bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-[0_15px_35px_rgb(0,0,0,0.06)] hover:-translate-y-1.5 transition-all duration-300 group flex flex-col ${index === 0 ? 'md:col-span-2' : ''} h-full`}>
                    <div className={`relative overflow-hidden bg-slate-100 ${index === 0 ? 'h-64' : 'h-52'}`}>
                      <img src={news.image} alt={news.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute top-5 left-5"><span className="bg-yellow-400 text-slate-900 text-[10px] font-black uppercase px-3 py-1.5 rounded-lg shadow-md border border-yellow-300 tracking-wider">{news.tag}</span></div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3"><span className="w-2 h-2 rounded-full bg-slate-300"></span><p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{news.date}</p></div>
                      <h3 className={`font-black text-slate-800 leading-snug mb-4 group-hover:text-yellow-600 transition-colors ${index === 0 ? 'text-2xl' : 'text-lg line-clamp-3'}`}>{news.title}</h3>
                      <div className="mt-auto pt-4 flex items-center text-slate-500 text-xs font-bold uppercase tracking-wider group-hover:text-yellow-600 transition-colors">Baca Selengkapnya <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" /></div>
                    </div>
                  </a>
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

export default HomeView;