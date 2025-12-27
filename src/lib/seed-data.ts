import type { HospitalMaster } from './types';
import { HospitalAffiliation, HospitalSapLevel, HospitalSizeLevel } from './types';
import { generateMockDates } from './utils';

export const hospitalSeed: HospitalMaster[] = [
  { id: '1', name: 'รพ.พุทธชินราช พิษณุโลก', code: '10668', sizeLevel: HospitalSizeLevel.A, sapLevel: HospitalSapLevel.P_PLUS, affiliation: HospitalAffiliation.MOPH, lat: 16.8239, lng: 100.2618 },
  { id: '2', name: 'รพ.นครไทย', code: '11258', sizeLevel: HospitalSizeLevel.M2, sapLevel: HospitalSapLevel.A, affiliation: HospitalAffiliation.MOPH, lat: 17.1006, lng: 100.8378 },
  { id: '3', name: 'รพ.ชาติตระการ', code: '11259', sizeLevel: HospitalSizeLevel.F1, sapLevel: HospitalSapLevel.S, affiliation: HospitalAffiliation.MOPH, lat: 17.2764, lng: 100.6014 },
  { id: '4', name: 'รพ.บางระกำ', code: '11256', sizeLevel: HospitalSizeLevel.F1, sapLevel: HospitalSapLevel.S_PLUS, affiliation: HospitalAffiliation.MOPH, lat: 16.7567, lng: 100.1172 },
  { id: '5', name: 'รพ.บางกระทุ่ม', code: '11257', sizeLevel: HospitalSizeLevel.F2, sapLevel: HospitalSapLevel.S, affiliation: HospitalAffiliation.MOPH, lat: 16.5744, lng: 100.3056 },
  { id: '6', name: 'รพ.พรหมพิราม', code: '11262', sizeLevel: HospitalSizeLevel.F2, sapLevel: HospitalSapLevel.S_PLUS, affiliation: HospitalAffiliation.MOPH, lat: 16.9456, lng: 100.2078 },
  { id: '7', name: 'รพ.วัดโบสถ์', code: '11260', sizeLevel: HospitalSizeLevel.F2, sapLevel: HospitalSapLevel.S_PLUS, affiliation: HospitalAffiliation.MOPH, lat: 16.95, lng: 100.3333 },
  { id: '8', name: 'รพ.วังทอง', code: '11261', sizeLevel: HospitalSizeLevel.F1, sapLevel: HospitalSapLevel.A, affiliation: HospitalAffiliation.MOPH, lat: 16.8167, lng: 100.4333 },
  { id: '9', name: 'รพ.เนินมะปราง', code: '11263', sizeLevel: HospitalSizeLevel.F2, sapLevel: HospitalSapLevel.S, affiliation: HospitalAffiliation.MOPH, lat: 16.55, lng: 100.6333 },
];

const getHospInfo = (id: string) => {
  const hosp = hospitalSeed.find((h) => h.id === id);
  if (!hosp) throw new Error(`Hospital ID ${id} not found`);
  return hosp;
};

export const lrSeed = [
  { ...getHospInfo('1'), waiting: 3, normal: 7, abnormal: 1, miscarriage: 0, notDelivered: 0 },
  { ...getHospInfo('2'), waiting: 2, normal: 4, abnormal: 1, miscarriage: 0, notDelivered: 0 },
  { ...getHospInfo('3'), waiting: 1, normal: 2, abnormal: 0, miscarriage: 0, notDelivered: 0 },
  { ...getHospInfo('4'), waiting: 0, normal: 0, abnormal: 0, miscarriage: 0, notDelivered: 0 },
  { ...getHospInfo('5'), waiting: 1, normal: 3, abnormal: 0, miscarriage: 0, notDelivered: 0 },
  { ...getHospInfo('6'), waiting: 2, normal: 5, abnormal: 1, miscarriage: 0, notDelivered: 0 },
  { ...getHospInfo('7'), waiting: 0, normal: 0, abnormal: 0, miscarriage: 0, notDelivered: 0 },
  { ...getHospInfo('8'), waiting: 2, normal: 4, abnormal: 1, miscarriage: 0, notDelivered: 0 },
  { ...getHospInfo('9'), waiting: 1, normal: 2, abnormal: 0, miscarriage: 0, notDelivered: 0 },
];

export const icuWardsSeed = [
  { ...getHospInfo('1'), wards: [
    { name: 'ICU Medicine', totalBeds: 24, usedBeds: 22 },
    { name: 'ICU Surgery', totalBeds: 20, usedBeds: 21 },
    { name: 'CCU (Cardio)', totalBeds: 12, usedBeds: 10 },
    { name: 'Neuro ICU', totalBeds: 10, usedBeds: 9 },
    { name: 'PICU(เด็ก)', totalBeds: 8, usedBeds: 6 },
  ]},
  { ...getHospInfo('2'), wards: [{ name: 'Semi ICU', totalBeds: 4, usedBeds: 0 }] },
  { ...getHospInfo('3'), wards: [{ name: 'Semi ICU', totalBeds: 4, usedBeds: 0 }] },
  { ...getHospInfo('4'), wards: [{ name: 'Semi ICU', totalBeds: 4, usedBeds: 0 }] },
  { ...getHospInfo('5'), wards: [{ name: 'Semi ICU', totalBeds: 4, usedBeds: 0 }] },
  { ...getHospInfo('6'), wards: [{ name: 'Semi ICU', totalBeds: 4, usedBeds: 0 }] },
  { ...getHospInfo('7'), wards: [{ name: 'Semi ICU', totalBeds: 4, usedBeds: 0 }] },
  { ...getHospInfo('8'), wards: [{ name: 'Semi ICU', totalBeds: 4, usedBeds: 0 }] },
  { ...getHospInfo('9'), wards: [{ name: 'Semi ICU', totalBeds: 4, usedBeds: 0 }] },
];

export const ipdWardsSeed = [
  { ...getHospInfo('1'), wards: [
    { name: 'อายุรกรรมชาย 1', totalBeds: 32, usedBeds: 32 },
    { name: 'อายุรกรรมหญิง 1', totalBeds: 32, usedBeds: 35 },
    { name: 'ศัลยกรรมชาย', totalBeds: 40, usedBeds: 38 },
    { name: 'ศัลยกรรมหญิง', totalBeds: 40, usedBeds: 36 },
    { name: 'ศัลยกรรมกระดูก', totalBeds: 35, usedBeds: 30 },
    { name: 'กุมารเวชกรรม', totalBeds: 40, usedBeds: 25 },
    { name: 'จักษุ โสต นาสิก', totalBeds: 30, usedBeds: 18 },
    { name: 'นรีเวชกรรม', totalBeds: 30, usedBeds: 22 },
  ]},
  { ...getHospInfo('2'), wards: [
    { name: 'ผู้ป่วยในชาย', totalBeds: 30, usedBeds: 24 },
    { name: 'ผู้ป่วยในหญิง', totalBeds: 30, usedBeds: 28 },
    { name: 'กุมารเวชกรรม', totalBeds: 10, usedBeds: 6 },
  ]},
  { ...getHospInfo('8'), wards: [
    { name: 'อายุรกรรมชาย', totalBeds: 30, usedBeds: 28 },
    { name: 'อายุรกรรมหญิง', totalBeds: 30, usedBeds: 31 },
    { name: 'ศัลยกรรม', totalBeds: 20, usedBeds: 15 },
    { name: 'กุมารเวชกรรม', totalBeds: 15, usedBeds: 8 },
    { name: 'สงฆ์อาพาธ', totalBeds: 8, usedBeds: 3 },
  ]},
  { ...getHospInfo('3'), wards: [
    { name: 'ผู้ป่วยในชาย', totalBeds: 20, usedBeds: 12 },
    { name: 'ผู้ป่วยในหญิง', totalBeds: 20, usedBeds: 15 },
  ]},
  { ...getHospInfo('4'), wards: [
    { name: 'ผู้ป่วยในชาย', totalBeds: 25, usedBeds: 25 },
    { name: 'ผู้ป่วยในหญิง', totalBeds: 25, usedBeds: 27 },
  ]},
  { ...getHospInfo('5'), wards: [
    { name: 'ผู้ป่วยในชาย', totalBeds: 20, usedBeds: 14 },
    { name: 'ผู้ป่วยในหญิง', totalBeds: 20, usedBeds: 16 },
  ]},
  { ...getHospInfo('6'), wards: [
    { name: 'ผู้ป่วยในชาย', totalBeds: 25, usedBeds: 20 },
    { name: 'ผู้ป่วยในหญิง', totalBeds: 25, usedBeds: 18 },
    { name: 'สงฆ์อาพาธ', totalBeds: 4, usedBeds: 1 },
  ]},
  { ...getHospInfo('7'), wards: [
    { name: 'ผู้ป่วยในชาย', totalBeds: 20, usedBeds: 10 },
    { name: 'ผู้ป่วยในหญิง', totalBeds: 20, usedBeds: 12 },
  ]},
  { ...getHospInfo('9'), wards: [
    { name: 'ผู้ป่วยในชาย', totalBeds: 18, usedBeds: 14 },
    { name: 'ผู้ป่วยในหญิง', totalBeds: 18, usedBeds: 10 },
  ]},
];

export const orSeed = [
  { ...getHospInfo('1'), totalRooms: 18, activeSurgeries: 14, scheduledToday: 42, emergencyCases: 3, availableRooms: 1 },
  { ...getHospInfo('2'), totalRooms: 3, activeSurgeries: 1, scheduledToday: 5, emergencyCases: 0, availableRooms: 2 },
  { ...getHospInfo('8'), totalRooms: 4, activeSurgeries: 3, scheduledToday: 12, emergencyCases: 1, availableRooms: 0 },
];

// ----------------------------------------------------------------------
// WAITING & VISIT DATA (Deterministic for seed/display)
// ----------------------------------------------------------------------

export const WAITING_DATES: { date: string; dayName: string }[] = [
  { date: '21/12/2568', dayName: 'อา.' },
  { date: '22/12/2568', dayName: 'จ.' },
  { date: '23/12/2568', dayName: 'อ.' },
  { date: '24/12/2568', dayName: 'พ.' },
  { date: '25/12/2568', dayName: 'พฤ.' },
  { date: '26/12/2568', dayName: 'ศ.' },
  { date: '27/12/2568', dayName: 'ส.' },
];

const WAITING_MINUTES_BY_HOSPITAL: Record<string, number[]> = {
  // รพ.พุทธชินราช พิษณุโลก (A, P+)
  '1': [125, 125, 115, 142, 165, 177, 67],
  // รพ.นครไทย (M2, A)
  '2': [95, 172, 111, 140, 153, 179, 96],
  // รพ.ชาติตระการ (F1, S)
  '3': [162, 111, 60, 135, 156, 139, 146],
  // รพ.บางระกำ (F1, S+)
  '4': [81, 152, 105, 107, 86, 116, 157],
  // รพ.บางกระทุ่ม (F2, S)
  '5': [104, 157, 133, 124, 147, 120, 61],
  // รพ.พรหมพิราม (F2, S+)
  '6': [83, 174, 81, 81, 175, 140, 148],
  // รพ.วัดโบสถ์ (F2, S+)
  '7': [62, 93, 172, 70, 123, 165, 101],
  // รพ.วังทอง (F1, A)
  '8': [120, 176, 154, 132, 100, 69, 143],
  // รพ.เนินมะปราง (F2, S)
  '9': [125, 120, 102, 69, 103, 101, 115],
};

const buildWaitingSeed = () =>
  hospitalSeed.map((h) => {
    const minutes = WAITING_MINUTES_BY_HOSPITAL[h.id];
    return {
      ...h,
      data: WAITING_DATES.map((d, idx) => ({
        ...d,
        minutes: minutes?.[idx] ?? 90,
      })),
    };
  });

const VISIT_COUNTS_BY_HOSPITAL: Record<string, number[]> = {
  // Values aligned with sample table order (7 days)
  '1': [2715, 2743, 2719, 2958, 2790, 2629, 2510],
  '2': [201, 487, 486, 474, 496, 204, 310],
  '3': [383, 486, 268, 336, 302, 387, 379],
  '4': [285, 407, 219, 485, 219, 474, 392],
  '5': [425, 211, 421, 278, 376, 327, 492],
  '6': [222, 373, 427, 234, 374, 358, 298],
  '7': [280, 431, 356, 265, 467, 279, 335],
  '8': [423, 270, 206, 296, 321, 341, 345],
  '9': [227, 420, 444, 367, 339, 222, 215],
};

const buildVisitSeed = () =>
  hospitalSeed.map((h) => {
    const counts = VISIT_COUNTS_BY_HOSPITAL[h.id];
    return {
      ...h,
      data: WAITING_DATES.map((d, idx) => ({
        ...d,
        count: counts?.[idx] ?? 0,
      })),
    };
  });

export const waitAndVisitSeed = () => {
  // Use deterministic waiting data per provided sample; keep visits semi-random but aligned to same dates
  const waiting = buildWaitingSeed();
  const visits = buildVisitSeed();

  return { waiting, visits, dates: WAITING_DATES };
};
