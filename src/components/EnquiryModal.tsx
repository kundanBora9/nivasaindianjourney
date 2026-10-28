import React, { useState, useEffect } from 'react';
import { X, Phone, MessageCircle, CheckCircle, ShieldCheck } from 'lucide-react';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPackage?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({ isOpen, onClose, initialPackage }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [destination, setDestination] = useState(initialPackage || 'Rajasthan Heritage Tour');
  const [travelDate, setTravelDate] = useState('');
  const [travellers, setTravellers] = useState('2 Travellers');
  const [hotelCategory, setHotelCategory] = useState('3-Star / Heritage Haveli');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (initialPackage) {
      setDestination(initialPackage);
    }
  }, [initialPackage]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim() || !phone.trim()) {
      setErrorMsg('Please enter your full name and contact phone number.');
      return;
    }

    setIsSubmitting(true);
    // Simulate reliable enquiry receipt
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const getWhatsAppPrefillUrl = () => {
    const text = `Hello Nivasa India Journey! I would like to request an itinerary quote:
• Name: ${fullName || 'Guest'}
• Phone: ${phone || 'Not provided'}
• Package/Destination: ${destination}
• Approximate Date: ${travelDate || 'Flexible'}
• Travellers: ${travellers}
• Preferred Stay: ${hotelCategory}
• Notes: ${message || 'Please send customized itinerary & best quote.'}`;
    return `https://wa.me/918126716179?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl border border-[#E8E1DA] overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#650018] text-white px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="font-serif text-lg font-bold">Request Your Custom Itinerary</h2>
            <p className="text-xs text-[#DFCA95]">Verified Heritage & Golden Triangle Specialists</p>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#650018]">Enquiry Received!</h3>
              <p className="text-sm text-[#262626] leading-relaxed">
                Thank you, <strong>{fullName}</strong>. Our travel specialist will prepare a customized quote for{' '}
                <strong>{destination}</strong> and contact you via Phone/WhatsApp within a few hours.
              </p>
              <div className="bg-[#FAF7F2] p-4 rounded-lg border border-[#E8E1DA] text-xs text-left space-y-2">
                <p>
                  <strong>Immediate Assistance?</strong>
                </p>
                <p>
                  Speak with our itinerary coordinator right now at{' '}
                  <a href="tel:+918126716179" className="font-bold text-[#650018] underline">
                    +91 8126716179
                  </a>
                  .
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={getWhatsAppPrefillUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-700 text-white text-xs font-semibold rounded-md shadow-sm hover:bg-emerald-800 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send on WhatsApp</span>
                </a>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="px-4 py-2.5 border border-[#E8E1DA] text-xs font-medium text-[#262626] rounded-md hover:bg-[#FAF7F2]"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {errorMsg && (
                <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 rounded text-xs">
                  {errorMsg}
                </div>
              )}

              {/* Package name indicator */}
              <div>
                <label className="block font-medium text-[#262626] mb-1">Tour Package / Destination</label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E8E1DA] rounded-md focus:border-[#650018] focus:ring-1 focus:ring-[#650018] bg-[#FAF7F2]/40"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-[#262626] mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Rahul Sharma or Emma Watson"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 border border-[#E8E1DA] rounded-md focus:border-[#650018] focus:ring-1 focus:ring-[#650018]"
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium text-[#262626] mb-1">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    placeholder="+91 9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-[#E8E1DA] rounded-md focus:border-[#650018] focus:ring-1 focus:ring-[#650018]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-[#262626] mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-[#E8E1DA] rounded-md focus:border-[#650018] focus:ring-1 focus:ring-[#650018]"
                  />
                </div>
                <div>
                  <label className="block font-medium text-[#262626] mb-1">Preferred Travel Date / Month</label>
                  <input
                    type="text"
                    placeholder="e.g. November 2026 or Next Week"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full px-3 py-2 border border-[#E8E1DA] rounded-md focus:border-[#650018] focus:ring-1 focus:ring-[#650018]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-[#262626] mb-1">Number of Travellers</label>
                  <select
                    value={travellers}
                    onChange={(e) => setTravellers(e.target.value)}
                    className="w-full px-3 py-2 border border-[#E8E1DA] rounded-md focus:border-[#650018] bg-white"
                  >
                    <option value="1 Solo Traveller">1 Solo Traveller</option>
                    <option value="2 Travellers (Couple / Friends)">2 Travellers (Couple / Friends)</option>
                    <option value="3-4 Travellers (Small Family)">3-4 Travellers (Small Family)</option>
                    <option value="5-8 Travellers (Large Family/Group)">5-8 Travellers (Large Group)</option>
                    <option value="8+ Group">8+ Group Tour</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-[#262626] mb-1">Hotel Category</label>
                  <select
                    value={hotelCategory}
                    onChange={(e) => setHotelCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-[#E8E1DA] rounded-md focus:border-[#650018] bg-white"
                  >
                    <option value="3-Star / Heritage Haveli">3-Star / Heritage Haveli</option>
                    <option value="4-Star Luxury Heritage">4-Star Luxury Heritage</option>
                    <option value="5-Star Royal Palace Experience">5-Star Royal Palace Experience</option>
                    <option value="Transport & Guide Only (No Hotels)">Transport & Guide Only</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium text-[#262626] mb-1">Special Preferences / Requests</label>
                <textarea
                  rows={3}
                  placeholder="e.g. Taj Mahal sunrise, specific dietary needs, pickup from Delhi airport..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E8E1DA] rounded-md focus:border-[#650018] focus:ring-1 focus:ring-[#650018]"
                />
              </div>

              <div className="p-3 bg-[#FAF7F2] rounded-md border border-[#E8E1DA] flex items-center justify-between text-[11px] text-[#6B7280]">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#C6A15B]" />
                  <span>No spam. 100% transparent quotes.</span>
                </div>
                <span>Call: 8126716179</span>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 px-4 bg-[#650018] hover:bg-[#4d0012] text-white font-medium rounded-md shadow-sm transition-colors text-xs uppercase tracking-wider cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending Request...' : 'Get Personalized Quote'}
                </button>
                <a
                  href={getWhatsAppPrefillUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-medium rounded-md text-xs cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Fast Quote</span>
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
