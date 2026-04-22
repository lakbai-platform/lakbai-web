export type POITagCluster = {
  id: string;
  name: string;
  iconName: string;
};

export type POITag = {
  id: string;
  name: string;
  iconName?: string | null;
  cluster?: POITagCluster | null;
};

export type POIGallery = {
  id: string;
  imageUrl: string;
};

export type POIAddress = {
  street?: string | null;
  barangay?: string | null;
  cityMunicipality?: string | null;
  province?: string | null;
  postalCode?: string | null;
};

export type POI = {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  vouchCount: number;
  primaryTagId?: string | null;
  tags: POITag[];
  galleries: POIGallery[];
  address?: POIAddress | null;
};
