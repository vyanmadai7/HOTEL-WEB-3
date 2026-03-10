import React from 'react';
import { motion } from 'motion/react';
import { Instagram, Facebook, Twitter, ArrowUp } from 'lucide-react';

import Magnetic from './Magnetic';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-delta-cream pt-24 pb-12 px-6 md:px-12 border-t border-delta-charcoal/5 scroll-snap-item">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="space-y-8">
            <h3 className="text-3xl font-serif font-bold text-delta-green tracking-tighter italic">Hotel Great Web3</h3>
            <p className="text-delta-charcoal/50 text-sm leading-relaxed max-w-xs font-light">
              Experience the perfect blend of luxury, nature, and authentic hospitality in the heart of the city.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <Magnetic key={i}>
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full border border-delta-charcoal/10 flex items-center justify-center text-delta-green hover:bg-delta-green hover:text-delta-cream transition-all duration-300"
                  >
                    <Icon size={18} />
                  </motion.a>
                </Magnetic>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-delta-charcoal/40 mb-8">Navigation</h4>
            <ul className="space-y-4">
              {[
                { name: 'Home', href: '#' },
                { name: 'The Place', href: '#place' },
                { name: 'Menu', href: '#menu' },
                { name: 'Rooms', href: '#booking' },
                { name: 'Dining', href: '#reservation' }
              ].map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-delta-green hover:text-delta-gold transition-colors text-sm font-medium">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-delta-charcoal/40 mb-8">Contact</h4>
            <ul className="space-y-4 text-sm text-delta-charcoal/70">
              <li>Find us on Google Maps</li>
              <li>+977 98xxxxxxxx</li>
              <li>info@greatweb3.com</li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-delta-charcoal/40 mb-8">Newsletter</h4>
            <p className="text-sm text-delta-charcoal/50 mb-6">Subscribe to receive updates and special offers.</p>
            <div className="relative">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-white border border-delta-charcoal/10 rounded-full px-6 py-3 text-sm focus:outline-none focus:border-delta-gold"
              />
              <Magnetic>
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-delta-green text-delta-cream px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  Join
                </button>
              </Magnetic>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-delta-charcoal/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-delta-charcoal/30">
            © 2026 Hotel Great Web3. All Rights Reserved.
          </p>
          
          <Magnetic>
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] font-bold text-delta-charcoal/40 hover:text-delta-green transition-colors"
            >
              Back to Top
              <div className="w-8 h-8 rounded-full border border-delta-charcoal/10 flex items-center justify-center group-hover:border-delta-green transition-colors">
                <ArrowUp size={14} />
              </div>
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
