'use client';

import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Philosophy from '@/components/Philosophy';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';

export default function Home() {
  return (
    <div className="min-h-screen bg-alchemist-darkest text-alchemist-parchment selection:bg-alchemist-gold/30 selection:text-alchemist-gold overflow-x-hidden">
      {/* Texture Overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03] noise-texture"></div>

      {/* Ambient Glows */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-alchemist-gold/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-alchemist-maroon/20 rounded-full blur-[120px]"></div>
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <Projects />
        <Philosophy />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
