'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Member } from '@/types/member';

// --- DATA STATIS PEMETAAN (Didefinisikan lokal agar tidak error import) ---

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

// Helper cerdas untuk menormalisasi semua variasi nama Dapil agar 100% cocok
const normalizeDapil = (d: string) => {
  if (!d) return '';
  let s = d.toUpperCase().trim().replace(/\s+/g, ' ');
  
  // Kamus Normalisasi (Singkatan -> Standar Internal)
  const replacers: [string | RegExp, string][] = [
      [/DAERAH ISTIMEWA YOGYAKARTA/g, 'DIY'],
      [/DI YOGYAKARTA/g, 'DIY'],
      [/NUSA TENGGARA BARAT/g, 'NTB'],
      [/NUSA TENGGARA TIMUR/g, 'NTT'],
      [/SUMATERA UTARA/g, 'SUMUT'],
      [/SUMATERA BARAT/g, 'SUMBAR'],
      [/SUMATERA SELATAN/g, 'SUMSEL'],
      [/JAWA BARAT/g, 'JABAR'],
      [/JAWA TENGAH/g, 'JATENG'],
      [/JAWA TIMUR/g, 'JATIM'],
      [/KALIMANTAN BARAT/g, 'KALBAR'],
      [/KALIMANTAN SELATAN/g, 'KALSEL'],
      [/KALIMANTAN TIMUR/g, 'KALTIM'],
      [/KALIMANTAN TENGAH/g, 'KALTENG'],
      [/KALIMANTAN UTARA/g, 'KALTARA'],
      [/SULAWESI UTARA/g, 'SULUT'],
      [/SULAWESI TENGAH/g, 'SULTENG'],
      [/SULAWESI SELATAN/g, 'SULSEL'],
      [/SULAWESI TENGGARA/g, 'SULTRA'],
      [/SULAWESI BARAT/g, 'SULBAR'],
      [/KEPULAUAN BANGKA BELITUNG/g, 'BABEL'],
      [/BANGKA BELITUNG/g, 'BABEL'],
      [/KEPULAUAN RIAU/g, 'KEPRI']
  ];
  
  replacers.forEach(([from, to]) => {
      s = s.replace(from, to as string);
  });
  return s;
};

const IndonesiaMap = ({ members = [] }: IndonesiaMapProps) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<any>(null);
  const markerGroupRef = useRef<any>(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [mapLevel, setMapLevel] = useState<'provinsi' | 'dapil'>('dapil');

  // Mengelompokkan anggota berdasarkan Dapil (sudah dinormalisasi)
  const membersByDapil = useMemo(() => {
    const grouped: Record<string, Member[]> = {};
    
    if (members && members.length > 0) {
      members.forEach((member) => {
        if (!member || !member.dapil) return; 
        
        const dapilKey = normalizeDapil(member.dapil);

        if (!grouped[dapilKey]) {
          grouped[dapilKey] = [];
        }
        grouped[dapilKey].push(member);
      });
      
      // Urutkan berdasarkan suara terbanyak per dapil
      Object.keys(grouped).forEach(key => {
          grouped[key].sort((a, b) => (Number(b.perolehan_suara) || 0) - (Number(a.perolehan_suara) || 0));
      });
    }
    
    return grouped;
  }, [members]);

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
        const map = L.map(mapRef.current).setView([-2.5, 118], 5);
        mapInstance.current = map;

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
  }, [mapLevel, isLoading, membersByDapil]);

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
            <div style="font-family: ui-sans-serif, system-ui, sans-serif; min-width: 200px;">
              <h3 style="margin: 0 0 5px 0; font-size: 16px; font-weight: bold; color: #334155; border-bottom: 2px solid #fde047; padding-bottom: 5px;">
                ${prov.province}
              </h3>
              <div style="display: flex; justify-content: space-between; margin-top: 8px;">
                <span style="color: #64748b; font-size: 12px;">Suara Sah:</span>
                <span style="font-weight: bold; color: #1e293b; font-size: 13px;">${prov.votes.toLocaleString('id-ID')}</span>
              </div>
              <div style="display: flex; justify-content: space-between; margin-top: 4px;">
                <span style="color: #64748b; font-size: 12px;">Kursi DPR RI:</span>
                <span style="font-weight: bold; background: #fef08a; color: #854d0e; padding: 2px 8px; border-radius: 12px; font-size: 12px;">${prov.seats}</span>
              </div>
              <div style="margin-top: 10px; font-size: 11px; text-transform: uppercase; font-weight: bold; color: ${fillColor};">
                STATUS: ${prov.status}
              </div>
            </div>
          `);
          
          circle.on('mouseover', function (this: any) { this.openPopup(); });
        }
      });
    } else {
      dapilData.forEach((dapil: any) => {
        if (dapil.coords) {
          // Normalisasi nama dapil pada master koordinat juga
          const dapilKey = normalizeDapil(dapil.dapil);
          
          // Cari list member berdasarkan dapilKey yang sudah dinormalisasi
          const membersList = membersByDapil[dapilKey] || [];

          const golkarSeats = membersList.length;
          const calegVotes = membersList.reduce((sum: number, m: Member) => sum + (Number(m.perolehan_suara) || 0), 0);
          
          let fillColor = "#ef4444"; // Merah (Kosong/0 Kursi)
          let statusLabel = "Kosong (Tidak Ada Wakil)";

          if (golkarSeats === 1) {
              fillColor = "#15803d"; // Hijau (1 Kursi)
              statusLabel = "Pemenang (1 Kursi)";
          } else if (golkarSeats > 1) {
              fillColor = "#14532d"; // Hijau Tua (>1 Kursi)
              statusLabel = `Basis Kuat (${golkarSeats} Kursi)`;
          }
          
          const radiusSize = golkarSeats > 0 ? Math.max(8, Math.min(20, calegVotes / 30000)) : 6;

          const circle = L.circleMarker(dapil.coords, {
            color: '#ffffff', weight: 1.5, fillColor: fillColor, fillOpacity: 0.85, radius: radiusSize
          }).addTo(markerGroupRef.current);

          let membersHTML = '';
          if (membersList.length > 0) {
            membersHTML = `
              <div style="margin-top: 12px; border-top: 1px dashed #cbd5e1; padding-top: 8px;">
                <div style="font-size: 10px; font-weight: bold; color: #64748b; margin-bottom: 6px;">DATA ANGGOTA TERPILIH:</div>
                ${membersList.map((m: Member) => {
                  return `
                  <div style="margin-bottom: 6px; background: #f8fafc; padding: 6px; border-radius: 6px; border-left: 3px solid ${fillColor}; transition: background 0.2s;">
                    <div style="font-weight: bold; color: #0f172a; font-size: 13px; margin-bottom: 2px;">${m.name}</div>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                          <span style="display: inline-block; background: #e2e8f0; color: #475569; font-size: 9px; padding: 2px 6px; border-radius: 4px; font-weight: bold;">${m.komisi || '-'}</span>
                          <span style="color: ${fillColor}; font-size: 11px; font-weight: 700; margin-left: 4px;">${(Number(m.perolehan_suara) || 0).toLocaleString('id-ID')} Suara</span>
                        </div>
                        <a href="/anggota/${m.slug}" style="text-decoration: none; background: ${fillColor}; color: white; padding: 4px 8px; border-radius: 4px; font-size: 10px; font-weight: bold; display: inline-flex; align-items: center; gap: 4px;">
                          Profil ↗
                        </a>
                    </div>
                  </div>
                `}).join('')}
              </div>
            `;
          } else {
             membersHTML = `<div style="margin-top: 10px; font-size: 11px; color: #b91c1c; font-style: italic; background: #fef2f2; padding: 6px; border-radius: 4px; border-left: 2px solid #ef4444;">(Tidak ada perwakilan Partai Golkar yang lolos dari Dapil ini)</div>`;
          }

          circle.bindPopup(`
            <div style="font-family: ui-sans-serif, system-ui, sans-serif; min-width: 250px; max-height: 320px; overflow-y: auto;">
              <h3 style="margin: 0 0 5px 0; font-size: 15px; font-weight: bold; color: ${fillColor === '#ef4444' ? '#b91c1c' : '#14532d'}; border-bottom: 2px solid ${fillColor === '#ef4444' ? '#fecaca' : '#bbf7d0'}; padding-bottom: 5px;">
                ${dapil.dapil}
              </h3>
              <p style="margin: 0 0 10px 0; font-size: 11px; color: #64748b; text-transform: uppercase;">
                ${dapil.province}
              </p>
              <div style="display: flex; justify-content: space-between; margin-top: 4px;">
                <span style="color: #64748b; font-size: 12px;">Total Kursi Dapil:</span>
                <span style="font-weight: bold; background: #f1f5f9; color: #475569; padding: 2px 8px; border-radius: 12px; font-size: 12px;">${dapil.seats} Kursi</span>
              </div>
              <div style="display: flex; justify-content: space-between; margin-top: 8px;">
                <span style="color: #64748b; font-size: 12px;">Status Golkar:</span>
                <span style="font-weight: bold; color: ${fillColor}; font-size: 12px;">${statusLabel}</span>
              </div>
              ${golkarSeats > 0 ? `
              <div style="display: flex; justify-content: space-between; margin-top: 4px;">
                <span style="color: #64748b; font-size: 12px;">Total Suara Caleg:</span>
                <span style="font-weight: bold; color: #0f172a; font-size: 13px;">${calegVotes.toLocaleString('id-ID')}</span>
              </div>
              ` : ''}
              ${membersHTML}
            </div>
          `);
          
          circle.on('mouseover', function (this: any) { this.openPopup(); });
        }
      });
    }
  };

  return (
    <div id="peta-dapil-container" className="w-full h-full flex flex-col font-sans">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">Peta Geospasial Golkar</h2>
          <p className="text-sm text-slate-500">Pemetaan Daerah Pemilihan & Anggota Terpilih</p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button 
            onClick={() => setMapLevel('provinsi')}
            className={`px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition-all ${mapLevel === 'provinsi' ? 'bg-yellow-400 text-yellow-900 shadow' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Tingkat Provinsi
          </button>
          <button 
            onClick={() => setMapLevel('dapil')}
            className={`px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition-all ${mapLevel === 'dapil' ? 'bg-green-700 text-white shadow' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Tingkat Dapil
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="mb-4 flex flex-wrap gap-4 text-xs font-bold text-slate-600 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
        <span className="text-slate-400 uppercase tracking-wider mr-2">Legenda Peta:</span>
        {mapLevel === 'provinsi' ? (
          <>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#ca8a04]"></div> Pemenang (Prov)</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#eab308]"></div> Stabil/Naik</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#ef4444]"></div> Penurunan</div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#14532d]"></div> Basis Kuat (&gt;1 Kursi)</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#15803d]"></div> Pemenang (1 Kursi)</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#ef4444]"></div> Kosong (0 Kursi)</div>
          </>
        )}
      </div>

      {/* Map Container */}
      <div className="relative w-full rounded-2xl border border-slate-200 overflow-hidden shadow-sm bg-slate-200 min-h-[400px] h-[50vh] md:h-[60vh] z-0">
        {isLoading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-50/80 backdrop-blur-sm">
            <div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mb-3"></div>
            <p className="text-sm text-slate-600 font-bold animate-pulse">Memuat Peta...</p>
          </div>
        )}
        <div ref={mapRef} className="w-full h-full outline-none"></div>
      </div>
      <p className="text-xs text-slate-400 mt-2">*Arahkan kursor ke lingkaran pada peta untuk melihat detail perwakilan.</p>
    </div>
  );
};

export default IndonesiaMap;