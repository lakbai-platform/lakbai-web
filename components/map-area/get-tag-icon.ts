import {
  MapPin,
  Utensils,
  Coffee,
  Mountain,
  Bike,
  Landmark,
  Bed,
  Leaf,
  type LucideIcon,
} from 'lucide-react';

import type { POITag } from './types';

export const getTagIcon = (
  tags: POITag[]
): { icon: LucideIcon; color: string } => {
  if (!tags || tags.length === 0) {
    return { icon: MapPin, color: 'bg-blue-500' };
  }

  const tagName = tags[0].name.toLowerCase();

  if (['restaurant', 'bakery'].includes(tagName)) {
    return { icon: Utensils, color: 'bg-orange-500' };
  }
  if (tagName === 'cafe') {
    return { icon: Coffee, color: 'bg-amber-600' };
  }
  if (['hill', 'mountain', 'mountain_biking'].includes(tagName)) {
    return { icon: Mountain, color: 'bg-emerald-600' };
  }
  if (['park', 'atv'].includes(tagName)) {
    return { icon: Bike, color: 'bg-green-500' };
  }
  if (['tourist_attraction', 'historical_landmark', 'church'].includes(tagName)) {
    return { icon: Landmark, color: 'bg-purple-500' };
  }
  if (['hotel', 'resort'].includes(tagName)) {
    return { icon: Bed, color: 'bg-indigo-500' };
  }
  if (tagName === 'spa') {
    return { icon: Leaf, color: 'bg-teal-500' };
  }

  return { icon: MapPin, color: 'bg-blue-500' };
};
