import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Check, Phone, MessageCircle, ArrowRight, ChevronDown } from 'lucide-react';
import { RAJASTHAN_OFFERS } from '../data/offers';
import { Breadcrumb } from '../components/Breadcrumb';

interface RajasthanOffersPageProps {
  onOpenEnquiry: (packageName: string) => void;
}

export const RajasthanOffersPage: React.FC<RajasthanOffersPageProps> = ({ onOpenEnquiry }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How are tour packages customized for my travel party?',
      a: 'All private tours are customized based on your dates, number of guests, preferred vehicle (Sedan or Innova Crysta), and heritage hotel category. Simply share your preferences and our team prepares a personalized quote.'
    },
    {
      q: 'What makes these Rajasthan itineraries distinctive?',
      a: 'We operate our own dedicated private vehicle fleet and maintain direct relationships with verified heritage havelis, ensuring transparent service, unhurried sightseeing, and direct local support throughout your journey.'
    },
    {
      q: 'Can we modify dates or swap destinations?',
      a: 'Yes. Every itinerary can be modified. You can add extra days in Jaisalmer, include a Ranthambore tiger safari, or adjust travel dates with our team.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-12">
      <Breadcrumb
        items={[
          { label: 'Special Offers', href: '/offers' },
          { label: 'Rajasthan Tour Offers' }
        ]}
      />

      {/* Hero with Scenic Heritage Backdrop */}
      <section className="relative overflow-hidden text-white p-8 sm:p-12 rounded-2xl border-2 border-[#C6A15B] space-y-4 bg-black">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/amber_fort_jaipur.jpg"
            alt="Amber Fort Jaipur"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#650018]/95 via-[#650018]/85 to-black/70" />
        </div>

        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#DFCA95]">
            <span>Verified Seasonal Packages</span>
            <span aria-hidden="true">·</span>
            <span>★ 4.9/5 MMT Style Holiday Pick</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight max-w-3xl text-balance">
            Rajasthan Tour Packages & Verified Holiday Offers
          </h1>
          <p className="text-sm sm:text-base text-white/90 max-w-2xl font-light leading-relaxed">
            Explore the desert kingdom of Rajasthan with private air-conditioned transport, handpicked heritage havelis, and daily royal dining. Every itinerary is fully bespoke and backed by our on-ground team.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs">
            <span>Official Helpline: <a href="tel:+918126716179" className="text-[#DFCA95] font-bold hover:underline">8126716179</a></span>
            <span>·</span>
            <span>Dedicated AC Fleet</span>
            <span>·</span>
            <span>Quote on Request</span>
            <span>·</span>
            <span>Flexible Rescheduling</span>
          </div>
        </div>
      </section>

      {/* Offers Cards */}
      <section className="space-y-6">
        <div className="border-b border-[#E8E1DA] pb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#C6A15B]">Current Itineraries</span>
          <h2 className="font-serif text-2xl font-bold text-[#650018]">Featured Rajasthan Deals</h2>
        </div>

        <div className="space-y-6">
          {RAJASTHAN_OFFERS.map(offer => (
            <div
              key={offer.id}
              className="bg-white rounded-xl border border-[#E8E1DA] overflow-hidden hover:border-[#650018] hover:shadow-md transition-all shadow-xs"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                {/* Visual Thumbnail */}
                <div className="lg:col-span-4 relative min-h-[220px] bg-black group overflow-hidden">
                  <img loading="lazy" decoding="async"
                    src={offer.image || '/images/amber_fort_jaipur.jpg'}
                    alt={offer.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/taj_mahal_hero.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                  <div className="absolute top-3 left-3 bg-[#650018] text-white text-[11px] font-bold px-2.5 py-1 rounded shadow-xs uppercase tracking-wider">
                    {offer.duration}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white pointer-events-none">
                    <span className="text-[11px] text-[#DFCA95] font-semibold block">
                      {offer.savings || 'Heritage Inclusions'}
                    </span>
                  </div>
                </div>

                {/* Offer Content */}
                <div className="lg:col-span-5 p-5 sm:p-6 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                      <span className="font-semibold text-[#650018]">{offer.duration}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-emerald-700 font-medium">Seasonal Deal</span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-[#262626] hover:text-[#650018] transition-colors">
                      <Link to={`/offers/${offer.slug}`}>{offer.title}</Link>
                    </h3>

                    <p className="text-xs font-medium text-[#650018] bg-[#FAF7F2] p-2.5 rounded border border-[#E8E1DA]">
                      📍 <strong>Route:</strong> {offer.route}
                    </p>

                    <div className="space-y-1.5 pt-1">
                      <span className="text-xs font-semibold text-[#262626] block">Package Inclusions:</span>
                      <div className="grid grid-cols-1 gap-1.5 text-xs text-[#262626]">
                        {offer.highlights.slice(0, 3).map((h, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-[#C6A15B] shrink-0 mt-0.5" />
                            <span className="line-clamp-1 text-[#4A4A4A]">{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Link
                      to={`/offers/${offer.slug}`}
                      className="text-xs font-semibold text-[#650018] hover:underline inline-flex items-center gap-1"
                    >
                      <span>Read complete offer & route details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Right Action / Pricing Strip */}
                <div className="lg:col-span-3 bg-[#FAF7F2] p-6 border-t lg:border-t-0 lg:border-l border-[#E8E1DA] flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-xs text-[#6B7280] block">Private Journey</span>
                    <div className="font-serif text-xl sm:text-2xl font-bold text-[#650018]">
                      Quote on Request
                    </div>
                    <span className="text-xs text-emerald-700 font-medium mt-1 block">
                      Customized to your dates & party size
                    </span>
                  </div>

                  <div className="space-y-2">
                    <Link
                      to={`/offers/${offer.slug}`}
                      className="w-full py-2.5 px-4 bg-[#650018] hover:bg-[#4d0012] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-1 text-center shadow-xs cursor-pointer"
                    >
                      <span>View Offer Details</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>

                    <button
                      onClick={() => onOpenEnquiry(offer.title)}
                      className="w-full py-2 px-4 bg-white hover:bg-white/80 text-[#650018] border border-[#E8E1DA] hover:border-[#650018] text-xs font-semibold uppercase tracking-wider rounded transition-colors cursor-pointer text-center"
                    >
                      Get Quote
                    </button>

                    <a
                      href={`https://wa.me/918126716179?text=${encodeURIComponent(
                        `Hello Nivasa India Journey, I am interested in the Rajasthan Offer: "${offer.title}". Please share details and a personalized quote.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-4 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded flex items-center justify-center gap-1.5 transition-colors text-center"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp Quote</span>
                    </a>
                  </div>

                  <div className="text-[11px] text-[#6B7280] space-y-1 pt-2 border-t border-[#E8E1DA]">
                    {offer.terms.map((term, tIdx) => (
                      <p key={tIdx}>• {term}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Package Comparison Table */}
      <section className="bg-white rounded-xl border border-[#E8E1DA] p-6 sm:p-8 space-y-4 overflow-x-auto">
        <h2 className="font-serif text-xl font-bold text-[#650018]">Rajasthan Package Comparison</h2>
        <table className="w-full text-xs text-left">
          <thead className="bg-[#FAF7F2] text-[#262626] font-semibold border-b border-[#E8E1DA]">
            <tr>
              <th className="py-3 px-3">Itinerary</th>
              <th className="py-3 px-3">Duration</th>
              <th className="py-3 px-3">Primary Highlights</th>
              <th className="py-3 px-3">Pricing</th>
              <th className="py-3 px-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E8E1DA]">
            <tr>
              <td className="py-3 px-3 font-medium text-[#262626]">Royal Heritage & Palaces</td>
              <td className="py-3 px-3 text-[#6B7280]">8D / 7N</td>
              <td className="py-3 px-3 text-[#6B7280]">Jaipur, Jodhpur, Udaipur, Pushkar</td>
              <td className="py-3 px-3 font-medium text-[#650018]">Quote on Request</td>
              <td className="py-3 px-3">
                <button
                  onClick={() => onOpenEnquiry('Royal Heritage & Palaces 8D')}
                  className="text-xs text-[#650018] font-semibold hover:underline"
                >
                  Get Quote
                </button>
              </td>
            </tr>
            <tr>
              <td className="py-3 px-3 font-medium text-[#262626]">Jaisalmer Desert Dunes</td>
              <td className="py-3 px-3 text-[#6B7280]">4D / 3N</td>
              <td className="py-3 px-3 text-[#6B7280]">Living Fort, Swiss Tent, Sunset Dunes</td>
              <td className="py-3 px-3 font-medium text-[#650018]">Quote on Request</td>
              <td className="py-3 px-3">
                <button
                  onClick={() => onOpenEnquiry('Jaisalmer Desert Dunes 4D')}
                  className="text-xs text-[#650018] font-semibold hover:underline"
                >
                  Get Quote
                </button>
              </td>
            </tr>
            <tr>
              <td className="py-3 px-3 font-medium text-[#262626]">Family Forts & Tigers</td>
              <td className="py-3 px-3 text-[#6B7280]">6D / 5N</td>
              <td className="py-3 px-3 text-[#6B7280]">Jaipur Amer Fort + Ranthambore Safaris</td>
              <td className="py-3 px-3 font-medium text-[#650018]">Quote on Request</td>
              <td className="py-3 px-3">
                <button
                  onClick={() => onOpenEnquiry('Family Forts & Tigers 6D')}
                  className="text-xs text-[#650018] font-semibold hover:underline"
                >
                  Get Quote
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* FAQs */}
      <section className="bg-white rounded-xl border border-[#E8E1DA] p-6 sm:p-8 space-y-4">
        <h2 className="font-serif text-xl font-bold text-[#650018]">Offer FAQs</h2>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-[#E8E1DA] pb-3 last:border-0">
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full text-left font-serif font-bold text-sm text-[#262626] flex items-center justify-between cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-[#C6A15B] transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === index && (
                <p className="text-xs text-[#6B7280] mt-2 leading-relaxed">{faq.a}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
