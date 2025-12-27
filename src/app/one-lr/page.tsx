import OneLRPageClient from './OneLRPageClient';
import { getLRData } from '@/lib/data';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const data = await getLRData();
  return <OneLRPageClient data={data} />;
}
