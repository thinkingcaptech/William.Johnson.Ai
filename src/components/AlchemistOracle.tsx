'use client';

import { useState, useEffect, useRef } from 'react';
import { Sparkles, Hexagon } from 'lucide-react';
import { logOracleQuery } from '@/lib/firestore';

// Enhanced knowledge base with comprehensive service keywords
const ORACLE_KNOWLEDGE_BASE = [
  {
    keywords: [
      'hire', 'hiring', 'team', 'employee', 'staff', 'turnover', 'recruit', 
      'culture', 'onboarding', 'retention', 'human resources', 'hr', 
      'management', 'people', 'talent', 'training', 'development'
    ],
    domain: 'Human Systems Architecture',
    insight: "You face the challenge of the Human Element. We deploy the '90-Day Onboarding Protocol' and 'Psychological Management Frameworks' from my HR Development System. I will reduce turnover by aligning internal culture with external brand promises, transforming your team into a self-reinforcing engine of growth. We build systems where people naturally excel."
  },
  {
    keywords: [
      'scale', 'growth', 'expand', 'franchise', 'locations', 'multi-unit',
      'scaling', 'expansion', 'replicate', 'multiply', 'grow', 'bigger',
      'nationwide', 'regional', 'standardize', 'systemize'
    ],
    domain: 'Geometric Scaling Architecture',
    insight: "You seek the 'Geometric Return'—where 1+1=3. Using principles from the 'Unified Synergy Framework', I architect systems where success compounds exponentially. By standardizing your 'Terra' (Operations) and amplifying your 'Aer' (Brand), we replicate excellence across multiple nodes without diluting quality. Every new location strengthens the whole."
  },
  {
    keywords: [
      'community', 'tribe', 'social', 'engagement', 'followers', 'users',
      'audience', 'fans', 'loyalty', 'membership', 'recurring', 'subscription',
      'retention', 'churn', 'activation', 'onboarding customers'
    ],
    domain: 'Community Alchemy & Tribal Systems',
    insight: "You need to transmute an audience into a Tribe. We implement the 'Community System Specification', utilizing 'Ignis' (Vision) to spark interest and 'Aqua' (Flow) to create fluid communication channels. We move beyond transactions to shared identity—where customers become evangelists and your brand becomes their story."
  },
  {
    keywords: [
      'car wash', 'wash', 'automotive', 'service', 'retail', 'membership',
      'subscription service', 'high volume', 'throughput', 'efficiency',
      'customer experience', 'operations', 'workflow'
    ],
    domain: 'Operational Excellence & Service Systemization',
    insight: "For high-volume service models, I apply the '3-Minute Smile' protocol and 'AI-Optimized Efficiency Systems'. We optimize throughput while elevating customer experience to generate recurring membership revenue. Every touchpoint becomes a retention mechanism. Your operation becomes a precision instrument."
  },
  {
    keywords: [
      'marketing', 'leads', 'sales', 'revenue', 'profit', 'money', 'customers',
      'advertising', 'funnel', 'conversion', 'traffic', 'seo', 'social media',
      'content', 'brand', 'awareness', 'positioning', 'messaging'
    ],
    domain: 'The Alchemy of Influence & Conversion',
    insight: "You require the transmutation of Attention into Value. I deploy the 'Universal Trial Strategy' and 'Psychological Pricing Models'. By aligning your 'Ignis' (Vision) with market desires, we create a funnel that converts cold leads into devoted patrons. Every marketing dollar compounds through strategic positioning and irresistible offers."
  },
  {
    keywords: [
      'ai', 'artificial intelligence', 'automation', 'bot', 'chatbot',
      'machine learning', 'gpt', 'openai', 'claude', 'llm', 'assistant',
      'workflow', 'process', 'efficiency', 'productivity', 'optimize'
    ],
    domain: 'AI Integration & Automation Architecture',
    insight: "You seek to harness the power of Artificial Intelligence. I architect AI-augmented systems that don't replace humans but amplify them. From customer service chatbots to internal workflow automation, from content generation to data analysis—we build AI that serves your vision. The future is human+machine synergy."
  },
  {
    keywords: [
      'website', 'app', 'software', 'platform', 'build', 'develop',
      'code', 'programming', 'tech', 'technology', 'digital', 'online',
      'web', 'mobile', 'saas', 'tool', 'system', 'database'
    ],
    domain: 'Digital Infrastructure & Systems Engineering',
    insight: "You need digital infrastructure that scales with your vision. I build systems architecture—not just websites, but comprehensive platforms. React, Next.js, Firebase, AI integration—I transmute technical complexity into elegant solutions. Your digital presence becomes an asset that compounds in value, not a liability that requires constant maintenance."
  },
  {
    keywords: [
      'remote', 'work from home', 'distributed', 'virtual', 'online work',
      'freelance', 'contractor', 'consultant', 'outsource', 'offshore',
      'global', 'international', 'timezone'
    ],
    domain: 'Remote Systems & Distributed Architecture',
    insight: "You require expertise without geographical constraints. As a remote specialist, I've architected systems for distributed teams across continents. Time zones become advantages. Communication becomes asynchronous precision. I bring enterprise-level strategy with startup-level agility—all delivered remotely with military-grade discipline."
  },
  {
    keywords: [
      'strategy', 'consulting', 'advice', 'help', 'guidance', 'expert',
      'plan', 'roadmap', 'vision', 'goal', 'objective', 'problem',
      'solution', 'fix', 'improve', 'optimize', 'transform'
    ],
    domain: 'Strategic Transmutation & Business Alchemy',
    insight: "You stand at an inflection point. I conduct a comprehensive audit of your current 'Terra' (Infrastructure) and apply 'Ignis' (Vision) to restructure reality. We move from simple operations to a 'Unified Synergy Framework' that aligns your entire business organism. Strategy isn't planning—it's architecture of inevitability."
  },
  {
    keywords: [
      'zero cost', 'free', 'no budget', 'bootstrap', 'lean', 'minimal',
      'cheap', 'affordable', 'low cost', 'budget', 'roi', 'investment'
    ],
    domain: 'Zero-Cost Systems & Resourceful Engineering',
    insight: "Capital constraints don't limit vision—they refine it. I specialize in zero-cost tools and creative problem-solving. Firebase free tier, open-source frameworks, AI automation—I build enterprise systems with startup budgets. Constraints breed innovation. Limited resources demand elegant solutions."
  }
];

interface OracleResponse {
  domain: string;
  insight: string;
}

export default function AlchemistOracle() {
  const [query, setQuery] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [response, setResponse] = useState<OracleResponse | null>(null);
  const [animatedText, setAnimatedText] = useState('');
  const insightRef = useRef<HTMLDivElement>(null);

  const handleDivination = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsThinking(true);
    setResponse(null);

    // Simulate AI "Thinking" time
    setTimeout(async () => {
      const lowerQuery = query.toLowerCase();
      let match = ORACLE_KNOWLEDGE_BASE.find(k =>
        k.keywords.some(word => lowerQuery.includes(word))
      );

      const finalResponse: OracleResponse = match || {
        domain: 'Strategic Transmutation & Custom Synthesis',
        insight: "Your ambition is vast and unique, requiring custom synthesis of all four elements. I will audit your current 'Terra' (Infrastructure), apply 'Ignis' (Vision) to restructure your reality, deploy 'Aer' (Communication) to amplify your message, and channel 'Aqua' (Flow) to create seamless execution. We must move beyond templates to architect your specific inevitability. Contact me directly—your challenge demands personalized alchemy."
      };

      setResponse(finalResponse);
      setIsThinking(false);
      setAnimatedText('');

      // Log query to Firebase (optional, non-blocking)
      try {
        await logOracleQuery({
          query: query,
          domain: finalResponse.domain,
          insight: finalResponse.insight
        });
      } catch (error) {
        // Fail silently - logging shouldn't break user experience
        console.log('Oracle query logged locally only');
      }
    }, 1800);
  };

  // Ember animation effect
  useEffect(() => {
    if (response && insightRef.current) {
      const text = response.insight;
      let index = 0;
      const chunkSize = 3; // Characters per animation cycle
      
      const interval = setInterval(() => {
        if (index < text.length) {
          const chunk = text.slice(index, index + chunkSize);
          setAnimatedText(prev => prev + chunk);
          index += chunkSize;
        } else {
          clearInterval(interval);
        }
      }, 30); // Delay between chunks
      
      return () => clearInterval(interval);
    }
  }, [response]);

  return (
    <div className="relative w-full max-w-md p-1 rounded-xl bg-gradient-to-b from-alchemist-gold to-alchemist-maroon shadow-lg">
      <div className="bg-alchemist-darkest rounded-[10px] p-8 border border-alchemist-gold/30 flex flex-col items-center text-center relative overflow-hidden">
        
        {/* Decorative Sigil Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
          <Hexagon size={200} className="text-alchemist-gold animate-spin-slow" />
        </div>

        <div className="relative z-10 w-full">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="text-alchemist-gold" size={24} />
            <h3 className="font-orbitron text-xl tracking-widest text-alchemist-gold">
              THE ORACLE
            </h3>
            <Sparkles className="text-alchemist-gold" size={24} />
          </div>

          {!response && !isThinking && (
            <div className="space-y-6">
              <p className="text-alchemist-ash font-light italic">
                "State your ambition. I will consult the Codex to reveal the path."
              </p>
              <form onSubmit={handleDivination} className="space-y-4">
                <input
                  type="text"
                  placeholder="E.g., I want to scale my business..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-alchemist-dark border border-alchemist-maroon focus:border-alchemist-gold rounded-lg px-4 py-3 text-alchemist-parchment placeholder-gray-600 outline-none transition-all text-center font-serif"
                />
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg btn-gradient-gold font-bold font-orbitron tracking-widest hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] transition-all transform hover:-translate-y-1 shimmer-effect flex items-center justify-center gap-3"
                >
                  <img 
                    src="/logo.svg" 
                    alt="" 
                    className="w-12 h-12 brightness-0"
                    style={{ filter: 'brightness(0)' }}
                  />
                  DIVINE PATH
                  <img 
                    src="/logo.svg" 
                    alt="" 
                    className="w-12 h-12 brightness-0"
                    style={{ filter: 'brightness(0)' }}
                  />
                </button>
              </form>
            </div>
          )}

          {isThinking && (
            <div className="py-12 space-y-4">
              <div className="w-12 h-12 border-2 border-alchemist-gold border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-alchemist-gold text-sm tracking-widest animate-pulse">
                CONSULTING THE CODEX...
              </p>
            </div>
          )}

          {response && (
            <div className="space-y-4 animate-fade-in-up">
              <div className="text-xs uppercase tracking-[0.3em] text-alchemist-ash">
                DOMAIN: <span className="text-alchemist-gold">{response.domain}</span>
              </div>
              <div 
                ref={insightRef}
                className="oracle-scroll rounded-lg p-6 my-4"
              >
                <div className="scroll-text text-lg leading-relaxed">
                  "
                  {animatedText.split('').map((char, i) => (
                    <span 
                      key={i} 
                      className="ember-text"
                      style={{ animationDelay: `${i * 0.01}s` }}
                    >
                      {char}
                    </span>
                  ))}
                  "
                </div>
              </div>
              <button
                onClick={() => {
                  setResponse(null);
                  setQuery('');
                  setAnimatedText('');
                }}
                className="text-xs text-alchemist-gold hover:text-white underline underline-offset-4 mt-2"
              >
                ASK ANOTHER QUESTION
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
