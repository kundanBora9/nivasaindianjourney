import React from 'react';
import { Phone, MessageCircle, Calendar } from 'lucide-react';

interface MobileQuickBarProps {
  onOpenEnquiry: () => void;
}

export const MobileQuickBar: React.FC<MobileQuickBarProps> = ({ onOpenEnquiry }) => {
  return (
    <aside
      aria-label="Quick contact actions"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-[#E8E1DA] px-3 py-2 shadow-lg"
    >
      <div className="grid grid-cols-3 gap-2">
        {/* Call Now */}
        <a
          href="tel:+918126716179"
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded bg-[#FAF7F2] border border-[#E8E1DA] text-[#650018] active:scale-95 transition-transform"
          aria-label="Call Nivasa India Journey at 8126716179"
        >
          <Phone className="w-4 h-4 text-[#650018] mb-0.5" />
          <span className="text-[11px] font-semibold tracking-tight">Call 8126716179</span>
        </a>

        {/* WhatsApp */}
        <a
          href="https://wa.me/918126716179?text=Hello%20Nivasa%20India%20Journey,%20I%20would%20like%20to%20plan%20a%20tour."
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded bg-emerald-700 text-white active:scale-95 transition-transform shadow-sm"
          aria-label="Chat on WhatsApp with Nivasa India Journey"
        >
          <MessageCircle className="w-4 h-4 mb-0.5" />
          <span className="text-[11px] font-semibold tracking-tight">WhatsApp</span>
        </a>

        {/* Enquire / Plan */}
        <button
          onClick={onOpenEnquiry}
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded bg-[#650018] text-white active:scale-95 transition-transform shadow-sm"
        >
          <Calendar className="w-4 h-4 text-[#DFCA95] mb-0.5" />
          <span className="text-[11px] font-semibold tracking-tight">Plan Trip</span>
        </button>
      </div>
    </aside>
  );
};
