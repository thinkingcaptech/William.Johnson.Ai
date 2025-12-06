import { Wind, Sparkles } from 'lucide-react';
import SectionTitle from './ui/SectionTitle';
import BookCard from './ui/BookCard';

export default function Philosophy() {
  return (
    <section id="aer" className="py-40 relative border-t border-alchemist-maroon/50">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle
          icon={Wind}
          title="AER"
          subtitle="The Stage of Expansion. The Invisible Infrastructure of Meaning."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <BookCard
            title="The Alchemy of Influence"
            sub="THE MORAL MECHANICS OF BELIEF"
            desc="This book is not a list of tactics. It is a blueprint for transmutation. It reveals the operating system beneath the noise—a synthesis of modern systems thinking and ancient wisdom. Learn to move from performance to physics, from manipulation to mechanics."
            coverImage="/books/alchemy-of-influence.png"
          />

          <BookCard
            title="Ars Instido"
            sub="THE ARCHITECTURE OF RESONANCE"
            desc="Only through silence can the true frequency be heard. A guide to acoustic warfare, the myth of noise, and the vanishing architect. Discover how to design invisible systems that guide behavior without commanding it."
            coverImage="/books/ars-instido.png"
          />
        </div>

        <div className="mt-32 text-center">
          <div className="inline-block p-12 border border-alchemist-gold/20 bg-alchemist-gold/5 rounded-xl relative">
            <Sparkles className="absolute top-6 left-6 text-alchemist-gold/40" />
            <Sparkles className="absolute bottom-6 right-6 text-alchemist-gold/40" />
            <p className="text-3xl md:text-4xl font-serif text-alchemist-parchment leading-tight">
              "The novice seeks to change a mind. <br />
              The alchemist builds a{' '}
              <span className="text-alchemist-gold italic">world</span>."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
