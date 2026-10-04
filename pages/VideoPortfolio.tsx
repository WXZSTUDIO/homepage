import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PortfolioItem } from '../types';
import { getPortfolioData } from '../data';
import { Play, X, Star, ArrowUpRight } from 'lucide-react';

// Helper to extract YouTube ID
const getYouTubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

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

const mediaVariants = {
  rest: {
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  },
  hover: {
    scale: 1.07,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

const scrimVariants = {
  rest: {
    opacity: 0.45,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
  },
  hover: {
    opacity: 0.85,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
  }
};

const playIconVariants = {
  rest: {
    scale: 0.85,
    opacity: 0,
    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] }
  },
  hover: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
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

// Shared Filter Component
const Filter: React.FC<{ 
  filters: { key: string; label: string }[]; 
  activeFilter: string; 
  onFilterChange: (f: string) => void;
}> = ({ filters, activeFilter, onFilterChange }) => (
  <div className="flex space-x-2 md:space-x-3 mb-12 overflow-x-auto no-scrollbar pb-2 px-6 md:px-12 max-w-7xl mx-auto">
    {filters.map(filter => (
      <button
        key={filter.key}
        onClick={() => onFilterChange(filter.key)}
        className={`px-5 py-2 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-300 whitespace-nowrap ${
          activeFilter === filter.key
            ? 'bg-accent text-black font-bold shadow-[0_0_15px_rgba(255,201,0,0.35)]'
            : 'bg-white/5 text-secondary border border-white/10 hover:border-white/40 hover:text-white backdrop-blur-sm'
        }`}
      >
        {filter.label}
      </button>
    ))}
  </div>
);

// Immersive Video Card with Framer Motion interactive hover effect
const VideoCard: React.FC<{ 
  item: PortfolioItem; 
  onClick: () => void;
  index: number;
}> = ({ item, onClick, index }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const youtubeId = getYouTubeId(item.src);

  // Play preview on hover (only for local videos)
  useEffect(() => {
    if (youtubeId) return;
    if (!videoRef.current) return;
    if (isHovered) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isHovered, youtubeId]);

  // Determine grid classes based on featured status or manual span
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`group relative rounded-sm overflow-hidden cursor-pointer bg-surface border ${getGridClasses()} select-none`}
      style={{ minHeight: '300px' }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Background Media Layer with Framer Motion Scale */}
      <motion.div 
        variants={mediaVariants}
        className="absolute inset-0 w-full h-full overflow-hidden bg-neutral-950 will-change-transform"
      >
        {youtubeId ? (
          <img 
            src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
            alt={item.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
          >
            <source src={item.src} type="video/mp4" />
          </video>
        )}
      </motion.div>

      {/* Vignette & Gradient Scrim - deepens on hover to provide contrast */}
      <div className="absolute inset-0 vignette opacity-40 pointer-events-none" />
      <motion.div 
        variants={scrimVariants}
        className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" 
      />

      {/* Top Floating Badge */}
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
      </div>

      {/* Play Icon - Centered, animated with Framer Motion */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
        <motion.div 
          variants={playIconVariants}
          className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl"
        >
          <Play size={26} className="text-accent fill-accent ml-1" />
        </motion.div>
      </div>

      {/* Subtle Project Title Overlay - Revealed using Framer Motion on hover */}
      <motion.div 
        variants={overlayVariants}
        className="absolute inset-x-0 bottom-0 p-6 md:p-8 z-20 flex flex-col justify-end items-start pointer-events-none will-change-transform"
      >
        {/* Category & Tag Kicker */}
        <motion.div 
          variants={childItemVariants}
          className="flex items-center space-x-2 text-xs font-mono tracking-widest uppercase text-accent mb-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block shadow-[0_0_8px_rgba(255,201,0,0.8)]" />
          <span>{item.category}</span>
          <span className="text-white/30">·</span>
          <span className="text-white/60 lowercase">{item.tags.join(' / ')}</span>
        </motion.div>

        {/* Title */}
        <motion.h3 
          variants={childItemVariants}
          className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight leading-tight drop-shadow-md"
        >
          {item.title}
        </motion.h3>

        {/* Description & Action Cue */}
        {item.description && (
          <motion.div 
            variants={childItemVariants}
            className="mt-2.5 w-full flex items-center justify-between text-xs text-white/80 font-light"
          >
            <p className="line-clamp-2 max-w-[85%] leading-relaxed text-neutral-300">
              {item.description}
            </p>
            <span className="text-accent flex items-center space-x-1 font-mono text-[11px] tracking-wider shrink-0 ml-3">
              <span>Play</span>
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

const VideoPortfolio: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState<PortfolioItem | null>(null);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);

  useEffect(() => {
    setPortfolioItems(getPortfolioData('video'));
  }, []);

  const filteredItems = filter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.tags.includes(filter));

  const handleClose = () => {
    setSelectedVideo(null);
  };

  const renderLightboxContent = () => {
    if (!selectedVideo) return null;
    const youtubeId = getYouTubeId(selectedVideo.src);

    if (youtubeId) {
      // YouTube Iframe - maintain 16:9 aspect ratio
      return (
        <div className="w-full max-w-6xl aspect-video bg-black rounded-sm overflow-hidden shadow-2xl border border-white/10">
          <iframe 
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
            title={selectedVideo.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    }
    
    // Native Video - Dynamic sizing (Vertical/Horizontal)
    return (
      <div className="relative max-w-[95vw] max-h-[85vh] flex items-center justify-center">
        <video 
          src={selectedVideo.src} 
          controls 
          autoPlay 
          playsInline
          className="max-w-full max-h-[85vh] w-auto h-auto rounded-sm shadow-2xl border border-white/10 outline-none"
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header section with refined editorial typography */}
      <div className="pt-12 px-6 md:px-12 mb-10 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-[0.25em] text-accent mb-3">
          <span className="w-2 h-2 rounded-full bg-accent inline-block" />
          <span>Cinematic Reel</span>
        </div>
        <h2 className="text-4xl md:text-7xl font-display font-bold mb-4 tracking-tighter text-white">
          Selected Works
        </h2>
        <p className="text-secondary text-base md:text-lg max-w-2xl font-light leading-relaxed">
          A collection of cinematic moments, runway documentation, and high-retention visual storytelling.
        </p>
      </div>

      <Filter 
        activeFilter={filter}
        onFilterChange={setFilter}
        filters={[
          { key: 'all', label: '全部 (All)' },
          { key: 'brand', label: '品牌 (Brand)' },
          { key: 'event', label: '活动 (Event)' },
          { key: 'celebrity', label: '明星 (Celeb)' },
          { key: 'graduation', label: '毕设 (Grad)' },
        ]}
      />

      {/* Bento Grid */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-4 auto-rows-[320px] md:auto-rows-[360px] gap-4 md:gap-6 grid-flow-dense"
        >
          {filteredItems.map((item, index) => (
            <VideoCard 
              key={item.id} 
              item={item} 
              index={index} 
              onClick={() => setSelectedVideo(item)} 
            />
          ))}
        </motion.div>
      </div>

      {/* Lightbox Modal with Framer Motion AnimatePresence */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4"
            onClick={handleClose}
          >
            <button 
              onClick={(e) => { e.stopPropagation(); handleClose(); }}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-all z-20 border border-white/10"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
            
            {/* Modal Content */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="flex flex-col items-center"
            >
              {renderLightboxContent()}
              
              <div className="mt-6 text-center pointer-events-none px-4 max-w-xl">
                <div className="flex items-center justify-center space-x-2 text-xs font-mono text-accent uppercase tracking-widest mb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
                  <span>{selectedVideo.category}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-1.5">{selectedVideo.title}</h3>
                <p className="text-secondary text-sm font-light">{selectedVideo.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VideoPortfolio;
