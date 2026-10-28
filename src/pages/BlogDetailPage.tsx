import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Calendar, Check, ArrowRight, MessageCircle, Phone, Compass } from 'lucide-react';
import { getBlogPostBySlug, BLOG_POSTS } from '../data/blogs';
import { Breadcrumb } from '../components/Breadcrumb';

interface BlogDetailPageProps {
  onOpenEnquiry: (context?: string) => void;
  onOpenAIPlanner?: () => void;
}

export const BlogDetailPage: React.FC<BlogDetailPageProps> = ({ onOpenEnquiry, onOpenAIPlanner }) => {
  const { slug } = useParams<{ slug: string }>();
  const post = getBlogPostBySlug(slug || '');

  // <title>, meta tags and JSON-LD for this page are handled centrally by <RouteSEO /> (src/seo).
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [post]);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h1 className="font-serif text-2xl font-bold text-[#650018]">Article Not Found</h1>
        <p className="text-xs text-[#6B7280]">The travel guide you requested does not exist or has been archived.</p>
        <Link to="/travel-blog" className="text-xs font-semibold text-[#650018] underline">
          Return to Travel Blog
        </Link>
      </div>
    );
  }

  const relatedPosts = BLOG_POSTS.filter(b => b.slug !== post.slug).slice(0, 2);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-6 space-y-8">
      <Breadcrumb
        items={[
          { label: 'Travel Blog', href: '/travel-blog' },
          { label: post.title }
        ]}
      />

      <article className="space-y-6">
        {/* Header */}
        <div className="space-y-3 border-b border-[#E8E1DA] pb-6">
          <div className="flex items-center gap-2 text-xs text-[#6B7280]">
            <span className="font-semibold text-[#650018]">{post.category}</span>
            <span aria-hidden="true">·</span>
            <span>{post.readTime}</span>
            <span aria-hidden="true">·</span>
            <span>Published {post.publishDate}</span>
          </div>

          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#262626] leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center justify-between text-xs text-[#6B7280] pt-1">
            <span>Written by <strong>{post.author}</strong> ({post.authorRole})</span>
            <span className="text-xs text-[#650018]">Verified Field Experience</span>
          </div>
        </div>

        {/* Key Takeaways Box */}
        <div className="bg-[#FAF7F2] rounded-xl border border-[#C6A15B]/40 p-5 space-y-2.5">
          <span className="font-serif text-sm font-bold text-[#650018] block">
            Executive Summary & Key Takeaways
          </span>
          <ul className="space-y-2 text-xs text-[#262626]">
            {post.keyTakeaways.map((takeaway, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#C6A15B] shrink-0 mt-0.5" />
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Article Body */}
        <div className="prose prose-stone max-w-none text-xs sm:text-sm text-[#262626] leading-relaxed space-y-4">
          <div className="whitespace-pre-line font-normal text-[#262626]">
            {post.content}
          </div>
        </div>

        {/* Planning Assistance CTA Box */}
        <div className="bg-[#650018] text-white p-6 sm:p-8 rounded-xl space-y-4 text-center">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
            Plan Your Tour Based on This Itinerary
          </h2>
          <p className="text-xs sm:text-sm text-white/80 max-w-lg mx-auto">
            Contact our dedicated tour coordinators to customize timings, hotels, and private transport.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onOpenEnquiry(`Query regarding blog: ${post.title}`)}
              className="px-5 py-2.5 bg-[#C6A15B] hover:bg-[#A3803C] text-[#262626] text-xs font-semibold rounded cursor-pointer"
            >
              Request Custom Quote
            </button>
            <a
              href={`https://wa.me/918126716179?text=${encodeURIComponent(
                `Hello Nivasa India Journey, I was reading your guide on "${post.title}" and would like to organize a tour.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp: 8126716179</span>
            </a>
            <a
              href="tel:+918126716179"
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-[#DFCA95]" />
              <span>Call 8126716179</span>
            </a>
          </div>
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <div className="pt-6 border-t border-[#E8E1DA] space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#650018]">Related Travel Guides</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedPosts.map(r => (
                <div key={r.slug} className="p-4 bg-white rounded-lg border border-[#E8E1DA] space-y-2">
                  <span className="text-[11px] text-[#650018] font-semibold">{r.category}</span>
                  <h4 className="font-serif font-bold text-sm text-[#262626]">
                    <Link to={`/travel-blog/${r.slug}`} className="hover:text-[#650018]">
                      {r.title}
                    </Link>
                  </h4>
                  <Link
                    to={`/travel-blog/${r.slug}`}
                    className="text-xs text-[#650018] font-semibold hover:underline flex items-center gap-1 pt-1"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
};
