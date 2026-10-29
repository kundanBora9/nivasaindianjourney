import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Clock,
  MapPin,
  Calendar,
  Users,
  Check,
  X as CloseIcon,
  Phone,
  MessageCircle,
  Car,
  ShieldCheck,
  ChevronDown,
  ArrowRight,
  Sun,
  Bed,
  Utensils,
  Camera,
  CheckCircle2,
  Sparkles,
  Video,
  Hotel,
  Compass,
  Image as ImageIcon,
  ZoomIn
} from 'lucide-react';
import { getPackageBySlug, TOUR_PACKAGES } from '../data/packages';
import { Breadcrumb } from '../components/Breadcrumb';
import { ImageLightboxModal, LightboxImage } from '../components/ImageLightboxModal';

interface PackageDetailPageProps {
  onOpenEnquiry: (packageName: string) => void;
}

// Category -> real listing URL (the old `/${category}-tours` pattern produced broken links)
const CATEGORY_PATHS: Record<string, string> = {
  rajasthan: '/rajasthan-tours',
  'golden-triangle': '/golden-triangle-tour',
  'agra-taj': '/agra-tour-packages',
  delhi: '/delhi-tour-packages',
  'same-day': '/same-day-tours'
};

export const PackageDetailPage: React.FC<PackageDetailPageProps> = ({ onOpenEnquiry }) => {
  const { slug: paramSlug } = useParams<{ slug: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [openDays, setOpenDays] = useState<number[]>([1, 2]);

  const slug = paramSlug || location.pathname.replace(/^\//, '').replace(/\/$/, '');
  const tour = getPackageBySlug(slug || '');

  const [mediaMode, setMediaMode] = useState<'photo' | 'video'>('photo');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const toggleDay = (day: number) => {
    setOpenDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const expandAllDays = () => {
    if (tour) {
      setOpenDays(tour.itinerary.map(i => i.day));
    }
  };

  const collapseAllDays = () => {
    setOpenDays([]);
  };

  const allMediaImages: LightboxImage[] = useMemo(() => {
    if (!tour) return [];
    const list: LightboxImage[] = [
      { url: tour.featuredImage, title: tour.title, subtitle: tour.destination }
    ];
    if (tour.itinerary) {
      tour.itinerary.forEach(d => {
        if (d.image && !list.some(x => x.url === d.image)) {
          list.push({
            url: d.image,
            title: d.title,
            day: d.day,
            subtitle: `Day ${d.day} Sightseeing Attraction`
          });
        }
      });
    }
    if (tour.galleryImages) {
      tour.galleryImages.forEach((img, idx) => {
        if (!list.some(x => x.url === img)) {
          list.push({ url: img, title: `${tour.title} - View ${idx + 1}` });
        }
      });
    }
    return list;
  }, [tour]);

  const routeStops = useMemo(() => {
    if (!tour) return [];
    if (tour.destination.includes('·')) {
      return tour.destination.split('·').map(s => s.trim());
    }
    if (tour.destination.includes('->') || tour.destination.includes('→')) {
      return tour.destination.split(/->|→/).map(s => s.trim());
    }
    return [tour.destination];
  }, [tour]);

  // <title>, meta tags and JSON-LD for this page are handled centrally by <RouteSEO /> (src/seo).
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tour]);

  if (!tour) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="font-serif text-2xl font-bold text-[#650018]">Tour Package Not Found</h1>
        <p className="text-xs text-[#6B7280]">
          The tour itinerary you are looking for may have moved or been updated.
        </p>
        <Link
          to="/tour-packages"
          className="inline-block px-4 py-2 bg-[#650018] text-white text-xs font-semibold rounded hover:bg-[#4d0012]"
        >
          Browse All Tour Packages
        </Link>
      </div>
    );
  }


  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const relatedPackages = TOUR_PACKAGES.filter(
    p => p.category === tour.category && p.slug !== tour.slug
  ).slice(0, 3);

  const whatsAppQuoteUrl = `https://wa.me/918126716179?text=${encodeURIComponent(
    `Hello Nivasa India Journey, I am interested in booking: "${tour.title}" (${tour.duration}). Please send full quote & customized plan.`
  )}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-10">
      {/* 1. Breadcrumbs */}
      <Breadcrumb
        items={[
          { label: 'Tour Packages', href: '/tour-packages' },
          { label: tour.categoryLabel, href: CATEGORY_PATHS[tour.category] || '/tour-packages' },
          { label: tour.title }
        ]}
      />

      {/* 2. MAKEMYTRIP-STYLE TOP MEDIA SHOWCASE (Video + Photo Collage) */}
      <section className="bg-white rounded-2xl border border-[#E8E1DA] p-3 sm:p-4 shadow-sm space-y-4 overflow-hidden">
        {/* Media Grid: 1 Large Hero Tile + 4 Secondary Monument Thumbnails */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 h-[380px] sm:h-[460px]">
          {/* Main Hero Tile (Left 8 Cols) */}
          <div
            className={`lg:col-span-8 relative rounded-xl overflow-hidden bg-black group h-full ${
              mediaMode === 'photo' ? 'cursor-pointer' : ''
            }`}
            onClick={() => {
              if (mediaMode === 'photo') {
                handleOpenLightbox(selectedPhotoIndex);
              }
            }}
          >
            {mediaMode === 'video' ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                poster={tour.featuredImage}
                className="w-full h-full object-cover"
              >
                <source src="/videos/hero_heritage.mp4" type="video/mp4" />
              </video>
            ) : (
              <img
                src={allMediaImages[selectedPhotoIndex]?.url || tour.featuredImage}
                alt={tour.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/taj_mahal_hero.jpg';
                }}
              />
            )}

            {/* Gradient Scrim */}
            <div className="absolute inset-0  pointer-events-none" />

            {/* Top Bar on Hero: Badges & Media Toggle */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <span className="bg-[#650018] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md shadow-sm flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#DFCA95]" />
                  <span>★ 4.9/5 MMT Verified Tour</span>
                </span>
                <span className="hidden sm:inline-flex bg-black/60 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-md border border-white/20">
                  Customizable
                </span>
              </div>

              {/* Video / Photo Mode Toggle & Fullscreen Popup Button */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenLightbox(selectedPhotoIndex);
                  }}
                  className="bg-black/70 hover:bg-black/90 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-full border border-white/20 flex items-center gap-1 shadow-sm cursor-pointer"
                  title="View full-screen photo popup"
                >
                  <ZoomIn className="w-3.5 h-3.5 text-[#DFCA95]" />
                  <span className="hidden sm:inline font-medium">Fullscreen</span>
                </button>

                <div className="flex items-center gap-1 bg-black/70 backdrop-blur-md p-1 rounded-full border border-white/20 text-xs">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setMediaMode('photo');
                      handleOpenLightbox(selectedPhotoIndex);
                    }}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full transition-all cursor-pointer ${
                      mediaMode === 'photo'
                        ? 'bg-[#C6A15B] text-[#262626] font-bold shadow-xs'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Photos ({allMediaImages.length})</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setMediaMode('video');
                    }}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full transition-all cursor-pointer ${
                      mediaMode === 'video'
                        ? 'bg-[#650018] text-white font-bold shadow-xs'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Video</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Caption on Main Hero */}
            <div className="absolute bottom-4 left-4 right-4 text-white z-10 pointer-events-none">
              <span className="text-xs text-[#DFCA95] font-semibold uppercase tracking-wider block">
                {allMediaImages[selectedPhotoIndex]?.day
                  ? `Day ${allMediaImages[selectedPhotoIndex].day} Sightseeing Attraction`
                  : 'Premier Destination Highlight'}
              </span>
              <p className="text-sm sm:text-base font-serif font-bold text-white drop-shadow-md truncate">
                {allMediaImages[selectedPhotoIndex]?.title || tour.title}
              </p>
              <span className="text-[11px] text-white/80 block mt-0.5">
                🔍 Click image to enlarge full screen popup in HD
              </span>
            </div>
          </div>

          {/* Right 4-Thumbnail Grid (4 Cols) */}
          <div className="hidden lg:grid col-span-4 grid-cols-2 gap-3 h-full">
            {allMediaImages.slice(1, 5).map((media, idx) => {
              const isLast = idx === 3 && allMediaImages.length > 5;
              const remaining = allMediaImages.length - 5;
              const isSelected = selectedPhotoIndex === idx + 1 && mediaMode === 'photo';

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setSelectedPhotoIndex(idx + 1);
                    setMediaMode('photo');
                    handleOpenLightbox(idx + 1);
                  }}
                  className={`relative rounded-xl overflow-hidden group cursor-pointer border transition-all h-full ${
                    isSelected ? 'border-[#C6A15B] ring-2 ring-[#C6A15B]/50' : 'border-[#E8E1DA] hover:border-[#650018]'
                  }`}
                  title="Click to view full screen popup"
                >
                  <img loading="lazy" decoding="async"
                    src={media.url}
                    alt={media.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/amber_fort_jaipur.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

                  {/* Day Tag */}
                  <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold px-1.5 py-0.5 rounded">
                    {media.day ? `Day ${media.day}` : `Photo ${idx + 2}`}
                  </div>

                  {/* Title */}
                  <div className="absolute bottom-2 left-2 right-2 text-white text-[11px] font-medium leading-tight truncate">
                    {media.title.split('—')[0]}
                  </div>

                  {/* +More Overlay for last thumb */}
                  {isLast && remaining > 0 && (
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenLightbox(4);
                      }}
                      className="absolute inset-0 bg-black/75 backdrop-blur-xs flex flex-col items-center justify-center text-white p-2 text-center hover:bg-black/85 transition-colors"
                    >
                      <Camera className="w-5 h-5 text-[#DFCA95] mb-1" />
                      <span className="text-sm font-bold">+{remaining} Photos</span>
                      <span className="text-[10px] text-white/80">View in popup</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Route Progression & Key Inclusions Bar (MakeMyTrip Style) */}
        <div className="pt-3 border-t border-[#E8E1DA] flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          {/* Route Progression */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-bold text-[#650018] uppercase tracking-wider text-[11px]">Route:</span>
            {routeStops.map((stop, idx) => (
              <React.Fragment key={idx}>
                <span className="font-medium text-[#262626] bg-[#FAF7F2] px-2 py-0.5 rounded border border-[#E8E1DA]">
                  {stop}
                </span>
                {idx < routeStops.length - 1 && (
                  <span className="text-[#C6A15B] font-bold">→</span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Quick Inclusion Badges */}
          <div className="flex items-center gap-3 text-[#6B7280] flex-wrap">
            <span className="flex items-center gap-1 text-[#262626] font-medium">
              <Hotel className="w-3.5 h-3.5 text-[#650018]" /> Handpicked Stays
            </span>
            <span className="flex items-center gap-1 text-[#262626] font-medium">
              <Car className="w-3.5 h-3.5 text-[#650018]" /> Dedicated AC Cab
            </span>
            <span className="flex items-center gap-1 text-[#262626] font-medium">
              <Utensils className="w-3.5 h-3.5 text-[#650018]" /> Meals Included
            </span>
            <span className="flex items-center gap-1 text-[#262626] font-medium">
              <Compass className="w-3.5 h-3.5 text-[#650018]" /> Govt. Guide Support
            </span>
          </div>
        </div>
      </section>

      {/* 3. Top Header & Primary Identity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Title, Metadata, Summary */}
        <div className="lg:col-span-8 space-y-4">
          {/* Metadata: Unboxed text with · separators */}
          <div className="flex items-center gap-2 text-xs text-[#6B7280]">
            <span className="text-[#650018] font-semibold">{tour.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{tour.duration}</span>
            <span aria-hidden="true">·</span>
            <span>{tour.destination}</span>
          </div>

          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#262626] leading-tight">
            {tour.title}
          </h1>

          <p className="text-sm text-[#262626] leading-relaxed">
            {tour.overview}
          </p>

          <div className="p-3 bg-white rounded-lg border border-[#E8E1DA] text-xs space-y-1">
            <span className="font-semibold text-[#650018]">Ideal For: </span>
            <span className="text-[#6B7280]">{tour.idealFor}</span>
          </div>
        </div>

        {/* Right Column: Pricing & Sticky Booking Card */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-[#E8E1DA] p-6 shadow-sm space-y-5">
          <div>
            <span className="text-xs text-[#6B7280] block">Private Journey</span>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-xl sm:text-2xl font-bold text-[#650018]">
                Quote on Request
              </span>
            </div>
            <p className="text-[11px] text-[#6B7280] mt-1 leading-snug">
              Bespoke quote tailored to your travel dates, party size & preferred stays
            </p>
          </div>

          <div className="space-y-2.5 pt-2">
            <button
              onClick={() => onOpenEnquiry(tour.title)}
              className="w-full py-3 px-4 bg-[#650018] hover:bg-[#4d0012] text-white text-xs font-semibold uppercase tracking-wider rounded-md shadow-sm transition-colors cursor-pointer"
            >
              Enquire About This Tour
            </button>

            <a
              href={whatsAppQuoteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-md shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Quote (8126716179)</span>
            </a>

            <a
              href="tel:+918126716179"
              className="w-full py-2.5 px-4 bg-[#FAF7F2] hover:bg-[#FAF7F2]/80 text-[#650018] border border-[#E8E1DA] text-xs font-semibold rounded-md transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-[#C6A15B]" />
              <span>Call +91 8126716179</span>
            </a>
          </div>

          <div className="pt-3 border-t border-[#E8E1DA] space-y-1.5 text-[11px] text-[#6B7280]">
            <p className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C6A15B]" />
              <span>100% Tailored Private Vehicle & Chauffeur</span>
            </p>
            <p className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C6A15B]" />
              <span>Direct Booking with Local Tour Specialists</span>
            </p>
          </div>
        </div>
      </div>

      {/* 3. Tour Highlights */}
      <section className="bg-white rounded-xl border border-[#E8E1DA] p-6 sm:p-8 space-y-4">
        <h2 className="font-serif text-xl font-bold text-[#650018]">Tour Highlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {tour.highlights.map((highlight, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#262626]">
              <Check className="w-4 h-4 text-[#C6A15B] shrink-0 mt-0.5" />
              <span>{highlight}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Day-by-Day Detailed Itinerary with Attraction Images */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E8E1DA] pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C6A15B]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Attraction-by-Attraction Schedule</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#650018]">
              Day-by-Day Journey Itinerary
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7280] mt-1">
              Every day matched with its covered monuments, temples, bazaars, and scenic experiences.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={expandAllDays}
              className="px-3 py-1.5 rounded bg-[#FAF7F2] hover:bg-[#FAF7F2]/80 text-[#650018] border border-[#E8E1DA] font-medium transition-colors cursor-pointer"
            >
              Expand All ({tour.itinerary.length} Days)
            </button>
            <button
              onClick={collapseAllDays}
              className="px-3 py-1.5 rounded bg-white hover:bg-[#FAF7F2] text-[#6B7280] border border-[#E8E1DA] font-medium transition-colors cursor-pointer"
            >
              Collapse
            </button>
          </div>
        </div>

        <div className="space-y-5">
          {tour.itinerary.map(item => {
            const isOpen = openDays.includes(item.day);
            return (
              <div
                key={item.day}
                className="bg-white rounded-xl border border-[#E8E1DA] overflow-hidden shadow-xs transition-shadow hover:shadow-sm"
              >
                {/* Header Row (Clickable Accordion Trigger) */}
                <button
                  onClick={() => toggleDay(item.day)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF7F2]/40 transition-colors"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                    {/* Day Number Badge */}
                    <div className="shrink-0 w-12 sm:w-14 h-12 sm:h-14 rounded-lg bg-[#650018] text-[#DFCA95] border border-[#C6A15B]/30 flex flex-col items-center justify-center text-center shadow-xs">
                      <span className="text-[10px] uppercase font-mono tracking-wider text-white/70 leading-none">Day</span>
                      <span className="font-serif text-lg sm:text-xl font-bold leading-none mt-0.5">{item.day}</span>
                    </div>

                    <div className="space-y-1 min-w-0">
                      <h3 className="font-serif text-base sm:text-lg font-bold text-[#262626] truncate sm:whitespace-normal">
                        {item.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                        {item.timeOfDay && (
                          <span className="inline-flex items-center gap-1 font-medium text-[#650018]">
                            <Sun className="w-3.5 h-3.5 text-[#C6A15B]" />
                            <span>{item.timeOfDay}</span>
                          </span>
                        )}
                        {item.approxDuration && (
                          <span className="inline-flex items-center gap-1 text-[#6B7280]">
                            <Clock className="w-3 h-3 text-[#C6A15B]" />
                            <span>{item.approxDuration}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Thumbnail preview when closed + Chevron */}
                  <div className="flex items-center gap-3 shrink-0">
                    {!isOpen && item.image && (
                      <div className="hidden sm:block w-14 h-14 rounded-md overflow-hidden border border-[#E8E1DA] shadow-xs relative">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className={`w-8 h-8 rounded-full border border-[#E8E1DA] flex items-center justify-center transition-colors ${isOpen ? 'bg-[#650018] text-white' : 'bg-[#FAF7F2] text-[#650018]'}`}>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180 text-white' : 'text-[#650018]'}`}
                      />
                    </div>
                  </div>
                </button>

                {/* Expanded Itinerary Details with Day Monument Photo */}
                {isOpen && (
                  <div className="px-4 sm:px-6 pb-6 pt-2 border-t border-[#E8E1DA]/60 space-y-5">
                    {/* Day Monument & Sightseeing Visual Banner */}
                    {item.image && (
                      <div
                        onClick={() => {
                          const fIdx = allMediaImages.findIndex(m => m.day === item.day || m.url === item.image);
                          handleOpenLightbox(fIdx >= 0 ? fIdx : 0);
                        }}
                        className="relative rounded-lg overflow-hidden border border-[#E8E1DA] shadow-xs bg-[#FAF7F2] group cursor-pointer hover:border-[#650018] transition-all"
                        title="Click to view full-screen photo popup"
                      >
                        <div className="h-52 sm:h-72 w-full overflow-hidden relative">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                          {/* Floating Enlarge Chip */}
                          <div className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-md text-white text-xs border border-white/20 flex items-center gap-1.5 shadow-sm">
                            <ZoomIn className="w-3.5 h-3.5 text-[#DFCA95]" />
                            <span className="font-medium">Enlarge Photo</span>
                          </div>

                          <div className="absolute bottom-3 left-4 right-4 flex flex-wrap items-end justify-between gap-2 text-white pointer-events-none">
                            <div className="space-y-0.5">
                              <span className="text-[11px] uppercase tracking-wider text-[#DFCA95] font-semibold flex items-center gap-1.5 drop-shadow-sm">
                                <Camera className="w-3.5 h-3.5 text-[#DFCA95]" />
                                Day {item.day} Sightseeing & Monument Spotlight
                              </span>
                              <p className="font-serif text-sm sm:text-base font-bold drop-shadow-sm">
                                {item.title}
                              </p>
                              <span className="text-[10px] text-white/80 block">
                                🔍 Click to view full-screen popup in HD
                              </span>
                            </div>
                            {item.approxDuration && (
                              <span className="text-[11px] bg-black/50 backdrop-blur-xs px-2.5 py-1 rounded text-white/95 border border-white/20 font-medium">
                                {item.approxDuration}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Monuments & Attractions Covered Badges */}
                    {item.highlights && item.highlights.length > 0 && (
                      <div className="space-y-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#650018] flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#C6A15B]" />
                          <span>Attractions Covered on Day {item.day}:</span>
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {item.highlights.map((h, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center gap-1.5 text-xs bg-[#FAF7F2] text-[#262626] font-medium px-3 py-1.5 rounded-md border border-[#E8E1DA]"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#C6A15B] shrink-0" />
                              <span>{h}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Narrative Description */}
                    <p className="text-xs sm:text-sm text-[#262626] leading-relaxed">
                      {item.description}
                    </p>

                    {/* Accommodation, Meals & Vehicle Logistics Strip */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 bg-[#FAF7F2] rounded-lg border border-[#E8E1DA] text-xs">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 font-semibold text-[#650018]">
                          <Bed className="w-3.5 h-3.5 text-[#C6A15B]" />
                          <span>Overnight Stay:</span>
                        </div>
                        <p className="text-[#6B7280]">{item.stay || 'Heritage Haveli Hotel'}</p>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 font-semibold text-[#650018]">
                          <Utensils className="w-3.5 h-3.5 text-[#C6A15B]" />
                          <span>Meals Included:</span>
                        </div>
                        <p className="text-[#6B7280]">{item.meals || 'Breakfast included'}</p>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 font-semibold text-[#650018]">
                          <Car className="w-3.5 h-3.5 text-[#C6A15B]" />
                          <span>Private Chauffeur:</span>
                        </div>
                        <p className="text-[#6B7280]">Dedicated AC Car & Monument Guide</p>
                      </div>
                    </div>

                    {/* Direct Day Customization CTA */}
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs border-t border-[#E8E1DA]/50">
                      <span className="text-[#6B7280]">
                        Want to add or swap monuments on Day {item.day}?
                      </span>
                      <a
                        href={`https://wa.me/918126716179?text=Hello%20Nivasa%20India%20Journey,%20I%20have%20a%20question%20about%20Day%20${item.day}%20of%20${encodeURIComponent(tour.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#650018] hover:text-[#4d0012] font-semibold inline-flex items-center gap-1.5 hover:underline"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Ask about Day {item.day} on WhatsApp (8126716179)</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Inclusions & Exclusions */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-[#E8E1DA] p-6 space-y-4">
          <h2 className="font-serif text-lg font-bold text-emerald-800 flex items-center gap-2">
            <Check className="w-5 h-5" />
            <span>What is Included</span>
          </h2>
          <ul className="space-y-2.5 text-xs sm:text-sm text-[#262626]">
            {tour.inclusions.map((inc, i) => (
              <li key={i} className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{inc}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl border border-[#E8E1DA] p-6 space-y-4">
          <h2 className="font-serif text-lg font-bold text-[#650018] flex items-center gap-2">
            <CloseIcon className="w-5 h-5" />
            <span>What is Excluded</span>
          </h2>
          <ul className="space-y-2.5 text-xs sm:text-sm text-[#6B7280]">
            {tour.exclusions.map((exc, i) => (
              <li key={i} className="flex items-start gap-2">
                <CloseIcon className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>{exc}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6. Practical Details & Best Time */}
      <section className="bg-white rounded-xl border border-[#E8E1DA] p-6 sm:p-8 space-y-4">
        <h2 className="font-serif text-lg font-bold text-[#650018]">Transport & Travel Conditions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[#262626] font-semibold">
              <Car className="w-4 h-4 text-[#C6A15B]" />
              <span>Vehicle & Chauffeur Specification</span>
            </div>
            <p className="text-[#6B7280] leading-relaxed">{tour.transportDetails}</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[#262626] font-semibold">
              <Sun className="w-4 h-4 text-[#C6A15B]" />
              <span>Best Time to Visit</span>
            </div>
            <p className="text-[#6B7280] leading-relaxed">{tour.bestTimeToVisit}</p>
          </div>
        </div>
      </section>

      {/* 7. Package FAQs */}
      {tour.faqs && tour.faqs.length > 0 && (
        <section className="bg-white rounded-xl border border-[#E8E1DA] p-6 sm:p-8 space-y-4">
          <h2 className="font-serif text-lg font-bold text-[#650018]">Tour Questions & Answers</h2>
          <div className="space-y-3">
            {tour.faqs.map((f, idx) => (
              <div key={idx} className="border-b border-[#E8E1DA] pb-3 last:border-0 last:pb-0">
                <h3 className="font-serif font-bold text-sm text-[#262626] mb-1">{f.question}</h3>
                <p className="text-xs text-[#6B7280] leading-relaxed">{f.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 8. Related Packages */}
      {relatedPackages.length > 0 && (
        <section className="space-y-6 pt-4">
          <div className="border-b border-[#E8E1DA] pb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C6A15B]">Similar Circuits</span>
            <h2 className="font-serif text-xl font-bold text-[#650018]">You May Also Consider</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPackages.map(pkg => (
              <div key={pkg.id} className="bg-white rounded-lg border border-[#E8E1DA] p-5 space-y-3 flex flex-col justify-between">
                <div>
                  <span className="text-xs text-[#6B7280]">{pkg.duration}</span>
                  <h3 className="font-serif font-bold text-base text-[#262626] mt-1 mb-2">
                    <Link to={`/tour-packages/${pkg.slug}`} className="hover:text-[#650018]">
                      {pkg.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-[#6B7280] line-clamp-2">{pkg.overview}</p>
                </div>
                <div className="pt-3 border-t border-[#E8E1DA] flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#650018]">Quote on Request</span>
                  <Link
                    to={`/tour-packages/${pkg.slug}`}
                    className="text-xs text-[#650018] font-semibold hover:underline flex items-center gap-1"
                  >
                    View <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 9. Bottom CTA */}
      <section className="p-8 bg-[#650018] text-white rounded-xl text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold">Have Questions About This Itinerary?</h2>
        <p className="text-xs sm:text-sm text-white/80 max-w-xl mx-auto">
          Every aspect of this package can be adjusted: add days, modify hotels, or include private monument permits.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => onOpenEnquiry(tour.title)}
            className="px-5 py-2.5 bg-[#C6A15B] hover:bg-[#A3803C] text-[#262626] font-semibold text-xs rounded transition-colors"
          >
            Request Customization
          </button>
          <a
            href={whatsAppQuoteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded flex items-center gap-1.5"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
          <a
            href="tel:+918126716179"
            className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5 text-[#DFCA95]" />
            <span>Call 8126716179</span>
          </a>
        </div>
      </section>

      {/* FULL-SCREEN IMAGE LIGHTBOX MODAL */}
      <ImageLightboxModal
        isOpen={lightboxOpen}
        images={allMediaImages}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />
    </div>
  );
};
