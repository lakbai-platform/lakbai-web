import * as LucideIcons from 'lucide-react';
import { MapPin, type LucideIcon } from 'lucide-react';
import type { POITag } from './types';

export const getTagIcon = (
  tags: POITag[]
): { icon: LucideIcon; color: string } => {
  if (!tags || tags.length === 0) {
    return { icon: MapPin, color: 'bg-blue-500' };
  }

  const primaryTag = tags[0];

  // Resolve the iconName: prefer specific tag icon, fallback to cluster general icon
  const iconNameStr = primaryTag.iconName || primaryTag.cluster?.iconName;
  
  let icon: LucideIcon = MapPin;
  if (iconNameStr && iconNameStr in LucideIcons) {
    icon = (LucideIcons as any)[iconNameStr];
  }

  // Derive color based on cluster
  const clusterName = primaryTag.cluster?.name?.toLowerCase() || '';
  let color = 'bg-blue-500'; // Default fallback

  switch (clusterName) {
    case 'eats':
      color = 'bg-orange-500';
      break;
    case 'attractions':
      color = 'bg-purple-500';
      break;
    case 'nature':
      color = 'bg-emerald-600';
      break;
    case 'accomodations':
      color = 'bg-indigo-500';
      break;
    case 'malls':
      color = 'bg-amber-500';
      break;
  }

  return { icon, color };
};
