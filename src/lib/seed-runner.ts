import { PrismaClient } from '../prisma/generated/client';
import { hospitalSeed, icuWardsSeed, ipdWardsSeed, lrSeed, orSeed, waitAndVisitSeed } from './seed-data';

export async function seedDatabase(client: PrismaClient) {
  // Log available delegates when seeding to make failures easier to trace in CI/dev
  // This stays lightweight and avoids altering seed state.
  console.log('Seeding with delegates:', Object.keys(client));

  await client.$connect();

  const waitingDelegate = client.waitingTime;
  const visitDelegate = client.visitCount;
  const icuDelegate = (client as any).iCUWard;
  const ipdDelegate = (client as any).iPDWard;

  if (!waitingDelegate || !visitDelegate || !icuDelegate || !ipdDelegate) {
    throw new Error('Prisma delegates not initialized correctly');
  }

  await waitingDelegate.deleteMany();
  await visitDelegate.deleteMany();
  await icuDelegate.deleteMany();
  await ipdDelegate.deleteMany();
  await client.lrStatus.deleteMany();
  await client.orStat.deleteMany();
  await client.hospital.deleteMany();

  await client.hospital.createMany({ data: hospitalSeed });

  for (const lr of lrSeed) {
    await client.lrStatus.create({
      data: {
        hospitalId: lr.id,
        waiting: lr.waiting,
        normal: lr.normal,
        abnormal: lr.abnormal,
        miscarriage: lr.miscarriage,
        notDelivered: lr.notDelivered,
      },
    });
  }

  for (const icu of icuWardsSeed) {
    for (const ward of icu.wards) {
      await icuDelegate.create({
        data: {
          hospitalId: icu.id,
          name: ward.name,
          totalBeds: ward.totalBeds,
          usedBeds: ward.usedBeds,
        },
      });
    }
  }

  for (const ipd of ipdWardsSeed) {
    for (const ward of ipd.wards) {
      await ipdDelegate.create({
        data: {
          hospitalId: ipd.id,
          name: ward.name,
          totalBeds: ward.totalBeds,
          usedBeds: ward.usedBeds,
        },
      });
    }
  }

  for (const or of orSeed) {
    await client.orStat.create({
      data: {
        hospitalId: or.id,
        totalRooms: or.totalRooms,
        activeSurgeries: or.activeSurgeries,
        scheduledToday: or.scheduledToday,
        emergencyCases: or.emergencyCases,
        availableRooms: or.availableRooms,
      },
    });
  }

  const { waiting, visits } = waitAndVisitSeed();

  await client.waitingTime.createMany({
    data: waiting.flatMap((h) =>
      h.data.map((d) => ({
        hospitalId: h.id,
        date: d.date,
        dayName: d.dayName,
        minutes: d.minutes,
      }))
    ),
  });

  await client.visitCount.createMany({
    data: visits.flatMap((h) =>
      h.data.map((d) => ({
        hospitalId: h.id,
        date: d.date,
        dayName: d.dayName,
        count: d.count,
      }))
    ),
  });
}
