import 'dotenv/config';
import { prisma } from '../lib/prisma';

async function main() {
  const pois = await prisma.pOI.findMany({
    include: {
      tags: { include: { cluster: true } },
      galleries: true,
      address: true,
    }
  });
  console.log("Found POIs:", pois.length);
}

main().catch(console.error).finally(() => prisma.$disconnect());
