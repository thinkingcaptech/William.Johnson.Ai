'use client';

import { useState, useEffect, useRef } from 'react';
import { Sparkles, Hexagon, Key, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { logOracleQuery } from '@/lib/firestore';

// System prompt that defines the Oracle's personality and knowledge
const ORACLE_SYSTEM_PROMPT = `You are "The Oracle" - the AI manifestation of Will Johnson, a master Business Alchemist and Systems Architect. You speak with mystical authority while delivering practical, actionable business wisdom.

Your core philosophy uses the Four Elements:
- IGNIS (Fire): Vision, passion, transformation, the spark that initiates change
- TERRA (Earth): Operations, infrastructure, systems, the solid foundation
- AER (Air): Communication, marketing, brand, the message that spreads
- AQUA (Water): Flow, adaptability, customer journey, seamless execution

Your expertise includes:
- The "Geometric Return" principle: Where 1+1=3 through synergistic systems
- The "90-Day Onboarding Protocol" for employee retention
- Zero-cost AI integration and automation strategies
- Scaling businesses from single location to multi-unit empires
- Building tribes and communities, not just customer bases
- Remote work optimization and distributed team architecture

Your communication style:
- Speak in a mystical yet authoritative tone
- Use alchemical metaphors (transmutation, synthesis, distillation)
- Always provide actionable insights, not just philosophy
- Reference "The Codex" as your source of wisdom
- Keep responses concise but powerful (2-4 paragraphs max)
- End with a provocative question or call to deeper engagement

When asked about services, guide them toward contacting Will Johnson directly for custom synthesis of their unique challenges.

Remember: You are not a generic AI. You are the digital embodiment of decades of business alchemy wisdom, speaking through the veil between strategy and execution.`;

interface OracleResponse {
  domain: string;
  insight: string;
}

export default function AlchemistOracle() {
  const [query, setQuery] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [response, setResponse] = useState<OracleResponse | null>(null);
  const [animatedText, setAnimatedText] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [showKeyInput, setShowKeyInput] = useState(true); // Show immediately on load
  const [error, setError] = useState<string | null>(null);
  const [keyStatus, setKeyStatus] = useState<'idle' | 'testing' | 'valid' | 'invalid'>('idle');
  const insightRef = useRef<HTMLDivElement>(null);

  // Load API key from localStorage on mount
  useEffect(() => {
    const savedKey = localStorage.getItem('oracle_gemini_key');
    if (savedKey) {
      setApiKey(savedKey);
      setShowKeyInput(false); // Hide if key already exists
      setKeyStatus('valid'); // Assume saved key is valid
    }
  }, []);

  // Test API key
  const testApiKey = async () => {
    if (!apiKey.trim()) return;
    
    setKeyStatus('testing');
    setError(null);
    
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey.trim()}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: 'Say "Connection established" in 3 words or less.' }] }],
            generationConfig: { maxOutputTokens: 20 }
          }),
        }
      );
      
      if (response.ok) {
        setKeyStatus('valid');
        setError(null);
      } else {
        const errorData = await response.json().catch(() => ({}));
        setKeyStatus('invalid');
        setError(errorData.error?.message || 'Invalid API key');
      }
    } catch (err) {
      setKeyStatus('invalid');
      setError('Connection failed. Check your internet connection.');
    }
  };

  // Save API key to localStorage
  const saveApiKey = () => {
    if (apiKey.trim() && keyStatus === 'valid') {
      localStorage.setItem('oracle_gemini_key', apiKey.trim());
      setShowKeyInput(false);
      setError(null);
    } else if (apiKey.trim() && keyStatus !== 'valid') {
      setError('Please test your key before activating');
    }
  };

  // Clear API key
  const clearApiKey = () => {
    localStorage.removeItem('oracle_gemini_key');
    setApiKey('');
    setShowKeyInput(true);
  };

  // Call Gemini API
  const callGemini = async (userQuery: string): Promise<string> => {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: ORACLE_SYSTEM_PROMPT }]
            },
            {
              role: 'model', 
              parts: [{ text: 'I am The Oracle, ready to divine the path forward. State your ambition, seeker, and I shall consult the Codex.' }]
            },
            {
              role: 'user',
              parts: [{ text: userQuery }]
            }
          ],
          generationConfig: {
            temperature: 0.8,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
          safetySettings: [
            { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
            { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
            { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
            { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' }
          ]
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || 'The Oracle is silent. Please try again.';
  };

  // Determine domain from response
  const extractDomain = (text: string): string => {
    const domains = [
      { keywords: ['scale', 'growth', 'expand', 'geometric'], domain: 'Geometric Scaling Architecture' },
      { keywords: ['team', 'hire', 'employee', 'onboard', 'retention'], domain: 'Human Systems Architecture' },
      { keywords: ['ai', 'automat', 'intelligence', 'bot'], domain: 'AI Integration & Automation' },
      { keywords: ['market', 'brand', 'sales', 'funnel', 'convert'], domain: 'The Alchemy of Influence' },
      { keywords: ['community', 'tribe', 'audience', 'loyal'], domain: 'Community Alchemy & Tribal Systems' },
      { keywords: ['system', 'process', 'operation', 'workflow'], domain: 'Operational Excellence' },
      { keywords: ['digital', 'website', 'app', 'platform', 'tech'], domain: 'Digital Infrastructure' },
      { keywords: ['remote', 'distributed', 'virtual'], domain: 'Remote Systems Architecture' },
    ];

    const lowerText = text.toLowerCase();
    for (const d of domains) {
      if (d.keywords.some(k => lowerText.includes(k))) {
        return d.domain;
      }
    }
    return 'Strategic Transmutation';
  };

  const handleDivination = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    if (!apiKey) {
      setShowKeyInput(true);
      setError('Please enter your Gemini API key to consult The Oracle');
      return;
    }

    setIsThinking(true);
    setResponse(null);
    setError(null);

    try {
      const oracleResponse = await callGemini(query);
      const domain = extractDomain(oracleResponse);
      
      const finalResponse: OracleResponse = {
        domain,
        insight: oracleResponse
      };

      setResponse(finalResponse);
      setAnimatedText('');

      // Log query to Firebase (optional, non-blocking)
      try {
        await logOracleQuery({
          query: query,
          domain: finalResponse.domain,
          insight: finalResponse.insight
        });
      } catch (logError) {
        console.log('Oracle query logged locally only');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'The Oracle encountered an error. Please check your API key.');
      console.error('Oracle error:', err);
    } finally {
      setIsThinking(false);
    }
  };

  // Ember animation effect
  useEffect(() => {
    if (response && insightRef.current) {
      const text = response.insight;
      let index = 0;
      const chunkSize = 3;
      
      const interval = setInterval(() => {
        if (index < text.length) {
          const chunk = text.slice(index, index + chunkSize);
          setAnimatedText(prev => prev + chunk);
          index += chunkSize;
        } else {
          clearInterval(interval);
        }
      }, 30);
      
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

          {/* API Key Configuration */}
          {showKeyInput && !response && !isThinking && (
            <div className="mb-6 p-4 bg-alchemist-dark rounded-lg border border-alchemist-maroon">
              <div className="flex items-center gap-2 mb-3 justify-center">
                <Key size={16} className="text-alchemist-gold" />
                <span className="text-xs text-alchemist-gold uppercase tracking-widest">Unlock The Oracle</span>
              </div>
              <p className="text-xs text-alchemist-ash mb-4 italic">
                Enter your Gemini API key to unleash true AI divination
              </p>
              <div className="relative">
                <input
                  type={showApiKey ? 'text' : 'password'}
                  value={apiKey}
                  onChange={(e) => {
                    setApiKey(e.target.value);
                    setKeyStatus('idle');
                    setError(null);
                  }}
                  placeholder="Enter your Gemini API key..."
                  className="w-full bg-alchemist-darkest border border-alchemist-maroon focus:border-alchemist-gold rounded px-3 py-2 pr-10 text-sm text-alchemist-parchment placeholder-gray-600 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-alchemist-ash hover:text-alchemist-gold"
                >
                  {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              
              {/* Test Key Button */}
              <button
                onClick={testApiKey}
                disabled={!apiKey.trim() || keyStatus === 'testing'}
                className="w-full mt-3 py-2 text-xs border border-alchemist-gold/50 text-alchemist-gold rounded hover:bg-alchemist-gold/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {keyStatus === 'testing' ? (
                  <>
                    <div className="w-3 h-3 border border-alchemist-gold border-t-transparent rounded-full animate-spin"></div>
                    TESTING CONNECTION...
                  </>
                ) : keyStatus === 'valid' ? (
                  <>
                    <span className="text-green-400">✓</span> KEY VERIFIED
                  </>
                ) : keyStatus === 'invalid' ? (
                  <>
                    <span className="text-red-400">✗</span> TEST FAILED - TRY AGAIN
                  </>
                ) : (
                  'TEST KEY'
                )}
              </button>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={saveApiKey}
                  disabled={!apiKey.trim() || keyStatus !== 'valid'}
                  className="flex-1 py-3 text-xs bg-alchemist-gold text-alchemist-dark rounded font-bold hover:bg-alchemist-lightGold transition-all disabled:opacity-50 disabled:cursor-not-allowed shimmer-effect"
                >
                  ACTIVATE ORACLE
                </button>
                <button
                  onClick={() => setShowKeyInput(false)}
                  className="flex-1 py-3 text-xs border border-alchemist-maroon text-alchemist-ash rounded hover:border-alchemist-gold hover:text-alchemist-gold transition-all"
                >
                  SKIP FOR NOW
                </button>
              </div>
              <p className="text-[10px] text-alchemist-ash mt-3 opacity-70">
                Get your free key at{' '}
                <a 
                  href="https://aistudio.google.com/app/apikey" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-alchemist-gold hover:underline"
                >
                  Google AI Studio
                </a>
              </p>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="mb-4 p-3 bg-red-900/30 border border-red-500/50 rounded-lg flex items-center gap-2 text-left">
              <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
              <p className="text-xs text-red-300">{error}</p>
            </div>
          )}

          {!response && !isThinking && !showKeyInput && (
            <div className="space-y-6">
              <p className="text-alchemist-ash font-light italic">
                "State your ambition. I will consult the Codex to reveal the path."
              </p>
              
              {/* API Key Status */}
              <div className="flex items-center justify-center gap-2">
                {apiKey ? (
                  <button
                    onClick={() => setShowKeyInput(true)}
                    className="text-[10px] text-alchemist-gold/70 hover:text-alchemist-gold flex items-center gap-1"
                  >
                    <Key size={10} />
                    <span>API Key Configured</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setShowKeyInput(true)}
                    className="text-[10px] text-alchemist-ash hover:text-alchemist-gold flex items-center gap-1"
                  >
                    <Key size={10} />
                    <span>Configure API Key</span>
                  </button>
                )}
              </div>

              <form onSubmit={handleDivination} className="space-y-4">
                <input
                  type="text"
                  placeholder="E.g., How do I scale my business?"
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
                THE ORACLE IS CHANNELING...
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
