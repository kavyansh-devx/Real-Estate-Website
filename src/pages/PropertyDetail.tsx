import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { mockProperties } from '../data/mockData';
import { ArrowLeft, MapPin, Heart, ArrowRight, Check } from 'lucide-react';
import { useStore } from '../store/useStore';
import { cn } from '../lib/utils';
import { useState } from 'react';

export function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  const property = mockProperties.find(p => p.id === id);
  const { toggleWishlist, isInWishlist } = useStore();
  const [activeImg, setActiveImg] = useState(0);

  if (!property) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-5xl font-bold tracking-tighter text-white">Not Found.</h2>
          <Link to="/" className="text-gold hover:underline text-sm">Return to Collection</Link>
        </div>
      </div>
    );
  }

  const isWished = isInWishlist(property.id);

  return (
    <div className="bg-black text-white min-h-screen">
      {/* ═══ HERO ═══ */}
      <section className="relative h-[70vh] md:h-screen overflow-hidden">
        {property.gallery.map((img, idx) => (
          <motion.div
            key={idx}
            animate={{ opacity: activeImg === idx ? 1 : 0, scale: activeImg === idx ? 1 : 1.05 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
          </motion.div>
        ))}
        <div className="absolute inset-0 hero-gradient z-10" />
        <div className="absolute inset-0 bg-black/20 z-10" />

        <div className={cn(
          "absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[150px] z-10 opacity-20 bg-gradient-to-r",
          property.gradient
        )} />

        {/* Glass top actions */}
        <div className="absolute top-0 left-0 right-0 z-30 pt-20 px-6 lg:px-10">
          <div className="max-w-[1400px] mx-auto flex justify-between items-center">
            <Link to="/" className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors bg-white/[0.06] backdrop-blur-xl px-4 py-2.5 rounded-full border border-white/[0.1]">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-xs font-medium">Back</span>
            </Link>
            <button
              onClick={() => toggleWishlist(property.id)}
              className="p-3 rounded-full bg-white/[0.06] backdrop-blur-xl text-white hover:bg-white/[0.12] transition-all cursor-pointer border border-white/[0.1]"
            >
              <Heart className={cn("w-5 h-5", isWished && "fill-gold text-gold")} />
            </button>
          </div>
        </div>

        {/* Hero glass info panel */}
        <div className="absolute bottom-0 left-0 right-0 z-20 px-6 lg:px-10 pb-12">
          <div className="max-w-[1400px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/[0.04] backdrop-blur-2xl border border-white/[0.08] rounded-3xl p-8 md:p-10 inline-block"
            >
              <p className="text-gold text-[11px] font-bold tracking-[0.2em] uppercase mb-3">{property.type}</p>
              <h1 className="text-4xl md:text-7xl font-bold tracking-tighter mb-3">{property.title}.</h1>
              <div className="flex items-center gap-2 text-white/50">
                <MapPin className="w-4 h-4" />
                <span className="text-base tracking-tight">{property.location}</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Gallery controls — glass */}
        {property.gallery.length > 1 && (
          <div className="absolute bottom-8 right-10 z-20 flex gap-2 bg-white/[0.06] backdrop-blur-xl border border-white/[0.1] rounded-full px-3 py-2">
            {property.gallery.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImg(idx)}
                className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                  activeImg === idx ? 'bg-gold w-8' : 'bg-white/20 w-4'
                }`}
              />
            ))}
          </div>
        )}
      </section>

      {/* ═══ STATS — Glass Bar ═══ */}
      <section className="relative z-10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 -mt-10">
          <div className="bg-white/[0.04] backdrop-blur-2xl border border-white/[0.08] rounded-3xl p-8 md:p-12 shadow-2xl grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Price', value: `$${(property.price / 1000000).toFixed(1)}M` },
              { label: 'Bedrooms', value: property.beds.toString() },
              { label: 'Bathrooms', value: property.baths.toString() },
              { label: 'Area', value: `${property.sqft.toLocaleString()} sqft` },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-2">{stat.label}</p>
                <p className="text-3xl md:text-4xl font-bold tracking-tighter">{stat.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ABOUT — Glass Split ═══ */}
      <section className="py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-3xl p-10 md:p-14"
          >
            <p className="text-gold text-[11px] font-bold tracking-[0.2em] uppercase mb-6">The Vision</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-8 leading-[0.95]">
              Design that speaks<br />
              <span className="text-gradient-gold">for itself.</span>
            </h2>
            <p className="text-base text-white/40 leading-relaxed">
              {property.description}
            </p>
            <p className="text-white/30 text-base mt-4 italic leading-relaxed">
              "{property.tagline}"
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/[0.08]"
          >
            <img
              src={property.gallery[property.gallery.length - 1]}
              alt="Interior"
              className="w-full h-full object-cover"
            />
            <div className={cn(
              "absolute -bottom-20 -right-20 w-64 h-64 rounded-full blur-[100px] opacity-30 bg-gradient-to-r",
              property.gradient
            )} />
          </motion.div>
        </div>
      </section>

      {/* ═══ AMENITIES — Glass Cards ═══ */}
      <section className="py-32 bg-[#050505]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-20">
            <p className="text-gold text-[11px] font-bold tracking-[0.2em] uppercase mb-6">Included</p>
            <h2 className="text-4xl md:text-7xl font-bold tracking-tighter">
              Premium Amenities.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {property.amenities.map((amenity, idx) => (
              <motion.div
                key={amenity}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="group bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-8 hover:bg-white/[0.06] hover:border-gold/20 transition-all duration-500"
              >
                <div className="w-10 h-10 rounded-xl bg-gold/10 backdrop-blur-md border border-gold/20 flex items-center justify-center mb-4 group-hover:bg-gold/20 group-hover:shadow-[0_0_20px_rgba(201,168,76,0.15)] transition-all">
                  <Check className="w-4 h-4 text-gold" />
                </div>
                <h4 className="text-lg font-semibold tracking-tight mb-1">{amenity}</h4>
                <p className="text-xs text-white/30">Part of the exclusive estate experience.</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA — Glass Card ═══ */}
      <section className="py-40 text-center px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/[0.04] rounded-full blur-[200px]" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-3xl mx-auto bg-white/[0.04] backdrop-blur-2xl border border-white/[0.08] rounded-[2rem] p-12 md:p-20 shadow-2xl space-y-10"
        >
          <p className="text-gold text-[11px] font-bold tracking-[0.25em] uppercase">Take the next step</p>
          <h2 className="text-4xl md:text-7xl font-bold tracking-tighter leading-[0.9]">
            Your journey<br />
            <span className="text-gradient-gold">starts here.</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button className="group bg-gold/90 backdrop-blur-md hover:bg-gold text-black px-10 py-4 rounded-full font-bold text-sm tracking-tight transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_40px_rgba(201,168,76,0.25)]">
              Book a Private Tour
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-white/[0.06] hover:bg-white/[0.12] backdrop-blur-xl border border-white/[0.12] text-white px-10 py-4 rounded-full font-bold text-sm tracking-tight transition-all cursor-pointer">
              Contact Concierge
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
