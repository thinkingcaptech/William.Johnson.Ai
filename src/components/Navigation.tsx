'use client';

import { useState, useEffect } from 'react';
import { Flame, Mountain, Wind, Droplets, Hexagon, Menu, X, BookOpen } from 'lucide-react';
import Link from 'next/link';

const navItems = [
  { id: 'ignis', label: 'IGNIS', icon: Flame },
  { id: 'terra', label: 'TERRA', icon: Mountain },
  { id: 'aer', label: 'AER', icon: Wind },
  { id: 'aqua', label: 'AQUA', icon: Droplets },
  { id: 'blog', label: 'CODEX', icon: BookOpen, isLink: true },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('ignis');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-alchemist-darkest/90 border-b border-alchemist-maroon backdrop-blur-xl py-4'
          : 'bg-transparent py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center">
          {/* Brand Logo */}
          <div
            className="flex items-center cursor-pointer group gap-4"
            onClick={() => scrollTo('ignis')}
          >
            <div className="relative w-12 h-12 flex items-center justify-center">
              <img 
                src="/logo.svg" 
                alt="Will Johnson Logo"
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:drop-shadow-[0_0_25px_rgba(212,175,55,0.6)] animate-pulse-slow"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-serif font-bold tracking-[0.1em] text-alchemist-parchment">
                WILL.JOHNSON
              </span>
              <span className="text-[10px] text-alchemist-gold tracking-[0.4em] uppercase">
                The Alchemist
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) =>
              item.isLink ? (
                <Link
                  key={item.id}
                  href="/blog"
                  className="text-[11px] font-bold tracking-[0.25em] uppercase transition-all duration-300 flex items-center gap-2 group hover:text-alchemist-gold text-alchemist-ash"
                >
                  {item.label}
                  <span className="h-[1px] w-0 bg-alchemist-gold transition-all duration-300 group-hover:w-8"></span>
                </Link>
              ) : (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`text-[11px] font-bold tracking-[0.25em] uppercase transition-all duration-300 flex items-center gap-2 group hover:text-alchemist-gold ${
                    activeSection === item.id ? 'text-alchemist-gold' : 'text-alchemist-ash'
                  }`}
                >
                  {item.label}
                  <span
                    className={`h-[1px] w-0 bg-alchemist-gold transition-all duration-300 group-hover:w-8 ${
                      activeSection === item.id ? 'w-8' : ''
                    }`}
                  ></span>
                </button>
              )
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-alchemist-gold"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-alchemist-darkest border-b border-alchemist-maroon absolute w-full">
          <div className="px-6 py-8 space-y-6">
            {navItems.map((item) =>
              item.isLink ? (
                <Link
                  key={item.id}
                  href="/blog"
                  className="w-full flex items-center gap-4 text-sm font-bold tracking-[0.2em] text-alchemist-ash hover:text-alchemist-gold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon size={16} />
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="w-full flex items-center gap-4 text-sm font-bold tracking-[0.2em] text-alchemist-ash hover:text-alchemist-gold"
                >
                  <item.icon size={16} />
                  {item.label}
                </button>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
