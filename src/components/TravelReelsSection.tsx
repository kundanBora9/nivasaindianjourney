import React, { useEffect, useRef, useState } from 'react';
import { Play, Eye, Volume2, VolumeX, MessageCircle, ArrowRight, X, Sparkles } from 'lucide-react';

interface ReelItem {
  id: string;
  title: string;
  location: string;
  duration: string;
  views: string;
  image: string; // thumbnail / poster shown on the card and while the video loads
  video: string; // video file in public/videos/
  audioTrack: string;
  description: string;
  relatedPackageSlug: string;
}

const REELS_DATA: ReelItem[] = [
  {
    id: 'reel-1',
    title: 'First Dawn Light at the Taj Mahal',
    location: 'Agra, Uttar Pradesh',
    duration: '0:35',
    views: '48.2K',
    image: '/videos/reel_cover/tajmahal.jpg',
    video: '/videos/taj_mahal.mp4',
    audioTrack: 'Yamuna Morning Mist & Bells',
    description: 'Watching the Makrana white marble turn warm rose and apricot as first sunlight breaks over the Yamuna river. A private moment before gates open to crowds.',
    relatedPackageSlug: 'same-day-agra-tour-from-delhi'
  },
  {
    id: 'reel-2',
    title: 'Amer Fort Cobblestones & Sheesh Mahal',
    location: 'Jaipur, Rajasthan',
    duration: '0:42',
    views: '34.7K',
    image: '/videos/reel_cover/jaipurreel.jpg',
    video: '/videos/rajasthan_tour_package.mp4',
    audioTrack: 'Royal Nagada & Sitar',
    description: 'Ascending the ancient cobblestone ramparts overlooking Maota lake and stepping into the thousand convex mirrors of the Maharaja’s Hall of Mirrors.',
    relatedPackageSlug: 'jaipur-tour-packages'
  },
  {
    id: 'reel-3',
    title: 'Sunset Camel Caravan on Thar Dunes',
    location: 'Sam Sand Dunes, Jaisalmer',
    duration: '0:50',
    views: '52.1K',
    image: '/videos/reel_cover/Sam_Sand_Dunes.jpg',
    video: '/videos/delhi_tour.mp4',
    audioTrack: 'Kalbelia Desert Rhythm',
    description: 'Riding into the rippling golden sands as the desert sun melts into the horizon, followed by starlit Swiss camp folk songs and chai.',
    relatedPackageSlug: 'jaisalmer-tour-packages'
  },
  {
    id: 'reel-4',
    title: 'Royal Sunset Cruise on Lake Pichola',
    location: 'Udaipur, Rajasthan',
    duration: '0:38',
    views: '29.8K',
    image: '/videos/reel_cover/Udaipur.jpg',
    video: '/videos/delhi_tour.mp4',
    audioTrack: 'Gentle Lake Pichola Water Lapping',
    description: 'Drifting past the illuminated white arches of City Palace and Jag Mandir island with the rugged Aravalli hills silhouetted against twilight.',
    relatedPackageSlug: 'golden-triangle-tour-with-udaipur'
  },
  {
    id: 'reel-5',
    title: 'Old Delhi Rickshaw Spice Alleys',
    location: 'Chandni Chowk, Delhi',
    duration: '0:29',
    views: '41.3K',
    image: '/videos/reel_cover/chandnichowk.jpg',
    video: '/videos/delhi_tour.mp4',
    audioTrack: 'Old Delhi Street Vibes & Bells',
    description: 'Weaving through the sensory kaleidoscope of Khari Baoli spice market, historical silver havelis, and the colossal red walls of Jama Masjid.',
    relatedPackageSlug: 'delhi-tour-packages'
  },
  {
    id: 'reel-6',
    title: 'Grand Evening Ganga Aarti Ceremony',
    location: 'Dashashwamedh Ghat, Varanasi',
    duration: '0:46',
    views: '63.9K',
    image: '/videos/reel_cover/Dashashwamedh.jpg',
    video: '/videos/delhi_tour.mp4',
    audioTrack: 'Sacred Sanskrit Chants & Conch',
    description: 'Seven priests moving synchronized multi-tiered brass lamp pyres in honor of Holy Mother Ganga as thousands of earthen lamps float on the water.',
    relatedPackageSlug: 'golden-triangle-tour-with-varanasi'
  }
];

interface TravelReelsSectionProps {
  onOpenEnquiry: (context: string) => void;
}

export const TravelReelsSection: React.FC<TravelReelsSectionProps> = ({ onOpenEnquiry }) => {
  const [activeReel, setActiveReel] = useState<ReelItem | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const openReel = (reel: ReelItem) => {
    setActiveReel(reel);
    setIsPaused(false);
    setVideoFailed(false);
    setProgress(0);
    setIsMuted(false); // the click counts as a user gesture, so sound is allowed
  };

  const closeReel = () => {
    videoRef.current?.pause();
    setActiveReel(null);
  };

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  };

  // Close with the Escape key
  useEffect(() => {
    if (!activeReel) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeReel();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeReel]);

  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#E8E1DA] pb-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#C6A15B]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Short Visual Stories</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#650018]">
            Traveller Moments & Heritage Reels
          </h2>
        </div>
        <p className="text-xs text-[#6B7280]">
          Real perspectives captured across our private chauffeur journeys.
        </p>
      </div>

      {/* Reel Cards Horizontal Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {REELS_DATA.map((reel) => (
          <div
            key={reel.id}
            onClick={() => openReel(reel)}
            className="group relative h-72 sm:h-84 rounded-xl overflow-hidden cursor-pointer shadow-sm border border-[#E8E1DA] hover:border-[#650018] transition-all"
          >
            {/* Background Image */}
            <img loading="lazy" decoding="async"
              src={reel.image}
              alt={reel.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              onError={(e) => {
                // fallback to general hero
                (e.target as HTMLImageElement).src = '/images/taj_mahal_hero.jpg';
              }}
            />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/30 group-hover:from-black/90 transition-opacity" />

            {/* Top Reel Meta: View Count & Duration */}
            <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between text-white text-[11px] font-medium drop-shadow-sm">
              <span className="flex items-center gap-1 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-full">
                <Eye className="w-3 h-3 text-[#DFCA95]" />
                <span>{reel.views}</span>
              </span>
              <span className="bg-black/40 backdrop-blur-xs px-1.5 py-0.5 rounded text-[10px]">
                {reel.duration}
              </span>
            </div>

            {/* Center Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all">
              <div className="w-11 h-11 rounded-full bg-[#650018]/80 backdrop-blur-xs border border-[#DFCA95] flex items-center justify-center shadow-lg">
                <Play className="w-5 h-5 text-white ml-0.5 fill-white" />
              </div>
            </div>

            {/* Bottom Reel Caption */}
            <div className="absolute bottom-3 left-3 right-3 text-white space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#DFCA95] block drop-shadow-xs">
                {reel.location}
              </span>
              <h3 className="font-serif text-xs font-bold leading-snug line-clamp-2 drop-shadow-sm group-hover:text-[#DFCA95] transition-colors">
                {reel.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Reel Preview Modal */}
      {activeReel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="relative w-full max-w-sm sm:max-w-md bg-[#262626] text-white rounded-2xl overflow-hidden shadow-2xl border border-white/20 flex flex-col">
            {/* Modal Media Box */}
            <div className="relative h-96 sm:h-[440px] bg-black overflow-hidden">
              {!videoFailed ? (
                <video
                  key={activeReel.id}
                  ref={videoRef}
                  src={activeReel.video}
                  poster={activeReel.image}
                  className="w-full h-full object-cover cursor-pointer"
                  autoPlay
                  loop
                  playsInline
                  muted={isMuted}
                  preload="auto"
                  onClick={togglePlay}
                  onPlay={() => setIsPaused(false)}
                  onPause={() => setIsPaused(true)}
                  onTimeUpdate={(e) => {
                    const v = e.currentTarget;
                    setProgress(v.duration ? (v.currentTime / v.duration) * 100 : 0);
                  }}
                  onError={() => setVideoFailed(true)}
                  // If the browser refuses to autoplay with sound, retry muted instead of showing a frozen frame
                  onLoadedData={(e) => {
                    e.currentTarget.play().catch(() => {
                      setIsMuted(true);
                      e.currentTarget.muted = true;
                      e.currentTarget.play().catch(() => {});
                    });
                  }}
                />
              ) : (
                <img
                  src={activeReel.image}
                  alt={activeReel.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/taj_mahal_hero.jpg';
                  }}
                />
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40" />

              {/* Paused indicator (tap video to play / pause) */}
              {!videoFailed && isPaused && (
                <button
                  onClick={togglePlay}
                  aria-label="Play video"
                  className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-[#650018]/85 border border-[#DFCA95] flex items-center justify-center z-10"
                >
                  <Play className="w-7 h-7 text-white ml-1 fill-white" />
                </button>
              )}

              {/* Fallback notice when the video file is missing */}
              {videoFailed && (
                <span className="absolute top-16 left-4 z-10 text-[11px] bg-black/60 text-white/90 px-2.5 py-1 rounded-full">
                  Video coming soon
                </span>
              )}

              {/* Progress bar */}
              {!videoFailed && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-10">
                  <div className="h-full bg-[#DFCA95]" style={{ width: `${progress}%` }} />
                </div>
              )}

              {/* Top Controls */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                <span className="text-xs bg-[#650018] text-white px-2.5 py-1 rounded-full font-semibold border border-[#DFCA95]">
                  {activeReel.location}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-1.5 rounded-full bg-black/50 text-white hover:bg-black/80"
                    aria-label="Toggle Sound"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#DFCA95]" />}
                  </button>
                  <button
                    onClick={closeReel}
                    className="p-1.5 rounded-full bg-black/50 text-white hover:bg-black/80"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Bottom Caption & Audio */}
              <div className="pointer-events-none absolute bottom-5 left-4 right-4 space-y-2 z-10">
                <div className="flex items-center gap-2 text-xs text-[#DFCA95]">
                  <span>{activeReel.audioTrack}</span>
                  <span>·</span>
                  <span>{activeReel.views} views</span>
                </div>
                <h3 className="font-serif text-lg font-bold leading-tight">
                  {activeReel.title}
                </h3>
                <p className="text-xs text-white/90 leading-relaxed">
                  {activeReel.description}
                </p>
              </div>
            </div>

            {/* Modal Action Footer */}
            <div className="p-4 bg-[#1a1a1a] border-t border-white/10 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const ctx = `Experience Inquiry: ${activeReel.title} (${activeReel.location})`;
                    setActiveReel(null);
                    onOpenEnquiry(ctx);
                  }}
                  className="flex-1 py-2.5 px-4 bg-[#650018] hover:bg-[#4d0012] text-white text-xs font-semibold uppercase tracking-wider rounded-md text-center transition-colors cursor-pointer"
                >
                  Plan This Experience
                </button>

                <a
                  href={`https://wa.me/918126716179?text=${encodeURIComponent(
                    `Hello Nivasa India Journey, I watched your reel: "${activeReel.title}" (${activeReel.location}). Can you include this in my private itinerary?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-md flex items-center justify-center transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>

              <div className="text-center">
                <a
                  href="tel:+918126716179"
                  className="text-[11px] text-[#DFCA95] hover:underline"
                >
                  Direct Booking Support: +91 8126716179
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};