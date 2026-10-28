import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Phone, MessageCircle } from 'lucide-react';
import { ALL_FAQS } from '../data/faqs';
import { Breadcrumb } from '../components/Breadcrumb';

interface FaqPageProps {
  onOpenEnquiry: () => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onOpenEnquiry }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = selectedCategory === 'all'
    ? ALL_FAQS
    : ALL_FAQS.filter(f => f.category === selectedCategory);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-6 space-y-10">
      <Breadcrumb items={[{ label: 'Travel FAQs' }]} />

      <section className="bg-white rounded-xl border border-[#E8E1DA] p-6 sm:p-10 space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#C6A15B]">
          Answers to Common Questions
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#650018]">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
          Find accurate, up-to-date answers on booking procedures, vehicle standards, private chauffeurs, cancellation terms, and monument timings.
        </p>

        {/* Category filter tabs */}
        <div className="pt-4 border-t border-[#E8E1DA] flex flex-wrap gap-1.5 text-xs">
          {[
            { id: 'all', label: 'All FAQs' },
            { id: 'booking', label: 'Booking & Payment' },
            { id: 'transport', label: 'Private Vehicles' },
            { id: 'golden-triangle', label: 'Golden Triangle & Taj Mahal' },
            { id: 'rajasthan', label: 'Rajasthan Tours' },
            { id: 'cancellation', label: 'Cancellation Terms' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors cursor-pointer ${
                selectedCategory === tab.id
                  ? 'bg-[#650018] text-white shadow-xs'
                  : 'bg-[#FAF7F2] text-[#6B7280] hover:text-[#262626] border border-[#E8E1DA]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Accordion */}
      <section className="space-y-3">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="bg-white rounded-lg border border-[#E8E1DA] overflow-hidden">
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full text-left p-5 flex items-start justify-between gap-4 font-serif font-semibold text-sm sm:text-base text-[#262626] hover:text-[#650018] cursor-pointer"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#C6A15B] shrink-0 mt-1 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-[#6B7280] leading-relaxed border-t border-[#FAF7F2] pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </section>

      {/* Still Have Questions Box */}
      <section className="p-6 bg-[#FAF7F2] rounded-xl border border-[#E8E1DA] text-center space-y-4">
        <h2 className="font-serif text-lg font-bold text-[#650018]">Still Have a Question?</h2>
        <p className="text-xs text-[#6B7280] max-w-md mx-auto">
          Our travel specialists are happy to advise you directly by phone or WhatsApp without any obligation.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
          <a
            href="tel:+918126716179"
            className="px-4 py-2 bg-[#650018] text-white text-xs font-semibold rounded flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5 text-[#DFCA95]" />
            <span>Call +91 8126716179</span>
          </a>
          <a
            href="https://wa.me/918126716179?text=Hello%20Nivasa%20India%20Journey,%20I%20have%20a%20question."
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-emerald-700 text-white text-xs font-semibold rounded flex items-center gap-1.5"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Ask on WhatsApp</span>
          </a>
          <button
            onClick={onOpenEnquiry}
            className="px-4 py-2 bg-white text-[#262626] border border-[#E8E1DA] text-xs font-semibold rounded hover:bg-[#FAF7F2]"
          >
            Send Inquiry Form
          </button>
        </div>
      </section>
    </div>
  );
};
