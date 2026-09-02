'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, Bot, Trash2, ArrowRight } from 'lucide-react';
import { useFitPrint } from '@/lib/context';

interface ActionButton {
  label: string;
  href: string;
}

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  quickPrompts?: string[];
  actions?: ActionButton[];
}

const KNOWLEDGE_BASE: Array<{ keywords: string[]; answer: string; prompts?: string[]; actions?: ActionButton[] }> = [
  {
    keywords: ['what is fitprint', 'about fitprint', 'what does fitprint do', 'explain fitprint', 'how fitprint works'],
    answer: 'FitPrint is an AI powered Universal Fit Intelligence Platform. We solve the problem of inconsistent clothing sizes across brands (where you might be Medium in H&M but Large in Zara).\n\nCore Concept:\nONE BODY → ONE FITPRINT → EVERY BRAND → THE RIGHT FIT\n\nFitPrint does not sell clothes. It is a technology platform that compares your personal Fit Identity against brand sizing systems.',
    prompts: ['How is my size calculated?', 'Why do brands have different sizes?', 'What brands are supported?'],
    actions: [{ label: 'Create My FitPrint', href: '/create' }],
  },
  {
    keywords: ['problem', 'why fitprint', 'inconsistent', 'wrong size', 'returns'],
    answer: 'Clothing sizes are not universal across brands. A person may wear Medium in one brand but Large in another. Traditional size charts force users to compare measurements manually every time they shop, causing wrong size purchases and high return rates. FitPrint connects your body profile directly to brand size charts.',
    prompts: ['Why do brands have different sizes?', 'How does FitPrint solve this?'],
    actions: [{ label: 'Compare Brands Live', href: '/compare' }],
  },
  {
    keywords: ['how is my size calculated', 'how size is calculated', 'algorithm', 'recommendation engine', 'scoring', 'chest', 'waist'],
    answer: 'Our recommendation engine calculates compatibility using weighted multi point body scoring:\n• Chest Fit: 35%\n• Shoulder Fit: 30%\n• Waist Fit: 20%\n• Hips Fit: 15%\n\nIt compares your measurements against brand size charts, factors in your fit preference (Slim, Regular, Relaxed, Oversized), and adjusts over time based on your post purchase fit feedback.',
    prompts: ['What is Fit Confidence?', 'How accurate is FitPrint?'],
    actions: [{ label: 'Try Interactive Demo', href: '/demo' }],
  },
  {
    keywords: ['smart fit profile', 'manual', 'measurements', 'height', 'weight', 'chest'],
    answer: 'Smart Fit Profile is Method 01 to build your FitPrint. You enter your body measurements (Chest, Waist, Hips, Shoulders) and fit preference style. FitPrint uses this data to generate your universal Fit Identity (e.g. FP-8294) for brand matching.',
    prompts: ['How does AI Body Analysis work?', 'Build Smart Profile'],
    actions: [{ label: 'Build Smart Profile', href: '/create' }],
  },
  {
    keywords: ['ai assisted body analysis', 'ai body analysis', 'photo', 'camera', 'upload photo', 'estimation'],
    answer: 'AI Body Analysis is Method 02 to build your FitPrint. You upload a full body photo, and our computer vision landmark engine estimates body proportions. Note: This is an AI assisted estimation for fit guidance, not medical grade measurement. Uploaded images are processed in-memory and NEVER stored.',
    prompts: ['Is AI Body Analysis private?', 'Try AI Analysis now'],
    actions: [{ label: 'Try AI Body Analysis', href: '/ai-analysis' }],
  },
  {
    keywords: ['privacy', 'security', 'data usage', 'store photo', 'server'],
    answer: 'Your privacy is guaranteed. Photos uploaded during AI Body Analysis are processed ephemerally in-memory for real time landmark detection and are NEVER saved or stored on any server. Your measurement profile is stored locally in your browser via localStorage.',
    prompts: ['How accurate is FitPrint?', 'Create My FitPrint'],
  },
  {
    keywords: ['why do brands have different sizes', 'different sizes', 'zara vs h&m', 'size difference'],
    answer: 'Sizes differ because brands target different regional body silhouettes and use different garment patterns, armhole cuts, and sizing standards. For example, Zara follows a slim European cut with narrower chest allowances (often requiring a size up), while H&M uses a standard European cut with more relaxed chest room.',
    prompts: ['Compare H&M vs Zara', 'View Brand Library'],
    actions: [{ label: 'Compare Brands', href: '/compare' }],
  },
  {
    keywords: ['confidence', 'fit confidence', 'accuracy', 'how accurate'],
    answer: 'Fit Confidence represents how closely your body profile matches available brand size chart tolerances (e.g., 94% Match). Higher confidence indicates an optimal measurement alignment. Our platform boasts a 94% verified fit accuracy rating based on user purchase feedback.',
    prompts: ['How does adaptive feedback work?', 'Compare Brands'],
  },
  {
    keywords: ['feedback', 'adaptive fit learning', 'how did it fit', 'learning'],
    answer: 'After receiving size recommendations or trying garments, you can submit fit feedback (Perfect Fit, Slightly Tight, Slightly Loose, Too Small, Too Large). FitPrint dynamically adjusts future size recommendation weightings for that specific brand and garment category.',
    prompts: ['Try Demo & Feedback', 'View Dashboard'],
    actions: [{ label: 'Try Feedback Demo', href: '/demo' }],
  },
  {
    keywords: ['brand library', 'what brands are supported', 'supported brands', '50 brands', 'nike', 'adidas', 'levis'],
    answer: 'FitPrint supports 50 popular brands including:\n• Global Fashion: H&M, Zara, Uniqlo, GAP, Marks & Spencer, Mango\n• Indian Online Fashion: Roadster, HRX, Highlander, WROGN, Mast & Harbour\n• Sports: Nike, Adidas, Puma, Reebok, Skechers, Under Armour, New Balance\n• Denim: Levi\'s, Lee, Wrangler, Flying Machine, Pepe Jeans, Spykar\n• Ethnic: Manyavar, Biba, W, Aurelia, Fabindia\n• Premium: Tommy Hilfiger, Calvin Klein, Lacoste, Superdry',
    prompts: ['Search Brand Library', 'Compare Brands'],
    actions: [{ label: 'Explore Brand Library', href: '/brands' }],
  },
  {
    keywords: ['guest mode', 'demo', 'hackathon', 'judge', 'without login'],
    answer: 'Guest Mode allows hackathon judges and visitors to explore FitPrint instantly without registration! All features — Smart Profile creation, AI Photo Scanning, 50+ Brand Comparison, and Dashboard — work seamlessly in Guest Mode with sample demo profiles.',
    prompts: ['Try Demo Product', 'Compare Brands'],
    actions: [{ label: 'Try Interactive Demo', href: '/demo' }],
  },
  {
    keywords: ['how to find my size', 'how do i check my size', 'how to navigate', 'guide me', 'where to start'],
    answer: 'Finding your size is easy in 3 steps:\n1. Create your FitPrint via Smart Fit Profile or AI Body Analysis.\n2. Open Compare Brands and select a clothing category (T-Shirt, Shirt, Hoodie, Jeans).\n3. Select the brands you want to test and click "Analyze My Fit"!',
    prompts: ['Create My FitPrint', 'Compare Brands'],
    actions: [
      { label: 'Create My FitPrint', href: '/create' },
      { label: 'Compare Brands', href: '/compare' },
    ],
  },
];

export default function FitAiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [showLabel, setShowLabel] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-welcome',
      sender: 'bot',
      text: "Hi! I'm FIT AI 👋\n\nI'm here to help you understand FitPrint and find your perfect fit.\n\nAsk me anything about sizing, brands, FitPrint, or how the platform works.",
      timestamp: 'Just now',
      quickPrompts: [
        '• How does FitPrint work?',
        '• How is my size calculated?',
        '• Why do brands have different sizes?',
        '• How accurate is FitPrint?',
        '• What brands are supported?',
      ],
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { profile } = useFitPrint();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Context-aware assistant hint based on current page
  const getRouteContextHint = () => {
    if (pathname === '/create') {
      return 'Need help creating your FitPrint? Enter your measurements carefully for the most personalized recommendation.';
    }
    if (pathname === '/ai-analysis') {
      return 'For better analysis, upload a clear image and provide accurate supporting information.';
    }
    if (pathname === '/compare') {
      return 'Select a clothing category and one or more brands, then click Analyze My Fit.';
    }
    if (pathname === '/brands') {
      return 'Search across 50+ brands or filter by category in the Brand Library.';
    }
    if (pathname === '/dashboard') {
      return 'Welcome to your Personal Fit Identity Hub! View your saved dimensions and recommendation history.';
    }
    return null;
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  function handleSend(textToSend?: string) {
    const query = (textToSend || input).trim().replace(/^[•\s]+/, '');
    if (!query) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = generateBotResponse(query);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 500);
  }

  function generateBotResponse(query: string): Message {
    const q = query.toLowerCase();

    // Match Knowledge Base
    const match = KNOWLEDGE_BASE.find(item => item.keywords.some(k => q.includes(k)));

    let text = match
      ? match.answer
      : "I'm FIT AI, your personal FitPrint assistant. I can help you understand clothing sizes, your FitPrint profile, brand comparisons, and how this platform works. Try asking 'How does FitPrint work?' or 'Why do brands have different sizes?'";

    // Personalization check
    if (q.includes('my profile') || q.includes('my fitprint')) {
      if (profile) {
        text = `Your FitPrint profile is active! Body profile: **${profile.bodyProfile}** (${profile.fitPreference} fit preference). Chest: **${profile.measurements.chest} cm**. Head to Compare Brands to test your profile across 50+ brands!`;
      } else {
        text = `You haven't created a FitPrint profile yet! Build your profile via Smart Measurements or AI Body Analysis.`;
      }
    }

    return {
      id: `bot-${Date.now()}`,
      sender: 'bot',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickPrompts: match?.prompts || ['How does FitPrint work?', 'Why do brands have different sizes?', 'What brands are supported?'],
      actions: match?.actions || [{ label: 'Compare Brands', href: '/compare' }],
    };
  }

  function clearHistory() {
    setMessages([
      {
        id: 'msg-welcome-new',
        sender: 'bot',
        text: "Hi! I'm FIT AI 👋\n\nChat history cleared. What would you like to know about FitPrint?",
        timestamp: 'Just now',
        quickPrompts: [
          '• How does FitPrint work?',
          '• How is my size calculated?',
          '• Why do brands have different sizes?',
        ],
      },
    ]);
  }

  const routeHint = getRouteContextHint();

  return (
    <>
      {/* Floating AI Trigger Button (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-[9999] flex items-center gap-3 pointer-events-auto">
        {/* Label Chip */}
        <AnimatePresence>
          {showLabel && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="px-3.5 py-1.5 rounded-full bg-[#1E1714] border border-[#C49A6C]/40 text-[#F5EFE8] font-mono text-xs font-semibold tracking-wider shadow-xl hidden sm:block pointer-events-none"
            >
              Ask FIT AI
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dark Espresso Gold Button */}
        <button
          type="button"
          onClick={() => setIsOpen(v => !v)}
          className="relative flex items-center gap-2.5 px-4 py-3 rounded-full shadow-2xl transition-all duration-300 cursor-pointer group hover:scale-105 active:scale-95 bg-gradient-to-r from-[#C49A6C] to-[#9C735D] border border-[#C49A6C]"
        >
          <div className="relative w-5 h-5 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-[#120E0C]" />
          </div>
          <span className="font-display font-black text-[#120E0C] text-xs tracking-wider uppercase pr-1">
            {isOpen ? 'Close' : 'FIT AI'}
          </span>
        </button>
      </div>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-4 sm:right-6 z-[9999] w-[94vw] sm:w-[420px] h-[560px] rounded-2xl flex flex-col overflow-hidden shadow-2xl border border-[rgba(196,154,108,0.25)] bg-[#1E1714] pointer-events-auto text-[#F5EFE8]"
          >
            {/* Header */}
            <div className="p-4 border-b border-[rgba(196,154,108,0.2)] flex items-center justify-between bg-[#2A201C] text-[#F5EFE8]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#C49A6C] to-[#9C735D] flex items-center justify-center shadow-glow">
                  <Bot className="w-5 h-5 text-[#120E0C]" />
                </div>
                <div>
                  <div className="font-display font-bold text-[#F5EFE8] text-sm flex items-center gap-2">
                    FIT AI
                    <span className="flex items-center gap-1 text-[10px] font-mono text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded-full border border-cyan-500/40">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" /> Online
                    </span>
                  </div>
                  <div className="text-[#B9A99D] text-[10px] font-mono">Your Personal Fit Assistant</div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={clearHistory}
                  title="Clear Chat History"
                  className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Context-Aware Hint Bar */}
            {routeHint && (
              <div className="bg-[#0047FF]/20 border-b border-[#0047FF]/30 px-4 py-2 text-[11px] text-[#0047FF] font-medium flex items-center gap-2 font-mono">
                <span>💡 {routeHint}</span>
              </div>
            )}

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs scrollbar-thin">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-end gap-2 max-w-[88%]">
                    {msg.sender === 'bot' && (
                      <div className="w-6 h-6 rounded-lg bg-[#0047FF]/30 border border-[#0047FF]/50 flex items-center justify-center flex-shrink-0 text-[10px] text-[#0047FF] font-bold mb-1">
                        AI
                      </div>
                    )}
                    <div
                      className={`p-3.5 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                        msg.sender === 'user'
                          ? 'bg-[#0047FF] text-white rounded-br-none font-medium shadow-md'
                          : 'bg-white/5 border border-white/10 text-white/90 rounded-bl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                  <span className="text-[9px] text-white/30 mt-1 px-1 font-mono">{msg.timestamp}</span>

                  {/* Clickable Action Buttons */}
                  {msg.actions && msg.sender === 'bot' && (
                    <div className="flex flex-wrap gap-2 mt-2 max-w-[90%]">
                      {msg.actions.map((act, i) => (
                        <button
                          type="button"
                          key={i}
                          onClick={() => {
                            setIsOpen(false);
                            router.push(act.href);
                          }}
                          className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#0047FF] hover:bg-[#0038CC] text-white flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                        >
                          <span>{act.label}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Quick Prompts */}
                  {msg.quickPrompts && msg.sender === 'bot' && (
                    <div className="flex flex-wrap gap-1.5 mt-2 max-w-[90%]">
                      {msg.quickPrompts.map((prompt, i) => (
                        <button
                          type="button"
                          key={i}
                          onClick={() => handleSend(prompt)}
                          className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-medium bg-white/5 hover:bg-[#0047FF]/20 border border-white/10 hover:border-[#0047FF]/40 text-white/70 hover:text-white transition-all text-left cursor-pointer"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-white/40 text-xs italic font-mono">
                  <div className="w-6 h-6 rounded-lg bg-[#0047FF]/30 flex items-center justify-center text-[#0047FF] font-bold text-[10px]">
                    AI
                  </div>
                  <span>FIT AI is thinking...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 border-t border-white/10 bg-black/80 flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask FIT AI anything about sizing..."
                value={input}
                onChange={e => setInput(e.target.value)}
                className="flex-1 bg-white/5 border border-white/10 focus:border-[#0047FF] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/30 outline-none transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="w-9 h-9 rounded-xl bg-[#0047FF] hover:bg-[#0038CC] disabled:opacity-40 flex items-center justify-center text-white transition-all flex-shrink-0 cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
