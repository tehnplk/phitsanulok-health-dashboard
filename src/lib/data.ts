import { prisma } from './prisma';
import type { ICUData, IPDData, LRData, ORData, VisitData, WaitingData, HospitalMaster } from './types';

export async function getHospitals(): Promise<HospitalMaster[]> {
  return prisma.hospital.findMany({ orderBy: { code: 'asc' } });
}

export async function getLRData(): Promise<LRData[]> {
  const rows = await prisma.hospital.findMany({
    include: { lrStatus: true },
    orderBy: { code: 'asc' },
  });

  return rows
    .filter((h) => h.lrStatus)
    .map((h) => ({
      id: h.id,
      name: h.name,
      code: h.code,
      sizeLevel: h.sizeLevel,
      sapLevel: h.sapLevel,
      affiliation: h.affiliation,
      lat: h.lat,
      lng: h.lng,
      status: {
        waiting: h.lrStatus!.waiting,
        normal: h.lrStatus!.normal,
        abnormal: h.lrStatus!.abnormal,
        miscarriage: h.lrStatus!.miscarriage,
        notDelivered: h.lrStatus!.notDelivered,
      },
      hasPatients:
        h.lrStatus!.waiting +
          h.lrStatus!.normal +
          h.lrStatus!.abnormal +
          h.lrStatus!.miscarriage +
          h.lrStatus!.notDelivered >
        0,
    }));
}

export async function getICUData(): Promise<ICUData[]> {
  const rows = await prisma.hospital.findMany({
    include: { icuWards: true },
    orderBy: { code: 'asc' },
  });

  return rows
    .filter((h) => h.icuWards.length > 0)
    .map((h) => ({
      id: h.id,
      name: h.name,
      code: h.code,
      sizeLevel: h.sizeLevel,
      sapLevel: h.sapLevel,
      affiliation: h.affiliation,
      lat: h.lat,
      lng: h.lng,
      wards: h.icuWards.map((w) => ({ name: w.name, totalBeds: w.totalBeds, usedBeds: w.usedBeds })),
    }));
}

export async function getIPDData(): Promise<IPDData[]> {
  const rows = await prisma.hospital.findMany({
    include: { ipdWards: true },
    orderBy: { code: 'asc' },
  });

  return rows
    .filter((h) => h.ipdWards.length > 0)
    .map((h) => ({
      id: h.id,
      name: h.name,
      code: h.code,
      sizeLevel: h.sizeLevel,
      sapLevel: h.sapLevel,
      affiliation: h.affiliation,
      lat: h.lat,
      lng: h.lng,
      wards: h.ipdWards.map((w) => ({ name: w.name, totalBeds: w.totalBeds, usedBeds: w.usedBeds })),
    }));
}

export async function getORData(): Promise<ORData[]> {
  const rows = await prisma.hospital.findMany({
    include: { orStat: true },
    orderBy: { code: 'asc' },
  });

  return rows
    .filter((h) => h.orStat)
    .map((h) => ({
      id: h.id,
      name: h.name,
      code: h.code,
      sizeLevel: h.sizeLevel,
      sapLevel: h.sapLevel,
      affiliation: h.affiliation,
      lat: h.lat,
      lng: h.lng,
      totalRooms: h.orStat!.totalRooms,
      activeSurgeries: h.orStat!.activeSurgeries,
      scheduledToday: h.orStat!.scheduledToday,
      emergencyCases: h.orStat!.emergencyCases,
      availableRooms: h.orStat!.availableRooms,
    }));
}

export async function getWaitingData(): Promise<WaitingData[]> {
  const rows = await prisma.hospital.findMany({
    include: { waitingTimes: true },
    orderBy: { code: 'asc' },
  });

  return rows
    .filter((h) => h.waitingTimes.length > 0)
    .map((h) => ({
      id: h.id,
      name: h.name,
      code: h.code,
      sizeLevel: h.sizeLevel,
      sapLevel: h.sapLevel,
      affiliation: h.affiliation,
      lat: h.lat,
      lng: h.lng,
      data: h.waitingTimes.map((t) => ({ date: t.date, dayName: t.dayName, minutes: t.minutes })),
    }));
}

export async function getVisitData(): Promise<VisitData[]> {
  const rows = await prisma.hospital.findMany({
    include: { visitCounts: true },
    orderBy: { code: 'asc' },
  });

  return rows
    .filter((h) => h.visitCounts.length > 0)
    .map((h) => ({
      id: h.id,
      name: h.name,
      code: h.code,
      sizeLevel: h.sizeLevel,
      sapLevel: h.sapLevel,
      affiliation: h.affiliation,
      lat: h.lat,
      lng: h.lng,
      data: h.visitCounts.map((t) => ({ date: t.date, dayName: t.dayName, count: t.count })),
    }));
}
