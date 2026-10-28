import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import {
  Clock,
  MapPin,
  Check,
  Phone,
  MessageCircle,
  Car,
  Hotel,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Camera,
  Calendar,
  Gift,
  FileText,
  ChevronRight
} from 'lucide-react';
import { getOfferBySlug, ALL_OFFERS } from '../data/offers';
import { Breadcrumb } from '../components/Breadcrumb';
import { ImageLightboxModal, LightboxImage } from '../components/ImageLightboxModal';

interface OfferDetailPageProps {
  onOpenEnquiry: (context: string) => void;
}

export const OfferDetailPage: React.FC<OfferDetailPageProps> = ({ onOpenEnquiry }) => {
  const { slug: paramSlug } = useParams<{ slug: string }>();
  const location = useLocation();

  // Extract clean slug from path
  const slug =
    paramSlug ||
    location.pathname
      .replace('/offers/rajasthan-tour-offers/', '')
      .replace('/offers/golden-triangle-tour-offers/', '')
      .replace('/offers/', '')
      .replace(/^\//, '')
      .replace(/\/$/, '');

  const offer = getOfferBySlug(slug || '');

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    // <title> and meta tags are handled centrally by <RouteSEO /> (src/seo).
    window.scrollTo(0, 0);
  }, [offer]);

  const galleryList: LightboxImage[] = useMemo(() => {
    if (!offer) return [];
    const list: LightboxImage[] = [];
    if (offer.image) {
      list.push({ url: offer.image, title: offer.title, subtitle: offer.duration });
    }
    if (offer.galleryImages) {
      offer.galleryImages.forEach((img, idx) => {
        if (!list.some(x => x.url === img)) {
          list.push({ url: img, title: `${offer.title} - Highlight ${idx + 1}` });
        }
      });
    }
    return list;
  }, [offer]);

  if (!offer) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="font-serif text-2xl font-bold text-[#650018]">Holiday Offer Not Found</h1>
        <p className="text-xs text-[#6B7280]">
          The offer you are looking for may have expired or been updated with new seasonal itineraries.
        </p>
        <div className="pt-2 flex items-center justify-center gap-3">
          <Link
            to="/offers"
            className="px-4 py-2 bg-[#650018] text-white text-xs font-semibold rounded hover:bg-[#4d0012] transition-colors"
          >
            Browse All Offers
          </Link>
          <Link
            to="/tour-packages"
            className="px-4 py-2 bg-[#FAF7F2] border border-[#E8E1DA] text-[#650018] text-xs font-semibold rounded hover:border-[#650018] transition-colors"
          >
            View Tour Packages
          </Link>
        </div>
      </div>
    );
  }

  const categoryLabel =
    offer.category === 'rajasthan' ? 'Rajasthan Tour Offers' : 'Golden Triangle Offers';
  const categoryPath =
    offer.category === 'rajasthan'
      ? '/offers/rajasthan-tour-offers'
      : '/offers/golden-triangle-tour-offers';

  const routeStops = offer.route
    ? offer.route.split(/→|\+/).map(s => s.trim())
    : [offer.title];

  const whatsAppQuoteUrl = `https://wa.me/918126716179?text=${encodeURIComponent(
    `Hello Nivasa India Journey, I am interested in booking the Offer: "${offer.title}" (${offer.duration}). Please send details and personal quote.`
  )}`;

  const relatedOffers = ALL_OFFERS.filter(
    o => o.id !== offer.id && o.category === offer.category
  ).slice(0, 2);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-8">
      {/* 1. Breadcrumbs */}
      <Breadcrumb
        items={[
          { label: 'Special Offers', href: '/offers' },
          { label: categoryLabel, href: categoryPath },
          { label: offer.title }
        ]}
      />

      {/* 2. Top Visual Hero Showcase (Clickable to Full Screen Popup) */}
      <section className="bg-white rounded-2xl border border-[#E8E1DA] p-4 sm:p-6 shadow-sm space-y-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Main Visual with Click-to-Popup */}
          <div className="lg:col-span-7 relative h-72 sm:h-96 rounded-xl overflow-hidden bg-black group cursor-pointer border border-[#E8E1DA]">
            <img
              src={offer.image || '/images/amber_fort_jaipur.jpg'}
              alt={offer.title}
              onClick={() => {
                setLightboxIndex(0);
                setLightboxOpen(true);
              }}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

            {/* Top Badge */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
              <span className="bg-[#650018] text-[#DFCA95] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md shadow-sm flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Verified Direct Operator Offer</span>
              </span>

              {/* Fullscreen popup click badge */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(0);
                  setLightboxOpen(true);
                }}
                className="bg-black/70 hover:bg-black/90 backdrop-blur-md text-white text-xs px-3 py-1 rounded-md border border-white/20 flex items-center gap-1.5 transition-all shadow-md"
              >
                <Camera className="w-3.5 h-3.5 text-[#DFCA95]" />
                <span>Click for Fullscreen ({galleryList.length})</span>
              </button>
            </div>

            {/* Bottom Caption on Hero Image */}
            <div className="absolute bottom-4 left-4 right-4 text-white z-10 pointer-events-none">
              <span className="text-xs text-[#DFCA95] font-semibold uppercase tracking-wider block">
                {offer.duration} · {categoryLabel}
              </span>
              <p className="text-base sm:text-lg font-serif font-bold text-white drop-shadow-md truncate">
                {offer.title}
              </p>
              <span className="text-[11px] text-white/80 block mt-0.5">
                🔍 Click image to enlarge full screen in HD
              </span>
            </div>
          </div>

          {/* Offer Details & Value Proposition */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2 text-xs text-[#6B7280]">
              <span className="font-semibold text-[#650018]">{offer.duration}</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-700 font-medium">Verified Seasonal Rates</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#262626] leading-tight">
              {offer.title}
            </h1>

            {offer.overview && (
              <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed">
                {offer.overview}
              </p>
            )}

            {/* Exclusive Savings / Bonus Banner */}
            {offer.savings && (
              <div className="p-3 bg-[#FAF7F2] rounded-lg border border-[#C6A15B] text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-[#650018]">
                  <Gift className="w-4 h-4 text-[#C6A15B]" />
                  <span>Offer Special Inclusions:</span>
                </div>
                <p className="text-[#262626] font-medium pl-5">{offer.savings}</p>
              </div>
            )}

            {/* Validity */}
            <div className="flex items-center gap-2 text-xs text-[#6B7280] bg-[#FAF7F2] p-2.5 rounded border border-[#E8E1DA]">
              <Calendar className="w-4 h-4 text-[#650018] shrink-0" />
              <span>
                <strong>Validity:</strong> {offer.validity}
              </span>
            </div>

            {/* Price & Action Area */}
            <div className="p-4 bg-white rounded-xl border border-[#E8E1DA] shadow-xs space-y-3">
              <div>
                <span className="text-[11px] text-[#6B7280] block font-medium">Private Custom Package</span>
                <span className="font-serif text-2xl font-bold text-[#650018]">
                  Quote on Request
                </span>
                <span className="text-[11px] text-emerald-700 font-medium block mt-0.5">
                  ✓ Tailored to your party size, dates & vehicle choice
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => onOpenEnquiry(offer.title)}
                  className="w-full py-2.5 px-4 bg-[#650018] hover:bg-[#4d0012] text-white text-xs font-semibold rounded-md shadow-xs transition-colors cursor-pointer text-center"
                >
                  Get Offer Quote
                </button>
                <a
                  href={whatsAppQuoteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-md shadow-xs transition-colors flex items-center justify-center gap-1.5 text-center"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Quote</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Route Progression Bar */}
        <div className="pt-3 border-t border-[#E8E1DA] flex flex-wrap items-center gap-2 text-xs">
          <span className="font-bold text-[#650018] uppercase tracking-wider text-[11px]">
            Route Timeline:
          </span>
          {routeStops.map((stop, idx) => (
            <React.Fragment key={idx}>
              <span className="font-medium text-[#262626] bg-[#FAF7F2] px-2.5 py-1 rounded-md border border-[#E8E1DA]">
                {stop}
              </span>
              {idx < routeStops.length - 1 && (
                <span className="text-[#C6A15B] font-bold">→</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* 3. Link to Full Day-by-Day Sightseeing Tour Package */}
      {offer.relatedPackageSlug && (
        <section className="bg-gradient-to-r from-[#650018]/10 via-[#FAF7F2] to-[#FAF7F2] rounded-xl border border-[#C6A15B]/50 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#650018] uppercase tracking-wider flex items-center gap-1">
              <FileText className="w-3.5 h-3.5" />
              <span>Full Day-by-Day Sightseeing Itinerary Available</span>
            </span>
            <p className="text-xs sm:text-sm text-[#262626]">
              Explore day-wise timings, monument photos, and hotel descriptions for this exact circuit.
            </p>
          </div>

          <Link
            to={`/tour-packages/${offer.relatedPackageSlug}`}
            className="px-4 py-2.5 bg-[#650018] hover:bg-[#4d0012] text-white text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap shadow-xs"
          >
            <span>View Full Day-by-Day Itinerary</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </section>
      )}

      {/* 4. Inclusions & Key Highlights Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Inclusions */}
        <div className="bg-white rounded-xl border border-[#E8E1DA] p-6 space-y-4 shadow-xs">
          <div className="flex items-center gap-2 pb-2 border-b border-[#E8E1DA]">
            <Car className="w-5 h-5 text-[#650018]" />
            <h2 className="font-serif text-lg font-bold text-[#262626]">
              Package Inclusions
            </h2>
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-[#262626]">
            {offer.inclusions.map((inc, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#C6A15B] shrink-0 mt-0.5" />
                <span>{inc}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Highlights */}
        <div className="bg-white rounded-xl border border-[#E8E1DA] p-6 space-y-4 shadow-xs">
          <div className="flex items-center gap-2 pb-2 border-b border-[#E8E1DA]">
            <Hotel className="w-5 h-5 text-[#650018]" />
            <h2 className="font-serif text-lg font-bold text-[#262626]">
              Trip Highlights & Perks
            </h2>
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-[#262626]">
            {offer.highlights.map((high, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#C6A15B] shrink-0 mt-0.5" />
                <span>{high}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. Terms & Booking Policies */}
      <section className="bg-white rounded-xl border border-[#E8E1DA] p-6 space-y-3 shadow-xs">
        <h3 className="font-serif text-base font-bold text-[#262626] flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#650018]" />
          <span>Terms & Booking Notes</span>
        </h3>
        <ul className="space-y-2 text-xs text-[#6B7280]">
          {offer.terms.map((term, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-[#650018] font-bold">•</span>
              <span>{term}</span>
            </li>
          ))}
          <li className="flex items-start gap-2">
            <span className="text-[#650018] font-bold">•</span>
            <span>
              Vehicle fleet consists of sanitized, dedicated Sedan and Toyota Innova Crysta models with commercial tourism permits.
            </span>
          </li>
        </ul>
      </section>

      {/* 6. Other Related Offers */}
      {relatedOffers.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#E8E1DA] pb-2">
            <h3 className="font-serif text-xl font-bold text-[#262626]">
              More Verified Holiday Offers
            </h3>
            <Link
              to={categoryPath}
              className="text-xs text-[#650018] font-semibold hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedOffers.map(rel => (
              <Link
                key={rel.id}
                to={`/offers/${rel.slug}`}
                className="bg-white rounded-xl border border-[#E8E1DA] p-5 hover:border-[#650018] transition-all flex flex-col justify-between group shadow-xs"
              >
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-[#650018]">{rel.duration}</span>
                  <h4 className="font-serif font-bold text-base text-[#262626] group-hover:text-[#650018] transition-colors">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-[#6B7280] line-clamp-2">{rel.route}</p>
                </div>
                <div className="pt-3 border-t border-[#E8E1DA] mt-3 flex items-center justify-between text-xs">
                  <span className="text-[#650018] font-bold">Quote on Request</span>
                  <span className="text-[#650018] font-semibold group-hover:underline flex items-center gap-1">
                    <span>View Offer</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* FULL-SCREEN IMAGE LIGHTBOX MODAL */}
      <ImageLightboxModal
        isOpen={lightboxOpen}
        images={galleryList}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />
    </div>
  );
};
