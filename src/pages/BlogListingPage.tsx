import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogs';
import { Breadcrumb } from '../components/Breadcrumb';

export const BlogListingPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-10">
      <Breadcrumb items={[{ label: 'Travel Blog' }]} />

      <section className="bg-white rounded-xl border border-[#E8E1DA] p-6 sm:p-10 space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C6A15B]">
          <span>Authentic On-Ground Insights</span>
          <span aria-hidden="true">·</span>
          <span>Verified Travel Guidance</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#650018]">
          India Travel Guides, Itineraries & Expert Advice
        </h1>
        <p className="text-xs sm:text-sm text-[#6B7280] max-w-3xl leading-relaxed">
          Comprehensive, fact-checked planning guides created by our senior tour specialists. Learn about optimal route timings, dress codes, sunrise viewing strategies, and seasonal tips.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {BLOG_POSTS.map(post => (
          <article
            key={post.slug}
            className="bg-white rounded-xl border border-[#E8E1DA] p-6 hover:border-[#650018] transition-colors flex flex-col justify-between group"
          >
            <div className="space-y-3">
              {/* Clean unboxed metadata with · separators */}
              <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                <span className="font-semibold text-[#650018]">{post.category}</span>
                <span aria-hidden="true">·</span>
                <span>{post.readTime}</span>
                <span aria-hidden="true">·</span>
                <span>{post.publishDate}</span>
              </div>

              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#262626] group-hover:text-[#650018] transition-colors leading-snug">
                <Link to={`/travel-blog/${post.slug}`}>{post.title}</Link>
              </h2>

              <p className="text-xs text-[#6B7280] leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>

              <div className="pt-2">
                <p className="text-[11px] font-semibold text-[#262626] mb-1">Key Takeaway:</p>
                <p className="text-[11px] text-[#6B7280] bg-[#FAF7F2] p-2 rounded border border-[#E8E1DA] line-clamp-2">
                  {post.keyTakeaways[0]}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8E1DA] mt-4 flex items-center justify-between">
              <span className="text-xs text-[#6B7280]">By {post.author}</span>
              <Link
                to={`/travel-blog/${post.slug}`}
                className="text-xs font-semibold text-[#650018] hover:underline flex items-center gap-1"
              >
                <span>Read Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
