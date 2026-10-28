import { TourPackage } from './types';

export const TOUR_PACKAGES: TourPackage[] = [
  // --- RAJASTHAN TOURS ---
  {
    id: 'raj-01',
    slug: 'rajasthan-tour-packages',
    title: 'Royal Rajasthan Heritage & Palaces Tour',
    category: 'rajasthan',
    categoryLabel: 'Rajasthan Tours',
    destination: 'Jaipur · Jodhpur · Udaipur · Pushkar',
    duration: '8 Days / 7 Nights',
    durationDays: 8,
    durationNights: 7,
    startingPrice: 'Quote on Request',
    priceNote: 'Inclusive of dedicated private AC Sedan/SUV, heritage stays & monument guides',
    overview: 'Experience the regal heart of India across the fabled desert kingdom of Rajasthan. Wander through Jaipur’s terracotta palaces, stand atop Jodhpur’s impregnable Mehrangarh Fort, cross the sacred ghats of Pushkar, and cruise the shimmering waters of Lake Pichola in romantic Udaipur.',
    idealFor: 'Couples, heritage enthusiasts, and families seeking an authentic royal cultural immersion.',
    highlights: [
      'Private guided excursion of Amber Fort and the dazzling Sheesh Mahal',
      'Panoramic sunset views over the Blue City from Mehrangarh Fort ramparts',
      'Private sunset boat cruise on Lake Pichola overlooking City Palace',
      'Sacred Brahma Temple and evening Aarti ceremony at holy Pushkar Lake',
      'Stay in handpicked verified heritage Haveli boutique properties'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Jaipur — The Terracotta Capital',
        description: 'Meet and greet at Jaipur International Airport or Railway Station by your dedicated Nivasa chauffeur. Transfer to your heritage hotel. Afternoon visit to the iconic Albert Hall Museum and an evening orientation stroll through the lively bazaars of Johari and Bapu Bazaars.',
        stay: 'Heritage Haveli Hotel, Jaipur',
        meals: 'Dinner included',
        image: '/images/day1_jaipur_alberthall.jpg',
        timeOfDay: 'Afternoon Arrival & Sunset Bazaars',
        approxDuration: '4-5 Hours Sightseeing',
        highlights: [
          'Albert Hall Museum & Indo-Saracenic Architecture',
          'Johari Bazaar Gemstone & Jewelry Street',
          'Bapu Bazaar Traditional Textiles & Mojaris'
        ]
      },
      {
        day: 2,
        title: 'Full Day Regal Jaipur Exploration',
        description: 'Morning ascent to Amber Fort with its mirror-inlaid Sheesh Mahal. Photo stop at the water palace of Jal Mahal. In the afternoon, explore the City Palace complex, Chandra Mahal, and the UNESCO astronomical wonder of Jantar Mantar. Complete the day marveling at the honeycomb façade of Hawa Mahal.',
        stay: 'Heritage Haveli Hotel, Jaipur',
        meals: 'Breakfast & Dinner',
        image: '/images/day2_amber_fort_jaipur.jpg',
        timeOfDay: 'Full Day Regal Circuit (08:30 AM - 05:30 PM)',
        approxDuration: '8 Hours Guided Tour',
        highlights: [
          'Amer Fort & Sheesh Mahal (Palace of Mirrors)',
          'Jal Mahal Water Palace Photo Stop',
          'City Palace Royal Courtyards & Chandra Mahal',
          'Jantar Mantar UNESCO Astronomical Observatory',
          'Hawa Mahal (Palace of Winds) Street View'
        ]
      },
      {
        day: 3,
        title: 'Jaipur to Holy Pushkar & Drive to Jodhpur',
        description: 'Depart after breakfast towards the holy oasis town of Pushkar. Visit the rare Lord Brahma Temple and walk the sacred bathing ghats. Continue your scenic desert highway journey towards the Sun City of Jodhpur, arriving in time for an evening cup of masala chai with views of Mehrangarh.',
        stay: 'Heritage Boutique Stay, Jodhpur',
        meals: 'Breakfast & Dinner',
        image: '/images/day3_pushkar_ghats.jpg',
        timeOfDay: 'Morning Drive & Twilight Lake Rituals',
        approxDuration: '5 Hours Highway + 2.5 Hours Ghat Walk',
        highlights: [
          'Rare 14th-Century Lord Brahma Temple',
          'Sacred Pushkar Sarovar & 52 Bathing Ghats',
          'Desert Highway Journey into Sun City Jodhpur'
        ]
      },
      {
        day: 4,
        title: 'The Blue City of Jodhpur & Jaswant Thada',
        description: 'Morning exploration of Mehrangarh Fort, towering 400 feet above the indigo-washed city. Visit the marble cenotaph of Jaswant Thada and the clock tower market around Sardar Bazaar. Spend the afternoon sampling authentic Jodhpur pyaz kachoris and handloom textiles.',
        stay: 'Heritage Boutique Stay, Jodhpur',
        meals: 'Breakfast & Dinner',
        image: '/images/day4_jodhpur_mehrangarh.jpg',
        timeOfDay: 'Morning Fortress to Twilight Blue Alleys',
        approxDuration: '6-7 Hours Sightseeing',
        highlights: [
          'Mehrangarh Fort 400-Foot Sheer Ramparts',
          'Jaswant Thada Milky White Marble Cenotaph',
          'Ghanta Ghar (Clock Tower) & Sardar Bazaar',
          'Indigo-Washed Blue City Alleys of Navchokiya'
        ]
      },
      {
        day: 5,
        title: 'Jodhpur to Udaipur via Ranakpur Jain Temples',
        description: 'Drive through the Aravalli hills to the magnificent 15th-century Ranakpur Jain Temples, famed for 1,444 uniquely carved marble pillars. Continue to the romantic City of Lakes, Udaipur, checking into your lakefront hotel before twilight.',
        stay: 'Lakeview Heritage Hotel, Udaipur',
        meals: 'Breakfast & Dinner',
        image: '/images/day5_ranakpur_jain_temple.jpg',
        timeOfDay: 'Scenic Mountain Pass & Temple Marvel',
        approxDuration: '5-6 Hours Scenic Journey',
        highlights: [
          'Aravalli Mountain Ridge Highway Pass',
          'Ranakpur 15th-Century Temple with 1,444 Marble Pillars',
          'Scenic Sunset Arrival into the City of Lakes'
        ]
      },
      {
        day: 6,
        title: 'Regal Udaipur — City Palace & Lake Pichola',
        description: 'Tour the sprawling City Palace complex, the largest royal palace in Rajasthan. Visit Jagdish Temple and the historic maiden fountains of Saheliyon-ki-Bari. Conclude with an enchanting private sunset boat ride around Lake Pichola and Jag Mandir Island.',
        stay: 'Lakeview Heritage Hotel, Udaipur',
        meals: 'Breakfast & Dinner',
        image: '/images/day6_udaipur_lake_pichola.jpg',
        timeOfDay: 'Palaces by Morning, Lake Cruise at Sunset',
        approxDuration: '7 Hours Sightseeing & Boat Cruise',
        highlights: [
          'Udaipur City Palace Complex & Crystal Gallery',
          'Jagdish Temple 1651 Carved Shikhara',
          'Saheliyon-ki-Bari Royal Maiden Fountains',
          'Private Sunset Boat Cruise on Lake Pichola & Jag Mandir'
        ]
      },
      {
        day: 7,
        title: 'Cultural Crafts, Sajjangarh & Folk Dance',
        description: 'Visit the vintage car museum, stroll through artisan miniature painting studios, and take an afternoon drive up to Sajjangarh (The Monsoon Palace) for panoramic views of the surrounding hills. In the evening, witness traditional Rajasthani folk dance at Bagore Ki Haveli.',
        stay: 'Lakeview Heritage Hotel, Udaipur',
        meals: 'Breakfast & Dinner',
        image: '/images/day7_bagore_ki_haveli.jpg',
        timeOfDay: 'Afternoon Mountain Ridge & Evening Folk Festival',
        approxDuration: '5 Hours Sightseeing & Show',
        highlights: [
          'Vintage & Classic Car Collection of the Maharanas',
          'Traditional Mewar Miniature Painting Studios',
          'Sajjangarh (Monsoon Palace) High Ridge Panoramas',
          'Dharohar Rajasthani Folk Dance & Puppetry at Bagore Ki Haveli'
        ]
      },
      {
        day: 8,
        title: 'Udaipur Departure',
        description: 'Enjoy a leisurely breakfast overlooking the morning lake waters. Your private chauffeur transfers you to Udaipur Airport (UDR) or Railway Station for your onward journey with unforgettable royal memories.',
        meals: 'Breakfast included',
        image: '/images/day8_udaipur_departure.jpg',
        timeOfDay: 'Morning Lakeside Farewell & Chauffeur Drop',
        approxDuration: '2-3 Hours Departure Transfer',
        highlights: [
          'Leisurely Lakeview Breakfast & Morning Walk',
          'Artisanal Souvenir & Handloom Shopping',
          'Private Chauffeur Drop-off at Udaipur Airport (UDR) or Station'
        ]
      }
    ],
    inclusions: [
      '7 Nights accommodation in 3-Star / 4-Star Heritage properties',
      'Daily authentic buffet breakfast and royal dinners at hotels',
      'All transfers and sightseeing in a dedicated private AC Sedan / Crysta SUV',
      'All toll taxes, state permits, parking fees, and driver allowances',
      'Private sunset boat cruise on Lake Pichola in Udaipur',
      'Government-approved local monument guides in Jaipur, Jodhpur, and Udaipur',
      '24/7 dedicated telephone & WhatsApp concierge assistance (+91 8126716179)'
    ],
    exclusions: [
      'Airfare or train fare to/from origin',
      'Monument entrance fees and camera charges',
      'Personal expenses, tips, porterage, and alcoholic beverages',
      'Any optional activities not specifically mentioned in the itinerary'
    ],
    transportDetails: 'Private air-conditioned Toyota Etios/Dzire (up to 3 guests) or Toyota Innova Crysta (4-6 guests) with professional English/Hindi-speaking heritage chauffeur.',
    bestTimeToVisit: 'October to March (Pleasant sunny days, cool evenings with temperatures between 12°C and 28°C).',
    featuredImage: '/images/amber_fort_jaipur.jpg',
    galleryImages: [
      '/images/amber_fort_jaipur.jpg',
      '/images/jodhpur_blue_city.jpg',
      '/images/udaipur_lake_palace.jpg',
      '/images/royal_heritage_haveli.jpg'
    ],
    faqs: [
      {
        question: 'Can this itinerary be customized to add Jaisalmer or Ranthambore?',
        answer: 'Yes, absolutely. All Nivasa itineraries are flexible. We can seamlessly integrate a 2-night Jaisalmer Thar Desert extension or a wildlife safari in Ranthambore. Simply contact our travel specialists at +91 8126716179.'
      },
      {
        question: 'Are heritage hotels suitable for elderly travellers and families?',
        answer: 'Yes. We carefully select heritage hotels with modern amenities, ground-floor accessibility or elevators, clean hygienic dining, and attentive hospitality suited for all generations.'
      }
    ],
    isFeatured: true,
    isOffer: true,
    offerTag: 'Bestseller'
  },
  {
    id: 'raj-02',
    slug: 'jaisalmer-tour-packages',
    title: 'Jaisalmer Golden Dunes & Desert Safari',
    category: 'rajasthan',
    categoryLabel: 'Rajasthan Tours',
    destination: 'Jaisalmer · Sam Sand Dunes · Kuldhara',
    duration: '4 Days / 3 Nights',
    durationDays: 4,
    durationNights: 3,
    startingPrice: 'Quote on Request',
    priceNote: 'Includes luxury Swiss tent stay with desert camel safari & gala dinner',
    overview: 'Journey deep into the Thar Desert to the living sandstone citadel of Jaisalmer. Explore golden havelis with intricate jali latticework, visit the mysterious abandoned village of Kuldhara, and spend an unforgettable starlit night in luxury Swiss desert camps with folk music and camel safaris.',
    idealFor: 'Adventure seekers, couples, photographers, and lovers of desert landscapes.',
    highlights: [
      'Walk inside the living Golden Fort (Sonar Qila) housing active families and shops',
      'Intricately carved facades of Patwon Ki Haveli and Salim Singh Ki Haveli',
      'Sunset camel trek across the rippling Sam Sand Dunes',
      'Traditional Rajasthani Kalbelia folk dance, music, and bonfire dinner under the stars',
      'Exploration of the ancient ghost village of Kuldhara'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in the Golden City of Jaisalmer',
        description: 'Receive a warm welcome at Jaisalmer Railway Station or Airport. Transfer to your city hotel. In the late afternoon, visit Gadisar Lake, an ancient rainwater reservoir surrounded by ornate chhatris and temples, followed by sunset views from Vyas Chhatri.',
        stay: 'Golden Sandstone Hotel, Jaisalmer',
        meals: 'Dinner included',
        image: '/images/royal_heritage_haveli.jpg',
        timeOfDay: 'Afternoon Welcome & Golden Hour',
        approxDuration: '3-4 Hours Sightseeing',
        highlights: [
          'Arrival in Yellow Sandstone Medieval Oasis',
          'Historic Gadisar Lake & Ornate Chhatris',
          'Sunset Panoramas from Vyas Chhatri'
        ]
      },
      {
        day: 2,
        title: 'Sonar Qila Fort & Intricate Merchant Havelis',
        description: 'Explore Jaisalmer Fort, one of the world’s few surviving inhabited forts. Wander through the medieval Jain Temples with thousand-year-old marble carvings. Marvel at the multi-storied Patwon Ki Haveli and Nathmal Ki Haveli, learning about the historic Silk Route trade.',
        stay: 'Golden Sandstone Hotel, Jaisalmer',
        meals: 'Breakfast & Dinner',
        image: '/images/amber_fort_jaipur.jpg',
        timeOfDay: 'Full Day Inhabited Fort Circuit',
        approxDuration: '6 Hours Guided Exploration',
        highlights: [
          'Sonar Qila Living Fort & Palace Museum',
          'Intricate 12th-Century Jain Temple Sanctuaries',
          'Patwon Ki Haveli 5-Story Carved Stone Latticework',
          'Nathmal Ki Haveli & Local Craft Bazaars'
        ]
      },
      {
        day: 3,
        title: 'Abandoned Kuldhara & Luxury Desert Camp at Sam Dunes',
        description: 'After breakfast, drive towards the mysterious ruins of Kuldhara village, deserted overnight in the 19th century. Check into your luxury Swiss desert camp at Sam Sand Dunes. Enjoy an exhilarating sunset camel ride on the dunes, followed by cultural folk dance, fire shows, and a lavish Rajasthani buffet.',
        stay: 'Royal Desert Swiss Tent Camp, Sam Dunes',
        meals: 'Breakfast, Hi-Tea & Gala Dinner',
        image: '/images/jaisalmer_desert_camel.jpg',
        timeOfDay: 'Midday Ghost Town to Starlit Camp',
        approxDuration: '7 Hours Desert Experience',
        highlights: [
          'Mysterious Abandoned Paliwal Brahmin Village of Kuldhara',
          'Check-in to Luxury Swiss Desert Camp with Welcome Tika',
          'Sunset Camel Safari across Rippling Sam Sand Dunes',
          'Kalbelia Gypsy Folk Dance & Bonfire Gala Buffet Dinner'
        ]
      },
      {
        day: 4,
        title: 'Sunrise over Desert & Departure',
        description: 'Awaken early to witness the sun rise over the golden sands. After breakfast, transfer back to Jaisalmer Airport or Railway Station for your return trip.',
        meals: 'Breakfast included',
        image: '/images/jaisalmer_desert_camel.jpg',
        timeOfDay: 'Morning Dunes & Chauffeur Drop',
        approxDuration: '2-3 Hours Departure',
        highlights: [
          'Serene Dawn Light over Thar Desert Sand Dunes',
          'Traditional Camp Breakfast',
          'Private Chauffeur Drop at Jaisalmer Airport/Station'
        ]
      }
    ],
    inclusions: [
      '2 Nights in Jaisalmer heritage city hotel + 1 Night in luxury Swiss desert tent',
      'Daily breakfast, evening hi-tea at camp, and traditional Rajasthani dinners',
      'Sunset camel safari on Sam Sand Dunes',
      'Cultural Kalbelia dance show and bonfire in the desert',
      'Dedicated AC vehicle for all transfers and sightseeing',
      'Driver allowances, tolls, state taxes, and fuel'
    ],
    exclusions: ['Optional 4x4 dune bashing Jeep safari', 'Monument entry tickets', 'Personal expenses'],
    transportDetails: 'Private air-conditioned Sedan/SUV with licensed desert highway driver.',
    bestTimeToVisit: 'October through March (cool daytime temperatures, brisk desert nights).',
    featuredImage: '/images/jaisalmer_desert_camel.jpg',
    galleryImages: [
      '/images/jaisalmer_desert_camel.jpg',
      '/images/royal_heritage_haveli.jpg',
      '/images/rajasthan_folk_dance.jpg'
    ],
    faqs: [
      {
        question: 'Are Swiss tents equipped with attached bathrooms and hot water?',
        answer: 'Yes, our partner desert camps provide luxury Swiss cottages with attached private bathrooms, western toilets, running hot water, and comfortable clean bedding.'
      }
    ],
    isFeatured: true
  },
  {
    id: 'raj-03',
    slug: 'jaipur-tour-packages',
    title: 'Jaipur Regal Splendour Weekend Tour',
    category: 'rajasthan',
    categoryLabel: 'Rajasthan Tours',
    destination: 'Jaipur',
    duration: '3 Days / 2 Nights',
    durationDays: 3,
    durationNights: 2,
    startingPrice: 'Quote on Request',
    priceNote: 'Private AC car, heritage hotel stay & guided fort tours',
    overview: 'Discover why Jaipur was India’s first planned heritage city. From hilltop fortresses overlooking rugged Aravalli ridges to exquisite pink sandstone courtyards, authentic textile block-printing workshops, and mouthwatering culinary traditions.',
    idealFor: 'Short weekend breaks, cultural breaks, culinary explorers, and shopping enthusiasts.',
    highlights: [
      'Amer Fort guided tour with Sheesh Mahal and Maota lake vistas',
      'Nahargarh Fort panoramic city sunset stop',
      'Hawa Mahal and City Palace photographic moments',
      'Authentic Bagru block printing craft demonstration',
      'Private comfortable transfers from Delhi or Jaipur station/airport'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Jaipur — The Pink City Welcome',
        description: 'Pick-up from Jaipur Airport or Railway Station (or private car pick-up from Delhi NCR). Check in to hotel. Visit Birla Temple, Albert Hall Museum, and explore evening street shopping in Bapu Bazaar.',
        stay: 'Jaipur Heritage Hotel',
        meals: 'Dinner included',
        image: '/images/hawa_mahal_jaipur.jpg',
        timeOfDay: 'Afternoon & Evening',
        approxDuration: '4 Hours Sightseeing'
      },
      {
        day: 2,
        title: 'Fortresses, Astronomical Instruments & Royal Palace',
        description: 'Morning tour of Amer Fort, Jaigarh Fort (housing the world’s largest cannon on wheels), and Nahargarh. Afternoon exploration of the Royal Observatory (Jantar Mantar) and City Palace museum galleries.',
        stay: 'Jaipur Heritage Hotel',
        meals: 'Breakfast & Dinner',
        image: '/images/amber_fort_jaipur.jpg',
        timeOfDay: 'Full Day Exploration',
        approxDuration: '7 Hours'
      },
      {
        day: 3,
        title: 'Panna Meena Stepwell, Hawa Mahal & Departure',
        description: 'Morning visit to the geometric wonder of Panna Meena Kund stepwell and the outer arcade of Hawa Mahal. Sample authentic lassi at MI Road before your transfer to airport/station.',
        meals: 'Breakfast included',
        image: '/images/royal_heritage_haveli.jpg',
        timeOfDay: 'Morning to Midday',
        approxDuration: '3 Hours'
      }
    ],
    inclusions: [
      '2 Nights in premier heritage hotel in Jaipur',
      'Breakfast and dinner included daily',
      'Private air-conditioned car for entire duration',
      'Monument guide for Amer Fort and City Palace'
    ],
    exclusions: ['Monument entrance charges', 'Tips and personal expenses'],
    transportDetails: 'Private AC vehicle with chilled bottled water and experienced city driver.',
    bestTimeToVisit: 'September to April.',
    featuredImage: '/images/hawa_mahal_jaipur.jpg',
    galleryImages: ['/images/hawa_mahal_jaipur.jpg', '/images/amber_fort_jaipur.jpg'],
    faqs: [
      {
        question: 'Can you pick up guests directly from Delhi or Gurgaon?',
        answer: 'Yes! We provide convenient door-to-door private transfers from Delhi/NCR via the new Delhi-Mumbai Expressway in just 3.5 to 4 hours. Call +91 8126716179 to coordinate.'
      }
    ]
  },
  {
    id: 'raj-04',
    slug: 'ranthambore-tour-packages',
    title: 'Ranthambore Tiger Safari & Wildlife Expedition',
    category: 'rajasthan',
    categoryLabel: 'Rajasthan Tours',
    destination: 'Ranthambore National Park · Sawai Madhopur',
    duration: '3 Days / 2 Nights',
    durationDays: 3,
    durationNights: 2,
    startingPrice: 'Quote on Request',
    priceNote: 'Includes scheduled wildlife jungle safaris and resort stay',
    overview: 'Track the majestic Royal Bengal Tiger amidst the deciduous dry forests, ancient ruins, and historic lakes of Ranthambore National Park, dominated by the 10th-century UNESCO Ranthambore Fort.',
    idealFor: 'Wildlife photographers, nature enthusiasts, birdwatchers, and adventure families.',
    highlights: [
      'Two guided open-top Jungle Safaris (Jeep/Canter) into prime tiger zones',
      'Visit to the ancient Ranthambore Fort and Trinetra Ganesha Temple inside the forest',
      'Sightings of tigers, leopards, sloth bears, sambar deer, and marsh crocodiles',
      'Stay in eco-luxury wildlife jungle resort with natural pool'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Sawai Madhopur / Ranthambore',
        description: 'Pick up from Sawai Madhopur railway station or private drive from Jaipur (3 hours). Check in to wildlife resort. Relax by the pool. Evening nature walk and wildlife documentary screening.',
        stay: 'Jungle Resort, Ranthambore',
        meals: 'Lunch & Dinner',
        image: '/images/ranthambore_tiger.jpg',
        timeOfDay: 'Afternoon Check-in',
        approxDuration: '3 Hours Travel'
      },
      {
        day: 2,
        title: 'Morning & Afternoon Ranthambore Jungle Safaris',
        description: 'Early morning safari with dedicated forest department naturalist. Return for breakfast. In the late afternoon, embark on your second safari into designated tiger territory. Evening bonfire with traditional music.',
        stay: 'Jungle Resort, Ranthambore',
        meals: 'Breakfast, Lunch & Dinner',
        image: '/images/ranthambore_tiger.jpg',
        timeOfDay: 'Dawn & Dusk Safaris',
        approxDuration: '6 Hours in Park'
      },
      {
        day: 3,
        title: 'Ranthambore Fort Visit & Departure',
        description: 'Post breakfast, hike or drive up to the massive Ranthambore Fort within the tiger reserve. Check out and transfer to Sawai Madhopur railway station or onward to Jaipur/Delhi.',
        meals: 'Breakfast included',
        image: '/images/amber_fort_jaipur.jpg',
        timeOfDay: 'Morning',
        approxDuration: '3 Hours'
      }
    ],
    inclusions: [
      '2 Nights accommodation in air-conditioned jungle cottage',
      'All meals (2 Breakfasts, 2 Lunches, 2 Dinners)',
      '2 Forest Department approved Jungle Safaris with permits and naturalist',
      'Local station transfers'
    ],
    exclusions: ['Camera fees if applicable by forest department', 'Tips to safari tracker'],
    transportDetails: 'Private car for road transfers; open 4x4 Gypsy or 20-seater Canter for park safaris.',
    bestTimeToVisit: 'October 1 to June 30 (Park closed during monsoon from July to September).',
    featuredImage: '/images/ranthambore_tiger.jpg',
    galleryImages: ['/images/ranthambore_tiger.jpg'],
    faqs: [
      {
        question: 'When should safari permits be booked in advance?',
        answer: 'Ranthambore safari permits are issued in limited numbers by the forest department. We strongly advise booking at least 30 to 60 days in advance to secure preferred core zones (Zones 1-5).'
      }
    ]
  },

  // --- GOLDEN TRIANGLE TOURS ---
  {
    id: 'gt-01',
    slug: 'golden-triangle-tour',
    title: 'Golden Triangle Classic Tour (Delhi · Agra · Jaipur)',
    category: 'golden-triangle',
    categoryLabel: 'Golden Triangle Tours',
    destination: 'Delhi · Agra · Jaipur',
    duration: '5 Days / 4 Nights',
    durationDays: 5,
    durationNights: 4,
    startingPrice: 'Quote on Request',
    priceNote: 'Includes private air-conditioned vehicle throughout and 4-star stays',
    overview: 'India’s most celebrated travel circuit connecting the nation’s historic capitals. Marvel at the Mughal splendour of Old & New Delhi, witness the ethereal sunrise over the Taj Mahal in Agra, and immerse yourself in the majestic pink sandstone palaces and hilltop fortresses of Jaipur.',
    idealFor: 'First-time visitors to India, international travelers, families, and history buffs.',
    highlights: [
      'Taj Mahal sunrise guided tour with guaranteed licensed monument guide',
      'Agra Fort Diwan-i-Khas and view of Taj Mahal across Yamuna river',
      'UNESCO World Heritage ghost city of Fatehpur Sikri and Buland Darwaza',
      'Amber Fort exploration with jeep ride up the cobblestone ramparts',
      'Old Delhi Chandni Chowk rickshaw ride and photo stop at Red Fort'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Delhi Arrival & Capital Sightseeing',
        description: 'Arrival at New Delhi Airport (DEL) where your personal Nivasa driver receives you. Explore Old Delhi: Jama Masjid, Chandni Chowk spice market by cycle rickshaw, and Raj Ghat. Continue to New Delhi: drive past India Gate, Parliament House, and visit the serene Humayun’s Tomb.',
        stay: 'Premium Hotel, Delhi',
        meals: 'Dinner included',
        image: '/images/delhi_qutub_minar.jpg',
        timeOfDay: 'Full Day',
        approxDuration: '8 Hours'
      },
      {
        day: 2,
        title: 'Delhi to Agra via Yamuna Expressway & Agra Fort',
        description: 'Morning drive to Agra along the smooth Yamuna Expressway (3.5 hours). Check into hotel. Afternoon visit to the red sandstone Agra Fort, where Mughal Emperor Shah Jahan spent his final years gazing at the Taj Mahal. Sunset stroll in Mehtab Bagh gardens.',
        stay: 'Heritage/4-Star Hotel, Agra',
        meals: 'Breakfast & Dinner',
        image: '/images/agra_fort.jpg',
        timeOfDay: 'Morning Highway + Afternoon Fort',
        approxDuration: '3.5h Highway, 3h Sightseeing'
      },
      {
        day: 3,
        title: 'Taj Mahal Sunrise & Drive to Jaipur via Fatehpur Sikri',
        description: 'Experience the magic of sunrise as soft morning rays illuminate the pure white Makrana marble of the Taj Mahal. Return to hotel for breakfast. Check out and drive to Jaipur, stopping en route at Emperor Akbar’s abandoned red sandstone capital of Fatehpur Sikri. Arrive in Jaipur by evening.',
        stay: 'Heritage Haveli Hotel, Jaipur',
        meals: 'Breakfast & Dinner',
        image: '/images/taj_mahal_sunrise.jpg',
        timeOfDay: 'Sunrise 06:00 AM & Afternoon Drive',
        approxDuration: '2.5h Monument, 4.5h Drive'
      },
      {
        day: 4,
        title: 'Full Day Marvels of the Pink City',
        description: 'Ascend to the hilltop Amer Fort. Visit the mirror palace Sheesh Mahal. Stop for photos at Jal Mahal. Afternoon tour of City Palace and Jantar Mantar. End with sunset views from Hawa Mahal street viewpoint and shopping for Jaipuri quilts and gemstones.',
        stay: 'Heritage Haveli Hotel, Jaipur',
        meals: 'Breakfast & Dinner',
        image: '/images/amber_fort_jaipur.jpg',
        timeOfDay: 'Full Day Sightseeing',
        approxDuration: '7 Hours'
      },
      {
        day: 5,
        title: 'Jaipur to Delhi Departure',
        description: 'Leisurely breakfast. Drive back to Delhi via the express highway (approx. 4 hours). Drop-off at New Delhi Airport or your preferred Delhi hotel for onward journeys.',
        meals: 'Breakfast included',
        image: '/images/delhi_humayun_tomb.jpg',
        timeOfDay: 'Morning Drive',
        approxDuration: '4 Hours Highway'
      }
    ],
    inclusions: [
      '4 Nights accommodation in carefully verified 4-Star / Heritage hotels',
      'Daily breakfast and lavish dinners at hotels',
      'Private air-conditioned Sedan/SUV throughout with professional chauffeur',
      'Yamuna Expressway toll fees, parking, interstate taxes, and fuel',
      'Dedicated government approved guides in Delhi, Agra, and Jaipur',
      'Cycle rickshaw ride in Chandni Chowk Old Delhi'
    ],
    exclusions: ['Monument entry tickets', 'Lunches and personal shopping', 'Tips to driver/guides'],
    transportDetails: 'Dedicated AC car (Dzire/Etios for 2-3 pax; Innova Crysta for 4-6 pax) from Delhi pickup to Delhi drop.',
    bestTimeToVisit: 'October to April. (Taj Mahal is closed on Fridays).',
    featuredImage: '/images/taj_mahal_hero.jpg',
    galleryImages: [
      '/images/taj_mahal_hero.jpg',
      '/images/taj_mahal_sunrise.jpg',
      '/images/amber_fort_jaipur.jpg',
      '/images/hawa_mahal_jaipur.jpg'
    ],
    faqs: [
      {
        question: 'Is the Taj Mahal open every day of the week?',
        answer: 'The Taj Mahal remains closed to all visitors on Fridays for congregational prayers. All other days it opens 30 minutes before sunrise and closes 30 minutes before sunset.'
      },
      {
        question: 'Can this tour start from Jaipur or Agra instead of Delhi?',
        answer: 'Yes! We can begin your tour in Jaipur, Agra, or Delhi depending on your flight schedule. Contact us on +91 8126716179 for custom pickup arrangements.'
      }
    ],
    isFeatured: true,
    isOffer: true,
    offerTag: 'Most Popular'
  },
  {
    id: 'gt-02',
    slug: 'golden-triangle-tour-with-udaipur',
    title: 'Golden Triangle with Romantic Udaipur Extension',
    category: 'golden-triangle',
    categoryLabel: 'Golden Triangle Tours',
    destination: 'Delhi · Agra · Jaipur · Udaipur',
    duration: '7 Days / 6 Nights',
    durationDays: 7,
    durationNights: 6,
    startingPrice: 'Quote on Request',
    priceNote: 'Includes Lake Pichola boat cruise and heritage lakeside stays',
    overview: 'Combine India’s classic Golden Triangle with Rajasthan’s most romantic city of lakes. After exploring the monuments of Delhi, Agra, and Jaipur, travel south to Udaipur to relax along Lake Pichola surrounded by palatial marble architecture.',
    idealFor: 'Honeymooners, couples, and leisure travellers wanting both monumental history and lakeside tranquility.',
    highlights: [
      'Complete Golden Triangle highlights (Delhi, Agra Taj Mahal, Jaipur Amer Fort)',
      'Scenic journey to Udaipur with optional visit to Chittorgarh Fort',
      'Sunset boat ride on Lake Pichola with Jag Mandir island stop',
      'Private car transfer throughout or internal flight option'
    ],
    itinerary: [
      { day: 1, title: 'Delhi Arrival & Capital Monuments', description: 'Arrive in Delhi; visit Qutub Minar, Humayun’s Tomb, and India Gate.', stay: 'Delhi Hotel', meals: 'Dinner', image: '/images/delhi_qutub_minar.jpg', timeOfDay: 'Afternoon', approxDuration: '5 Hours' },
      { day: 2, title: 'Delhi to Agra & Agra Fort', description: 'Drive via Yamuna Expressway; visit Agra Fort and Mehtab Bagh at sunset.', stay: 'Agra Hotel', meals: 'Breakfast & Dinner', image: '/images/agra_fort.jpg', timeOfDay: 'Full Day', approxDuration: '7 Hours' },
      { day: 3, title: 'Sunrise Taj Mahal & Drive to Jaipur', description: 'Sunrise at Taj Mahal; drive to Jaipur via Fatehpur Sikri.', stay: 'Jaipur Hotel', meals: 'Breakfast & Dinner', image: '/images/taj_mahal_sunrise.jpg', timeOfDay: 'Sunrise & Highway', approxDuration: '8 Hours' },
      { day: 4, title: 'Jaipur Palaces & Amer Fort', description: 'Explore Amer Fort, Jal Mahal, City Palace, and Hawa Mahal.', stay: 'Jaipur Hotel', meals: 'Breakfast & Dinner', image: '/images/hawa_mahal_jaipur.jpg', timeOfDay: 'Full Day', approxDuration: '7 Hours' },
      { day: 5, title: 'Jaipur to Udaipur (Drive or short flight)', description: 'Scenic drive to Udaipur via Pushkar or Ajmer; evening lakeside stroll.', stay: 'Udaipur Lakeview Hotel', meals: 'Breakfast & Dinner', image: '/images/pushkar_ghats.jpg', timeOfDay: 'Scenic Travel', approxDuration: '6 Hours' },
      { day: 6, title: 'Regal Udaipur Sightseeing & Lake Boat Cruise', description: 'City Palace, Jagdish Temple, Saheliyon Ki Bari, and Lake Pichola boat cruise.', stay: 'Udaipur Lakeview Hotel', meals: 'Breakfast & Dinner', image: '/images/udaipur_lake_palace.jpg', timeOfDay: 'Full Day', approxDuration: '6 Hours' },
      { day: 7, title: 'Departure from Udaipur', description: 'Breakfast; drop-off at Udaipur Airport (UDR) for your connecting flight.', meals: 'Breakfast', image: '/images/royal_heritage_haveli.jpg', timeOfDay: 'Morning Departure', approxDuration: 'Transfer' }
    ],
    inclusions: ['6 Nights hotel stays with breakfast and dinners', 'All intercity private transportation', 'Local monument guides', 'Lake Pichola boat cruise'],
    exclusions: ['Airfare', 'Monument entry tickets', 'Personal expenses'],
    transportDetails: 'Private air-conditioned Crysta SUV / Sedan.',
    bestTimeToVisit: 'October to March.',
    featuredImage: '/images/udaipur_lake_palace.jpg',
    galleryImages: ['/images/udaipur_lake_palace.jpg', '/images/amber_fort_jaipur.jpg'],
    faqs: [
      { question: 'Is it better to fly or drive between Jaipur and Udaipur?', answer: 'Both options are excellent. The drive takes around 6.5 hours through pleasant Rajasthan country roads, while daily direct flights take just 50 minutes.' }
    ]
  },
  {
    id: 'gt-03',
    slug: 'golden-triangle-tour-with-varanasi',
    title: 'Golden Triangle with Sacred Varanasi Spiritual Journey',
    category: 'golden-triangle',
    categoryLabel: 'Golden Triangle Tours',
    destination: 'Delhi · Agra · Jaipur · Varanasi',
    duration: '8 Days / 7 Nights',
    durationDays: 8,
    durationNights: 7,
    startingPrice: 'Quote on Request',
    priceNote: 'Includes Varanasi Ganga Aarti boat cruise and private chauffeur throughout',
    overview: 'From the architectural brilliance of the Mughals and Rajputs to the eternal spiritual soul of Hinduism along the sacred River Ganges in Varanasi. Witness ancient rituals, evening Ganga Aarti, and sunrise boat rides along the historic bathing ghats.',
    idealFor: 'Culture seekers, spiritual explorers, photographers, and experiential travellers.',
    highlights: [
      'Taj Mahal sunrise & Amer Fort private guided tours',
      'Spectacular evening Ganga Aarti ceremony with floating earthen diyas in Varanasi',
      'Sunrise rowing boat ride on the sacred Ganges along Dashashwamedh and Manikarnika Ghats',
      'Excursion to Sarnath where Lord Buddha gave his first sermon'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Delhi', description: 'Airport pickup, explore New Delhi monuments.', stay: 'Delhi Hotel', meals: 'Dinner', image: '/images/delhi_qutub_minar.jpg', timeOfDay: 'Afternoon', approxDuration: '4 Hours' },
      { day: 2, title: 'Delhi to Agra', description: 'Agra Fort and Mehtab Bagh sunset.', stay: 'Agra Hotel', meals: 'Breakfast & Dinner', image: '/images/agra_fort.jpg', timeOfDay: 'Full Day', approxDuration: '7 Hours' },
      { day: 3, title: 'Taj Mahal Sunrise to Jaipur', description: 'Sunrise Taj Mahal, Fatehpur Sikri visit, drive to Jaipur.', stay: 'Jaipur Hotel', meals: 'Breakfast & Dinner', image: '/images/taj_mahal_sunrise.jpg', timeOfDay: 'Sunrise & Travel', approxDuration: '8 Hours' },
      { day: 4, title: 'Jaipur Sightseeing', description: 'Amer Fort, City Palace, Hawa Mahal.', stay: 'Jaipur Hotel', meals: 'Breakfast & Dinner', image: '/images/amber_fort_jaipur.jpg', timeOfDay: 'Full Day', approxDuration: '7 Hours' },
      { day: 5, title: 'Jaipur to Delhi & Flight/Train to Varanasi', description: 'Transfer to airport/railway station for transit to Varanasi.', stay: 'Varanasi Heritage Hotel', meals: 'Breakfast & Dinner', image: '/images/delhi_humayun_tomb.jpg', timeOfDay: 'Transit Day', approxDuration: 'Flight/Train' },
      { day: 6, title: 'Varanasi Ghats & Evening Ganga Aarti', description: 'Walk through narrow ancient alleys, silk weaving centers, and evening Grand Aarti at Dashashwamedh Ghat.', stay: 'Varanasi Heritage Hotel', meals: 'Breakfast & Dinner', image: '/images/varanasi_ganga_aarti.jpg', timeOfDay: 'Evening Aarti', approxDuration: '5 Hours' },
      { day: 7, title: 'Sunrise Ganges Boat Ride & Sarnath Excursion', description: 'Dawn boat ride on Ganges, afternoon tour of Sarnath Buddhist stupas and museum.', stay: 'Varanasi Heritage Hotel', meals: 'Breakfast & Dinner', image: '/images/varanasi_ganga_aarti.jpg', timeOfDay: 'Dawn 05:30 AM', approxDuration: '6 Hours' },
      { day: 8, title: 'Varanasi Departure', description: 'Airport drop-off for flight to Delhi or onward home destination.', meals: 'Breakfast', image: '/images/varanasi_ganga_aarti.jpg', timeOfDay: 'Morning Departure', approxDuration: 'Transfer' }
    ],
    inclusions: ['7 Nights accommodation in 3/4 Star verified hotels', 'Daily breakfast & dinner', 'Private AC vehicle throughout', 'Sunrise Ganges boat ride', 'Local guides'],
    exclusions: ['Monument tickets', 'Personal shopping and gratuities'],
    transportDetails: 'Private vehicle for city sightseeing and intercity travel.',
    bestTimeToVisit: 'October to March.',
    featuredImage: '/images/varanasi_ganga_aarti.jpg',
    galleryImages: ['/images/varanasi_ganga_aarti.jpg', '/images/taj_mahal_hero.jpg'],
    faqs: [
      { question: 'Is Varanasi suitable for first-time international visitors?', answer: 'Yes, with our experienced local guide and private chauffeur, your Varanasi experience is comfortable, respectful, and safe.' }
    ]
  },

  // --- AGRA & TAJ MAHAL TOURS ---
  {
    id: 'agra-01',
    slug: 'same-day-agra-tour-from-delhi',
    title: 'Same Day Agra & Taj Mahal Sunrise Tour from Delhi',
    category: 'agra-taj',
    categoryLabel: 'Agra & Taj Mahal',
    destination: 'Agra · Taj Mahal · Agra Fort · Mehtab Bagh',
    duration: 'Same Day (12 to 14 Hours)',
    durationDays: 1,
    durationNights: 0,
    startingPrice: 'Quote on Request',
    priceNote: 'Private door-to-door AC car from Delhi NCR with licensed monument guide',
    overview: 'The quintessential one-day journey from Delhi to Agra. Depart early morning in comfort via the Yamuna Expressway to witness the ethereal beauty of the Taj Mahal in the peaceful morning light, followed by Agra Fort, marble inlay crafts, and optional sunset at Mehtab Bagh.',
    idealFor: 'Business travellers with a free day in Delhi, transit passengers, and day-trippers.',
    highlights: [
      'Early 3:00 AM or 6:00 AM hotel/airport pickup in Delhi NCR in private air-conditioned car',
      'Smooth transit via the 6-lane Yamuna Expressway (approx. 3.5 hours)',
      'Skip-the-line entrance assistance and guided Taj Mahal exploration',
      'Guided tour of Agra Fort, the royal seat of Mughal emperors',
      'Lunch at an authentic Mughlai restaurant (optional add-on)',
      'Evening return and drop-off anywhere in Delhi, Noida, or Gurugram'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Complete Day Itinerary: Delhi to Agra & Back',
        description: '03:00 AM (for sunrise) or 06:00 AM (standard morning): Chauffeur picks you up from your hotel or Delhi Airport. Smooth drive along Yamuna Expressway. 06:30 AM/09:30 AM: Meet your licensed Agra tour guide and enter the Taj Mahal. Spend 2.5 hours exploring the main mausoleum, gardens, and reflecting pool. 11:30 AM: Visit the historic Agra Fort. 01:30 PM: Enjoy traditional Mughlai cuisine. 03:00 PM: Discover the traditional art of Pietra Dura marble inlay. 04:30 PM: Optional view of the Taj Mahal from Mehtab Bagh across the river. 05:30 PM: Relax on the return drive to Delhi, arriving between 08:30 PM and 09:30 PM.',
        meals: 'Bottled water included in car',
        image: '/images/taj_mahal_sunrise.jpg',
        timeOfDay: '03:00 AM to 09:30 PM',
        approxDuration: '14 Hours Total'
      }
    ],
    inclusions: [
      'Round-trip private transportation in clean, air-conditioned Sedan/SUV',
      'Pick-up and drop-off anywhere in Delhi, Gurugram, or Noida',
      'All toll taxes, parking fees, and driver allowances',
      'Professional government-approved licensed guide in Agra',
      'Unlimited chilled mineral water bottles in car'
    ],
    exclusions: ['Monument entrance tickets (can be pre-booked upon request)', 'Meals and personal purchases'],
    transportDetails: 'Private Toyota Etios / Swift Dzire / Innova Crysta with verified commercial driver.',
    bestTimeToVisit: 'October to April. (Taj Mahal is closed on Fridays).',
    featuredImage: '/images/taj_mahal_sunrise.jpg',
    galleryImages: ['/images/taj_mahal_sunrise.jpg', '/images/agra_fort.jpg'],
    faqs: [
      {
        question: 'What time is best for the Sunrise Taj Mahal tour from Delhi?',
        answer: 'We recommend leaving Delhi between 02:30 AM and 03:30 AM depending on the season, ensuring you reach Agra gates just as the monuments open at first dawn.'
      },
      {
        question: 'Can you pick up directly from Delhi Airport (DEL) Terminal 3?',
        answer: 'Yes! We frequently welcome guests arriving on early morning international or domestic flights directly at Terminal 3 or Terminal 1.'
      }
    ],
    isFeatured: true,
    isOffer: true,
    offerTag: 'Top Same Day'
  },
  {
    id: 'agra-02',
    slug: 'agra-tour-packages',
    title: 'Agra Heritage Overnight & Sunrise Taj Mahal Tour',
    category: 'agra-taj',
    categoryLabel: 'Agra & Taj Mahal',
    destination: 'Agra · Fatehpur Sikri',
    duration: '2 Days / 1 Night',
    durationDays: 2,
    durationNights: 1,
    startingPrice: 'Quote on Request',
    priceNote: 'Includes 4-star Agra hotel stay and sunrise Taj Mahal entrance assistance',
    overview: 'A relaxed two-day immersion into Agra’s Mughal legacy. Visit the Taj Mahal at sunrise without the rush of a day trip, explore the red sandstone courts of Agra Fort, the Baby Taj (Itmad-ud-Daulah), and the ghost city of Fatehpur Sikri.',
    idealFor: 'Travellers who prefer unhurried sightseeing, photography, and fine dining.',
    highlights: [
      'Leisurely 2-day itinerary avoiding long same-day highway rush',
      'Sunset views of the Taj Mahal from Mehtab Bagh across the Yamuna River',
      'Early sunrise visit inside the Taj Mahal with minimal crowd',
      'Excursion to UNESCO World Heritage site Fatehpur Sikri and Buland Darwaza'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Delhi to Agra, Agra Fort & Sunset at Mehtab Bagh',
        description: 'Morning pickup from Delhi. Arrive in Agra around noon and check into hotel. Afternoon visit to the grand Agra Fort and the exquisite tomb of Itmad-ud-Daulah (Baby Taj). Watch the sun set behind the Taj Mahal from Mehtab Bagh.',
        stay: '4-Star Agra Hotel',
        meals: 'Dinner included',
        image: '/images/agra_fort.jpg',
        timeOfDay: 'Afternoon & Sunset',
        approxDuration: '6 Hours'
      },
      {
        day: 2,
        title: 'Taj Mahal Sunrise, Fatehpur Sikri & Return to Delhi',
        description: 'Witness sunrise at the Taj Mahal. Return to hotel for breakfast. Check out and drive to the magnificent abandoned Mughal city of Fatehpur Sikri. Return to Delhi by evening.',
        meals: 'Breakfast included',
        image: '/images/taj_mahal_hero.jpg',
        timeOfDay: 'Sunrise & Afternoon',
        approxDuration: '7 Hours'
      }
    ],
    inclusions: ['1 Night 4-star hotel stay in Agra with breakfast & dinner', 'Private AC vehicle throughout', 'Licensed guide in Agra & Fatehpur Sikri'],
    exclusions: ['Monument entry tickets', 'Personal expenses'],
    transportDetails: 'Private Sedan/SUV.',
    bestTimeToVisit: 'All year except Friday (Taj Mahal closed Fridays).',
    featuredImage: '/images/agra_fort.jpg',
    galleryImages: ['/images/agra_fort.jpg', '/images/taj_mahal_sunrise.jpg'],
    faqs: [
      { question: 'Why choose an overnight Agra tour over same-day?', answer: 'An overnight stay allows you to experience both sunset and sunrise at the Taj Mahal, visit Fatehpur Sikri comfortably, and rest without 7 hours of driving in a single day.' }
    ]
  },

  // --- DELHI TOURS ---
  {
    id: 'del-01',
    slug: 'delhi-tour-packages',
    title: 'Old & New Delhi Comprehensive Private City Tour',
    category: 'delhi',
    categoryLabel: 'Delhi Tours',
    destination: 'Old Delhi · New Delhi',
    duration: 'Full Day (8 to 9 Hours)',
    durationDays: 1,
    durationNights: 0,
    startingPrice: 'Quote on Request',
    priceNote: 'Dedicated private AC car with experienced city chauffeur',
    overview: 'Uncover the two contrasting souls of India’s historic capital: the narrow bustling alleys, Mughal mosques, and spice aromas of Old Delhi, juxtaposed against the wide tree-lined avenues, British colonial monuments, and lush gardens of New Delhi.',
    idealFor: 'Transit travelers, solo explorers, families, and history enthusiasts.',
    highlights: [
      'Jama Masjid — India’s largest 17th-century congregational mosque',
      'Exciting cycle rickshaw ride through the sensory spice alleys of Khari Baoli',
      'External photo stop at the massive red sandstone walls of Red Fort',
      'Raj Ghat (Mahatma Gandhi memorial) and driving past Parliament House & India Gate',
      'Humayun’s Tomb — the UNESCO-listed architectural predecessor of the Taj Mahal',
      'Qutub Minar — world’s tallest brick minaret standing since 1192 AD'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Full Day Capital Heritage Itinerary',
        description: '09:00 AM: Pickup from your hotel/airport. 09:30 AM: Explore Jama Masjid and take a rickshaw ride through Chandni Chowk and Dariba Kalan. 11:30 AM: Drive past Red Fort and visit Raj Ghat. 12:30 PM: Lunch at a curated North Indian restaurant. 01:45 PM: Drive down the ceremonial Rajpath past India Gate, Rashtrapati Bhavan (Presidential Palace), and Parliament. 03:00 PM: Walk the Mughal gardens of Humayun’s Tomb. 04:30 PM: Marvel at the intricate carving of Qutub Minar and the rust-free Iron Pillar. 06:00 PM: Drop off back at hotel.',
        meals: 'Bottled water provided',
        image: '/images/delhi_qutub_minar.jpg',
        timeOfDay: '09:00 AM to 06:00 PM',
        approxDuration: '9 Hours'
      }
    ],
    inclusions: [
      'Full-day private air-conditioned car with dedicated chauffeur',
      'Pick-up and drop-off from any location in Delhi, Noida, or Gurgaon',
      'Cycle rickshaw ride in Chandni Chowk',
      'Parking, fuel, toll taxes'
    ],
    exclusions: ['Monument entrance fees', 'Lunch and guide fees (available on request)'],
    transportDetails: 'Private Sedan or SUV with verified city chauffeur.',
    bestTimeToVisit: 'All year around; October to March offers exceptionally pleasant weather.',
    featuredImage: '/images/delhi_qutub_minar.jpg',
    galleryImages: ['/images/delhi_qutub_minar.jpg', '/images/delhi_humayun_tomb.jpg'],
    faqs: [
      {
        question: 'Can the itinerary be tailored to visit the Lotus Temple or Akshardham Temple?',
        answer: 'Yes! Our chauffeur and tour coordinators can customize your itinerary to include the Lotus Temple, Gurudwara Bangla Sahib, or Akshardham Temple.'
      }
    ],
    isFeatured: true
  },

  // --- SAME DAY TOURS ---
  {
    id: 'sd-01',
    slug: 'same-day-tours',
    title: 'Jaipur One Day Sightseeing from Delhi by Private Car',
    category: 'same-day',
    categoryLabel: 'Same Day Tours',
    destination: 'Jaipur · Amer Fort · Hawa Mahal',
    duration: 'Same Day (14 Hours)',
    durationDays: 1,
    durationNights: 0,
    startingPrice: 'Quote on Request',
    priceNote: 'Private AC car via express corridor with experienced chauffeur',
    overview: 'Experience the magic of Rajasthan’s Pink City in a single action-packed day trip from Delhi via the high-speed Delhi-Mumbai Expressway. Visit the grand Amer Fort, see the floating Jal Mahal, photograph the iconic Hawa Mahal, and enjoy royal Rajasthani hospitality.',
    idealFor: 'Travellers short on time wanting to experience Rajasthan without booking multiple hotel nights.',
    highlights: [
      'Early 5:00 AM private pickup from Delhi/Gurgaon',
      'Fast travel via the new Delhi-Mumbai Expressway',
      'Amer Fort guided tour with panoramic hill vistas',
      'Hawa Mahal and Jal Mahal photo stops',
      'City Palace and local handicraft shopping'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Delhi to Jaipur Express Day Trip',
        description: '05:00 AM: Chauffeur picks you up from Delhi NCR. 08:30 AM: Breakfast stop at clean highway food court. 09:30 AM: Arrive in Amer Fort, Jaipur; explore courtyards and Sheesh Mahal. 12:30 PM: Photo stop at Jal Mahal. 01:30 PM: Traditional Rajasthani thali lunch. 02:45 PM: Visit City Palace and Jantar Mantar. 04:30 PM: Photograph Hawa Mahal from Wind View Cafe. 05:30 PM: Relax on the return drive to Delhi, arriving around 09:30 PM.',
        meals: 'Chilled water bottles in car',
        image: '/images/hawa_mahal_jaipur.jpg',
        timeOfDay: '05:00 AM to 09:30 PM',
        approxDuration: '14 Hours Total'
      }
    ],
    inclusions: ['Round-trip private car transfer Delhi-Jaipur-Delhi', 'All express highway tolls and parking', 'Local licensed guide in Jaipur'],
    exclusions: ['Monument tickets and food expenses'],
    transportDetails: 'Private AC vehicle with expert highway driver.',
    bestTimeToVisit: 'September to April.',
    featuredImage: '/images/hawa_mahal_jaipur.jpg',
    galleryImages: ['/images/hawa_mahal_jaipur.jpg', '/images/amber_fort_jaipur.jpg'],
    faqs: [
      { question: 'How long is the drive from Delhi to Jaipur on the new expressway?', answer: 'With the Delhi-Mumbai Expressway stretch now operational, drive time from Sohna/Gurgaon to Jaipur is just around 3.5 to 4 hours.' }
    ]
  },
  {
    id: 'sd-02',
    slug: 'mathura-vrindavan-same-day-tour',
    title: 'Mathura & Vrindavan Spiritual Day Tour from Delhi',
    category: 'same-day',
    categoryLabel: 'Same Day Tours',
    destination: 'Mathura · Vrindavan',
    duration: 'Same Day (10 to 12 Hours)',
    durationDays: 1,
    durationNights: 0,
    startingPrice: 'Quote on Request',
    priceNote: 'Private AC car covering Mathura birthplace and Vrindavan evening Aarti',
    overview: 'Visit the sacred birthplace of Lord Krishna in Mathura and the ancient transcendental temple town of Vrindavan. Attend temple aartis, stroll sacred parikramas, and witness the famous Banke Bihari and Prem Mandir evening illuminations.',
    idealFor: 'Spiritual pilgrims, families, and devotees seeking a soulful one-day journey from Delhi.',
    highlights: [
      'Krishna Janmabhoomi Temple Complex in Mathura',
      'Darshan at Banke Bihari Temple in Vrindavan',
      'Visit ISKCON Krishna Balaram Temple',
      'Magnificent light and fountain show at white Italian marble Prem Mandir'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Sacred Braj Pilgrimage Itinerary',
        description: '06:00 AM: Pickup in Delhi NCR. Drive along Yamuna Expressway (2.5 hours). 08:30 AM: Arrive in Mathura, visit Shri Krishna Janmasthan and Dwarkadhish Temple. 12:00 PM: Move to Vrindavan; visit ISKCON Temple and taste authentic Mathura ke peda. 04:30 PM: Darshan at Banke Bihari Temple. 06:30 PM: Evening light show at Prem Mandir. 07:30 PM: Return drive to Delhi, arriving by 10:00 PM.',
        meals: 'Mineral water in car',
        image: '/images/mathura_vrindavan.jpg',
        timeOfDay: '06:00 AM to 10:00 PM',
        approxDuration: '12 Hours'
      }
    ],
    inclusions: ['Dedicated private AC vehicle from Delhi NCR', 'Tolls, parking, driver charges'],
    exclusions: ['Temple offerings, meals, VIP darshan passes if opted'],
    transportDetails: 'Private AC car.',
    bestTimeToVisit: 'All year (especially enchanting during Janmashtami and Holi).',
    featuredImage: '/images/mathura_vrindavan.jpg',
    galleryImages: ['/images/mathura_vrindavan.jpg'],
    faqs: [
      { question: 'Are temples open throughout the day in Mathura and Vrindavan?', answer: 'Most temples close their main sanctum between 12:00 PM and 04:00 PM for afternoon bhog. We organize the itinerary so you visit open shrines and lunch during midday.' }
    ]
  }
];

export function getPackageBySlug(slug: string): TourPackage | undefined {
  return TOUR_PACKAGES.find(p => p.slug === slug);
}

export function getPackagesByCategory(category: string): TourPackage[] {
  if (category === 'all') return TOUR_PACKAGES;
  return TOUR_PACKAGES.filter(p => p.category === category);
}
