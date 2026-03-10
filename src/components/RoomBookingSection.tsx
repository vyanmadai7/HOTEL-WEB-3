import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Users, Home, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import Magnetic from './Magnetic';

export default function RoomBookingSection() {
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: '1',
    roomType: 'Standard',
    name: '',
    email: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Simulate API call
    try {
      // In a real app, you'd call your backend here
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatus('success');
      setMessage('Your room booking request has been sent! We will contact you shortly to confirm.');
      setFormData({
        checkIn: '',
        checkOut: '',
        guests: '1',
        roomType: 'Standard',
        name: '',
        email: '',
      });
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <section id="booking" className="py-32 px-6 md:px-12 bg-delta-green text-delta-cream relative overflow-hidden scroll-snap-item">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-delta-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-20" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-delta-gold/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl opacity-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left Side: Content */}
          <div className="space-y-10">
            <div className="space-y-6">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-delta-gold uppercase tracking-[0.5em] text-xs font-bold block"
              >
                Stay With Us
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-8xl font-serif text-white leading-[0.9] tracking-tighter"
              >
                Book Your <br /> <span className="italic text-delta-gold">Sanctuary</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-xl text-delta-cream/60 font-light leading-relaxed max-w-md"
              >
                Experience unparalleled comfort in our thoughtfully designed rooms. From cozy standard stays to luxurious suites with garden views.
              </motion.p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <span className="text-3xl font-serif text-delta-gold block">12</span>
                <span className="text-[10px] uppercase tracking-widest font-bold text-delta-cream/40">Luxury Rooms</span>
              </div>
              <div className="space-y-2">
                <span className="text-3xl font-serif text-delta-gold block">24/7</span>
                <span className="text-[10px] uppercase tracking-widest font-bold text-delta-cream/40">Room Service</span>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-xl p-8 md:p-12 rounded-[3rem] border border-white/10 shadow-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-delta-gold">
                    <Calendar size={12} /> Check-In
                  </label>
                  <input
                    required
                    type="date"
                    value={formData.checkIn}
                    onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-delta-gold transition-all text-white appearance-none"
                  />
                </div>
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-delta-gold">
                    <Calendar size={12} /> Check-Out
                  </label>
                  <input
                    required
                    type="date"
                    value={formData.checkOut}
                    onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-delta-gold transition-all text-white appearance-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-delta-gold">
                    <Users size={12} /> Guests
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-delta-gold transition-all text-white appearance-none"
                  >
                    {[1, 2, 3, 4, 5].map(n => (
                      <option key={n} value={n} className="bg-delta-green text-white">{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-delta-gold">
                    <Home size={12} /> Room Type
                  </label>
                  <select
                    value={formData.roomType}
                    onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-delta-gold transition-all text-white appearance-none"
                  >
                    {['Standard', 'Deluxe', 'Executive Suite', 'Family Room'].map(type => (
                      <option key={type} value={type} className="bg-delta-green text-white">{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-widest font-bold text-delta-gold">Your Name</label>
                <input
                  required
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-delta-gold transition-all text-white"
                />
              </div>

              <Magnetic>
                <motion.button
                  disabled={status === 'loading'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-5 rounded-2xl font-bold uppercase tracking-[0.3em] text-xs transition-all duration-500 flex items-center justify-center gap-3 shadow-2xl ${
                    status === 'loading' 
                      ? 'bg-white/10 text-white/30 cursor-not-allowed' 
                      : 'bg-delta-gold text-delta-green hover:bg-white shadow-delta-gold/20'
                  }`}
                >
                  {status === 'loading' ? (
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-4 h-4 border-2 border-delta-green/30 border-t-delta-green rounded-full"
                    />
                  ) : (
                    <Send size={16} />
                  )}
                  {status === 'loading' ? 'Processing...' : 'Book Room Now'}
                </motion.button>
              </Magnetic>

              {/* Status Messages */}
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="flex items-center gap-3 p-4 bg-green-500/10 text-green-400 rounded-xl border border-green-500/20"
                  >
                    <CheckCircle2 size={18} />
                    <span className="text-xs font-medium">{message}</span>
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="flex items-center gap-3 p-4 bg-red-500/10 text-red-400 rounded-xl border border-red-500/20"
                  >
                    <AlertCircle size={18} />
                    <span className="text-xs font-medium">{message}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
