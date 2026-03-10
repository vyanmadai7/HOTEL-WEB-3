import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Menu, X, Phone, Calendar } from 'lucide-react';
import { cn } from '@/src/lib/utils';

import Magnetic from './Magnetic';

const navLinks = [
  { name: 'Home', href: '#' },
  { name: 'The Place', href: '#place' },
  { name: 'Menu', href: '#menu' },
  { name: 'Rooms', href: '#booking' },
  { name: 'Dining', href: '#reservation' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out px-6 md:px-12 py-4',
        isScrolled ? 'glass-nav py-3' : 'bg-transparent'
      )}
    >
      <motion.div 
        className="absolute bottom-0 left-0 h-[2px] bg-delta-gold z-10"
        style={{ width: useTransform(scrollYProgress, [0, 1], ['0%', '100%']) }}
      />
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Magnetic>
            <a href="#" className="text-2xl font-serif font-bold tracking-tighter text-delta-green">
              HOTEL GREAT WEB3
            </a>
          </Magnetic>
          
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs uppercase tracking-widest font-medium hover:text-delta-gold transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-delta-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="tel:+97798xxxxxxxx"
            className="hidden sm:flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-delta-green hover:text-delta-gold transition-colors"
          >
            <Phone size={14} />
            +977 98xxxxxxxx
          </a>
          <Magnetic>
            <motion.a
              href="#booking"
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              variants={{
                initial: { scale: 1 },
                hover: { scale: 1.05 },
                tap: { scale: 0.95 }
              }}
              className="hidden md:block bg-delta-gold text-delta-green px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white transition-all duration-300 shadow-lg shadow-delta-gold/20"
            >
              Book Room
            </motion.a>
          </Magnetic>
          
          <button
            className="md:hidden text-delta-green p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-delta-cream border-t border-delta-charcoal/5 shadow-2xl md:hidden"
          >
            <div className="flex flex-col p-8 gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xl font-serif text-delta-green hover:text-delta-gold transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 border-t border-delta-charcoal/10 flex flex-col gap-4">
                <a
                  href="tel:+97798xxxxxxxx"
                  className="flex items-center gap-3 text-delta-green font-medium"
                >
                  <Phone size={18} />
                  +977 98xxxxxxxx
                </a>
                <a
                  href="#booking"
                  className="bg-delta-gold text-delta-green text-center py-4 rounded-xl font-bold uppercase tracking-widest"
                >
                  Book a Room
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
