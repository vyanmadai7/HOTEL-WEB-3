import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

import Magnetic from './Magnetic';

const testimonials = [
  {
    name: "Aashish Sharma",
    role: "Local Guide",
    quote: "Great service and good environment for parties. The staff is incredibly friendly and the food is consistently amazing.",
    rating: 5
  },
  {
    name: "Sita Gurung",
    role: "Food Enthusiast",
    quote: "Great momos and friendly service. It's my go-to place whenever I'm here. The garden setting is so peaceful.",
    rating: 4
  },
  {
    name: "Rajesh Hamal",
    role: "Event Planner",
    quote: "We hosted a large family gathering here and everything was perfect. From the decoration to the catering, Hotel Great Web3 exceeded expectations.",
    rating: 5
  }
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-32 px-6 md:px-12 bg-delta-green text-delta-cream relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-delta-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="mb-12 flex justify-center">
          <Quote size={60} className="text-delta-gold/30" />
        </div>

        <div className="relative h-[350px] md:h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={i < testimonials[current].rating ? "fill-delta-gold text-delta-gold" : "text-delta-cream/20"}
                  />
                ))}
              </div>
              
              <p className="text-2xl md:text-3xl font-serif italic leading-relaxed text-balance">
                "{testimonials[current].quote}"
              </p>
              
              <div>
                <h4 className="text-lg font-bold text-delta-gold">{testimonials[current].name}</h4>
                <p className="text-sm text-delta-cream/50 uppercase tracking-widest">{testimonials[current].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-8 mt-12">
          <Magnetic>
            <button
              onClick={prev}
              className="p-4 rounded-full border border-delta-cream/20 hover:bg-delta-cream hover:text-delta-green transition-all duration-300"
            >
              <ChevronLeft size={24} />
            </button>
          </Magnetic>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === current ? 'bg-delta-gold w-8' : 'bg-delta-cream/20'}`}
              />
            ))}
          </div>
          <Magnetic>
            <button
              onClick={next}
              className="p-4 rounded-full border border-delta-cream/20 hover:bg-delta-cream hover:text-delta-green transition-all duration-300"
            >
              <ChevronRight size={24} />
            </button>
          </Magnetic>
        </div>

        <div className="mt-20 pt-20 border-t border-delta-cream/10">
          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            <div className="text-center">
              <span className="text-5xl font-serif text-delta-gold block mb-2">4.2</span>
              <span className="text-xs uppercase tracking-[0.3em] font-bold text-delta-cream/50">Average Rating</span>
            </div>
            <div className="h-12 w-px bg-delta-cream/10 hidden md:block" />
            <div className="text-center">
              <span className="text-5xl font-serif text-delta-gold block mb-2">500+</span>
              <span className="text-xs uppercase tracking-[0.3em] font-bold text-delta-cream/50">Happy Guests</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
