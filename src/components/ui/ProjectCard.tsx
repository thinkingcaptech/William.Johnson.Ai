import { LucideIcon, ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  url: string;
  desc: string;
  icon: LucideIcon;
  tags: string[];
}

export default function ProjectCard({ title, url, desc, icon: Icon, tags }: ProjectCardProps) {
  const cleanUrl = url.replace('https://', '').replace('http://', '');
  
  return (
    <a
      href={`https://${cleanUrl}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative overflow-hidden rounded-lg bg-alchemist-darkest border border-alchemist-maroon hover:border-alchemist-gold/50 transition-all duration-500 hover:-translate-y-2"
    >
      <div className="p-8 h-full flex flex-col relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div className="p-3 rounded bg-alchemist-dark border border-alchemist-maroon group-hover:scale-110 transition-transform duration-300">
            <Icon size={24} className="text-alchemist-gold" />
          </div>
          <ExternalLink
            size={18}
            className="text-gray-600 group-hover:text-alchemist-gold transition-colors"
          />
        </div>

        <h3 className="text-2xl font-bold text-alchemist-parchment mb-3 font-serif tracking-wide group-hover:text-alchemist-gold transition-colors">
          {title}
        </h3>
        <p className="text-alchemist-ash/70 mb-8 leading-relaxed flex-grow font-light">
          {desc}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded bg-alchemist-dark border border-alchemist-maroon text-alchemist-gold/80"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}
