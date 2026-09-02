// ============================================================
// FitPrint Brand Size Chart Database — Indian Market Edition
// 50+ Brands: International + Indian
// All measurements in centimeters (cm)
// Data based on official brand size guides
// Last updated: 2024
// ============================================================

export type ClothingCategory = 'tshirt' | 'shirt' | 'hoodie' | 'jeans';
export type SizeKey = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
export type SizingTendency = 'small' | 'true' | 'large';

export interface GarmentMeasurements {
  chest?: [number, number];
  waist?: [number, number];
  hips?: [number, number];
  shoulders?: [number, number];
  inseam?: [number, number];
  notes?: string;
}

export interface CategorySizeChart {
  sizes: Partial<Record<SizeKey, GarmentMeasurements>>;
  fitNotes: string;
  runsSizing: SizingTendency;
}

export interface BrandProfile {
  id: string;
  name: string;
  logo: string;
  country: string;
  origin: 'international' | 'indian';
  category: 'fast-fashion' | 'premium' | 'sports' | 'formal' | 'ethnic' | 'denim' | 'streetwear';
  categories: Partial<Record<ClothingCategory, CategorySizeChart>>;
  generalNote: string;
  color: string;
  accent: string;
}

// ──────────────────────────────────────────────────────────────
// SECTION 1 — INTERNATIONAL FAST FASHION
// ──────────────────────────────────────────────────────────────

const hmBrand: BrandProfile = {
  id: 'hm', name: 'H&M', logo: 'H&M', country: 'Sweden',
  origin: 'international', category: 'fast-fashion',
  generalNote: 'Standard European sizing. Relaxed chest allowance. True to size.',
  color: '#E50010', accent: '#FF4D5A',
  categories: {
    tshirt: {
      fitNotes: 'Regular fit. Standard European cut.',
      runsSizing: 'true',
      sizes: {
        XS:   { chest: [82,86],   waist: [68,72],  shoulders: [40,41] },
        S:    { chest: [86,90],   waist: [72,76],  shoulders: [42,43] },
        M:    { chest: [90,96],   waist: [76,82],  shoulders: [43,45] },
        L:    { chest: [96,102],  waist: [82,88],  shoulders: [45,47] },
        XL:   { chest: [102,108], waist: [88,94],  shoulders: [47,49] },
        XXL:  { chest: [108,116], waist: [94,102], shoulders: [49,51] },
        XXXL: { chest: [116,124], waist: [102,110],shoulders: [51,53] },
      },
    },
    shirt: {
      fitNotes: 'Slim fit shirt. Narrower than US brands.',
      runsSizing: 'true',
      sizes: {
        XS:   { chest: [84,88],   waist: [70,74],  shoulders: [40,42] },
        S:    { chest: [88,92],   waist: [74,78],  shoulders: [42,44] },
        M:    { chest: [92,98],   waist: [78,84],  shoulders: [44,46] },
        L:    { chest: [98,104],  waist: [84,90],  shoulders: [46,48] },
        XL:   { chest: [104,110], waist: [90,96],  shoulders: [48,50] },
        XXL:  { chest: [110,118], waist: [96,104], shoulders: [50,52] },
      },
    },
    hoodie: {
      fitNotes: 'Relaxed fit. Generous chest.',
      runsSizing: 'large',
      sizes: {
        S:    { chest: [90,96],   waist: [76,82],  shoulders: [43,45] },
        M:    { chest: [96,102],  waist: [82,88],  shoulders: [45,47] },
        L:    { chest: [102,110], waist: [88,96],  shoulders: [47,49] },
        XL:   { chest: [110,118], waist: [96,104], shoulders: [49,51] },
        XXL:  { chest: [118,126], waist: [104,112],shoulders: [51,53] },
      },
    },
    jeans: {
      fitNotes: 'Slim fit. Waist-first sizing.',
      runsSizing: 'true',
      sizes: {
        XS:   { waist: [70,74],  hips: [88,92],   inseam: [78,80] },
        S:    { waist: [74,78],  hips: [92,96],   inseam: [80,82] },
        M:    { waist: [78,84],  hips: [96,102],  inseam: [80,82] },
        L:    { waist: [84,90],  hips: [102,108], inseam: [81,83] },
        XL:   { waist: [90,96],  hips: [108,114], inseam: [81,83] },
        XXL:  { waist: [96,104], hips: [114,122], inseam: [82,84] },
      },
    },
  },
};

const zaraBrand: BrandProfile = {
  id: 'zara', name: 'Zara', logo: 'ZR', country: 'Spain',
  origin: 'international', category: 'fast-fashion',
  generalNote: 'Fashion-forward European cut. Sizes run notably smaller. Size up is very common.',
  color: '#1a1a1a', accent: '#888888',
  categories: {
    tshirt: {
      fitNotes: 'Slim European cut. Chest and shoulders run narrow.',
      runsSizing: 'small',
      sizes: {
        XS:   { chest: [80,84],   waist: [66,70],  shoulders: [39,41] },
        S:    { chest: [84,88],   waist: [70,74],  shoulders: [41,43] },
        M:    { chest: [88,94],   waist: [74,80],  shoulders: [43,45] },
        L:    { chest: [94,100],  waist: [80,86],  shoulders: [45,47] },
        XL:   { chest: [100,107], waist: [86,93],  shoulders: [47,49] },
        XXL:  { chest: [107,115], waist: [93,101], shoulders: [49,51] },
      },
    },
    shirt: {
      fitNotes: 'Tailored slim fit. Runs small.',
      runsSizing: 'small',
      sizes: {
        XS:   { chest: [82,86],   waist: [68,72],  shoulders: [39,40] },
        S:    { chest: [86,90],   waist: [72,76],  shoulders: [40,42] },
        M:    { chest: [90,96],   waist: [76,82],  shoulders: [42,44] },
        L:    { chest: [96,102],  waist: [82,88],  shoulders: [44,46] },
        XL:   { chest: [102,108], waist: [88,94],  shoulders: [46,48] },
        XXL:  { chest: [108,116], waist: [94,102], shoulders: [48,50] },
      },
    },
    hoodie: {
      fitNotes: 'Slim hoodie. Consider sizing up.',
      runsSizing: 'small',
      sizes: {
        S:    { chest: [87,92],   waist: [73,78],  shoulders: [42,44] },
        M:    { chest: [92,98],   waist: [78,84],  shoulders: [44,46] },
        L:    { chest: [98,104],  waist: [84,90],  shoulders: [46,48] },
        XL:   { chest: [104,111], waist: [90,97],  shoulders: [48,50] },
        XXL:  { chest: [111,119], waist: [97,105], shoulders: [50,52] },
      },
    },
    jeans: {
      fitNotes: 'Skinny/slim. Seat and thigh run narrow.',
      runsSizing: 'small',
      sizes: {
        XS:   { waist: [68,72],  hips: [86,90],   inseam: [78,80] },
        S:    { waist: [72,76],  hips: [90,94],   inseam: [79,81] },
        M:    { waist: [76,82],  hips: [94,100],  inseam: [80,82] },
        L:    { waist: [82,88],  hips: [100,106], inseam: [81,83] },
        XL:   { waist: [88,94],  hips: [106,112], inseam: [81,83] },
        XXL:  { waist: [94,102], hips: [112,120], inseam: [82,84] },
      },
    },
  },
};

const uniqlo: BrandProfile = {
  id: 'uniqlo', name: 'Uniqlo', logo: 'UQ', country: 'Japan',
  origin: 'international', category: 'fast-fashion',
  generalNote: 'Japanese slim cut. Runs small especially in chest and shoulders. Size up recommended.',
  color: '#FF0000', accent: '#FF6666',
  categories: {
    tshirt: {
      fitNotes: 'Slim Japanese fit. Very narrow shoulders.',
      runsSizing: 'small',
      sizes: {
        XS:   { chest: [80,84],   waist: [64,68],  shoulders: [38,40] },
        S:    { chest: [84,88],   waist: [68,72],  shoulders: [40,42] },
        M:    { chest: [88,94],   waist: [72,78],  shoulders: [42,44] },
        L:    { chest: [94,100],  waist: [78,84],  shoulders: [44,46] },
        XL:   { chest: [100,106], waist: [84,90],  shoulders: [46,48] },
        XXL:  { chest: [106,114], waist: [90,98],  shoulders: [48,50] },
      },
    },
    hoodie: {
      fitNotes: 'Slim fit hoodie. Narrow cut throughout.',
      runsSizing: 'small',
      sizes: {
        S:    { chest: [86,92],   waist: [72,78],  shoulders: [41,43] },
        M:    { chest: [92,98],   waist: [78,84],  shoulders: [43,45] },
        L:    { chest: [98,104],  waist: [84,90],  shoulders: [45,47] },
        XL:   { chest: [104,110], waist: [90,96],  shoulders: [47,49] },
        XXL:  { chest: [110,118], waist: [96,104], shoulders: [49,51] },
      },
    },
    jeans: {
      fitNotes: 'Slim straight. True to waist measurement.',
      runsSizing: 'true',
      sizes: {
        XS:   { waist: [70,74],  hips: [86,90],   inseam: [78,80] },
        S:    { waist: [74,78],  hips: [90,94],   inseam: [79,81] },
        M:    { waist: [78,84],  hips: [94,100],  inseam: [80,82] },
        L:    { waist: [84,90],  hips: [100,106], inseam: [80,82] },
        XL:   { waist: [90,96],  hips: [106,112], inseam: [81,83] },
      },
    },
  },
};

const gap: BrandProfile = {
  id: 'gap', name: 'GAP', logo: 'GAP', country: 'USA',
  origin: 'international', category: 'fast-fashion',
  generalNote: 'Generous American cut. Runs large. Standard US sizing.',
  color: '#0066CC', accent: '#3399FF',
  categories: {
    tshirt: {
      fitNotes: 'Relaxed American fit. Wider shoulders and chest.',
      runsSizing: 'large',
      sizes: {
        XS:   { chest: [84,88],   waist: [70,74],  shoulders: [41,43] },
        S:    { chest: [88,94],   waist: [74,80],  shoulders: [43,45] },
        M:    { chest: [94,100],  waist: [80,86],  shoulders: [45,47] },
        L:    { chest: [100,108], waist: [86,94],  shoulders: [47,49] },
        XL:   { chest: [108,116], waist: [94,102], shoulders: [49,51] },
        XXL:  { chest: [116,124], waist: [102,110],shoulders: [51,53] },
        XXXL: { chest: [124,132], waist: [110,118],shoulders: [53,55] },
      },
    },
    jeans: {
      fitNotes: 'Relaxed to slim fit. Generous seat and thigh.',
      runsSizing: 'large',
      sizes: {
        XS:   { waist: [72,76],  hips: [90,94],   inseam: [79,81] },
        S:    { waist: [76,80],  hips: [94,98],   inseam: [80,82] },
        M:    { waist: [80,86],  hips: [98,104],  inseam: [80,82] },
        L:    { waist: [86,92],  hips: [104,110], inseam: [81,83] },
        XL:   { waist: [92,98],  hips: [110,116], inseam: [81,83] },
        XXL:  { waist: [98,106], hips: [116,124], inseam: [82,84] },
      },
    },
  },
};

const mango: BrandProfile = {
  id: 'mango', name: 'Mango', logo: 'MNG', country: 'Spain',
  origin: 'international', category: 'fast-fashion',
  generalNote: 'Mediterranean fashion-forward fit. Runs slightly small. Slim silhouette.',
  color: '#C9A96E', accent: '#E8C99A',
  categories: {
    tshirt: {
      fitNotes: 'Slim Mediterranean cut.',
      runsSizing: 'small',
      sizes: {
        XS:   { chest: [81,85],   waist: [67,71],  shoulders: [40,41] },
        S:    { chest: [85,89],   waist: [71,75],  shoulders: [42,43] },
        M:    { chest: [89,95],   waist: [75,81],  shoulders: [43,45] },
        L:    { chest: [95,101],  waist: [81,87],  shoulders: [45,47] },
        XL:   { chest: [101,108], waist: [87,94],  shoulders: [47,49] },
        XXL:  { chest: [108,116], waist: [94,102], shoulders: [49,51] },
      },
    },
    shirt: {
      fitNotes: 'Slim fit shirt. Shorter cut, Mediterranean sizing.',
      runsSizing: 'small',
      sizes: {
        S:    { chest: [86,90],   waist: [72,76],  shoulders: [41,43] },
        M:    { chest: [90,96],   waist: [76,82],  shoulders: [43,45] },
        L:    { chest: [96,102],  waist: [82,88],  shoulders: [45,47] },
        XL:   { chest: [102,108], waist: [88,94],  shoulders: [47,49] },
      },
    },
  },
};

// ──────────────────────────────────────────────────────────────
// SECTION 2 — PREMIUM INTERNATIONAL BRANDS
// ──────────────────────────────────────────────────────────────

const tommyHilfiger: BrandProfile = {
  id: 'tommy', name: 'Tommy Hilfiger', logo: 'TH', country: 'USA',
  origin: 'international', category: 'premium',
  generalNote: 'Classic American prep fit. Runs generous and large. US sizing.',
  color: '#CC0000', accent: '#FF4444',
  categories: {
    tshirt: {
      fitNotes: 'Classic fit. Wide shoulders, generous chest.',
      runsSizing: 'large',
      sizes: {
        XS:   { chest: [86,90],   waist: [72,76],  shoulders: [42,44] },
        S:    { chest: [90,96],   waist: [76,82],  shoulders: [44,46] },
        M:    { chest: [96,102],  waist: [82,88],  shoulders: [46,48] },
        L:    { chest: [102,109], waist: [88,95],  shoulders: [48,50] },
        XL:   { chest: [109,117], waist: [95,103], shoulders: [50,52] },
        XXL:  { chest: [117,125], waist: [103,111],shoulders: [52,54] },
        XXXL: { chest: [125,133], waist: [111,119],shoulders: [54,56] },
      },
    },
    shirt: {
      fitNotes: 'Custom/slim fit. Still runs larger than EU brands.',
      runsSizing: 'large',
      sizes: {
        S:    { chest: [90,94],   waist: [76,80],  shoulders: [44,46] },
        M:    { chest: [94,100],  waist: [80,86],  shoulders: [46,48] },
        L:    { chest: [100,107], waist: [86,93],  shoulders: [48,50] },
        XL:   { chest: [107,114], waist: [93,100], shoulders: [50,52] },
        XXL:  { chest: [114,122], waist: [100,108],shoulders: [52,54] },
      },
    },
  },
};

const calvinKlein: BrandProfile = {
  id: 'ck', name: 'Calvin Klein', logo: 'CK', country: 'USA',
  origin: 'international', category: 'premium',
  generalNote: 'American minimalist. Standard US sizing, runs large. Slim cut available.',
  color: '#000000', accent: '#555555',
  categories: {
    tshirt: {
      fitNotes: 'Slim fit. Slightly generous US sizing.',
      runsSizing: 'large',
      sizes: {
        XS:   { chest: [85,89],   waist: [71,75],  shoulders: [42,43] },
        S:    { chest: [89,95],   waist: [75,81],  shoulders: [43,45] },
        M:    { chest: [95,101],  waist: [81,87],  shoulders: [45,47] },
        L:    { chest: [101,108], waist: [87,94],  shoulders: [47,49] },
        XL:   { chest: [108,116], waist: [94,102], shoulders: [49,51] },
        XXL:  { chest: [116,124], waist: [102,110],shoulders: [51,53] },
      },
    },
    jeans: {
      fitNotes: 'Slim straight. True to waist. Generous seat.',
      runsSizing: 'large',
      sizes: {
        XS:   { waist: [72,76],  hips: [90,94],   inseam: [79,81] },
        S:    { waist: [76,80],  hips: [94,98],   inseam: [80,82] },
        M:    { waist: [80,86],  hips: [98,104],  inseam: [80,82] },
        L:    { waist: [86,92],  hips: [104,110], inseam: [81,83] },
        XL:   { waist: [92,98],  hips: [110,116], inseam: [81,83] },
      },
    },
  },
};

const ralphLauren: BrandProfile = {
  id: 'rl', name: 'Ralph Lauren', logo: 'RL', country: 'USA',
  origin: 'international', category: 'premium',
  generalNote: 'Classic American prep. Very generous sizing — runs large.',
  color: '#1A3A6B', accent: '#2E5BA6',
  categories: {
    tshirt: {
      fitNotes: 'Classic/Custom fit. Wide and generous through chest.',
      runsSizing: 'large',
      sizes: {
        S:    { chest: [92,98],   waist: [78,84],  shoulders: [44,46] },
        M:    { chest: [98,104],  waist: [84,90],  shoulders: [46,48] },
        L:    { chest: [104,112], waist: [90,98],  shoulders: [48,50] },
        XL:   { chest: [112,120], waist: [98,106], shoulders: [50,52] },
        XXL:  { chest: [120,128], waist: [106,114],shoulders: [52,54] },
        XXXL: { chest: [128,136], waist: [114,122],shoulders: [54,56] },
      },
    },
    shirt: {
      fitNotes: 'Custom fit shirt. Very generous across back.',
      runsSizing: 'large',
      sizes: {
        S:    { chest: [94,100],  waist: [80,86],  shoulders: [44,46] },
        M:    { chest: [100,106], waist: [86,92],  shoulders: [46,48] },
        L:    { chest: [106,113], waist: [92,99],  shoulders: [48,50] },
        XL:   { chest: [113,120], waist: [99,106], shoulders: [50,52] },
      },
    },
  },
};

const lacoste: BrandProfile = {
  id: 'lacoste', name: 'Lacoste', logo: 'LC', country: 'France',
  origin: 'international', category: 'premium',
  generalNote: 'French cut. Runs small. Their sizing is 2-6 numeric — runs about 1 EU size small.',
  color: '#00A550', accent: '#00CC66',
  categories: {
    tshirt: {
      fitNotes: 'Regular slim French fit. Chest runs narrow.',
      runsSizing: 'small',
      sizes: {
        XS:   { chest: [82,86],   waist: [68,72],  shoulders: [40,42] },
        S:    { chest: [86,90],   waist: [72,76],  shoulders: [42,43] },
        M:    { chest: [90,95],   waist: [76,81],  shoulders: [43,45] },
        L:    { chest: [95,101],  waist: [81,87],  shoulders: [45,47] },
        XL:   { chest: [101,107], waist: [87,93],  shoulders: [47,49] },
        XXL:  { chest: [107,114], waist: [93,100], shoulders: [49,51] },
      },
    },
    shirt: {
      fitNotes: 'Regular slim. French proportions. Narrow shoulders.',
      runsSizing: 'small',
      sizes: {
        S:    { chest: [87,91],   waist: [73,77],  shoulders: [42,44] },
        M:    { chest: [91,97],   waist: [77,83],  shoulders: [44,46] },
        L:    { chest: [97,103],  waist: [83,89],  shoulders: [46,48] },
        XL:   { chest: [103,109], waist: [89,95],  shoulders: [48,50] },
      },
    },
  },
};

const hugoBoss: BrandProfile = {
  id: 'boss', name: 'Hugo Boss', logo: 'BOSS', country: 'Germany',
  origin: 'international', category: 'premium',
  generalNote: 'German precision cut. Slim fit tends to run small. Regular fit is true.',
  color: '#1C1C1C', accent: '#888888',
  categories: {
    shirt: {
      fitNotes: 'Slim fit. German precision. Runs small in chest.',
      runsSizing: 'small',
      sizes: {
        S:    { chest: [88,92],   waist: [74,78],  shoulders: [42,44] },
        M:    { chest: [92,98],   waist: [78,84],  shoulders: [44,46] },
        L:    { chest: [98,104],  waist: [84,90],  shoulders: [46,48] },
        XL:   { chest: [104,110], waist: [90,96],  shoulders: [48,50] },
        XXL:  { chest: [110,118], waist: [96,104], shoulders: [50,52] },
      },
    },
    tshirt: {
      fitNotes: 'Modern slim fit. True European sizing.',
      runsSizing: 'true',
      sizes: {
        S:    { chest: [88,92],   waist: [74,78],  shoulders: [42,44] },
        M:    { chest: [92,98],   waist: [78,84],  shoulders: [44,46] },
        L:    { chest: [98,104],  waist: [84,90],  shoulders: [46,48] },
        XL:   { chest: [104,110], waist: [90,96],  shoulders: [48,50] },
        XXL:  { chest: [110,118], waist: [96,104], shoulders: [50,52] },
      },
    },
  },
};

const jackJones: BrandProfile = {
  id: 'jackjones', name: 'Jack & Jones', logo: 'J&J', country: 'Denmark',
  origin: 'international', category: 'fast-fashion',
  generalNote: 'Scandinavian slim fit. True to European sizing. Very popular in India.',
  color: '#1565C0', accent: '#2196F3',
  categories: {
    tshirt: {
      fitNotes: 'Slim fit. Standard Scandinavian sizing.',
      runsSizing: 'true',
      sizes: {
        XS:   { chest: [82,86],   waist: [68,72],  shoulders: [40,42] },
        S:    { chest: [86,90],   waist: [72,76],  shoulders: [42,44] },
        M:    { chest: [90,96],   waist: [76,82],  shoulders: [44,46] },
        L:    { chest: [96,102],  waist: [82,88],  shoulders: [46,48] },
        XL:   { chest: [102,108], waist: [88,94],  shoulders: [48,50] },
        XXL:  { chest: [108,116], waist: [94,102], shoulders: [50,52] },
        XXXL: { chest: [116,124], waist: [102,110],shoulders: [52,54] },
      },
    },
    jeans: {
      fitNotes: 'Slim, skinny, and relaxed options. True to waist.',
      runsSizing: 'true',
      sizes: {
        XS:   { waist: [70,74],  hips: [88,92],   inseam: [78,80] },
        S:    { waist: [74,78],  hips: [92,96],   inseam: [79,81] },
        M:    { waist: [78,84],  hips: [96,102],  inseam: [80,82] },
        L:    { waist: [84,90],  hips: [102,108], inseam: [81,83] },
        XL:   { waist: [90,96],  hips: [108,114], inseam: [81,83] },
        XXL:  { waist: [96,104], hips: [114,122], inseam: [82,84] },
      },
    },
  },
};

const veromoda: BrandProfile = {
  id: 'veromoda', name: 'Vero Moda', logo: 'VM', country: 'Denmark',
  origin: 'international', category: 'fast-fashion',
  generalNote: 'Scandinavian women\'s brand. Slim to regular European fit.',
  color: '#8B4513', accent: '#CD853F',
  categories: {
    tshirt: {
      fitNotes: 'Regular slim fit.',
      runsSizing: 'true',
      sizes: {
        XS:   { chest: [80,84],   waist: [64,68],  shoulders: [38,40] },
        S:    { chest: [84,88],   waist: [68,72],  shoulders: [40,42] },
        M:    { chest: [88,94],   waist: [72,78],  shoulders: [42,44] },
        L:    { chest: [94,100],  waist: [78,84],  shoulders: [44,46] },
        XL:   { chest: [100,106], waist: [84,90],  shoulders: [46,48] },
        XXL:  { chest: [106,114], waist: [90,98],  shoulders: [48,50] },
      },
    },
  },
};

const marksspencer: BrandProfile = {
  id: 'ms', name: 'Marks & Spencer', logo: 'M&S', country: 'UK',
  origin: 'international', category: 'premium',
  generalNote: 'British classic cut. Generous and runs large. Excellent quality for formal.',
  color: '#228B22', accent: '#32CD32',
  categories: {
    tshirt: {
      fitNotes: 'Regular fit. Generous British cut.',
      runsSizing: 'large',
      sizes: {
        XS:   { chest: [84,88],   waist: [70,74],  shoulders: [42,43] },
        S:    { chest: [88,94],   waist: [74,80],  shoulders: [43,45] },
        M:    { chest: [94,100],  waist: [80,86],  shoulders: [45,47] },
        L:    { chest: [100,108], waist: [86,94],  shoulders: [47,49] },
        XL:   { chest: [108,116], waist: [94,102], shoulders: [49,51] },
        XXL:  { chest: [116,124], waist: [102,110],shoulders: [51,53] },
        XXXL: { chest: [124,132], waist: [110,118],shoulders: [53,55] },
      },
    },
    shirt: {
      fitNotes: 'Tailored fit. Generous chest. True British sizing.',
      runsSizing: 'large',
      sizes: {
        S:    { chest: [90,96],   waist: [76,82],  shoulders: [43,45] },
        M:    { chest: [96,102],  waist: [82,88],  shoulders: [45,47] },
        L:    { chest: [102,109], waist: [88,95],  shoulders: [47,49] },
        XL:   { chest: [109,117], waist: [95,103], shoulders: [49,51] },
        XXL:  { chest: [117,125], waist: [103,111],shoulders: [51,53] },
      },
    },
  },
};

// ──────────────────────────────────────────────────────────────
// SECTION 3 — SPORTS & ATHLEISURE
// ──────────────────────────────────────────────────────────────

const nikeBrand: BrandProfile = {
  id: 'nike', name: 'Nike', logo: '✓', country: 'USA',
  origin: 'international', category: 'sports',
  generalNote: 'Athletic US sizing. Runs large. Performance fit follows body but sized generously.',
  color: '#FF6600', accent: '#FF8833',
  categories: {
    tshirt: {
      fitNotes: 'Standard fit. Generous through chest and shoulders for movement.',
      runsSizing: 'large',
      sizes: {
        XS:   { chest: [84,88],   waist: [70,74],  shoulders: [41,43] },
        S:    { chest: [88,96],   waist: [74,82],  shoulders: [43,45] },
        M:    { chest: [96,104],  waist: [82,90],  shoulders: [45,47] },
        L:    { chest: [104,112], waist: [90,98],  shoulders: [47,49] },
        XL:   { chest: [112,120], waist: [98,106], shoulders: [49,51] },
        XXL:  { chest: [120,128], waist: [106,114],shoulders: [51,53] },
        XXXL: { chest: [128,136], waist: [114,122],shoulders: [53,55] },
      },
    },
    hoodie: {
      fitNotes: 'Standard/Oversized fit. Very generous sizing.',
      runsSizing: 'large',
      sizes: {
        XS:   { chest: [88,94],   waist: [74,80],  shoulders: [42,44] },
        S:    { chest: [94,102],  waist: [80,88],  shoulders: [44,46] },
        M:    { chest: [102,110], waist: [88,96],  shoulders: [46,48] },
        L:    { chest: [110,118], waist: [96,104], shoulders: [48,50] },
        XL:   { chest: [118,126], waist: [104,112],shoulders: [50,52] },
        XXL:  { chest: [126,134], waist: [112,120],shoulders: [52,54] },
      },
    },
  },
};

const adidasBrand: BrandProfile = {
  id: 'adidas', name: 'Adidas', logo: 'ADI', country: 'Germany',
  origin: 'international', category: 'sports',
  generalNote: 'Athleisure fit. German brand with US-style generous sizing. Runs large.',
  color: '#000000', accent: '#444444',
  categories: {
    tshirt: {
      fitNotes: 'Regular fit. Generous through torso for sports movement.',
      runsSizing: 'large',
      sizes: {
        XS:   { chest: [84,90],   waist: [70,76],  shoulders: [41,43] },
        S:    { chest: [90,96],   waist: [76,82],  shoulders: [43,46] },
        M:    { chest: [96,104],  waist: [82,90],  shoulders: [46,48] },
        L:    { chest: [104,112], waist: [90,98],  shoulders: [48,50] },
        XL:   { chest: [112,120], waist: [98,106], shoulders: [50,52] },
        XXL:  { chest: [120,128], waist: [106,114],shoulders: [52,54] },
        XXXL: { chest: [128,138], waist: [114,124],shoulders: [54,56] },
      },
    },
    hoodie: {
      fitNotes: 'Regular/oversized. Sports heritage fit.',
      runsSizing: 'large',
      sizes: {
        S:    { chest: [92,100],  waist: [78,86],  shoulders: [44,46] },
        M:    { chest: [100,108], waist: [86,94],  shoulders: [46,48] },
        L:    { chest: [108,116], waist: [94,102], shoulders: [48,50] },
        XL:   { chest: [116,124], waist: [102,110],shoulders: [50,52] },
        XXL:  { chest: [124,132], waist: [110,118],shoulders: [52,54] },
      },
    },
  },
};

const pumaBrand: BrandProfile = {
  id: 'puma', name: 'Puma', logo: 'PUM', country: 'Germany',
  origin: 'international', category: 'sports',
  generalNote: 'Athletic fit. True to size across most categories. Slightly slimmer than Nike/Adidas.',
  color: '#D4001C', accent: '#FF1A38',
  categories: {
    tshirt: {
      fitNotes: 'Regular athletic fit. True to European size.',
      runsSizing: 'true',
      sizes: {
        XS:   { chest: [82,86],   waist: [68,72],  shoulders: [40,42] },
        S:    { chest: [86,92],   waist: [72,78],  shoulders: [42,44] },
        M:    { chest: [92,100],  waist: [78,86],  shoulders: [44,46] },
        L:    { chest: [100,108], waist: [86,94],  shoulders: [46,48] },
        XL:   { chest: [108,116], waist: [94,102], shoulders: [48,50] },
        XXL:  { chest: [116,124], waist: [102,110],shoulders: [50,52] },
        XXXL: { chest: [124,132], waist: [110,118],shoulders: [52,54] },
      },
    },
  },
};

const reebokBrand: BrandProfile = {
  id: 'reebok', name: 'Reebok', logo: 'RBK', country: 'USA',
  origin: 'international', category: 'sports',
  generalNote: 'Athletic/street fit. True to standard US sizing.',
  color: '#CC0000', accent: '#FF3333',
  categories: {
    tshirt: {
      fitNotes: 'Regular fit. Athletic proportions.',
      runsSizing: 'true',
      sizes: {
        S:    { chest: [88,94],   waist: [74,80],  shoulders: [43,45] },
        M:    { chest: [94,102],  waist: [80,88],  shoulders: [45,47] },
        L:    { chest: [102,110], waist: [88,96],  shoulders: [47,49] },
        XL:   { chest: [110,118], waist: [96,104], shoulders: [49,51] },
        XXL:  { chest: [118,126], waist: [104,112],shoulders: [51,53] },
      },
    },
  },
};

const underArmour: BrandProfile = {
  id: 'ua', name: 'Under Armour', logo: 'UA', country: 'USA',
  origin: 'international', category: 'sports',
  generalNote: 'Performance compression fit. Runs small. Tight athletic cut.',
  color: '#E31837', accent: '#FF3355',
  categories: {
    tshirt: {
      fitNotes: 'Fitted performance cut. Runs small — size up for casual wear.',
      runsSizing: 'small',
      sizes: {
        XS:   { chest: [82,86],   waist: [68,72],  shoulders: [40,42] },
        S:    { chest: [86,90],   waist: [72,76],  shoulders: [42,44] },
        M:    { chest: [90,96],   waist: [76,82],  shoulders: [44,46] },
        L:    { chest: [96,102],  waist: [82,88],  shoulders: [46,48] },
        XL:   { chest: [102,108], waist: [88,94],  shoulders: [48,50] },
        XXL:  { chest: [108,116], waist: [94,102], shoulders: [50,52] },
      },
    },
  },
};

// ──────────────────────────────────────────────────────────────
// SECTION 4 — DENIM SPECIALISTS
// ──────────────────────────────────────────────────────────────

const levis: BrandProfile = {
  id: 'levis', name: "Levi's", logo: "LV'S", country: 'USA',
  origin: 'international', category: 'denim',
  generalNote: "World's most popular jeans. True to waist sizing. Runs slightly large in seat/thigh.",
  color: '#C41E3A', accent: '#E63950',
  categories: {
    jeans: {
      fitNotes: 'True to waist. Classic 501 runs slightly baggy. Slim fit runs smaller.',
      runsSizing: 'true',
      sizes: {
        XS:   { waist: [70,74],  hips: [88,92],   inseam: [79,81] },
        S:    { waist: [74,78],  hips: [92,96],   inseam: [80,82] },
        M:    { waist: [78,84],  hips: [96,102],  inseam: [80,82] },
        L:    { waist: [84,90],  hips: [102,108], inseam: [81,83] },
        XL:   { waist: [90,96],  hips: [108,114], inseam: [81,83] },
        XXL:  { waist: [96,104], hips: [114,122], inseam: [82,84] },
        XXXL: { waist: [104,112],hips: [122,130], inseam: [82,84] },
      },
    },
    tshirt: {
      fitNotes: 'Regular relaxed fit.',
      runsSizing: 'large',
      sizes: {
        S:    { chest: [88,96],   waist: [74,82],  shoulders: [43,45] },
        M:    { chest: [96,104],  waist: [82,90],  shoulders: [45,47] },
        L:    { chest: [104,112], waist: [90,98],  shoulders: [47,49] },
        XL:   { chest: [112,120], waist: [98,106], shoulders: [49,51] },
        XXL:  { chest: [120,128], waist: [106,114],shoulders: [51,53] },
      },
    },
  },
};

const wrangler: BrandProfile = {
  id: 'wrangler', name: 'Wrangler', logo: 'WR', country: 'USA',
  origin: 'international', category: 'denim',
  generalNote: 'Western denim heritage. Runs large. Extra room through thigh and seat.',
  color: '#1B4F72', accent: '#2E86C1',
  categories: {
    jeans: {
      fitNotes: 'Relaxed/regular fit. Western proportions. Very generous through seat.',
      runsSizing: 'large',
      sizes: {
        S:    { waist: [74,80],  hips: [92,98],   inseam: [80,82] },
        M:    { waist: [80,86],  hips: [98,104],  inseam: [80,82] },
        L:    { waist: [86,92],  hips: [104,110], inseam: [81,83] },
        XL:   { waist: [92,100], hips: [110,118], inseam: [81,83] },
        XXL:  { waist: [100,108],hips: [118,126], inseam: [82,84] },
        XXXL: { waist: [108,116],hips: [126,134], inseam: [82,84] },
      },
    },
  },
};

const lee: BrandProfile = {
  id: 'lee', name: 'Lee', logo: 'LEE', country: 'USA',
  origin: 'international', category: 'denim',
  generalNote: 'American denim brand. True to US sizing. Generous through seat.',
  color: '#B8860B', accent: '#DAA520',
  categories: {
    jeans: {
      fitNotes: 'Regular and slim fit. True to waist measurement.',
      runsSizing: 'true',
      sizes: {
        XS:   { waist: [70,74],  hips: [88,92],   inseam: [78,80] },
        S:    { waist: [74,78],  hips: [92,96],   inseam: [79,81] },
        M:    { waist: [78,84],  hips: [96,102],  inseam: [80,82] },
        L:    { waist: [84,90],  hips: [102,108], inseam: [80,82] },
        XL:   { waist: [90,96],  hips: [108,114], inseam: [81,83] },
        XXL:  { waist: [96,104], hips: [114,122], inseam: [81,83] },
        XXXL: { waist: [104,112],hips: [122,130], inseam: [82,84] },
      },
    },
  },
};

const pepeJeans: BrandProfile = {
  id: 'pepe', name: 'Pepe Jeans', logo: 'PJ', country: 'UK',
  origin: 'international', category: 'denim',
  generalNote: 'British denim brand. Slim to slim-straight. Runs slightly small.',
  color: '#003399', accent: '#3366CC',
  categories: {
    jeans: {
      fitNotes: 'Slim fit. British cut. Slightly narrow through thigh.',
      runsSizing: 'small',
      sizes: {
        XS:   { waist: [70,74],  hips: [86,90],   inseam: [78,80] },
        S:    { waist: [74,78],  hips: [90,94],   inseam: [79,81] },
        M:    { waist: [78,84],  hips: [94,100],  inseam: [80,82] },
        L:    { waist: [84,90],  hips: [100,106], inseam: [81,83] },
        XL:   { waist: [90,96],  hips: [106,112], inseam: [81,83] },
        XXL:  { waist: [96,104], hips: [112,120], inseam: [82,84] },
      },
    },
    tshirt: {
      fitNotes: 'Regular slim fit.',
      runsSizing: 'true',
      sizes: {
        S:    { chest: [86,92],   waist: [72,78],  shoulders: [43,45] },
        M:    { chest: [92,98],   waist: [78,84],  shoulders: [45,47] },
        L:    { chest: [98,104],  waist: [84,90],  shoulders: [47,49] },
        XL:   { chest: [104,110], waist: [90,96],  shoulders: [49,51] },
        XXL:  { chest: [110,118], waist: [96,104], shoulders: [51,53] },
      },
    },
  },
};

const leeCooper: BrandProfile = {
  id: 'leecooper', name: 'Lee Cooper', logo: 'LC', country: 'UK',
  origin: 'international', category: 'denim',
  generalNote: 'British heritage denim. Regular fit. True to standard sizing.',
  color: '#8B0000', accent: '#CC0000',
  categories: {
    jeans: {
      fitNotes: 'Regular fit. British heritage proportions.',
      runsSizing: 'true',
      sizes: {
        S:    { waist: [74,78],  hips: [90,94],   inseam: [79,81] },
        M:    { waist: [78,84],  hips: [94,100],  inseam: [80,82] },
        L:    { waist: [84,90],  hips: [100,106], inseam: [80,82] },
        XL:   { waist: [90,96],  hips: [106,112], inseam: [81,83] },
        XXL:  { waist: [96,104], hips: [112,120], inseam: [81,83] },
        XXXL: { waist: [104,112],hips: [120,128], inseam: [82,84] },
      },
    },
  },
};

// ──────────────────────────────────────────────────────────────
// SECTION 5 — INDIAN BRANDS (Formal & Casual)
// ──────────────────────────────────────────────────────────────

const allenSolly: BrandProfile = {
  id: 'allensolly', name: 'Allen Solly', logo: 'AS', country: 'India',
  origin: 'indian', category: 'formal',
  generalNote: 'Indian sub-brand of Aditya Birla. True to Indian body proportions. Most reliable for Indian men.',
  color: '#FF6B00', accent: '#FF8C33',
  categories: {
    shirt: {
      fitNotes: 'Slim/regular fit. Designed for Indian body proportions.',
      runsSizing: 'true',
      sizes: {
        S:    { chest: [88,92],   waist: [74,78],  shoulders: [42,44] },
        M:    { chest: [92,98],   waist: [78,84],  shoulders: [44,46] },
        L:    { chest: [98,104],  waist: [84,90],  shoulders: [46,48] },
        XL:   { chest: [104,110], waist: [90,96],  shoulders: [48,50] },
        XXL:  { chest: [110,118], waist: [96,104], shoulders: [50,52] },
        XXXL: { chest: [118,126], waist: [104,112],shoulders: [52,54] },
      },
    },
    tshirt: {
      fitNotes: 'Regular fit. Indian proportions.',
      runsSizing: 'true',
      sizes: {
        S:    { chest: [88,92],   waist: [74,78],  shoulders: [42,44] },
        M:    { chest: [92,98],   waist: [78,84],  shoulders: [44,46] },
        L:    { chest: [98,104],  waist: [84,90],  shoulders: [46,48] },
        XL:   { chest: [104,110], waist: [90,96],  shoulders: [48,50] },
        XXL:  { chest: [110,118], waist: [96,104], shoulders: [50,52] },
        XXXL: { chest: [118,126], waist: [104,112],shoulders: [52,54] },
      },
    },
    jeans: {
      fitNotes: 'Slim fit. Designed for Indian waist-to-hip ratio.',
      runsSizing: 'true',
      sizes: {
        S:    { waist: [74,78],  hips: [90,94],   inseam: [78,80] },
        M:    { waist: [78,84],  hips: [94,100],  inseam: [79,81] },
        L:    { waist: [84,90],  hips: [100,106], inseam: [80,82] },
        XL:   { waist: [90,96],  hips: [106,112], inseam: [80,82] },
        XXL:  { waist: [96,104], hips: [112,120], inseam: [81,83] },
      },
    },
  },
};

const louisPhilippe: BrandProfile = {
  id: 'louisphilippe', name: 'Louis Philippe', logo: 'LP', country: 'India',
  origin: 'indian', category: 'formal',
  generalNote: 'Premium Indian formal brand. Slim European-inspired cut. True to size.',
  color: '#2C3E50', accent: '#3D5166',
  categories: {
    shirt: {
      fitNotes: 'Slim fit formal. European inspired. True to size.',
      runsSizing: 'true',
      sizes: {
        S:    { chest: [88,92],   waist: [74,78],  shoulders: [42,43] },
        M:    { chest: [92,98],   waist: [78,84],  shoulders: [43,45] },
        L:    { chest: [98,104],  waist: [84,90],  shoulders: [45,47] },
        XL:   { chest: [104,110], waist: [90,96],  shoulders: [47,49] },
        XXL:  { chest: [110,118], waist: [96,104], shoulders: [49,51] },
        XXXL: { chest: [118,126], waist: [104,112],shoulders: [51,53] },
      },
    },
    tshirt: {
      fitNotes: 'Regular fit. Premium casual.',
      runsSizing: 'true',
      sizes: {
        S:    { chest: [88,94],   waist: [74,80],  shoulders: [42,44] },
        M:    { chest: [94,100],  waist: [80,86],  shoulders: [44,46] },
        L:    { chest: [100,106], waist: [86,92],  shoulders: [46,48] },
        XL:   { chest: [106,112], waist: [92,98],  shoulders: [48,50] },
        XXL:  { chest: [112,120], waist: [98,106], shoulders: [50,52] },
      },
    },
  },
};

const vanHeusen: BrandProfile = {
  id: 'vanheusen', name: 'Van Heusen', logo: 'VH', country: 'India',
  origin: 'indian', category: 'formal',
  generalNote: 'Popular Indian office brand. Regular fit designed for Indian body type.',
  color: '#6A0DAD', accent: '#8B00FF',
  categories: {
    shirt: {
      fitNotes: 'Regular/power fit. Indian proportions. Wider back allowance.',
      runsSizing: 'true',
      sizes: {
        S:    { chest: [90,94],   waist: [76,80],  shoulders: [42,44] },
        M:    { chest: [94,100],  waist: [80,86],  shoulders: [44,46] },
        L:    { chest: [100,106], waist: [86,92],  shoulders: [46,48] },
        XL:   { chest: [106,112], waist: [92,98],  shoulders: [48,50] },
        XXL:  { chest: [112,120], waist: [98,106], shoulders: [50,52] },
        XXXL: { chest: [120,128], waist: [106,114],shoulders: [52,54] },
      },
    },
    tshirt: {
      fitNotes: 'Regular fit casual.',
      runsSizing: 'true',
      sizes: {
        S:    { chest: [90,96],   waist: [76,82],  shoulders: [43,45] },
        M:    { chest: [96,102],  waist: [82,88],  shoulders: [45,47] },
        L:    { chest: [102,108], waist: [88,94],  shoulders: [47,49] },
        XL:   { chest: [108,116], waist: [94,102], shoulders: [49,51] },
        XXL:  { chest: [116,124], waist: [102,110],shoulders: [51,53] },
        XXXL: { chest: [124,132], waist: [110,118],shoulders: [53,55] },
      },
    },
  },
};

const peterEngland: BrandProfile = {
  id: 'peterengland', name: 'Peter England', logo: 'PE', country: 'India',
  origin: 'indian', category: 'formal',
  generalNote: 'Value formal brand. Regular cut for Indian office wear. Slightly generous.',
  color: '#1F618D', accent: '#2980B9',
  categories: {
    shirt: {
      fitNotes: 'Regular/slim fit. Standard Indian formal sizing.',
      runsSizing: 'true',
      sizes: {
        S:    { chest: [90,94],   waist: [76,80],  shoulders: [42,44] },
        M:    { chest: [94,100],  waist: [80,86],  shoulders: [44,46] },
        L:    { chest: [100,106], waist: [86,92],  shoulders: [46,48] },
        XL:   { chest: [106,112], waist: [92,98],  shoulders: [48,50] },
        XXL:  { chest: [112,120], waist: [98,106], shoulders: [50,52] },
        XXXL: { chest: [120,128], waist: [106,114],shoulders: [52,54] },
      },
    },
  },
};

const raymond: BrandProfile = {
  id: 'raymond', name: 'Raymond', logo: 'RYM', country: 'India',
  origin: 'indian', category: 'formal',
  generalNote: 'Heritage Indian suiting brand. True to generous Indian formal sizing.',
  color: '#8B4513', accent: '#A0522D',
  categories: {
    shirt: {
      fitNotes: 'Regular fit formal. Indian heritage sizing.',
      runsSizing: 'large',
      sizes: {
        S:    { chest: [90,96],   waist: [76,82],  shoulders: [43,45] },
        M:    { chest: [96,102],  waist: [82,88],  shoulders: [45,47] },
        L:    { chest: [102,108], waist: [88,94],  shoulders: [47,49] },
        XL:   { chest: [108,116], waist: [94,102], shoulders: [49,51] },
        XXL:  { chest: [116,124], waist: [102,110],shoulders: [51,53] },
        XXXL: { chest: [124,132], waist: [110,118],shoulders: [53,55] },
      },
    },
  },
};

const blackberrys: BrandProfile = {
  id: 'blackberrys', name: 'Blackberrys', logo: 'BB', country: 'India',
  origin: 'indian', category: 'formal',
  generalNote: 'Indian premium formal. Slim-fit range for modern office. True to Indian size.',
  color: '#1C1C1C', accent: '#555',
  categories: {
    shirt: {
      fitNotes: 'Slim fit premium formal. Indian sizing reference.',
      runsSizing: 'true',
      sizes: {
        S:    { chest: [88,92],   waist: [74,78],  shoulders: [42,44] },
        M:    { chest: [92,98],   waist: [78,84],  shoulders: [44,46] },
        L:    { chest: [98,104],  waist: [84,90],  shoulders: [46,48] },
        XL:   { chest: [104,110], waist: [90,96],  shoulders: [48,50] },
        XXL:  { chest: [110,118], waist: [96,104], shoulders: [50,52] },
      },
    },
  },
};

const arrowBrand: BrandProfile = {
  id: 'arrow', name: 'Arrow', logo: 'ARW', country: 'India',
  origin: 'indian', category: 'formal',
  generalNote: 'American-origin, India-manufactured formal. Slightly generous Indian sizing.',
  color: '#003366', accent: '#004C99',
  categories: {
    shirt: {
      fitNotes: 'Regular formal fit. American heritage, Indian body focus.',
      runsSizing: 'large',
      sizes: {
        S:    { chest: [92,96],   waist: [78,82],  shoulders: [43,45] },
        M:    { chest: [96,102],  waist: [82,88],  shoulders: [45,47] },
        L:    { chest: [102,108], waist: [88,94],  shoulders: [47,49] },
        XL:   { chest: [108,116], waist: [94,102], shoulders: [49,51] },
        XXL:  { chest: [116,124], waist: [102,110],shoulders: [51,53] },
        XXXL: { chest: [124,132], waist: [110,118],shoulders: [53,55] },
      },
    },
  },
};

const fabindia: BrandProfile = {
  id: 'fabindia', name: 'Fabindia', logo: 'FI', country: 'India',
  origin: 'indian', category: 'ethnic',
  generalNote: 'Indian ethnic/cotton brand. Generous sizing — runs large. Natural fibre shrinkage factored in.',
  color: '#8B4513', accent: '#CD853F',
  categories: {
    shirt: {
      fitNotes: 'Relaxed ethnic fit. Generously cut for traditional Indian wear.',
      runsSizing: 'large',
      sizes: {
        S:    { chest: [96,100],  waist: [82,86],  shoulders: [44,46] },
        M:    { chest: [100,106], waist: [86,92],  shoulders: [46,48] },
        L:    { chest: [106,112], waist: [92,98],  shoulders: [48,50] },
        XL:   { chest: [112,120], waist: [98,106], shoulders: [50,52] },
        XXL:  { chest: [120,128], waist: [106,114],shoulders: [52,54] },
        XXXL: { chest: [128,136], waist: [114,122],shoulders: [54,56] },
      },
    },
    tshirt: {
      fitNotes: 'Relaxed kurta-influenced casual top.',
      runsSizing: 'large',
      sizes: {
        S:    { chest: [96,102],  waist: [82,88],  shoulders: [44,46] },
        M:    { chest: [102,108], waist: [88,94],  shoulders: [46,48] },
        L:    { chest: [108,114], waist: [94,100], shoulders: [48,50] },
        XL:   { chest: [114,122], waist: [100,108],shoulders: [50,52] },
        XXL:  { chest: [122,130], waist: [108,116],shoulders: [52,54] },
      },
    },
  },
};

const hrxBrand: BrandProfile = {
  id: 'hrx', name: 'HRX', logo: 'HRX', country: 'India',
  origin: 'indian', category: 'sports',
  generalNote: 'Hrithik Roshan brand (Myntra). Designed for Indian athletic body. True to size.',
  color: '#FF4500', accent: '#FF6633',
  categories: {
    tshirt: {
      fitNotes: 'Athletic slim fit. Indian sportswear proportions.',
      runsSizing: 'true',
      sizes: {
        XS:   { chest: [82,86],   waist: [68,72],  shoulders: [40,42] },
        S:    { chest: [86,90],   waist: [72,76],  shoulders: [42,44] },
        M:    { chest: [90,96],   waist: [76,82],  shoulders: [44,46] },
        L:    { chest: [96,102],  waist: [82,88],  shoulders: [46,48] },
        XL:   { chest: [102,108], waist: [88,94],  shoulders: [48,50] },
        XXL:  { chest: [108,116], waist: [94,102], shoulders: [50,52] },
        XXXL: { chest: [116,124], waist: [102,110],shoulders: [52,54] },
      },
    },
    hoodie: {
      fitNotes: 'Athletic regular fit hoodie.',
      runsSizing: 'true',
      sizes: {
        S:    { chest: [88,96],   waist: [74,82],  shoulders: [43,45] },
        M:    { chest: [96,104],  waist: [82,90],  shoulders: [45,47] },
        L:    { chest: [104,112], waist: [90,98],  shoulders: [47,49] },
        XL:   { chest: [112,120], waist: [98,106], shoulders: [49,51] },
        XXL:  { chest: [120,128], waist: [106,114],shoulders: [51,53] },
      },
    },
  },
};

const roadster: BrandProfile = {
  id: 'roadster', name: 'Roadster', logo: 'RS', country: 'India',
  origin: 'indian', category: 'fast-fashion',
  generalNote: 'Myntra house brand. Generous casual fit. Runs slightly large.',
  color: '#D2691E', accent: '#E8824A',
  categories: {
    tshirt: {
      fitNotes: 'Regular casual fit. Comfortable Indian sizing.',
      runsSizing: 'large',
      sizes: {
        XS:   { chest: [82,88],   waist: [68,74],  shoulders: [41,43] },
        S:    { chest: [88,94],   waist: [74,80],  shoulders: [43,45] },
        M:    { chest: [94,100],  waist: [80,86],  shoulders: [45,47] },
        L:    { chest: [100,108], waist: [86,94],  shoulders: [47,49] },
        XL:   { chest: [108,116], waist: [94,102], shoulders: [49,51] },
        XXL:  { chest: [116,124], waist: [102,110],shoulders: [51,53] },
        XXXL: { chest: [124,132], waist: [110,118],shoulders: [53,55] },
      },
    },
    jeans: {
      fitNotes: 'Slim-fit denim. Indian casual.',
      runsSizing: 'true',
      sizes: {
        XS:   { waist: [70,74],  hips: [88,92],   inseam: [78,80] },
        S:    { waist: [74,78],  hips: [92,96],   inseam: [79,81] },
        M:    { waist: [78,84],  hips: [96,102],  inseam: [80,82] },
        L:    { waist: [84,90],  hips: [102,108], inseam: [80,82] },
        XL:   { waist: [90,96],  hips: [108,114], inseam: [81,83] },
        XXL:  { waist: [96,104], hips: [114,122], inseam: [81,83] },
      },
    },
  },
};

const uspa: BrandProfile = {
  id: 'uspa', name: 'U.S. Polo Assn.', logo: 'USPA', country: 'USA',
  origin: 'international', category: 'premium',
  generalNote: 'American polo heritage. Runs large. Classic American relaxed fit.',
  color: '#003580', accent: '#0047AB',
  categories: {
    tshirt: {
      fitNotes: 'Classic polo/regular fit. American generous sizing.',
      runsSizing: 'large',
      sizes: {
        XS:   { chest: [84,88],   waist: [70,74],  shoulders: [42,43] },
        S:    { chest: [88,96],   waist: [74,82],  shoulders: [43,45] },
        M:    { chest: [96,104],  waist: [82,90],  shoulders: [45,47] },
        L:    { chest: [104,112], waist: [90,98],  shoulders: [47,49] },
        XL:   { chest: [112,120], waist: [98,106], shoulders: [49,51] },
        XXL:  { chest: [120,128], waist: [106,114],shoulders: [51,53] },
        XXXL: { chest: [128,136], waist: [114,122],shoulders: [53,55] },
      },
    },
  },
};

const flyingMachine: BrandProfile = {
  id: 'flyingmachine', name: 'Flying Machine', logo: 'FM', country: 'India',
  origin: 'indian', category: 'denim',
  generalNote: 'Indian denim brand. Youth-focused slim fit. True to Indian sizing.',
  color: '#003399', accent: '#0044CC',
  categories: {
    jeans: {
      fitNotes: 'Slim/super-slim fit. Indian body proportions.',
      runsSizing: 'true',
      sizes: {
        XS:   { waist: [68,72],  hips: [86,90],   inseam: [78,80] },
        S:    { waist: [72,76],  hips: [90,94],   inseam: [79,81] },
        M:    { waist: [76,82],  hips: [94,100],  inseam: [80,82] },
        L:    { waist: [82,88],  hips: [100,106], inseam: [80,82] },
        XL:   { waist: [88,94],  hips: [106,112], inseam: [81,83] },
        XXL:  { waist: [94,102], hips: [112,120], inseam: [81,83] },
        XXXL: { waist: [102,110],hips: [120,128], inseam: [82,84] },
      },
    },
    tshirt: {
      fitNotes: 'Slim youth casual fit.',
      runsSizing: 'true',
      sizes: {
        S:    { chest: [86,90],   waist: [72,76],  shoulders: [42,44] },
        M:    { chest: [90,96],   waist: [76,82],  shoulders: [44,46] },
        L:    { chest: [96,102],  waist: [82,88],  shoulders: [46,48] },
        XL:   { chest: [102,108], waist: [88,94],  shoulders: [48,50] },
        XXL:  { chest: [108,116], waist: [94,102], shoulders: [50,52] },
      },
    },
  },
};

const spykar: BrandProfile = {
  id: 'spykar', name: 'Spykar', logo: 'SPY', country: 'India',
  origin: 'indian', category: 'denim',
  generalNote: 'Indian youth denim brand. Super-slim/skinny cuts. Runs small.',
  color: '#CC0033', accent: '#FF0044',
  categories: {
    jeans: {
      fitNotes: 'Skinny/slim fit. Runs small. Very tapered leg opening.',
      runsSizing: 'small',
      sizes: {
        XS:   { waist: [68,72],  hips: [84,88],   inseam: [78,80] },
        S:    { waist: [72,76],  hips: [88,92],   inseam: [79,81] },
        M:    { waist: [76,82],  hips: [92,98],   inseam: [80,82] },
        L:    { waist: [82,88],  hips: [98,104],  inseam: [80,82] },
        XL:   { waist: [88,94],  hips: [104,110], inseam: [81,83] },
        XXL:  { waist: [94,102], hips: [110,118], inseam: [81,83] },
      },
    },
  },
};

const killerJeans: BrandProfile = {
  id: 'killer', name: 'Killer Jeans', logo: 'KJ', country: 'India',
  origin: 'indian', category: 'denim',
  generalNote: 'Indian mass-market denim. Regular fit for Indian body type.',
  color: '#660000', accent: '#990000',
  categories: {
    jeans: {
      fitNotes: 'Regular/slim. Standard Indian denim sizing.',
      runsSizing: 'true',
      sizes: {
        S:    { waist: [74,78],  hips: [90,94],   inseam: [78,80] },
        M:    { waist: [78,84],  hips: [94,100],  inseam: [79,81] },
        L:    { waist: [84,90],  hips: [100,106], inseam: [80,82] },
        XL:   { waist: [90,96],  hips: [106,112], inseam: [80,82] },
        XXL:  { waist: [96,104], hips: [112,120], inseam: [81,83] },
        XXXL: { waist: [104,112],hips: [120,128], inseam: [81,83] },
      },
    },
  },
};

const monteCarlo: BrandProfile = {
  id: 'montecarlo', name: 'Monte Carlo', logo: 'MC', country: 'India',
  origin: 'indian', category: 'formal',
  generalNote: 'Indian winterwear and formals. Generous sizing for layering comfort.',
  color: '#2E4057', accent: '#3D5A80',
  categories: {
    tshirt: {
      fitNotes: 'Regular fit. Generous sizing accommodates Indian builds.',
      runsSizing: 'large',
      sizes: {
        S:    { chest: [92,96],   waist: [78,82],  shoulders: [43,45] },
        M:    { chest: [96,102],  waist: [82,88],  shoulders: [45,47] },
        L:    { chest: [102,108], waist: [88,94],  shoulders: [47,49] },
        XL:   { chest: [108,116], waist: [94,102], shoulders: [49,51] },
        XXL:  { chest: [116,124], waist: [102,110],shoulders: [51,53] },
        XXXL: { chest: [124,132], waist: [110,118],shoulders: [53,55] },
      },
    },
  },
};

const colorPlus: BrandProfile = {
  id: 'colorplus', name: 'ColorPlus', logo: 'CP', country: 'India',
  origin: 'indian', category: 'formal',
  generalNote: 'Raymond sub-brand. Premium Indian formal casual. True to size.',
  color: '#228B22', accent: '#2ECC40',
  categories: {
    shirt: {
      fitNotes: 'Regular fit. Premium Indian formal casual.',
      runsSizing: 'true',
      sizes: {
        S:    { chest: [90,94],   waist: [76,80],  shoulders: [43,45] },
        M:    { chest: [94,100],  waist: [80,86],  shoulders: [45,47] },
        L:    { chest: [100,106], waist: [86,92],  shoulders: [47,49] },
        XL:   { chest: [106,112], waist: [92,98],  shoulders: [49,51] },
        XXL:  { chest: [112,120], waist: [98,106], shoulders: [51,53] },
      },
    },
  },
};

const turtleBrand: BrandProfile = {
  id: 'turtle', name: 'Turtle', logo: 'TRT', country: 'India',
  origin: 'indian', category: 'formal',
  generalNote: 'Indian formal brand. Regular cut with generous proportions.',
  color: '#556B2F', accent: '#8FBC8F',
  categories: {
    shirt: {
      fitNotes: 'Regular formal fit. Standard Indian office sizing.',
      runsSizing: 'true',
      sizes: {
        S:    { chest: [90,96],   waist: [76,82],  shoulders: [43,45] },
        M:    { chest: [96,102],  waist: [82,88],  shoulders: [45,47] },
        L:    { chest: [102,108], waist: [88,94],  shoulders: [47,49] },
        XL:   { chest: [108,116], waist: [94,102], shoulders: [49,51] },
        XXL:  { chest: [116,124], waist: [102,110],shoulders: [51,53] },
      },
    },
  },
};

const zodiacBrand: BrandProfile = {
  id: 'zodiac', name: 'Zodiac', logo: 'ZD', country: 'India',
  origin: 'indian', category: 'formal',
  generalNote: 'Indian premium shirt specialist. Slim fit. Known for precise collar sizing.',
  color: '#8B0000', accent: '#AA0000',
  categories: {
    shirt: {
      fitNotes: 'Slim fit formal shirt specialist. True sizing.',
      runsSizing: 'true',
      sizes: {
        S:    { chest: [88,92],   waist: [74,78],  shoulders: [42,44] },
        M:    { chest: [92,98],   waist: [78,84],  shoulders: [44,46] },
        L:    { chest: [98,104],  waist: [84,90],  shoulders: [46,48] },
        XL:   { chest: [104,110], waist: [90,96],  shoulders: [48,50] },
        XXL:  { chest: [110,118], waist: [96,104], shoulders: [50,52] },
      },
    },
  },
};

const biba: BrandProfile = {
  id: 'biba', name: 'Biba', logo: 'BIBA', country: 'India',
  origin: 'indian', category: 'ethnic',
  generalNote: 'Indian ethnic wear for women. Generous traditional sizing.',
  color: '#FF69B4', accent: '#FFB6C1',
  categories: {
    tshirt: {
      fitNotes: 'Relaxed ethnic top. Generous Indian traditional sizing.',
      runsSizing: 'large',
      sizes: {
        XS:   { chest: [82,88],   waist: [68,74] },
        S:    { chest: [88,94],   waist: [74,80] },
        M:    { chest: [94,100],  waist: [80,86] },
        L:    { chest: [100,108], waist: [86,94] },
        XL:   { chest: [108,116], waist: [94,102] },
        XXL:  { chest: [116,124], waist: [102,110] },
      },
    },
  },
};

// ──────────────────────────────────────────────────────────────
// SECTION 6 — MORE INTERNATIONAL BRANDS POPULAR IN INDIA
// ──────────────────────────────────────────────────────────────

const newBalance: BrandProfile = {
  id: 'nb', name: 'New Balance', logo: 'NB', country: 'USA',
  origin: 'international', category: 'sports',
  generalNote: 'American athletic brand. Runs large. Very generous through chest.',
  color: '#CF0A2C', accent: '#E83050',
  categories: {
    tshirt: {
      fitNotes: 'Athletic regular fit. Wide US sizing.',
      runsSizing: 'large',
      sizes: {
        S:    { chest: [90,98],   waist: [76,84],  shoulders: [44,46] },
        M:    { chest: [98,106],  waist: [84,92],  shoulders: [46,48] },
        L:    { chest: [106,114], waist: [92,100], shoulders: [48,50] },
        XL:   { chest: [114,122], waist: [100,108],shoulders: [50,52] },
        XXL:  { chest: [122,130], waist: [108,116],shoulders: [52,54] },
      },
    },
  },
};

const guessBrand: BrandProfile = {
  id: 'guess', name: 'Guess', logo: 'GS', country: 'USA',
  origin: 'international', category: 'premium',
  generalNote: 'American premium denim-lifestyle brand. True to US size.',
  color: '#C0A060', accent: '#D4B87A',
  categories: {
    tshirt: {
      fitNotes: 'Slim-regular US fit.',
      runsSizing: 'true',
      sizes: {
        S:    { chest: [88,94],   waist: [74,80],  shoulders: [43,45] },
        M:    { chest: [94,100],  waist: [80,86],  shoulders: [45,47] },
        L:    { chest: [100,108], waist: [86,94],  shoulders: [47,49] },
        XL:   { chest: [108,116], waist: [94,102], shoulders: [49,51] },
        XXL:  { chest: [116,124], waist: [102,110],shoulders: [51,53] },
      },
    },
    jeans: {
      fitNotes: 'Slim to slim-straight US denim cut.',
      runsSizing: 'true',
      sizes: {
        S:    { waist: [74,78],  hips: [90,94],   inseam: [80,82] },
        M:    { waist: [78,84],  hips: [94,100],  inseam: [80,82] },
        L:    { waist: [84,90],  hips: [100,106], inseam: [81,83] },
        XL:   { waist: [90,96],  hips: [106,112], inseam: [81,83] },
        XXL:  { waist: [96,104], hips: [112,120], inseam: [82,84] },
      },
    },
  },
};

const armaniExchange: BrandProfile = {
  id: 'ax', name: 'Armani Exchange', logo: 'A|X', country: 'Italy',
  origin: 'international', category: 'premium',
  generalNote: 'Italian streetwear label. Slim Italian cut. Runs small.',
  color: '#1A1A1A', accent: '#333333',
  categories: {
    tshirt: {
      fitNotes: 'Slim Italian cut. Chest and shoulders run narrow.',
      runsSizing: 'small',
      sizes: {
        XS:   { chest: [80,84],   waist: [66,70],  shoulders: [39,41] },
        S:    { chest: [84,88],   waist: [70,74],  shoulders: [41,43] },
        M:    { chest: [88,94],   waist: [74,80],  shoulders: [43,45] },
        L:    { chest: [94,100],  waist: [80,86],  shoulders: [45,47] },
        XL:   { chest: [100,107], waist: [86,93],  shoulders: [47,49] },
        XXL:  { chest: [107,115], waist: [93,101], shoulders: [49,51] },
      },
    },
  },
};

const bershka: BrandProfile = {
  id: 'bershka', name: 'Bershka', logo: 'BSK', country: 'Spain',
  origin: 'international', category: 'fast-fashion',
  generalNote: 'Youth-focused Inditex brand (Zara group). Similar sizing to Zara — runs small.',
  color: '#FF3366', accent: '#FF6699',
  categories: {
    tshirt: {
      fitNotes: 'Youth slim fit. Same parent group as Zara — runs small.',
      runsSizing: 'small',
      sizes: {
        XS:   { chest: [80,84],   waist: [66,70],  shoulders: [39,41] },
        S:    { chest: [84,88],   waist: [70,74],  shoulders: [41,43] },
        M:    { chest: [88,94],   waist: [74,80],  shoulders: [43,45] },
        L:    { chest: [94,100],  waist: [80,86],  shoulders: [45,47] },
        XL:   { chest: [100,108], waist: [86,94],  shoulders: [47,49] },
        XXL:  { chest: [108,116], waist: [94,102], shoulders: [49,51] },
      },
    },
  },
};

const pullbear: BrandProfile = {
  id: 'pullbear', name: 'Pull&Bear', logo: 'P&B', country: 'Spain',
  origin: 'international', category: 'fast-fashion',
  generalNote: 'Youth casual from Inditex. Slightly more relaxed than Zara/Bershka.',
  color: '#6B3A2A', accent: '#9B5A4A',
  categories: {
    tshirt: {
      fitNotes: 'Relaxed youth fit. Slightly roomier than Zara.',
      runsSizing: 'small',
      sizes: {
        XS:   { chest: [82,86],   waist: [68,72],  shoulders: [40,42] },
        S:    { chest: [86,90],   waist: [72,76],  shoulders: [42,44] },
        M:    { chest: [90,96],   waist: [76,82],  shoulders: [44,46] },
        L:    { chest: [96,102],  waist: [82,88],  shoulders: [46,48] },
        XL:   { chest: [102,109], waist: [88,95],  shoulders: [48,50] },
        XXL:  { chest: [109,117], waist: [95,103], shoulders: [50,52] },
      },
    },
  },
};

const forever21: BrandProfile = {
  id: 'f21', name: 'Forever 21', logo: 'F21', country: 'USA',
  origin: 'international', category: 'fast-fashion',
  generalNote: 'American fast fashion. True US sizing. Affordable basics.',
  color: '#FF66BB', accent: '#FF99DD',
  categories: {
    tshirt: {
      fitNotes: 'Regular fit. Standard US sizing.',
      runsSizing: 'true',
      sizes: {
        XS:   { chest: [82,86],   waist: [68,72] },
        S:    { chest: [86,92],   waist: [72,78] },
        M:    { chest: [92,100],  waist: [78,86] },
        L:    { chest: [100,108], waist: [86,94] },
        XL:   { chest: [108,116], waist: [94,102] },
        XXL:  { chest: [116,124], waist: [102,110] },
      },
    },
  },
};

const parkAvenue: BrandProfile = {
  id: 'parkavenue', name: 'Park Avenue', logo: 'PA', country: 'India',
  origin: 'indian', category: 'formal',
  generalNote: 'Raymond premium sub-brand. True formal sizing for Indian professionals.',
  color: '#4A0080', accent: '#6600CC',
  categories: {
    shirt: {
      fitNotes: 'Slim formal. Indian professional sizing.',
      runsSizing: 'true',
      sizes: {
        S:    { chest: [88,92],   waist: [74,78],  shoulders: [42,44] },
        M:    { chest: [92,98],   waist: [78,84],  shoulders: [44,46] },
        L:    { chest: [98,104],  waist: [84,90],  shoulders: [46,48] },
        XL:   { chest: [104,110], waist: [90,96],  shoulders: [48,50] },
        XXL:  { chest: [110,118], waist: [96,104], shoulders: [50,52] },
        XXXL: { chest: [118,126], waist: [104,112],shoulders: [52,54] },
      },
    },
  },
};

// ──────────────────────────────────────────────────────────────
// SECTION 7 — ORIGINAL MOCK BRANDS (backward compat)
// ──────────────────────────────────────────────────────────────

const novaStudio: BrandProfile = {
  id: 'nova', name: 'Nova Studio', logo: 'NS', country: 'Italy',
  origin: 'international', category: 'premium',
  generalNote: 'European cut, slightly narrow shoulders. True-to-size.',
  color: '#6C63FF', accent: '#a89fff',
  categories: {
    tshirt: {
      fitNotes: 'Classic Italian fit. Tapers at waist.',
      runsSizing: 'true',
      sizes: {
        XS:   { chest: [82,87],   waist: [68,73],  shoulders: [40,42] },
        S:    { chest: [88,93],   waist: [74,79],  shoulders: [43,44] },
        M:    { chest: [94,99],   waist: [80,85],  shoulders: [45,46] },
        L:    { chest: [100,105], waist: [86,91],  shoulders: [47,48] },
        XL:   { chest: [106,111], waist: [92,97],  shoulders: [49,50] },
        XXL:  { chest: [112,118], waist: [98,104], shoulders: [51,52] },
      },
    },
  },
};

const zenith: BrandProfile = {
  id: 'zenith', name: 'Zenith', logo: 'ZN', country: 'UK',
  origin: 'international', category: 'premium',
  generalNote: 'Slightly generous — runs half a size large.',
  color: '#00D4FF', accent: '#66e5ff',
  categories: {
    tshirt: {
      fitNotes: 'Generous British cut with extra room in chest.',
      runsSizing: 'large',
      sizes: {
        XS:   { chest: [80,84],   waist: [66,70],  shoulders: [39,41] },
        S:    { chest: [85,89],   waist: [71,75],  shoulders: [42,43] },
        M:    { chest: [90,94],   waist: [76,80],  shoulders: [44,45] },
        L:    { chest: [95,100],  waist: [81,86],  shoulders: [46,47] },
        XL:   { chest: [101,107], waist: [87,93],  shoulders: [48,49] },
        XXL:  { chest: [108,115], waist: [94,101], shoulders: [50,52] },
      },
    },
  },
};

const axiom: BrandProfile = {
  id: 'axiom', name: 'Axiom Wear', logo: 'AX', country: 'USA',
  origin: 'international', category: 'streetwear',
  generalNote: 'American relaxed fit — runs large, especially in chest.',
  color: '#FF2D78', accent: '#ff7aab',
  categories: {
    tshirt: {
      fitNotes: 'Relaxed American fit. Chest is generous.',
      runsSizing: 'large',
      sizes: {
        XS:   { chest: [84,88],   waist: [70,75],  shoulders: [41,43] },
        S:    { chest: [89,94],   waist: [76,81],  shoulders: [44,45] },
        M:    { chest: [95,101],  waist: [82,88],  shoulders: [46,47] },
        L:    { chest: [102,108], waist: [89,95],  shoulders: [48,49] },
        XL:   { chest: [109,116], waist: [96,103], shoulders: [50,51] },
        XXL:  { chest: [117,125], waist: [104,112],shoulders: [52,54] },
      },
    },
  },
};

const solace: BrandProfile = {
  id: 'solace', name: 'Solace', logo: 'SL', country: 'Japan',
  origin: 'international', category: 'premium',
  generalNote: 'Japanese slim fit — narrow shoulders, runs small.',
  color: '#FFD700', accent: '#ffe566',
  categories: {
    tshirt: {
      fitNotes: 'Japanese minimal fit. Very narrow shoulders.',
      runsSizing: 'small',
      sizes: {
        XS:   { chest: [80,84],   waist: [64,68],  shoulders: [38,40] },
        S:    { chest: [85,89],   waist: [69,73],  shoulders: [41,42] },
        M:    { chest: [90,94],   waist: [74,78],  shoulders: [43,44] },
        L:    { chest: [95,99],   waist: [79,83],  shoulders: [45,46] },
        XL:   { chest: [100,105], waist: [84,89],  shoulders: [47,48] },
        XXL:  { chest: [106,112], waist: [90,96],  shoulders: [49,51] },
      },
    },
  },
};

// Additional requested Indian & Global Brands
const onlyBrand: BrandProfile = { id: 'only', name: 'ONLY', logo: 'ONLY', country: 'Denmark', origin: 'international', category: 'fast-fashion', generalNote: 'Scandinavian women\'s brand. True to European sizing.', color: '#FF3366', accent: '#FF6699', categories: { tshirt: { fitNotes: 'Slim fit. Standard European.', runsSizing: 'true', sizes: { S: { chest: [84,88], waist: [68,72] }, M: { chest: [88,94], waist: [72,78] }, L: { chest: [94,100], waist: [78,84] }, XL: { chest: [100,106], waist: [84,90] } } } } };
const highlander: BrandProfile = { id: 'highlander', name: 'Highlander', logo: 'HL', country: 'India', origin: 'indian', category: 'fast-fashion', generalNote: 'Myntra popular Indian casual brand. Slim fit cut.', color: '#0047FF', accent: '#3377FF', categories: { tshirt: { fitNotes: 'Slim fit. True to Indian size.', runsSizing: 'true', sizes: { S: { chest: [86,90], waist: [72,76] }, M: { chest: [90,96], waist: [76,82] }, L: { chest: [96,102], waist: [82,88] }, XL: { chest: [102,108], waist: [88,94] } } } } };
const mastharbour: BrandProfile = { id: 'mastharbour', name: 'Mast & Harbour', logo: 'M&H', country: 'India', origin: 'indian', category: 'fast-fashion', generalNote: 'Myntra casual label. Relaxed Indian cut.', color: '#008080', accent: '#20B2AA', categories: { tshirt: { fitNotes: 'Relaxed fit.', runsSizing: 'large', sizes: { S: { chest: [88,94], waist: [74,80] }, M: { chest: [94,100], waist: [80,86] }, L: { chest: [100,106], waist: [86,92] }, XL: { chest: [106,112], waist: [92,98] } } } } };
const herenow: BrandProfile = { id: 'herenow', name: 'HERE&NOW', logo: 'H&N', country: 'India', origin: 'indian', category: 'fast-fashion', generalNote: 'Indian youth casuals. Slim cut.', color: '#FF4500', accent: '#FF6347', categories: { tshirt: { fitNotes: 'Youth slim fit.', runsSizing: 'small', sizes: { S: { chest: [84,88], waist: [70,74] }, M: { chest: [88,94], waist: [74,80] }, L: { chest: [94,100], waist: [80,86] }, XL: { chest: [100,106], waist: [86,92] } } } } };
const dressberry: BrandProfile = { id: 'dressberry', name: 'DressBerry', logo: 'DB', country: 'India', origin: 'indian', category: 'fast-fashion', generalNote: 'Indian women\'s casual wear.', color: '#DA70D6', accent: '#EE82EE', categories: { tshirt: { fitNotes: 'Regular fit.', runsSizing: 'true', sizes: { S: { chest: [82,86], waist: [66,70] }, M: { chest: [86,92], waist: [70,76] }, L: { chest: [92,98], waist: [76,82] }, XL: { chest: [98,104], waist: [82,88] } } } } };
const tokyotalkies: BrandProfile = { id: 'tokyotalkies', name: 'Tokyo Talkies', logo: 'TT', country: 'India', origin: 'indian', category: 'fast-fashion', generalNote: 'Indian fast fashion for youth.', color: '#FF1493', accent: '#FF69B4', categories: { tshirt: { fitNotes: 'Slim fit.', runsSizing: 'small', sizes: { S: { chest: [82,86], waist: [66,70] }, M: { chest: [86,90], waist: [70,74] }, L: { chest: [90,96], waist: [74,80] }, XL: { chest: [96,102], waist: [80,86] } } } } };
const modarapido: BrandProfile = { id: 'modarapido', name: 'Moda Rapido', logo: 'MR', country: 'India', origin: 'indian', category: 'fast-fashion', generalNote: 'Myntra AI-designed fashion brand.', color: '#4169E1', accent: '#1E90FF', categories: { tshirt: { fitNotes: 'Regular fit.', runsSizing: 'true', sizes: { S: { chest: [86,90], waist: [72,76] }, M: { chest: [90,96], waist: [76,82] }, L: { chest: [96,102], waist: [82,88] }, XL: { chest: [102,108], waist: [88,94] } } } } };
const wrogn: BrandProfile = { id: 'wrogn', name: 'WROGN', logo: 'WRGN', country: 'India', origin: 'indian', category: 'streetwear', generalNote: 'Virat Kohli youth streetwear brand. Slim fit cut.', color: '#1A1A1A', accent: '#FF0000', categories: { tshirt: { fitNotes: 'Slim tapered cut.', runsSizing: 'small', sizes: { S: { chest: [84,88], waist: [70,74] }, M: { chest: [88,94], waist: [74,80] }, L: { chest: [94,100], waist: [80,86] }, XL: { chest: [100,106], waist: [86,92] } } } } };
const roadsterlife: BrandProfile = { id: 'roadsterlife', name: 'The Roadster Life Co.', logo: 'RLC', country: 'India', origin: 'indian', category: 'fast-fashion', generalNote: 'Casual outdoor lifestyle range by Roadster.', color: '#8B4513', accent: '#A0522D', categories: { tshirt: { fitNotes: 'Relaxed fit.', runsSizing: 'large', sizes: { S: { chest: [88,94], waist: [74,80] }, M: { chest: [94,100], waist: [80,86] }, L: { chest: [100,106], waist: [86,92] }, XL: { chest: [106,112], waist: [92,98] } } } } };
const skechers: BrandProfile = { id: 'skechers', name: 'Skechers', logo: 'SKX', country: 'USA', origin: 'international', category: 'sports', generalNote: 'American activewear. Generous fit.', color: '#000080', accent: '#4169E1', categories: { tshirt: { fitNotes: 'Relaxed athletic fit.', runsSizing: 'large', sizes: { S: { chest: [90,96], waist: [76,82] }, M: { chest: [96,102], waist: [82,88] }, L: { chest: [102,108], waist: [88,94] }, XL: { chest: [108,114], waist: [94,100] } } } } };
const asics: BrandProfile = { id: 'asics', name: 'ASICS', logo: 'ASC', country: 'Japan', origin: 'international', category: 'sports', generalNote: 'Japanese performance sports. Slim fit.', color: '#00008B', accent: '#0000FF', categories: { tshirt: { fitNotes: 'Fitted sports cut.', runsSizing: 'small', sizes: { S: { chest: [84,88], waist: [70,74] }, M: { chest: [88,94], waist: [74,80] }, L: { chest: [94,100], waist: [80,86] }, XL: { chest: [100,106], waist: [86,92] } } } } };
const manyavar: BrandProfile = { id: 'manyavar', name: 'Manyavar', logo: 'MYV', country: 'India', origin: 'indian', category: 'ethnic', generalNote: 'Leading Indian ethnic & wedding wear. Generous traditional cut.', color: '#800000', accent: '#B22222', categories: { shirt: { fitNotes: 'Kurta / traditional cut.', runsSizing: 'large', sizes: { S: { chest: [94,98], waist: [80,84] }, M: { chest: [98,104], waist: [84,90] }, L: { chest: [104,110], waist: [90,96] }, XL: { chest: [110,116], waist: [96,102] } } } } };
const wBrand: BrandProfile = { id: 'wbrand', name: 'W', logo: 'W', country: 'India', origin: 'indian', category: 'ethnic', generalNote: 'Indian contemporary ethnic wear for women.', color: '#C71585', accent: '#FF1493', categories: { tshirt: { fitNotes: 'Contemporary ethnic fit.', runsSizing: 'true', sizes: { S: { chest: [84,88], waist: [68,72] }, M: { chest: [88,94], waist: [72,78] }, L: { chest: [94,100], waist: [78,84] }, XL: { chest: [100,106], waist: [84,90] } } } } };
const aurelia: BrandProfile = { id: 'aurelia', name: 'Aurelia', logo: 'AUR', country: 'India', origin: 'indian', category: 'ethnic', generalNote: 'Traditional Indian ethnic wear for women.', color: '#DB7093', accent: '#FF69B4', categories: { tshirt: { fitNotes: 'Ethnic relaxed cut.', runsSizing: 'large', sizes: { S: { chest: [86,90], waist: [70,74] }, M: { chest: [90,96], waist: [74,80] }, L: { chest: [96,102], waist: [80,86] }, XL: { chest: [102,108], waist: [86,92] } } } } };
const soch: BrandProfile = { id: 'soch', name: 'Soch', logo: 'SCH', country: 'India', origin: 'indian', category: 'ethnic', generalNote: 'Indian ethnic wear specialist.', color: '#8B0000', accent: '#DC143C', categories: { tshirt: { fitNotes: 'Traditional regular fit.', runsSizing: 'true', sizes: { S: { chest: [84,88], waist: [68,72] }, M: { chest: [88,94], waist: [72,78] }, L: { chest: [94,100], waist: [78,84] }, XL: { chest: [100,106], waist: [84,90] } } } } };
const globaldesi: BrandProfile = { id: 'globaldesi', name: 'Global Desi', logo: 'GD', country: 'India', origin: 'indian', category: 'ethnic', generalNote: 'Indo-western fusion brand by Anita Dongre.', color: '#FF4500', accent: '#FF6347', categories: { tshirt: { fitNotes: 'Fusion relaxed fit.', runsSizing: 'large', sizes: { S: { chest: [86,90], waist: [70,74] }, M: { chest: [90,96], waist: [74,80] }, L: { chest: [96,102], waist: [80,86] }, XL: { chest: [102,108], waist: [86,92] } } } } };
const superdry: BrandProfile = { id: 'superdry', name: 'Superdry', logo: 'SDRY', country: 'UK', origin: 'international', category: 'premium', generalNote: 'British brand with Japanese graphics. Runs small — slim fit.', color: '#FF4500', accent: '#FF6347', categories: { tshirt: { fitNotes: 'Slim fit. Runs 1 size small.', runsSizing: 'small', sizes: { S: { chest: [84,88], waist: [70,74] }, M: { chest: [88,94], waist: [74,80] }, L: { chest: [94,100], waist: [80,86] }, XL: { chest: [100,106], waist: [86,92] } } } } };
const ucb: BrandProfile = { id: 'ucb', name: 'United Colors of Benetton', logo: 'UCB', country: 'Italy', origin: 'international', category: 'premium', generalNote: 'Italian casual brand. True European fit.', color: '#008000', accent: '#00FF00', categories: { tshirt: { fitNotes: 'Regular slim fit.', runsSizing: 'true', sizes: { S: { chest: [86,90], waist: [72,76] }, M: { chest: [90,96], waist: [76,82] }, L: { chest: [96,102], waist: [82,88] }, XL: { chest: [102,108], waist: [88,94] } } } } };
const max: BrandProfile = { id: 'max', name: 'Max', logo: 'MAX', country: 'India', origin: 'indian', category: 'fast-fashion', generalNote: 'Popular Indian affordable fashion retailer. Regular fit.', color: '#0047FF', accent: '#3377FF', categories: { tshirt: { fitNotes: 'Regular fit. Generous Indian sizing.', runsSizing: 'true', sizes: { S: { chest: [88,92], waist: [74,78] }, M: { chest: [92,98], waist: [78,84] }, L: { chest: [98,104], waist: [84,90] }, XL: { chest: [104,110], waist: [90,96] } } } } };
const trends: BrandProfile = { id: 'trends', name: 'Reliance Trends', logo: 'RT', country: 'India', origin: 'indian', category: 'fast-fashion', generalNote: 'Mass market Indian fashion chain. Comfortable regular sizing.', color: '#FF0000', accent: '#FF3333', categories: { tshirt: { fitNotes: 'Regular comfortable fit.', runsSizing: 'large', sizes: { S: { chest: [88,94], waist: [74,80] }, M: { chest: [94,100], waist: [80,86] }, L: { chest: [100,106], waist: [86,92] }, XL: { chest: [106,112], waist: [92,98] } } } } };

// ──────────────────────────────────────────────────────────────
// MASTER EXPORT — EXACT 50 BRANDS
// ──────────────────────────────────────────────────────────────

export const allBrands: BrandProfile[] = [
  // 1-10: POPULAR / GLOBAL FASHION
  hmBrand, zaraBrand, uniqlo, gap, marksspencer, forever21, mango, onlyBrand, veromoda, jackJones,
  // 11-20: INDIAN ONLINE FASHION
  roadster, hrxBrand, highlander, mastharbour, herenow, dressberry, tokyotalkies, modarapido, wrogn, roadsterlife,
  // 21-28: SPORTS & ACTIVEWEAR
  nikeBrand, adidasBrand, pumaBrand, reebokBrand, skechers, underArmour, asics, newBalance,
  // 29-35: DENIM / CASUAL
  levis, lee, wrangler, flyingMachine, pepeJeans, spykar, killerJeans,
  // 36-42: INDIAN / ETHNIC FASHION
  manyavar, biba, wBrand, aurelia, soch, fabindia, globaldesi,
  // 43-48: PREMIUM / LUXURY / DESIGNER
  tommyHilfiger, calvinKlein, superdry, ucb, lacoste, armaniExchange,
  // 49-50: POPULAR AFFORDABLE / MASS MARKET
  max, trends,
  // Legacy support
  allenSolly, louisPhilippe, vanHeusen, peterEngland, raymond, blackberrys, arrowBrand, parkAvenue, colorPlus, turtleBrand, zodiacBrand, monteCarlo, uspa, leeCooper, hugoBoss, ralphLauren, guessBrand, bershka, pullbear, novaStudio, zenith, axiom, solace
];

export const brandById: Record<string, BrandProfile> = Object.fromEntries(
  allBrands.map(b => [b.id, b])
);

export const comparisonBrands = [hmBrand, zaraBrand];
export const indianBrands = allBrands.filter(b => b.origin === 'indian');
export const internationalBrands = allBrands.filter(b => b.origin === 'international');

export type FilterGroupKey = 'all' | 'popular' | 'fashion' | 'indian-fashion' | 'sports' | 'denim' | 'luxury' | 'ethnic' | 'affordable';

export const brandsByCategoryGroup: Record<FilterGroupKey, BrandProfile[]> = {
  all: allBrands,
  popular: [hmBrand, zaraBrand, uniqlo, gap, marksspencer, nikeBrand, levis, roadster, hrxBrand, allenSolly],
  fashion: [hmBrand, zaraBrand, uniqlo, gap, mango, onlyBrand, veromoda, jackJones, forever21, marksspencer],
  'indian-fashion': [roadster, hrxBrand, highlander, mastharbour, herenow, dressberry, tokyotalkies, modarapido, wrogn, roadsterlife, allenSolly, louisPhilippe, vanHeusen, peterEngland, raymond],
  sports: [nikeBrand, adidasBrand, pumaBrand, reebokBrand, skechers, underArmour, asics, newBalance],
  denim: [levis, lee, wrangler, flyingMachine, pepeJeans, spykar, killerJeans, jackJones],
  luxury: [tommyHilfiger, calvinKlein, superdry, ucb, lacoste, armaniExchange, hugoBoss, ralphLauren],
  ethnic: [manyavar, biba, wBrand, aurelia, soch, fabindia, globaldesi],
  affordable: [max, trends, roadster, highlander, herenow, dressberry],
};

export const categoryLabels: Record<ClothingCategory, string> = {
  tshirt: 'T-Shirt',
  shirt: 'Shirt',
  hoodie: 'Hoodie',
  jeans: 'Jeans',
};

export const categoryEmojis: Record<ClothingCategory, string> = {
  tshirt: '👕',
  shirt: '👔',
  hoodie: '🧥',
  jeans: '👖',
};

