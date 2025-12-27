import WaitingPageClient from '../WaitingPageClient';
import { getWaitingData } from '@/lib/data';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const data = await getWaitingData();
  return <WaitingPageClient data={data} />;
}
