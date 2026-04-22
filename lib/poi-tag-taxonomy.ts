export type POITagSeed = {
  id: string;
  name: string;
  iconName: string;
  clusterId: string;
};

export type POITagClusterSeed = {
  id: string;
  name: string;
  iconName: string;
  tags: POITagSeed[];
};

export const POI_TAG_CLUSTERS: POITagClusterSeed[] = [
  {
    id: 'FOOD',
    name: 'FOOD',
    iconName: 'Utensils',
    tags: [
      { id: 'Restobar', name: 'Restobar', iconName: 'Beer', clusterId: 'FOOD' },
      { id: 'Cafe', name: 'Cafe', iconName: 'Coffee', clusterId: 'FOOD' },
      { id: 'Bar', name: 'Bar', iconName: 'Beer', clusterId: 'FOOD' },
      { id: 'Bakery', name: 'Bakery', iconName: 'Croissant', clusterId: 'FOOD' },
      { id: 'Restaurant', name: 'Restaurant', iconName: 'Utensils', clusterId: 'FOOD' },
      { id: 'Plaza', name: 'Plaza', iconName: 'CookingPot', clusterId: 'FOOD' },
    ],
  },
  {
    id: 'ATTRACTIONS',
    name: 'ATTRACTIONS',
    iconName: 'Landmark',
    tags: [
      { id: 'Church', name: 'Church', iconName: 'Church', clusterId: 'ATTRACTIONS' },
      { id: 'Chapel', name: 'Chapel', iconName: 'custom:Chapel', clusterId: 'ATTRACTIONS' },
      { id: 'Mosque', name: 'Mosque', iconName: 'custom:Mosque', clusterId: 'ATTRACTIONS' },
      { id: 'Boulevard', name: 'Boulevard', iconName: 'Road', clusterId: 'ATTRACTIONS' },
      { id: 'Shrine', name: 'Shrine', iconName: 'custom:Chapel', clusterId: 'ATTRACTIONS' },
      { id: 'Statue', name: 'Statue', iconName: 'custom:Monument', clusterId: 'ATTRACTIONS' },
      { id: 'Monument', name: 'Monument', iconName: 'custom:Monument', clusterId: 'ATTRACTIONS' },
      { id: 'Marker', name: 'Marker', iconName: 'custom:Monument', clusterId: 'ATTRACTIONS' },
      { id: 'Esplanade', name: 'Esplanade', iconName: 'Road', clusterId: 'ATTRACTIONS' },
    ],
  },
  {
    id: 'NATURE',
    name: 'NATURE',
    iconName: 'TreePine',
    tags: [
      { id: 'Park', name: 'Park', iconName: 'Shrub', clusterId: 'NATURE' },
      { id: 'Trail', name: 'Trail', iconName: 'Footprints', clusterId: 'NATURE' },
      { id: 'Hill', name: 'Hill', iconName: 'Mountain', clusterId: 'NATURE' },
      { id: 'Farm', name: 'Farm', iconName: 'Tractor', clusterId: 'NATURE' },
      { id: 'Viewpoint', name: 'Viewpoint', iconName: 'Binoculars', clusterId: 'NATURE' },
    ],
  },
  {
    id: 'ACCOMODATIONS',
    name: 'ACCOMODATIONS',
    iconName: 'Hotel',
    tags: [
      { id: 'Hotel', name: 'Hotel', iconName: 'Hotel', clusterId: 'ACCOMODATIONS' },
      { id: 'Inn', name: 'Inn', iconName: 'Hotel', clusterId: 'ACCOMODATIONS' },
      { id: 'Motel', name: 'Motel', iconName: 'Hotel', clusterId: 'ACCOMODATIONS' },
      { id: 'Hometel', name: 'Hometel', iconName: 'Hotel', clusterId: 'ACCOMODATIONS' },
      { id: 'Resort', name: 'Resort', iconName: 'custom:Beach', clusterId: 'ACCOMODATIONS' },
      { id: 'Apartelle', name: 'Apartelle', iconName: 'Hotel', clusterId: 'ACCOMODATIONS' },
    ],
  },
  {
    id: 'MALLS',
    name: 'MALLS',
    iconName: 'ShoppingBasket',
    tags: [
      { id: 'Mall', name: 'Mall', iconName: 'ShoppingBasket', clusterId: 'MALLS' },
    ],
  },
];

const TAG_BY_LOWER_NAME = new Map(
  POI_TAG_CLUSTERS.flatMap((cluster) =>
    cluster.tags.map((tag) => [tag.name.toLowerCase(), tag] as const)
  )
);

export function findTagSeedByName(tagName?: string | null): POITagSeed | undefined {
  if (!tagName) return undefined;
  return TAG_BY_LOWER_NAME.get(tagName.trim().toLowerCase());
}
