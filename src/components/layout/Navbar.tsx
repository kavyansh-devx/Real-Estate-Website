import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useStore } from '../../store/useStore';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const wishlistCount = useStore((state) => state.wishlist.length);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Discover', path: '/' },
    { name: 'Consultants', path: '/consultants' },
    { name: 'Contact', path: '/contact' },
    { name: 'Collection', path: '/wishlist' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-500',
        isScrolled
          ? 'bg-black/80 backdrop-blur-2xl border-b border-white/[0.06]'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-gold to-gold-light flex items-center justify-center">
              <span className="text-black text-xs font-black">E</span>
            </div>
            <span className="text-white font-semibold tracking-tight text-[15px] group-hover:text-gold transition-colors">
              EstateX
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  'text-[13px] font-medium transition-colors relative',
                  location.pathname === link.path
                    ? 'text-white'
                    : 'text-white/50 hover:text-white'
                )}
              >
                {link.name}
                {link.name === 'Collection' && wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-4 bg-gold text-black text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
            ))}
            <Link
              to="/wishlist"
              className="ml-2 p-2 rounded-full hover:bg-white/10 transition-colors relative"
            >
              <Heart className={cn("w-4 h-4", wishlistCount > 0 ? "text-gold fill-gold" : "text-white/50")} />
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black/95 backdrop-blur-2xl border-b border-white/[0.06] overflow-hidden"
          >
            <div className="px-6 py-6 space-y-6 flex flex-col">
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-bold text-white/80 hover:text-gold transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
