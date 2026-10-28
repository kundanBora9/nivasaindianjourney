import React from 'react';
import { useLocation } from 'react-router-dom';
import { Breadcrumb } from '../components/Breadcrumb';

export const PolicyPage: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;

  let title = 'Cancellation Policy';
  let content = null;

  if (path.includes('privacy')) {
    title = 'Privacy Policy';
    content = (
      <div className="space-y-4 text-xs sm:text-sm text-[#262626] leading-relaxed">
        <p>
          At <strong>Nivasa India Journey</strong>, we treat your personal privacy with the highest degree of respect. This Privacy Policy outlines what information we collect when you browse our website or make an itinerary enquiry.
        </p>

        <h3 className="font-serif text-base font-bold text-[#650018] pt-2">1. Information We Collect</h3>
        <p>
          When you submit an enquiry form or message us via WhatsApp, we collect only the information necessary to prepare your travel quote: your name, phone number, email address, preferred dates of travel, and passenger party details.
        </p>

        <h3 className="font-serif text-base font-bold text-[#650018] pt-2">2. How We Use Your Information</h3>
        <p>
          We use your information exclusively to:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-[#6B7280]">
          <li>Design and deliver custom travel itineraries and quotes.</li>
          <li>Coordinate hotel reservations, vehicle dispatch, and monument guide services.</li>
          <li>Provide on-tour 24/7 emergency customer care via our direct helpline at +91 8126716179.</li>
        </ul>

        <h3 className="font-serif text-base font-bold text-[#650018] pt-2">3. Zero Third-Party Data Selling</h3>
        <p>
          We strictly do not sell, rent, or trade your contact information to external marketing agencies or lead aggregators. Your information remains solely between you and Nivasa India Journey.
        </p>
      </div>
    );
  } else if (path.includes('terms')) {
    title = 'Terms & Conditions';
    content = (
      <div className="space-y-4 text-xs sm:text-sm text-[#262626] leading-relaxed">
        <p>
          Welcome to Nivasa India Journey. By requesting a tour booking, you agree to the following operational terms and conditions:
        </p>

        <h3 className="font-serif text-base font-bold text-[#650018] pt-2">1. Booking Confirmation & Payment</h3>
        <p>
          A tour reservation is officially confirmed upon receipt of a 20% advance booking deposit and issuance of our written confirmation voucher. The balance amount may be cleared upon arrival in India or during hotel check-in.
        </p>

        <h3 className="font-serif text-base font-bold text-[#650018] pt-2">2. Vehicle Standards & Driver Duties</h3>
        <p>
          All vehicles provided by Nivasa India Journey are commercially registered, air-conditioned, and insured. The driver is contracted to fulfill the agreed itinerary route safely. Chauffeurs observe regulated highway rest periods in compliance with safety standards.
        </p>

        <h3 className="font-serif text-base font-bold text-[#650018] pt-2">3. Monument Closures & Unforeseen Events</h3>
        <p>
          Please note monument closures (such as the Taj Mahal being closed every Friday). In cases of unexpected road blockages, extreme fog, or weather delays, our tour manager will work to rearrange sight visits seamlessly without disrupting core attractions.
        </p>
      </div>
    );
  } else {
    // Cancellation policy
    title = 'Cancellation & Refund Policy';
    content = (
      <div className="space-y-4 text-xs sm:text-sm text-[#262626] leading-relaxed">
        <p>
          We understand that international and domestic travel plans may change. Nivasa India Journey maintains a transparent, customer-friendly cancellation policy:
        </p>

        <div className="bg-[#FAF7F2] p-4 rounded-lg border border-[#E8E1DA] space-y-2 text-xs">
          <p><strong>• 15 or more days before tour start:</strong> Full 100% refund of advance deposit minus minimal bank transaction fees.</p>
          <p><strong>• 7 to 14 days before tour start:</strong> 20% administrative fee retained; remainder refunded or credited towards future travel within 12 months.</p>
          <p><strong>• Less than 7 days before tour start:</strong> Non-refundable deposit if hotels and safari permits have been committed; vehicle costs are waived.</p>
        </div>

        <h3 className="font-serif text-base font-bold text-[#650018] pt-2">Flight Delays & Rescheduling</h3>
        <p>
          If your airline reschedules or delays your arrival flight into Delhi or Jaipur, simply notify our 24/7 coordination team at <strong>+91 8126716179</strong>. We will adjust your chauffeur pickup time at no additional penalty.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-6 space-y-8">
      <Breadcrumb items={[{ label: title }]} />

      <section className="bg-white rounded-xl border border-[#E8E1DA] p-6 sm:p-10 space-y-6">
        <div className="border-b border-[#E8E1DA] pb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#C6A15B]">
            Nivasa India Journey
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#650018] mt-1">{title}</h1>
        </div>

        {content}

        <div className="pt-4 border-t border-[#E8E1DA] text-xs text-[#6B7280]">
          Last reviewed: October 2026. For questions regarding policies, call us at{' '}
          <a href="tel:+918126716179" className="text-[#650018] font-bold underline">
            +91 8126716179
          </a>
          .
        </div>
      </section>
    </div>
  );
};
