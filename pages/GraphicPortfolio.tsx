import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PortfolioItem } from '../types';
import { getPortfolioData } from '../data';
import { Star, ZoomIn, ArrowUpRight, X, Sparkles } from 'lucide-react';

// Framer Motion Animation Variants for the interactive hover effect
const cardVariants = {
  rest: {
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  hover: {
    borderColor: 'rgba(255, 201, 0, 0.35)',
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
  }
};

const imageVariants = {
  rest: {
    scale: 1,
    filter: 'grayscale(20%) brightness(0.92)',
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  },
  hover: {
    scale: 1.07,
    filter: 'grayscale(0%) brightness(1)',
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

const scrimVariants = {
  rest: {
    opacity: 0.4,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
  },
  hover: {
    opacity: 0.88,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
  }
};

const overlayVariants = {
  rest: {
    opacity: 0,
    y: 14,
    transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] }
  },
  hover: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.4, 
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.06,
      delayChildren: 0.04
    }
  }
};

const childItemVariants = {
  rest: { opacity: 0, y: 8 },
  hover: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } 
  }
};

const topActionVariants = {
  rest: { opacity: 0, scale: 0.85, y: -4 },
  hover: { 
    opacity: 1, 
    scale: 1, 
    y: 0, 
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } 
  }
};

// Immersive Graphic Card with Framer Motion interactive hover effect
const GraphicCard: React.FC<{ 
  item: PortfolioItem; 
  index: number;
  onSelect: (item: PortfolioItem) => void;
}> = ({ item, index, onSelect }) => {
  const [imageError, setImageError] = useState(false);

  // Determine grid layout span
  const getGridClasses = () => {
    if (item.featured) return "md:col-span-2 md:row-span-2";
    if (item.span === '2x1') return "md:col-span-2 md:row-span-1";
    if (item.span === '1x2') return "md:col-span-1 md:row-span-2";
    return "md:col-span-1 md:row-span-1";
  };

  return (
    <motion.div 
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileTap="hover"
      variants={cardVariants}
      onClick={() => onSelect(item)}
      className={`group relative rounded-sm overflow-hidden cursor-pointer bg-surface border ${getGridClasses()} select-none`}
      style={{ minHeight: '300px' }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(item);
        }
      }}
    >
      {/* Background Image Container with Framer Motion Scaling */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-neutral-950">
        {!imageError ? (
          <motion.img 
            variants={imageVariants}
            src={item.src} 
            alt={item.title} 
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover will-change-transform"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-neutral-900 to-black text-neutral-500 p-6 text-center">
            <Sparkles className="w-10 h-10 text-accent/50 mb-3" />
            <span className="font-display text-white text-lg font-bold">{item.title}</span>
            <span className="text-xs text-neutral-400 mt-1 uppercase tracking-widest">{item.category}</span>
          </div>
        )}
      </div>

      {/* Subtle Vignette & Gradient Scrim - deepens on hover to provide contrast */}
      <div className="absolute inset-0 vignette opacity-40 pointer-events-none" />
      <motion.div 
        variants={scrimVariants}
        className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none"
      />

      {/* Top Floating Badge & Action Indicator */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
        {item.featured ? (
          <span className="px-2.5 py-1 rounded-sm bg-accent text-black text-[10px] font-mono font-bold uppercase tracking-widest flex items-center space-x-1 shadow-lg">
            <Star size={10} fill="currentColor" />
            <span>Featured</span>
          </span>
        ) : (
          <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">
            #{String(index + 1).padStart(2, '0')}
          </span>
        )}

        <motion.div 
          variants={topActionVariants}
          className="p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white shadow-xl flex items-center justify-center"
        >
          <ZoomIn size={16} className="text-accent" />
        </motion.div>
      </div>

      {/* Project Title Overlay - Revealed using Framer Motion on hover */}
      <motion.div 
        variants={overlayVariants}
        className="absolute inset-x-0 bottom-0 p-6 md:p-8 z-20 flex flex-col justify-end items-start pointer-events-none will-change-transform"
      >
        {/* Subtle Category & Micro-kicker */}
        <motion.div 
          variants={childItemVariants}
          className="flex items-center space-x-2 text-xs font-mono tracking-widest uppercase text-accent mb-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block shadow-[0_0_8px_rgba(255,201,0,0.8)]" />
          <span>{item.category}</span>
          <span className="text-white/30">·</span>
          <span className="text-white/60 lowercase">{item.tags.join(' / ')}</span>
        </motion.div>

        {/* Project Title */}
        <motion.h3 
          variants={childItemVariants}
          className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight leading-tight drop-shadow-md"
        >
          {item.title}
        </motion.h3>

        {/* Project Description & Action Cue */}
        {item.description && (
          <motion.div 
            variants={childItemVariants}
            className="mt-2.5 w-full flex items-center justify-between text-xs text-white/80 font-light"
          >
            <p className="line-clamp-2 max-w-[85%] leading-relaxed text-neutral-300">
              {item.description}
            </p>
            <span className="text-accent flex items-center space-x-1 font-mono text-[11px] tracking-wider shrink-0 ml-3">
              <span>View</span>
              <ArrowUpRight size={13} />
            </span>
          </motion.div>
        )}
      </motion.div>

      {/* Static Quiet Kicker at Bottom when NOT hovered (minimal preview line) */}
      <div className="group-hover:opacity-0 transition-opacity duration-300 absolute bottom-5 left-6 right-6 z-10 flex items-center justify-between text-xs text-white/60 pointer-events-none">
        <span className="font-display font-medium text-white/80 tracking-wide truncate max-w-[70%]">
          {item.title}
        </span>
        <span className="text-[11px] font-mono text-accent/80 uppercase tracking-widest">
          {item.category}
        </span>
      </div>

      {/* Subtle Hairline Border Highlight */}
      <div className="absolute inset-0 border border-white/0 group-hover:border-accent/40 transition-colors duration-400 pointer-events-none rounded-sm" />
    </motion.div>
  );
};

const GraphicPortfolio: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  useEffect(() => {
    setItems(getPortfolioData('graphic'));
  }, []);

  const filteredItems = filter === 'all' 
    ? items 
    : items.filter(item => item.tags.includes(filter));

  const filters = [
    { key: 'all', label: '全部 (All)' },
    { key: 'branding', label: '品牌 (Branding)' },
    { key: 'social', label: '社媒 (Social)' },
    { key: 'poster', label: '海报 (Poster)' },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header section with refined editorial typography */}
      <div className="pt-12 px-6 md:px-12 mb-10 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-[0.25em] text-accent mb-3">
          <span className="w-2 h-2 rounded-full bg-accent inline-block" />
          <span>Visual Archive</span>
        </div>
        <h2 className="text-4xl md:text-7xl font-display font-bold mb-4 tracking-tighter text-white">
          Graphic Design
        </h2>
        <p className="text-secondary text-base md:text-lg max-w-2xl font-light leading-relaxed">
          Visual identity systems, editorial direction, typography, and bespoke digital artifacts.
        </p>
      </div>

      {/* Interactive Filter Bar */}
      <div className="flex space-x-2 md:space-x-3 mb-12 overflow-x-auto no-scrollbar pb-2 px-6 md:px-12 max-w-7xl mx-auto">
        {filters.map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-5 py-2 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-300 whitespace-nowrap ${
              filter === f.key
                ? 'bg-accent text-black font-bold shadow-[0_0_15px_rgba(255,201,0,0.35)]'
                : 'bg-white/5 text-secondary border border-white/10 hover:border-white/40 hover:text-white backdrop-blur-sm'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Bento Grid */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-4 auto-rows-[320px] md:auto-rows-[360px] gap-4 md:gap-6 grid-flow-dense"
        >
          {filteredItems.map((item, index) => (
            <GraphicCard 
              key={item.id} 
              item={item} 
              index={index}
              onSelect={setSelectedItem}
            />
          ))}
        </motion.div>
      </div>

      {/* High-Resolution Lightbox Modal with Framer Motion */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-10"
            onClick={() => setSelectedItem(null)}
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedItem(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-all z-20 border border-white/10"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            {/* Modal Body */}
            <motion.div 
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[90vh] flex flex-col md:flex-row bg-neutral-950 border border-white/15 rounded-lg overflow-hidden shadow-2xl"
            >
              {/* Image Preview */}
              <div className="flex-1 bg-black flex items-center justify-center p-4 md:p-8 min-h-[300px] overflow-hidden">
                <img 
                  src={selectedItem.src} 
                  alt={selectedItem.title} 
                  className="max-w-full max-h-[75vh] w-auto h-auto object-contain rounded-sm shadow-2xl"
                />
              </div>

              {/* Sidebar Info */}
              <div className="w-full md:w-80 p-6 md:p-8 border-t md:border-t-0 md:border-l border-white/10 flex flex-col justify-between bg-neutral-900/60 backdrop-blur-xl">
                <div>
                  <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-accent mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span>{selectedItem.category}</span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4 tracking-tight">
                    {selectedItem.title}
                  </h3>

                  <p className="text-secondary text-sm font-light leading-relaxed mb-6">
                    {selectedItem.description || 'Editorial art direction and design system by WXZ STUDIO.'}
                  </p>

                  <div className="space-y-3 border-t border-white/10 pt-4 text-xs font-mono">
                    <div className="flex justify-between text-neutral-400">
                      <span>TYPE</span>
                      <span className="text-white uppercase">{selectedItem.type}</span>
                    </div>
                    <div className="flex justify-between text-neutral-400">
                      <span>TAGS</span>
                      <span className="text-white uppercase">{selectedItem.tags.join(', ')}</span>
                    </div>
                    <div className="flex justify-between text-neutral-400">
                      <span>STUDIO</span>
                      <span className="text-accent">WXZ STUDIO</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 mt-6">
                  <p className="text-[11px] text-neutral-500 font-mono tracking-wider">
                    © 2026 WXZ STUDIO · ALL RIGHTS RESERVED
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GraphicPortfolio;
