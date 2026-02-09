
export enum Category {
  QUICK_PICKS = 'Quick Picks',
  BENTO_STUDIO = 'Bento Studio',
  CELEBRATION = 'Celebration Studio',
  SEASONAL = 'Seasonal Drops'
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  description: string;
  image: string;
  features: string[];
  preparationTime: string;
}

export interface OrderForm {
  name: string;
  phone: string;
  eventDate: string;
  occasion: string;
  productType: string;
  flavor: string;
  customMessage: string;
  deliveryType: 'Pickup' | 'Delivery';
}

export interface Testimonial {
  id: string;
  name: string;
  review: string;
  rating: number;
}
