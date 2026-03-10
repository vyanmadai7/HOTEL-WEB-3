import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { ChevronDown } from 'lucide-react';

import Magnetic from './Magnetic';

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 1000], [1, 1.2]);
  
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-delta-charcoal">
      {/* Background Image with Deep Parallax */}
      <motion.div 
        style={{ y: smoothY, scale: smoothScale }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-delta-charcoal z-10" />
        <motion.img
          initial={{ scale: 1.4, opacity: 0 }}
          animate={{ scale: 1.1, opacity: 1 }}
          transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop"
          alt="Luxury Restaurant Atmosphere"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* Floating 3D Elements */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <motion.div 
          animate={{ 
            y: [0, -40, 0],
            rotate: [0, 20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[10%] w-32 h-32 bg-delta-gold/10 rounded-full blur-2xl"
        />
        <motion.div 
          animate={{ 
            y: [0, 50, 0],
            rotate: [0, -30, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[20%] right-[15%] w-48 h-48 bg-delta-gold/10 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: 20 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ perspective: "1000px" }}
        >
          <motion.div
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            animate={{ opacity: 1, letterSpacing: "0.6em" }}
            transition={{ delay: 0.5, duration: 1.5 }}
            className="text-delta-gold uppercase text-[10px] md:text-xs font-bold mb-8 block"
          >
            Welcome to Greatness
          </motion.div>
          
          <h1 className="text-7xl md:text-9xl lg:text-[12rem] text-delta-cream font-serif mb-12 tracking-tighter leading-[0.8] flex flex-col items-center perspective-1000">
            <motion.span 
              initial={{ opacity: 0, rotateX: -90, y: 50 }}
              animate={{ opacity: 1, rotateX: 0, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
              className="block preserve-3d"
            >
              Hotel
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, rotateX: -90, y: 50 }}
              animate={{ opacity: 1, rotateX: 0, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 1 }}
              className="block italic text-delta-gold ml-12 md:ml-24 preserve-3d"
            >
              Great Web3
            </motion.span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl md:text-3xl text-delta-cream/80 font-light max-w-3xl mx-auto mb-16 text-balance leading-relaxed"
          >
            Where <span className="text-delta-gold italic font-serif">Nature</span> meets <span className="text-delta-gold italic font-serif">Luxury</span>.
          </motion.p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <Magnetic>
              <motion.a
                href="#reservation"
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                variants={{
                  initial: { scale: 1 },
                  hover: { scale: 1.05 },
                  tap: { scale: 0.95 }
                }}
                className="relative bg-delta-gold text-delta-green px-12 py-6 rounded-full text-xs font-bold uppercase tracking-[0.3em] shadow-[0_20px_50px_rgba(242,125,38,0.3)] overflow-hidden block"
              >
                <motion.span 
                  variants={{
                    initial: { color: "#0F2A24" },
                    hover: { color: "#0F2A24" }
                  }}
                  className="relative z-10"
                >
                  Reserve a Table
                </motion.span>
                <motion.div 
                  variants={{
                    initial: { y: "100%" },
                    hover: { y: 0 }
                  }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 bg-white"
                />
              </motion.a>
            </Magnetic>
            <Magnetic>
              <motion.a
                href="tel:+97798xxxxxxxx"
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                variants={{
                  initial: { scale: 1 },
                  hover: { scale: 1.05 },
                  tap: { scale: 0.95 }
                }}
                className="relative bg-transparent border border-white/20 text-white px-12 py-6 rounded-full text-xs font-bold uppercase tracking-[0.3em] overflow-hidden block"
              >
                <motion.span 
                  variants={{
                    initial: { color: "#FFFFFF" },
                    hover: { color: "#0F2A24" }
                  }}
                  className="relative z-10 transition-colors duration-500"
                >
                  Call Now
                </motion.span>
                <motion.div 
                  variants={{
                    initial: { y: "100%" },
                    hover: { y: 0 }
                  }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 bg-white"
                />
              </motion.a>
            </Magnetic>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.a
        href="#story"
        style={{ opacity }}
        animate={{ y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4 cursor-pointer"
      >
        <div className="w-px h-16 bg-gradient-to-b from-delta-gold/50 to-transparent" />
        <span className="text-white/30 text-[9px] uppercase tracking-[0.5em] font-medium">Explore</span>
      </motion.a>
    </section>
  );
}
