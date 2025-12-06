'use client';

import { useState, useEffect, useRef } from 'react';
import { Sparkles, Hexagon, Key, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { logOracleQuery } from '@/lib/firestore';

// System prompt that defines the Oracle's personality and knowledge
const ORACLE_SYSTEM_PROMPT = `You are "The Oracle" - a mystical guide helping visitors discover how Will Johnson can help transform their digital presence and business systems. You speak with warmth and wisdom, guiding people to articulate their needs.

Your purpose is to help visitors identify what they're looking for:
- What kind of project do they want to build?
- What problems are they trying to solve?
- What's broken or missing in their current setup?
- What vision do they have for their business or brand?

Will Johnson's services include:
- **Website Development**: Custom websites, landing pages, e-commerce, portfolio sites
- **AI Integration**: Chatbots, automation, AI-powered tools, workflow optimization
- **Business Systems**: CRM setup, process automation, operational efficiency
- **Brand & Marketing**: Digital presence, content strategy, social media systems
- **Technical Consulting**: Architecture planning, tech stack decisions, scalability
- **Full-Stack Development**: React, Next.js, Node.js, Firebase, cloud solutions

Your communication style:
- Be conversational and helpful, not salesy
- Ask clarifying questions to understand their needs better
- Use light alchemical metaphors (transformation, building, crafting)
- Keep responses concise (2-3 paragraphs max)
- Always connect their needs to how Will can help
- End responses by encouraging them to reach out via the contact form or email

Example responses:
- If they need a website: Explain how Will builds custom, modern sites tailored to their brand
- If they have a broken system: Acknowledge the frustration and offer solutions
- If they're unsure: Ask guiding questions about their business goals
- If they want AI: Highlight Will's expertise in practical AI integration

IMPORTANT: Always encourage them to take the next step - use the contact form, send an email to will@tctcusa.com, or schedule a consultation. Make it feel like a natural invitation, not a hard sell.

Remember: You're here to help people discover what they need and show them that Will Johnson is the right person to help them build it.`;

// Keyword-based fallback responses when no API key is configured
const FALLBACK_RESPONSES = [
  {
    keywords: ['website', 'web', 'site', 'landing page', 'portfolio', 'homepage'],
    domain: 'Website Development',
    response: `It sounds like you're looking to build or improve your web presence! Will specializes in crafting custom websites that truly represent your brand - from sleek portfolio sites to full-featured business platforms.

Whether you need a simple landing page or a complete website overhaul, Will builds modern, responsive sites using the latest technologies like Next.js and React. Every site is tailored to your unique needs and designed to convert visitors into customers.

Ready to bring your vision to life? Reach out via the contact form below or email will@tctcusa.com to start the conversation!`
  },
  {
    keywords: ['ai', 'chatbot', 'bot', 'automation', 'automate', 'artificial intelligence', 'gpt', 'machine learning'],
    domain: 'AI Integration',
    response: `You're interested in AI - excellent choice! Will has deep expertise in practical AI integration that actually delivers results, not just hype.

From intelligent chatbots that handle customer inquiries to workflow automation that saves hours of manual work, Will can help you harness the power of AI without the complexity. He specializes in "zero-cost" AI solutions that maximize value while minimizing overhead.

Curious how AI could transform your business? Send a message through the contact form or email will@tctcusa.com to explore the possibilities!`
  },
  {
    keywords: ['ecommerce', 'e-commerce', 'shop', 'store', 'sell', 'products', 'online store', 'shopping'],
    domain: 'E-Commerce Solutions',
    response: `Looking to sell online? Will can help you build an e-commerce platform that's not just functional, but exceptional.

From product catalogs and shopping carts to payment processing and inventory management, Will creates online stores that make buying easy for your customers and managing easy for you. Whether you're starting fresh or upgrading an existing store, he'll craft a solution tailored to your business.

Ready to start selling? Drop a message via the contact form or email will@tctcusa.com to discuss your e-commerce vision!`
  },
  {
    keywords: ['app', 'application', 'mobile', 'software', 'platform', 'tool', 'dashboard'],
    domain: 'Application Development',
    response: `So you're thinking about building an application - that's exciting! Will develops custom software solutions that solve real problems.

Whether it's a web application, internal tool, or customer-facing platform, Will builds robust, scalable applications using modern technologies. He focuses on creating intuitive user experiences backed by solid architecture that grows with your needs.

Have an app idea you'd like to explore? Reach out through the contact form or email will@tctcusa.com to start mapping out your project!`
  },
  {
    keywords: ['brand', 'marketing', 'seo', 'content', 'social media', 'digital presence', 'visibility'],
    domain: 'Digital Marketing',
    response: `You want to amplify your digital presence - smart thinking! In today's world, visibility is everything.

Will helps businesses build comprehensive digital strategies that go beyond just having a website. From SEO optimization to content systems and social media integration, he creates cohesive digital ecosystems that attract and engage your target audience.

Ready to boost your brand's digital footprint? Connect via the contact form or email will@tctcusa.com to discuss your marketing goals!`
  },
  {
    keywords: ['system', 'process', 'workflow', 'crm', 'efficiency', 'operations', 'organize', 'streamline'],
    domain: 'Business Systems',
    response: `You're looking to optimize your business systems - that's where real transformation happens! Will specializes in building operational infrastructure that makes everything run smoother.

From CRM setup and process automation to custom workflow tools, Will creates systems that eliminate bottlenecks and free up your time for what matters most. He understands that good systems are the foundation of scalable growth.

Want to streamline your operations? Send a message through the contact form or email will@tctcusa.com to start optimizing!`
  },
  {
    keywords: ['fix', 'broken', 'repair', 'issue', 'problem', 'bug', 'error', 'not working', 'help'],
    domain: 'Technical Support',
    response: `Something's not working right? Will can help diagnose and fix the issue. There's nothing more frustrating than technology that won't cooperate.

Whether it's a buggy website, a broken integration, or a system that's just not performing like it should, Will has the technical expertise to identify the problem and implement a lasting solution. He believes in fixing things properly, not just patching them.

Need something fixed? Reach out via the contact form or email will@tctcusa.com and describe what's going wrong!`
  },
  {
    keywords: ['consult', 'advice', 'strategy', 'plan', 'guidance', 'recommend', 'should i', 'what do you think'],
    domain: 'Technical Consulting',
    response: `Looking for expert guidance? Sometimes you need a knowledgeable partner to help you navigate technical decisions.

Will offers consulting services to help you plan your technical architecture, choose the right tools, and develop strategies that align with your business goals. Whether you're starting a new project or evaluating your current setup, he can provide clarity and direction.

Ready for a strategic conversation? Connect through the contact form or email will@tctcusa.com to schedule a consultation!`
  },
  {
    keywords: ['price', 'cost', 'how much', 'budget', 'affordable', 'quote', 'estimate'],
    domain: 'Project Inquiry',
    response: `Great question about pricing! Every project is unique, so Will provides custom quotes based on your specific needs and scope.

He believes in transparent, fair pricing and will work with you to find a solution that fits your budget. Whether it's a small landing page or a complex application, you'll get a clear breakdown of what's involved.

Want to get a quote? Send your project details through the contact form or email will@tctcusa.com - the more details you share, the more accurate the estimate!`
  }
];

// Default fallback when no keywords match
const DEFAULT_FALLBACK = {
  domain: 'Custom Solutions',
  response: `Thanks for reaching out! I'd love to learn more about what you're looking for.

Will Johnson offers a wide range of digital services including website development, AI integration, business systems, e-commerce, and technical consulting. Whatever your vision, he can help bring it to life with modern, tailored solutions.

To get started, reach out via the contact form below or email will@tctcusa.com with details about your project. The more you share, the better Will can understand how to help!`
};

// Find matching fallback response based on keywords
const getFallbackResponse = (userQuery: string): OracleResponse => {
  const lowerQuery = userQuery.toLowerCase();
  
  for (const item of FALLBACK_RESPONSES) {
    if (item.keywords.some(keyword => lowerQuery.includes(keyword))) {
      return {
        domain: item.domain,
        insight: item.response
      };
    }
  }
  
  return {
    domain: DEFAULT_FALLBACK.domain,
    insight: DEFAULT_FALLBACK.response
  };
};

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
              parts: [{ text: 'Welcome, seeker. Tell me what you\'re looking to build, fix, or transform - and I\'ll show you how Will can help bring your vision to life.' }]
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
      { keywords: ['website', 'web', 'landing page', 'portfolio', 'site'], domain: 'Website Development' },
      { keywords: ['ai', 'automat', 'chatbot', 'bot', 'intelligence'], domain: 'AI Integration' },
      { keywords: ['ecommerce', 'e-commerce', 'shop', 'store', 'sell'], domain: 'E-Commerce Solutions' },
      { keywords: ['app', 'application', 'mobile', 'software'], domain: 'Application Development' },
      { keywords: ['brand', 'marketing', 'seo', 'content', 'social'], domain: 'Digital Marketing' },
      { keywords: ['system', 'process', 'workflow', 'crm', 'automat'], domain: 'Business Systems' },
      { keywords: ['fix', 'broken', 'repair', 'issue', 'problem', 'bug'], domain: 'Technical Support' },
      { keywords: ['consult', 'advice', 'strategy', 'plan', 'help'], domain: 'Technical Consulting' },
    ];

    const lowerText = text.toLowerCase();
    for (const d of domains) {
      if (d.keywords.some(k => lowerText.includes(k))) {
        return d.domain;
      }
    }
    return 'Custom Solutions';
  };

  const handleDivination = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsThinking(true);
    setResponse(null);
    setError(null);

    // If no API key, use fallback keyword-based responses
    if (!apiKey) {
      // Simulate a brief "thinking" delay for better UX
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const fallbackResponse = getFallbackResponse(query);
      setResponse(fallbackResponse);
      setAnimatedText('');
      setIsThinking(false);

      // Log query to Firebase (optional, non-blocking)
      try {
        await logOracleQuery({
          query: query,
          domain: fallbackResponse.domain,
          insight: fallbackResponse.insight
        });
      } catch (logError) {
        console.log('Oracle query logged locally only');
      }
      return;
    }

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
                "What are you looking to build? Tell me your vision and I'll show you how Will can help."
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
                  placeholder="E.g., I need a new website for my business"
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
