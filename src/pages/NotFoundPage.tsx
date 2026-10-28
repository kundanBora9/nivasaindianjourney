import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => (
  <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-5">
    <p className="text-xs font-semibold tracking-widest text-[#650018] uppercase">Error 404</p>
    <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#650018]">Page Not Found</h1>
    <p className="text-sm text-[#6B7280] max-w-xl mx-auto">
      The page you are looking for may have moved or no longer exists. Explore our most popular private tours instead.
    </p>
    <div className="flex flex-wrap justify-center gap-3 pt-2">
      <Link to="/" className="px-4 py-2 bg-[#650018] text-white text-xs font-semibold rounded hover:bg-[#4d0012]">
        Back to Home
      </Link>
      <Link to="/tour-packages" className="px-4 py-2 border border-[#650018] text-[#650018] text-xs font-semibold rounded hover:bg-[#650018] hover:text-white">
        Browse Tour Packages
      </Link>
      <Link to="/contact" className="px-4 py-2 border border-[#E8E1DA] text-[#262626] text-xs font-semibold rounded hover:bg-[#FAF7F2]">
        Contact Us
      </Link>
    </div>
  </div>
);
