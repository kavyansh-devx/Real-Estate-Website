import { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

const sections = [
  {
    title: 'Space.',
    subtitle: 'Redefined.',
    description: 'Every square foot is designed with intention. Open floor plans that breathe, ceilings that soar, and views that never end.',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&dpr=2',
    accent: 'from-blue-500/30 to-cyan-500/10',
    number: '01',
  },
  {
    title: 'Light.',
    subtitle: 'Perfected.',
    description: 'Floor-to-ceiling glass captures every sunrise and sunset. Smart-glass technology adapts to your mood, your moment.',
    image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&dpr=2',
    accent: 'from-amber-500/30 to-orange-500/10',
    number: '02',
  },
  {
    title: 'Welcome',
    subtitle: 'home.',
    description: 'Pro-level amenities. Extraordinary materials. The most powerful AI assistant ever built — to find your perfect estate.',
    image: 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&dpr=2',
    accent: 'from-purple-500/30 to-pink-500/10',
    number: '03',
  },
];

export function ScrollytellingSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Map scroll progress to index with buffers at both ends
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    let newIndex = 0;
    if (latest < 0.3) newIndex = 0;      // Top buffer: stay on 1st slide
    else if (latest < 0.6) newIndex = 1; // Middle slide
    else newIndex = 2;                  // Bottom buffer: stay on 3rd slide

    if (newIndex !== activeIndex) {
      setDirection(newIndex > activeIndex ? 1 : -1);
      setActiveIndex(newIndex);
    }
  });

  const current = sections[activeIndex];

  const textVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      y: dir > 0 ? 40 : -40,
      scale: 0.95,
    }),
    center: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
    exit: (dir: number) => ({
      opacity: 0,
      y: dir > 0 ? -40 : 40,
      scale: 0.95,
    }),
  };

  return (
    <div ref={containerRef} className="relative h-[500vh] w-full bg-black">
      {/* Sticky container - 56px is navbar height */}
      <div className="sticky top-[56px] h-[calc(100vh-56px)] w-full overflow-hidden">
        
        {/* Background images — crossfade */}
        {sections.map((s, idx) => (
          <motion.div
            key={idx}
            initial={false}
            animate={{ 
              opacity: activeIndex === idx ? 1 : 0,
              scale: activeIndex === idx ? 1 : 1.1,
              filter: activeIndex === idx ? 'blur(0px)' : 'blur(10px)'
            }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <img 
              src={s.image} 
              alt={s.title} 
              className="w-full h-full object-cover" 
            />
          </motion.div>
        ))}

        {/* Dark overlay with dynamic intensity */}
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10" />

        {/* Accent glows */}
        {sections.map((s, idx) => (
          <motion.div
            key={idx}
            animate={{ opacity: activeIndex === idx ? 0.4 : 0 }}
            transition={{ duration: 1 }}
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full blur-[200px] z-10 bg-gradient-to-t ${s.accent}`}
          />
        ))}

        {/* Glass Content Card */}
        <div className="absolute inset-0 z-20 flex items-center justify-center px-6">
          <div className="relative w-full max-w-4xl">
            <motion.div 
              layout
              whileHover={{ y: -8, scale: 1.01 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white/[0.03] backdrop-blur-3xl border border-white/[0.08] rounded-[2.5rem] shadow-[0_24px_80px_rgba(0,0,0,0.5)] overflow-hidden"
            >
              {/* Content Area */}
              <div className="relative h-[400px] md:h-[500px] flex items-center justify-center">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={activeIndex}
                    custom={direction}
                    variants={textVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 md:px-20"
                  >
                    <motion.span 
                      initial={{ opacity: 0, letterSpacing: '0.5em' }}
                      animate={{ opacity: 1, letterSpacing: '0.3em' }}
                      className="text-gold text-xs font-black uppercase mb-8"
                    >
                      {current.number} / 03
                    </motion.span>
                    
                    <h2 className="text-5xl md:text-[100px] font-bold tracking-tighter text-white leading-[0.85] mb-8">
                      {current.title}<br />
                      <span className="text-gradient-gold">{current.subtitle}</span>
                    </h2>
                    
                    <p className="text-base md:text-lg text-white/50 max-w-md leading-relaxed font-light">
                      {current.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Enhanced Progress Bar */}
              <div className="border-t border-white/[0.06] bg-black/20 px-10 py-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {sections.map((_, idx) => (
                    <div 
                      key={idx}
                      className="relative h-1 w-12 bg-white/10 rounded-full overflow-hidden"
                    >
                      <motion.div
                        animate={{ 
                          width: activeIndex === idx ? '100%' : (activeIndex > idx ? '100%' : '0%'),
                          opacity: activeIndex === idx ? 1 : 0.4
                        }}
                        className="absolute inset-0 bg-gold"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-[10px] text-white/30 font-bold tracking-widest uppercase">
                    Scroll to Explore
                  </span>
                  <div className="w-px h-4 bg-white/10" />
                  <span className="text-gold text-xs font-black">
                    {String(activeIndex + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Side Progress Indicators */}
        <div className="absolute left-10 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col gap-8">
          {sections.map((s, idx) => (
            <div key={idx} className="flex items-center gap-4 group cursor-pointer">
              <motion.div
                animate={{ 
                  scale: activeIndex === idx ? 1 : 0.8,
                  opacity: activeIndex === idx ? 1 : 0.2
                }}
                className={`w-1 h-12 rounded-full ${activeIndex === idx ? 'bg-gold' : 'bg-white'}`}
              />
              <span className={`text-[10px] font-black tracking-tighter transition-all duration-500 ${activeIndex === idx ? 'text-gold opacity-100' : 'text-white opacity-0'}`}>
                {s.number}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
