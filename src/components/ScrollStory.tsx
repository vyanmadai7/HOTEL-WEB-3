import React from 'react';
import { motion, useScroll, useTransform, useInView, useSpring } from 'motion/react';
import { useRef } from 'react';

import Magnetic from './Magnetic';

interface StorySectionProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  reversed?: boolean;
}

interface WordProps {
  children: string;
  delay: number;
}

const Word: React.FC<WordProps> = ({ children, delay }) => (
  <span className="inline-block overflow-hidden mr-[0.2em] pb-[0.1em]">
    <motion.span
      variants={{
        hidden: { y: "110%" },
        visible: { 
          y: 0,
          transition: { duration: 1, ease: [0.22, 1, 0.36, 1], delay }
        }
      }}
      className="inline-block"
    >
      {children}
    </motion.span>
  </span>
);

const StorySection = ({ title, subtitle, description, image, reversed }: StorySectionProps) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const isTextInView = useInView(textRef, { once: false, margin: "-10% 0px -10% 0px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Advanced Parallax
  const imageY = useTransform(smoothProgress, [0, 1], ["-25%", "25%"]);
  const imageScale = useTransform(smoothProgress, [0, 0.5, 1], [1.4, 1.1, 1.4]);
  const textY = useTransform(smoothProgress, [0, 1], ["15%", "-15%"]);
  const sectionOpacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const lightLeakX = useTransform(smoothProgress, [0, 1], ["-50%", "50%"]);
  const blurValue = useTransform(smoothProgress, [0, 0.15, 0.85, 1], [15, 0, 0, 15]);
  
  const words = title.split(' ');

  return (
    <motion.div 
      ref={containerRef} 
      style={{ 
        opacity: sectionOpacity,
        filter: useTransform(blurValue, (v) => `blur(${v}px)`)
      }}
      className="min-h-screen flex items-center py-40 px-6 md:px-12 overflow-hidden relative scroll-snap-item"
    >
      {/* Cinematic Light Leak */}
      <motion.div 
        style={{ x: lightLeakX }}
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-30 opacity-30 mix-blend-screen"
      >
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[140%] bg-gradient-to-r from-delta-gold/20 via-transparent to-transparent blur-[120px] rotate-12" />
      </motion.div>

      <div className={`max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-40 items-center ${reversed ? 'lg:flex-row-reverse' : ''}`}>
        
        {/* Image Container with Sophisticated Reveal & Parallax */}
        <motion.div 
          whileHover={{ rotateY: reversed ? -5 : 5, rotateX: 2, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
          className={`relative aspect-[4/5] md:aspect-[16/9] lg:aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-[0_60px_100px_-20px_rgba(15,42,36,0.4)] ${reversed ? 'lg:order-2' : ''}`}
        >
          <motion.div
            initial={{ scaleY: 1 }}
            whileInView={{ scaleY: 0 }}
            transition={{ duration: 2, ease: [0.85, 0, 0.15, 1] }}
            viewport={{ once: true }}
            className="absolute inset-0 bg-delta-green z-10 origin-top"
          />
          <motion.div 
            style={{ y: imageY, scale: imageScale }}
            className="absolute inset-0 w-full h-[150%]"
          >
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-delta-green/40 via-transparent to-delta-green/60" />
          </motion.div>
        </motion.div>

        {/* Text Content with Word-by-Word Animation */}
        <motion.div 
          ref={textRef}
          style={{ y: textY }}
          initial="hidden"
          animate={isTextInView ? "visible" : "hidden"}
          className="space-y-14 relative z-20"
        >
          <div className="space-y-8">
            <div className="overflow-hidden">
              <motion.span 
                variants={{
                  hidden: { y: "100%", opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
                }}
                className="text-delta-gold uppercase tracking-[0.7em] text-[10px] md:text-xs font-bold block"
              >
                {subtitle}
              </motion.span>
            </div>
            
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-serif text-delta-green leading-[0.8] tracking-tighter flex flex-wrap">
              {words.map((word, i) => (
                <Word key={i} delay={0.2 + (i * 0.1)}>{word}</Word>
              ))}
            </h2>
          </div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] } }
            }}
          >
            <p className="text-xl md:text-2xl text-delta-charcoal/80 font-light leading-relaxed max-w-lg text-balance">
              {description}
            </p>
          </motion.div>

          <motion.div 
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1, transition: { duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] } }
            }}
            className="pt-10"
          >
            <Magnetic>
              <button className="group relative flex items-center gap-10 text-delta-green font-bold uppercase tracking-[0.5em] text-[10px] transition-all duration-700">
                <div className="relative overflow-hidden">
                  <span className="block transition-transform duration-700 group-hover:-translate-y-full">
                    Explore The Story
                  </span>
                  <span className="absolute top-0 left-0 block translate-y-full transition-transform duration-700 group-hover:translate-y-0 text-delta-gold">
                    Explore The Story
                  </span>
                </div>
                <div className="relative w-20 h-20 rounded-full border border-delta-green/10 flex items-center justify-center overflow-hidden transition-all duration-700 group-hover:border-delta-gold">
                  <motion.div 
                    initial={false}
                    className="absolute inset-0 bg-delta-gold translate-y-full transition-transform duration-700 group-hover:translate-y-0"
                  />
                  <div className="relative w-10 h-px bg-delta-green transition-all duration-700 group-hover:bg-delta-green group-hover:w-14" />
                </div>
              </button>
            </Magnetic>
          </motion.div>
        </motion.div>
      </div>

      {/* Background Floating Elements with Enhanced Motion */}
      <motion.div 
        style={{ 
          x: useTransform(smoothProgress, [0, 1], ["30%", "-30%"]),
          rotate: useTransform(smoothProgress, [0, 1], [-8, 8]),
          opacity: useTransform(smoothProgress, [0, 0.5, 1], [0, 0.03, 0])
        }}
        className="absolute -bottom-60 -right-40 text-[30vw] font-serif text-delta-green whitespace-nowrap pointer-events-none select-none z-0 italic font-bold"
      >
        {title.split(' ').pop()}
      </motion.div>
    </motion.div>
  );
};

export default function ScrollStory() {
  return (
    <section id="place" className="bg-delta-cream relative">
      <StorySection
        subtitle="The Place"
        title="Serenity in Every Corner"
        description="Hotel Great Web3 offers a peaceful garden setting where nature meets comfort. Our space is designed for those who seek tranquility without compromising on luxury."
        image="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop"
      />
      <StorySection
        reversed
        subtitle="The Taste"
        title="A Culinary Masterpiece"
        description="From our signature Chicken Momos to authentic Nepali cuisine, every dish is a celebration of local flavors and premium ingredients. Experience the true taste of hospitality."
        image="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop"
      />
      <StorySection
        subtitle="The Experience"
        title="Celebrate Life's Moments"
        description="Whether it's a family gathering, a birthday celebration, or a quiet evening stay, we provide the perfect backdrop for your most cherished memories."
        image="https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=2070&auto=format&fit=crop"
      />
    </section>
  );
}
