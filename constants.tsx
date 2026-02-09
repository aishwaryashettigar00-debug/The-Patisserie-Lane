
import { Category, Product, Testimonial } from './types';

export const DEFAULT_SITE_TEXT = {
  // Hero Section
  home_hero_title: "Baking for Life's Sweetest Moments.",
  home_hero_italic: "Life's Sweetest",
  home_hero_tagline: "Premium Artisanal Eggless",
  
  // About Section
  about_title: "Crafting Digital Sweetness.",
  about_quote: "Scaling up shouldn't mean losing the artisanal touch.",
  about_content_1: "Founded by Adwita Mathur, The Patisserie Lane is a testament to the belief that eggless desserts can be just as decadent, structured, and beautiful as traditional ones.",
  about_content_2: "After graduating from Lavonne Academy, Adwita set out to disrupt the home-baking scene in Bangalore. We leverage viral Reels to showcase the 'Behind the Scenes' of every creation.",
  
  // Stalls & Events
  stalls_active: "YES",
  stalls_location: "Upcoming: Weekend Pop-up at Sarjapur Social",
  stalls_date: "This Saturday & Sunday | 11 AM - 9 PM",
  stalls_cta: "Visit our Stall",

  // Order Section
  order_promo_title: "Place Your Order",
  order_promo_desc: "To manage our growing volume (now 5+ orders/day), we require a 10% advance to secure your slot.",
  
  // Process Steps
  step_1_title: "Consultation",
  step_1_desc: "Browse our Studio collection or upload inspiration for a bespoke quote.",
  step_2_title: "Confirmation",
  step_2_desc: "Secure your production slot with a small 10% advance payment.",
  step_3_title: "Artisanal Prep",
  step_3_desc: "Adwita hand-crafts every element using premium, eggless ingredients.",
  step_4_title: "Studio Pickup",
  step_4_desc: "Collect from our Sarjapur studio for maximum freshness.",

  // FAQs
  faq_1_q: "Is everything 100% eggless?",
  faq_1_a: "Yes, our entire studio is a 100% vegetarian environment. We use professional-grade substitutes to ensure textures are identical to traditional pastries.",
  faq_2_q: "How far in advance should I book?",
  faq_2_a: "Bento cakes require 24-48 hours. Themed celebration cakes should be booked 3-5 days in advance to ensure slot availability.",
  faq_3_q: "Do you offer delivery?",
  faq_3_a: "We primarily recommend self-pickup from Sarjapur to ensure fragile cakes stay intact. We can arrange Dunzo/Porter at the customer's risk.",
  faq_4_q: "Can I customize the flavor?",
  faq_4_a: "Absolutely. Our most popular fusions include Rasmalai, Belgian Chocolate, and Zesty Lemon Blueberry.",

  // Contact Info
  contact_address: "Sarjapur / Bellandur, Bengaluru, Karnataka",
  contact_phone: "+91 78292 31868",
  contact_email: "thepatisserielane@gmail.com",
  contact_hours: "9 AM — 8 PM",
  
  // Testimonials (Mock keys for editing)
  test_1_name: "Pooja Puri",
  test_1_rev: "The DIY Bento Kit was the highlight of our date night! So easy and tastes professional.",
  test_2_name: "Srijan R.",
  test_2_rev: "Hands down the best eggless cakes in Sarjapur. The Rasmalai tubs are to die for!",
  test_3_name: "Anita Sharma",
  test_3_rev: "Adwita is an artist. Her attention to detail is visible in every petal."
};

export const getSiteText = (key: keyof typeof DEFAULT_SITE_TEXT): string => {
  const saved = localStorage.getItem(`text_${key}`);
  return saved || DEFAULT_SITE_TEXT[key];
};

export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 'vday-bento-kit',
    name: 'DIY Bento Decoration Kit',
    price: 350,
    category: Category.BENTO_STUDIO,
    description: 'The viral TikTok experience! Includes a blank 4" bento cake, 3 signature cream piping bags, and artisan sprinkles.',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&q=80&w=800',
    features: ['Interactive DIY', 'Everything Included'],
    preparationTime: 'Next Day Available'
  },
  {
    id: 'korean-bento',
    name: 'Signature Korean Bento',
    price: 300,
    category: Category.BENTO_STUDIO,
    description: 'Minimalist, aesthetic, and delicious. Our signature 4-inch cake in a shell box.',
    image: 'https://images.unsplash.com/photo-1519340333755-50721343aa52?auto=format&fit=crop&q=80&w=800',
    features: ['Custom Text', 'Aesthetic'],
    preparationTime: '24h Notice'
  },
  {
    id: 'signature-rasmalai',
    name: 'Artisanal Rasmalai Tub',
    price: 220,
    category: Category.QUICK_PICKS,
    description: 'Our fusion masterclass. Cardamom-infused sponge soaked in saffron milk.',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=800',
    features: ['Best Seller', 'Fusion'],
    preparationTime: 'Same Day'
  },
  {
    id: 'cupcake-box',
    name: 'Gourmet Cupcake Set',
    price: 450,
    category: Category.QUICK_PICKS,
    description: 'Box of 6 moist cupcakes. Belgian Chocolate, Red Velvet, and Classic Vanilla.',
    image: 'https://images.unsplash.com/photo-1519869325930-281a2b753594?auto=format&fit=crop&q=80&w=800',
    features: ['Assorted', '100% Eggless'],
    preparationTime: '24h Notice'
  },
  {
    id: 'celebration-cake',
    name: 'Bespoke Celebration Cake',
    price: 1500,
    category: Category.CELEBRATION,
    description: 'A masterpiece tailored to your theme. From minimalist designs to elaborate floral tiers.',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800',
    features: ['Lavonne Standards', 'Themed'],
    preparationTime: '3-5 Days'
  },
  {
    id: 'heart-cookies',
    name: 'Royal Iced Cookies',
    price: 150,
    category: Category.SEASONAL,
    description: 'Hand-painted butter cookies with intricate icing. Perfect small gift.',
    image: 'https://images.unsplash.com/photo-1481391243133-f96216dcb5d2?auto=format&fit=crop&q=80&w=800',
    features: ['Hand-painted', 'Eggless'],
    preparationTime: '24h Notice'
  }
];

export const getActiveProducts = (): Product[] => {
  const saved = localStorage.getItem('custom_products');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error("Error parsing custom products", e);
    }
  }
  return DEFAULT_PRODUCTS;
};
