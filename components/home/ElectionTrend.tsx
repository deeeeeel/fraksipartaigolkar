'use client';

import React, { useState, useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, Cell
} from 'recharts';

const electionData = [
  { year: '1971', votes: 34348673, percentage: 62.80, seats: 236, rank: 1, era: 'Orde Baru' },
  { year: '1977', votes: 39750096, percentage: 62.11, seats: 232, rank: 1, era: 'Orde Baru' },
  { year: '1982', votes: 48334724, percentage: 64.34, seats: 242, rank: 1, era: 'Orde Baru' },
  { year: '1987', votes: 62783680, percentage: 73.11, seats: 299, rank: 1, era: 'Orde Baru' },
  { year: '1992', votes: 66599331, percentage: 68.10, seats: 282, rank: 1, era: 'Orde Baru' },
  { year: '1997', votes: 84187907, percentage: 74.51, seats: 325, rank: 1, era: 'Orde Baru' },
  { year: '1999', votes: 23741749, percentage: 22.46, seats: 120, rank: 2, era: 'Reformasi' },
  { year: '2004', votes: 24480757, percentage: 21.58, seats: 129, rank: 1, era: 'Reformasi' },
  { year: '2009', votes: 15037757, percentage: 14.45, seats: 106, rank: 2, era: 'Reformasi' },
  { year: '2014', votes: 18432312, percentage: 14.75, seats: 91, rank: 2, era: 'Reformasi' },
  { year: '2019', votes: 17229789, percentage: 12.31, seats: 85, rank: 3, era: 'Reformasi' },
  { year: '2024', votes: 23208654, percentage: 15.72, seats: 102, rank: 2, era: 'Reformasi' },
];

const provincialResults2024 = [
  { province: "Aceh", votes: 341855, seats: 3, status: "Kuat" },
  { province: "Sumatera Utara", votes: 1712015, seats: 8, status: "Pemenang" },
  { province: "Sumatera Barat", votes: 457855, seats: 3, status: "Kuat" },
  { province: "Riau", votes: 821455, seats: 3, status: "Stabil" },
  { province: "Jambi", votes: 367120, seats: 2, status: "Stabil" },
  { province: "Sumatera Selatan", votes: 1005621, seats: 4, status: "Basis Kuat" },
  { province: "Bengkulu", votes: 324563, seats: 1, status: "Pemenang" },
  { province: "Lampung", votes: 1102455, seats: 5, status: "Stabil" },
  { province: "Kepulauan Riau", votes: 166147, seats: 1, status: "Pemenang" },
  { province: "Bangka Belitung", votes: 115549, seats: 1, status: "Stabil" },
  { province: "DKI Jakarta", votes: 641460, seats: 3, status: "Meningkat" },
  { province: "Jawa Barat", votes: 3590621, seats: 17, status: "Pemenang" },
  { province: "Jawa Tengah", votes: 2251692, seats: 12, status: "Stabil" },
  { province: "DI Yogyakarta", votes: 256811, seats: 1, status: "Stabil" },
  { province: "Jawa Timur", votes: 2572407, seats: 13, status: "Naik" },
  { province: "Banten", votes: 1118524, seats: 5, status: "Naik" },
  { province: "Bali", votes: 333521, seats: 1, status: "Meningkat" },
  { province: "Nusa Tenggara Barat", votes: 330261, seats: 1, status: "Stabil" },
  { province: "Nusa Tenggara Timur", votes: 531238, seats: 3, status: "Kuat" },
  { province: "Kalimantan Barat", votes: 752100, seats: 3, status: "Naik" },
  { province: "Kalimantan Tengah", votes: 193871, seats: 1, status: "Meningkat" },
  { province: "Kalimantan Selatan", votes: 541004, seats: 3, status: "Pemenang" },
  { province: "Kalimantan Timur", votes: 538147, seats: 2, status: "Pemenang" },
  { province: "Kalimantan Utara", votes: 54228, seats: 0, status: "Penurunan" },
  { province: "Sulawesi Utara", votes: 213197, seats: 1, status: "Stabil" },
  { province: "Sulawesi Tengah", votes: 330554, seats: 1, status: "Pemenang" },
  { province: "Sulawesi Selatan", votes: 1412474, seats: 7, status: "Basis Kuat" },
  { province: "Sulawesi Tenggara", votes: 213233, seats: 1, status: "Stabil" },
  { province: "Gorontalo", votes: 163074, seats: 1, status: "Pemenang" },
  { province: "Sulawesi Barat", votes: 104271, seats: 0, status: "Penurunan" },
  { province: "Maluku", votes: 112100, seats: 0, status: "Penurunan" },
  { province: "Maluku Utara", votes: 125132, seats: 1, status: "Meningkat" },
  { province: "Papua", votes: 254121, seats: 1, status: "Pemenang" },
  { province: "Papua Barat", votes: 94101, seats: 1, status: "Pemenang" },
  { province: "Papua Selatan", votes: 102450, seats: 0, status: "Penurunan" },
  { province: "Papua Tengah", votes: 421312, seats: 1, status: "Pemenang" },
  { province: "Papua Pegunungan", votes: 241512, seats: 0, status: "Penurunan" },
  { province: "Papua Barat Daya", votes: 91201, seats: 1, status: "Pemenang" },
];

const dapilData = [
  { province: "Aceh", dapil: "Aceh I", electorate: 1964576, seats: 7 },
  { province: "Aceh", dapil: "Aceh II", electorate: 1777461, seats: 6 },
  { province: "Sumatera Utara", dapil: "Sumatera Utara I", electorate: 3895322, seats: 10 },
  { province: "Sumatera Utara", dapil: "Sumatera Utara II", electorate: 3438838, seats: 10 },
  { province: "Sumatera Utara", dapil: "Sumatera Utara III", electorate: 3519780, seats: 10 },
  { province: "Sumatera Barat", dapil: "Sumatera Barat I", electorate: 2298162, seats: 8 },
  { province: "Sumatera Barat", dapil: "Sumatera Barat II", electorate: 1790444, seats: 6 },
  { province: "Riau", dapil: "Riau I", electorate: 2763848, seats: 7 },
  { province: "Riau", dapil: "Riau II", electorate: 1968326, seats: 6 },
  { province: "Jambi", dapil: "Jambi", electorate: 2676107, seats: 8 },
  { province: "Sumatera Selatan", dapil: "Sumatera Selatan I", electorate: 2261058, seats: 8 },
  { province: "Sumatera Selatan", dapil: "Sumatera Selatan II", electorate: 2277166, seats: 9 },
  { province: "Bengkulu", dapil: "Bengkulu", electorate: 1494000, seats: 4 },
  { province: "Lampung", dapil: "Lampung I", electorate: 2656346, seats: 10 },
  { province: "Lampung", dapil: "Lampung II", electorate: 2465324, seats: 10 },
  { province: "Kepulauan Bangka Belitung", dapil: "Bangka Belitung", electorate: 1067000, seats: 3 },
  { province: "Kepulauan Riau", dapil: "Kepulauan Riau", electorate: 1500974, seats: 4 },
  { province: "DKI Jakarta", dapil: "DKI Jakarta I", electorate: 2125000, seats: 6 },
  { province: "DKI Jakarta", dapil: "DKI Jakarta II", electorate: 2450000, seats: 7 },
  { province: "DKI Jakarta", dapil: "DKI Jakarta III", electorate: 2800000, seats: 8 },
  { province: "Jawa Barat", dapil: "Jawa Barat I", electorate: 1704764, seats: 7 },
  { province: "Jawa Barat", dapil: "Jawa Barat II", electorate: 2322238, seats: 10 },
  { province: "Jawa Barat", dapil: "Jawa Barat III", electorate: 2090000, seats: 9 },
  { province: "Jawa Barat", dapil: "Jawa Barat IV", electorate: 1400000, seats: 6 },
  { province: "Jawa Barat", dapil: "Jawa Barat V", electorate: 2100000, seats: 9 },
  { province: "Jawa Barat", dapil: "Jawa Barat VI", electorate: 1420000, seats: 6 },
  { province: "Jawa Barat", dapil: "Jawa Barat VII", electorate: 2350000, seats: 10 },
  { province: "Jawa Barat", dapil: "Jawa Barat VIII", electorate: 2110000, seats: 9 },
  { province: "Jawa Barat", dapil: "Jawa Barat IX", electorate: 1870000, seats: 8 },
  { province: "Jawa Barat", dapil: "Jawa Barat X", electorate: 1640000, seats: 7 },
  { province: "Jawa Barat", dapil: "Jawa Barat XI", electorate: 2330000, seats: 10 },
  { province: "Jawa Tengah", dapil: "Jawa Tengah I", electorate: 1572120, seats: 8 },
  { province: "Jawa Tengah", dapil: "Jawa Tengah II", electorate: 1650000, seats: 7 },
  { province: "Jawa Tengah", dapil: "Jawa Tengah III", electorate: 2120000, seats: 9 },
  { province: "Jawa Tengah", dapil: "Jawa Tengah IV", electorate: 1640000, seats: 7 },
  { province: "Jawa Tengah", dapil: "Jawa Tengah V", electorate: 1880000, seats: 8 },
  { province: "Jawa Tengah", dapil: "Jawa Tengah VI", electorate: 1875000, seats: 8 },
  { province: "Jawa Tengah", dapil: "Jawa Tengah VII", electorate: 1645000, seats: 7 },
  { province: "Jawa Tengah", dapil: "Jawa Tengah VIII", electorate: 1890000, seats: 8 },
  { province: "Jawa Tengah", dapil: "Jawa Tengah IX", electorate: 1885000, seats: 8 },
  { province: "Jawa Tengah", dapil: "Jawa Tengah X", electorate: 1630000, seats: 7 },
  { province: "DI Yogyakarta", dapil: "DI Yogyakarta", electorate: 2870000, seats: 8 },
  { province: "Jawa Timur", dapil: "Jawa Timur I", electorate: 2154422, seats: 10 },
  { province: "Jawa Timur", dapil: "Jawa Timur II", electorate: 1650000, seats: 7 },
  { province: "Jawa Timur", dapil: "Jawa Timur III", electorate: 1640000, seats: 7 },
  { province: "Jawa Timur", dapil: "Jawa Timur IV", electorate: 1880000, seats: 8 },
  { province: "Jawa Timur", dapil: "Jawa Timur V", electorate: 1870000, seats: 8 },
  { province: "Jawa Timur", dapil: "Jawa Timur VI", electorate: 2100000, seats: 9 },
  { province: "Jawa Timur", dapil: "Jawa Timur VII", electorate: 1890000, seats: 8 },
  { province: "Jawa Timur", dapil: "Jawa Timur VIII", electorate: 2350000, seats: 10 },
  { province: "Jawa Timur", dapil: "Jawa Timur IX", electorate: 1410000, seats: 6 },
  { province: "Jawa Timur", dapil: "Jawa Timur X", electorate: 1420000, seats: 6 },
  { province: "Jawa Timur", dapil: "Jawa Timur XI", electorate: 1885000, seats: 8 },
  { province: "Banten", dapil: "Banten I", electorate: 1420000, seats: 6 },
  { province: "Banten", dapil: "Banten II", electorate: 1410000, seats: 6 },
  { province: "Banten", dapil: "Banten III", electorate: 2350000, seats: 10 },
  { province: "Bali", dapil: "Bali", electorate: 3260000, seats: 9 },
  { province: "Nusa Tenggara Barat", dapil: "NTB I", electorate: 1050000, seats: 3 },
  { province: "Nusa Tenggara Barat", dapil: "NTB II", electorate: 2800000, seats: 8 },
  { province: "Nusa Tenggara Timur", dapil: "NTT I", electorate: 2120000, seats: 6 },
  { province: "Nusa Tenggara Timur", dapil: "NTT II", electorate: 2470000, seats: 7 },
  { province: "Kalimantan Barat", dapil: "Kalimantan Barat I", electorate: 2800000, seats: 8 },
  { province: "Kalimantan Barat", dapil: "Kalimantan Barat II", electorate: 1400000, seats: 4 },
  { province: "Kalimantan Tengah", dapil: "Kalimantan Tengah", electorate: 1900000, seats: 6 },
  { province: "Kalimantan Selatan", dapil: "Kalimantan Selatan I", electorate: 2100000, seats: 6 },
  { province: "Kalimantan Selatan", dapil: "Kalimantan Selatan II", electorate: 1750000, seats: 5 },
  { province: "Kalimantan Timur", dapil: "Kalimantan Timur", electorate: 2750000, seats: 8 },
  { province: "Kalimantan Utara", dapil: "Kalimantan Utara", electorate: 504000, seats: 3 },
  { province: "Sulawesi Utara", dapil: "Sulawesi Utara", electorate: 1980000, seats: 6 },
  { province: "Gorontalo", dapil: "Gorontalo", electorate: 880000, seats: 3 },
  { province: "Sulawesi Tengah", dapil: "Sulawesi Tengah", electorate: 2230000, seats: 7 },
  { province: "Sulawesi Selatan", dapil: "Sulawesi Selatan I", electorate: 2365769, seats: 8 },
  { province: "Sulawesi Selatan", dapil: "Sulawesi Selatan II", electorate: 2600000, seats: 9 },
  { province: "Sulawesi Selatan", dapil: "Sulawesi Selatan III", electorate: 2050000, seats: 7 },
  { province: "Sulawesi Tenggara", dapil: "Sulawesi Tenggara", electorate: 1800000, seats: 6 },
  { province: "Sulawesi Barat", dapil: "Sulawesi Barat", electorate: 980000, seats: 4 },
  { province: "Maluku", dapil: "Maluku", electorate: 1300000, seats: 4 },
  { province: "Maluku Utara", dapil: "Maluku Utara", electorate: 950000, seats: 3 },
  { province: "Papua", dapil: "Papua", electorate: 720000, seats: 3 },
  { province: "Papua Barat", dapil: "Papua Barat", electorate: 380000, seats: 3 },
  { province: "Papua Selatan", dapil: "Papua Selatan", electorate: 350000, seats: 3 },
  { province: "Papua Tengah", dapil: "Papua Tengah", electorate: 1100000, seats: 3 },
  { province: "Papua Pegunungan", dapil: "Papua Pegunungan", electorate: 1300000, seats: 3 },
  { province: "Papua Barat Daya", dapil: "Papua Barat Daya", electorate: 440000, seats: 3 },
];

const ElectionTrend = () => {
  const [activeTab, setActiveTab] = useState('history');
  const [viewType, setViewType] = useState('percentage');
  const [searchTerm, setSearchTerm] = useState('');
  const [provSearch, setProvSearch] = useState('');

  const filteredDapil = useMemo(() => {
    return dapilData.filter(d => 
      d.province.toLowerCase().includes(searchTerm.toLowerCase()) || 
      d.dapil.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const filteredProvincial = useMemo(() => {
    return provincialResults2024.filter(p => 
      p.province.toLowerCase().includes(provSearch.toLowerCase())
    ).sort((a, b) => b.votes - a.votes);
  }, [provSearch]);

  const formatMillions = (value: number) => {
    return (value / 1000000).toFixed(1) + ' jt';
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border border-yellow-400 rounded-lg shadow-lg">
          <p className="font-bold text-gray-800 border-b pb-1 mb-2">{label}</p>
          {data.votes && (
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-yellow-600">Suara:</span> {data.votes.toLocaleString('id-ID')}
            </p>
          )}
          {data.percentage && (
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-yellow-600">Persentase:</span> {data.percentage}%
            </p>
          )}
          {data.seats !== undefined && (
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-yellow-600">Kursi:</span> {data.seats}
            </p>
          )}
          {data.status && (
            <p className="text-xs mt-1 text-green-600 font-bold uppercase italic">{data.status}</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-yellow-400 p-6 rounded-t-2xl shadow-sm">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
            <div className="bg-white p-2 rounded-lg shadow-inner text-yellow-600">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M3 3v18h18M18 17l-6-6-4 4-5-5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            Data Strategis Partai Golkar
          </h1>
          <div className="flex flex-wrap gap-4 mt-4">
            {[
              { id: 'history', label: 'Tren Historis Nasional' },
              { id: 'provincial2024', label: 'Hasil 2024 per Provinsi' },
              { id: 'dapil', label: 'Elektorat & Dapil 2024' }
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-2 px-1 text-sm font-bold border-b-2 transition-all ${activeTab === tab.id ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-700 opacity-60'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white shadow-md rounded-b-2xl overflow-hidden">
          {activeTab === 'history' && (
            <div className="p-6">
              <div className="p-4 border-b flex flex-wrap gap-4 items-center justify-between bg-gray-50/50 mb-6 rounded-xl">
                <div className="flex bg-gray-200 p-1 rounded-xl">
                  {['percentage', 'votes'].map(type => (
                    <button 
                      key={type}
                      onClick={() => setViewType(type)}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${viewType === type ? 'bg-yellow-400 text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      {type === 'percentage' ? 'Persentase (%)' : 'Jumlah Suara'}
                    </button>
                  ))}
                </div>
                <div className="flex gap-4 text-xs font-medium text-gray-500">
                  <div className="flex items-center gap-1"><div className="w-3 h-3 bg-yellow-500 rounded-full"></div> Orde Baru</div>
                  <div className="flex items-center gap-1"><div className="w-3 h-3 bg-blue-500 rounded-full"></div> Reformasi</div>
                </div>
              </div>

              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  {viewType === 'percentage' ? (
                    <AreaChart data={electionData}>
                      <defs>
                        <linearGradient id="colorPerc" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#facc15" stopOpacity={0.8}/><stop offset="95%" stopColor="#facc15" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                      <XAxis dataKey="year" />
                      <YAxis unit="%" />
                      <Tooltip content={<CustomTooltip />} />
                      <Area type="monotone" dataKey="percentage" stroke="#eab308" fillOpacity={1} fill="url(#colorPerc)" strokeWidth={3} />
                    </AreaChart>
                  ) : (
                    <BarChart data={electionData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                      <XAxis dataKey="year" />
                      <YAxis tickFormatter={formatMillions} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="votes" radius={[4, 4, 0, 0]}>
                        {electionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.era === 'Orde Baru' ? '#eab308' : '#3b82f6'} />
                        ))}
                      </Bar>
                    </BarChart>
                  )}
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeTab === 'provincial2024' && (
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Perolehan Suara Golkar per Provinsi (Pemilu 2024)</h2>
                    <p className="text-sm text-gray-500">Data berdasarkan hasil rekapitulasi nasional DPR RI. Total: 38 Provinsi.</p>
                </div>
                <div className="relative w-full md:w-64">
                  <input 
                    type="text" placeholder="Cari Provinsi..." value={provSearch}
                    onChange={(e) => setProvSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  <svg className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
              </div>
              
              <div className="w-full mb-2 overflow-y-auto border border-gray-100 rounded-xl shadow-inner custom-scrollbar" style={{ maxHeight: '550px' }}>
                <div style={{ height: Math.max(450, filteredProvincial.length * 40), minWidth: '500px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={filteredProvincial} layout="vertical" margin={{ top: 20, left: 20, right: 30, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                      <XAxis type="number" tickFormatter={formatMillions} />
                      <YAxis dataKey="province" type="category" width={140} tick={{fontSize: 12}} interval={0} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="votes" name="Suara Sah" fill="#eab308" radius={[0, 4, 4, 0]} barSize={24}>
                        {filteredProvincial.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={
                              entry.status === "Pemenang" ? "#ca8a04" : 
                              entry.status === "Basis Kuat" ? "#a16207" : "#eab308"
                          } />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <p className="text-center text-xs text-gray-400 mb-6">*Grafik menampilkan seluruh {filteredProvincial.length} provinsi sesuai filter pencarian (scroll ke bawah untuk melihat provinsi lainnya).</p>

               <div className="overflow-x-auto rounded-xl border max-h-[400px] overflow-y-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-xs font-bold uppercase text-gray-600 sticky top-0">
                    <tr>
                        <th className="px-6 py-4">Provinsi</th>
                        <th className="px-6 py-4 text-right">Suara Sah</th>
                        <th className="px-6 py-4 text-center">Kursi</th>
                        <th className="px-6 py-4">Status Kinerja</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y text-sm">
                    {filteredProvincial.map((d, i) => (
                      <tr key={i} className="hover:bg-yellow-50 transition-colors">
                        <td className="px-6 py-4 font-semibold">{d.province}</td>
                        <td className="px-6 py-4 text-right font-mono">{d.votes.toLocaleString('id-ID')}</td>
                        <td className="px-6 py-4 text-center">
                            {d.seats > 0 ? (
                                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-bold">{d.seats}</span>
                            ) : (
                                <span className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-semibold">0</span>
                            )}
                        </td>
                        <td className="px-6 py-4">
                            <span className={`text-xs font-bold px-2 py-1 rounded uppercase ${
                                d.status === 'Pemenang' ? 'text-yellow-800 bg-yellow-200' :
                                d.status === 'Basis Kuat' ? 'text-amber-800 bg-amber-200' :
                                d.status === 'Naik' || d.status === 'Meningkat' ? 'text-green-800 bg-green-200' :
                                d.status === 'Penurunan' ? 'text-red-800 bg-red-200' :
                                'text-gray-800 bg-gray-200'
                            }`}>
                                {d.status}
                            </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'dapil' && (
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between">
                <h2 className="text-lg font-bold text-gray-800">Cari Data Elektorat Dapil</h2>
                <div className="relative w-full md:w-72">
                  <input 
                    type="text" placeholder="Provinsi atau Dapil..." value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  <svg className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
              </div>
              <div className="overflow-x-auto rounded-xl border">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-xs font-bold uppercase text-gray-600">
                    <tr><th className="px-6 py-4">Provinsi</th><th className="px-6 py-4">Nama Dapil</th><th className="px-6 py-4 text-right">DPT</th><th className="px-6 py-4 text-center">Kursi</th></tr>
                  </thead>
                  <tbody className="divide-y text-sm">
                    {filteredDapil.map((d, i) => (
                      <tr key={i} className="hover:bg-yellow-50 transition-colors">
                        <td className="px-6 py-4 font-semibold">{d.province}</td>
                        <td className="px-6 py-4 text-gray-600">{d.dapil}</td>
                        <td className="px-6 py-4 text-right font-mono">{d.electorate.toLocaleString('id-ID')}</td>
                        <td className="px-6 py-4 text-center"><span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-bold">{d.seats}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200 flex items-start gap-3 shadow-sm">
                <svg className="w-5 h-5 text-yellow-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Daftar di atas memuat seluruh <strong>84 Daerah Pemilihan (Dapil)</strong> di 38 Provinsi untuk pemilihan anggota DPR RI pada Pemilu 2024. Total keseluruhan adalah <strong>580 kursi</strong>. <br/>
                  <em>*Catatan: Angka Elektorat (DPT) pada beberapa Dapil menggunakan estimasi proporsional berdasarkan jumlah kursi untuk keperluan visualisasi dashboard ini.</em>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ElectionTrend;
