import { getHospitals } from '@/lib/data';
import HospitalPageClient from './HospitalPageClient';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const hospitals = await getHospitals();
  return <HospitalPageClient data={hospitals} />;
}
