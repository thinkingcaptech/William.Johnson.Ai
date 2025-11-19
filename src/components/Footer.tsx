import { Hexagon } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-alchemist-darkest border-t border-alchemist-maroon py-20 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-alchemist-gold/30 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <div className="mb-10">
          <img 
            src="/logo.svg" 
            alt="Will Johnson Logo"
            className="mx-auto mb-6 w-16 h-16 object-contain opacity-70 drop-shadow-[0_0_15px_rgba(212,175,55,0.3)] animate-pulse-slow"
          />
          <p className="text-gray-600 text-xs tracking-[0.4em] uppercase">
            The work is complete. The silence is perfect.
          </p>
        </div>
        <p className="text-gray-800 text-[10px] font-mono tracking-widest">
          &copy; 2025 Will.Johnson.AI · The Vanishing Architect
        </p>
      </div>
    </footer>
  );
}
