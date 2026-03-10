import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, MessageCircle, Phone, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';

import Magnetic from './Magnetic';

export default function ReservationSection() {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/reservation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message);
        setFormData({ name: '', phone: '', message: '' });
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Failed to connect to the server. Please check your connection.');
    }
  };

  return (
    <section id="reservation" className="py-32 px-6 md:px-12 bg-delta-cream relative">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-delta-gold/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Left Side: Info */}
        <div className="space-y-12">
          <div className="space-y-6">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-delta-gold uppercase tracking-[0.4em] text-xs font-bold block"
            >
              Order Now
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-serif text-delta-green leading-tight"
            >
              Delicious Food <br /> At Your Service
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-lg text-delta-charcoal/60 font-light leading-relaxed max-w-md"
            >
              Craving our signature dishes? You can place an order for pickup or inquire about our services directly. We're a small, cozy hotel dedicated to big flavors.
            </motion.p>
          </div>

          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="flex items-start gap-6 group"
            >
              <div className="p-4 bg-delta-green text-delta-cream rounded-2xl group-hover:bg-delta-gold transition-colors duration-500">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-bold text-delta-green uppercase tracking-widest text-xs mb-2">Location</h4>
                <p className="text-delta-charcoal/70">Find us on Google Maps</p>
                <a href="#location" className="text-delta-gold text-sm font-bold hover:underline mt-2 inline-block">Get Directions</a>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-start gap-6 group"
            >
              <div className="p-4 bg-delta-green text-delta-cream rounded-2xl group-hover:bg-delta-gold transition-colors duration-500">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="font-bold text-delta-green uppercase tracking-widest text-xs mb-2">Phone</h4>
                <a href="tel:+97798xxxxxxxx" className="text-delta-charcoal/70 hover:text-delta-gold transition-colors">+977 98xxxxxxxx</a>
                <p className="text-delta-charcoal/50 text-sm">Available 9:00 AM - 10:00 PM</p>
              </div>
            </motion.div>
          </div>

          <div className="pt-8 flex flex-wrap gap-6">
            <Magnetic>
              <motion.a
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                href="#!"
                className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs shadow-xl shadow-green-500/20"
              >
                <MessageCircle size={20} />
                WhatsApp Order
              </motion.a>
            </Magnetic>
            <Magnetic>
              <motion.a
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                href="tel:+97798xxxxxxxx"
                className="inline-flex items-center gap-3 bg-delta-green text-delta-cream px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs shadow-xl shadow-delta-green/20"
              >
                <Phone size={20} />
                Call to Order
              </motion.a>
            </Magnetic>
          </div>
        </div>

        {/* Right Side: Form */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: 10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          className="bg-white p-8 md:p-12 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(15,42,36,0.15)] border border-delta-charcoal/5 relative overflow-hidden"
        >
          {/* Form Background Pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-delta-gold/5 rounded-full blur-3xl -mr-16 -mt-16" />
          
          <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-delta-charcoal/40 ml-1">Full Name</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your Name"
                  className="w-full bg-delta-cream/50 border border-delta-charcoal/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-delta-gold transition-all duration-300 focus:bg-white focus:shadow-lg focus:shadow-delta-gold/5"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-delta-charcoal/40 ml-1">Phone Number</label>
                <input
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+977 98xxxxxxxx"
                  className="w-full bg-delta-cream/50 border border-delta-charcoal/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-delta-gold transition-all duration-300 focus:bg-white focus:shadow-lg focus:shadow-delta-gold/5"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-delta-charcoal/40 ml-1">Your Order / Message</label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="What would you like to order? (e.g., 2 Chicken Momos, 1 Veg Thali)"
                className="w-full bg-delta-cream/50 border border-delta-charcoal/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-delta-gold transition-all duration-300 focus:bg-white focus:shadow-lg focus:shadow-delta-gold/5 resize-none"
              ></textarea>
            </div>

            <Magnetic>
              <motion.button
                disabled={status === 'loading'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-xs transition-all duration-500 flex items-center justify-center gap-3 shadow-xl ${
                  status === 'loading' 
                    ? 'bg-delta-charcoal/20 text-delta-charcoal/40 cursor-not-allowed' 
                    : 'bg-delta-green text-delta-cream hover:bg-delta-gold shadow-delta-green/20'
                }`}
              >
                {status === 'loading' ? (
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-4 h-4 border-2 border-delta-cream/30 border-t-delta-cream rounded-full"
                  />
                ) : (
                  <Send size={16} />
                )}
                {status === 'loading' ? 'Sending...' : 'Send Order Request'}
              </motion.button>
            </Magnetic>

            {/* Status Messages */}
            {status === 'success' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 p-4 bg-green-50 text-green-700 rounded-xl border border-green-100"
              >
                <CheckCircle2 size={18} />
                <span className="text-xs font-medium">{message}</span>
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 p-4 bg-red-50 text-red-700 rounded-xl border border-red-100"
              >
                <AlertCircle size={18} />
                <span className="text-xs font-medium">{message}</span>
              </motion.div>
            )}

            <p className="text-center text-[10px] text-delta-charcoal/40 font-medium italic">
              * We will call you back to confirm your order.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
