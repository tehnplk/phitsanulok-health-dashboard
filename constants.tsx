import { LRData, HospitalSizeLevel, HospitalSapLevel, HospitalAffiliation, IPDData, ICUData, WaitingData, ORData, VisitData, HospitalMaster } from './types';
import { generateMockDates } from './utils';

// ----------------------------------------------------------------------
// MASTER DATA
// ----------------------------------------------------------------------

export const HOSPITAL_MASTER: HospitalMaster[] = [
  { id: '1', name: 'รพ.พุทธชินราช พิษณุโลก', code: '10668', sizeLevel: HospitalSizeLevel.A, sapLevel: HospitalSapLevel.P_PLUS, affiliation: HospitalAffiliation.MOPH, lat: 16.8239, lng: 100.2618 },
  { id: '2', name: 'รพ.นครไทย', code: '11258', sizeLevel: HospitalSizeLevel.M2, sapLevel: HospitalSapLevel.A, affiliation: HospitalAffiliation.MOPH, lat: 17.1006, lng: 100.8378 },
  { id: '3', name: 'รพ.ชาติตระการ', code: '11259', sizeLevel: HospitalSizeLevel.F1, sapLevel: HospitalSapLevel.S, affiliation: HospitalAffiliation.MOPH, lat: 17.2764, lng: 100.6014 },
  { id: '4', name: 'รพ.บางระกำ', code: '11256', sizeLevel: HospitalSizeLevel.F1, sapLevel: HospitalSapLevel.S_PLUS, affiliation: HospitalAffiliation.MOPH, lat: 16.7567, lng: 100.1172 },
  { id: '5', name: 'รพ.บางกระทุ่ม', code: '11257', sizeLevel: HospitalSizeLevel.F2, sapLevel: HospitalSapLevel.S, affiliation: HospitalAffiliation.MOPH, lat: 16.5744, lng: 100.3056 },
  { id: '6', name: 'รพ.พรหมพิราม', code: '11262', sizeLevel: HospitalSizeLevel.F2, sapLevel: HospitalSapLevel.S_PLUS, affiliation: HospitalAffiliation.MOPH, lat: 16.9456, lng: 100.2078 },
  { id: '7', name: 'รพ.วัดโบสถ์', code: '11260', sizeLevel: HospitalSizeLevel.F2, sapLevel: HospitalSapLevel.S_PLUS, affiliation: HospitalAffiliation.MOPH, lat: 16.9500, lng: 100.3333 },
  { id: '8', name: 'รพ.วังทอง', code: '11261', sizeLevel: HospitalSizeLevel.F1, sapLevel: HospitalSapLevel.A, affiliation: HospitalAffiliation.MOPH, lat: 16.8167, lng: 100.4333 },
  { id: '9', name: 'รพ.เนินมะปราง', code: '11263', sizeLevel: HospitalSizeLevel.F2, sapLevel: HospitalSapLevel.S, affiliation: HospitalAffiliation.MOPH, lat: 16.5500, lng: 100.6333 }
];

const getHospInfo = (id: string): HospitalMaster => {
  const hosp = HOSPITAL_MASTER.find(h => h.id === id);
  if (!hosp) throw new Error(`Hospital ID ${id} not found`);
  return hosp;
};

// ----------------------------------------------------------------------
// ONE LR DATA
// ----------------------------------------------------------------------

export const LR_DATA: LRData[] = [
  { ...getHospInfo('1'), hasPatients: true, status: { waiting: 3, normal: 7, abnormal: 1, miscarriage: 0, notDelivered: 0 } },
  { ...getHospInfo('2'), hasPatients: true, status: { waiting: 2, normal: 4, abnormal: 1, miscarriage: 0, notDelivered: 0 } },
  { ...getHospInfo('3'), hasPatients: true, status: { waiting: 1, normal: 2, abnormal: 0, miscarriage: 0, notDelivered: 0 } },
  { ...getHospInfo('4'), hasPatients: false, status: { waiting: 0, normal: 0, abnormal: 0, miscarriage: 0, notDelivered: 0 } },
  { ...getHospInfo('5'), hasPatients: true, status: { waiting: 1, normal: 3, abnormal: 0, miscarriage: 0, notDelivered: 0 } },
  { ...getHospInfo('6'), hasPatients: true, status: { waiting: 2, normal: 5, abnormal: 1, miscarriage: 0, notDelivered: 0 } },
  { ...getHospInfo('7'), hasPatients: false, status: { waiting: 0, normal: 0, abnormal: 0, miscarriage: 0, notDelivered: 0 } },
  { ...getHospInfo('8'), hasPatients: true, status: { waiting: 2, normal: 4, abnormal: 1, miscarriage: 0, notDelivered: 0 } },
  { ...getHospInfo('9'), hasPatients: true, status: { waiting: 1, normal: 2, abnormal: 0, miscarriage: 0, notDelivered: 0 } }
];

// ----------------------------------------------------------------------
// ONE ICU DATA (Realistic Capacity)
// ----------------------------------------------------------------------

export const ICU_DATA: ICUData[] = [
  {
    ...getHospInfo('1'),
    wards: [
      { name: 'ICU Medicine', totalBeds: 24, usedBeds: 22 },
      { name: 'ICU Surgery', totalBeds: 20, usedBeds: 21 }, // Over
      { name: 'CCU (Cardio)', totalBeds: 12, usedBeds: 10 },
      { name: 'Neuro ICU', totalBeds: 10, usedBeds: 9 },
      { name: 'PICU(เด็ก)', totalBeds: 8, usedBeds: 6 },
    ]
  },
  {
    ...getHospInfo('2'),
    wards: [
      { name: 'Semi ICU', totalBeds: 4, usedBeds: 0 }
    ]
  },
  {
    ...getHospInfo('3'),
    wards: [{ name: 'Semi ICU', totalBeds: 4, usedBeds: 0 }]
  },
  {
    ...getHospInfo('4'),
    wards: [{ name: 'Semi ICU', totalBeds: 4, usedBeds: 0 }]
  },
  {
    ...getHospInfo('5'),
    wards: [{ name: 'Semi ICU', totalBeds: 4, usedBeds: 0 }]
  },
  {
    ...getHospInfo('6'),
    wards: [{ name: 'Semi ICU', totalBeds: 4, usedBeds: 0 }]
  },
  {
    ...getHospInfo('7'),
    wards: [{ name: 'Semi ICU', totalBeds: 4, usedBeds: 0 }]
  },
  {
    ...getHospInfo('8'),
    wards: [
      { name: 'Semi ICU', totalBeds: 4, usedBeds: 0 }
    ]
  },
  {
    ...getHospInfo('9'),
    wards: [{ name: 'Semi ICU', totalBeds: 4, usedBeds: 0 }]
  }
];

// ----------------------------------------------------------------------
// ONE IPD DATA (No Special, No General Wards - Specific Departments)
// ----------------------------------------------------------------------

export const IPD_DATA: IPDData[] = [
  {
    ...getHospInfo('1'),
    wards: [
      { name: 'อายุรกรรมชาย 1', totalBeds: 32, usedBeds: 32 },
      { name: 'อายุรกรรมหญิง 1', totalBeds: 32, usedBeds: 35 },
      { name: 'ศัลยกรรมชาย', totalBeds: 40, usedBeds: 38 },
      { name: 'ศัลยกรรมหญิง', totalBeds: 40, usedBeds: 36 },
      { name: 'ศัลยกรรมกระดูก', totalBeds: 35, usedBeds: 30 },
      { name: 'กุมารเวชกรรม', totalBeds: 40, usedBeds: 25 },
      { name: 'จักษุ โสต นาสิก', totalBeds: 30, usedBeds: 18 },
      { name: 'นรีเวชกรรม', totalBeds: 30, usedBeds: 22 },
    ]
  },
  {
    ...getHospInfo('2'),
    wards: [
      { name: 'ผู้ป่วยในชาย', totalBeds: 30, usedBeds: 24 },
      { name: 'ผู้ป่วยในหญิง', totalBeds: 30, usedBeds: 28 },
      { name: 'กุมารเวชกรรม', totalBeds: 10, usedBeds: 6 },
    ]
  },
  {
    ...getHospInfo('8'),
    wards: [
      { name: 'อายุรกรรมชาย', totalBeds: 30, usedBeds: 28 },
      { name: 'อายุรกรรมหญิง', totalBeds: 30, usedBeds: 31 },
      { name: 'ศัลยกรรม', totalBeds: 20, usedBeds: 15 },
      { name: 'กุมารเวชกรรม', totalBeds: 15, usedBeds: 8 },
      { name: 'สงฆ์อาพาธ', totalBeds: 8, usedBeds: 3 },
    ]
  },
  {
    ...getHospInfo('3'),
    wards: [
      { name: 'ผู้ป่วยในชาย', totalBeds: 20, usedBeds: 12 },
      { name: 'ผู้ป่วยในหญิง', totalBeds: 20, usedBeds: 15 },
    ]
  },
  {
    ...getHospInfo('4'),
    wards: [
      { name: 'ผู้ป่วยในชาย', totalBeds: 25, usedBeds: 25 },
      { name: 'ผู้ป่วยในหญิง', totalBeds: 25, usedBeds: 27 },
    ]
  },
  {
    ...getHospInfo('5'),
    wards: [
      { name: 'ผู้ป่วยในชาย', totalBeds: 20, usedBeds: 14 },
      { name: 'ผู้ป่วยในหญิง', totalBeds: 20, usedBeds: 16 },
    ]
  },
  {
    ...getHospInfo('6'),
    wards: [
      { name: 'ผู้ป่วยในชาย', totalBeds: 25, usedBeds: 20 },
      { name: 'ผู้ป่วยในหญิง', totalBeds: 25, usedBeds: 18 },
      { name: 'สงฆ์อาพาธ', totalBeds: 4, usedBeds: 1 },
    ]
  },
  {
    ...getHospInfo('7'),
    wards: [
      { name: 'ผู้ป่วยในชาย', totalBeds: 20, usedBeds: 10 },
      { name: 'ผู้ป่วยในหญิง', totalBeds: 20, usedBeds: 12 },
    ]
  },
  {
    ...getHospInfo('9'),
    wards: [
      { name: 'ผู้ป่วยในชาย', totalBeds: 18, usedBeds: 14 },
      { name: 'ผู้ป่วยในหญิง', totalBeds: 18, usedBeds: 10 },
    ]
  }
];

// ----------------------------------------------------------------------
// ONE OR DATA
// ----------------------------------------------------------------------

export const OR_DATA: ORData[] = [
  { ...getHospInfo('1'), totalRooms: 18, activeSurgeries: 14, scheduledToday: 42, emergencyCases: 3, availableRooms: 1 },
  { ...getHospInfo('2'), totalRooms: 3, activeSurgeries: 1, scheduledToday: 5, emergencyCases: 0, availableRooms: 2 },
  { ...getHospInfo('8'), totalRooms: 4, activeSurgeries: 3, scheduledToday: 12, emergencyCases: 1, availableRooms: 0 }
];

// ----------------------------------------------------------------------
// WAITING & VISIT DATA (Dynamic Dates)
// ----------------------------------------------------------------------

// Generate last 7 days dynamically
const DYNAMIC_DATES = generateMockDates(7);

export const WAITING_DATA: WaitingData[] = HOSPITAL_MASTER.map(h => ({
  ...h,
  data: DYNAMIC_DATES.map(d => ({ ...d, minutes: 60 + Math.floor(Math.random() * 120) }))
}));

export const VISIT_DATA: VisitData[] = HOSPITAL_MASTER.map(h => ({
  ...h,
  data: DYNAMIC_DATES.map(d => ({ ...d, count: h.sizeLevel === HospitalSizeLevel.A || h.sizeLevel === HospitalSizeLevel.S ? 2500 + Math.floor(Math.random() * 500) : 200 + Math.floor(Math.random() * 300) }))
}));