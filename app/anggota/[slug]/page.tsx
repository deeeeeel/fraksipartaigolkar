import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getMemberBySlug } from '@/lib/data';
import { ProfileView } from '@/components/profile/ProfileView';

// Next.js 15 asynchronous params
interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const member = await getMemberBySlug(resolvedParams.slug);
  
  if (!member) {
    return { title: 'Anggota Tidak Ditemukan' };
  }
  
  return {
    title: `${member.name} - Anggota Dapil ${member.dapil}`,
    description: member.bio,
  };
}

export default async function AnggotaPage({ params }: PageProps) {
  const resolvedParams = await params;
  const member = await getMemberBySlug(resolvedParams.slug);
  
  if (!member) {
    notFound();
  }

  // JSON-LD untuk SEO spesifik
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: member.name,
    jobTitle: 'Anggota Legislatif',
    memberOf: {
      '@type': 'GovernmentOrganization',
      name: 'Fraksi Partai Golkar'
    },
    description: member.bio,
    image: member.image
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProfileView member={member} />
    </>
  );
}
