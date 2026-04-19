import { motion } from 'framer-motion';
import { Heart, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Property } from '../../data/mockData';
import { useStore } from '../../store/useStore';
import { cn } from '../../lib/utils';

export function PropertyCard({ property, index = 0 }: { property: Property; index?: number }) {
  const { toggleWishlist, isInWishlist } = useStore();
  const isWished = isInWishlist(property.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -12, scale: 1.02 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative cursor-pointer"
    >
      {/* Glass Card Container */}
      <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-3xl overflow-hidden shadow-2xl hover:border-white/[0.15] transition-all duration-500">
        {/* Image */}
        <Link to={`/property/${property.id}`} className="block relative aspect-[3/4] md:aspect-[4/5] overflow-hidden">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

          {/* Colored Glow on Hover */}
          <div className={cn(
            "absolute -bottom-20 -left-20 w-64 h-64 rounded-full blur-[100px] opacity-0 group-hover:opacity-30 transition-opacity duration-700 bg-gradient-to-r z-10",
            property.gradient
          )} />

          <motion.img
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            src={property.image}
            alt={property.title}
            loading="lazy"
            className="w-full h-full object-cover"
          />

          {/* Hover CTA — glass pill */}
          <div className="absolute bottom-5 left-5 right-5 z-20 flex justify-between items-end opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-3">
              <p className="text-white/50 text-[10px] font-bold tracking-[0.15em] uppercase mb-0.5">{property.type}</p>
              <h3 className="text-lg font-bold tracking-tight text-white">{property.title}</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/20 group-hover:bg-gold group-hover:border-gold transition-all duration-300">
              <ArrowUpRight className="w-4 h-4 text-white group-hover:text-black transition-colors" />
            </div>
          </div>

          {/* Featured Badge — glass */}
          {property.featured && (
            <div className="absolute top-4 left-4 z-20">
              <span className="bg-gold/90 backdrop-blur-md text-black text-[10px] font-black uppercase tracking-[0.15em] px-3 py-1.5 rounded-full">
                Featured
              </span>
            </div>
          )}
        </Link>

        {/* Wishlist Button — glass */}
        <button
          onClick={() => toggleWishlist(property.id)}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/30 backdrop-blur-xl text-white hover:bg-black/50 transition-all cursor-pointer border border-white/10"
        >
          <Heart className={cn("w-4 h-4 transition-colors", isWished ? "fill-gold text-gold" : "text-white/80")} />
        </button>

        {/* Info Below Image — inside the glass card */}
        <div className="p-5 bg-white/[0.02] backdrop-blur-md border-t border-white/[0.06]">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-white/40 text-xs font-medium tracking-wide">{property.location}</p>
              <div className="flex gap-3 mt-1 text-[11px] text-white/25 font-medium">
                <span>{property.beds} bed</span>
                <span>·</span>
                <span>{property.baths} bath</span>
                <span>·</span>
                <span>{property.sqft.toLocaleString()} sqft</span>
              </div>
            </div>
            <p className="text-lg font-bold tracking-tight text-white">${(property.price / 1000000).toFixed(1)}M</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
