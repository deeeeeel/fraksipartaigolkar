const fs = require('fs');
const { parse } = require('csv-parse/sync');

const fileContent = fs.readFileSync('datalengkap_profile_ready.csv', 'utf8');

// Kolom CSV: slug,nama,jabatan,fraksi,dapil,perolehan_suara,komisi,badan_kerja,email,tempat_tgl_lahir,pendidikan,organisasi,lhkpn,,,,pekerjaan
const headers = [
  'slug', 'nama', 'jabatan', 'fraksi', 'dapil', 'perolehan_suara', 'komisi', 
  'badan_kerja', 'email', 'tempat_tgl_lahir', 'pendidikan', 'organisasi', 
  'lhkpn', 'blank1', 'blank2', 'blank3', 'pekerjaan'
];

const records = parse(fileContent, {
  columns: headers,
  skip_empty_lines: true,
  from_line: 2,
  relax_column_count: true
});

function extractRiwayat(str) {
  if (!str || str.toLowerCase() === 'tidak ada data' || str === '-') return [];
  const parts = str.split(';');
  const result = [];
  parts.forEach(p => {
    let clean = p.trim();
    if (!clean) return;
    const match = clean.match(/^([0-9]{4}(?:\s*-\s*[a-zA-Z0-9]+)?)\s*—\s*(.*)/);
    if (match) {
        result.push({ tahun: match[1], deskripsi: match[2] });
    } else {
        result.push({ tahun: '', deskripsi: clean });
    }
  });
  return result;
}

const members = records.filter(r => r.nama).map((r, i) => {
  const id = i + 1;
  const slug = r.slug || `member-${id}`;
  const perolehan_suara = parseInt((r.perolehan_suara || '').replace(/[^0-9]/g, ''), 10) || 0;
  
  return {
    id,
    name: r.nama,
    gelar: "", 
    dapil: r.dapil || '',
    komisi: r.komisi || '-',
    image: `https://api.dicebear.com/7.x/shapes/svg?seed=${slug}`,
    bio: "Berkomitmen penuh mengawal kebijakan pro-rakyat untuk mewujudkan Indonesia Maju secara eksklusif dan solid sesuai visi Fraksi Partai Golkar.",
    stats: {
      kegiatan: Math.floor(Math.random() * (120 - 20) + 20),
      berita: Math.floor(Math.random() * (200 - 50) + 50),
      aspirasi: Math.floor(Math.random() * (1500 - 300) + 300),
    },
    slug,
    jabatan: r.jabatan,
    fraksi: r.fraksi,
    perolehan_suara,
    badan_kerja: r.badan_kerja,
    email: r.email,
    tempat_tgl_lahir: r.tempat_tgl_lahir,
    pendidikan: extractRiwayat(r.pendidikan),
    pekerjaan: extractRiwayat(r.pekerjaan),
    organisasi: extractRiwayat(r.organisasi),
    lhkpn: r.lhkpn
  };
});

fs.writeFileSync('lib/members.json', JSON.stringify(members, null, 2));
console.log(`Berhasil mengeksekusi migrasi ${members.length} data anggota Fraksi.`);
