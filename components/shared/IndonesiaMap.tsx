'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Member } from '@/types/member';
import membersData from '@/lib/members.json'; // Langsung import fallback data dari JSON-nya

// --- DATA STATIS PEMETAAN ---

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

const provCoords = {
  "Aceh": [4.6951, 96.7494], "Sumatera Utara": [2.1154, 99.5451], "Sumatera Barat": [-0.7399, 100.8000],
  "Riau": [0.2933, 101.7068], "Jambi": [-1.6101, 103.6131], "Sumatera Selatan": [-3.3194, 104.0000],
  "Bengkulu": [-3.7928, 102.2608], "Lampung": [-4.5586, 105.4068], "Kepulauan Riau": [3.9456, 108.1429],
  "Bangka Belitung": [-2.7411, 106.4406], "DKI Jakarta": [-6.2088, 106.8456], "Jawa Barat": [-6.9204, 107.6046],
  "Jawa Tengah": [-7.1509, 110.1403], "DI Yogyakarta": [-7.7956, 110.3695], "Jawa Timur": [-7.9666, 112.3217],
  "Banten": [-6.4058, 106.0640], "Bali": [-8.4095, 115.1889], "Nusa Tenggara Barat": [-8.6529, 117.3616],
  "Nusa Tenggara Timur": [-8.6574, 121.0794], "Kalimantan Barat": [-0.2788, 111.4753], "Kalimantan Tengah": [-1.6815, 113.3824],
  "Kalimantan Selatan": [-3.0926, 115.2838], "Kalimantan Timur": [0.5387, 116.4194], "Kalimantan Utara": [3.0731, 116.0414],
  "Sulawesi Utara": [0.6247, 123.9750], "Gorontalo": [0.6999, 122.4467], "Sulawesi Tengah": [-1.4300, 121.4456],
  "Sulawesi Selatan": [-4.1449, 119.9071], "Sulawesi Tenggara": [-4.1449, 122.0700], "Sulawesi Barat": [-2.8441, 119.2321],
  "Maluku": [-3.2385, 130.1453], "Maluku Utara": [1.5709, 127.8088], "Papua": [-2.5, 140.0],
  "Papua Barat": [-1.3, 133.1], "Papua Selatan": [-8.0, 139.0], "Papua Tengah": [-4.0, 136.0],
  "Papua Pegunungan": [-4.0, 139.0], "Papua Barat Daya": [-1.0, 132.0]
};

const dapilData = [
  { province: "Aceh", dapil: "Aceh I", electorate: 1964576, seats: 7, coords: [5.55, 95.31] },
  { province: "Aceh", dapil: "Aceh II", electorate: 1777461, seats: 6, coords: [4.6, 97.5] },
  { province: "Sumatera Utara", dapil: "Sumatera Utara I", electorate: 3895322, seats: 10, coords: [3.59, 98.67] },
  { province: "Sumatera Utara", dapil: "Sumatera Utara II", electorate: 3438838, seats: 10, coords: [1.74, 98.78] },
  { province: "Sumatera Utara", dapil: "Sumatera Utara III", electorate: 3519780, seats: 10, coords: [2.96, 99.06] },
  { province: "Sumatera Barat", dapil: "Sumatera Barat I", electorate: 2298162, seats: 8, coords: [-0.9, 100.3] },
  { province: "Sumatera Barat", dapil: "Sumatera Barat II", electorate: 1790444, seats: 6, coords: [-0.2, 100.6] },
  { province: "Riau", dapil: "Riau I", electorate: 2763848, seats: 7, coords: [0.5, 101.4] },
  { province: "Riau", dapil: "Riau II", electorate: 1968326, seats: 6, coords: [-0.3, 102.3] },
  { province: "Jambi", dapil: "Jambi", electorate: 2676107, seats: 8, coords: [-1.6, 103.6] },
  { province: "Sumatera Selatan", dapil: "Sumatera Selatan I", electorate: 2261058, seats: 8, coords: [-2.9, 104.7] },
  { province: "Sumatera Selatan", dapil: "Sumatera Selatan II", electorate: 2277166, seats: 9, coords: [-3.8, 103.8] },
  { province: "Bengkulu", dapil: "Bengkulu", electorate: 1494000, seats: 4, coords: [-3.8, 102.2] },
  { province: "Lampung", dapil: "Lampung I", electorate: 2656346, seats: 10, coords: [-5.4, 105.2] },
  { province: "Lampung", dapil: "Lampung II", electorate: 2465324, seats: 10, coords: [-4.8, 104.8] },
  { province: "Kepulauan Bangka Belitung", dapil: "Bangka Belitung", electorate: 1067000, seats: 3, coords: [-2.1, 106.1] },
  { province: "Kepulauan Riau", dapil: "Kepulauan Riau", electorate: 1500974, seats: 4, coords: [0.9, 104.4] },
  { province: "DKI Jakarta", dapil: "DKI Jakarta I", electorate: 2125000, seats: 6, coords: [-6.2, 106.9] },
  { province: "DKI Jakarta", dapil: "DKI Jakarta II", electorate: 2450000, seats: 7, coords: [-6.25, 106.8] },
  { province: "DKI Jakarta", dapil: "DKI Jakarta III", electorate: 2800000, seats: 8, coords: [-6.1, 106.7] },
  { province: "Jawa Barat", dapil: "Jawa Barat I", electorate: 1704764, seats: 7, coords: [-6.9, 107.6] },
  { province: "Jawa Barat", dapil: "Jawa Barat II", electorate: 2322238, seats: 10, coords: [-7.0, 107.5] },
  { province: "Jawa Barat", dapil: "Jawa Barat III", electorate: 2090000, seats: 9, coords: [-6.5, 106.8] },
  { province: "Jawa Barat", dapil: "Jawa Barat IV", electorate: 1400000, seats: 6, coords: [-6.9, 106.9] },
  { province: "Jawa Barat", dapil: "Jawa Barat V", electorate: 2100000, seats: 9, coords: [-6.5, 106.6] },
  { province: "Jawa Barat", dapil: "Jawa Barat VI", electorate: 1420000, seats: 6, coords: [-6.3, 106.8] },
  { province: "Jawa Barat", dapil: "Jawa Barat VII", electorate: 2350000, seats: 10, coords: [-6.2, 107.2] },
  { province: "Jawa Barat", dapil: "Jawa Barat VIII", electorate: 2110000, seats: 9, coords: [-6.7, 108.5] },
  { province: "Jawa Barat", dapil: "Jawa Barat IX", electorate: 1870000, seats: 8, coords: [-6.5, 107.9] },
  { province: "Jawa Barat", dapil: "Jawa Barat X", electorate: 1640000, seats: 7, coords: [-7.3, 108.3] },
  { province: "Jawa Barat", dapil: "Jawa Barat XI", electorate: 2330000, seats: 10, coords: [-7.3, 107.9] },
  { province: "Jawa Tengah", dapil: "Jawa Tengah I", electorate: 1572120, seats: 8, coords: [-6.9, 110.4] },
  { province: "Jawa Tengah", dapil: "Jawa Tengah II", electorate: 1650000, seats: 7, coords: [-6.8, 110.8] },
  { province: "Jawa Tengah", dapil: "Jawa Tengah III", electorate: 2120000, seats: 9, coords: [-7.1, 111.0] },
  { province: "Jawa Tengah", dapil: "Jawa Tengah IV", electorate: 1640000, seats: 7, coords: [-7.8, 110.9] },
  { province: "Jawa Tengah", dapil: "Jawa Tengah V", electorate: 1880000, seats: 8, coords: [-7.5, 110.8] },
  { province: "Jawa Tengah", dapil: "Jawa Tengah VI", electorate: 1875000, seats: 8, coords: [-7.5, 110.2] },
  { province: "Jawa Tengah", dapil: "Jawa Tengah VII", electorate: 1645000, seats: 7, coords: [-7.3, 109.3] },
  { province: "Jawa Tengah", dapil: "Jawa Tengah VIII", electorate: 1890000, seats: 8, coords: [-7.4, 109.0] },
  { province: "Jawa Tengah", dapil: "Jawa Tengah IX", electorate: 1885000, seats: 8, coords: [-6.8, 109.0] },
  { province: "Jawa Tengah", dapil: "Jawa Tengah X", electorate: 1630000, seats: 7, coords: [-6.9, 109.6] },
  { province: "DI Yogyakarta", dapil: "DI Yogyakarta", electorate: 2870000, seats: 8, coords: [-7.8, 110.3] },
  { province: "Jawa Timur", dapil: "Jawa Timur I", electorate: 2154422, seats: 10, coords: [-7.2, 112.7] },
  { province: "Jawa Timur", dapil: "Jawa Timur II", electorate: 1650000, seats: 7, coords: [-7.6, 112.9] },
  { province: "Jawa Timur", dapil: "Jawa Timur III", electorate: 1640000, seats: 7, coords: [-8.1, 114.0] },
  { province: "Jawa Timur", dapil: "Jawa Timur IV", electorate: 1880000, seats: 8, coords: [-8.1, 113.2] },
  { province: "Jawa Timur", dapil: "Jawa Timur V", electorate: 1870000, seats: 8, coords: [-7.9, 112.6] },
  { province: "Jawa Timur", dapil: "Jawa Timur VI", electorate: 2100000, seats: 9, coords: [-8.0, 112.0] },
  { province: "Jawa Timur", dapil: "Jawa Timur VII", electorate: 1890000, seats: 8, coords: [-7.8, 111.4] },
  { province: "Jawa Timur", dapil: "Jawa Timur VIII", electorate: 2350000, seats: 10, coords: [-7.4, 112.0] },
  { province: "Jawa Timur", dapil: "Jawa Timur IX", electorate: 1410000, seats: 6, coords: [-7.1, 111.8] },
  { province: "Jawa Timur", dapil: "Jawa Timur X", electorate: 1420000, seats: 6, coords: [-7.1, 112.4] },
  { province: "Jawa Timur", dapil: "Jawa Timur XI", electorate: 1885000, seats: 8, coords: [-7.0, 113.8] },
  { province: "Banten", dapil: "Banten I", electorate: 1420000, seats: 6, coords: [-6.6, 105.6] },
  { province: "Banten", dapil: "Banten II", electorate: 1410000, seats: 6, coords: [-6.1, 106.1] },
  { province: "Banten", dapil: "Banten III", electorate: 2350000, seats: 10, coords: [-6.2, 106.6] },
  { province: "Bali", dapil: "Bali", electorate: 3260000, seats: 9, coords: [-8.4, 115.2] },
  { province: "Nusa Tenggara Barat", dapil: "Nusa Tenggara Barat I", electorate: 1050000, seats: 3, coords: [-8.4, 117.4] },
  { province: "Nusa Tenggara Barat", dapil: "Nusa Tenggara Barat II", electorate: 2800000, seats: 8, coords: [-8.6, 116.1] },
  { province: "Nusa Tenggara Timur", dapil: "Nusa Tenggara Timur I", electorate: 2120000, seats: 6, coords: [-8.6, 120.4] },
  { province: "Nusa Tenggara Timur", dapil: "Nusa Tenggara Timur II", electorate: 2470000, seats: 7, coords: [-9.8, 124.2] },
  { province: "Kalimantan Barat", dapil: "Kalimantan Barat I", electorate: 2800000, seats: 8, coords: [0.0, 109.3] },
  { province: "Kalimantan Barat", dapil: "Kalimantan Barat II", electorate: 1400000, seats: 4, coords: [0.3, 111.4] },
  { province: "Kalimantan Tengah", dapil: "Kalimantan Tengah", electorate: 1900000, seats: 6, coords: [-1.6, 113.3] },
  { province: "Kalimantan Selatan", dapil: "Kalimantan Selatan I", electorate: 2100000, seats: 6, coords: [-3.3, 114.5] },
  { province: "Kalimantan Selatan", dapil: "Kalimantan Selatan II", electorate: 1750000, seats: 5, coords: [-2.8, 115.3] },
  { province: "Kalimantan Timur", dapil: "Kalimantan Timur", electorate: 2750000, seats: 8, coords: [0.5, 116.4] },
  { province: "Kalimantan Utara", dapil: "Kalimantan Utara", electorate: 504000, seats: 3, coords: [3.0, 116.0] },
  { province: "Sulawesi Utara", dapil: "Sulawesi Utara", electorate: 1980000, seats: 6, coords: [1.4, 124.8] },
  { province: "Gorontalo", dapil: "Gorontalo", electorate: 880000, seats: 3, coords: [0.5, 122.0] },
  { province: "Sulawesi Tengah", dapil: "Sulawesi Tengah", electorate: 2230000, seats: 7, coords: [-1.4, 121.4] },
  { province: "Sulawesi Selatan", dapil: "Sulawesi Selatan I", electorate: 2365769, seats: 8, coords: [-5.1, 119.4] },
  { province: "Sulawesi Selatan", dapil: "Sulawesi Selatan II", electorate: 2600000, seats: 9, coords: [-4.0, 119.6] },
  { province: "Sulawesi Selatan", dapil: "Sulawesi Selatan III", electorate: 2050000, seats: 7, coords: [-3.0, 120.0] },
  { province: "Sulawesi Tenggara", dapil: "Sulawesi Tenggara", electorate: 1800000, seats: 6, coords: [-4.0, 122.0] },
  { province: "Sulawesi Barat", dapil: "Sulawesi Barat", electorate: 980000, seats: 4, coords: [-2.8, 119.2] },
  { province: "Maluku", dapil: "Maluku", electorate: 1300000, seats: 4, coords: [-3.2, 130.1] },
  { province: "Maluku Utara", dapil: "Maluku Utara", electorate: 950000, seats: 3, coords: [1.5, 127.8] },
  { province: "Papua", dapil: "Papua", electorate: 720000, seats: 3, coords: [-2.5, 140.0] },
  { province: "Papua Barat", dapil: "Papua Barat", electorate: 380000, seats: 3, coords: [-1.3, 133.1] },
  { province: "Papua Selatan", dapil: "Papua Selatan", electorate: 350000, seats: 3, coords: [-8.0, 139.0] },
  { province: "Papua Tengah", dapil: "Papua Tengah", electorate: 1100000, seats: 3, coords: [-4.0, 136.0] },
  { province: "Papua Pegunungan", dapil: "Papua Pegunungan", electorate: 1300000, seats: 3, coords: [-4.0, 139.0] },
  { province: "Papua Barat Daya", dapil: "Papua Barat Daya", electorate: 440000, seats: 3, coords: [-1.0, 132.0] }
];

// --- LOGIC KOMPONEN ---

interface IndonesiaMapProps {
  members?: Member[];
}

// Helper cerdas yang SANGAT FLEKSIBEL untuk mencocokkan string Dapil
const isDapilMatch = (masterDapil: string, memberDapil: string) => {
  if (!masterDapil || !memberDapil) return false;
  
  // Bersihkan semua spasi, strip, titik, dan ubah ke huruf kecil
  const cleanMaster = masterDapil.toLowerCase().replace(/[^a-z0-9]/g, '');
  let cleanMember = memberDapil.toLowerCase().replace(/[^a-z0-9]/g, '');

  // Translasi khusus singkatan yang sering dipakai di KPU/JSON
  const translations: Record<string, string> = {
    'diyogyakarta': 'daerahistimewayogyakarta',
    'diy': 'daerahistimewayogyakarta',
    'ntb': 'nusatenggarabarat',
    'ntt': 'nusatenggaratimur',
    'sumut': 'sumaterautara',
    'sumbar': 'sumaterabarat',
    'sumsel': 'sumateraselatan',
    'jabar': 'jawabarat',
    'jateng': 'jawatengah',
    'jatim': 'jawatimur',
    'kalbar': 'kalimantanbarat',
    'kalsel': 'kalimantanselatan',
    'kaltim': 'kalimantantimur',
    'kalteng': 'kalimantantengah',
    'kaltara': 'kalimantanutara',
    'sulut': 'sulawesiutara',
    'sulteng': 'sulawesitengah',
    'sulsel': 'sulawesiselatan',
    'sultra': 'sulawesitenggara',
    'sulbar': 'sulawesibarat',
    'babel': 'kepulauanbangkabelitung',
    'bangkabelitung': 'kepulauanbangkabelitung',
    'kepri': 'kepulauanriau',
    // Angka romawi vs angka biasa
    '1': 'i', '2': 'ii', '3': 'iii', '4': 'iv', '5': 'v', '6': 'vi', '7': 'vii', '8': 'viii', '9': 'ix', '10': 'x', '11': 'xi'
  };

  // Coba terjemahkan singkatan di string member
  Object.keys(translations).forEach(key => {
    // Ganti singkatan kalau ada di awal kata
    if (cleanMember.startsWith(key)) {
      cleanMember = cleanMember.replace(key, translations[key]);
    }
  });

  // Ganti angka biasa jadi romawi kalau ada di ujung (misal "jawabarat1" jadi "jawabarat i")
  Object.keys(translations).forEach(key => {
    if(key.length <= 2 && !isNaN(Number(key))) {
       if(cleanMember.endsWith(key)) {
          cleanMember = cleanMember.slice(0, -key.length) + translations[key];
       }
    }
  });

  // Pencocokan final: Apakah nama bersih master persis sama dengan nama bersih member?
  return cleanMaster === cleanMember;
};

// CSS Kustom untuk Scrollbar di dalam Popup Leaflet
const CustomPopupStyles = () => (
  <style dangerouslySetInnerHTML={{
    __html: `
      .custom-popup-scrollbar::-webkit-scrollbar {
        width: 6px;
      }
      .custom-popup-scrollbar::-webkit-scrollbar-track {
        background: transparent; 
      }
      .custom-popup-scrollbar::-webkit-scrollbar-thumb {
        background-color: #cbd5e1; 
        border-radius: 10px;
      }
      .custom-popup-scrollbar::-webkit-scrollbar-thumb:hover {
        background-color: #94a3b8; 
      }
      .leaflet-popup-content-wrapper {
        border-radius: 16px !important;
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1) !important;
        padding: 0 !important;
        overflow: hidden;
      }
      .leaflet-popup-content {
        margin: 16px !important;
        line-height: 1.5;
      }
      .leaflet-popup-close-button {
        color: #94a3b8 !important;
        padding: 8px 8px 0 0 !important;
      }
      .leaflet-popup-close-button:hover {
        color: #0f172a !important;
        background: transparent !important;
      }
    `
  }} />
);

const IndonesiaMap = ({ members = [] }: IndonesiaMapProps) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<any>(null);
  const markerGroupRef = useRef<any>(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [mapLevel, setMapLevel] = useState<'provinsi' | 'dapil'>('dapil');

  // Gunakan data dari props jika ada, atau fallback langsung ke import json jika tidak
  const activeMembers = members && members.length > 0 ? members : (membersData as Member[]);

  const provTotalSeats = useMemo(() => {
    const totals: Record<string, number> = {};
    dapilData.forEach((d: any) => {
      if(!totals[d.province]) totals[d.province] = 0;
      totals[d.province] += d.seats;
    });
    return totals;
  }, []);

  useEffect(() => {
    // Inject Leaflet CSS
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    // Inject Leaflet JS
    if (!document.getElementById('leaflet-js')) {
      const script = document.createElement('script');
      script.id = 'leaflet-js';
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.async = true;
      script.onload = initMap;
      document.head.appendChild(script);
    } else if ((window as any).L) {
      initMap();
    }

    function initMap() {
      setIsLoading(false);
      if (!mapInstance.current && mapRef.current) {
        const L = (window as any).L;
        const map = L.map(mapRef.current, {
          zoomControl: false // Kita bisa custom letak zoom control kalau perlu, atau matiin biar clean
        }).setView([-2.5, 118], 5);
        mapInstance.current = map;

        // Basemap modern dan bersih
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; OpenStreetMap contributors',
          subdomains: 'abcd',
          maxZoom: 20
        }).addTo(map);

        markerGroupRef.current = L.layerGroup().addTo(map);
      }
      updateMarkers();
    }

    return () => {
      if (mapInstance.current && !document.getElementById('peta-dapil-container')) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isLoading && (window as any).L && mapInstance.current) {
      updateMarkers();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapLevel, isLoading, activeMembers]);

  const updateMarkers = () => {
    const L = (window as any).L;
    if (!markerGroupRef.current) return;
    
    markerGroupRef.current.clearLayers();

    if (mapLevel === 'provinsi') {
      provincialResults2024.forEach((prov: any) => {
        const coords = (provCoords as any)[prov.province];
        if (coords) {
          let fillColor = "#eab308";
          if (prov.status === "Pemenang") fillColor = "#ca8a04";
          if (prov.status === "Basis Kuat") fillColor = "#a16207";
          if (prov.status === "Penurunan") fillColor = "#ef4444";
          
          const radiusSize = Math.max(6, Math.min(25, prov.votes / 150000));

          const circle = L.circleMarker(coords, {
            color: '#ffffff', weight: 2, fillColor: fillColor, fillOpacity: 0.8, radius: radiusSize
          }).addTo(markerGroupRef.current);

          circle.bindPopup(`
            <div style="font-family: inherit; min-width: 220px; padding: 2px;">
              <h3 style="margin: 0 0 10px 0; font-size: 16px; font-weight: 800; color: #0f172a; border-bottom: 2px solid ${fillColor}; padding-bottom: 8px;">
                ${prov.province}
              </h3>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px;">
                <span style="color: #64748b; font-size: 12px; font-weight: 600;">Suara Sah:</span>
                <span style="font-weight: 800; color: #1e293b; font-size: 13px;">${prov.votes.toLocaleString('id-ID')}</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 6px;">
                <span style="color: #64748b; font-size: 12px; font-weight: 600;">Kursi DPR RI:</span>
                <span style="font-weight: 800; background: #f8fafc; border: 1px solid #e2e8f0; color: #334155; padding: 2px 10px; border-radius: 12px; font-size: 12px;">${prov.seats}</span>
              </div>
              <div style="margin-top: 12px; padding-top: 8px; border-top: 1px dashed #e2e8f0; display: flex; align-items: center; justify-content: space-between;">
                <span style="font-size: 11px; font-weight: 600; color: #94a3b8;">STATUS</span>
                <span style="font-size: 11px; text-transform: uppercase; font-weight: 800; color: ${fillColor}; background: ${fillColor}15; padding: 4px 8px; border-radius: 6px;">
                  ${prov.status}
                </span>
              </div>
            </div>
          `);
          
          circle.on('mouseover', function (this: any) { this.openPopup(); });
        }
      });
    } else {
      // Loop ke MASTER DATA DAPIL kita (84 Dapil)
      dapilData.forEach((dapil: any) => {
        if (dapil.coords) {
          
          // FILTER MENGGUNAKAN FUZZY MATCHING KITA
          const membersList = activeMembers.filter((m: Member) => 
             isDapilMatch(dapil.dapil, m.dapil)
          );

          // Urutkan suara terbanyak di dalam list
          membersList.sort((a, b) => (Number(b.perolehan_suara) || 0) - (Number(a.perolehan_suara) || 0));

          const golkarSeats = membersList.length;
          const calegVotes = membersList.reduce((sum: number, m: Member) => sum + (Number(m.perolehan_suara) || 0), 0);
          
          let fillColor = "#ef4444"; // Merah (Kosong/0 Kursi)
          let statusLabel = "Tidak Ada Wakil";

          if (golkarSeats === 1) {
              fillColor = "#15803d"; // Hijau (1 Kursi)
              statusLabel = "Pemenang (1 Kursi)";
          } else if (golkarSeats > 1) {
              fillColor = "#14532d"; // Hijau Tua (>1 Kursi)
              statusLabel = `Basis Kuat (${golkarSeats} Kursi)`;
          }
          
          const radiusSize = golkarSeats > 0 ? Math.max(8, Math.min(22, calegVotes / 30000)) : 6;

          const circle = L.circleMarker(dapil.coords, {
            color: '#ffffff', weight: 2, fillColor: fillColor, fillOpacity: 0.85, radius: radiusSize
          }).addTo(markerGroupRef.current);

          let membersHTML = '';
          if (membersList.length > 0) {
            membersHTML = `
              <div style="margin-top: 14px;">
                <div style="font-size: 10px; font-weight: 800; color: #94a3b8; margin-bottom: 8px; letter-spacing: 0.05em; text-transform: uppercase;">
                  Anggota Terpilih (${golkarSeats})
                </div>
                <div class="custom-popup-scrollbar" style="max-height: 180px; overflow-y: auto; padding-right: 4px; display: flex; flex-direction: column; gap: 8px;">
                  ${membersList.map((m: Member) => {
                    return `
                    <div style="background: #f8fafc; border: 1px solid #f1f5f9; padding: 10px; border-radius: 10px; border-left: 4px solid ${fillColor};">
                      <div style="font-weight: 800; color: #0f172a; font-size: 13px; margin-bottom: 4px; line-height: 1.3;">${m.name}</div>
                      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                          <span style="display: inline-block; background: #e2e8f0; color: #475569; font-size: 10px; padding: 2px 6px; border-radius: 4px; font-weight: 700;">${m.komisi || 'Fraksi Golkar'}</span>
                          <span style="color: ${fillColor}; font-size: 11px; font-weight: 800;">${(Number(m.perolehan_suara) || 0).toLocaleString('id-ID')} Suara</span>
                      </div>
                      <a href="/anggota/${m.slug}" target="_blank" style="text-decoration: none; background: #ffffff; color: #0f172a; border: 1px solid #e2e8f0; padding: 6px 12px; border-radius: 6px; font-size: 11px; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 4px; box-shadow: 0 1px 2px rgba(0,0,0,0.05); transition: all 0.2s;">
                        Lihat Profil 
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </a>
                    </div>
                  `}).join('')}
                </div>
              </div>
            `;
          } else {
             membersHTML = `
              <div style="margin-top: 12px; font-size: 12px; color: #b91c1c; background: #fef2f2; padding: 10px; border-radius: 8px; border: 1px solid #fecaca; font-weight: 500; display: flex; align-items: center; gap: 8px;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                Belum ada perwakilan Golkar yang lolos dari Dapil ini.
              </div>`;
          }

          circle.bindPopup(`
            <div style="font-family: inherit; min-width: 260px; padding: 2px;">
              <div style="display: flex; align-items: center; gap: 8px; border-bottom: 2px solid ${fillColor === '#ef4444' ? '#fecaca' : '#bbf7d0'}; padding-bottom: 10px; margin-bottom: 12px;">
                <div style="width: 12px; height: 12px; border-radius: 50%; background: ${fillColor}; flex-shrink: 0;"></div>
                <div>
                  <h3 style="margin: 0; font-size: 16px; font-weight: 800; color: #0f172a; line-height: 1.2;">${dapil.dapil}</h3>
                  <p style="margin: 2px 0 0 0; font-size: 11px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em;">${dapil.province}</p>
                </div>
              </div>
              
              <div style="display: flex; gap: 8px; margin-bottom: 4px;">
                <div style="flex: 1; background: #f8fafc; padding: 8px; border-radius: 8px; border: 1px solid #f1f5f9;">
                  <div style="font-size: 10px; color: #64748b; font-weight: 600; margin-bottom: 2px;">Total Kursi</div>
                  <div style="font-size: 14px; font-weight: 800; color: #1e293b;">${dapil.seats}</div>
                </div>
                ${golkarSeats > 0 ? `
                <div style="flex: 1; background: ${fillColor}10; padding: 8px; border-radius: 8px; border: 1px solid ${fillColor}30;">
                  <div style="font-size: 10px; color: ${fillColor}; font-weight: 700; margin-bottom: 2px;">Suara Partai</div>
                  <div style="font-size: 14px; font-weight: 800; color: ${fillColor};">${formatMillions(calegVotes)}</div>
                </div>
                ` : `
                <div style="flex: 1; background: #fef2f2; padding: 8px; border-radius: 8px; border: 1px solid #fecaca;">
                  <div style="font-size: 10px; color: #ef4444; font-weight: 700; margin-bottom: 2px;">Status</div>
                  <div style="font-size: 13px; font-weight: 800; color: #ef4444;">Kosong</div>
                </div>
                `}
              </div>
              ${membersHTML}
            </div>
          `);
          
          circle.on('mouseover', function (this: any) { this.openPopup(); });
        }
      });
    }
  };

  // Helper formatting angka juta
  const formatMillions = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1).replace('.', ',') + ' Jt';
    if (num >= 1000) return (num / 1000).toFixed(1).replace('.', ',') + ' Rb';
    return num.toLocaleString('id-ID');
  }

  return (
    <div id="peta-dapil-container" className="w-full h-full flex flex-col font-sans relative">
      <CustomPopupStyles />
      
      {/* Header Info Terintegrasi di Luar Peta */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-4 gap-4 px-2">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Peta Geospasial
          </h2>
          <p className="text-sm font-medium text-slate-500 mt-1">
            Visualisasi interaktif sebaran kursi & kekuatan elektorat
          </p>
        </div>

        {/* Toggle Control dengan Desain Segmented Control yang lebih Sleek */}
        <div className="flex w-full sm:w-auto bg-slate-100/80 backdrop-blur-sm p-1.5 rounded-xl border border-slate-200/60 shadow-inner">
          <button 
            onClick={() => setMapLevel('provinsi')}
            className={`flex-1 sm:flex-none px-4 py-2.5 rounded-lg text-xs md:text-sm font-bold transition-all duration-300 ease-out whitespace-nowrap ${mapLevel === 'provinsi' ? 'bg-white text-slate-800 shadow-[0_2px_8px_rgba(0,0,0,0.08)]' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}
          >
            Tingkat Provinsi
          </button>
          <button 
            onClick={() => setMapLevel('dapil')}
            className={`flex-1 sm:flex-none px-4 py-2.5 rounded-lg text-xs md:text-sm font-bold transition-all duration-300 ease-out whitespace-nowrap ${mapLevel === 'dapil' ? 'bg-white text-slate-800 shadow-[0_2px_8px_rgba(0,0,0,0.08)]' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}
          >
            Tingkat Dapil
          </button>
        </div>
      </div>

      {/* Map Container Utama */}
      <div className="relative w-full rounded-3xl border border-slate-200 overflow-hidden shadow-sm bg-slate-100 min-h-[450px] h-[60vh] z-0 group">
        
        {isLoading && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/60 backdrop-blur-md">
            <div className="relative w-12 h-12 mb-4">
              <div className="absolute inset-0 border-4 border-yellow-200 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-yellow-500 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <p className="text-sm text-slate-700 font-bold tracking-wide animate-pulse">Menyiapkan Peta...</p>
          </div>
        )}

        <div ref={mapRef} className="w-full h-full outline-none z-0"></div>

        {/* Floating Legend Overlay (Modern Glassmorphism) */}
        {!isLoading && (
          <div className="absolute bottom-4 left-4 z-[400] bg-white/90 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-white/50 flex flex-col gap-2.5 transition-all w-fit pointer-events-none">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1">Legenda Peta</span>
            {mapLevel === 'provinsi' ? (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2.5"><div className="w-3.5 h-3.5 rounded-full bg-[#ca8a04] shadow-inner border border-white/40"></div> <span className="text-xs font-bold text-slate-700">Pemenang Kuat</span></div>
                <div className="flex items-center gap-2.5"><div className="w-3.5 h-3.5 rounded-full bg-[#eab308] shadow-inner border border-white/40"></div> <span className="text-xs font-bold text-slate-700">Stabil / Naik</span></div>
                <div className="flex items-center gap-2.5"><div className="w-3.5 h-3.5 rounded-full bg-[#ef4444] shadow-inner border border-white/40"></div> <span className="text-xs font-bold text-slate-700">Penurunan</span></div>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2.5"><div className="w-3.5 h-3.5 rounded-full bg-[#14532d] shadow-inner border border-white/40"></div> <span className="text-xs font-bold text-slate-700">Basis Kuat (&gt;1 Kursi)</span></div>
                <div className="flex items-center gap-2.5"><div className="w-3.5 h-3.5 rounded-full bg-[#15803d] shadow-inner border border-white/40"></div> <span className="text-xs font-bold text-slate-700">1 Kursi</span></div>
                <div className="flex items-center gap-2.5"><div className="w-3.5 h-3.5 rounded-full bg-[#ef4444] shadow-inner border border-white/40"></div> <span className="text-xs font-bold text-slate-700">0 Kursi (Kosong)</span></div>
              </div>
            )}
          </div>
        )}
        
        {/* Floating Instruction Hint */}
        {!isLoading && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[400] bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-white/10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <p className="text-[10px] text-white font-medium flex items-center gap-2">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>
              Arahkan kursor atau klik titik untuk melihat detail
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IndonesiaMap;