import { useState, useRef } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Send, Phone, Mail, MapPin, Check, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  // Validation functions
  const validateName = (name: string): boolean => {
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    return nameRegex.test(name.trim());
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };

  const validatePhone = (phone: string): boolean => {
    // Remove common phone formatting characters
    const cleanPhone = phone.replace(/[\s().-]/g, '');
    // Check if it's a valid phone number (10-15 digits)
    const phoneRegex = /^\d{10,15}$/;
    return phoneRegex.test(cleanPhone) || phone.trim() === '';
  };

  const validateMessage = (message: string): boolean => {
    return message.trim().length >= 10;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors = {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    };

    if (!validateName(formData.name)) {
      newErrors.name = 'Name must be 2-50 letters only';
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Phone must be 10-15 digits';
    }

    if (!formData.subject) {
      newErrors.subject = 'Please select a subject';
    }

    if (!validateMessage(formData.message)) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.values(newErrors).every(error => error === '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setSubmitted(true);
      setIsSubmitting(false);
      setTimeout(() => {
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setSubmitted(false);
        setErrors({ name: '', email: '', phone: '', subject: '', message: '' });
      }, 3000);
    }, 800);
  };

  const contactInfo = [
    { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567' },
    { icon: Mail, label: 'Email', value: 'hello@estatex.com' },
    { icon: MapPin, label: 'Address', value: '123 Luxury Ave, Miami, FL 33139' },
  ];

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
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <div className="min-h-screen bg-black pt-20 pb-20 overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            top: ['0%', '100%'],
            left: ['0%', '50%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute -top-1/2 -left-1/2 w-96 h-96 bg-gold/5 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{
            bottom: ['0%', '100%'],
            right: ['0%', '50%'],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: 0.5,
          }}
          className="absolute -bottom-1/2 -right-1/2 w-96 h-96 bg-gold/5 rounded-full blur-[150px]"
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-gold text-[11px] font-bold tracking-[0.2em] uppercase mb-4">Get in Touch</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-6">
            Let's Talk About Your <span className="text-gradient-gold">Dream Home</span>
          </h1>
          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto">
            Our luxury real estate experts are ready to help you find the perfect property or answer any questions you may have.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {/* Contact Info Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="lg:col-span-1 space-y-6"
          >
            {contactInfo.map((info, idx) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ x: 8, scale: 1.02 }}
                  className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-8 hover:bg-white/[0.05] transition-all cursor-pointer group"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-gold/10 group-hover:bg-gold/20 transition-colors">
                      <Icon className="w-6 h-6 text-gold" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-white/40 tracking-[0.1em] uppercase mb-2">{info.label}</p>
                      <p className="text-white font-medium">{info.value}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-3xl p-10 md:p-14">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                  >
                    <label className="block text-xs font-semibold text-white/60 mb-3 tracking-wide">Full Name</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={`w-full bg-white/[0.05] border rounded-xl px-5 py-3 text-white placeholder:text-white/20 focus:outline-none focus:bg-white/[0.08] transition-all ${
                          errors.name ? 'border-red-500/50 focus:border-red-500' : 'border-white/[0.1] focus:border-gold/50'
                        }`}
                      />
                      {errors.name && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                          <AlertCircle className="w-5 h-5 text-red-500" />
                        </motion.div>
                      )}
                    </div>
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-red-500 mt-2"
                      >
                        {errors.name}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Email */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 }}
                  >
                    <label className="block text-xs font-semibold text-white/60 mb-3 tracking-wide">Email Address</label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className={`w-full bg-white/[0.05] border rounded-xl px-5 py-3 text-white placeholder:text-white/20 focus:outline-none focus:bg-white/[0.08] transition-all ${
                          errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-white/[0.1] focus:border-gold/50'
                        }`}
                      />
                      {errors.email && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                          <AlertCircle className="w-5 h-5 text-red-500" />
                        </motion.div>
                      )}
                    </div>
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-red-500 mt-2"
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Phone */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <label className="block text-xs font-semibold text-white/60 mb-3 tracking-wide">Phone Number</label>
                    <div className="relative">
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 123-4567"
                        className={`w-full bg-white/[0.05] border rounded-xl px-5 py-3 text-white placeholder:text-white/20 focus:outline-none focus:bg-white/[0.08] transition-all ${
                          errors.phone ? 'border-red-500/50 focus:border-red-500' : 'border-white/[0.1] focus:border-gold/50'
                        }`}
                      />
                      {errors.phone && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                          <AlertCircle className="w-5 h-5 text-red-500" />
                        </motion.div>
                      )}
                    </div>
                    {errors.phone && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-red-500 mt-2"
                      >
                        {errors.phone}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Subject */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.25 }}
                  >
                    <label className="block text-xs font-semibold text-white/60 mb-3 tracking-wide">Subject</label>
                    <div className="relative">
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`w-full bg-white/[0.05] border rounded-xl px-5 py-3 text-white focus:outline-none focus:bg-white/[0.08] transition-all appearance-none cursor-pointer ${
                          errors.subject ? 'border-red-500/50 focus:border-red-500' : 'border-white/[0.1] focus:border-gold/50'
                        }`}
                      >
                        <option value="" className="bg-black/90 text-white">Select a subject...</option>
                        <option value="inquiry" className="bg-black/90 text-white">General Inquiry</option>
                        <option value="consultation" className="bg-black/90 text-white">Schedule Consultation</option>
                        <option value="property" className="bg-black/90 text-white">Property Question</option>
                        <option value="other" className="bg-black/90 text-white">Other</option>
                      </select>
                      {/* Custom dropdown arrow */}
                      <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      </div>
                      {errors.subject && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="absolute right-16 top-1/2 -translate-y-1/2 pointer-events-none"
                        >
                          <AlertCircle className="w-5 h-5 text-red-500" />
                        </motion.div>
                      )}
                    </div>
                    {errors.subject && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-red-500 mt-2"
                      >
                        {errors.subject}
                      </motion.p>
                    )}
                  </motion.div>
                </div>

                {/* Message */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-xs font-semibold text-white/60 mb-3 tracking-wide">Message</label>
                  <div className="relative">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your property needs..."
                      rows={6}
                      className={`w-full bg-white/[0.05] border rounded-xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:bg-white/[0.08] transition-all resize-none ${
                        errors.message ? 'border-red-500/50 focus:border-red-500' : 'border-white/[0.1] focus:border-gold/50'
                      }`}
                    />
                    {errors.message && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="absolute right-3 top-3"
                      >
                        <AlertCircle className="w-5 h-5 text-red-500" />
                      </motion.div>
                    )}
                  </div>
                  {errors.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-500 mt-2"
                    >
                      {errors.message}
                    </motion.p>
                  )}
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.35 }}
                  className="pt-4"
                >
                  <motion.button
                    type="submit"
                    disabled={isSubmitting || submitted}
                    whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(201, 168, 76, 0.3)' }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gold/90 hover:bg-gold disabled:bg-gold/50 text-black px-8 py-4 rounded-xl font-bold text-sm tracking-tight transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_30px_rgba(201,168,76,0.2)]"
                  >
                    {submitted ? (
                      <>
                        <Check className="w-4 h-4" />
                        Message Sent Successfully!
                      </>
                    ) : isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                </motion.div>
              </form>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-6 p-4 bg-gold/10 border border-gold/30 rounded-xl text-center"
                >
                  <p className="text-gold font-medium">Thank you! We'll get back to you soon.</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Additional Info Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] rounded-3xl p-12 md:p-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: 'Response Time', description: 'We respond to all inquiries within 24 hours' },
              { title: 'Expert Team', description: 'Connect with luxury real estate specialists' },
              { title: 'Confidential', description: 'Your privacy and discretion is our priority' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{item.description}</p>
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
          className="text-center mt-20"
        >
          <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] rounded-3xl p-12 md:p-20">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Prefer to Speak with a <span className="text-gradient-gold">Consultant?</span>
            </h2>
            <p className="text-lg text-white/50 mb-10 max-w-2xl mx-auto">
              Connect directly with one of our luxury real estate specialists who can provide personalized guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/consultants"
                className="px-10 py-4 bg-gold/90 hover:bg-gold text-black rounded-full font-bold text-sm tracking-tight transition-all shadow-[0_0_30px_rgba(201,168,76,0.2)]"
              >
                <motion.div
                  whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(201, 168, 76, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Meet Our Consultants
                </motion.div>
              </Link>
              <Link
                to="/"
                className="px-10 py-4 bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.12] text-white rounded-full font-bold text-sm tracking-tight transition-all"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Back to Home
                </motion.div>
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
