"use client";

import { motion } from "framer-motion";
import SectionHeaderV2 from "./SectionHeaderV2";

interface Post {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  readTime: string;
  date: string;
}

export default function BlogV2({ posts }: { posts: Post[] }) {
  return (
    <section id="blog" className="py-32 bg-[#050505] relative overflow-hidden border-t border-white/5 pb-64">
      <div className="section-container relative z-10">
        <SectionHeaderV2 
          metadata="// KNOWLEDGE_BASE"
          title="Engineering Logs"
          subtitle="Documenting technical challenges, infrastructure architectural decisions, and the future of WordPress at scale."
        />

        <div className="space-y-0 border-t border-white/10">
          {posts.map((post, i) => (
            <motion.a
              key={post.slug}
              href={`https://adityashah.blog/${post.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="group block border-b border-white/10 p-10 hover:bg-white/[0.02] transition-colors relative"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="space-y-4 max-w-2xl">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[9px] tracking-[0.3em] text-primary uppercase">{post.category}</span>
                    <div className="w-[1px] h-3 bg-white/40" />
                    <span className="font-mono text-[9px] tracking-[0.3em] text-white/50 uppercase">{post.date}</span>
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase leading-none group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-white/70 text-xs leading-relaxed font-medium tracking-tight line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span className="font-mono text-[9px] tracking-[0.3em] text-white/60 uppercase">
                    READ_TIME: {post.readTime.toUpperCase()}
                  </span>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[9px] tracking-[0.3em] text-white/0 group-hover:text-white/60 transition-all uppercase">OPEN_LOG</span>
                    <svg className="w-5 h-5 text-white/40 group-hover:text-primary transition-all group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Hover index */}
              <div className="absolute top-1/2 -translate-y-1/2 left-0 font-mono text-[60px] text-white/[0.01] group-hover:text-white/[0.03] transition-colors font-black pointer-events-none select-none -translate-x-1/2">
                 0{i + 1}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
