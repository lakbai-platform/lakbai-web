import {
  MapPin, Utensils, Landmark, TreePine, Bed, ShoppingBag,
  Beer, Coffee, Croissant, CookingPot, Church,
  Shrub, Footprints, Mountain, Tractor, Binoculars, Hotel, Road,
  ShoppingBasket
} from 'lucide-react';
import type { POITag } from './types';

import { Chapel } from '@/components/icons/Chapel';
import { Mosque } from '@/components/icons/Mosque';
import { Monument } from '@/components/icons/Monument';
import { Beach } from '@/components/icons/Beach';

const customIcons: Record<string, React.ElementType> = {
  Chapel,
  Mosque,
  Monument,
  Beach,
};

const lucideIconsMap: Record<string, React.ElementType> = {
  Utensils, Landmark, TreePine, Bed, ShoppingBag,
  Beer, Coffee, Croissant, CookingPot, Church,
  Shrub, Footprints, Mountain, Tractor, Binoculars, Hotel,
  Road, ShoppingBasket, MapPin
};

export const getTagIcon = (
  tags: POITag[]
): { icon: any; color: string } => {
  if (!tags || tags.length === 0) {
    return { icon: MapPin, color: 'bg-blue-500' };
  }

  const primaryTag = tags[0];

  const iconNameStr = primaryTag.iconName || primaryTag.cluster?.iconName;

  let icon: any = MapPin;
  if (iconNameStr?.startsWith('custom:')) {
    const customName = iconNameStr.replace('custom:', '');
    if (customIcons[customName]) {
      icon = customIcons[customName];
    }
  } else if (iconNameStr && lucideIconsMap[iconNameStr]) {
    icon = lucideIconsMap[iconNameStr];
  }

  // Derive color based on cluster
  const clusterName = primaryTag.cluster?.name?.toLowerCase() || '';
  let color = 'bg-blue-500'; // Default fallback

  switch (clusterName) {
    case 'food':
    case 'eats': // graceful fallback for old data
      color = 'bg-orange-500';
      break;
    case 'attractions':
      color = 'bg-purple-500';
      break;
    case 'nature':
      color = 'bg-emerald-600';
      break;
    case 'accommodations':
    case 'accomodations':
      color = 'bg-indigo-500';
      break;
    case 'malls':
      color = 'bg-amber-500';
      break;
  }

  return { icon, color };
};
