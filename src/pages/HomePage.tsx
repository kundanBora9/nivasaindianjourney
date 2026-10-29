import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  MessageCircle,
  MapPin,
  Calendar,
  Users,
  Shield,
  Award,
  Clock,
  ArrowRight,
  CheckCircle,
  Sparkles,
  ChevronDown,
  Compass,
  Play
} from 'lucide-react';
import { TOUR_PACKAGES } from '../data/packages';
import { TourCard } from '../components/TourCard';
import { DESTINATIONS } from '../data/destinations';
import { BLOG_POSTS } from '../data/blogs';
import { ALL_FAQS } from '../data/faqs';
import { TravelReelsSection } from '../components/TravelReelsSection';

interface HomePageProps {
  onOpenEnquiry: (packageName?: string) => void;
  onOpenAIPlanner?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenEnquiry, onOpenAIPlanner }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const filteredPackages = selectedCategory === 'all'
    ? TOUR_PACKAGES
    : TOUR_PACKAGES.filter(p => p.category === selectedCategory);

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. CINEMATIC HERO SECTION WITH BACKGROUND VIDEO (NO FORM, PROMINENT HEADINGS & CTAS) */}
      <section className="relative min-h-[560px] sm:min-h-[640px] flex items-center bg-[#650018] text-white overflow-hidden border-b-2 border-[#C6A15B]">
        {/* Background Video with Poster Fallback */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/images/taj_mahal_hero.jpg"
            className="w-full h-full object-cover scale-105"
          >
            <source src="/videos/hero_heritage.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Cinematic Deep Burgundy / Charcoal Gradient Scrim for Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#4d0012]/50 z-10" />

        {/* Content Container (Reduced text, clean & visually appealing) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-20 sm:py-28 relative z-20 w-full">
          <div className="max-w-2xl space-y-5">
            {/* Subtle Brand Kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[#DFCA95] bg-black/40 backdrop-blur-xs px-3 py-1 rounded-full border border-[#DFCA95]/30">
              <Sparkles className="w-3.5 h-3.5 text-[#DFCA95]" />
              <span>Nivasa India Journey · Luxury Chauffeur Tours</span>
            </div>

            {/* Clean Majestic Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-white drop-shadow-md">
              Discover India’s Royal Heritage
            </h1>

            {/* Concise Supporting Text */}
            <p className="text-sm sm:text-base text-white/90 leading-relaxed font-light drop-shadow-sm max-w-xl">
              Private chauffeur journeys across Rajasthan, the Golden Triangle, and the Taj Mahal with handpicked heritage stays.
            </p>

            {/* Streamlined Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/tour-packages"
                className="px-6 py-3 bg-[#C6A15B] hover:bg-[#A3803C] text-[#262626] font-bold text-xs sm:text-sm rounded-md shadow-md transition-all transform hover:-translate-y-0.5 inline-flex items-center gap-2"
              >
                <span>Explore Tour Packages</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="https://wa.me/918126716179?text=Hello%20Nivasa%20India%20Journey,%20I%20would%20like%20to%20plan%20a%20private%20tour."
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm rounded-md shadow-md transition-all inline-flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: 8126716179</span>
              </a>

              <a
                href="tel:+918126716179"
                className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm rounded-md border border-white/30 backdrop-blur-xs transition-all inline-flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#DFCA95]" />
                <span>Call +91 8126716179</span>
              </a>
            </div>

            {/* Quiet Trust Line */}
            <div className="pt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/80 font-light">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-[#DFCA95]" /> Dedicated AC Fleet
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-[#DFCA95]" /> Handpicked Havelis
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-[#DFCA95]" /> Licensed Guides
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 4-COLUMN TRUST STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 p-6 bg-white rounded-xl border border-[#E8E1DA] shadow-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[#650018] font-serif text-base font-semibold">
              <Shield className="w-4 h-4 text-[#C6A15B]" />
              <span>Private AC Fleet</span>
            </div>
            <p className="text-xs text-[#6B7280]">
              Dedicated sanitized Sedans & Innova Crystas with verified local chauffeurs.
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[#650018] font-serif text-base font-semibold">
              <Award className="w-4 h-4 text-[#C6A15B]" />
              <span>Verified Stays</span>
            </div>
            <p className="text-xs text-[#6B7280]">
              Carefully vetted royal havelis, lakeview properties, and luxury desert camps.
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[#650018] font-serif text-base font-semibold">
              <CheckCircle className="w-4 h-4 text-[#C6A15B]" />
              <span>Licensed Guides</span>
            </div>
            <p className="text-xs text-[#6B7280]">
              Govt-certified monument historians for Taj Mahal, Amer Fort, and Old Delhi.
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[#650018] font-serif text-base font-semibold">
              <Clock className="w-4 h-4 text-[#C6A15B]" />
              <span>24/7 Support</span>
            </div>
            <p className="text-xs text-[#6B7280]">
              Direct phone & WhatsApp concierge assistance throughout your tour at 8126716179.
            </p>
          </div>
        </div>
      </section>

      {/* 3. TRAVEL REELS & VISUAL STORIES SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <TravelReelsSection onOpenEnquiry={onOpenEnquiry} />
      </div>

      {/* 4. FEATURED TOUR CATEGORIES (Visual Image Bento Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E8E1DA] pb-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C6A15B]">Curated Circuits</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#650018]">Featured Tour Categories</h2>
          </div>
          <Link to="/tour-packages" className="text-xs font-semibold text-[#650018] hover:underline flex items-center gap-1">
            <span>Browse All Itineraries</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Category 1: Rajasthan Tour Packages */}
          <Link
            to="/rajasthan-tours"
            className="group relative h-80 rounded-xl overflow-hidden border border-[#E8E1DA] shadow-sm flex flex-col justify-end p-5"
          >
            <img loading="lazy" decoding="async"
              src="/images/rajasthan/rajasthan_tour_package.jpg"
              alt="Rajasthan Tours"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="relative z-10 text-white space-y-1">
              <span className="text-[11px] font-semibold tracking-wider uppercase text-[#DFCA95]">Royal Kingdoms</span>
              <h3 className="font-serif text-xl font-bold">Rajasthan Tour Packages</h3>
              <p className="text-xs text-white/80 line-clamp-2">
                Jaipur palaces, Jodhpur blue city, Udaipur lakes, and Jaisalmer desert sands.
              </p>
              <span className="pt-2 text-xs font-semibold text-[#DFCA95] inline-flex items-center gap-1">
                Explore Rajasthan <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>

          {/* Category 2: Golden Triangle Tours */}
          <Link
            to="/golden-triangle-tour"
            className="group relative h-80 rounded-xl overflow-hidden border border-[#E8E1DA] shadow-sm flex flex-col justify-end p-5"
          >
            <img loading="lazy" decoding="async"
              src="/images/agra_fort.jpg"
              alt="Golden Triangle Tours"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="relative z-10 text-white space-y-1">
              <span className="text-[11px] font-semibold tracking-wider uppercase text-[#DFCA95]">India’s Classic Circuit</span>
              <h3 className="font-serif text-xl font-bold">Golden Triangle Tours</h3>
              <p className="text-xs text-white/80 line-clamp-2">
                Delhi, Agra Taj Mahal, and Jaipur Pink City with private 4, 5, and 6-day options.
              </p>
              <span className="pt-2 text-xs font-semibold text-[#DFCA95] inline-flex items-center gap-1">
                Explore Circuit <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>

          {/* Category 3: Taj Mahal & Agra Tours */}
          <Link
            to="/agra-tour-packages"
            className="group relative h-80 rounded-xl overflow-hidden border border-[#E8E1DA] shadow-sm flex flex-col justify-end p-5"
          >
            <img loading="lazy" decoding="async"
              src="/images/taj_mahal_hero.jpg"
              alt="Agra and Taj Mahal Tours"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="relative z-10 text-white space-y-1">
              <span className="text-[11px] font-semibold tracking-wider uppercase text-[#DFCA95]">Mughal Wonder</span>
              <h3 className="font-serif text-xl font-bold">Taj Mahal & Agra Tours</h3>
              <p className="text-xs text-white/80 line-clamp-2">
                Sunrise Taj Mahal visits, Agra Fort, Mehtab Bagh, and express same-day trips.
              </p>
              <span className="pt-2 text-xs font-semibold text-[#DFCA95] inline-flex items-center gap-1">
                Explore Agra <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>

          {/* Category 4: Same Day Sightseeing */}
          <Link
            to="/same-day-tours"
            className="group relative h-80 rounded-xl overflow-hidden border border-[#E8E1DA] shadow-sm flex flex-col justify-end p-5"
          >
            <img loading="lazy" decoding="async"
              src="/images/delhi_qutub_minar.jpg"
              alt="Same Day Express Tours"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="relative z-10 text-white space-y-1">
              <span className="text-[11px] font-semibold tracking-wider uppercase text-[#DFCA95]">Quick Escapes</span>
              <h3 className="font-serif text-xl font-bold">Same Day Tours</h3>
              <p className="text-xs text-white/80 line-clamp-2">
                Same Day Agra, Jaipur Express Car, Delhi City tours, and Mathura-Vrindavan.
              </p>
              <span className="pt-2 text-xs font-semibold text-[#DFCA95] inline-flex items-center gap-1">
                View Day Tours <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* 5. POPULAR TOUR PACKAGES (MakeMyTrip Style Holiday Hub) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E8E1DA] pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#C6A15B]">
                Handcrafted Holiday Packages
              </span>
              
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#650018]">
              Popular Tour Packages
            </h2>
            <p className="text-xs text-[#6B7280]">
              Private chauffeured holiday packages with handpicked stays, verified drivers, and monument previews.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {/* Functional interactive filter tabs */}
            <div className="flex items-center gap-1 p-1 bg-white rounded-lg border border-[#E8E1DA] overflow-x-auto max-w-full">
              {[
                { id: 'all', label: 'All Packages' },
                { id: 'rajasthan', label: 'Rajasthan' },
                { id: 'golden-triangle', label: 'Golden Triangle' },
                { id: 'agra-taj', label: 'Agra & Taj' },
                { id: 'same-day', label: 'Same Day' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    selectedCategory === tab.id
                      ? 'bg-[#650018] text-white shadow-xs'
                      : 'text-[#6B7280] hover:text-[#262626]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <Link
              to="/tour-packages"
              className="text-xs font-semibold text-[#650018] hover:text-[#4d0012] flex items-center gap-1 whitespace-nowrap cursor-pointer"
            >
              <span>View All ({TOUR_PACKAGES.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Tour Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPackages.map(tour => (
            <TourCard key={tour.id} tour={tour} onEnquire={onOpenEnquiry} />
          ))}
        </div>
      </section>

      {/* 6. RAJASTHAN & GOLDEN TRIANGLE IMMERSION (Visual Story Cards) */}
      <section className="bg-white border-y border-[#E8E1DA] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C6A15B]">Cultural Depth</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#650018]">
              The Nivasa Travel Experience
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
              We reject rushed checklist tourism. Every journey is thoughtfully orchestrated with realistic drive times, private air-conditioned comfort, and deep cultural connections.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3 p-5 rounded-lg border border-[#E8E1DA] bg-[#FAF7F2] overflow-hidden group">
              <div className="h-44 rounded-md overflow-hidden mb-3">
                <img loading="lazy" decoding="async"
                  src="/images/amber_fort_jaipur.jpg"
                  alt="Forts and Palaces"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <span className="text-xs font-mono text-[#650018] font-bold">01.</span>
              <h3 className="font-serif text-lg font-bold text-[#262626]">Forts, Havelis & Living Palaces</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Step inside the mirror mosaic halls of Jaipur’s Amer Fort, climb the massive battlements of Jodhpur’s Mehrangarh, and wander the inhabited 12th-century living ramparts of Jaisalmer Fort.
              </p>
            </div>

            <div className="space-y-3 p-5 rounded-lg border border-[#E8E1DA] bg-[#FAF7F2] overflow-hidden group">
              <div className="h-44 rounded-md overflow-hidden mb-3">
                <img loading="lazy" decoding="async"
                  src="/images/taj_mahal_sunrise.jpg"
                  alt="Sunrise Taj Mahal"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <span className="text-xs font-mono text-[#650018] font-bold">02.</span>
              <h3 className="font-serif text-lg font-bold text-[#262626]">Sunrise Taj Mahal & Mughal Legacy</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Beat the crowds with early dawn access to the Taj Mahal. Experience how the Makrana white marble glows rose-pink at first light, guided by certified local historians who explain the intricate Pietra Dura stone inlay.
              </p>
            </div>

            <div className="space-y-3 p-5 rounded-lg border border-[#E8E1DA] bg-[#FAF7F2] overflow-hidden group">
              <div className="h-44 rounded-md overflow-hidden mb-3">
                <img loading="lazy" decoding="async"
                  src="/images/jaisalmer_desert_camel.jpg"
                  alt="Desert Safaris"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <span className="text-xs font-mono text-[#650018] font-bold">03.</span>
              <h3 className="font-serif text-lg font-bold text-[#262626]">Desert Safaris & Lakeside Tranquility</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Trek the rippling Thar sand dunes on sunset camel caravans, dine under star-studded skies with Kalbelia folk dancers, and cruise the gentle waters of Lake Pichola in romantic Udaipur.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. TRANSPARENT OFFERS PREVIEW WITH IMAGES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6">
        <div className="flex items-center justify-between border-b border-[#E8E1DA] pb-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C6A15B]">Verified Deals</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#650018]">Current Tour Offers</h2>
          </div>
          <Link to="/offers" className="text-xs font-semibold text-[#650018] hover:underline flex items-center gap-1">
            <span>View All Offers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Rajasthan Offer */}
          <div className="bg-white rounded-lg border border-[#E8E1DA] overflow-hidden flex flex-col justify-between group">
            <div className="h-44 w-full relative">
              <img loading="lazy" decoding="async"
                src="/images/royal_heritage_haveli.jpg"
                alt="Rajasthan Royal Heritage"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-3 left-4 text-white">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#DFCA95]">Rajasthan Special</span>
                <span className="block text-xs font-bold text-emerald-400">Complimentary Lake Pichola Cruise</span>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#262626] hover:text-[#650018] transition-colors">
                <Link to="/offers/royal-rajasthan-8d-offer">
                  8-Day Royal Heritage Package (Jaipur · Jodhpur · Udaipur · Pushkar)
                </Link>
              </h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Includes private vehicle, 7 nights in verified heritage havelis, daily breakfast & royal dinners, plus Lake Pichola boat cruise.
              </p>
              <div className="pt-4 border-t border-[#E8E1DA] flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-[#6B7280] block">Private Package</span>
                  <span className="font-serif text-base font-bold text-[#650018]">Quote on Request</span>
                </div>
                <Link
                  to="/offers/royal-rajasthan-8d-offer"
                  className="px-4 py-2 bg-[#650018] text-white text-xs font-semibold rounded hover:bg-[#4d0012] transition-colors shadow-xs"
                >
                  View Offer
                </Link>
              </div>
            </div>
          </div>

          {/* Golden Triangle Offer */}
          <div className="bg-white rounded-lg border border-[#E8E1DA] overflow-hidden flex flex-col justify-between group">
            <div className="h-44 w-full relative">
              <img loading="lazy" decoding="async"
                src="/images/taj_mahal_sunrise.jpg"
                alt="Golden Triangle Offer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-3 left-4 text-white">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#DFCA95]">Golden Triangle Circuit</span>
                <span className="block text-xs font-bold text-emerald-400">Complimentary Licensed Monument Guide</span>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#262626] hover:text-[#650018] transition-colors">
                <Link to="/offers/golden-triangle-5d-offer">
                  5-Day Classic Golden Triangle (Delhi · Agra · Jaipur)
                </Link>
              </h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Includes Taj Mahal sunrise guided tour, private AC car from Delhi pickup to drop, 4-star stays, and Chandni Chowk rickshaw ride.
              </p>
              <div className="pt-4 border-t border-[#E8E1DA] flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-[#6B7280] block">Private Package</span>
                  <span className="font-serif text-base font-bold text-[#650018]">Quote on Request</span>
                </div>
                <Link
                  to="/offers/golden-triangle-5d-offer"
                  className="px-4 py-2 bg-[#650018] text-white text-xs font-semibold rounded hover:bg-[#4d0012] transition-colors shadow-xs"
                >
                  View Offer
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. DESTINATIONS SHOWCASE (With Real Images on every card) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="flex items-center justify-between border-b border-[#E8E1DA] pb-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C6A15B]">North India Highlights</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#650018]">Top Destinations We Serve</h2>
          </div>
          <Link to="/destinations" className="text-xs font-semibold text-[#650018] hover:underline flex items-center gap-1">
            <span>All Destinations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {DESTINATIONS.slice(0, 6).map(dest => (
            <Link
              key={dest.slug}
              to={`/destinations/${dest.slug}`}
              className="group bg-white rounded-lg border border-[#E8E1DA] hover:border-[#650018] transition-all overflow-hidden flex flex-col"
            >
              <div className="h-28 w-full overflow-hidden">
                <img loading="lazy" decoding="async"
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-3 text-center">
                <h3 className="font-serif font-bold text-sm text-[#262626] group-hover:text-[#650018] transition-colors">
                  {dest.name}
                </h3>
                <p className="text-[11px] text-[#6B7280] mt-0.5">{dest.recommendedDays}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 9. TRAVEL BLOG PREVIEW WITH IMAGES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="flex items-center justify-between border-b border-[#E8E1DA] pb-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C6A15B]">Practical Insights</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#650018]">Travel Blog & Guides</h2>
          </div>
          <Link to="/travel-blog" className="text-xs font-semibold text-[#650018] hover:underline flex items-center gap-1">
            <span>Read All Guides</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.slice(0, 3).map(post => (
            <article key={post.slug} className="bg-white rounded-lg border border-[#E8E1DA] overflow-hidden flex flex-col justify-between group">
              <div className="h-44 w-full overflow-hidden">
                <img loading="lazy" decoding="async"
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#6B7280] mb-2">
                    <span className="text-[#650018] font-semibold">{post.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="font-serif text-base font-bold text-[#262626] group-hover:text-[#650018] transition-colors leading-snug mb-2">
                    <Link to={`/travel-blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-xs text-[#6B7280] line-clamp-2 leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                </div>
                <Link
                  to={`/travel-blog/${post.slug}`}
                  className="text-xs font-semibold text-[#650018] inline-flex items-center gap-1 hover:underline pt-2 border-t border-[#E8E1DA]"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 10. FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#C6A15B]">Got Questions?</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#650018]">Frequently Asked Questions</h2>
          <p className="text-xs text-[#6B7280]">
            Everything you need to know about booking, private transportation, and touring India with us.
          </p>
        </div>

        <div className="space-y-3">
          {ALL_FAQS.slice(0, 6).map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div key={index} className="bg-white rounded-lg border border-[#E8E1DA] overflow-hidden">
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-serif font-semibold text-sm sm:text-base text-[#262626] hover:text-[#650018] cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 text-[#C6A15B] shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-[#6B7280] leading-relaxed border-t border-[#FAF7F2] pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center pt-2">
          <Link to="/travel-faqs" className="text-xs font-semibold text-[#650018] hover:underline">
            View All Frequently Asked Questions →
          </Link>
        </div>
      </section>

      {/* 11. FINAL CONVERSION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-[#650018] text-white rounded-2xl p-8 sm:p-12 border-2 border-[#C6A15B] text-center space-y-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#DFCA95]">
            Tailored Just For You
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold max-w-2xl mx-auto leading-tight">
            Ready to Experience the Heritage of India?
          </h2>
          <p className="text-xs sm:text-sm text-white/80 max-w-xl mx-auto leading-relaxed">
            Speak directly with our local tour specialists at Nivasa India Journey. Tell us your travel dates, and we’ll craft your bespoke itinerary within hours.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onOpenEnquiry('Final CTA Booking Quote')}
              className="px-6 py-3 bg-[#C6A15B] hover:bg-[#A3803C] text-[#262626] font-semibold text-xs sm:text-sm rounded-md shadow-sm transition-colors cursor-pointer"
            >
              Request Custom Itinerary Quote
            </button>
            <a
              href="https://wa.me/918126716179?text=Hello%20Nivasa%20India%20Journey,%20I%20would%20like%20to%20plan%20a%20tour."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-xs sm:text-sm rounded-md shadow-sm transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp: 8126716179</span>
            </a>
            <a
              href="tel:+918126716179"
              className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm rounded-md border border-white/20 transition-colors inline-flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#DFCA95]" />
              <span>Call 8126716179</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
