import React from 'react';

export interface SocialLinkProps {
  icon: React.ReactNode;
  label: string;
  color: string;
}

export const SocialLink = ({ icon, label, color }: SocialLinkProps) => (
  <div className="flex flex-col items-center gap-2 group active:scale-90 transition-transform cursor-pointer">
    <div className={`w-12 h-12 rounded-2xl ${color} text-white flex items-center justify-center shadow-lg transition-all`}>
      {icon}
    </div>
    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">{label}</span>
  </div>
);
