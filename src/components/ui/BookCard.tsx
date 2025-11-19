import { Scroll, Download } from 'lucide-react';

interface BookCardProps {
  title: string;
  sub: string;
  desc: string;
  downloadUrl?: string;
}

export default function BookCard({ title, sub, desc, downloadUrl }: BookCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-alchemist-darkest border border-alchemist-maroon hover:border-alchemist-gold/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
      <div className="absolute inset-0 bg-gradient-to-br from-alchemist-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative p-8 flex flex-col h-full">
        <div className="flex justify-between items-start mb-6">
          <div className="p-3 bg-alchemist-dark rounded border border-alchemist-maroon group-hover:border-alchemist-gold transition-colors">
            <Scroll className="text-alchemist-gold" size={24} />
          </div>
          <span className="text-[10px] font-bold border border-alchemist-gold/30 text-alchemist-gold px-2 py-1 rounded tracking-widest">
            CODEX
          </span>
        </div>

        <h3 className="text-2xl font-bold text-alchemist-parchment mb-2 font-serif group-hover:text-alchemist-gold transition-colors">
          {title}
        </h3>
        <div className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-alchemist-ash">
          {sub}
        </div>

        <p className="text-alchemist-ash/80 mb-8 leading-relaxed flex-grow font-light border-l border-alchemist-maroon pl-4">
          {desc}
        </p>

        {downloadUrl ? (
          <a
            href={downloadUrl}
            download
            className="w-full py-3 rounded bg-alchemist-dark border border-alchemist-maroon hover:border-alchemist-gold text-alchemist-gold text-xs font-bold tracking-[0.2em] transition-all flex items-center justify-center gap-3 group-hover:bg-alchemist-gold group-hover:text-alchemist-dark"
          >
            <span>DOWNLOAD MANUSCRIPT</span>
            <Download size={14} />
          </a>
        ) : (
          <button className="w-full py-3 rounded bg-alchemist-dark border border-alchemist-maroon hover:border-alchemist-gold text-alchemist-gold text-xs font-bold tracking-[0.2em] transition-all flex items-center justify-center gap-3 group-hover:bg-alchemist-gold group-hover:text-alchemist-dark">
            <span>COMING SOON</span>
            <Scroll size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
