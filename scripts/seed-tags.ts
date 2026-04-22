import 'dotenv/config';
import { prisma } from '../lib/prisma';
import { POI_TAG_CLUSTERS } from '../lib/poi-tag-taxonomy';

async function main() {
  await prisma.pOITag.deleteMany();
  await prisma.pOITagCluster.deleteMany();

  for (const clusterData of POI_TAG_CLUSTERS) {
    const cluster = await prisma.pOITagCluster.upsert({
      where: { id: clusterData.id },
      update: { name: clusterData.name, iconName: clusterData.iconName },
      create: {
        id: clusterData.id,
        name: clusterData.name,
        iconName: clusterData.iconName,
      },
    });

    for (const tagData of clusterData.tags) {
      await prisma.pOITag.upsert({
        where: { id: tagData.id },
        update: {
          name: tagData.name,
          clusterId: cluster.id,
          iconName: tagData.iconName,
        },
        create: {
          id: tagData.id,
          name: tagData.name,
          clusterId: cluster.id,
          iconName: tagData.iconName,
        },
      });
    }
  }
  console.log("Successfully seeded tags and clusters!");
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());

