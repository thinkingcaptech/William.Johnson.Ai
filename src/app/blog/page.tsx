import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Calendar, User, ArrowLeft } from 'lucide-react';
import { getAllPosts } from '@/lib/blog';
import { format } from 'date-fns';

export const metadata: Metadata = {
  title: 'Codex | Will.Johnson.AI - Writings on Systems, AI & Business Alchemy',
  description: 'Insights on systems architecture, AI integration, and the philosophy of building businesses that scale geometrically.',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-alchemist-darkest text-alchemist-parchment">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03] noise-texture"></div>
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-alchemist-gold/5 rounded-full blur-[120px]"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 pt-32 pb-20 border-b border-alchemist-maroon/50">
        <div className="max-w-4xl mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-alchemist-gold hover:text-alchemist-parchment transition-colors mb-12 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm tracking-widest uppercase">Return to Sanctum</span>
          </Link>

          <div className="inline-flex items-center justify-center p-4 mb-8 rounded-full border border-alchemist-gold/30 bg-alchemist-dark shadow-[0_0_30px_rgba(212,175,55,0.1)]">
            <BookOpen size={32} className="text-alchemist-gold" />
          </div>

          <h1 className="text-6xl md:text-7xl font-bold text-gradient-gold mb-6 font-serif">
            The Codex
          </h1>
          <p className="text-xl text-alchemist-ash font-light max-w-2xl">
            Transmissions on systems architecture, business alchemy, and the invisible
            infrastructure of meaning.
          </p>
        </div>
      </header>

      {/* Blog Posts */}
      <main className="relative z-10 py-20">
        <div className="max-w-4xl mx-auto px-6">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-alchemist-ash text-lg italic">
                The first scrolls are being inscribed. Return soon...
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="group border border-alchemist-maroon rounded-xl p-8 bg-alchemist-darkest/50 backdrop-blur-sm hover:border-alchemist-gold/50 transition-all duration-300 hover:-translate-y-1"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="flex items-start gap-6">
                      <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-full border border-alchemist-gold/30 bg-alchemist-dark flex-shrink-0 group-hover:scale-110 transition-transform">
                        <BookOpen className="text-alchemist-gold" size={24} />
                      </div>

                      <div className="flex-1">
                        <h2 className="text-3xl font-bold text-alchemist-parchment group-hover:text-alchemist-gold transition-colors mb-4 font-serif">
                          {post.title}
                        </h2>

                        <div className="flex flex-wrap items-center gap-6 text-sm text-alchemist-ash mb-4">
                          <div className="flex items-center gap-2">
                            <Calendar size={14} />
                            <span>{format(new Date(post.date), 'MMMM d, yyyy')}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User size={14} />
                            <span>{post.author}</span>
                          </div>
                        </div>

                        <p className="text-alchemist-ash/80 leading-relaxed mb-6">
                          {post.excerpt}
                        </p>

                        <div className="text-alchemist-gold text-sm font-bold tracking-widest uppercase group-hover:underline underline-offset-4">
                          Read Manuscript →
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
