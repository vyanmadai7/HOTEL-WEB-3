import React from 'react';
import { motion } from 'motion/react';

const images = [
  {
    url: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop",
    title: "Restaurant Interior",
  },
  {
    url: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2074&auto=format&fit=crop",
    title: "Garden Space",
  },
  {
    url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop",
    title: "Dining Experience",
  },
  {
    url: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=2070&auto=format&fit=crop",
    title: "Celebrations",
  },
  {
    url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop",
    title: "Food Photography",
  },
  {
    url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop",
    title: "Gourmet Dishes",
  },
  {
    url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=2070&auto=format&fit=crop",
    title: "Signature Pizza",
  },
  {
    url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop",
    title: "Healthy Salads",
  },
  {
    url: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=2070&auto=format&fit=crop",
    title: "Sweet Desserts",
  }
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-32 px-6 md:px-12 bg-delta-cream">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 space-y-4">
          <span className="text-delta-gold uppercase tracking-[0.4em] text-xs font-bold block">
            Visual Journey
          </span>
          <h2 className="text-5xl md:text-7xl font-serif text-delta-green">
            The Gallery
          </h2>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-10 space-y-10">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60, scale: 0.9, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              whileHover={{ 
                rotateY: index % 2 === 0 ? 5 : -5,
                rotateX: 5,
                z: 30,
                scale: 1.05
              }}
              transition={{ 
                duration: 1.2, 
                delay: (index % 3) * 0.1, 
                ease: [0.22, 1, 0.36, 1],
                rotateY: { type: "spring", stiffness: 100, damping: 15 },
                scale: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
              }}
              viewport={{ once: true, margin: "-100px" }}
              style={{ transformStyle: "preserve-3d", perspective: "1200px" }}
              className="relative group overflow-hidden rounded-[2.5rem] cursor-pointer break-inside-avoid shadow-2xl hover:shadow-[0_50px_100px_-30px_rgba(15,42,36,0.4)] transition-all duration-700 bg-delta-green/5"
            >
              <div className="overflow-hidden rounded-[2.5rem] relative" style={{ transform: "translateZ(20px)" }}>
                <motion.img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-700" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-delta-green/20 to-delta-green/90 opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-end justify-center backdrop-blur-[2px]">
                <div 
                  className="text-center p-10 transform translate-y-10 group-hover:translate-y-0 transition-transform duration-700 ease-[0.22, 1, 0.36, 1]"
                  style={{ transform: "translateZ(50px)" }}
                >
                  <h3 className="text-delta-cream font-serif text-4xl mb-4 tracking-tighter">{image.title}</h3>
                  <div className="w-16 h-px bg-delta-gold mx-auto mb-6 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-200" />
                  <div className="flex items-center justify-center gap-4 text-delta-gold text-[9px] uppercase tracking-[0.4em] font-bold">
                    <span>Explore</span>
                    <div className="w-8 h-px bg-delta-gold/30" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
