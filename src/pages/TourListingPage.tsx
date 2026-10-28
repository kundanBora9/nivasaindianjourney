import React, { useState, useMemo, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Video,
  Image as ImageIcon,
  Search,
  Sparkles,
  MapPin,
  Clock,
  Car,
  Hotel,
  ShieldCheck,
  CheckCircle,
  Phone,
  MessageCircle,
  RotateCcw,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { TOUR_PACKAGES } from '../data/packages';
import { TourCard } from '../components/TourCard';
import { Breadcrumb } from '../components/Breadcrumb';

interface TourListingPageProps {
  categoryFilter?: 'rajasthan' | 'golden-triangle' | 'agra-taj' | 'delhi' | 'same-day';
  pageTitle?: string;
  pageDescription?: string;
  onOpenEnquiry: (packageName: string) => void;
}

const DESTINATIONS_LIST = [
  {
    id: 'jaipur',
    name: 'Jaipur',
    tagline: 'Forts & Palaces',
    image: '/images/amber_fort_jaipur.jpg',
    keywords: ['jaipur', 'amer', 'amber', 'pink city', 'hawa mahal']
  },
  {
    id: 'agra',
    name: 'Agra',
    tagline: 'Taj Wonder',
    image: '/images/taj_mahal_hero.jpg',
    keywords: ['agra', 'taj mahal', 'taj', 'fatehpur']
  },
  {
    id: 'udaipur',
    name: 'Udaipur',
    tagline: 'Lakes & Romance',
    image: '/images/udaipur_lake_palace.jpg',
    keywords: ['udaipur', 'pichola', 'lake palace', 'city palace']
  },
  {
    id: 'jaisalmer',
    name: 'Jaisalmer',
    tagline: 'Desert & Dunes',
    image: '/images/jaisalmer_desert_camel.jpg',
    keywords: ['jaisalmer', 'sam sand dunes', 'desert', 'camel']
  },
  {
    id: 'jodhpur',
    name: 'Jodhpur',
    tagline: 'The Blue City',
    image: '/images/jodhpur_blue_city.jpg',
    keywords: ['jodhpur', 'mehrangarh', 'blue city']
  },
  {
    id: 'delhi',
    name: 'Delhi',
    tagline: 'Capital Heritage',
    image: '/images/delhi_qutub_minar.jpg',
    keywords: ['delhi', 'qutub', 'humayun', 'red fort', 'chandni chowk']
  },
  {
    id: 'ranthambore',
    name: 'Ranthambore',
    tagline: 'Tiger Safari',
    image: '/images/ranthambore_tiger.jpg',
    keywords: ['ranthambore', 'tiger', 'safari', 'wildlife']
  },
  {
    id: 'pushkar',
    name: 'Pushkar',
    tagline: 'Holy Ghats',
    image: '/images/pushkar_ghats.jpg',
    keywords: ['pushkar', 'brahma', 'lake']
  },
  {
    id: 'varanasi',
    name: 'Varanasi',
    tagline: 'Ganga Aarti',
    image: '/images/varanasi_ganga_aarti.jpg',
    keywords: ['varanasi', 'ganga', 'kashi', 'banaras']
  }
];

const SCENIC_HERO_PHOTOS = [
  { url: '/images/taj_mahal_hero.jpg', caption: 'Sunrise over Taj Mahal, Agra' },
  { url: '/images/amber_fort_jaipur.jpg', caption: 'Regal Amer Fort Ramparts, Jaipur' },
  { url: '/images/udaipur_lake_palace.jpg', caption: 'Romantic Pichola Lake Palaces, Udaipur' }
];

export const TourListingPage: React.FC<TourListingPageProps> = ({
  categoryFilter,
  pageTitle,
  pageDescription,
  onOpenEnquiry
}) => {
  const [selectedDuration, setSelectedDuration] = useState<string>('all');
  const [selectedDestination, setSelectedDestination] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTheme, setSelectedTheme] = useState<string>('all');
  const [mediaMode, setMediaMode] = useState<'video' | 'photo'>('video');
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  const title = pageTitle || 'Curated India Tour Packages';
  const description =
    pageDescription ||
    'Discover private chauffeur driven tours across Rajasthan, the Golden Triangle, Agra Taj Mahal, and Delhi. Tailor-made itineraries with verified boutique havelis and dedicated AC fleet.';

  // Filter logic
  const filteredTours = useMemo(() => {
    return TOUR_PACKAGES.filter(pkg => {
      // Category filter (from URL route)
      if (categoryFilter && pkg.category !== categoryFilter) return false;

      // Filter by duration
      if (selectedDuration === '1') {
        if (pkg.durationDays !== 1) return false;
      } else if (selectedDuration === '2-5') {
        if (pkg.durationDays < 2 || pkg.durationDays > 5) return false;
      } else if (selectedDuration === '6+') {
        if (pkg.durationDays < 6) return false;
      }

      // Filter by destination shortcut
      if (selectedDestination !== 'all') {
        const destObj = DESTINATIONS_LIST.find(d => d.id === selectedDestination);
        if (destObj) {
          const combined = `${pkg.title} ${pkg.destination} ${pkg.overview} ${pkg.highlights.join(' ')}`.toLowerCase();
          const matches = destObj.keywords.some(kw => combined.includes(kw));
          if (!matches) return false;
        }
      }

      // Filter by theme
      if (selectedTheme === 'forts') {
        const match = pkg.highlights.some(h => /fort|palace|regal|sheesh/i.test(h)) || /fort|palace/i.test(pkg.title);
        if (!match) return false;
      } else if (selectedTheme === 'lakes') {
        const match = /lake|udaipur|pichola/i.test(pkg.destination) || /lake|water/i.test(pkg.title);
        if (!match) return false;
      } else if (selectedTheme === 'desert') {
        const match = /desert|dune|jaisalmer|camel/i.test(pkg.destination) || /desert|safari/i.test(pkg.title);
        if (!match) return false;
      } else if (selectedTheme === 'wildlife') {
        const match = /tiger|ranthambore|safari|wildlife/i.test(pkg.destination) || /tiger|wildlife/i.test(pkg.title);
        if (!match) return false;
      } else if (selectedTheme === 'same-day') {
        if (pkg.durationDays !== 1) return false;
      }

      // Search Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const searchableText = `${pkg.title} ${pkg.destination} ${pkg.overview} ${pkg.highlights.join(' ')}`.toLowerCase();
        if (!searchableText.includes(q)) return false;
      }

      return true;
    });
  }, [categoryFilter, selectedDuration, selectedDestination, selectedTheme, searchQuery]);

  const hasActiveFilters =
    selectedDuration !== 'all' ||
    selectedDestination !== 'all' ||
    selectedTheme !== 'all' ||
    searchQuery.trim() !== '';

  const handleResetFilters = () => {
    setSelectedDuration('all');
    setSelectedDestination('all');
    setSelectedTheme('all');
    setSearchQuery('');
  };

  return (
    <div className="space-y-8 pb-16">
      {/* 1. TOP CINEMATIC MEDIA HERO BANNER (MakeMyTrip Holiday Style) */}
      <section className="relative w-full bg-[#111111] overflow-hidden text-white min-h-[460px] sm:min-h-[500px] flex flex-col justify-between">
        {/* Background Video or Photo Gallery */}
        <div className="absolute inset-0 z-0">
          {mediaMode === 'video' ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              poster="/images/taj_mahal_hero.jpg"
              className="w-full h-full object-cover opacity-70"
            >
              <source src="/videos/hero_heritage.mp4" type="video/mp4" />
            </video>
          ) : (
            <img
              src={SCENIC_HERO_PHOTOS[activePhotoIdx].url}
              alt={SCENIC_HERO_PHOTOS[activePhotoIdx].caption}
              className="w-full h-full object-cover opacity-75 transition-opacity duration-700"
            />
          )}

          {/* Deep MakeMyTrip Gradient Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-black/60 to-black/75" />
          <div className="absolute inset-0 bg-radial from-transparent via-black/30 to-black/80" />
        </div>

        {/* Media Mode Toggle (Top Right) */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pt-6 w-full flex items-center justify-between">
          <Breadcrumb
            items={[
              { label: 'Tours & Packages', href: '/tour-packages' },
              ...(categoryFilter ? [{ label: title }] : [])
            ]}
          />

          <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md p-1 rounded-full border border-white/20 text-xs">
            <button
              onClick={() => setMediaMode('video')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all cursor-pointer ${
                mediaMode === 'video'
                  ? 'bg-[#650018] text-white font-semibold shadow-sm'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>Live Video</span>
            </button>
            <button
              onClick={() => setMediaMode('photo')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all cursor-pointer ${
                mediaMode === 'photo'
                  ? 'bg-[#650018] text-white font-semibold shadow-sm'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Scenic Photos</span>
            </button>
          </div>
        </div>

        {/* Hero Copy & Holiday Trust Strip */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-8 w-full space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/25 rounded-full text-xs font-semibold uppercase tracking-wider text-[#DFCA95]">
            <Sparkles className="w-3.5 h-3.5 text-[#DFCA95]" />
            <span>MakeMyTrip Inspired Holiday Hub · 100% Private & Customizable</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-4xl drop-shadow-md">
            {title}
          </h1>

          <p className="text-sm sm:text-base text-white/85 max-w-3xl leading-relaxed drop-shadow-sm font-light">
            {description}
          </p>

          {/* MMT Key Inclusions & Value Props Bar */}
          <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-white/90">
            <span className="flex items-center gap-1.5">
              <span className="text-[#DFCA95] font-bold">★ 4.9/5</span>
              <span className="text-white/70">(1,450+ Verified Reviews)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Car className="w-4 h-4 text-[#DFCA95]" />
              <span>Dedicated AC Fleet</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Hotel className="w-4 h-4 text-[#DFCA95]" />
              <span>Handpicked Royal Havelis</span>
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#DFCA95]" />
              <span>Licensed Guides</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-[#DFCA95]" />
              <span>Concierge: 8126716179</span>
            </span>
          </div>
        </div>

        {/* MMT Category Quick-Navigation Tabs pinned to bottom of Hero */}
        <div className="relative z-10 w-full bg-black/50 backdrop-blur-md border-t border-white/15">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center gap-1 sm:gap-3 overflow-x-auto py-2.5 scrollbar-none">
            <span className="text-xs uppercase tracking-wider text-[#DFCA95] font-bold shrink-0 hidden md:inline-block mr-2">
              Explore:
            </span>
            {[
              { label: 'All India Packages', path: '/tour-packages', active: !categoryFilter },
              { label: 'Rajasthan Heritage', path: '/rajasthan-tours', active: categoryFilter === 'rajasthan' },
              { label: 'Golden Triangle', path: '/golden-triangle-tour', active: categoryFilter === 'golden-triangle' },
              { label: 'Agra & Taj Mahal', path: '/agra-tour-packages', active: categoryFilter === 'agra-taj' },
              { label: 'Delhi Heritage', path: '/delhi-tour-packages', active: categoryFilter === 'delhi' }
            ].map(tab => (
              <Link
                key={tab.path}
                to={tab.path}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  tab.active
                    ? 'bg-[#C6A15B] text-[#262626] shadow-sm'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 2. MAKEMYTRIP DESTINATION QUICK-SELECT CAROUSEL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-white rounded-xl border border-[#E8E1DA] p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm sm:text-base font-serif font-bold text-[#262626] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#650018]" />
                <span>Explore Packages by Destination</span>
              </h2>
              <p className="text-xs text-[#6B7280]">
                Click any city to quickly filter verified holiday itineraries
              </p>
            </div>

            {selectedDestination !== 'all' && (
              <button
                onClick={() => setSelectedDestination('all')}
                className="text-xs text-[#650018] font-semibold flex items-center gap-1 hover:underline cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Show All Cities</span>
              </button>
            )}
          </div>

          {/* Destination Horizontal Strip */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none pt-1">
            <button
              onClick={() => setSelectedDestination('all')}
              className={`shrink-0 flex flex-col items-center p-2 rounded-xl border transition-all cursor-pointer min-w-[84px] text-center ${
                selectedDestination === 'all'
                  ? 'border-[#650018] bg-[#650018]/5 ring-2 ring-[#650018]/20'
                  : 'border-[#E8E1DA] hover:border-[#C6A15B] bg-[#FAF7F2]'
              }`}
            >
              <div className="w-14 h-14 rounded-full bg-[#650018] text-white flex items-center justify-between justify-center font-bold text-xs shadow-xs mb-1.5 flex items-center justify-center">
                ALL
              </div>
              <span className="text-xs font-semibold text-[#262626]">All Cities</span>
              <span className="text-[10px] text-[#6B7280]">Pan India</span>
            </button>

            {DESTINATIONS_LIST.map(dest => {
              const isSelected = selectedDestination === dest.id;
              return (
                <button
                  key={dest.id}
                  onClick={() => setSelectedDestination(isSelected ? 'all' : dest.id)}
                  className={`shrink-0 flex flex-col items-center p-2 rounded-xl border transition-all cursor-pointer min-w-[88px] text-center group ${
                    isSelected
                      ? 'border-[#650018] bg-[#650018]/5 ring-2 ring-[#650018]/30'
                      : 'border-[#E8E1DA] hover:border-[#C6A15B] bg-white'
                  }`}
                >
                  <div className="w-14 h-14 rounded-full overflow-hidden shadow-xs mb-1.5 border border-white/60 relative">
                    <img loading="lazy" decoding="async"
                      src={dest.image}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/taj_mahal_hero.jpg';
                      }}
                    />
                  </div>
                  <span className={`text-xs font-bold ${isSelected ? 'text-[#650018]' : 'text-[#262626]'}`}>
                    {dest.name}
                  </span>
                  <span className="text-[10px] text-[#6B7280] truncate max-w-[80px]">
                    {dest.tagline}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. MAKEMYTRIP-STYLE FILTERS & SEARCH CONTROL BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-white rounded-xl border border-[#E8E1DA] p-4 sm:p-5 shadow-xs space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#6B7280] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by city, fort, lake (e.g. Amer Fort, Lake Pichola, Taj)..."
                className="w-full pl-9 pr-4 py-2 bg-[#FAF7F2] border border-[#E8E1DA] focus:border-[#650018] rounded-lg text-xs sm:text-sm text-[#262626] outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#6B7280] hover:text-[#262626]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Duration Filters */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-semibold text-[#262626] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#650018]" />
                <span>Duration:</span>
              </span>
              <div className="inline-flex p-1 bg-[#FAF7F2] rounded-lg border border-[#E8E1DA]">
                {[
                  { id: 'all', label: 'All' },
                  { id: '1', label: '1 Day' },
                  { id: '2-5', label: '2-5 Days' },
                  { id: '6+', label: '6+ Days' }
                ].map(f => (
                  <button
                    key={f.id}
                    onClick={() => setSelectedDuration(f.id)}
                    className={`px-3 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                      selectedDuration === f.id
                        ? 'bg-[#650018] text-white shadow-xs font-semibold'
                        : 'text-[#6B7280] hover:text-[#262626]'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Theme Filter */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-semibold text-[#262626] flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#650018]" />
                <span>Theme:</span>
              </span>
              <select
                value={selectedTheme}
                onChange={(e) => setSelectedTheme(e.target.value)}
                className="px-3 py-1.5 bg-[#FAF7F2] border border-[#E8E1DA] rounded-lg text-xs font-medium text-[#262626] outline-none focus:border-[#650018] cursor-pointer"
              >
                <option value="all">All Themes</option>
                <option value="forts">Royal Forts & Palaces</option>
                <option value="lakes">Romantic Lakes & Havelis</option>
                <option value="desert">Thar Desert & Dunes</option>
                <option value="wildlife">Wildlife & Tiger Safari</option>
                <option value="same-day">Express Same Day</option>
              </select>
            </div>
          </div>

          {/* Results Counter & Active Filter Tags */}
          <div className="pt-3 border-t border-[#E8E1DA] flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-[#6B7280]">
              <span>
                Showing <strong className="text-[#650018] font-bold">{filteredTours.length}</strong> verified holiday packages
              </span>
              <span>·</span>
              <span className="text-emerald-700 font-medium">✓ Inclusive of private AC car, chauffeur & sightseeing</span>
            </div>

            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="text-xs font-semibold text-[#650018] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset All Filters</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 4. MAKEMYTRIP TOUR PACKAGE CARDS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        {filteredTours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredTours.map(tour => (
              <TourCard key={tour.id} tour={tour} onEnquire={onOpenEnquiry} />
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 text-center rounded-xl border border-[#E8E1DA] space-y-4 max-w-xl mx-auto">
            <div className="w-12 h-12 rounded-full bg-[#FAF7F2] text-[#650018] flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#262626]">
              No packages match your active filters
            </h3>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              We customize 100% of our private tours according to your dates, preferences, and vehicle choice. Contact our trip designer for a custom quote.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 bg-[#650018] text-white rounded-md text-xs font-semibold transition-colors hover:bg-[#4d0012] cursor-pointer"
              >
                Reset Filters
              </button>
              <button
                onClick={() => onOpenEnquiry('Custom Private Itinerary Request')}
                className="px-4 py-2 bg-[#FAF7F2] border border-[#E8E1DA] text-[#650018] rounded-md text-xs font-semibold transition-colors hover:border-[#650018] cursor-pointer"
              >
                Request Custom Tour
              </button>
            </div>
          </div>
        )}
      </section>

      {/* 5. MAKEMYTRIP-STYLE BOTTOM TRAVEL ASSISTANCE BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pt-4">
        <div className="bg-gradient-to-r from-[#650018] to-[#400010] rounded-xl text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs uppercase tracking-widest text-[#DFCA95] font-semibold">
              Need Help Choosing Your Package?
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold">
              Talk directly with a local North India travel specialist
            </h3>
            <p className="text-xs sm:text-sm text-white/80 max-w-xl">
              Get customized day-by-day itineraries, instant private vehicle quotes, hotel recommendations, and monument ticket advice with zero commitment.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://wa.me/918126716179?text=Hello%20Nivasa%20India%20Journey,%20I%20need%20help%20choosing%20a%20tour%20package."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs sm:text-sm font-semibold transition-colors inline-flex items-center gap-2 shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp: 8126716179</span>
            </a>

            <a
              href="tel:+918126716179"
              className="px-5 py-3 bg-white/10 hover:bg-white/20 border border-white/30 text-white rounded-lg text-xs sm:text-sm font-semibold transition-colors inline-flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#DFCA95]" />
              <span>Call +91 8126716179</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
