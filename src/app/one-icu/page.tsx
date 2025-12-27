import { getICUData } from '@/lib/data';
import OneICUPageClient from './OneICUPageClient';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const data = await getICUData();
  return <OneICUPageClient data={data} />;
}
