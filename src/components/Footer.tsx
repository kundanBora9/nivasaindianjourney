import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle, ShieldCheck, Clock, CheckCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#650018] text-white border-t-2 border-[#C6A15B] pt-14 pb-12 sm:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/15">
          {/* Column 1: Brand & Official Logo */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <img loading="lazy" decoding="async"
                src="/assets/aistudio/image_3c3a7ed7.png"
                alt="Nivasa India Journey"
                className="h-16 w-auto object-contain rounded"
              />
            </Link>
            <p className="text-white/80 text-sm leading-relaxed max-w-sm">
              Nivasa India Journey is a dedicated India tour company specializing in private heritage tours, bespoke Rajasthan itineraries, Golden Triangle circuits, and sunrise excursions to the Taj Mahal.
            </p>
            <div className="pt-2 space-y-2 text-sm">
              <div className="flex items-center gap-2.5 text-white/90">
                <Phone className="w-4 h-4 text-[#DFCA95] shrink-0" />
                <span>Call & WhatsApp: </span>
                <a href="tel:+918126716179" className="font-semibold text-white hover:underline">
                  +91 8126716179
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-white/90">
                <Mail className="w-4 h-4 text-[#DFCA95] shrink-0" />
                <span>Email: </span>
                <a href="mailto:contact@nivasaindiajourney.com" className="hover:underline">
                  contact@nivasaindiajourney.com
                </a>
              </div>
              <div className="flex items-start gap-2.5 text-white/90">
                <MapPin className="w-4 h-4 text-[#DFCA95] shrink-0 mt-0.5" />
                <span>North India Hub: New Delhi & Jaipur (Rajasthan), India</span>
              </div>
            </div>
          </div>

          {/* Column 2: Rajasthan Tours */}
          <div className="space-y-3">
            <h3 className="font-serif text-lg font-semibold text-[#DFCA95]">Rajasthan Tours</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <Link to="/tour-packages/rajasthan-tour-packages" className="hover:text-white transition-colors">
                  Royal Heritage & Palaces (8D/7N)
                </Link>
              </li>
              <li>
                <Link to="/tour-packages/jaisalmer-tour-packages" className="hover:text-white transition-colors">
                  Jaisalmer Desert & Dunes (4D/3N)
                </Link>
              </li>
              <li>
                <Link to="/tour-packages/jaipur-tour-packages" className="hover:text-white transition-colors">
                  Jaipur Pink City Weekend (3D/2N)
                </Link>
              </li>
              <li>
                <Link to="/tour-packages/ranthambore-tour-packages" className="hover:text-white transition-colors">
                  Ranthambore Tiger Safari (3D/2N)
                </Link>
              </li>
              <li>
                <Link to="/offers/rajasthan-tour-offers" className="text-[#DFCA95] hover:underline font-medium">
                  Rajasthan Tour Offers
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Golden Triangle & Agra */}
          <div className="space-y-3">
            <h3 className="font-serif text-lg font-semibold text-[#DFCA95]">Golden Triangle</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <Link to="/tour-packages/golden-triangle-tour" className="hover:text-white transition-colors">
                  Classic Circuit (5D/4N)
                </Link>
              </li>
              <li>
                <Link to="/tour-packages/golden-triangle-tour-with-udaipur" className="hover:text-white transition-colors">
                  With Udaipur Extension (7D/6N)
                </Link>
              </li>
              <li>
                <Link to="/tour-packages/golden-triangle-tour-with-varanasi" className="hover:text-white transition-colors">
                  With Varanasi Spiritual (8D/7N)
                </Link>
              </li>
              <li>
                <Link to="/tour-packages/same-day-agra-tour-from-delhi" className="hover:text-white transition-colors">
                  Same Day Taj Mahal from Delhi
                </Link>
              </li>
              <li>
                <Link to="/tour-packages/delhi-tour-packages" className="hover:text-white transition-colors">
                  Old & New Delhi City Tour
                </Link>
              </li>
              <li>
                <Link to="/offers/golden-triangle-tour-offers" className="text-[#DFCA95] hover:underline font-medium">
                  Golden Triangle Offers
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Quick Links & Policies */}
          <div className="space-y-3">
            <h3 className="font-serif text-lg font-semibold text-[#DFCA95]">Company & Legal</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <Link to="/about-us" className="hover:text-white transition-colors">
                  About Nivasa
                </Link>
              </li>
              <li>
                <Link to="/destinations" className="hover:text-white transition-colors">
                  Destination Guides
                </Link>
              </li>
              <li>
                <Link to="/travel-blog" className="hover:text-white transition-colors">
                  Travel Blog & Tips
                </Link>
              </li>
              <li>
                <Link to="/travel-faqs" className="hover:text-white transition-colors">
                  Travel FAQs
                </Link>
              </li>
              <li>
                <Link to="/cancellation-policy" className="hover:text-white transition-colors">
                  Cancellation Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <a href="/sitemap.xml" className="hover:text-white transition-colors text-xs text-white/60">
                  XML Sitemap
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust Badges Bar */}
        <div className="py-6 border-b border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-white/85">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#DFCA95] shrink-0" />
            <span>Verified Commercial AC Chauffeur Fleet</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#DFCA95] shrink-0" />
            <span>Government-Licensed Monument Guides</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#DFCA95] shrink-0" />
            <span>24/7 Dedicated Support at 8126716179</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 gap-4">
          <p>© {new Date().getFullYear()} Nivasa India Journey. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span>Specializing in Rajasthan, Golden Triangle, Agra & North India</span>
            <span>·</span>
            <a href="tel:+918126716179" className="text-[#DFCA95] hover:underline font-medium">
              Call +91 8126716179
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
