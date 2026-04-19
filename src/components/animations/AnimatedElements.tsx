import { motion } from 'framer-motion';
import React from 'react';

interface AnimatedTextProps {
  children: string;
  className?: string;
  delay?: number;
}

export function AnimatedText({ children, className = '', delay = 0 }: AnimatedTextProps) {
  const words = children.split(' ');

  return (
    <motion.div initial="hidden" animate="visible" className={className}>
      {words.map((word, idx) => (
        <motion.span
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: delay + idx * 0.05,
            duration: 0.5,
            ease: 'easeOut'
          }}
          className="inline-block mr-1"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}

interface FadeInUpProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
}

export function FadeInUp({ children, delay = 0, duration = 0.8 }: FadeInUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

interface ScaleInProps {
  children: React.ReactNode;
  delay?: number;
}

export function ScaleIn({ children, delay = 0 }: ScaleInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: React.ReactNode[];
  staggerDelay?: number;
  initialDelay?: number;
}

export function StaggerContainer({ children, staggerDelay = 0.1, initialDelay = 0 }: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: initialDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

interface GlowBoxProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function GlowBox({ children, delay = 0, className = '' }: GlowBoxProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      className={`bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl hover:border-gold/30 transition-all ${className}`}
    >
      {children}
    </motion.div>
  );
}

interface CountUpProps {
  from: number;
  to: number;
  duration?: number;
  delay?: number;
  suffix?: string;
  prefix?: string;
}

export function CountUp({ from, to, duration = 2, delay = 0, suffix = '', prefix = '' }: CountUpProps) {
  const [count, setCount] = React.useState(from);

  React.useEffect(() => {
    let start: number | null = null;
    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = (timestamp - start) / (duration * 1000);
      const current = Math.floor(from + (to - from) * progress);
      setCount(Math.min(current, to));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const timeout = setTimeout(() => {
      requestAnimationFrame(animate);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [from, to, duration, delay]);

  return (
    <span>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

interface SlideInProps {
  children: React.ReactNode;
  direction?: 'left' | 'right';
  delay?: number;
  className?: string;
}

export function SlideIn({ children, direction = 'left', delay = 0, className = '' }: SlideInProps) {
  const initialX = direction === 'left' ? -50 : 50;

  return (
    <motion.div
      initial={{ opacity: 0, x: initialX }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface FloatingProps {
  children: React.ReactNode;
  duration?: number;
  className?: string;
}

export function Floating({ children, duration = 3, className = '' }: FloatingProps) {
  return (
    <motion.div
      animate={{
        y: [0, -20, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface PulseGlowProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function PulseGlow({ children, delay = 0, className = '' }: PulseGlowProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      className={className}
      animate={{
        boxShadow: [
          '0 0 20px rgba(201, 168, 76, 0.1)',
          '0 0 40px rgba(201, 168, 76, 0.3)',
          '0 0 20px rgba(201, 168, 76, 0.1)',
        ],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
}
