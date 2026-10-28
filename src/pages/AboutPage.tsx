import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Award, Users, HeartHandshake, Phone, MessageCircle } from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';

interface AboutPageProps {
  onOpenEnquiry: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenEnquiry }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-12">
      <Breadcrumb items={[{ label: 'About Us' }]} />

      {/* Hero */}
      <section className="bg-white rounded-xl border border-[#E8E1DA] p-6 sm:p-12 space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C6A15B]">
          <span>Heritage Travel Excellence</span>
          <span aria-hidden="true">·</span>
          <span>Nivasa India Journey</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#650018] max-w-3xl leading-tight">
          Crafting Meaningful Journeys Across the Heritage of India
        </h1>
        <p className="text-xs sm:text-base text-[#262626] leading-relaxed max-w-3xl font-light">
          Nivasa India Journey was founded with a singular purpose: to deliver deeply authentic, culturally rich, and completely comfortable private travel experiences throughout Rajasthan, the Golden Triangle, Agra, and North India.
        </p>
      </section>

      {/* Brand Values / Operating Pillars */}
      <section className="space-y-6">
        <div className="border-b border-[#E8E1DA] pb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#C6A15B]">Our Standards</span>
          <h2 className="font-serif text-2xl font-bold text-[#650018]">The Nivasa Quality Promise</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg border border-[#E8E1DA] space-y-3">
            <ShieldCheck className="w-6 h-6 text-[#C6A15B]" />
            <h3 className="font-serif text-lg font-bold text-[#262626]">Dedicated Private Chauffeurs</h3>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              We never pool guests or sub-contract your driving to unknown aggregators. You are assigned a dedicated commercial chauffeur with years of highway experience and flawless safety records.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-[#E8E1DA] space-y-3">
            <Award className="w-6 h-6 text-[#C6A15B]" />
            <h3 className="font-serif text-lg font-bold text-[#262626]">Zero Forced Shopping</h3>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              Many tour companies push travellers into high-commission tourist emporiums. At Nivasa, your itinerary focuses entirely on historical monuments, genuine master craftsmen, and your personal leisure.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-[#E8E1DA] space-y-3">
            <HeartHandshake className="w-6 h-6 text-[#C6A15B]" />
            <h3 className="font-serif text-lg font-bold text-[#262626]">Handpicked Verified Stays</h3>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              Every hotel and desert camp we partner with has been inspected in person. We evaluate hygiene, water pressure, architectural charm, dining standards, and warm Rajasthani hospitality.
            </p>
          </div>
        </div>
      </section>

      {/* Operational Transparency */}
      <section className="bg-[#FAF7F2] rounded-xl border border-[#E8E1DA] p-6 sm:p-10 space-y-6">
        <h2 className="font-serif text-2xl font-bold text-[#650018]">Direct Operator Support</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm text-[#262626] leading-relaxed">
          <p>
            When you plan a trip with Nivasa India Journey, you communicate directly with local travel professionals who live and breathe North India. We understand seasonal monsoon patterns, optimal sunrise entry times for the Taj Mahal, desert temperatures in Jaisalmer, and festival calendars across Pushkar and Jaipur.
          </p>
          <p>
            Whether you are an international traveler visiting India for the first time, a couple celebrating an anniversary, or a multi-generational family, our team manages every detail from doorstep airport pickup to final departure.
          </p>
        </div>

        <div className="pt-4 border-t border-[#E8E1DA] flex flex-wrap items-center gap-4 text-xs font-medium">
          <span>Phone / WhatsApp: <a href="tel:+918126716179" className="text-[#650018] font-bold underline">8126716179</a></span>
          <span>·</span>
          <span>Email: <a href="mailto:contact@nivasaindiajourney.com" className="hover:underline">contact@nivasaindiajourney.com</a></span>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center p-8 bg-white rounded-xl border border-[#E8E1DA] space-y-4">
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#262626]">
          Ready to Discuss Your India Itinerary?
        </h2>
        <p className="text-xs text-[#6B7280] max-w-md mx-auto">
          No obligation. Simply tell us where you wish to go and we’ll outline a realistic, comfortable route.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={onOpenEnquiry}
            className="px-5 py-2.5 bg-[#650018] text-white text-xs font-semibold rounded hover:bg-[#4d0012] cursor-pointer"
          >
            Plan Your Journey
          </button>
          <a
            href="tel:+918126716179"
            className="px-4 py-2.5 bg-[#FAF7F2] text-[#650018] border border-[#E8E1DA] text-xs font-semibold rounded"
          >
            Call 8126716179
          </a>
        </div>
      </section>
    </div>
  );
};
