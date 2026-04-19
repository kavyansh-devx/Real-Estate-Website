import { motion } from 'framer-motion';
import { PropertyCard } from '../components/ui/PropertyCard';
import { useStore } from '../store/useStore';
import { mockProperties } from '../data/mockData';
import { Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Wishlist() {
  const { wishlist } = useStore();
  const savedProperties = mockProperties.filter(p => wishlist.includes(p.id));

  return (
    <div className="pt-24 pb-32 min-h-screen bg-black">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="mb-20 pt-12">
          <p className="text-gold text-[11px] font-bold tracking-[0.2em] uppercase mb-4">Your Private Portfolio</p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-4">
            The Collection.
          </h1>
          <p className="text-lg text-white/30 max-w-lg">
            {savedProperties.length} {savedProperties.length === 1 ? 'property' : 'properties'} saved to your curated portfolio.
          </p>
        </div>

        {savedProperties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-16">
            {savedProperties.map((property, idx) => (
              <PropertyCard key={property.id} property={property} index={idx} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center text-center py-32"
          >
            <div className="w-20 h-20 rounded-3xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-8">
              <Heart className="w-8 h-8 text-white/20" />
            </div>
            <h2 className="text-3xl font-bold tracking-tighter text-white mb-3">Your collection is empty.</h2>
            <p className="text-white/30 mb-10 max-w-sm">
              Explore our curated selection and save the properties that capture your imagination.
            </p>
            <Link
              to="/"
              className="group bg-gold hover:bg-gold-light text-black px-8 py-4 rounded-full font-bold text-sm tracking-tight transition-all flex items-center gap-2"
            >
              Discover Properties
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
