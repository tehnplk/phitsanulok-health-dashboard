export const HospitalSizeLevel = {
  S: 'S',
  A: 'A',
  M1: 'M1',
  M2: 'M2',
  F1: 'F1',
  F2: 'F2',
  F3: 'F3',
  P: 'P',
} as const;

export type HospitalSizeLevel = (typeof HospitalSizeLevel)[keyof typeof HospitalSizeLevel];

export const HospitalSapLevel = {
  S: 'S',
  S_PLUS: 'S_PLUS',
  A: 'A',
  A_PLUS: 'A_PLUS',
  P: 'P',
  P_PLUS: 'P_PLUS',
} as const;

export type HospitalSapLevel = (typeof HospitalSapLevel)[keyof typeof HospitalSapLevel];

export const HospitalAffiliation = {
  MOPH: 'MOPH',
  LAO: 'LAO',
  MOD: 'MOD',
  UNIVERSITY: 'UNIVERSITY',
} as const;

export type HospitalAffiliation =
  (typeof HospitalAffiliation)[keyof typeof HospitalAffiliation];

export type ViewType =
  | 'hospital'
  | 'one-lr'
  | 'one-or'
  | 'one-icu'
  | 'one-ipd'
  | 'waiting-daily'
  | 'waiting-weekly'
  | 'waiting-monthly'
  | 'opd-visit';

export interface HospitalMaster {
  id: string;
  name: string;
  code: string;
  sizeLevel: HospitalSizeLevel;
  sapLevel: HospitalSapLevel;
  affiliation: HospitalAffiliation;
  lat?: number | null;
  lng?: number | null;
}

export interface PatientStatus {
  waiting: number;
  normal: number;
  abnormal: number;
  miscarriage: number;
  notDelivered: number;
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
  dayName: string;
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
