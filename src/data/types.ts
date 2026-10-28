export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  meals?: string;
  stay?: string;
  highlights?: string[];
  image?: string;
  timeOfDay?: string;
  approxDuration?: string;
}

export interface TourPackage {
  id: string;
  slug: string;
  title: string;
  category: 'rajasthan' | 'golden-triangle' | 'agra-taj' | 'delhi' | 'same-day';
  categoryLabel: string;
  destination: string;
  duration: string;
  durationDays: number;
  durationNights: number;
  startingPrice?: string;
  priceNote?: string;
  overview: string;
  idealFor: string;
  highlights: string[];
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  transportDetails: string;
  bestTimeToVisit: string;
  featuredImage: string;
  galleryImages: string[];
  faqs: { question: string; answer: string }[];
  isFeatured?: boolean;
  isOffer?: boolean;
  offerTag?: string;
}

export interface Destination {
  slug: string;
  name: string;
  state: string;
  tagline: string;
  description: string;
  bestTimeToVisit: string;
  keyAttractions: string[];
  climate: string;
  image: string;
  recommendedDays: string;
}

export interface TourOffer {
  id: string;
  slug: string;
  category: 'rajasthan' | 'golden-triangle';
  title: string;
  duration: string;
  offerPrice?: string;
  originalPrice?: string;
  savings?: string;
  validity: string;
  route: string;
  highlights: string[];
  inclusions: string[];
  terms: string[];
  image?: string;
  galleryImages?: string[];
  relatedPackageSlug?: string;
  overview?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  publishDate: string;
  readTime: string;
  tags: string[];
  image: string;
  keyTakeaways: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'booking' | 'rajasthan' | 'golden-triangle' | 'transport' | 'cancellation';
}
