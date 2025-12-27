import { prisma } from '../lib/prisma';

async function main() {
  const hospitals = await prisma.hospital.findMany({ take: 1, orderBy: { code: 'asc' } });
  console.log('hospitals[0]:', hospitals[0]);
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
