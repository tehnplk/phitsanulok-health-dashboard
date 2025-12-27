import { getORData } from '@/lib/data';
import OneORPageClient from './OneORPageClient';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const data = await getORData();
  return <OneORPageClient data={data} />;
}
