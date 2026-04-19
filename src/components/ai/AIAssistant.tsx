import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowUp } from 'lucide-react';

const smartReplies = [
  "Based on your preferences, I've found 3 exceptional properties with infinity pools under $15M in Dubai Marina. Shall I show you the options?",
  "I've curated a selection of ultra-modern penthouses in Beverly Hills. Each features floor-to-ceiling glass and smart-home automation. Want me to schedule virtual tours?",
  "Looking at your criteria, the Lumina Sky in Monaco stands out — ocean panoramas, private beach access, and $25M. It's one of our most exclusive listings.",
  "I've identified 2 off-market properties matching your description. These are invitation-only listings not visible to the public. Shall I connect you with the agent?",
];

export function AIAssistant() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: 'Welcome to EstateX Intelligence. Describe your dream property — I\'ll find it for you.' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [replyIndex, setReplyIndex] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setMessages(prev => [...prev, { role: 'user', text: query }]);
    setQuery('');
    setIsTyping(true);

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { role: 'ai', text: smartReplies[replyIndex % smartReplies.length] }
      ]);
      setReplyIndex(prev => prev + 1);
      setIsTyping(false);
    }, 1800);
  };

  return (
    <motion.div 
      whileHover={{ y: -10, scale: 1.01 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white/[0.04] backdrop-blur-2xl border border-white/[0.08] rounded-3xl p-6 md:p-8 w-full mx-auto shadow-2xl glow-border"
    >
      {/* Header — glass sub-panel */}
      <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/[0.06]">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-gold to-gold-light flex items-center justify-center shadow-[0_0_20px_rgba(201,168,76,0.2)]">
          <Sparkles className="w-5 h-5 text-black" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-white tracking-tight">EstateX Intelligence</h3>
          <p className="text-[11px] text-white/30 font-medium">AI-Powered Property Concierge</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5 bg-emerald-500/10 backdrop-blur-md border border-emerald-500/20 rounded-full px-3 py-1">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] text-emerald-400/80 font-medium">Online</span>
        </div>
      </div>

      {/* Messages */}
      <div className="space-y-4 mb-6 h-72 overflow-y-auto pr-2 custom-scrollbar">
        {messages.map((msg, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] p-4 text-[14px] leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-gold/90 backdrop-blur-md text-black rounded-2xl rounded-tr-sm font-medium'
                  : 'bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] text-white/80 rounded-2xl rounded-tl-sm'
              }`}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
            <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl rounded-tl-sm px-5 py-4 flex gap-1.5 items-center">
              <span className="w-2 h-2 rounded-full bg-gold/60 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 rounded-full bg-gold/60 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 rounded-full bg-gold/60 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </motion.div>
        )}
      </div>

      {/* Input — glass */}
      <form onSubmit={handleSubmit} className="relative flex items-center bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-1.5 focus-within:border-gold/30 transition-colors">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Describe your dream property..."
          className="flex-1 bg-transparent border-none px-4 py-3 text-white placeholder-white/30 focus:outline-none text-[14px]"
        />
        <button
          type="submit"
          disabled={!query.trim()}
          className="bg-gold/90 backdrop-blur-md hover:bg-gold disabled:opacity-30 disabled:cursor-not-allowed text-black p-2.5 rounded-xl transition-all cursor-pointer shadow-[0_0_15px_rgba(201,168,76,0.15)]"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </form>
    </motion.div>
  );
}
