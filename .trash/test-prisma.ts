import { prisma } from '../lib/prisma';

async function main() {
  console.log('delegate type', typeof prisma.waitingTime);
  await prisma.waitingTime.deleteMany();
  console.log('delete ok');
  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
