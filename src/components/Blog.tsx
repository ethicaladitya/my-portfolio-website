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
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-80px" });
  const [livePosts, setLivePosts] = useState<BlogPost[]>(posts);
  const [isLoading, setIsLoading] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.23, 1, 0.32, 1] as [number, number, number, number],
      },
    },
  };

  useEffect(() => {
    async function fetchLivePosts() {
      setIsLoading(true);
      try {
        const res = await fetch("https://adityashah.blog/wp-json/wp/v2/posts?per_page=3");
        if (!res.ok) throw new Error("Failed to fetch");
        const wpPosts = await res.json();
        
        const mappedPosts: BlogPost[] = wpPosts.map((wp: { title?: { rendered: string }; link: string; excerpt?: { rendered: string }; content?: { rendered: string }; date?: string; class_list?: string[] }, i: number) => {
          let category = "Article";
          const catClass = wp.class_list?.find((c: string) => c.startsWith("category-"));
          if (catClass) {
            category = catClass.replace("category-", "").replace(/-/g, " ");
            category = category.charAt(0).toUpperCase() + category.slice(1);
          }
          
          const decodeEntities = (html: string) => {
            if (typeof document === 'undefined') return html;
            const txt = document.createElement("textarea");
            txt.innerHTML = html;
            return txt.value;
          };

          const rawExcerpt = wp.excerpt?.rendered || "";
          const cleanExcerpt = decodeEntities(rawExcerpt.replace(/<[^>]+>/g, "").replace(/&hellip;/g, "...").trim());
          
          const wordCount = (wp.content?.rendered || "").replace(/<[^>]+>/g, "").split(/\s+/).length;
          const mins = Math.max(1, Math.ceil(wordCount / 200));

          const fallbackGradients = [
            "from-primary to-accent",
            "from-accent to-accent-alt",
            "from-primary to-accent-alt",
          ];

          return {
            title: decodeEntities(wp.title?.rendered || "Blog Post"),
            slug: wp.link,
            category,
            excerpt: cleanExcerpt,
            readTime: `${mins} min read`,
            date: wp.date || new Date().toISOString(),
            gradient: fallbackGradients[i % fallbackGradients.length],
          };
        });
        
        if (mappedPosts.length > 0) setLivePosts(mappedPosts);
      } catch (err) {
        console.error("Failed to load live blog posts:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchLivePosts();
  }, []);

  return (
    <section id="blog" className="py-24 bg-background relative overflow-hidden transition-colors duration-300">
      <div className="absolute top-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl opacity-40 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl opacity-40 pointer-events-none" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-20 gap-8"
        >
          <div className="flex-1">
            <span className="text-sm font-semibold text-primary tracking-widest uppercase mb-4 block">
              Writing & Tutorials
            </span>
            <h2 className="section-heading text-left">
              From the <span className="gradient-text">Blog</span>
            </h2>
            <p className="section-subheading text-text-secondary mt-6 max-w-xl">
              I document technical challenges and solutions to build a living knowledge base for myself and the community.
            </p>
          </div>
          <a
            href="https://blog.theadityashah.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm font-bold text-primary transition-all pr-4"
          >
            <span className="animated-underline">Explore all posts</span>
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>

        <motion.div 
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative"
        >
          {isLoading && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/40 backdrop-blur-[2px] rounded-2xl">
              <div className="w-10 h-10 border-4 border-primary/10 border-t-primary rounded-full animate-spin" />
            </div>
          )}
          {livePosts.map((post, i) => (
            <motion.article
              key={i}
              variants={itemVariants}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }
              }}
              className="group bg-background border border-text-secondary/10 rounded-2x overflow-hidden hover:shadow-soft-elevation hover:border-primary/30 transition-all duration-300 flex flex-col h-full"
            >
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-6">
                  <span className="tag-pill bg-primary/5 text-primary border border-primary/10 text-[10px] font-bold tracking-wider uppercase">
                    {post.category}
                  </span>
                  <span className="text-[10px] font-bold text-text-secondary/40 tracking-widest uppercase">{formatDate(post.date)}</span>
                </div>

                <h3 className="text-xl font-bold text-text-primary mb-4 group-hover:text-primary transition-colors leading-snug flex-1">
                  {post.title}
                </h3>

                <p className="text-sm text-text-secondary leading-relaxed mb-8 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-text-secondary/5 mt-auto">
                  <span className="text-[10px] font-bold text-text-secondary/40 uppercase tracking-widest flex items-center gap-2">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {post.readTime}
                  </span>
                  <a
                    href={post.slug}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-primary group-hover:text-accent flex items-center gap-1 transition-colors"
                  >
                    Read More
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
