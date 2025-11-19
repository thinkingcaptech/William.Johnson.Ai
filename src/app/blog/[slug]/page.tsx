import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { getAllPosts, getPostBySlug } from '@/lib/blog';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { format } from 'date-fns';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return { title: 'Post Not Found' };
  }
  return {
    title: `${post.title} | The Codex`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-alchemist-darkest text-alchemist-parchment flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-alchemist-gold mb-4">Manuscript Not Found</h1>
          <Link href="/blog" className="text-alchemist-gold hover:underline">
            Return to Codex
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-alchemist-darkest text-alchemist-parchment">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03] noise-texture"></div>

      {/* Article */}
      <article className="relative z-10 pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          {/* Back Link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-alchemist-gold hover:text-alchemist-parchment transition-colors mb-12 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm tracking-widest uppercase">Return to Codex</span>
          </Link>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-bold text-gradient-gold mb-8 font-serif leading-tight">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-alchemist-ash mb-12 pb-12 border-b border-alchemist-maroon">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{format(new Date(post.date), 'MMMM d, yyyy')}</span>
            </div>
            <div className="flex items-center gap-2">
              <User size={16} />
              <span>{post.author}</span>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none
            prose-headings:font-serif prose-headings:text-alchemist-gold
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
            prose-p:text-alchemist-ash prose-p:leading-relaxed prose-p:mb-6
            prose-a:text-alchemist-gold prose-a:no-underline hover:prose-a:underline
            prose-strong:text-alchemist-parchment prose-strong:font-bold
            prose-code:text-alchemist-gold prose-code:bg-alchemist-dark prose-code:px-2 prose-code:py-1 prose-code:rounded
            prose-pre:bg-alchemist-dark prose-pre:border prose-pre:border-alchemist-maroon
            prose-blockquote:border-l-4 prose-blockquote:border-alchemist-gold prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-alchemist-ash
            prose-ul:text-alchemist-ash prose-ol:text-alchemist-ash
          ">
            <MDXRemote source={post.content} />
          </div>

          {/* Footer */}
          <div className="mt-20 pt-12 border-t border-alchemist-maroon">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-alchemist-gold hover:text-alchemist-parchment transition-colors group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm tracking-widest uppercase">View All Manuscripts</span>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
