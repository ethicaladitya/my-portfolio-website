"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

interface BlogPost {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  readTime: string;
  date: string;
  gradient: string;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function Blog({ posts }: { posts: BlogPost[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [livePosts, setLivePosts] = useState<BlogPost[]>(posts);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchLivePosts() {
      setIsLoading(true);
      try {
        const res = await fetch("https://adityashah.blog/wp-json/wp/v2/posts?per_page=3");
        if (!res.ok) throw new Error("Failed to fetch");
        const wpPosts = await res.json();
        
        const mappedPosts: BlogPost[] = wpPosts.map((wp: { title?: { rendered: string }; link: string; excerpt?: { rendered: string }; content?: { rendered: string }; date?: string; class_list?: string[] }, i: number) => {
          // Extract category from class_list e.g. "category-security" -> "Security"
          let category = "Article";
          const catClass = wp.class_list?.find((c: string) => c.startsWith("category-"));
          if (catClass) {
            category = catClass.replace("category-", "").replace(/-/g, " ");
            category = category.charAt(0).toUpperCase() + category.slice(1);
          }
          
          // Clean HTML from excerpt
          const rawExcerpt = wp.excerpt?.rendered || "";
          const cleanExcerpt = rawExcerpt.replace(/<[^>]+>/g, "").replace(/&hellip;/g, "...").replace(/&#8217;/g, "'").trim();
          
          // Estimate reading time
          const wordCount = (wp.content?.rendered || "").replace(/<[^>]+>/g, "").split(/\s+/).length;
          const mins = Math.max(1, Math.ceil(wordCount / 200));

          const gradients = [
            "from-purple-500 to-indigo-500",
            "from-blue-500 to-cyan-500",
            "from-pink-500 to-rose-500",
          ];

          return {
            title: wp.title?.rendered || "Blog Post",
            slug: wp.link,
            category,
            excerpt: cleanExcerpt,
            readTime: `${mins} min read`,
            date: wp.date || new Date().toISOString(),
            gradient: gradients[i % gradients.length],
          };
        });
        
        if (mappedPosts.length > 0) {
          setLivePosts(mappedPosts);
        }
      } catch (err) {
        console.error("Failed to load live blog posts:", err);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchLivePosts();
  }, []);

  return (
    <section id="blog" className="py-24 bg-gray-50/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />
      <div className="absolute top-0 left-0 w-80 h-80 bg-pink-50 rounded-full blur-3xl opacity-60" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-60" />

      <div className="section-container relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14"
        >
          <div>
            <span className="text-sm font-semibold text-purple-600 tracking-widest uppercase mb-3 block">
              Insights & Writing
            </span>
            <h2 className="section-heading">
              From the <span className="gradient-text">Field</span>
            </h2>
            <p className="section-subheading mt-4">
              Real-world learnings from 10+ years of production WordPress hosting.
            </p>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-semibold text-purple-600 hover:text-purple-800 transition-colors flex-shrink-0"
          >
            All posts
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {isLoading && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/50 backdrop-blur-sm rounded-2xl">
              <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
            </div>
          )}
          {livePosts.map((post, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-purple-100 transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              {/* Gradient top strip */}
              <div className={`h-2 bg-gradient-to-r ${post.gradient}`} />

              <div className="p-6 flex flex-col flex-1">
                {/* Category + date */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`tag-pill bg-gradient-to-r ${post.gradient} text-white font-semibold`}>
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-400">{formatDate(post.date)}</span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors leading-snug flex-1">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-gray-500 leading-relaxed mb-5 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {post.readTime}
                  </span>
                  <a
                    href={post.slug}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-purple-600 hover:text-purple-800 flex items-center gap-1 transition-colors"
                  >
                    Read
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
