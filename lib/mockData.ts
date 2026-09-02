// FitPrint Mock Data - Brands, Products, and Size Charts

export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
export type FitPreference = 'slim' | 'regular' | 'relaxed' | 'oversized';
export type Gender = 'male' | 'female' | 'non-binary';

export interface Measurements {
  chest: number;    // in cm
  waist: number;    // in cm
  hips: number;     // in cm
  shoulders: number; // in cm
  height?: number;   // in cm
  weight?: number;   // in kg
}

export interface SizeRange {
  chest: [number, number];
  waist: [number, number];
  hips: [number, number];
  shoulders: [number, number];
}

export interface BrandSizeChart {
  brandId: string;
  sizes: Record<Size, SizeRange>;
  notes?: string;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  country: string;
  fitStyle: string;
  color: string;
}

export interface Product {
  id: string;
  name: string;
  brandId: string;
  category: string;
  price: number;
  image: string;
  sizes: Size[];
  description: string;
  material: string;
  rating: number;
  reviews: number;
  tags: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  gender: Gender;
  age?: number;
  measurements: Measurements;
  fitPreference: FitPreference;
  fitprintId: string;
  bodyProfile: string;
  createdAt: string;
  feedbackHistory: FeedbackItem[];
}

export interface FeedbackItem {
  productId: string;
  recommendedSize: Size;
  actualFit: 'perfect' | 'slightly-tight' | 'slightly-loose' | 'too-small' | 'too-large';
  date: string;
}

// ─── BRANDS ─────────────────────────────────────────────────────────────────

export const brands: Brand[] = [
  {
    id: 'nova',
    name: 'Nova Studio',
    logo: 'NS',
    country: 'Italy',
    fitStyle: 'True to size, European cut — slightly narrower shoulders',
    color: '#6C63FF',
  },
  {
    id: 'zenith',
    name: 'Zenith',
    logo: 'ZN',
    country: 'UK',
    fitStyle: 'Slightly generous — runs half a size large',
    color: '#00D4FF',
  },
  {
    id: 'axiom',
    name: 'Axiom Wear',
    logo: 'AX',
    country: 'USA',
    fitStyle: 'American relaxed fit — runs large, especially in chest',
    color: '#FF2D78',
  },
  {
    id: 'solace',
    name: 'Solace',
    logo: 'SL',
    country: 'Japan',
    fitStyle: 'Japanese slim fit — runs small, narrow shoulders',
    color: '#FFD700',
  },
];

// ─── SIZE CHARTS ─────────────────────────────────────────────────────────────

export const brandSizeCharts: Record<string, BrandSizeChart> = {
  nova: {
    brandId: 'nova',
    notes: 'European cut, slightly narrow shoulders',
    sizes: {
      XS: { chest: [82, 87],  waist: [68, 73],  hips: [88, 93],  shoulders: [40, 42] },
      S:  { chest: [88, 93],  waist: [74, 79],  hips: [94, 99],  shoulders: [43, 44] },
      M:  { chest: [94, 99],  waist: [80, 85],  hips: [100, 105], shoulders: [45, 46] },
      L:  { chest: [100, 105], waist: [86, 91], hips: [106, 111], shoulders: [47, 48] },
      XL: { chest: [106, 111], waist: [92, 97], hips: [112, 117], shoulders: [49, 50] },
      XXL: { chest: [112, 118], waist: [98, 104], hips: [118, 124], shoulders: [51, 52] },
    },
  },
  zenith: {
    brandId: 'zenith',
    notes: 'Runs half a size large — generous cut',
    sizes: {
      XS: { chest: [80, 84],  waist: [66, 70],  hips: [86, 90],  shoulders: [39, 41] },
      S:  { chest: [85, 89],  waist: [71, 75],  hips: [91, 95],  shoulders: [42, 43] },
      M:  { chest: [90, 94],  waist: [76, 80],  hips: [96, 100], shoulders: [44, 45] },
      L:  { chest: [95, 100], waist: [81, 86],  hips: [101, 106], shoulders: [46, 47] },
      XL: { chest: [101, 107], waist: [87, 93], hips: [107, 113], shoulders: [48, 49] },
      XXL: { chest: [108, 115], waist: [94, 101], hips: [114, 121], shoulders: [50, 52] },
    },
  },
  axiom: {
    brandId: 'axiom',
    notes: 'American relaxed fit — chest runs generous',
    sizes: {
      XS: { chest: [84, 88],  waist: [70, 75],  hips: [90, 95],  shoulders: [41, 43] },
      S:  { chest: [89, 94],  waist: [76, 81],  hips: [96, 101], shoulders: [44, 45] },
      M:  { chest: [95, 101], waist: [82, 88],  hips: [102, 108], shoulders: [46, 47] },
      L:  { chest: [102, 108], waist: [89, 95], hips: [109, 115], shoulders: [48, 49] },
      XL: { chest: [109, 116], waist: [96, 103], hips: [116, 123], shoulders: [50, 51] },
      XXL: { chest: [117, 125], waist: [104, 112], hips: [124, 132], shoulders: [52, 54] },
    },
  },
  solace: {
    brandId: 'solace',
    notes: 'Japanese slim fit — narrow shoulders, runs small',
    sizes: {
      XS: { chest: [80, 84],  waist: [64, 68],  hips: [86, 90],  shoulders: [38, 40] },
      S:  { chest: [85, 89],  waist: [69, 73],  hips: [91, 95],  shoulders: [41, 42] },
      M:  { chest: [90, 94],  waist: [74, 78],  hips: [96, 100], shoulders: [43, 44] },
      L:  { chest: [95, 99],  waist: [79, 83],  hips: [101, 105], shoulders: [45, 46] },
      XL: { chest: [100, 105], waist: [84, 89], hips: [106, 111], shoulders: [47, 48] },
      XXL: { chest: [106, 112], waist: [90, 96], hips: [112, 118], shoulders: [49, 51] },
    },
  },
};

// ─── PRODUCTS ─────────────────────────────────────────────────────────────────

export const products: Product[] = [
  {
    id: 'classic-cotton-shirt',
    name: 'Classic Cotton Shirt',
    brandId: 'nova',
    category: 'Shirts',
    price: 89,
    image: '/images/product_shirt.jpg',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    description: 'A timeless classic reimagined with premium long-staple Egyptian cotton. Features subtle sheen, impeccable drape, and Italian collar construction.',
    material: '100% Egyptian Cotton',
    rating: 4.8,
    reviews: 342,
    tags: ['bestseller', 'premium', 'classic'],
  },
  {
    id: 'oversized-hoodie',
    name: 'Oversized Hoodie',
    brandId: 'axiom',
    category: 'Hoodies',
    price: 124,
    image: '/images/product_hoodie.jpg',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Ultra-premium heavyweight fleece in a relaxed oversized silhouette. Garment-dyed for a vintage, worn-in character that only improves with age.',
    material: '420gsm Cotton Fleece',
    rating: 4.9,
    reviews: 891,
    tags: ['trending', 'oversized', 'cozy'],
  },
  {
    id: 'slim-fit-jeans',
    name: 'Slim Fit Jeans',
    brandId: 'solace',
    category: 'Bottoms',
    price: 156,
    image: '/images/product_jeans.jpg',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Japanese selvedge denim in a contemporary slim silhouette. Features raw indigo dyeing, reinforced stitching, and a clean taper through the leg.',
    material: 'Japanese Selvedge Denim',
    rating: 4.7,
    reviews: 523,
    tags: ['premium', 'japanese', 'denim'],
  },
  {
    id: 'casual-blazer',
    name: 'Casual Blazer',
    brandId: 'zenith',
    category: 'Outerwear',
    price: 298,
    image: '/images/product_blazer.jpg',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Deconstructed Italian-inspired blazer with a relaxed shoulder. Versatile enough for both smart-casual and formal occasions.',
    material: 'Italian Wool Blend',
    rating: 4.6,
    reviews: 187,
    tags: ['formal', 'versatile', 'italian'],
  },
  {
    id: 'polo-tshirt',
    name: 'Polo T-Shirt',
    brandId: 'zenith',
    category: 'T-Shirts',
    price: 68,
    image: '/images/product_polo.jpg',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    description: 'Classic piqué polo with a modern, refined fit. Features double-tipped collar, mother-of-pearl buttons, and a clean minimalist aesthetic.',
    material: 'Piqué Cotton',
    rating: 4.5,
    reviews: 678,
    tags: ['classic', 'polo', 'smart-casual'],
  },
];

// ─── DEFAULT DEMO USER PROFILE ─────────────────────────────────────────────

export const defaultUserProfile: UserProfile = {
  id: 'user-001',
  name: 'Vansh',
  gender: 'male',
  age: 23,
  measurements: {
    chest: 98,
    waist: 82,
    hips: 100,
    shoulders: 46,
    height: 178,
    weight: 74,
  },
  fitPreference: 'regular',
  fitprintId: 'FP-8294',
  bodyProfile: 'Balanced Athletic',
  createdAt: '2024-08-15',
  feedbackHistory: [],
};
