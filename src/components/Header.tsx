import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, MessageCircle, Menu, X, ChevronDown, Compass } from 'lucide-react';

interface HeaderProps {
  onOpenEnquiry: (packageContext?: string) => void;
  onOpenAIPlanner?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenEnquiry, onOpenAIPlanner }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [rajasthanDropdown, setRajasthanDropdown] = useState(false);
  const [goldenTriangleDropdown, setGoldenTriangleDropdown] = useState(false);
  const location = useLocation();

  const closeMenu = () => {
    setMobileMenuOpen(false);
    setRajasthanDropdown(false);
    setGoldenTriangleDropdown(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E8E1DA] transition-all">
      {/* Top Utility Bar */}
      <div className="bg-[#650018] text-white text-xs py-1.5 px-4 sm:px-8 border-b border-[#7e0c24]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-white/80">Private Tours & Bespoke Journeys Across India</span>
            <span className="inline-flex items-center gap-1.5 font-medium text-[#DFCA95]">
              <Phone className="w-3.5 h-3.5" />
              Direct Support: <a href="tel:+918126716179" className="hover:underline font-semibold tracking-wide text-white">8126716179</a>
            </span>
          </div>
          <div className="flex items-center gap-4 text-white/90">
            <a
              href="https://wa.me/918126716179?text=Hello%20Nivasa%20India%20Journey,%20I%20would%20like%20to%20plan%20a%20tour."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-[#DFCA95] transition-colors"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp Us</span>
            </a>
            <span className="hidden md:inline text-white/40">|</span>
            <button
              onClick={onOpenAIPlanner}
              className="hidden md:inline-flex items-center gap-1 text-white hover:text-[#DFCA95] transition-colors text-xs font-medium cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5 text-[#DFCA95]" />
              <span>AI Itinerary Planner</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Top Bar (Follows 3-zone Top Bar Contract) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark / Official Logo */}
        <Link to="/" onClick={closeMenu} className="flex items-center shrink-0" aria-label="Nivasa India Journey Home">
          <img
            src="/assets/aistudio/image_d6df1cf1.png"
            alt="Nivasa India Journey"
            className="h-14 sm:h-16 w-auto object-contain py-1"
          />
        </Link>

        {/* Zone 2: Navigation Links (Single-line, clean typography) */}
        <nav className="hidden lg:flex items-center gap-6 text-[14px] font-medium text-[#262626]">
          <Link
            to="/"
            className={`whitespace-nowrap transition-colors hover:text-[#650018] ${isActive('/') ? 'text-[#650018] font-semibold border-b-2 border-[#650018] pb-1' : ''}`}
          >
            Home
          </Link>

          {/* Rajasthan Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setRajasthanDropdown(true)}
            onMouseLeave={() => setRajasthanDropdown(false)}
          >
            <Link
              to="/rajasthan-tours"
              className={`inline-flex items-center gap-1 whitespace-nowrap transition-colors hover:text-[#650018] py-2 ${location.pathname.includes('rajasthan') ? 'text-[#650018] font-semibold' : ''}`}
            >
              <span>Rajasthan Tours</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </Link>

            {rajasthanDropdown && (
              <div className="absolute top-full left-0 w-64 bg-white shadow-xl rounded-lg border border-[#E8E1DA] py-2 z-50">
                <Link
                  to="/rajasthan-tours"
                  onClick={() => setRajasthanDropdown(false)}
                  className="block px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#650018] hover:bg-[#FAF7F2]"
                >
                  All Rajasthan Packages
                </Link>
                <div className="h-px bg-[#E8E1DA] my-1" />
                <Link
                  to="/tour-packages/rajasthan-tour-packages"
                  onClick={() => setRajasthanDropdown(false)}
                  className="block px-4 py-2 text-sm text-[#262626] hover:bg-[#FAF7F2] hover:text-[#650018]"
                >
                  Royal Heritage & Palaces (8D/7N)
                </Link>
                <Link
                  to="/tour-packages/jaisalmer-tour-packages"
                  onClick={() => setRajasthanDropdown(false)}
                  className="block px-4 py-2 text-sm text-[#262626] hover:bg-[#FAF7F2] hover:text-[#650018]"
                >
                  Jaisalmer Desert Dunes (4D/3N)
                </Link>
                <Link
                  to="/tour-packages/jaipur-tour-packages"
                  onClick={() => setRajasthanDropdown(false)}
                  className="block px-4 py-2 text-sm text-[#262626] hover:bg-[#FAF7F2] hover:text-[#650018]"
                >
                  Jaipur Pink City Weekend (3D/2N)
                </Link>
                <Link
                  to="/tour-packages/ranthambore-tour-packages"
                  onClick={() => setRajasthanDropdown(false)}
                  className="block px-4 py-2 text-sm text-[#262626] hover:bg-[#FAF7F2] hover:text-[#650018]"
                >
                  Ranthambore Tiger Safari (3D/2N)
                </Link>
                <Link
                  to="/offers/rajasthan-tour-offers"
                  onClick={() => setRajasthanDropdown(false)}
                  className="block px-4 py-2 text-xs text-[#C6A15B] font-semibold hover:bg-[#FAF7F2]"
                >
                  ★ Special Rajasthan Offers
                </Link>
              </div>
            )}
          </div>

          {/* Golden Triangle Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setGoldenTriangleDropdown(true)}
            onMouseLeave={() => setGoldenTriangleDropdown(false)}
          >
            <Link
              to="/golden-triangle-tour"
              className={`inline-flex items-center gap-1 whitespace-nowrap transition-colors hover:text-[#650018] py-2 ${location.pathname.includes('golden-triangle') ? 'text-[#650018] font-semibold' : ''}`}
            >
              <span>Golden Triangle</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </Link>

            {goldenTriangleDropdown && (
              <div className="absolute top-full left-0 w-64 bg-white shadow-xl rounded-lg border border-[#E8E1DA] py-2 z-50">
                <Link
                  to="/golden-triangle-tour"
                  onClick={() => setGoldenTriangleDropdown(false)}
                  className="block px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#650018] hover:bg-[#FAF7F2]"
                >
                  Golden Triangle Circuit
                </Link>
                <div className="h-px bg-[#E8E1DA] my-1" />
                <Link
                  to="/tour-packages/golden-triangle-tour"
                  onClick={() => setGoldenTriangleDropdown(false)}
                  className="block px-4 py-2 text-sm text-[#262626] hover:bg-[#FAF7F2] hover:text-[#650018]"
                >
                  Classic Circuit (5 Days / 4 Nights)
                </Link>
                <Link
                  to="/tour-packages/golden-triangle-tour-with-udaipur"
                  onClick={() => setGoldenTriangleDropdown(false)}
                  className="block px-4 py-2 text-sm text-[#262626] hover:bg-[#FAF7F2] hover:text-[#650018]"
                >
                  With Romantic Udaipur (7D/6N)
                </Link>
                <Link
                  to="/tour-packages/golden-triangle-tour-with-varanasi"
                  onClick={() => setGoldenTriangleDropdown(false)}
                  className="block px-4 py-2 text-sm text-[#262626] hover:bg-[#FAF7F2] hover:text-[#650018]"
                >
                  With Spiritual Varanasi (8D/7N)
                </Link>
                <Link
                  to="/offers/golden-triangle-tour-offers"
                  onClick={() => setGoldenTriangleDropdown(false)}
                  className="block px-4 py-2 text-xs text-[#C6A15B] font-semibold hover:bg-[#FAF7F2]"
                >
                  ★ Golden Triangle Offers
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/agra-tour-packages"
            className={`whitespace-nowrap transition-colors hover:text-[#650018] ${location.pathname.includes('agra') ? 'text-[#650018] font-semibold' : ''}`}
          >
            Agra & Taj Mahal
          </Link>

          <Link
            to="/same-day-tours"
            className={`whitespace-nowrap transition-colors hover:text-[#650018] ${location.pathname.includes('same-day') ? 'text-[#650018] font-semibold' : ''}`}
          >
            Same Day Tours
          </Link>

          <Link
            to="/destinations"
            className={`whitespace-nowrap transition-colors hover:text-[#650018] ${location.pathname.includes('destinations') ? 'text-[#650018] font-semibold' : ''}`}
          >
            Destinations
          </Link>

          <Link
            to="/offers"
            className={`whitespace-nowrap transition-colors hover:text-[#650018] ${location.pathname === '/offers' ? 'text-[#650018] font-semibold' : ''}`}
          >
            Offers
          </Link>

          <Link
            to="/travel-blog"
            className={`whitespace-nowrap transition-colors hover:text-[#650018] ${location.pathname.includes('blog') ? 'text-[#650018] font-semibold' : ''}`}
          >
            Blog
          </Link>

          <Link
            to="/contact"
            className={`whitespace-nowrap transition-colors hover:text-[#650018] ${location.pathname === '/contact' ? 'text-[#650018] font-semibold' : ''}`}
          >
            Contact
          </Link>
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="tel:+918126716179"
            className="hidden xl:inline-flex items-center gap-1.5 text-xs font-semibold text-[#650018] bg-[#FAF7F2] border border-[#E8E1DA] px-3.5 py-2 rounded-md hover:border-[#650018] transition-colors whitespace-nowrap shrink-0"
          >
            <Phone className="w-3.5 h-3.5 text-[#C6A15B]" />
            <span>8126716179</span>
          </a>

          <button
            onClick={() => onOpenEnquiry()}
            className="px-4 py-2.5 text-xs sm:text-sm font-medium text-white bg-[#650018] hover:bg-[#4d0012] rounded-md shadow-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Plan Your Trip
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#262626] hover:text-[#650018] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E8E1DA] px-6 py-5 shadow-2xl max-h-[80vh] overflow-y-auto">
          <div className="space-y-4">
            <div className="p-3 bg-[#FAF7F2] rounded-lg border border-[#E8E1DA] flex items-center justify-between">
              <div>
                <p className="text-xs text-[#6B7280]">Call or WhatsApp 24/7</p>
                <a href="tel:+918126716179" className="text-sm font-bold text-[#650018]">
                  +91 8126716179
                </a>
              </div>
              <a
                href="https://wa.me/918126716179?text=Hello%20Nivasa%20India%20Journey,%20I%20would%20like%20to%20plan%20a%20tour."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 text-white text-xs px-3 py-1.5 rounded-md flex items-center gap-1 font-medium"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>

            <nav className="flex flex-col space-y-3 text-sm font-medium text-[#262626]">
              <Link to="/" onClick={closeMenu} className="py-1 border-b border-[#E8E1DA]/50">
                Home
              </Link>
              <Link to="/rajasthan-tours" onClick={closeMenu} className="py-1 border-b border-[#E8E1DA]/50">
                Rajasthan Tours
              </Link>
              <Link to="/golden-triangle-tour" onClick={closeMenu} className="py-1 border-b border-[#E8E1DA]/50">
                Golden Triangle Tours
              </Link>
              <Link to="/agra-tour-packages" onClick={closeMenu} className="py-1 border-b border-[#E8E1DA]/50">
                Agra & Taj Mahal Tours
              </Link>
              <Link to="/delhi-tour-packages" onClick={closeMenu} className="py-1 border-b border-[#E8E1DA]/50">
                Delhi Tour Packages
              </Link>
              <Link to="/same-day-tours" onClick={closeMenu} className="py-1 border-b border-[#E8E1DA]/50">
                Same Day Tours
              </Link>
              <Link to="/destinations" onClick={closeMenu} className="py-1 border-b border-[#E8E1DA]/50">
                All Destinations
              </Link>
              <Link to="/offers" onClick={closeMenu} className="py-1 border-b border-[#E8E1DA]/50 text-[#650018] font-semibold">
                Tour Offers & Packages
              </Link>
              <Link to="/travel-blog" onClick={closeMenu} className="py-1 border-b border-[#E8E1DA]/50">
                Travel Blog & Guides
              </Link>
              <Link to="/travel-faqs" onClick={closeMenu} className="py-1 border-b border-[#E8E1DA]/50">
                Travel FAQs
              </Link>
              <Link to="/about-us" onClick={closeMenu} className="py-1 border-b border-[#E8E1DA]/50">
                About Nivasa India Journey
              </Link>
              <Link to="/contact" onClick={closeMenu} className="py-1">
                Contact Us
              </Link>
            </nav>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  closeMenu();
                  if (onOpenAIPlanner) onOpenAIPlanner();
                }}
                className="w-full py-2.5 px-4 bg-[#FAF7F2] text-[#650018] border border-[#C6A15B] rounded-md text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <Compass className="w-4 h-4 text-[#C6A15B]" />
                <span>Launch AI Itinerary Planner</span>
              </button>

              <button
                onClick={() => {
                  closeMenu();
                  onOpenEnquiry();
                }}
                className="w-full py-2.5 px-4 bg-[#650018] text-white rounded-md text-sm font-medium hover:bg-[#4d0012]"
              >
                Request Custom Tour Quote
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
