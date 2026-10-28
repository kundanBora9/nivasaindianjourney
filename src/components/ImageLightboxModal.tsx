import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Camera, MapPin, ZoomIn } from 'lucide-react';

export interface LightboxImage {
  url: string;
  title: string;
  subtitle?: string;
  day?: number;
}

interface ImageLightboxModalProps {
  isOpen: boolean;
  images: LightboxImage[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export const ImageLightboxModal: React.FC<ImageLightboxModalProps> = ({
  isOpen,
  images,
  currentIndex,
  onClose,
  onNavigate
}) => {
  const total = images.length;
  const current = images[currentIndex] || images[0];

  const handlePrev = useCallback(() => {
    if (total === 0) return;
    const nextIdx = (currentIndex - 1 + total) % total;
    onNavigate(nextIdx);
  }, [currentIndex, total, onNavigate]);

  const handleNext = useCallback(() => {
    if (total === 0) return;
    const nextIdx = (currentIndex + 1) % total;
    onNavigate(nextIdx);
  }, [currentIndex, total, onNavigate]);

  // Handle keyboard events
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Prevent background scrolling while lightbox is active
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !current) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Full screen image viewer"
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between select-none animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* 1. TOP HEADER BAR */}
      <div
        className="w-full px-4 sm:px-8 py-4 flex items-center justify-between text-white border-b border-white/10 bg-black/40 backdrop-blur-sm z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <div className="bg-[#650018] text-[#DFCA95] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
            <Camera className="w-3.5 h-3.5" />
            <span>
              {currentIndex + 1} / {total} Photos
            </span>
          </div>

          {current.day && (
            <span className="bg-[#C6A15B] text-[#262626] text-xs font-bold px-2.5 py-0.5 rounded-full shadow-xs">
              Day {current.day} Sightseeing
            </span>
          )}

          <div className="hidden sm:block text-xs text-white/80 max-w-md truncate">
            {current.title}
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="p-2 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all cursor-pointer border border-white/20 flex items-center gap-1.5 text-xs font-medium"
          title="Close (Esc)"
        >
          <span className="hidden sm:inline">Close</span>
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* 2. CENTER IMAGE STAGE */}
      <div
        className="relative flex-1 flex items-center justify-center p-3 sm:p-6 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Arrow */}
        {total > 1 && (
          <button
            onClick={handlePrev}
            className="absolute left-3 sm:left-6 z-20 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer hover:scale-105 shadow-xl"
            title="Previous Photo (Left Arrow)"
          >
            <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>
        )}

        {/* Full Image */}
        <div className="relative max-h-[72vh] max-w-[92vw] flex flex-col items-center justify-center">
          <img
            key={current.url}
            src={current.url}
            alt={current.title}
            className="max-h-[70vh] max-w-[90vw] object-contain rounded-lg shadow-2xl transition-all duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/taj_mahal_hero.jpg';
            }}
          />

          {/* Floating Caption on Mobile/Tablet */}
          <div className="mt-2 text-center max-w-xl px-4 py-1.5 bg-black/60 backdrop-blur-xs rounded-full border border-white/10 text-white text-xs sm:text-sm font-medium">
            <span className="text-[#DFCA95] font-semibold mr-1.5">
              {current.day ? `Day ${current.day}:` : 'Highlight:'}
            </span>
            <span className="text-white/95">{current.title}</span>
          </div>
        </div>

        {/* Right Arrow */}
        {total > 1 && (
          <button
            onClick={handleNext}
            className="absolute right-3 sm:right-6 z-20 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer hover:scale-105 shadow-xl"
            title="Next Photo (Right Arrow)"
          >
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>
        )}
      </div>

      {/* 3. BOTTOM THUMBNAILS CAROUSEL */}
      {total > 1 && (
        <div
          className="w-full px-4 sm:px-8 py-3 bg-black/60 backdrop-blur-md border-t border-white/10 z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="max-w-5xl mx-auto flex items-center justify-center gap-2 overflow-x-auto py-1 scrollbar-none">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => onNavigate(idx)}
                className={`shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-md overflow-hidden border-2 transition-all cursor-pointer relative group ${
                  currentIndex === idx
                    ? 'border-[#C6A15B] scale-105 shadow-md shadow-[#C6A15B]/30'
                    : 'border-white/20 opacity-50 hover:opacity-100 hover:border-white/60'
                }`}
                title={`View ${img.title}`}
              >
                <img
                  src={img.url}
                  alt=""
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/amber_fort_jaipur.jpg';
                  }}
                />
                {img.day && (
                  <span className="absolute bottom-0 inset-x-0 bg-black/70 text-[9px] text-white font-bold text-center leading-tight py-0.5">
                    D{img.day}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
