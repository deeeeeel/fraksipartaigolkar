export interface MemberStats {
  kegiatan: number;
  berita: number;
  aspirasi: number;
}

export interface Riwayat {
  tahun: string;
  deskripsi: string;
}

export interface Member {
  id: number;
  name: string;
  gelar: string;
  dapil: string;
  komisi: string;
  image: string;
  bio: string;
  stats: MemberStats;
  slug: string;
  
  jabatan?: string;
  fraksi?: string;
  perolehan_suara?: number;
  badan_kerja?: string;
  email?: string;
  tempat_tgl_lahir?: string;
  pendidikan?: Riwayat[];
  pekerjaan?: Riwayat[];
  organisasi?: Riwayat[];
  lhkpn?: string;
}
