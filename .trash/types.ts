export enum HospitalSizeLevel {
  S = 'S',
  A = 'A',
  M1 = 'M1',
  M2 = 'M2',
  F1 = 'F1',
  F2 = 'F2',
  F3 = 'F3',
  P = 'P'
}

export enum HospitalSapLevel {
  S = 'S',
  S_PLUS = 'S+',
  A = 'A',
  A_PLUS = 'A+',
  P = 'P',
  P_PLUS = 'P+'
}

export enum HospitalAffiliation {
  MOPH = 'สธ',
  LAO = 'อปท',
  MOD = 'กลาโหม',
  UNIVERSITY = 'มหาวิทยาลัย'
}

export interface HospitalMaster {
  id: string;
  name: string;
  code: string;
  sizeLevel: HospitalSizeLevel;
  sapLevel: HospitalSapLevel;
  affiliation: HospitalAffiliation;
  lat?: number;
  lng?: number;
}

export interface PatientStatus {
  waiting: number; // รอคลอด
  normal: number; // คลอดปกติ
  abnormal: number; // คลอดผิดปกติ
  miscarriage: number; // แท้ง
  notDelivered: number; // ไม่คลอด
}

export interface LRData extends HospitalMaster {
  status: PatientStatus;
  hasPatients: boolean;
}

export interface IPDWard {
  name: string;
  totalBeds: number;
  usedBeds: number;
}

export interface IPDData extends HospitalMaster {
  wards: IPDWard[];
}

export interface ICUWard {
  name: string;
  totalBeds: number;
  usedBeds: number;
}

export interface ICUData extends HospitalMaster {
  wards: ICUWard[];
}

export interface ORData extends HospitalMaster {
  totalRooms: number;
  activeSurgeries: number;
  scheduledToday: number;
  emergencyCases: number;
  availableRooms: number;
}

export interface DailyWaitData {
  date: string;
  dayName: string; // e.g., 'จ.', 'อ.'
  minutes: number;
}

export interface WaitingData extends HospitalMaster {
  data: DailyWaitData[];
}

export interface DailyVisitData {
  date: string;
  dayName: string;
  count: number;
}

export interface VisitData extends HospitalMaster {
  data: DailyVisitData[];
}

export type ViewType = 'hospital' | 'onelr' | 'oneor' | 'oneipd' | 'oneicu' | 'waiting' | 'waiting-daily' | 'waiting-weekly' | 'waiting-monthly' | 'opd-visit';