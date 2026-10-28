import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Sun, Clock, Check, ArrowRight, Phone, MessageCircle } from 'lucide-react';
import { DESTINATIONS, getDestinationBySlug } from '../data/destinations';
import { TOUR_PACKAGES } from '../data/packages';
import { TourCard } from '../components/TourCard';
import { Breadcrumb } from '../components/Breadcrumb';

interface DestinationsPageProps {
  onOpenEnquiry: (context: string) => void;
}

export const DestinationsPage: React.FC<DestinationsPageProps> = ({ onOpenEnquiry }) => {
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // If specific destination slug is provided
  if (slug) {
    const destination = getDestinationBySlug(slug);

    if (!destination) {
      return (
        <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
          <h1 className="font-serif text-2xl font-bold text-[#650018]">Destination Not Found</h1>
          <p className="text-xs text-[#6B7280]">We could not find the destination guide you requested.</p>
          <Link to="/destinations" className="text-xs font-semibold text-[#650018] underline">
            View All Destinations
          </Link>
        </div>
      );
    }

    // Matching packages that include this destination in their destination string
    const matchingPackages = TOUR_PACKAGES.filter(
      p => p.destination.toLowerCase().includes(destination.name.toLowerCase())
    );

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-10">
        <Breadcrumb
          items={[
            { label: 'Destinations', href: '/destinations' },
            { label: `${destination.name}, ${destination.state}` }
          ]}
        />

        {/* Destination Header */}
        <div className="bg-white rounded-xl border border-[#E8E1DA] p-6 sm:p-10 space-y-6">
          <div className="flex items-center gap-2 text-xs text-[#6B7280]">
            <span className="font-semibold text-[#650018]">{destination.state}</span>
            <span aria-hidden="true">·</span>
            <span>Recommended: {destination.recommendedDays}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#262626]">
            {destination.name} Travel Guide & Tour Packages
          </h1>

          <p className="text-sm text-[#262626] leading-relaxed max-w-3xl">
            {destination.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#E8E1DA] text-xs">
            <div className="flex items-start gap-2.5">
              <Sun className="w-4 h-4 text-[#C6A15B] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#262626] block">Best Time to Visit:</strong>
                <span className="text-[#6B7280]">{destination.bestTimeToVisit}</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-[#C6A15B] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#262626] block">Ideal Duration:</strong>
                <span className="text-[#6B7280]">{destination.recommendedDays}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Attractions */}
        <section className="bg-white rounded-xl border border-[#E8E1DA] p-6 sm:p-8 space-y-4">
          <h2 className="font-serif text-xl font-bold text-[#650018]">
            Must-Visit Monuments & Highlights in {destination.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {destination.keyAttractions.map((attraction, i) => (
              <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-[#262626] p-2 bg-[#FAF7F2] rounded border border-[#E8E1DA]">
                <Check className="w-3.5 h-3.5 text-[#C6A15B] shrink-0" />
                <span>{attraction}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Tour Packages Covering this Destination */}
        <section className="space-y-6">
          <div className="border-b border-[#E8E1DA] pb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C6A15B]">Verified Itineraries</span>
            <h2 className="font-serif text-2xl font-bold text-[#650018]">
              Tour Packages Covering {destination.name}
            </h2>
          </div>

          {matchingPackages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchingPackages.map(pkg => (
                <TourCard key={pkg.id} tour={pkg} onEnquire={onOpenEnquiry} />
              ))}
            </div>
          ) : (
            <div className="p-8 bg-white rounded-xl border border-[#E8E1DA] text-center space-y-3">
              <p className="text-xs text-[#6B7280]">
                We create bespoke custom private chauffeur itineraries for {destination.name}.
              </p>
              <button
                onClick={() => onOpenEnquiry(`${destination.name} Custom Tour`)}
                className="px-4 py-2 bg-[#650018] text-white text-xs font-semibold rounded"
              >
                Request Custom {destination.name} Quote
              </button>
            </div>
          )}
        </section>
      </div>
    );
  }

  // All Destinations Hub Listing
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-10">
      <Breadcrumb items={[{ label: 'Destinations' }]} />

      <section className="bg-white rounded-xl border border-[#E8E1DA] p-6 sm:p-10 space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#C6A15B]">
          Explore India With Local Experts
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#650018]">
          Destinations & Heritage Cities of India
        </h1>
        <p className="text-xs sm:text-sm text-[#6B7280] max-w-3xl leading-relaxed">
          From the pink sandstone facades of Jaipur and the romantic canals of Udaipur to the timeless marble of Agra and the bustling streets of Delhi. Discover our comprehensive destination guides and private tour options.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DESTINATIONS.map(dest => (
          <article
            key={dest.slug}
            className="bg-white rounded-xl border border-[#E8E1DA] p-6 hover:border-[#650018] transition-colors flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-[#6B7280]">
                <span>{dest.state}</span>
                <span className="font-medium text-[#650018]">{dest.recommendedDays}</span>
              </div>
              <h2 className="font-serif text-xl font-bold text-[#262626] group-hover:text-[#650018] transition-colors">
                <Link to={`/destinations/${dest.slug}`}>{dest.name}</Link>
              </h2>
              <p className="text-xs text-[#6B7280] line-clamp-3 leading-relaxed">
                {dest.description}
              </p>
              <div className="pt-2">
                <p className="text-[11px] font-semibold text-[#262626] mb-1.5">Top Attractions:</p>
                <div className="flex flex-wrap gap-1 text-[11px] text-[#6B7280]">
                  {dest.keyAttractions.slice(0, 3).map((a, i) => (
                    <span key={i} className="bg-[#FAF7F2] px-2 py-0.5 rounded border border-[#E8E1DA]">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8E1DA] mt-4 flex items-center justify-between">
              <Link
                to={`/destinations/${dest.slug}`}
                className="text-xs font-semibold text-[#650018] hover:underline flex items-center gap-1"
              >
                <span>View Destination Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={() => onOpenEnquiry(`${dest.name} Tour Plan`)}
                className="text-xs text-[#6B7280] hover:text-[#650018]"
              >
                Enquire
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
