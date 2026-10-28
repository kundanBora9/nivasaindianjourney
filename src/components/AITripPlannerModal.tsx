import React, { useState } from 'react';
import { X, Sparkles, Compass, Check, ArrowRight, MessageCircle, Phone, Calendar } from 'lucide-react';
import { TOUR_PACKAGES } from '../data/packages';

interface AITripPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPackage: (slug: string) => void;
}

export const AITripPlannerModal: React.FC<AITripPlannerModalProps> = ({
  isOpen,
  onClose,
  onSelectPackage
}) => {
  const [days, setDays] = useState<number>(5);
  const [travelType, setTravelType] = useState<string>('Couple');
  const [interest, setInterest] = useState<string>('Heritage');
  const [pace, setPace] = useState<string>('Moderate');
  const [generatedPlan, setGeneratedPlan] = useState<any | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      // Intelligent matching against verified Nivasa packages
      let matchedPackage = TOUR_PACKAGES[0];
      let recommendationTitle = '';
      let recommendedRoute = '';
      let summaryText = '';

      if (days <= 3) {
        if (interest === 'Wildlife') {
          matchedPackage = TOUR_PACKAGES.find(p => p.slug === 'ranthambore-tour-packages') || TOUR_PACKAGES[3];
          recommendationTitle = '3-Day Ranthambore Tiger Safari & Wildlife Expedition';
          recommendedRoute = 'Jaipur / Sawai Madhopur → Ranthambore Tiger Reserve (2 Safaris)';
          summaryText = 'Ideal compact adventure with 2 dedicated morning & evening open-top jungle safaris in prime tiger zones.';
        } else if (interest === 'Agra') {
          matchedPackage = TOUR_PACKAGES.find(p => p.slug === 'same-day-agra-tour-from-delhi') || TOUR_PACKAGES[4];
          recommendationTitle = 'Agra Taj Mahal Sunrise & Mughal Heritage';
          recommendedRoute = 'Delhi → Yamuna Expressway → Taj Mahal → Agra Fort → Mehtab Bagh';
          summaryText = 'Witness the magical dawn illumination of the Taj Mahal with zero hotel check-in stress.';
        } else {
          matchedPackage = TOUR_PACKAGES.find(p => p.slug === 'jaipur-tour-packages') || TOUR_PACKAGES[2];
          recommendationTitle = '3-Day Jaipur Regal Weekend & Forts Circuit';
          recommendedRoute = 'Jaipur (2 Nights) — Amer Fort, Hawa Mahal, City Palace & Bazaars';
          summaryText = 'Immerse yourself in Rajasthan’s terracotta capital with private hilltop fort exploration and craft markets.';
        }
      } else if (days <= 6) {
        if (interest === 'Desert') {
          matchedPackage = TOUR_PACKAGES.find(p => p.slug === 'jaisalmer-tour-packages') || TOUR_PACKAGES[1];
          recommendationTitle = '4-Day Jaisalmer Fort & Royal Thar Desert Safari';
          recommendedRoute = 'Jaisalmer (2N) → Sam Sand Dunes Luxury Swiss Tent (1N)';
          summaryText = 'Living golden fortresses, camel sunset caravans, and Rajasthani cultural folk dance under the stars.';
        } else {
          matchedPackage = TOUR_PACKAGES.find(p => p.slug === 'golden-triangle-tour') || TOUR_PACKAGES[4];
          recommendationTitle = '5-Day Classic Golden Triangle (Delhi · Agra · Jaipur)';
          recommendedRoute = 'Delhi (1N) → Agra (1N) → Fatehpur Sikri → Jaipur (2N)';
          summaryText = 'India’s most iconic heritage circuit: Mughal monuments, Taj Mahal at sunrise, and Jaipur’s royal palaces.';
        }
      } else {
        if (interest === 'Romantic' || interest === 'Lakes') {
          matchedPackage = TOUR_PACKAGES.find(p => p.slug === 'golden-triangle-tour-with-udaipur') || TOUR_PACKAGES[5];
          recommendationTitle = '7-Day Golden Triangle with Romantic Udaipur Lake Extension';
          recommendedRoute = 'Delhi (1N) → Agra (1N) → Jaipur (2N) → Chittorgarh → Udaipur (2N)';
          summaryText = 'The ultimate balance of grand monuments and poetic lakeside relaxation on Lake Pichola.';
        } else if (interest === 'Spiritual') {
          matchedPackage = TOUR_PACKAGES.find(p => p.slug === 'golden-triangle-tour-with-varanasi') || TOUR_PACKAGES[6];
          recommendationTitle = '8-Day Golden Triangle with Sacred Varanasi Spiritual Journey';
          recommendedRoute = 'Delhi (1N) → Agra (1N) → Jaipur (2N) → Varanasi (3N)';
          summaryText = 'From royal palaces to the eternal spiritual ghats and evening Ganga Aarti in Varanasi.';
        } else {
          matchedPackage = TOUR_PACKAGES.find(p => p.slug === 'rajasthan-tour-packages') || TOUR_PACKAGES[0];
          recommendationTitle = '8-Day Royal Rajasthan Heritage & Palaces Tour';
          recommendedRoute = 'Jaipur (2N) → Pushkar → Jodhpur (2N) → Ranakpur → Udaipur (3N)';
          summaryText = 'The grand tour of royal Rajputana across Jaipur, Jodhpur, and Udaipur with private chauffeur.';
        }
      }

      setGeneratedPlan({
        package: matchedPackage,
        title: recommendationTitle,
        route: recommendedRoute,
        summary: summaryText,
        estimatedPrice: matchedPackage.startingPrice,
        highlights: matchedPackage.highlights.slice(0, 4)
      });
      setIsGenerating(false);
    }, 450);
  };

  const getWhatsAppAIPlanUrl = () => {
    if (!generatedPlan) return 'https://wa.me/918126716179';
    const text = `Hello Nivasa India Journey! I used your AI Itinerary Planner:
• Duration: ${days} Days
• Companions: ${travelType}
• Main Interest: ${interest}
• Recommended Plan: ${generatedPlan.title}
• Route: ${generatedPlan.route}
Please share custom availability and quotation. My phone is:`;
    return `https://wa.me/918126716179?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-[#E8E1DA] overflow-hidden max-h-[94vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-[#650018] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#DFCA95]" />
            <div>
              <h2 className="font-serif text-lg font-bold">Nivasa Heritage Itinerary Planner</h2>
              <p className="text-xs text-[#DFCA95]">AI-Assisted Custom Route & Package Recommendation</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white p-1 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {!generatedPlan ? (
            <div className="space-y-5">
              <p className="text-xs text-[#6B7280]">
                Tell us your travel duration and preferences to instantly recommend the ideal verified route and itinerary.
              </p>

              {/* Step 1: Duration */}
              <div>
                <label className="block text-xs font-semibold text-[#262626] uppercase tracking-wider mb-2">
                  1. How many days are you planning? ({days} Days)
                </label>
                <div className="flex items-center gap-2 flex-wrap">
                  {[1, 3, 4, 5, 6, 7, 8, 10].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDays(d)}
                      className={`px-3 py-1.5 rounded text-xs font-medium border transition-colors cursor-pointer ${
                        days === d
                          ? 'bg-[#650018] text-white border-[#650018]'
                          : 'bg-[#FAF7F2] text-[#262626] border-[#E8E1DA] hover:border-[#650018]'
                      }`}
                    >
                      {d === 1 ? 'Same Day (1D)' : `${d} Days`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Companions */}
              <div>
                <label className="block text-xs font-semibold text-[#262626] uppercase tracking-wider mb-2">
                  2. Who is traveling with you?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'Couple', label: 'Couple / Honeymoon' },
                    { id: 'Family', label: 'Family with Kids' },
                    { id: 'Friends', label: 'Friends / Group' },
                    { id: 'Solo', label: 'Solo Traveler' }
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTravelType(t.id)}
                      className={`p-2.5 rounded text-xs text-center border font-medium transition-colors cursor-pointer ${
                        travelType === t.id
                          ? 'bg-[#FAF7F2] text-[#650018] border-[#650018] font-bold'
                          : 'border-[#E8E1DA] text-[#6B7280] hover:border-[#650018]'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Primary Travel Interest */}
              <div>
                <label className="block text-xs font-semibold text-[#262626] uppercase tracking-wider mb-2">
                  3. What experiences are most important?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'Heritage', label: 'Forts & Royal Palaces' },
                    { id: 'Romantic', label: 'Lakes & Venetian Haveli' },
                    { id: 'Desert', label: 'Thar Desert & Camel Dunes' },
                    { id: 'Agra', label: 'Taj Mahal Sunrise' },
                    { id: 'Wildlife', label: 'Ranthambore Tiger Safari' },
                    { id: 'Spiritual', label: 'Spiritual Varanasi / Temples' }
                  ].map((i) => (
                    <button
                      key={i.id}
                      type="button"
                      onClick={() => setInterest(i.id)}
                      className={`p-2 rounded text-xs border transition-colors text-left cursor-pointer ${
                        interest === i.id
                          ? 'bg-[#FAF7F2] text-[#650018] border-[#650018] font-semibold'
                          : 'border-[#E8E1DA] text-[#262626] hover:border-[#650018]'
                      }`}
                    >
                      {i.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 4: Pace */}
              <div>
                <label className="block text-xs font-semibold text-[#262626] uppercase tracking-wider mb-2">
                  4. Preferred Travel Rhythm
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'Relaxed', label: 'Relaxed (In-depth sightseeing, leisure evenings)' },
                    { id: 'Comprehensive', label: 'Comprehensive (Cover all headline monuments)' }
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPace(p.id)}
                      className={`p-2 rounded text-xs border text-left cursor-pointer ${
                        pace === p.id
                          ? 'bg-[#FAF7F2] text-[#650018] border-[#650018] font-semibold'
                          : 'border-[#E8E1DA] text-[#262626]'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full py-3 px-4 bg-[#650018] hover:bg-[#4d0012] text-white font-medium rounded-md shadow-sm transition-colors text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#DFCA95]" />
                  <span>{isGenerating ? 'Analyzing Route & Heritage Options...' : 'Generate Personalized Itinerary'}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="border border-[#E8E1DA] rounded-lg p-5 bg-[#FAF7F2]">
                <div className="flex items-center justify-between text-xs text-[#6B7280] mb-1">
                  <span>Custom Recommendation for {days} Days</span>
                  <span className="font-semibold text-[#650018]">Private Quote on Request</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#650018] mb-2">{generatedPlan.title}</h3>
                <p className="text-xs font-medium text-[#262626] bg-white p-2 rounded border border-[#E8E1DA] mb-3">
                  📍 <strong>Suggested Route:</strong> {generatedPlan.route}
                </p>
                <p className="text-xs text-[#262626] leading-relaxed mb-4">{generatedPlan.summary}</p>

                <div className="space-y-1.5 pt-2 border-t border-[#E8E1DA]">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280]">Key Highlights:</p>
                  {generatedPlan.highlights.map((h: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#262626]">
                      <Check className="w-3.5 h-3.5 text-[#C6A15B] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => {
                    onSelectPackage(generatedPlan.package.slug);
                    onClose();
                  }}
                  className="flex-1 py-2.5 px-4 bg-[#650018] hover:bg-[#4d0012] text-white text-xs font-medium rounded-md flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>View Full Verified Itinerary</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href={getWhatsAppAIPlanUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-md shadow-sm transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Get WhatsApp Quote (8126716179)</span>
                </a>
              </div>

              <div className="text-center pt-1">
                <button
                  onClick={() => setGeneratedPlan(null)}
                  className="text-xs text-[#6B7280] hover:text-[#650018] underline cursor-pointer"
                >
                  Adjust Preferences / Plan Again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
