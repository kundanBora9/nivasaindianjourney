import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Clock, ShieldCheck, CheckCircle } from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [destination, setDestination] = useState('Rajasthan / Golden Triangle');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 500);
  };

  const getWhatsAppDirectUrl = () => {
    const text = `Hello Nivasa India Journey, I would like to get in touch:
• Name: ${name || 'Traveller'}
• Phone: ${phone || 'Not specified'}
• Preferred Tour: ${destination}
• Message: ${message || 'Please send customized tour details.'}`;
    return `https://wa.me/918126716179?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-12">
      <Breadcrumb items={[{ label: 'Contact Us' }]} />

      {/* Header */}
      <section className="bg-white rounded-xl border border-[#E8E1DA] p-6 sm:p-10 space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C6A15B]">
          <span>Direct Tour Specialist Assistance</span>
          <span aria-hidden="true">·</span>
          <span>Fast Responses</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#650018]">
          Contact Nivasa India Journey
        </h1>
        <p className="text-xs sm:text-sm text-[#6B7280] max-w-2xl leading-relaxed">
          Whether you have a quick question about monument timings, want to book a private chauffeur, or need a completely custom multi-week itinerary, our team is at your service.
        </p>
      </section>

      {/* Contact Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Contact Info & Fast Buttons */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-xl border border-[#E8E1DA] p-6 space-y-5">
            <h2 className="font-serif text-lg font-bold text-[#262626]">Direct Contact Numbers</h2>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#650018] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#262626] block">Phone & Hotline:</strong>
                  <a href="tel:+918126716179" className="text-[#650018] font-bold text-base hover:underline">
                    +91 8126716179 / 8126716179
                  </a>
                  <p className="text-[11px] text-[#6B7280]">Available 24 hours for active travelers</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#262626] block">Official WhatsApp:</strong>
                  <a
                    href="https://wa.me/918126716179?text=Hello%20Nivasa%20India%20Journey,%20I%20would%20like%20to%20plan%20a%20tour."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 font-semibold hover:underline"
                  >
                    +91 8126716179 (Click to Chat)
                  </a>
                  <p className="text-[11px] text-[#6B7280]">Instant quote & itinerary pdf delivery</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#650018] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#262626] block">Email Correspondence:</strong>
                  <a href="mailto:contact@nivasaindiajourney.com" className="text-[#262626] hover:underline">
                    contact@nivasaindiajourney.com
                  </a>
                  <p className="text-[11px] text-[#6B7280]">Detailed proposals sent within 12 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#650018] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#262626] block">Consultation Hours:</strong>
                  <p className="text-[#6B7280]">Monday – Sunday: 8:00 AM to 10:00 PM IST</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#650018] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#262626] block">Operating Bases:</strong>
                  <p className="text-[#6B7280]">Central Hubs: New Delhi NCR & Jaipur (Rajasthan), India</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-[#FAF7F2] rounded-lg border border-[#E8E1DA] text-xs text-[#6B7280] space-y-1">
            <span className="font-semibold text-[#650018] block">Traveller Peace of Mind</span>
            <p>
              Your contact details are strictly confidential. We do not sell numbers or send marketing spam.
            </p>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-[#E8E1DA] p-6 sm:p-8">
          <h2 className="font-serif text-xl font-bold text-[#650018] mb-2">Send an Itinerary Enquiry</h2>
          <p className="text-xs text-[#6B7280] mb-6">
            Fill in your trip requirements below for an itemized pricing breakdown.
          </p>

          {isSubmitted ? (
            <div className="py-10 text-center space-y-4 bg-[#FAF7F2] rounded-lg border border-[#E8E1DA] p-6">
              <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="font-serif text-xl font-bold text-[#650018]">Enquiry Successfully Sent!</h3>
              <p className="text-xs text-[#262626] max-w-sm mx-auto leading-relaxed">
                Thank you, <strong>{name}</strong>. Our senior itinerary manager will review your request and contact you at <strong>{phone}</strong> shortly.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={getWhatsAppDirectUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-emerald-700 text-white text-xs font-semibold rounded hover:bg-emerald-800"
                >
                  Continue on WhatsApp (8126716179)
                </a>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-4 py-2 border border-[#E8E1DA] text-xs font-medium rounded hover:bg-white"
                >
                  Send Another Message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-[#262626] mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikramaditya Rathore"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-[#E8E1DA] rounded focus:border-[#650018] text-xs"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[#262626] mb-1">Phone / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 8126716179"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-[#E8E1DA] rounded focus:border-[#650018] text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-[#262626] mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-[#E8E1DA] rounded focus:border-[#650018] text-xs"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[#262626] mb-1">Tour of Interest</label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full px-3 py-2 border border-[#E8E1DA] rounded focus:border-[#650018] bg-white text-xs"
                  >
                    <option value="Rajasthan Tour Packages">Rajasthan Tour Packages</option>
                    <option value="Golden Triangle Tours">Golden Triangle Tours</option>
                    <option value="Agra & Taj Mahal Sunrise Tours">Agra & Taj Mahal Sunrise Tours</option>
                    <option value="Delhi City Tour">Delhi City Tour</option>
                    <option value="Same Day Express Tours">Same Day Express Tours</option>
                    <option value="Custom Private Itinerary">Custom Private Itinerary</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium text-[#262626] mb-1">Trip Details & Questions</label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your estimated travel dates, number of guests, preferred hotel style, or specific places you want to include..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E8E1DA] rounded focus:border-[#650018] text-xs"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 px-4 bg-[#650018] hover:bg-[#4d0012] text-white font-medium rounded text-xs uppercase tracking-wider cursor-pointer"
                >
                  {isSubmitting ? 'Sending Request...' : 'Submit Enquiry'}
                </button>
                <a
                  href={getWhatsAppDirectUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded text-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send on WhatsApp</span>
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
