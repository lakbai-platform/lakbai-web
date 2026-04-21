import 'dotenv/config';
import { prisma } from '../lib/prisma';



async function main() {
  const clusters = [
    { name: 'Eats', iconName: 'Utensils', tags: ['Restobar', 'Cafe', 'Bar', 'Bakery', 'Restaurant', 'Plaza', 'restaurant', 'cafe', 'bakery'] },
    { name: 'Attractions', iconName: 'Landmark', tags: ['Church', 'Chapel', 'Mosque', 'Boulevard', 'Shrine', 'Statue', 'Monument', 'Marker', 'Esplanade', 'tourist_attraction', 'historical_landmark', 'church'] },
    { name: 'Nature', iconName: 'TreePine', tags: ['Park', 'Trail', 'Hill', 'Farm', 'Viewpoint', 'park', 'hill', 'mountain', 'atv', 'mountain_biking'] },
    { name: 'Accomodations', iconName: 'Bed', tags: ['Hotel', 'Inn', 'Motel', 'Hometel', 'Resort', 'Apartelle', 'hotel', 'resort'] },
    { name: 'Malls', iconName: 'ShoppingBag', tags: ['Mall', 'mall'] },
  ];

  for (const clusterData of clusters) {
    const cluster = await prisma.pOITagCluster.upsert({
      where: { name: clusterData.name },
      update: { iconName: clusterData.iconName },
      create: { name: clusterData.name, iconName: clusterData.iconName },
    });

    for (const tagName of clusterData.tags) {
      await prisma.pOITag.upsert({
        where: { name: tagName },
        update: { clusterId: cluster.id },
        create: { name: tagName, clusterId: cluster.id },
      });
    }
  }
  console.log("Successfully seeded tags and clusters!");
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
