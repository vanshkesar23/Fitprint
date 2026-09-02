// FitPrint Recommendation Algorithm
// Compares user measurements against brand-specific size charts to find the best fit

import { Size, Measurements, BrandSizeChart, FitPreference } from './mockData';

export interface FitResult {
  size: Size;
  confidence: number; // 0-100
  chestFit: FitStatus;
  waistFit: FitStatus;
  hipsFit: FitStatus;
  shoulderFit: FitStatus;
  notes: string;
  yourUsualSize: Size;
  reason: string;
}

export type FitStatus = 'perfect' | 'slightly-tight' | 'slightly-relaxed' | 'tight' | 'loose';

const SIZE_ORDER: Size[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

function getFitStatus(measurement: number, range: [number, number]): { status: FitStatus; score: number } {
  const [min, max] = range;
  const mid = (min + max) / 2;
  const rangeWidth = max - min;

  if (measurement >= min && measurement <= max) {
    // Within range — perfect
    const distFromCenter = Math.abs(measurement - mid) / (rangeWidth / 2);
    return { status: 'perfect', score: 100 - distFromCenter * 10 };
  } else if (measurement < min) {
    const over = min - measurement;
    if (over <= 3) return { status: 'slightly-relaxed', score: 75 };
    return { status: 'loose', score: 40 };
  } else {
    const over = measurement - max;
    if (over <= 3) return { status: 'slightly-tight', score: 70 };
    return { status: 'tight', score: 30 };
  }
}

function getUsualSize(measurements: Measurements): Size {
  // Generic size chart baseline (average brand)
  const { chest } = measurements;
  if (chest < 86) return 'XS';
  if (chest < 92) return 'S';
  if (chest < 98) return 'M';
  if (chest < 104) return 'L';
  if (chest < 112) return 'XL';
  return 'XXL';
}

function applyFitPreference(scores: Map<Size, number>, preference: FitPreference): Map<Size, number> {
  const adjusted = new Map(scores);
  
  for (const [size, score] of Array.from(adjusted.entries())) {
    const idx = SIZE_ORDER.indexOf(size);
    
    if (preference === 'slim') {
      // Prefer smaller sizes — penalize larger
      adjusted.set(size, score - idx * 2);
    } else if (preference === 'oversized') {
      // Prefer larger sizes
      adjusted.set(size, score - (SIZE_ORDER.length - 1 - idx) * 2);
    } else if (preference === 'relaxed') {
      // Slightly prefer larger sizes
      adjusted.set(size, score - (SIZE_ORDER.length - 1 - idx) * 0.5);
    }
  }
  
  return adjusted;
}

export function recommendSize(
  measurements: Measurements,
  brandChart: BrandSizeChart,
  fitPreference: FitPreference,
  availableSizes: Size[]
): FitResult {
  const scoreMap = new Map<Size, number>();
  const fitDetails = new Map<Size, { chest: FitStatus; waist: FitStatus; hips: FitStatus; shoulders: FitStatus }>();

  for (const [sizeKey, ranges] of Object.entries(brandChart.sizes)) {
    const size = sizeKey as Size;
    if (!availableSizes.includes(size)) continue;

    const chestResult = getFitStatus(measurements.chest, ranges.chest);
    const waistResult = getFitStatus(measurements.waist, ranges.waist);
    const hipsResult = getFitStatus(measurements.hips, ranges.hips);
    const shoulderResult = getFitStatus(measurements.shoulders, ranges.shoulders);

    // Weighted scoring: chest and shoulders matter most for tops
    const totalScore = 
      chestResult.score * 0.35 +
      shoulderResult.score * 0.30 +
      waistResult.score * 0.20 +
      hipsResult.score * 0.15;

    scoreMap.set(size, totalScore);
    fitDetails.set(size, {
      chest: chestResult.status,
      waist: waistResult.status,
      hips: hipsResult.status,
      shoulders: shoulderResult.status,
    });
  }

  const adjustedScores = applyFitPreference(scoreMap, fitPreference);

  // Find best size
  let bestSize: Size = availableSizes[Math.floor(availableSizes.length / 2)];
  let bestScore = -Infinity;

  for (const [size, score] of Array.from(adjustedScores.entries())) {
    if (score > bestScore) {
      bestScore = score;
      bestSize = size;
    }
  }

  const details = fitDetails.get(bestSize)!;
  const rawScore = scoreMap.get(bestSize) || 70;
  const confidence = Math.min(98, Math.max(60, Math.round(rawScore)));

  const usualSize = getUsualSize(measurements);

  // Generate reason text
  let reason = '';
  const brandNotes = brandChart.notes || '';
  if (bestSize !== usualSize) {
    const sizeIdx = SIZE_ORDER.indexOf(bestSize);
    const usualIdx = SIZE_ORDER.indexOf(usualSize);
    if (sizeIdx > usualIdx) {
      reason = `${brandChart.brandId === 'solace' ? 'This brand' : 'This brand'} runs smaller than average. ${brandNotes}`;
    } else {
      reason = `This brand runs larger than average. ${brandNotes}`;
    }
  } else {
    reason = `This brand aligns well with your usual sizing. ${brandNotes}`;
  }

  return {
    size: bestSize,
    confidence,
    chestFit: details.chest,
    waistFit: details.waist,
    hipsFit: details.hips,
    shoulderFit: details.shoulders,
    notes: brandNotes,
    yourUsualSize: usualSize,
    reason,
  };
}

export function getFitStatusLabel(status: FitStatus): string {
  const labels: Record<FitStatus, string> = {
    'perfect': 'Perfect',
    'slightly-tight': 'Slightly Tight',
    'slightly-relaxed': 'Slightly Relaxed',
    'tight': 'Too Tight',
    'loose': 'Too Loose',
  };
  return labels[status];
}

export function getFitStatusColor(status: FitStatus): string {
  const colors: Record<FitStatus, string> = {
    'perfect': '#00D4FF',
    'slightly-tight': '#FFD700',
    'slightly-relaxed': '#6C63FF',
    'tight': '#FF2D78',
    'loose': '#FF2D78',
  };
  return colors[status];
}
