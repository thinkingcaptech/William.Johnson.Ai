'use client';

import { Flame } from 'lucide-react';
import AlchemistOracle from './AlchemistOracle';
import ElementalBadge from './ui/ElementalBadge';

export default function Hero() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="ignis"
      className="min-h-screen flex items-center justify-center relative pt-20 pb-20"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="order-2 lg:order-1 space-y-10 animate-fade-in-up">
          <ElementalBadge element="ignis" label="IGNIS: THE INNER FORGE" />

          <h1 className="text-6xl sm:text-8xl font-bold font-serif leading-[0.9] text-alchemist-parchment">
            Transmuting <br />
            <span className="text-gradient-gold">Chaos into Code</span>
          </h1>
          
          <p className="text-lg text-alchemist-gold/80 font-light italic mt-4">
            — The Oracle
          </p>

          <div className="pl-6 border-l-2 border-alchemist-gold">
            <p className="text-xl text-alchemist-ash leading-relaxed font-light font-sans italic">
              "I do not merely build systems. I architect the invisible
              infrastructure that allows businesses to scale geometrically."
            </p>
          </div>

          <div className="flex flex-wrap gap-6 pt-6">
            <button
              onClick={() => scrollTo('terra')}
              className="px-8 py-4 rounded btn-gradient-gold font-bold tracking-[0.2em] text-xs hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all shimmer-effect flex items-center gap-3"
            >
              <img 
                src="/logo.svg" 
                alt="" 
                className="w-12 h-12 brightness-0"
                style={{ filter: 'brightness(0)' }}
              />
              VIEW THE STRUCTURE
              <img 
                src="/logo.svg" 
                alt="" 
                className="w-12 h-12 brightness-0"
                style={{ filter: 'brightness(0)' }}
              />
            </button>
            <button
              onClick={() => scrollTo('aer')}
              className="px-8 py-4 bg-transparent border border-alchemist-gold text-alchemist-gold hover:bg-alchemist-gold/10 font-bold tracking-[0.2em] text-xs rounded transition-all shimmer-effect flex items-center gap-3"
            >
              <img 
                src="/logo.svg" 
                alt="" 
                className="w-12 h-12"
                style={{ filter: 'brightness(0) invert(1) sepia(1) saturate(5) hue-rotate(10deg)' }}
              />
              READ THE CODEX
              <img 
                src="/logo.svg" 
                alt="" 
                className="w-12 h-12"
                style={{ filter: 'brightness(0) invert(1) sepia(1) saturate(5) hue-rotate(10deg)' }}
              />
            </button>
          </div>
        </div>

        {/* Interactive Alchemist Oracle */}
        <div className="order-1 lg:order-2 relative flex justify-center lg:justify-end">
          <div className="absolute inset-0 bg-alchemist-gold/5 blur-[80px] -z-10 rounded-full"></div>
          <AlchemistOracle />
        </div>
      </div>
    </section>
  );
}
