// FitPrint Recommendation Engine v2
// Calculates personalized size recommendations from brand size chart data

import { BrandProfile, ClothingCategory, GarmentMeasurements, SizeKey, allBrands } from './brandSizeCharts';

export type FitStatus = 'perfect' | 'slightly-tight' | 'slightly-relaxed' | 'tight' | 'loose';
export type FitPreference = 'slim' | 'regular' | 'relaxed' | 'oversized';

export interface UserMeasurements {
  chest: number;
  waist: number;
  hips: number;
  shoulders: number;
  height?: number;
  weight?: number;
  sleeveLength?: number;
  inseam?: number;
  thigh?: number;
  neck?: number;
}

export interface MeasurementFit {
  status: FitStatus;
  score: number;
  label: string;
  color: string;
}

export interface FitResult {
  size: SizeKey;
  confidence: number;
  chest: MeasurementFit;
  waist: MeasurementFit;
  hips: MeasurementFit;
  shoulders: MeasurementFit;
  yourUsualSize: SizeKey;
  reason: string;
  brandNote: string;
  sizeTendency: string;
}

export interface FeedbackRecord {
  brandId: string;
  category: ClothingCategory;
  recommendedSize: SizeKey;
  actualFit: 'perfect' | 'slightly-tight' | 'slightly-loose' | 'too-small' | 'too-large';
  date: string;
  adjustment: number; // -2 to +2, negative = go smaller, positive = go larger
}

const SIZE_ORDER: SizeKey[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

function fitStatusFromRange(measurement: number, range: [number, number]): { status: FitStatus; score: number } {
  const [min, max] = range;
  const mid = (min + max) / 2;
  const width = max - min;

  if (measurement >= min && measurement <= max) {
    const distFromCenter = Math.abs(measurement - mid) / (width / 2);
    return { status: 'perfect', score: 100 - distFromCenter * 8 };
  }
  if (measurement < min) {
    const over = min - measurement;
    if (over <= 2) return { status: 'slightly-relaxed', score: 78 };
    if (over <= 5) return { status: 'loose', score: 55 };
    return { status: 'loose', score: 30 };
  }
  const over = measurement - max;
  if (over <= 2) return { status: 'slightly-tight', score: 72 };
  if (over <= 5) return { status: 'tight', score: 50 };
  return { status: 'tight', score: 25 };
}

function fitStatusMeta(status: FitStatus): { label: string; color: string } {
  const map: Record<FitStatus, { label: string; color: string }> = {
    'perfect':          { label: 'Perfect Match',    color: '#00D4FF' },
    'slightly-relaxed': { label: 'Comfortable Fit',  color: '#6C63FF' },
    'slightly-tight':   { label: 'Slightly Snug',    color: '#FFD700' },
    'tight':            { label: 'Too Tight',         color: '#FF2D78' },
    'loose':            { label: 'Too Loose',         color: '#FF2D78' },
  };
  return map[status];
}

function guessUsualSize(measurements: UserMeasurements): SizeKey {
  const { chest } = measurements;
  if (chest < 86) return 'XS';
  if (chest < 92) return 'S';
  if (chest < 98) return 'M';
  if (chest < 104) return 'L';
  if (chest < 112) return 'XL';
  return 'XXL';
}

function applyPreference(scores: Map<SizeKey, number>, preference: FitPreference): Map<SizeKey, number> {
  const result = new Map(scores);
  for (const [size, score] of Array.from(result.entries())) {
    const idx = SIZE_ORDER.indexOf(size);
    if (preference === 'slim')     result.set(size, score - idx * 1.5);
    if (preference === 'oversized') result.set(size, score - (SIZE_ORDER.length - 1 - idx) * 1.5);
    if (preference === 'relaxed')  result.set(size, score - (SIZE_ORDER.length - 1 - idx) * 0.5);
  }
  return result;
}

function applyFeedbackAdjustment(scores: Map<SizeKey, number>, feedbackAdj: number): Map<SizeKey, number> {
  // feedbackAdj: positive = user usually needs bigger, negative = smaller
  if (feedbackAdj === 0) return scores;
  const result = new Map(scores);
  for (const [size, score] of Array.from(result.entries())) {
    const idx = SIZE_ORDER.indexOf(size);
    // Reward sizes in the direction of the adjustment
    const adjScore = score + feedbackAdj * (idx - SIZE_ORDER.length / 2) * 2;
    result.set(size, adjScore);
  }
  return result;
}

export function recommendSize(
  measurements: UserMeasurements,
  brand: BrandProfile,
  category: ClothingCategory,
  preference: FitPreference,
  feedbackHistory: FeedbackRecord[] = []
): FitResult | null {
  const chart = brand.categories[category];
  if (!chart) return null;

  const scoreMap = new Map<SizeKey, number>();
  const detailMap = new Map<SizeKey, { chest: MeasurementFit; waist: MeasurementFit; hips: MeasurementFit; shoulders: MeasurementFit }>();

  for (const [sizeKey, garment] of Object.entries(chart.sizes)) {
    const size = sizeKey as SizeKey;
    const g = garment as GarmentMeasurements;

    const chestFit = g.chest
      ? fitStatusFromRange(measurements.chest, g.chest)
      : { status: 'perfect' as FitStatus, score: 80 };
    const waistFit = g.waist
      ? fitStatusFromRange(measurements.waist, g.waist)
      : { status: 'perfect' as FitStatus, score: 80 };
    const hipsFit = g.hips
      ? fitStatusFromRange(measurements.hips, g.hips)
      : { status: 'perfect' as FitStatus, score: 80 };
    const shoulderFit = g.shoulders
      ? fitStatusFromRange(measurements.shoulders, g.shoulders)
      : { status: 'perfect' as FitStatus, score: 80 };

    // Weight by importance: chest > shoulders > waist > hips
    const total = chestFit.score * 0.35 + shoulderFit.score * 0.30 + waistFit.score * 0.20 + hipsFit.score * 0.15;
    scoreMap.set(size, total);

    detailMap.set(size, {
      chest:     { ...chestFit,     ...fitStatusMeta(chestFit.status) },
      waist:     { ...waistFit,     ...fitStatusMeta(waistFit.status) },
      hips:      { ...hipsFit,      ...fitStatusMeta(hipsFit.status) },
      shoulders: { ...shoulderFit,  ...fitStatusMeta(shoulderFit.status) },
    });
  }

  // Compute feedback adjustment for this brand+category
  const relevantFeedback = feedbackHistory.filter(f => f.brandId === brand.id && f.category === category);
  const feedbackAdj = relevantFeedback.reduce((sum, f) => sum + f.adjustment, 0);

  const preferenceAdjusted = applyPreference(scoreMap, preference);
  const feedbackAdjusted = applyFeedbackAdjustment(preferenceAdjusted, feedbackAdj);

  let bestSize: SizeKey = 'M';
  let bestScore = -Infinity;
  for (const [size, score] of Array.from(feedbackAdjusted.entries())) {
    if (score > bestScore) { bestScore = score; bestSize = size; }
  }

  const rawScore = scoreMap.get(bestSize) ?? 70;
  const confidence = Math.min(98, Math.max(58, Math.round(rawScore)));
  const details = detailMap.get(bestSize)!;
  const usualSize = guessUsualSize(measurements);

  // Generate reason
  let reason = '';
  const tendency = brand.categories[category]?.runsSizing;
  if (tendency === 'small') {
    reason = `${brand.name} runs smaller than average — their garments are cut narrower than standard sizing. Sizing up is common.`;
  } else if (tendency === 'large') {
    reason = `${brand.name} uses a generous cut — their garments offer more room. Your FitPrint aligns with a smaller size here.`;
  } else {
    reason = `${brand.name} follows standard sizing. Your FitPrint profile aligns closely with their size chart.`;
  }

  const tendencyLabel = tendency === 'small' ? 'Runs Small' : tendency === 'large' ? 'Runs Large' : 'True to Size';

  return {
    size: bestSize,
    confidence,
    chest: details.chest,
    waist: details.waist,
    hips: details.hips,
    shoulders: details.shoulders,
    yourUsualSize: usualSize,
    reason,
    brandNote: chart.fitNotes,
    sizeTendency: tendencyLabel,
  };
}

export function buildFeedbackRecord(
  brandId: string,
  category: ClothingCategory,
  recommendedSize: SizeKey,
  actualFit: FeedbackRecord['actualFit']
): FeedbackRecord {
  const adjustmentMap: Record<FeedbackRecord['actualFit'], number> = {
    'perfect':        0,
    'slightly-tight': 0.5,
    'slightly-loose': -0.5,
    'too-small':      1,
    'too-large':     -1,
  };
  return {
    brandId,
    category,
    recommendedSize,
    actualFit,
    date: new Date().toISOString(),
    adjustment: adjustmentMap[actualFit],
  };
}

export function computeFitAccuracy(history: FeedbackRecord[]): number {
  if (history.length === 0) return 92; // default for new profiles
  const perfectCount = history.filter(f => f.actualFit === 'perfect' || Math.abs(f.adjustment) <= 0.5).length;
  const base = Math.round((perfectCount / history.length) * 100);
  return Math.min(99, Math.max(60, base));
}

// Convenience: get all brands that support a category
export function brandsForCategory(category: ClothingCategory): BrandProfile[] {
  return allBrands.filter(b => b.categories[category]);
}
