import { PortfolioItem } from './types';

// Initial Data for Video Portfolio
export const initialVideoItems: PortfolioItem[] = [
    {
      id: '2',
      title: 'SEOUL FASHION WEEK',
      category: 'Event',
      description: 'Runway coverage and backstage moments.',
      tags: ['event', 'brand'],
      src: 'https://wxzstudio.github.io/videos/portfolio-seoul-fashion.mp4',
      type: 'video',
      span: '2x1'
    },
    {
      id: '3',
      title: 'GALA NIGHT',
      category: 'Event',
      description: 'Luxury dinner event documentation.',
      tags: ['event'],
      src: 'https://wxzstudio.github.io/videos/portfolio-night.mp4',
      type: 'video',
      span: '1x1'
    },
    {
      id: '4',
      title: 'SHINSEGAE x SEOUL',
      category: 'Product',
      description: 'Duty free shop promotional campaign.',
      tags: ['product', 'brand'],
      src: 'https://wxzstudio.github.io/videos/portfolio-shinsegae.mp4',
      type: 'video',
      span: '1x1'
    },
     {
      id: '5',
      title: 'ZB1 SIDE SHOT',
      category: 'Celebrity Side Shot',
      description: 'Exclusive idol focus cam.',
      tags: ['celebrity'],
      src: 'https://wxzstudio.github.io/videos/240114_zb1.mp4',
      type: 'video',
      span: '1x2'
    },
    {
      id: '6',
      title: 'GRADUATION 2024',
      category: 'Graduation Exhibition',
      description: 'Artistic graduation showcase.',
      tags: ['graduation'],
      src: 'https://wxzstudio.github.io/videos/240313-CHENLU.mp4',
      type: 'video',
      span: '1x1'
    }
];

// Initial Data for Graphic Portfolio
export const initialGraphicItems: PortfolioItem[] = [
    { 
        id: '1', 
        title: 'SKINCARE BRAND VI', 
        category: 'Branding', 
        description: 'Complete visual identity system for organic skincare.',
        tags: ['branding'], 
        src: '/src/assets/images/skincare_brand_identity_1791135893057.jpg', 
        type: 'image',
        featured: true,
        span: '2x2'
    },
    { 
        id: '2', 
        title: 'IOPE CAMPAIGN', 
        category: 'Social', 
        description: 'Social media visual direction & beauty imagery.',
        tags: ['social'], 
        src: '/src/assets/images/iope_campaign_visual_1791135904668.jpg', 
        type: 'image',
        span: '2x1' 
    },
    { 
        id: '3', 
        title: 'FAN MEET POSTER', 
        category: 'Poster', 
        description: 'Key visual & typography for celebrity event.',
        tags: ['poster'], 
        src: '/src/assets/images/fan_meet_poster_visual_1791135916569.jpg', 
        type: 'image',
        span: '1x2' 
    },
    { 
        id: '4', 
        title: 'SUMMER DRINKS', 
        category: 'Packaging', 
        description: 'Artisanal botanical bottle label design series.',
        tags: ['branding', 'poster'], 
        src: '/src/assets/images/summer_drinks_packaging_1791135933394.jpg', 
        type: 'image',
        span: '1x1' 
    },
    { 
        id: '5', 
        title: 'TECH SUMMIT 2024', 
        category: 'Key Visual', 
        description: 'Main conference branding & 3D key visual.',
        tags: ['poster'], 
        src: '/src/assets/images/tech_summit_keyvisual_1791135946591.jpg', 
        type: 'image',
        span: '1x1'
    },
    { 
        id: '6', 
        title: 'HOLIDAY SPECIAL', 
        category: 'Social', 
        description: 'Festive luxury campaign marketing assets.',
        tags: ['social'], 
        src: '/src/assets/images/holiday_special_campaign_1791135965088.jpg', 
        type: 'image',
        span: '1x1'
    },
];

// Fallback image map to replace any legacy external urls
const localGraphicAssets: Record<string, string> = {
  '1': '/src/assets/images/skincare_brand_identity_1791135893057.jpg',
  '2': '/src/assets/images/iope_campaign_visual_1791135904668.jpg',
  '3': '/src/assets/images/fan_meet_poster_visual_1791135916569.jpg',
  '4': '/src/assets/images/summer_drinks_packaging_1791135933394.jpg',
  '5': '/src/assets/images/tech_summit_keyvisual_1791135946591.jpg',
  '6': '/src/assets/images/holiday_special_campaign_1791135965088.jpg',
};

// Helper to get data (preferring LocalStorage)
export const getPortfolioData = (type: 'video' | 'graphic') => {
    const storageKey = type === 'video' ? 'wxz_video_items' : 'wxz_graphic_items';
    const initial = type === 'video' ? initialVideoItems : initialGraphicItems;
    
    try {
        const stored = localStorage.getItem(storageKey);
        if (stored) {
            const parsed = JSON.parse(stored) as PortfolioItem[];
            // Migrate any external picsum urls in localStorage
            if (type === 'graphic') {
                return parsed.map(item => {
                    if (!item.src || item.src.includes('picsum.photos')) {
                        return { ...item, src: localGraphicAssets[item.id] || initialGraphicItems[0].src };
                    }
                    return item;
                });
            }
            return parsed;
        }
    } catch (e) {
        console.error("Failed to load from storage", e);
    }
    return initial;
};

// Helper to save data
export const savePortfolioData = (type: 'video' | 'graphic', items: PortfolioItem[]) => {
    const storageKey = type === 'video' ? 'wxz_video_items' : 'wxz_graphic_items';
    localStorage.setItem(storageKey, JSON.stringify(items));
};