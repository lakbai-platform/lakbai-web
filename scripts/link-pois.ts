import 'dotenv/config';
import { prisma } from '../lib/prisma';

async function main() {
  const pois = await prisma.pOI.findMany({ include: { tags: true } });
  const allTags = await prisma.pOITag.findMany();

  if (allTags.length === 0) {
    console.log("No tags available to link.");
    return;
  }

  let linkedCount = 0;

  for (const poi of pois) {
    if (poi.tags.length === 0) {
      // Pick a semi-random tag based on length of their name so it is deterministic
      const hash = poi.name.length + poi.id.charCodeAt(0);
      const tagIndex = hash % allTags.length;
      const tag = allTags[tagIndex];

      await prisma.pOI.update({
        where: { id: poi.id },
        data: {
          primaryTagId: tag.id,
          tags: {
            connect: { id: tag.id }
          }
        }
      });
      linkedCount++;
    }
  }

  console.log(`Successfully linked ${linkedCount} POIs to tags!`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
