import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

import Magnetic from './Magnetic';

const menuData = {
  Starters: {
    image: "https://images.unsplash.com/photo-1589119908995-c6837fa14848?q=80&w=600&auto=format&fit=crop",
    items: [
      { name: "Veg Cutlet 2pc.", price: "60" },
      { name: "Veg Pakora 6pc.", price: "80" },
      { name: "Onion Pakora 6pc.", price: "60" },
      { name: "Paneer Pakora 8pc.", price: "90" },
      { name: "Samosa 2pc.", price: "30" },
      { name: "Pav Bhaji", price: "80" },
      { name: "Chole Bhature", price: "100" },
      { name: "Mushroom 65", price: "80" },
      { name: "Paneer 65", price: "80" },
      { name: "Gobi 65", price: "70" },
      { name: "Spring Roll", price: "110" },
      { name: "Paneer Roll", price: "120" },
      { name: "Manchurian Roll", price: "100" },
      { name: "Veg Manchurian Dry/Gravy", price: "90/100" },
      { name: "Paneer Manchurian Dry/Gravy", price: "100/110" },
      { name: "Mushroom Manchurian", price: "100/110" },
      { name: "Honey Chilli Potato", price: "100" },
      { name: "Babycorn Chilli Dry/Gravy", price: "90/100" },
      { name: "Paneer Pepper Dry", price: "120" },
      { name: "Paneer Chilli Dry/Gravy", price: "110/120" },
    ]
  },
  Soups: {
    image: "https://images.unsplash.com/photo-1547592115-842446043ad7?q=80&w=600&auto=format&fit=crop",
    items: [
      { name: "Cream of Tomato", price: "100" },
      { name: "Clear", price: "70" },
      { name: "Hot N Sour", price: "80" },
      { name: "Manchow", price: "90" },
      { name: "Lentil", price: "80" },
      { name: "Makai (Sweet Corn)", price: "90" },
      { name: "Mushroom", price: "80" },
      { name: "Hariyali Chef Sp.", price: "100" },
    ]
  },
  "Main Course": {
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=600&auto=format&fit=crop",
    items: [
      { name: "Authentic Nepali Thali", price: "450" },
      { name: "Chicken Curry", price: "400" },
      { name: "Mutton Curry", price: "550" },
      { name: "Paneer Butter Masala", price: "350" },
      { name: "Mix Veg Curry", price: "280" },
      { name: "Dal Makhani", price: "300" },
      { name: "Jeera Rice", price: "150" },
      { name: "Butter Naan", price: "60" },
      { name: "Garlic Naan", price: "80" },
      { name: "Tandoori Roti", price: "30" },
    ]
  },
  Drinks: {
    image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=600&auto=format&fit=crop",
    items: [
      { name: "Great Web3 Special Mocktail", price: "180" },
      { name: "Fresh Lime Soda", price: "120" },
      { name: "Mixed Fruit Lassi", price: "150" },
      { name: "Masala Tea", price: "80" },
      { name: "Cold Coffee", price: "160" },
      { name: "Mineral Water", price: "40" },
      { name: "Soft Drinks", price: "60" },
    ]
  },
  Desserts: {
    image: "https://images.unsplash.com/photo-1589119908995-c6837fa14848?q=80&w=600&auto=format&fit=crop",
    items: [
      { name: "Gulab Jamun (2pc)", price: "120" },
      { name: "Saffron Kheer", price: "220" },
      { name: "Yomari", price: "180" },
      { name: "Ice Cream Scoop", price: "100" },
    ]
  }
};

type CategoryKey = keyof typeof menuData;

export default function MenuSection() {
  const [activeTab, setActiveTab] = useState<CategoryKey>("Starters");

  return (
    <section id="menu" className="py-32 bg-black text-white overflow-hidden relative min-h-[1000px]">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#1a1a1a_0%,transparent_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-delta-gold uppercase tracking-[0.5em] text-xs font-bold block mb-4"
          >
            Authentic Flavors
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-7xl md:text-9xl font-serif italic text-white mb-8 tracking-tighter"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            The Menu
          </motion.h2>
          <div className="w-24 h-px bg-delta-gold mx-auto" />
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-20">
          {(Object.keys(menuData) as CategoryKey[]).map((category) => (
            <Magnetic key={category}>
              <button
                onClick={() => setActiveTab(category)}
                className={`px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${
                  activeTab === category
                    ? 'bg-delta-gold border-delta-gold text-delta-green shadow-[0_10px_30px_rgba(242,125,38,0.2)]'
                    : 'bg-transparent border-white/10 text-white/50 hover:border-white/30 hover:text-white'
                }`}
              >
                {category}
              </button>
            </Magnetic>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start"
          >
            {/* Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl border border-white/10">
                <motion.img
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.5 }}
                  src={menuData[activeTab].image}
                  alt={activeTab}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-10 left-10">
                  <h3 className="text-5xl font-serif text-white italic">{activeTab}</h3>
                </div>
              </div>
              {/* Decorative floating element */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-delta-gold/10 rounded-full blur-3xl" />
            </div>

            {/* Menu List Card */}
            <div className="lg:col-span-7">
              <div className="bg-[#1a1a1a]/40 backdrop-blur-md rounded-[3rem] p-8 md:p-12 border border-white/5 shadow-2xl">
                <div className="flex items-center gap-6 mb-12">
                  <h4 className="text-3xl font-serif text-[#4ade80] tracking-tight">{activeTab}</h4>
                  <div className="flex-1 h-px bg-gradient-to-r from-[#4ade80]/40 to-transparent" />
                </div>

                <div className="grid grid-cols-1 gap-y-6">
                  {menuData[activeTab].items.map((item, i) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="flex justify-between items-end group"
                    >
                      <div className="flex flex-col">
                        <span className="text-lg md:text-xl font-medium text-white/90 group-hover:text-[#4ade80] transition-colors duration-300">
                          {item.name}
                        </span>
                      </div>
                      <div className="flex-1 mx-4 border-b border-dotted border-white/10 group-hover:border-[#4ade80]/30 transition-colors duration-300 mb-1.5" />
                      <span className="text-lg md:text-xl font-bold text-delta-gold group-hover:text-[#4ade80] transition-colors duration-300">
                        {item.price}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
