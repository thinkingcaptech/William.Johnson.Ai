import { LucideIcon } from 'lucide-react';

interface SectionTitleProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
}

export default function SectionTitle({ icon: Icon, title, subtitle }: SectionTitleProps) {
  return (
    <div className="mb-16 text-center relative z-10">
      <div className="inline-flex items-center justify-center p-4 mb-6 rounded-full border border-alchemist-gold/30 bg-alchemist-dark shadow-[0_0_30px_rgba(212,175,55,0.1)]">
        <Icon size={32} className="text-alchemist-gold" />
      </div>
      <h2 className="text-5xl md:text-6xl font-bold text-gradient-gold tracking-tight mb-6 font-serif">
        {title}
      </h2>
      <p className="text-alchemist-ash max-w-2xl mx-auto text-xl font-light font-sans leading-relaxed">
        {subtitle}
      </p>
      <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-alchemist-gold to-transparent mx-auto mt-8"></div>
    </div>
  );
}
