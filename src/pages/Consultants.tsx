import { motion, type Variants } from 'framer-motion';
import { Mail, Phone, ArrowUpRight, User } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface Consultant {
  id: number;
  name: string;
  title: string;
  specialty: string;
  bio: string;
  email: string;
  phone: string;
  image: string;
}

const consultants: Consultant[] = [
  {
    id: 1,
    name: 'Victoria Sterling',
    title: 'Chief Real Estate Officer',
    specialty: 'Luxury Villas & Estates',
    bio: 'With 15+ years of experience in ultra-luxury properties, Victoria specializes in exclusive villa sales and estate management.',
    email: 'victoria@estatex.com',
    phone: '+1 (555) 123-4567',
    image: 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&dpr=2',
  },
  {
    id: 2,
    name: 'James Mitchell',
    title: 'Penthouse Specialist',
    specialty: 'Urban Luxury',
    bio: 'James is renowned for his expertise in premium penthouse sales across major metropolitan areas worldwide.',
    email: 'james@estatex.com',
    phone: '+1 (555) 234-5678',
    image: 'https://images.pexels.com/photos/3807518/pexels-photo-3807518.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&dpr=2',
  },
  {
    id: 3,
    name: 'Sophia De Souza',
    title: 'International Market Director',
    specialty: 'Global Properties',
    bio: 'Sophia connects discerning clients with exceptional properties across Europe, Asia, and the Americas.',
    email: 'sophia@estatex.com',
    phone: '+1 (555) 345-6789',
    image: 'https://images.pexels.com/photos/3807519/pexels-photo-3807519.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&dpr=2',
  },
  {
    id: 4,
    name: 'Alexander Chen',
    title: 'Investment Strategist',
    specialty: 'Real Estate Investment',
    bio: 'With an MBA from Harvard, Alexander guides high-net-worth individuals through strategic property investments.',
    email: 'alex@estatex.com',
    phone: '+1 (555) 456-7890',
    image: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&dpr=2',
  },
  {
    id: 5,
    name: 'Isabella Rodriguez',
    title: 'Lifestyle Consultant',
    specialty: 'Luxury Amenities',
    bio: 'Isabella curates bespoke property experiences, ensuring every detail matches her clients\' sophisticated lifestyle.',
    email: 'isabella@estatex.com',
    phone: '+1 (555) 567-8901',
    image: 'https://images.pexels.com/photos/3807520/pexels-photo-3807520.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&dpr=2',
  },
  {
    id: 6,
    name: 'Michael Thornton',
    title: 'Private Transactions Lead',
    specialty: 'Off-Market Deals',
    bio: 'Michael specializes in confidential, off-market transactions for the world\'s most exclusive properties.',
    email: 'michael@estatex.com',
    phone: '+1 (555) 678-9012',
    image: 'https://images.pexels.com/photos/3807521/pexels-photo-3807521.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&dpr=2',
  },
];

interface ConsultantCardProps {
  consultant: Consultant;
}

function ConsultantCard({ consultant }: ConsultantCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div whileHover={{ y: -8 }} className="group">
      <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-3xl overflow-hidden hover:border-gold/30 transition-all duration-500 h-full flex flex-col">
        {/* Image Container */}
        <div className="relative h-80 overflow-hidden bg-gradient-to-br from-gold/10 to-transparent">
          {!imageError ? (
            <motion.img
              src={consultant.image}
              alt={consultant.name}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center">
              <User className="w-24 h-24 text-gold/30" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="flex-1 p-8 flex flex-col justify-between">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-gold text-[10px] font-bold tracking-[0.15em] uppercase mb-2">
              {consultant.specialty}
            </p>
          </motion.div>
          <h3 className="text-2xl font-bold text-white mb-1">{consultant.name}</h3>
          <p className="text-sm text-white/50 font-medium">{consultant.title}</p>

          {/* Bio */}
          <p className="text-white/40 text-sm leading-relaxed mb-8 min-h-[80px] mt-6">
            {consultant.bio}
          </p>

          {/* Contact Info */}
          <div className="space-y-3 mb-6 pb-6 border-b border-white/[0.08]">
            <motion.a
              href={`mailto:${consultant.email}`}
              whileHover={{ x: 4 }}
              className="flex items-center gap-3 text-white/60 hover:text-gold transition-colors"
            >
              <Mail className="w-4 h-4 flex-shrink-0" />
              <span className="text-xs">{consultant.email}</span>
            </motion.a>
            <motion.a
              href={`tel:${consultant.phone}`}
              whileHover={{ x: 4 }}
              className="flex items-center gap-3 text-white/60 hover:text-gold transition-colors"
            >
              <Phone className="w-4 h-4 flex-shrink-0" />
              <span className="text-xs">{consultant.phone}</span>
            </motion.a>
          </div>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(201, 168, 76, 0.15)' }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 rounded-lg bg-gold/10 border border-gold/30 text-gold font-semibold text-sm transition-all hover:shadow-[0_0_20px_rgba(201,168,76,0.2)] flex items-center justify-center gap-2 group/btn"
          >
            Schedule Call
            <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export function Consultants() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <div className="min-h-screen bg-black pt-20 pb-20 overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            top: ['0%', '50%'],
            left: ['0%', '30%'],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute -top-1/4 -left-1/4 w-96 h-96 bg-gold/8 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{
            bottom: ['0%', '50%'],
            right: ['0%', '30%'],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: 0.3,
          }}
          className="absolute -bottom-1/4 -right-1/4 w-96 h-96 bg-gold/8 rounded-full blur-[150px]"
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <p className="text-gold text-[11px] font-bold tracking-[0.2em] uppercase mb-4">Our Experts</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-6">
            Meet Our <span className="text-gradient-gold">Luxury Consultants</span>
          </h1>
          <p className="text-lg md:text-xl text-white/50 max-w-3xl mx-auto">
            Our team of elite real estate professionals brings decades of combined experience in the luxury property market. Each consultant is dedicated to finding your perfect home.
          </p>
        </motion.div>

        {/* Consultants Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24"
        >
          {consultants.map((consultant) => (
            <motion.div key={consultant.id} variants={itemVariants}>
              <ConsultantCard consultant={consultant} />
            </motion.div>
          ))}
        </motion.div>

        {/* Why Choose Them Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-white/[0.03] to-gold/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-3xl p-12 md:p-16 mb-20"
        >
          <div className="text-center mb-16">
            <p className="text-gold text-[11px] font-bold tracking-[0.2em] uppercase mb-4">Why Choose Our Team</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              Unmatched Expertise & Dedication
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: '150+ Years', description: 'Combined industry experience' },
              { title: '$5B+', description: 'Properties sold globally' },
              { title: '24/7 Support', description: 'Always available for you' },
              { title: '98% Satisfaction', description: 'Client success rate' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="text-center p-6 rounded-xl hover:bg-white/[0.05] transition-all cursor-pointer"
              >
                <p className="text-3xl md:text-4xl font-bold text-gold mb-2">{stat.title}</p>
                <p className="text-white/50 text-sm">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] rounded-3xl p-12 md:p-20">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Ready to Find Your Perfect Property?
            </h2>
            <p className="text-lg text-white/50 mb-10 max-w-2xl mx-auto">
              Get connected with one of our expert consultants who can guide you through every step of the process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/consultants"
                className="px-10 py-4 bg-gold/90 hover:bg-gold text-black rounded-full font-bold text-sm tracking-tight transition-all shadow-[0_0_30px_rgba(201,168,76,0.2)]"
              >
                <motion.div
                  whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(201, 168, 76, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center"
                >
                  Schedule Consultation
                </motion.div>
              </Link>
              <Link
                to="/property/1"
                className="px-10 py-4 bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.12] text-white rounded-full font-bold text-sm tracking-tight transition-all"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center"
                >
                  View Listings
                </motion.div>
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
