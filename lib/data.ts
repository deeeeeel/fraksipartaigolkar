import membersData from './members.json';

export const KOMISI_LIST = ['Komisi I', 'Komisi II', 'Komisi III', 'Komisi IV', 'Komisi V', 'Komisi VI', 'Komisi VII', 'Komisi VIII', 'Komisi IX', 'Komisi X', 'Komisi XI', 'Komisi XII', 'Komisi XIII'];

// Helper untuk generate slug otomatis jika di JSON belum ada
const generateSlug = (name: string) => {
  if (!name) return '';
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

// Mapping SEMUA data dari members.json agar formatnya konsisten
export const MOCK_MEMBERS = (membersData as any[]).map((member, index) => ({
  ...member,
  id: member.id || index + 1,
  name: member.name || member.nama,
  slug: member.slug || generateSlug(member.name || member.nama || ''),
  image: member.image || member.foto || '',
}));

// Fungsi getMembers untuk di-import oleh app/page.tsx
export const getMembers = async () => {
  return MOCK_MEMBERS;
};

// Fungsi getMemberBySlug untuk di-import oleh app/anggota/[slug]/page.tsx
export const getMemberBySlug = async (slug: string) => {
  return MOCK_MEMBERS.find((member) => member.slug === slug) || null;
};

export const MOCK_NEWS = [
  { id: 1, title: "Di Balik Stabilitas Indonesia, Ada Airlangga Hartarto dan Bahlil Lahadalia yang Bertarung di Tengah Krisis Global", date: "10 April 2026", tag: "Ekonomi Politik", url: "[https://golkarpedia.com/di-balik-stabilitas-indonesia-ada-airlangga-hartarto-dan-bahlil-lahadalia-yang-bertarung-di-tengah-krisis-global/](https://golkarpedia.com/di-balik-stabilitas-indonesia-ada-airlangga-hartarto-dan-bahlil-lahadalia-yang-bertarung-di-tengah-krisis-global/)", image: "/1-14.jpg" },
  { id: 2, title: "Menteri ESDM Bahlil Lahadalia Ajak Warga Hemat Energi Mulai Dari Hal Sepele: Matikan Lampu!", date: "09 April 2026", tag: "Energi", url: "[https://golkarpedia.com/menteri-esdm-bahlil-lahadalia-ajak-warga-hemat-energi-mulai-dari-hal-sepele-matikan-lampu/](https://golkarpedia.com/menteri-esdm-bahlil-lahadalia-ajak-warga-hemat-energi-mulai-dari-hal-sepele-matikan-lampu/)", image: "/1203-bahlil-lahadalia-esdm.jpg" },
  { id: 3, title: "Dari Konsolidasi Senyap ke Kemenangan Nyata, Legacy Ace Hasan Syadzily di Partai Golkar Jabar", date: "08 April 2026", tag: "Politik", url: "[https://golkarpedia.com/dari-konsolidasi-senyap-ke-kemenangan-nyata-legacy-ace-hasan-syadzily-di-partai-golkar-jabar/](https://golkarpedia.com/dari-konsolidasi-senyap-ke-kemenangan-nyata-legacy-ace-hasan-syadzily-di-partai-golkar-jabar/)", image: "/1-3.jpeg" },
  { id: 4, title: "Sarmuji Sentil Isu Jatuhkan Prabowo: Ibarat Kereta, Rakyat yang Akan Dirugikan", date: "07 April 2026", tag: "Nasional", url: "[https://golkarpedia.com/sarmuji-sentil-isu-jatuhkan-prabowo-ibarat-kereta-rakyat-yang-akan-dirugikan/](https://golkarpedia.com/sarmuji-sentil-isu-jatuhkan-prabowo-ibarat-kereta-rakyat-yang-akan-dirugikan/)", image: "/0303-sekjen-golkar-sarmuji.jpg" },
  { id: 5, title: "Perang Global Guncang Industri, Menperin Agus Gumiwang Wanti-wanti Rantai Pasok Terganggu", date: "06 April 2026", tag: "Industri", url: "[https://golkarpedia.com/perang-global-guncang-industri-menperin-agus-gumiwang-wanti-wanti-rantai-pasok-terganggu-inflasi-mengintai/](https://golkarpedia.com/perang-global-guncang-industri-menperin-agus-gumiwang-wanti-wanti-rantai-pasok-terganggu-inflasi-mengintai/)", image: "/0203-agus-gumiwang-kartasasmita.jpg" },
  { id: 6, title: "Situasi Lebanon Mencekam, TNI Diperintahkan Masuk Bunker, Dave Laksono: Langkah Darurat Tepat", date: "05 April 2026", tag: "Pertahanan", url: "[https://golkarpedia.com/situasi-lebanon-mencekam-tni-diperintahkan-masuk-bunker-dave-laksono-ini-langkah-darurat-yang-tepat/](https://golkarpedia.com/situasi-lebanon-mencekam-tni-diperintahkan-masuk-bunker-dave-laksono-ini-langkah-darurat-yang-tepat/)", image: "/0503-dave-laksono-dpr.jpg" },
  { id: 7, title: "Airlangga Hartarto Teken MoU Industri Perairan, RI Siap Jadi Pemain Baru Offshore Dunia", date: "04 April 2026", tag: "Ekonomi", url: "[https://golkarpedia.com/airlangga-hartarto-teken-mou-industri-perairan-ri-siap-jadi-pemain-baru-offshore-dunia/](https://golkarpedia.com/airlangga-hartarto-teken-mou-industri-perairan-ri-siap-jadi-pemain-baru-offshore-dunia/)", image: "/0603-airlangga-hartarto-menko.jpeg" },
  { id: 8, title: "Darah Prajurit RI Tumpah di Lebanon, Sari Yuliati Murka: Serangan Keji Tak Bisa Dibiarkan!", date: "03 April 2026", tag: "Internasional", url: "[https://golkarpedia.com/darah-prajurit-ri-tumpah-di-lebanon-sari-yuliati-murka-ini-serangan-keji-yang-tak-bisa-dibiarkan/](https://golkarpedia.com/darah-prajurit-ri-tumpah-di-lebanon-sari-yuliati-murka-ini-serangan-keji-yang-tak-bisa-dibiarkan/)", image: "/7540d57a36f-9269-4c2f-aeb5-1761ba6e2bc2 (1).jpeg" }
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
  { role: "Bendahara Fraksi", name: "Puteri Anneta Komaruddin", dapil: "Jawa Barat VII", img: "[https://ui-avatars.com/api/?name=Puteri+Anneta+Komaruddin&background=0f172a&color=facc15&size=400](https://ui-avatars.com/api/?name=Puteri+Anneta+Komaruddin&background=0f172a&color=facc15&size=400)" }
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

// Data jajaran Menteri lengkap dengan foto asli Wikipedia dan link Sosmed
export const KABINET_ROSTER = [
  { role: "Menko Perekonomian", name: "Airlangga Hartarto", type: "Menteri", img: "/0603-airlangga-hartarto-menko.jpeg", socials: { x: '#', ig: '#', fb: '#', yt: '#', threads: '#' } },
  { role: "Menteri ESDM", name: "Bahlil Lahadalia", type: "Menteri", img: "/1203-bahlil-lahadalia-esdm.jpg", socials: { x: '#', ig: '#', fb: '#', yt: '#', threads: '#' } },
  { role: "Menteri Perindustrian", name: "Agus Gumiwang K.", type: "Menteri", img: "/0203-agus-gumiwang-kartasasmita.jpg", socials: { x: '#', ig: '#', fb: '#', yt: '#', threads: '#' } },
  { role: "Menteri Komdigi", name: "Meutya Hafid", type: "Menteri", img: "[https://upload.wikimedia.org/wikipedia/commons/2/25/Meutya_Hafid.jpg](https://upload.wikimedia.org/wikipedia/commons/2/25/Meutya_Hafid.jpg)", socials: { x: '#', ig: '#', fb: '#', yt: '#', threads: '#' } },
  { role: "Menteri Kependudukan", name: "Wihaji", type: "Menteri", img: "[https://upload.wikimedia.org/wikipedia/commons/c/cc/Wihaji.jpg](https://upload.wikimedia.org/wikipedia/commons/c/cc/Wihaji.jpg)", socials: { x: '#', ig: '#', fb: '#', yt: '#', threads: '#' } },
  { role: "Menteri ATR/BPN", name: "Nusron Wahid", type: "Menteri", img: "[https://upload.wikimedia.org/wikipedia/commons/0/07/Nusron_Wahid.jpg](https://upload.wikimedia.org/wikipedia/commons/0/07/Nusron_Wahid.jpg)", socials: { x: '#', ig: '#', fb: '#', yt: '#', threads: '#' } },
  { role: "Menteri UMKM", name: "Maman Abdurahman", type: "Menteri", img: "[https://upload.wikimedia.org/wikipedia/commons/9/97/Maman_Abdurrahman_-_Menteri_Usaha_Mikro%2C_Kecil%2C_dan_Menengah.jpg](https://upload.wikimedia.org/wikipedia/commons/9/97/Maman_Abdurrahman_-_Menteri_Usaha_Mikro%2C_Kecil%2C_dan_Menengah.jpg)", socials: { x: '#', ig: '#', fb: '#', yt: '#', threads: '#' } },
  { role: "Menteri PPMI", name: "Mukhtarudin", type: "Menteri", img: "[https://ui-avatars.com/api/?name=Mukhtarudin&background=0f172a&color=facc15&size=200](https://ui-avatars.com/api/?name=Mukhtarudin&background=0f172a&color=facc15&size=200)", socials: { x: '#', ig: '#', fb: '#', yt: '#', threads: '#' } },
  { role: "Gubernur Lemhannas", name: "Ace Hasan Syadzily", type: "Setingkat Menteri", img: "/1-3.jpeg", socials: { x: '#', ig: '#', fb: '#', yt: '#', threads: '#' } },
  { role: "Wamen PPMI", name: "Christina Aryani", type: "Wakil Menteri", img: "[https://upload.wikimedia.org/wikipedia/commons/2/28/Christina_Aryani.jpg](https://upload.wikimedia.org/wikipedia/commons/2/28/Christina_Aryani.jpg)", socials: { x: '#', ig: '#', fb: '#', yt: '#', threads: '#' } },
  { role: "Wamen Perdagangan", name: "Dyah Roro Esty", type: "Wakil Menteri", img: "[https://upload.wikimedia.org/wikipedia/commons/6/63/Dyah_Roro_Esti_Widya_Putri.jpg](https://upload.wikimedia.org/wikipedia/commons/6/63/Dyah_Roro_Esti_Widya_Putri.jpg)", socials: { x: '#', ig: '#', fb: '#', yt: '#', threads: '#' } },
];
