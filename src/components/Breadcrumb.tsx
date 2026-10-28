import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="py-3 text-xs text-[#6B7280]">
      <ol className="flex items-center flex-wrap gap-1.5">
        <li className="flex items-center">
          <Link to="/" className="hover:text-[#650018] flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-1.5">
              <ChevronRight className="w-3 h-3 text-[#E8E1DA]" />
              {isLast || !item.href ? (
                <span className="text-[#262626] font-medium truncate max-w-[220px] sm:max-w-md">
                  {item.label}
                </span>
              ) : (
                <Link to={item.href} className="hover:text-[#650018] truncate max-w-[160px]">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
