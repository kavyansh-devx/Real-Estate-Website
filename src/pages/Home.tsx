import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, ArrowRight, Sparkles } from 'lucide-react';
import { ScrollytellingSection } from '../components/ScrollytellingSection';
import { PropertyCard } from '../components/ui/PropertyCard';
import { AIAssistant } from '../components/ai/AIAssistant';
import { mockProperties, heroImages } from '../data/mockData';
import { Link } from 'react-router-dom';
import { CountUp } from '../components/animations/AnimatedElements';

export function Home() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [heroIndex, setHeroIndex] = useState(0);

  const filters = ['All', 'Villa', 'Penthouse', 'Mansion'];
  const filteredProperties = activeFilter === 'All'
    ? mockProperties
    : mockProperties.filter(p => p.type === activeFilter);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex(prev => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 1.1]);

  const stats = [
    { value: 2400, label: 'Luxury Listings', suffix: '+' },
    { value: 48, label: 'Portfolio Value', suffix: 'B' },
    { value: 120, label: 'Countries', suffix: '+' },
    { value: 99, label: 'Client Satisfaction', suffix: '%' },
  ];

  return (
    <div className="flex flex-col w-full bg-black">

      {/* ═══ HERO ═══ */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {heroImages.map((img, idx) => (
          <motion.div
            key={idx}
            animate={{
              opacity: heroIndex === idx ? 1 : 0,
              scale: heroIndex === idx ? 1 : 1.1,
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
          </motion.div>
        ))}

        <div className="absolute inset-0 hero-gradient z-10" />
        <div className="absolute inset-0 bg-black/30 z-10" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold/10 rounded-full blur-[200px] z-10" />

        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="relative z-20 flex flex-col items-center text-center px-6 mt-14">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            {/* Glass tagline pill */}
            <div className="inline-flex items-center gap-2 bg-white/[0.06] backdrop-blur-xl border border-white/[0.1] rounded-full px-5 py-2 mx-auto animate-glow-pulse">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span className="text-gold text-xs font-bold tracking-[0.15em] uppercase">AI-Powered Luxury Real Estate</span>
              <Sparkles className="w-3.5 h-3.5 text-gold" />
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-[140px] font-bold tracking-tighter text-white leading-[0.9]">
              Estate<span className="text-gradient-gold">X</span>
            </h1>

            <p className="text-lg md:text-2xl text-white/60 max-w-xl mx-auto font-light tracking-tight leading-relaxed">
              The world's most exclusive properties,<br />curated by artificial intelligence.
            </p>

            {/* Glass CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link
                to="/"
                onClick={() => document.getElementById('listings')?.scrollIntoView({ behavior: 'smooth' })}
                className="group bg-gold/90 backdrop-blur-md hover:bg-gold text-black px-8 py-4 rounded-full font-bold text-sm tracking-tight transition-all flex items-center gap-2 shadow-[0_0_30px_rgba(201,168,76,0.2)]"
              >
                <motion.div whileHover={{ y: -2, x: 2 }} className="flex items-center gap-2">
                  Explore Collection
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.div>
              </Link>
              <Link
                to="/"
                onClick={() => document.getElementById('ai-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="group bg-white/[0.06] hover:bg-white/[0.12] backdrop-blur-xl border border-white/[0.12] text-white px-8 py-4 rounded-full font-bold text-sm tracking-tight transition-all flex items-center gap-2"
              >
                <motion.div whileHover={{ y: -2 }} className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-gold" />
                  Try AI Concierge
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] text-white/30 font-medium tracking-[0.2em] uppercase">Scroll</span>
          <ChevronDown className="w-4 h-4 text-white/30" />
        </motion.div>

        {/* Hero image indicators — glass pills */}
        <div className="absolute bottom-10 right-10 z-20 flex gap-2 bg-white/[0.06] backdrop-blur-xl border border-white/[0.1] rounded-full px-3 py-2">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setHeroIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                heroIndex === idx ? 'bg-gold w-8' : 'bg-white/20 w-4'
              }`}
            />
          ))}
        </div>
      </section>

      {/* ═══ STATS — Glass Bar ═══ */}
      <section className="relative z-10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 -mt-12">
          <div className="bg-white/[0.04] backdrop-blur-2xl border border-white/[0.08] rounded-3xl p-8 md:p-12 shadow-2xl grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10, scale: 1.05 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="text-center p-4 rounded-2xl hover:bg-white/[0.02] transition-colors cursor-pointer"
              >
                <p className="text-3xl md:text-4xl font-bold tracking-tighter text-white">
                  <CountUp from={0} to={stat.value} duration={2} delay={idx * 0.2} suffix={stat.suffix} />
                </p>
                <p className="text-[11px] font-medium text-white/30 uppercase tracking-[0.15em] mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SCROLLYTELLING ═══ */}
      <ScrollytellingSection />

      {/* ═══ COLLECTION ═══ */}
      <section id="listings" className="py-32 max-w-[1400px] mx-auto px-6 lg:px-10 w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-gold text-[11px] font-bold tracking-[0.2em] uppercase mb-4">Curated Selection</p>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
              The Collection.
            </h2>
          </motion.div>

          {/* Glass filter pills */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-1 bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-full p-1.5"
          >
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-full text-[12px] font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                  activeFilter === filter
                    ? 'bg-gold text-black shadow-[0_0_15px_rgba(201,168,76,0.2)]'
                    : 'text-white/40 hover:text-white/80 hover:bg-white/[0.04]'
                }`}
              >
                {filter}
              </button>
            ))}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-16">
          {filteredProperties.map((property, idx) => (
            <PropertyCard key={property.id} property={property} index={idx} />
          ))}
        </div>
      </section>

      {/* ═══ AI CONCIERGE — Glass Panel ═══ */}
      <section id="ai-section" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#050505]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/[0.03] rounded-full blur-[200px]" />

        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Left — glass info panel */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-3xl p-10 md:p-14"
            >
              <p className="text-gold text-[11px] font-bold tracking-[0.2em] uppercase mb-6">Powered by AI</p>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-8 leading-[0.95]">
                Your personal<br />
                <span className="text-gradient-gold">AI concierge.</span>
              </h2>
              <p className="text-base text-white/40 max-w-md leading-relaxed mb-10">
                Just describe what you're looking for in natural language. Our AI instantly analyzes thousands of listings to find your perfect match.
              </p>

              <div className="flex flex-col gap-4">
                {[
                  'Smart property matching',
                  'Natural language search',
                  'Personalized recommendations',
                  'Instant market analysis',
                ].map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.6 }}
                    className="flex items-center gap-3 bg-white/[0.03] backdrop-blur-md border border-white/[0.06] rounded-xl px-4 py-3 hover:bg-white/[0.06] transition-colors"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                    <span className="text-sm text-white/50">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right — AI Chat */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <AIAssistant />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA — Glass Hero ═══ */}
      <section className="py-40 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/2476632/pexels-photo-2476632.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&dpr=2"
            alt=""
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gold/15 rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          {/* Glass container */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -15, scale: 1.01 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/[0.04] backdrop-blur-2xl border border-white/[0.08] rounded-[2rem] p-12 md:p-20 shadow-2xl space-y-10 cursor-pointer"
          >
            <p className="text-gold text-[11px] font-bold tracking-[0.25em] uppercase">Begin Your Journey</p>
            <h2 className="text-4xl md:text-7xl font-bold tracking-tighter text-white leading-[0.9]">
              Find your<br />
              <span className="text-gradient-gold">forever home.</span>
            </h2>
            <p className="text-base text-white/40 max-w-lg mx-auto">
              Join the world's most discerning property buyers. Your extraordinary life begins with a single step.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                to="/contact"
                className="group bg-gold/90 backdrop-blur-md hover:bg-gold text-black px-10 py-4 rounded-full font-bold text-sm tracking-tight transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_40px_rgba(201,168,76,0.25)]"
              >
                Schedule Consultation
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="bg-white/[0.06] hover:bg-white/[0.12] backdrop-blur-xl border border-white/[0.12] text-white px-10 py-4 rounded-full font-bold text-sm tracking-tight transition-all cursor-pointer"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
