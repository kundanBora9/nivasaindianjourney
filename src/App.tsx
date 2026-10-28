import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileQuickBar } from './components/MobileQuickBar';
import { EnquiryModal } from './components/EnquiryModal';
import { AITripPlannerModal } from './components/AITripPlannerModal';

import { HomePage } from './pages/HomePage';
import { TourListingPage } from './pages/TourListingPage';
import { PackageDetailPage } from './pages/PackageDetailPage';
import { DestinationsPage } from './pages/DestinationsPage';
import { BlogListingPage } from './pages/BlogListingPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { RajasthanOffersPage } from './pages/RajasthanOffersPage';
import { GoldenTriangleOffersPage } from './pages/GoldenTriangleOffersPage';
import { OffersHubPage } from './pages/OffersHubPage';
import { OfferDetailPage } from './pages/OfferDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { PolicyPage } from './pages/PolicyPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { RouteSEO } from './seo/RouteSEO';
import { REDIRECTS } from './seo/routeMeta';

export default function App() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [enquiryContext, setEnquiryContext] = useState<string | undefined>(undefined);
  const [aiPlannerOpen, setAiPlannerOpen] = useState(false);

  const handleOpenEnquiry = (context?: string) => {
    setEnquiryContext(context);
    setEnquiryOpen(true);
  };

  const handleCloseEnquiry = () => {
    setEnquiryOpen(false);
    setEnquiryContext(undefined);
  };

  return (
    <Router>
      <RouteSEO />
      <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#262626] font-sans antialiased selection:bg-[#650018] selection:text-white pb-14 md:pb-0">
        {/* Responsive Header */}
        <Header
          onOpenEnquiry={handleOpenEnquiry}
          onOpenAIPlanner={() => setAiPlannerOpen(true)}
        />

        {/* Main Content Viewport */}
        <main className="flex-1">
          <Routes>
            {/* Core Homepage */}
            <Route
              path="/"
              element={
                <HomePage
                  onOpenEnquiry={handleOpenEnquiry}
                  onOpenAIPlanner={() => setAiPlannerOpen(true)}
                />
              }
            />

            {/* Core Listing & Category Routes */}
            <Route
              path="/tour-packages"
              element={
                <TourListingPage
                  pageTitle="All India Tour Packages & Itineraries"
                  pageDescription="Explore verified private chauffeur tours across Rajasthan, Golden Triangle, Agra Taj Mahal, Delhi, and North India. Handcrafted by local specialists."
                  onOpenEnquiry={handleOpenEnquiry}
                />
              }
            />

            <Route
              path="/rajasthan-tours"
              element={
                <TourListingPage
                  categoryFilter="rajasthan"
                  pageTitle="Rajasthan Tour Packages & Royal Forts"
                  pageDescription="Immerse yourself in Rajasthan’s terracotta fortresses, Jaisalmer sand dunes, Jodhpur blue alleys, and Udaipur lake palaces with private air-conditioned vehicles and verified heritage havelis."
                  onOpenEnquiry={handleOpenEnquiry}
                />
              }
            />

            <Route
              path="/golden-triangle-tour"
              element={
                <TourListingPage
                  categoryFilter="golden-triangle"
                  pageTitle="Golden Triangle Tours (Delhi · Agra · Jaipur)"
                  pageDescription="India’s premier travel circuit covering Delhi’s Mughal history, sunrise at the Taj Mahal in Agra, and Jaipur’s royal pink palaces with flexible extensions to Udaipur and Varanasi."
                  onOpenEnquiry={handleOpenEnquiry}
                />
              }
            />

            <Route
              path="/agra-tour-packages"
              element={
                <TourListingPage
                  categoryFilter="agra-taj"
                  pageTitle="Agra & Taj Mahal Tour Packages"
                  pageDescription="Private sunrise Taj Mahal tours, Agra Fort, Mehtab Bagh, and express same-day car tours from Delhi via the Yamuna Expressway with licensed monument guides."
                  onOpenEnquiry={handleOpenEnquiry}
                />
              }
            />

            <Route
              path="/delhi-tour-packages"
              element={
                <TourListingPage
                  categoryFilter="delhi"
                  pageTitle="Delhi Sightseeing & Heritage Tours"
                  pageDescription="Discover Old and New Delhi: Chandni Chowk rickshaw rides, Jama Masjid, Humayun’s Tomb, Qutub Minar, and India Gate with verified local drivers."
                  onOpenEnquiry={handleOpenEnquiry}
                />
              }
            />

            <Route
              path="/same-day-tours"
              element={
                <TourListingPage
                  categoryFilter="same-day"
                  pageTitle="Same Day Express Tours from Delhi"
                  pageDescription="Convenient one-day private journeys: Same Day Agra Taj Mahal, Jaipur express car tour, and Mathura-Vrindavan spiritual day trips."
                  onOpenEnquiry={handleOpenEnquiry}
                />
              }
            />

            {/* Package Detail View (supports both /tour-packages/:slug and direct SEO paths) */}
            <Route
              path="/tour-packages/:slug"
              element={<PackageDetailPage onOpenEnquiry={handleOpenEnquiry} />}
            />
            <Route
              path="/rajasthan-tour-packages"
              element={<PackageDetailPage onOpenEnquiry={handleOpenEnquiry} />}
            />
            <Route
              path="/jaipur-tour-packages"
              element={<PackageDetailPage onOpenEnquiry={handleOpenEnquiry} />}
            />
            <Route
              path="/jaisalmer-tour-packages"
              element={<PackageDetailPage onOpenEnquiry={handleOpenEnquiry} />}
            />
            <Route
              path="/ranthambore-tour-packages"
              element={<PackageDetailPage onOpenEnquiry={handleOpenEnquiry} />}
            />
            <Route
              path="/golden-triangle-tour-with-udaipur"
              element={<PackageDetailPage onOpenEnquiry={handleOpenEnquiry} />}
            />
            <Route
              path="/same-day-agra-tour-from-delhi"
              element={<PackageDetailPage onOpenEnquiry={handleOpenEnquiry} />}
            />

            {/* Retired URLs that never matched a package: redirect to the closest real page */}
            {Object.entries(REDIRECTS).map(([from, to]) => (
              <Route key={from} path={from} element={<Navigate to={to} replace />} />
            ))}

            {/* Destinations */}
            <Route
              path="/destinations"
              element={<DestinationsPage onOpenEnquiry={handleOpenEnquiry} />}
            />
            <Route
              path="/destinations/:slug"
              element={<DestinationsPage onOpenEnquiry={handleOpenEnquiry} />}
            />

            {/* Special Offers Pages */}
            <Route
              path="/offers"
              element={<OffersHubPage onOpenEnquiry={handleOpenEnquiry} />}
            />
            <Route
              path="/offers/rajasthan-tour-offers"
              element={<RajasthanOffersPage onOpenEnquiry={handleOpenEnquiry} />}
            />
            <Route
              path="/offers/golden-triangle-tour-offers"
              element={<GoldenTriangleOffersPage onOpenEnquiry={handleOpenEnquiry} />}
            />
            <Route
              path="/offers/:slug"
              element={<OfferDetailPage onOpenEnquiry={handleOpenEnquiry} />}
            />
            <Route
              path="/offers/rajasthan-tour-offers/:slug"
              element={<OfferDetailPage onOpenEnquiry={handleOpenEnquiry} />}
            />
            <Route
              path="/offers/golden-triangle-tour-offers/:slug"
              element={<OfferDetailPage onOpenEnquiry={handleOpenEnquiry} />}
            />

            {/* Travel Blog */}
            <Route path="/travel-blog" element={<BlogListingPage />} />
            <Route
              path="/travel-blog/:slug"
              element={
                <BlogDetailPage
                  onOpenEnquiry={handleOpenEnquiry}
                  onOpenAIPlanner={() => setAiPlannerOpen(true)}
                />
              }
            />

            {/* Informational & Company Pages */}
            <Route
              path="/about-us"
              element={<AboutPage onOpenEnquiry={() => handleOpenEnquiry('General Itinerary Planning')} />}
            />
            <Route path="/contact" element={<ContactPage />} />
            <Route
              path="/travel-faqs"
              element={<FaqPage onOpenEnquiry={() => handleOpenEnquiry('General FAQ Enquiry')} />}
            />
            <Route path="/privacy-policy" element={<PolicyPage />} />
            <Route path="/terms-and-conditions" element={<PolicyPage />} />
            <Route path="/cancellation-policy" element={<PolicyPage />} />

            {/* Unknown URLs get a real 404 page (noindex) instead of a redirect to Home */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        {/* Quiet Editorial Footer */}
        <Footer />

        {/* Mobile Fixed Sticky Quick Bar (<15% viewport height) */}
        <MobileQuickBar onOpenEnquiry={() => handleOpenEnquiry('Quick Mobile Enquiry')} />

        {/* Lead Capture Enquiry Modal */}
        <EnquiryModal
          isOpen={enquiryOpen}
          onClose={handleCloseEnquiry}
          initialPackage={enquiryContext}
        />

        {/* AI Trip Planner Modal */}
        <AITripPlannerModal
          isOpen={aiPlannerOpen}
          onClose={() => setAiPlannerOpen(false)}
          onSelectPackage={(slug) => {
            window.location.href = `/tour-packages/${slug}`;
          }}
        />
      </div>
    </Router>
  );
}
