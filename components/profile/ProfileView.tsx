'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  MapPin, Share2, ChevronLeft, MessageCircle, 
  Globe, Send, Info, MessageSquare, Briefcase, GraduationCap
} from 'lucide-react';
import { XIcon, ThreadsIcon, InstagramIcon, FacebookIcon, YoutubeIcon } from '@/components/shared/Icons';
import { SocialLink } from '@/components/shared/SocialLink';
import { Member } from '@/types/member';

interface ProfileViewProps {
  member: Member;
}

export const ProfileView = ({ member }: ProfileViewProps) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'profil' | 'artikel' | 'aspirasi'>('profil');

  return (
    <div className="min-h-screen bg-neutral-50 animate-in slide-in-from-right duration-500 pb-20 lg:pb-10 font-sans">
      {/* Mobile Top Nav (Sticky) */}
      <div className="sticky top-0 z-[70] bg-white/80 backdrop-blur-xl px-4 py-3 border-b border-neutral-100 flex items-center justify-between lg:static lg:bg-transparent lg:border-none lg:pt-6 lg:px-8">
        <button onClick={() => router.back()} className="w-10 h-10 flex items-center justify-center bg-neutral-50 lg:bg-white shadow-sm lg:shadow-none rounded-xl hover:bg-neutral-200 transition-colors"><ChevronLeft size={20} /></button>
        <div className="text-center lg:hidden">
            <p className="text-[8px] font-black text-yellow-600 uppercase tracking-[0.2em] mb-1">Profil Legislator</p>
            <h3 className="text-[11px] font-black truncate max-w-[150px] uppercase">{member.name}</h3>
        </div>
        <button className="w-10 h-10 flex items-center justify-center bg-neutral-50 lg:bg-white shadow-sm lg:shadow-none rounded-xl hover:bg-neutral-200 transition-colors"><Share2 size={18} /></button>
      </div>

      <div className="max-w-7xl mx-auto lg:px-8 lg:grid lg:grid-cols-12 lg:gap-10 lg:items-start lg:mt-4">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-5 space-y-0 lg:space-y-8 lg:sticky lg:top-8">
          
          <div className="bg-white px-6 pt-10 pb-8 rounded-b-[3rem] lg:rounded-[3rem] shadow-sm relative overflow-hidden text-center lg:border lg:border-neutral-100">
            <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-[2.5rem] border-4 border-white shadow-2xl overflow-hidden mb-6 mx-auto bg-neutral-100 relative">
                <Image 
                  src={member.image} 
                  alt={member.name} 
                  fill
                  priority
                  className="object-cover scale-110" 
                />
            </div>
            <h2 className="text-xl lg:text-3xl font-black text-neutral-900 mb-1 leading-tight">{member.name}</h2>
            <p className="text-[10px] lg:text-xs font-bold text-neutral-400 mb-6 uppercase tracking-widest">{member.jabatan || 'Anggota DPR RI 2024-2029'}</p>
            
            {/* Meta Data Box */}
            <div className="flex flex-col gap-3 border-t border-neutral-100 pt-6 mt-4">
                <div className="flex justify-between items-center text-[10px] lg:text-xs font-black uppercase text-neutral-400">
                   <span>Komisi</span> <span className="text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-md">{member.komisi}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] lg:text-xs font-black uppercase text-neutral-400">
                   <span>Dapil</span> <span className="text-neutral-900 bg-neutral-100 px-2 py-0.5 rounded-md">{member.dapil}</span>
                </div>
                {member.badan_kerja && (
                <div className="flex justify-between items-center text-[10px] lg:text-xs font-black uppercase text-neutral-400">
                   <span>Badan</span> <span className="text-neutral-900 truncate max-w-[150px]">{member.badan_kerja}</span>
                </div>
                )}
                {member.perolehan_suara ? (
                <div className="flex justify-between items-center text-[10px] lg:text-xs font-black uppercase text-neutral-400">
                   <span>Suara</span> <span className="text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">{member.perolehan_suara.toLocaleString()} Sah</span>
                </div>
                ) : null}
            </div>
          </div>

          <div className="px-6 lg:px-0 mt-8 lg:mt-0 relative z-20">
            <button className="w-full bg-emerald-800 hover:bg-emerald-900 transition-colors text-white py-4 rounded-2xl font-black text-xs lg:text-sm shadow-xl flex items-center justify-center gap-3">
                <MessageCircle size={18} fill="white" /> CHAT ASPIRASI
            </button>
          </div>

          <section className="px-6 lg:px-0 py-10 lg:py-0 grid grid-cols-4 gap-y-8 lg:gap-y-6 gap-x-4">
            <SocialLink icon={<InstagramIcon size={20} />} label="IG" color="bg-gradient-to-tr from-yellow-400 to-purple-500" />
            <SocialLink icon={<XIcon size={18} />} label="X" color="bg-black" />
            <SocialLink icon={<FacebookIcon size={20} />} label="FB" color="bg-blue-600" />
            <SocialLink icon={<YoutubeIcon size={20} />} label="YT" color="bg-red-600" />
            <SocialLink icon={<ThreadsIcon size={20} />} label="Threads" color="bg-neutral-900" />
            <SocialLink icon={<Globe size={20} />} label="Web" color="bg-emerald-900" />
            <SocialLink icon={<Send size={20} />} label="Tele" color="bg-sky-500" />
            <SocialLink icon={<Info size={20} />} label="Lainnya" color="bg-neutral-400" />
          </section>

        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-7 space-y-0 lg:space-y-6 -mt-4 lg:-mt-0">
          
          <section className="px-4 lg:px-0 py-8 lg:py-0">
            <div className="flex bg-white p-1.5 rounded-2xl lg:rounded-3xl border border-neutral-100 mb-6 lg:mb-8 overflow-x-auto no-scrollbar snap-x">
                {(['profil', 'artikel', 'aspirasi'] as const).map(t => (
                    <button key={t} onClick={() => setActiveTab(t)} className={`flex-1 min-w-[100px] shrink-0 py-3 lg:py-4 rounded-xl lg:rounded-2xl text-[10px] lg:text-xs font-black uppercase transition-all snap-center ${activeTab === t ? 'bg-yellow-400 text-neutral-900 shadow-lg' : 'text-neutral-400 hover:text-neutral-800'}`}>
                        {t === 'profil' ? 'Data Diri' : t === 'artikel' ? 'Berita' : 'Kirim Aspirasi'}
                    </button>
                ))}
            </div>

            {activeTab === 'profil' ? (
                <div className="space-y-6 animate-in fade-in duration-300">
                    
                    {/* Basic Info */}
                    <div className="bg-white p-6 lg:p-8 rounded-[2rem] border border-neutral-100 shadow-sm">
                        <h4 className="text-xs font-black uppercase tracking-widest text-neutral-900 border-b border-neutral-100 pb-4 mb-4 flex items-center gap-2"><MapPin size={16} className="text-yellow-500" /> Profil Umum</h4>
                        <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                           <div className="col-span-2 md:col-span-1">
                              <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">Tempat, Tgl Lahir</p>
                              <p className="text-xs lg:text-sm font-black text-neutral-900 mt-1">{member.tempat_tgl_lahir || '-'}</p>
                           </div>
                           <div className="col-span-2 md:col-span-1">
                              <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">Fraksi</p>
                              <p className="text-xs lg:text-sm font-black text-neutral-900 mt-1">{member.fraksi || 'Partai Golongan Karya'}</p>
                           </div>
                           <div className="col-span-2">
                              <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">Email Eksekutif</p>
                              <p className="text-xs lg:text-sm font-black text-yellow-600 mt-1">{member.email || '-'}</p>
                           </div>
                        </div>
                    </div>

                    {/* Pendidikan */}
                    {member.pendidikan && member.pendidikan.length > 0 && (
                      <div className="bg-white p-6 lg:p-8 rounded-[2rem] border border-neutral-100 shadow-sm">
                          <h4 className="text-xs font-black uppercase tracking-widest text-neutral-900 border-b border-neutral-100 pb-4 mb-6 flex items-center gap-2"><GraduationCap size={16} className="text-yellow-500" /> Riwayat Pendidikan</h4>
                          <div className="space-y-6">
                             {member.pendidikan.map((p, idx) => (
                               <div key={idx} className="flex gap-4">
                                  <div className="w-14 lg:w-20 shrink-0 border-r-2 border-yellow-400 relative">
                                    <div className="absolute right-[-5px] top-1.5 w-2 h-2 rounded-full bg-yellow-400"></div>
                                    <p className="text-[9px] lg:text-[10px] font-black text-neutral-400 pr-3">{p.tahun}</p>
                                  </div>
                                  <p className="text-[11px] lg:text-sm font-bold text-neutral-900 leading-snug">{p.deskripsi}</p>
                               </div>
                             ))}
                          </div>
                      </div>
                    )}
                    
                    {/* Pekerjaan */}
                    {member.pekerjaan && member.pekerjaan.length > 0 && (
                      <div className="bg-white p-6 lg:p-8 rounded-[2rem] border border-neutral-100 shadow-sm">
                          <h4 className="text-xs font-black uppercase tracking-widest text-neutral-900 border-b border-neutral-100 pb-4 mb-6 flex items-center gap-2"><Briefcase size={16} className="text-emerald-800" /> Riwayat Pekerjaan</h4>
                          <div className="space-y-6">
                             {member.pekerjaan.map((p, idx) => (
                               <div key={idx} className="flex gap-4">
                                  <div className="w-14 lg:w-20 shrink-0 border-r-2 border-emerald-800 relative">
                                    <div className="absolute right-[-5px] top-1.5 w-2 h-2 rounded-full bg-emerald-800"></div>
                                    <p className="text-[9px] lg:text-[10px] font-black text-neutral-400 pr-3">{p.tahun}</p>
                                  </div>
                                  <p className="text-[11px] lg:text-sm font-bold text-neutral-900 leading-snug">{p.deskripsi}</p>
                               </div>
                             ))}
                          </div>
                      </div>
                    )}

                </div>
            ) : activeTab === 'artikel' ? (
                <div className="space-y-4 lg:space-y-6 animate-in fade-in duration-300">
                    {[1, 2, 3].map(id => (
                        <div key={id} className="bg-white p-4 lg:p-6 rounded-2xl lg:rounded-[2rem] border border-neutral-100 shadow-sm hover:shadow-md transition-shadow flex gap-4 lg:gap-6 cursor-pointer">
                            <div className="w-20 h-20 lg:w-24 lg:h-24 bg-neutral-100 rounded-xl lg:rounded-2xl overflow-hidden relative shrink-0">
                                <Image src={`https://api.dicebear.com/7.x/shapes/svg?seed=${id+10}`} alt="thumb" fill className="object-cover" />
                            </div>
                            <div className="flex flex-col justify-center py-1">
                                <span className="text-[8px] lg:text-[10px] font-black text-yellow-600 uppercase bg-yellow-50 px-2 lg:px-3 py-0.5 lg:py-1 rounded-md lg:rounded-lg self-start tracking-wider mb-2">Update</span>
                                <h5 className="text-[11px] lg:text-sm font-black text-neutral-900 leading-snug mb-1">Berita Kegiatan Terbaru Anggota Fraksi Di Daerah Pemilihan...</h5>
                                <p className="text-[9px] lg:text-[10px] font-bold text-neutral-400 uppercase tracking-widest mt-auto">12 Apr 2024</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white p-6 lg:p-10 rounded-3xl lg:rounded-[3rem] border border-neutral-100 shadow-sm relative overflow-hidden animate-in fade-in duration-300">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/5 rounded-full blur-[40px] -mr-10 -mt-10"></div>
                    <div className="flex items-center gap-3 lg:gap-4 mb-6 lg:mb-8 relative z-10">
                        <div className="w-10 h-10 lg:w-14 lg:h-14 bg-yellow-100 rounded-xl lg:rounded-2xl flex items-center justify-center text-yellow-600"><MessageSquare size={20} className="lg:w-6 lg:h-6" /></div>
                        <div>
                         <h5 className="text-xs lg:text-base font-black text-neutral-900">Suarakan Aspirasi Anda</h5>
                         <p className="text-[9px] lg:text-xs font-bold text-neutral-400">Pesan akan diteruskan ke tim Ahli {member.name}</p>
                        </div>
                    </div>
                    <textarea rows={5} placeholder="Tuliskan aspirasi Anda dengan detail..." className="w-full bg-neutral-50 border border-neutral-100 rounded-xl lg:rounded-2xl px-4 py-3 lg:p-6 text-xs lg:text-sm font-bold mb-4 lg:mb-6 outline-none focus:border-yellow-400 transition-colors relative z-10 resize-none"></textarea>
                    <button className="w-full bg-neutral-900 hover:bg-neutral-800 transition-colors text-white py-4 lg:py-5 rounded-xl lg:rounded-2xl font-black text-[10px] lg:text-sm uppercase tracking-widest relative z-10 shadow-lg active:scale-95">Kirim via Sistem</button>
                </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};
