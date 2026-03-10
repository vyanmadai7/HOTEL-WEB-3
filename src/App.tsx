/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ScrollStory from './components/ScrollStory';
import MenuSection from './components/MenuSection';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import ReservationSection from './components/ReservationSection';
import RoomBookingSection from './components/RoomBookingSection';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
      lerp: 0.05, // Smoother interpolation
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Smooth scroll behavior for anchor links using Lenis
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.getAttribute('href')?.startsWith('#')) {
        const targetId = anchor.getAttribute('href');
        if (!targetId || targetId === '#') return;
        
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const navHeight = 80;
          lenis.scrollTo(targetElement as HTMLElement, {
            offset: -navHeight,
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        }
      }
    };

    window.addEventListener('click', handleAnchorClick);

    return () => {
      window.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative">
      <CustomCursor />
      
      {/* Noise Texture Overlay */}
      <div className="fixed inset-0 z-[9998] pointer-events-none opacity-[0.03] mix-blend-overlay">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-delta-gold z-[60] origin-left"
        style={{ scaleX }}
      />

      <Navbar />
      
      <main id="home" className="scroll-snap-container">
        <section className="scroll-snap-item">
          <Hero />
        </section>
        
        <div id="story">
          <ScrollStory />
        </div>

        <div id="menu" className="scroll-snap-item">
          <MenuSection />
        </div>

        <div id="gallery" className="scroll-snap-item">
          <Gallery />
        </div>

        <section className="scroll-snap-item">
          <Testimonials />
        </section>

        <div id="events" className="py-32 px-6 md:px-12 bg-delta-cream overflow-hidden scroll-snap-item">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <span className="text-delta-gold uppercase tracking-[0.4em] text-xs font-bold block">
                  Dining & Gatherings
                </span>
                <h2 className="text-5xl md:text-7xl font-serif text-delta-green leading-tight">
                  Intimate <br /> Celebrations
                </h2>
                <p className="text-lg text-delta-charcoal/60 font-light leading-relaxed">
                  While we specialize in peaceful stays and fine dining, our cozy spaces are perfect for small, intimate gatherings. Whether it's a quiet birthday dinner or a small family get-together, we provide the perfect setting for your meaningful moments.
                </p>
                <div className="flex flex-wrap gap-4">
                  {['Intimate Dinners', 'Family Get-togethers', 'Small Birthdays', 'Business Lunches'].map((tag) => (
                    <span key={tag} className="px-4 py-2 rounded-full border border-delta-charcoal/10 text-[10px] uppercase tracking-widest font-bold text-delta-charcoal/60">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop"
                  alt="Celebration Event"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-delta-green/20" />
              </motion.div>
            </div>
          </div>
        </div>

        <div id="location" className="w-full h-[600px] bg-delta-charcoal relative overflow-hidden scroll-snap-item">
          <iframe
            src="https://maps.google.com/maps?q=Hotel+Great+Web3&t=&z=16&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'grayscale(0.1) contrast(1.05)' }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Hotel Great Web3 Location"
          ></iframe>
        </div>

        <RoomBookingSection />

        <section className="scroll-snap-item">
          <ReservationSection />
        </section>
      </main>

      <Footer />
    </div>
  );
}
