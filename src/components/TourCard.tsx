import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, Check, ArrowRight, Sparkles, Shield, Car, Hotel, Utensils, Compass, Camera, ZoomIn } from 'lucide-react';
import { TourPackage } from '../data/types';
import { ImageLightboxModal, LightboxImage } from './ImageLightboxModal';

interface TourCardProps {
  tour: TourPackage;
  onEnquire: (tourTitle: string) => void;
}

export const TourCard: React.FC<TourCardProps> = ({ tour, onEnquire }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Collect available images for preview (featured + itinerary days)
  const previewImages = React.useMemo(() => {
    const list = [tour.featuredImage];
    if (tour.itinerary) {
      tour.itinerary.forEach(d => {
        if (d.image && !list.includes(d.image)) {
          list.push(d.image);
        }
      });
    }
    if (tour.galleryImages) {
      tour.galleryImages.forEach(img => {
        if (!list.includes(img)) list.push(img);
      });
    }
    return list.slice(0, 5);
  }, [tour]);

  // Route breakdown if destination contains separators
  const routeStops = React.useMemo(() => {
    if (tour.destination.includes('·')) {
      return tour.destination.split('·').map(s => s.trim());
    }
    if (tour.destination.includes('->') || tour.destination.includes('→')) {
      return tour.destination.split(/->|→/).map(s => s.trim());
    }
    return [tour.destination];
  }, [tour.destination]);

  // Extract key day monument highlights
  const monumentPreviews = React.useMemo(() => {
    if (!tour.itinerary || tour.itinerary.length === 0) return [];
    return tour.itinerary
      .filter(day => !!day.image)
      .slice(0, 4)
      .map(day => ({
        day: day.day,
        title: day.title.split('—')[0].replace('Arrival in ', '').trim(),
        image: day.image!
      }));
  }, [tour.itinerary]);

  const lightboxImages: LightboxImage[] = React.useMemo(() => {
    return previewImages.map((img, idx) => ({
      url: img,
      title: idx === 0 ? tour.title : (monumentPreviews[idx - 1]?.title || `${tour.title} - View ${idx + 1}`),
      subtitle: tour.duration,
      day: monumentPreviews[idx - 1]?.day
    }));
  }, [previewImages, tour, monumentPreviews]);

  return (
    <article className="flex flex-col bg-white rounded-xl border border-[#E8E1DA] overflow-hidden hover:border-[#C6A15B] hover:shadow-lg transition-all duration-300 group">
      {/* Visual Media Header (MakeMyTrip Style) with Click to Full Screen Popup */}
      <div
        className="relative h-56 sm:h-60 w-full bg-[#1A1A1A] overflow-hidden cursor-pointer"
        onClick={() => {
          setLightboxIndex(activeImageIndex);
          setLightboxOpen(true);
        }}
        title="Click to view full screen photo popup"
      >
        <img loading="lazy" decoding="async"
          src={previewImages[activeImageIndex] || tour.featuredImage}
          alt={tour.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (target.src !== '/images/taj_mahal_hero.jpg') {
              target.src = '/images/taj_mahal_hero.jpg';
            }
          }}
        />

        {/* Ambient Dark Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5">
            <span className="bg-[#650018] text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#DFCA95]" />
              {tour.offerTag || (tour.isFeatured ? 'Bestseller' : 'Top Rated')}
            </span>
            <span className="bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-1 rounded border border-white/20">
              Customizable
            </span>
          </div>

          {/* Photo Count Indicator (Clickable to open popup) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex(activeImageIndex);
              setLightboxOpen(true);
            }}
            className="bg-black/70 hover:bg-black/90 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-1 rounded border border-white/20 flex items-center gap-1 shadow-xs cursor-pointer transition-colors"
            title="Open photo popup"
          >
            <Camera className="w-3 h-3 text-[#DFCA95]" />
            <span>{previewImages.length} Photos</span>
          </button>
        </div>

        {/* Mini Thumbnail Switcher on Hover / Quick Glance */}
        {previewImages.length > 1 && (
          <div className="absolute bottom-11 right-3 z-10 flex items-center gap-1 bg-black/60 backdrop-blur-xs p-1 rounded-md border border-white/20">
            {previewImages.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImageIndex(idx);
                }}
                className={`w-5 h-5 rounded overflow-hidden border transition-all cursor-pointer ${
                  activeImageIndex === idx ? 'border-[#C6A15B] scale-110' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
                title={`Preview photo ${idx + 1}`}
              >
                <img loading="lazy" decoding="async" src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Bottom Metadata Overlay */}
        <div className="absolute bottom-3 left-3 right-3 text-white pointer-events-none">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-[#DFCA95] drop-shadow-sm flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              <span className="line-clamp-1">{tour.destination}</span>
            </span>
            <span className="bg-[#C6A15B] text-[#262626] font-bold text-[11px] px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {tour.duration}
            </span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* MMT-Style Route Timeline Strip */}
          {routeStops.length > 1 && (
            <div className="mb-2.5 pb-2.5 border-b border-[#E8E1DA]/80">
              <div className="text-[11px] font-medium text-[#6B7280] flex items-center gap-1 flex-wrap">
                <span className="font-semibold text-[#650018] uppercase tracking-wider text-[10px]">Route:</span>
                {routeStops.map((stop, idx) => (
                  <React.Fragment key={idx}>
                    <span className="text-[#262626] font-medium">{stop}</span>
                    {idx < routeStops.length - 1 && (
                      <span className="text-[#C6A15B] font-bold">→</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}

          {/* Title */}
          <h3 className="font-serif text-lg font-bold text-[#262626] group-hover:text-[#650018] transition-colors leading-snug line-clamp-2">
            <Link to={`/tour-packages/${tour.slug}`}>{tour.title}</Link>
          </h3>

          <p className="text-xs text-[#6B7280] line-clamp-2 leading-relaxed mt-2 mb-3">
            {tour.overview}
          </p>

          {/* MakeMyTrip-Style Inclusions Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 py-2 px-2.5 bg-[#FAF7F2] rounded-lg border border-[#E8E1DA] text-[11px] text-[#262626] mb-3">
            <div className="flex items-center gap-1.5" title="Handpicked verified boutique stays / havelis">
              <Hotel className="w-3.5 h-3.5 text-[#650018] shrink-0" />
              <span className="truncate">Stays</span>
            </div>
            <div className="flex items-center gap-1.5" title="Dedicated private air-conditioned vehicle">
              <Car className="w-3.5 h-3.5 text-[#650018] shrink-0" />
              <span className="truncate">AC Cab</span>
            </div>
            <div className="flex items-center gap-1.5" title="Daily breakfast and dining support">
              <Utensils className="w-3.5 h-3.5 text-[#650018] shrink-0" />
              <span className="truncate">Meals</span>
            </div>
            <div className="flex items-center gap-1.5" title="Govt. licensed monument guides">
              <Compass className="w-3.5 h-3.5 text-[#650018] shrink-0" />
              <span className="truncate">Guides</span>
            </div>
          </div>

          {/* Day-by-Day Monument Thumbnail Peek (Clickable to Lightbox) */}
          {monumentPreviews.length > 0 && (
            <div className="mb-3">
              <div className="flex items-center justify-between text-[11px] text-[#6B7280] mb-1.5">
                <span className="font-semibold text-[#262626]">Covered Attractions:</span>
                <span className="text-[10px] text-[#650018]">Day-wise preview</span>
              </div>
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {monumentPreviews.map((m, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxIndex(idx + 1);
                      setLightboxOpen(true);
                    }}
                    className="flex items-center gap-1.5 px-2 py-1 bg-white border border-[#E8E1DA] rounded-md shrink-0 shadow-2xs hover:border-[#650018] transition-colors cursor-pointer text-left"
                    title={`Click to view full screen Day ${m.day}: ${m.title}`}
                  >
                    <img loading="lazy" decoding="async"
                      src={m.image}
                      alt={m.title}
                      className="w-5 h-5 rounded object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/amber_fort_jaipur.jpg';
                      }}
                    />
                    <span className="text-[10px] font-medium text-[#262626] max-w-[90px] truncate">
                      D{m.day}: {m.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Key Highlights (top 2 for clean readability) */}
          <ul className="space-y-1 mb-2 text-xs text-[#262626]">
            {tour.highlights.slice(0, 2).map((highlight, index) => (
              <li key={index} className="flex items-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#C6A15B] shrink-0 mt-0.5" />
                <span className="line-clamp-1 text-[11.5px] text-[#4A4A4A]">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Card Footer: Strictly NO Numerical Price, MakeMyTrip CTA Flow */}
        <div className="pt-3 border-t border-[#E8E1DA] flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-[#6B7280] uppercase tracking-wider block font-semibold">
              Private Custom Tour
            </span>
            <div className="text-sm font-bold text-[#650018] flex items-center gap-1">
              <span>Quote on Request</span>
            </div>
            <span className="text-[10px] text-emerald-700 font-medium block">
              ✓ No hidden fees · Flexible dates
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onEnquire(tour.title)}
              className="text-xs px-3.5 py-2.5 bg-[#650018] hover:bg-[#4d0012] text-white rounded-md font-semibold transition-colors shadow-xs cursor-pointer flex items-center gap-1"
            >
              <span>Get Quote</span>
            </button>
            <Link
              to={`/tour-packages/${tour.slug}`}
              className="text-xs px-3 py-2.5 bg-[#FAF7F2] text-[#262626] border border-[#E8E1DA] hover:border-[#650018] hover:text-[#650018] rounded-md font-medium transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Details</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* FULL-SCREEN IMAGE LIGHTBOX MODAL */}
      <ImageLightboxModal
        isOpen={lightboxOpen}
        images={lightboxImages}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />
    </article>
  );
};
