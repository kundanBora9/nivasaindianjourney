import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Check, ArrowRight } from 'lucide-react';
import { RAJASTHAN_OFFERS, GOLDEN_TRIANGLE_OFFERS } from '../data/offers';
import { TourOffer } from '../data/types';
import { Breadcrumb } from '../components/Breadcrumb';

interface OffersHubPageProps {
  onOpenEnquiry: (context: string) => void;
}

const OfferCardItem: React.FC<{
  offer: TourOffer;
  onOpenEnquiry: (context: string) => void;
}> = ({ offer, onOpenEnquiry }) => {
  return (
    <div className="bg-white rounded-xl border border-[#E8E1DA] overflow-hidden flex flex-col justify-between hover:border-[#650018] hover:shadow-md transition-all group">
      <div>
        {/* Top Visual Image */}
        <div className="relative h-44 w-full bg-[#1A1A1A] overflow-hidden">
          <img loading="lazy" decoding="async"
            src={offer.image || '/images/amber_fort_jaipur.jpg'}
            alt={offer.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/taj_mahal_hero.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

          {/* Top Badges */}
          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px]">
            <span className="bg-[#650018] text-white font-bold px-2 py-0.5 rounded shadow-xs uppercase tracking-wider">
              {offer.category === 'rajasthan' ? 'Rajasthan Deal' : 'Golden Triangle'}
            </span>
            <span className="bg-black/60 backdrop-blur-xs text-white px-2 py-0.5 rounded border border-white/20">
              {offer.duration}
            </span>
          </div>

          {/* Bottom Title on Image */}
          <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
            <span className="text-[11px] text-[#DFCA95] font-semibold block truncate">
              {offer.savings || 'Verified Heritage Inclusions'}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs text-[#6B7280]">
            <Clock className="w-3.5 h-3.5 text-[#C6A15B]" />
            <span>{offer.duration}</span>
            <span>·</span>
            <span className="text-emerald-700 font-medium">Seasonal Offer</span>
          </div>

          <h3 className="font-serif font-bold text-base text-[#262626] group-hover:text-[#650018] transition-colors leading-snug">
            <Link to={`/offers/${offer.slug}`}>{offer.title}</Link>
          </h3>

          <p className="text-xs text-[#6B7280] line-clamp-2 bg-[#FAF7F2] p-2 rounded border border-[#E8E1DA]">
            📍 {offer.route}
          </p>

          <div className="pt-1 space-y-1 text-xs text-[#262626]">
            {offer.highlights.slice(0, 2).map((h, i) => (
              <div key={i} className="flex items-start gap-1.5">
                <Check className="w-3 h-3 text-[#C6A15B] shrink-0 mt-0.5" />
                <span className="line-clamp-1 text-[#4A4A4A]">{h}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Card Footer: Strictly Quote on Request with Clear Links */}
      <div className="p-5 pt-3 border-t border-[#E8E1DA] flex items-center justify-between gap-2">
        <div>
          <span className="text-[10px] text-[#6B7280] block font-medium">Private Journey</span>
          <span className="font-serif font-bold text-[#650018] text-sm">
            Quote on Request
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onOpenEnquiry(offer.title)}
            className="px-3 py-1.5 bg-[#FAF7F2] text-[#650018] border border-[#E8E1DA] hover:border-[#650018] text-xs font-semibold rounded transition-colors cursor-pointer"
          >
            Get Quote
          </button>
          <Link
            to={`/offers/${offer.slug}`}
            className="px-3 py-1.5 bg-[#650018] hover:bg-[#4d0012] text-white text-xs font-semibold rounded transition-colors flex items-center gap-1 shadow-xs cursor-pointer"
          >
            <span>Details</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export const OffersHubPage: React.FC<OffersHubPageProps> = ({ onOpenEnquiry }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-12">
      <Breadcrumb items={[{ label: 'Tour Offers & Deals' }]} />

      <section className="bg-white rounded-xl border border-[#E8E1DA] p-6 sm:p-10 space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C6A15B]">
          <span>Verified Direct Operator Packages</span>
          <span aria-hidden="true">·</span>
          <span>Transparent Inclusions</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#650018]">
          Current Tour Offers & Heritage Holiday Deals
        </h1>
        <p className="text-xs sm:text-sm text-[#6B7280] max-w-3xl leading-relaxed">
          Take advantage of our curated seasonal itineraries for private chauffeured tours across Rajasthan and the Golden Triangle. All journeys include dedicated sanitized vehicles, verified heritage stays, and direct local support.
        </p>

        <div className="pt-2 flex flex-wrap gap-3">
          <Link
            to="/offers/rajasthan-tour-offers"
            className="px-4 py-2 bg-[#650018] text-white text-xs font-semibold rounded hover:bg-[#4d0012] transition-colors"
          >
            Rajasthan Tour Offers →
          </Link>
          <Link
            to="/offers/golden-triangle-tour-offers"
            className="px-4 py-2 bg-[#FAF7F2] text-[#650018] border border-[#C6A15B] text-xs font-semibold rounded hover:bg-white transition-colors"
          >
            Golden Triangle Offers →
          </Link>
        </div>
      </section>

      {/* Rajasthan Offers Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-[#E8E1DA] pb-3">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C6A15B]">Rajasthan Circuits</span>
            <h2 className="font-serif text-2xl font-bold text-[#262626]">Rajasthan Tour Offers</h2>
          </div>
          <Link
            to="/offers/rajasthan-tour-offers"
            className="text-xs text-[#650018] font-semibold hover:underline flex items-center gap-1"
          >
            <span>Explore All Rajasthan Offers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {RAJASTHAN_OFFERS.map(offer => (
            <OfferCardItem key={offer.id} offer={offer} onOpenEnquiry={onOpenEnquiry} />
          ))}
        </div>
      </section>

      {/* Golden Triangle Offers Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-[#E8E1DA] pb-3">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C6A15B]">Crown Circuit</span>
            <h2 className="font-serif text-2xl font-bold text-[#262626]">Golden Triangle Offers</h2>
          </div>
          <Link
            to="/offers/golden-triangle-tour-offers"
            className="text-xs text-[#650018] font-semibold hover:underline flex items-center gap-1"
          >
            <span>Explore All Golden Triangle Offers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {GOLDEN_TRIANGLE_OFFERS.map(offer => (
            <OfferCardItem key={offer.id} offer={offer} onOpenEnquiry={onOpenEnquiry} />
          ))}
        </div>
      </section>
    </div>
  );
};
