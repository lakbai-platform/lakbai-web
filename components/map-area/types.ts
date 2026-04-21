export type POITag = {
  id: string;
  name: string;
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
  tags: POITag[];
  galleries: POIGallery[];
  address?: POIAddress | null;
};
