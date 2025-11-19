'use client';

import { useState } from 'react';
import { Droplets, Anchor } from 'lucide-react';
import SectionTitle from './ui/SectionTitle';
import { submitContactForm, type ContactFormData } from '@/lib/firestore';

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    scope: 'Consulting',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    const result = await submitContactForm(formData);

    if (result.success) {
      setStatus('success');
      setFormData({ name: '', email: '', scope: 'Consulting', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } else {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section
      id="aqua"
      className="py-40 relative border-t border-alchemist-maroon/50 bg-alchemist-darkest"
    >
      <div className="max-w-3xl mx-auto px-6">
        <SectionTitle
          icon={Droplets}
          title="AQUA"
          subtitle="The Stage of Dissolution. Initiate the Covenant of Clarity."
        />

        <div className="relative bg-alchemist-dark p-1 rounded-xl shadow-[0_0_60px_rgba(0,0,0,0.8)] border border-alchemist-maroon">
          <div className="bg-alchemist-darkest rounded-[10px] p-12">
            <div className="flex items-center justify-center gap-4 mb-12">
              <Anchor className="text-alchemist-gold" size={24} />
              <div className="text-xs tracking-[0.3em] text-alchemist-ash uppercase">
                Initiating Diagnostic Flow
              </div>
              <Anchor className="text-alchemist-gold" size={24} />
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2 group">
                  <label className="text-[10px] font-bold tracking-[0.2em] text-alchemist-gold uppercase">
                    Identifier (Name)
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-alchemist-dark border-b border-alchemist-maroon focus:border-alchemist-gold px-0 py-4 text-alchemist-parchment focus:outline-none transition-all placeholder-gray-700 font-serif"
                    placeholder="Enter your designation"
                  />
                </div>
                <div className="space-y-2 group">
                  <label className="text-[10px] font-bold tracking-[0.2em] text-alchemist-gold uppercase">
                    Frequency (Email)
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-alchemist-dark border-b border-alchemist-maroon focus:border-alchemist-gold px-0 py-4 text-alchemist-parchment focus:outline-none transition-all placeholder-gray-700 font-serif"
                    placeholder="Enter your frequency"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-bold tracking-[0.2em] text-alchemist-gold uppercase">
                  Scope of Transmutation
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['Consulting', 'Development', 'Architecture'].map((scope) => (
                    <label
                      key={scope}
                      className="flex items-center justify-center gap-3 p-4 border border-alchemist-maroon rounded cursor-pointer hover:border-alchemist-gold hover:bg-alchemist-gold/5 transition-all group"
                    >
                      <input
                        type="radio"
                        name="scope"
                        value={scope}
                        checked={formData.scope === scope}
                        onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                        className="hidden"
                      />
                      <span className="text-xs tracking-widest text-alchemist-ash group-hover:text-alchemist-parchment uppercase">
                        {scope}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-[0.2em] text-alchemist-gold uppercase">
                  The Signal (Message)
                </label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-alchemist-dark border border-alchemist-maroon focus:border-alchemist-gold rounded p-4 text-alchemist-parchment focus:outline-none transition-all font-serif placeholder-gray-700"
                  placeholder="Describe the current architecture..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-5 rounded btn-gradient-gold font-bold tracking-[0.3em] text-xs uppercase hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all transform hover:-translate-y-1 flex justify-center items-center gap-3 disabled:opacity-50 shimmer-effect"
              >
                {status === 'sending' ? (
                  <>Transmitting...</>
                ) : status === 'success' ? (
                  <>✓ Connection Established</>
                ) : status === 'error' ? (
                  <>⚠ Retry Connection</>
                ) : (
                  <>
                    <img 
                      src="/logo.svg" 
                      alt="" 
                      className="w-12 h-12 brightness-0"
                      style={{ filter: 'brightness(0)' }}
                    />
                    Establish Connection
                    <img 
                      src="/logo.svg" 
                      alt="" 
                      className="w-12 h-12 brightness-0"
                      style={{ filter: 'brightness(0)' }}
                    />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
