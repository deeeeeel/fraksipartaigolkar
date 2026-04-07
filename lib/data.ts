import { Member } from '@/types/member';
import membersData from './members.json';

export const KOMISI_LIST = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII'];

export const MOCK_MEMBERS: Member[] = membersData as Member[];

export async function getMembers(): Promise<Member[]> {
  return MOCK_MEMBERS;
}

export async function getMemberBySlug(slug: string): Promise<Member | undefined> {
  return MOCK_MEMBERS.find(m => m.slug === slug);
}
