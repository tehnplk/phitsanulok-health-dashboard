import { prisma } from '../lib/prisma';
import { seedDatabase } from '../lib/seed-runner';

async function main() {
  await seedDatabase(prisma);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
