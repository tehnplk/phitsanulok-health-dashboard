import VisitPageClient from './VisitPageClient';
import { getVisitData } from '@/lib/data';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const data = await getVisitData();
  return <VisitPageClient data={data} />;
}
