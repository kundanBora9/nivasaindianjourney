import { Destination } from './types';

export const DESTINATIONS: Destination[] = [
  {
    slug: 'jaipur',
    name: 'Jaipur',
    state: 'Rajasthan',
    tagline: 'The Royal Pink City of Fortresses & Palaces',
    description: 'Founded in 1727 by Maharaja Sawai Jai Singh II, Jaipur is a vibrant UNESCO World Heritage city characterized by terracotta-pink facades, hilltop bastions, astronomical observatories, and exquisite royal handicraft bazaars.',
    bestTimeToVisit: 'October to March (15°C – 28°C)',
    keyAttractions: ['Amer Fort & Sheesh Mahal', 'Hawa Mahal (Palace of Winds)', 'City Palace & Chandra Mahal', 'Jantar Mantar (UNESCO)', 'Jal Mahal', 'Nahargarh Fort'],
    climate: 'Semi-arid with warm sunny winter days and pleasantly cool nights.',
    image: '/images/hawa_mahal_jaipur.jpg',
    recommendedDays: '2 to 3 Days'
  },
  {
    slug: 'agra',
    name: 'Agra',
    state: 'Uttar Pradesh',
    tagline: 'The Mughal Capital & Home to the Taj Mahal',
    description: 'Perched on the banks of the sacred Yamuna River, Agra is home to three UNESCO World Heritage Sites including the ethereal marble Taj Mahal, the imposing red sandstone Agra Fort, and nearby Fatehpur Sikri.',
    bestTimeToVisit: 'October to April (Taj closed on Fridays)',
    keyAttractions: ['The Taj Mahal at Sunrise', 'Agra Fort & Diwan-i-Khas', 'Mehtab Bagh Riverfront Garden', 'Itmad-ud-Daulah (Baby Taj)', 'Fatehpur Sikri'],
    climate: 'Pleasant winter months with crisp morning mist.',
    image: '/images/taj_mahal_hero.jpg',
    recommendedDays: '1 to 2 Days'
  },
  {
    slug: 'udaipur',
    name: 'Udaipur',
    state: 'Rajasthan',
    tagline: 'The City of Lakes & Royal Venetian Romance',
    description: 'Revered as the Venice of the East, Udaipur is nestled amid the ancient Aravalli mountains and centered on Lake Pichola. Its white marble island palaces, historic havelis, and tranquil waters evoke fairy-tale majesty.',
    bestTimeToVisit: 'September to March (12°C – 26°C)',
    keyAttractions: ['City Palace Complex', 'Lake Pichola Sunset Boat Cruise', 'Jag Mandir Palace', 'Saheliyon Ki Bari', 'Sajjangarh (Monsoon Palace)', 'Bagore Ki Haveli'],
    climate: 'Moderate sub-tropical with serene evening lake breezes.',
    image: '/images/udaipur_lake_palace.jpg',
    recommendedDays: '2 to 3 Days'
  },
  {
    slug: 'jodhpur',
    name: 'Jodhpur',
    state: 'Rajasthan',
    tagline: 'The Indigo Sun City & Fortress of the Rathores',
    description: 'Dominated by the colossal Mehrangarh Fort rising 400 feet above the desert plains, Jodhpur mesmerizes travellers with its labyrinth of indigo-painted houses, spice markets, and heroic Rajput chivalric history.',
    bestTimeToVisit: 'October to March',
    keyAttractions: ['Mehrangarh Fort & Museum', 'Jaswant Thada Marble Cenotaph', 'Umaid Bhawan Palace', 'Clock Tower & Sardar Market', 'Mandore Gardens'],
    climate: 'Dry sunny days and crisp clear desert nights.',
    image: '/images/jodhpur_blue_city.jpg',
    recommendedDays: '2 Days'
  },
  {
    slug: 'jaisalmer',
    name: 'Jaisalmer',
    state: 'Rajasthan',
    tagline: 'The Golden City in the Heart of Thar Desert',
    description: 'Rising out of the yellow sand dunes of the Thar Desert, Jaisalmer is crowned by a living 12th-century fort. Intricately carved merchant havelis and camel safaris make it an unforgettable desert wonderland.',
    bestTimeToVisit: 'October to March (Ideal for camping)',
    keyAttractions: ['Sonar Qila (Jaisalmer Living Fort)', 'Sam Sand Dunes Camel Safari', 'Patwon Ki Haveli', 'Kuldhara Abandoned Village', 'Gadisar Lake'],
    climate: 'True desert climate; warm sunny days with brisk night drops.',
    image: '/images/jaisalmer_desert_camel.jpg',
    recommendedDays: '2 to 3 Days'
  },
  {
    slug: 'delhi',
    name: 'Delhi',
    state: 'National Capital Territory',
    tagline: 'The Historic Seat of Empires & Modern Metropolis',
    description: 'Delhi stands as a living tapestry of eight historical cities, spanning from the Mughal grandeur of Shahjahanabad to the grand imperial avenues designed by Edwin Lutyens, layered with sacred shrines, monuments, and world-class street food.',
    bestTimeToVisit: 'October to March',
    keyAttractions: ['Qutub Minar', 'Humayun’s Tomb', 'Jama Masjid & Chandni Chowk', 'India Gate & Kartavya Path', 'Red Fort', 'Lotus Temple'],
    climate: 'Comfortable sunny winters with temperatures between 10°C and 22°C.',
    image: '/images/delhi_qutub_minar.jpg',
    recommendedDays: '1 to 2 Days'
  },
  {
    slug: 'ranthambore',
    name: 'Ranthambore',
    state: 'Rajasthan',
    tagline: 'Land of the Royal Bengal Tiger & Ancient Ruins',
    description: 'One of the world’s premier tiger sanctuaries where ancient banyan trees, crumbling pavilions, and the UNESCO Ranthambore Fort provide a theatrical backdrop for tiger sightings in their natural wild habitat.',
    bestTimeToVisit: 'October 1 to June 30 (Closed July-September)',
    keyAttractions: ['Open-top Jeep Tiger Safaris', 'Ranthambore Fort & Ganesha Temple', 'Padam Talao Lake', 'Malik Talao Crocodiles', 'Kachida Valley'],
    climate: 'Seasonal park climate with thrilling dawn forest safaris.',
    image: '/images/ranthambore_tiger.jpg',
    recommendedDays: '2 to 3 Days'
  }
];

export function getDestinationBySlug(slug: string): Destination | undefined {
  return DESTINATIONS.find(d => d.slug === slug);
}
