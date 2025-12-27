import { getIPDData } from '@/lib/data';
import OneIPDPageClient from './OneIPDPageClient';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const data = await getIPDData();
  return <OneIPDPageClient data={data} />;
}
