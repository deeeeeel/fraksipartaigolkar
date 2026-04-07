import { getMembers, KOMISI_LIST } from '@/lib/data';
import { HomeView } from '@/components/home/HomeView';

export default async function Page() {
  const members = await getMembers();

  return (
    <HomeView initialMembers={members} komisiList={KOMISI_LIST} />
  );
}
