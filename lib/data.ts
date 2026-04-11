import membersData from './members.json';

// ============================================================================
// 1. DATA CALEG TERPILIH (102 KURS)
// ============================================================================
export const dprMembersData = membersData as any[];

// ============================================================================
// 2. HELPER GENERATOR & DATA FORMATTER
// ============================================================================
export const generateSlug = (name: string) => {
  if (!name) return '';
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

// Mengubah dprMembersData mentah menjadi format object yang lebih rapi,
// dan secara otomatis menyuntikkan fallback property 'bio' untuk SEO page.
export const MOCK_MEMBERS = dprMembersData.map((member, index) => ({
  ...member,
  id: index + 1,
  name: member.nama || member.name,
  slug: generateSlug(member.nama || member.name),
  // Menggunakan UI Avatars sebagai fallback otomatis apabila tidak ada gambar
  image: member.image || member.foto || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.nama || member.name || 'Anggota')}&background=e2e8f0&color=475569&size=400`,
  // Menyediakan properti bio default agar tidak TypeError pada saat build SSR metadata
  bio: `Profil lengkap ${member.nama || member.name}, Anggota DPR RI terpilih dari Fraksi Partai Golkar mewakili daerah pemilihan ${member.dapil}. Bertugas di ${member.komisi || 'DPR RI'}.`,
}));

// Fungsi Wajib untuk Halaman & Routing Next.js
export const getMembers = async () => {
  return MOCK_MEMBERS;
};

export const getMemberBySlug = async (slug: string) => {
  return MOCK_MEMBERS.find((member) => member.slug === slug) || null;
};

// ============================================================================
// 3. DATA DASHBOARD, KABINET & BERITA
// ============================================================================
export const KOMISI_LIST = ['Komisi I', 'Komisi II', 'Komisi III', 'Komisi IV', 'Komisi V', 'Komisi VI', 'Komisi VII', 'Komisi VIII', 'Komisi IX', 'Komisi X', 'Komisi XI', 'Komisi XII', 'Komisi XIII'];

export const MOCK_NEWS = [
  { id: 1, title: "Di Balik Stabilitas Indonesia, Ada Airlangga Hartarto dan Bahlil Lahadalia yang Bertarung di Tengah Krisis Global", date: "10 April 2026", tag: "Ekonomi Politik", url: "https://golkarpedia.com/di-balik-stabilitas-indonesia-ada-airlangga-hartarto-dan-bahlil-lahadalia-yang-bertarung-di-tengah-krisis-global/", image: "/1-14.jpg" },
  { id: 2, title: "Menteri ESDM Bahlil Lahadalia Ajak Warga Hemat Energi Mulai Dari Hal Sepele: Matikan Lampu!", date: "09 April 2026", tag: "Energi", url: "https://golkarpedia.com/menteri-esdm-bahlil-lahadalia-ajak-warga-hemat-energi-mulai-dari-hal-sepele-matikan-lampu/", image: "/1203-bahlil-lahadalia-esdm.jpg" },
  { id: 3, title: "Dari Konsolidasi Senyap ke Kemenangan Nyata, Legacy Ace Hasan Syadzily di Partai Golkar Jabar", date: "08 April 2026", tag: "Politik", url: "https://golkarpedia.com/dari-konsolidasi-senyap-ke-kemenangan-nyata-legacy-ace-hasan-syadzily-di-partai-golkar-jabar/", image: "/1-3.jpeg" },
  { id: 4, title: "Sarmuji Sentil Isu Jatuhkan Prabowo: Ibarat Kereta, Rakyat yang Akan Dirugikan", date: "07 April 2026", tag: "Nasional", url: "https://golkarpedia.com/sarmuji-sentil-isu-jatuhkan-prabowo-ibarat-kereta-rakyat-yang-akan-dirugikan/", image: "/0303-sekjen-golkar-sarmuji.jpg" },
  { id: 5, title: "Perang Global Guncang Industri, Menperin Agus Gumiwang Wanti-wanti Rantai Pasok Terganggu", date: "06 April 2026", tag: "Industri", url: "https://golkarpedia.com/perang-global-guncang-industri-menperin-agus-gumiwang-wanti-wanti-rantai-pasok-terganggu-inflasi-mengintai/", image: "/0203-agus-gumiwang-kartasasmita.jpg" },
  { id: 6, title: "Situasi Lebanon Mencekam, TNI Diperintahkan Masuk Bunker, Dave Laksono: Langkah Darurat Tepat", date: "05 April 2026", tag: "Pertahanan", url: "https://golkarpedia.com/situasi-lebanon-mencekam-tni-diperintahkan-masuk-bunker-dave-laksono-ini-langkah-darurat-yang-tepat/", image: "/0503-dave-laksono-dpr.jpg" },
  { id: 7, title: "Airlangga Hartarto Teken MoU Industri Perairan, RI Siap Jadi Pemain Baru Offshore Dunia", date: "04 April 2026", tag: "Ekonomi", url: "https://golkarpedia.com/airlangga-hartarto-teken-mou-industri-perairan-ri-siap-jadi-pemain-baru-offshore-dunia/", image: "/0603-airlangga-hartarto-menko.jpeg" },
  { id: 8, title: "Darah Prajurit RI Tumpah di Lebanon, Sari Yuliati Murka: Serangan Keji Tak Bisa Dibiarkan!", date: "03 April 2026", tag: "Internasional", url: "https://golkarpedia.com/darah-prajurit-ri-tumpah-di-lebanon-sari-yuliati-murka-ini-serangan-keji-yang-tak-bisa-dibiarkan/", image: "/7540d57a36f-9269-4c2f-aeb5-1761ba6e2bc2 (1).jpeg" }
];

export const TICKER_NEWS = [
  "EKONOMI: Di Balik Stabilitas Indonesia, Ada Airlangga & Bahlil yang Bertarung di Tengah Krisis Global",
  "NASIONAL: Sarmuji Sentil Isu Jatuhkan Prabowo: Ibarat Kereta, Rakyat yang Akan Dirugikan",
  "INTERNASIONAL: Situasi Lebanon Mencekam, Dave Laksono & Sari Yuliati Kecam Serangan Terhadap Pasukan Perdamaian",
  "INDUSTRI: Menperin Wanti-wanti Rantai Pasok Terganggu, Airlangga Teken MoU Industri Perairan Offshore"
];

export const VIP_ROSTER = [
  { role: "Ketua Fraksi", name: "M. Sarmuji", dapil: "Jawa Timur VI", img: "/0303-sekjen-golkar-sarmuji.jpg" },
  { role: "Sekretaris Fraksi", name: "Sari Yuliati", dapil: "Nusa Tenggara Barat II", img: "/7540d57a36f-9269-4c2f-aeb5-1761ba6e2bc2 (1).jpeg" },
  { role: "Bendahara Fraksi", name: "Puteri Anneta Komaruddin", dapil: "Jawa Barat VII", img: "https://ui-avatars.com/api/?name=Puteri+Anneta+Komaruddin&background=0f172a&color=facc15&size=400" }
];

export const AGENDA_ITEMS = [
  { id: 1, date: "Hari Ini", time: "10:00 WIB", title: "Rapat Paripurna DPR RI Ke-14 Masa Persidangan IV", type: "Paripurna", color: "bg-red-500" },
  { id: 2, date: "Besok", time: "13:30 WIB", title: "Raker Komisi XI dengan Menteri Keuangan RI", type: "Raker Komisi", color: "bg-blue-500" },
  { id: 3, date: "18 Apr 2026", time: "09:00 WIB", title: "Kunjungan Spesifik Komisi V ke Kawasan IKN", type: "Kunker", color: "bg-emerald-500" },
  { id: 4, date: "20 Apr 2026", time: "19:00 WIB", title: "Konsolidasi Internal Pimpinan Fraksi Golkar", type: "Internal", color: "bg-yellow-500" },
];

export const SENTIMENT_DATA = {
  positive: 68,
  neutral: 22,
  negative: 10,
  trend: "+2.4%",
  totalMentions: "142.5K"
};

export const KABINET_ROSTER = [
  { role: "Menko Perekonomian", name: "Airlangga Hartarto", type: "Menteri", img: "/0603-airlangga-hartarto-menko.jpeg", socials: { x: '#', ig: '#', fb: '#', yt: '#', threads: '#' } },
  { role: "Menteri ESDM", name: "Bahlil Lahadalia", type: "Menteri", img: "/1203-bahlil-lahadalia-esdm.jpg", socials: { x: '#', ig: '#', fb: '#', yt: '#', threads: '#' } },
  { role: "Menteri Perindustrian", name: "Agus Gumiwang K.", type: "Menteri", img: "/0203-agus-gumiwang-kartasasmita.jpg", socials: { x: '#', ig: '#', fb: '#', yt: '#', threads: '#' } },
  { role: "Menteri Komdigi", name: "Meutya Hafid", type: "Menteri", img: "https://upload.wikimedia.org/wikipedia/commons/2/25/Meutya_Hafid.jpg", socials: { x: '#', ig: '#', fb: '#', yt: '#', threads: '#' } },
  { role: "Menteri Kependudukan", name: "Wihaji", type: "Menteri", img: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Wihaji.jpg", socials: { x: '#', ig: '#', fb: '#', yt: '#', threads: '#' } },
  { role: "Menteri ATR/BPN", name: "Nusron Wahid", type: "Menteri", img: "https://upload.wikimedia.org/wikipedia/commons/0/07/Nusron_Wahid.jpg", socials: { x: '#', ig: '#', fb: '#', yt: '#', threads: '#' } },
  { role: "Menteri UMKM", name: "Maman Abdurahman", type: "Menteri", img: "https://upload.wikimedia.org/wikipedia/commons/9/97/Maman_Abdurrahman_-_Menteri_Usaha_Mikro%2C_Kecil%2C_dan_Menengah.jpg", socials: { x: '#', ig: '#', fb: '#', yt: '#', threads: '#' } },
  { role: "Menteri PPMI", name: "Mukhtarudin", type: "Menteri", img: "https://ui-avatars.com/api/?name=Mukhtarudin&background=0f172a&color=facc15&size=200", socials: { x: '#', ig: '#', fb: '#', yt: '#', threads: '#' } },
  { role: "Gubernur Lemhannas", name: "Ace Hasan Syadzily", type: "Setingkat Menteri", img: "/1-3.jpeg", socials: { x: '#', ig: '#', fb: '#', yt: '#', threads: '#' } },
  { role: "Wamen PPMI", name: "Christina Aryani", type: "Wakil Menteri", img: "https://upload.wikimedia.org/wikipedia/commons/2/28/Christina_Aryani.jpg", socials: { x: '#', ig: '#', fb: '#', yt: '#', threads: '#' } },
  { role: "Wamen Perdagangan", name: "Dyah Roro Esty", type: "Wakil Menteri", img: "https://upload.wikimedia.org/wikipedia/commons/6/63/Dyah_Roro_Esti_Widya_Putri.jpg", socials: { x: '#', ig: '#', fb: '#', yt: '#', threads: '#' } },
];

// ============================================================================
// 4. DATA PEMETAAN GEOSPASIAL (Peta Interaktif)
// ============================================================================
export const provincialResults2024 = [
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

export const provCoords = {
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

export const dapilData = [
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
  { province: "Nusa Tenggara Barat", dapil: "NTB I", electorate: 1050000, seats: 3, coords: [-8.4, 117.4] },
  { province: "Nusa Tenggara Barat", dapil: "NTB II", electorate: 2800000, seats: 8, coords: [-8.6, 116.1] },
  { province: "Nusa Tenggara Timur", dapil: "NTT I", electorate: 2120000, seats: 6, coords: [-8.6, 120.4] },
  { province: "Nusa Tenggara Timur", dapil: "NTT II", electorate: 2470000, seats: 7, coords: [-9.8, 124.2] },
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