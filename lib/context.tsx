'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { UserMeasurements, FeedbackRecord, FitPreference, computeFitAccuracy } from './fitEngine';
import { ClothingCategory, SizeKey } from './brandSizeCharts';

// ─── TYPES ───────────────────────────────────────────────────────────────────

export interface FitPrintUser {
  fitprintId: string;
  name: string;
  email?: string;
  avatar?: string;
  authMethod: 'google' | 'email' | 'guest';
  emailVerified: boolean;
  createdAt: string;
}

export interface FitProfile {
  measurements: UserMeasurements;
  fitPreference: FitPreference;
  bodyProfile: string;
  createdVia: 'manual' | 'ai-analysis';
  aiConfidence?: number;
}

export interface RecommendationHistory {
  brandId: string;
  brandName: string;
  category: ClothingCategory;
  recommendedSize: SizeKey;
  confidence: number;
  date: string;
}

export interface FitPrintState {
  user: FitPrintUser | null;
  profile: FitProfile | null;
  feedbackHistory: FeedbackRecord[];
  recommendationHistory: RecommendationHistory[];
  isLoaded: boolean;
  toastMessage: string | null;
}

interface FitPrintContextType extends FitPrintState {
  // Auth
  loginWithEmail: (email: string, name?: string) => Promise<boolean>;
  signupWithEmail: (name: string, email: string) => Promise<boolean>;
  verifyEmail: () => void;
  loginWithGoogle: () => Promise<boolean>;
  loginWithGoogleUser: (gUser: { name: string; email: string; avatar?: string; emailVerified?: boolean }) => void;
  loginAsGuest: (name?: string) => void;
  logout: () => void;
  showToast: (msg: string) => void;
  clearToast: () => void;

  // Profile
  saveProfile: (profile: FitProfile) => void;
  clearProfile: () => void;
  setFitProfile: (data: any) => void;

  // Feedback & History
  addFeedback: (feedback: FeedbackRecord) => void;
  addRecommendation: (rec: RecommendationHistory) => void;

  // Computed
  fitAccuracy: number;
}

// ─── STORAGE HELPERS ─────────────────────────────────────────────────────────

const STORAGE_KEY = 'fitprint_state_v4';

function loadFromStorage(): Partial<FitPrintState> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function saveToStorage(state: Partial<FitPrintState>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

function generateFitprintId(): string {
  return 'FP-' + Math.floor(1000 + Math.random() * 9000);
}

function deriveBodyProfile(measurements: UserMeasurements, preference: FitPreference): string {
  const { chest, waist } = measurements;
  const ratio = chest / waist;
  if (ratio > 1.18) return 'Athletic';
  if (ratio > 1.12) return 'Balanced Athletic';
  if (ratio > 1.06) return 'Regular';
  return 'Relaxed';
}

// ─── CONTEXT ─────────────────────────────────────────────────────────────────

const FitPrintContext = createContext<FitPrintContextType>({
  user: null,
  profile: null,
  feedbackHistory: [],
  recommendationHistory: [],
  isLoaded: false,
  toastMessage: null,
  fitAccuracy: 94,
  loginWithEmail: async () => false,
  signupWithEmail: async () => false,
  verifyEmail: () => {},
  loginWithGoogle: async () => false,
  loginWithGoogleUser: () => {},
  loginAsGuest: () => {},
  logout: () => {},
  showToast: () => {},
  clearToast: () => {},
  saveProfile: () => {},
  clearProfile: () => {},
  setFitProfile: () => {},
  addFeedback: () => {},
  addRecommendation: () => {},
});

export function FitPrintProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<FitPrintUser | null>(null);
  const [profile, setProfile] = useState<FitProfile | null>(null);
  const [feedbackHistory, setFeedbackHistory] = useState<FeedbackRecord[]>([]);
  const [recommendationHistory, setRecommendationHistory] = useState<RecommendationHistory[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load state on mount
  useEffect(() => {
    const stored = loadFromStorage();
    if (stored.user) setUser(stored.user);
    if (stored.profile) setProfile(stored.profile);
    if (stored.feedbackHistory) setFeedbackHistory(stored.feedbackHistory);
    if (stored.recommendationHistory) setRecommendationHistory(stored.recommendationHistory);
    setIsLoaded(true);
  }, []);

  // Persist state changes
  useEffect(() => {
    if (!isLoaded) return;
    saveToStorage({ user, profile, feedbackHistory, recommendationHistory });
  }, [user, profile, feedbackHistory, recommendationHistory, isLoaded]);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  }, []);

  const clearToast = useCallback(() => setToastMessage(null), []);

  const signupWithEmail = useCallback(async (name: string, email: string): Promise<boolean> => {
    const newUser: FitPrintUser = {
      fitprintId: generateFitprintId(),
      name: name.trim() || 'User',
      email: email.trim().toLowerCase(),
      authMethod: 'email',
      emailVerified: false, // Must verify OTP before accessing protected routes
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
    return true;
  }, []);

  const verifyEmail = useCallback(() => {
    setUser(prev => prev ? { ...prev, emailVerified: true } : null);
  }, []);

  const loginWithEmail = useCallback(async (email: string, name?: string): Promise<boolean> => {
    const derivedName = name || (email.split('@')[0].replace(/[^a-zA-Z]/g, ' ')) || 'User';
    const formattedName = derivedName.charAt(0).toUpperCase() + derivedName.slice(1);
    const newUser: FitPrintUser = {
      fitprintId: generateFitprintId(),
      name: formattedName,
      email: email.trim().toLowerCase(),
      authMethod: 'email',
      emailVerified: true, // Login assumes prior verification
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
    return true;
  }, []);

  const loginWithGoogleUser = useCallback((gUser: { name: string; email: string; avatar?: string; emailVerified?: boolean }) => {
    const newUser: FitPrintUser = {
      fitprintId: generateFitprintId(),
      name: gUser.name,
      email: gUser.email,
      avatar: gUser.avatar,
      authMethod: 'google',
      emailVerified: gUser.emailVerified ?? true,
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
  }, []);

  const loginWithGoogle = useCallback(async (): Promise<boolean> => {
    loginWithGoogleUser({
      name: 'Google Member',
      email: 'member@gmail.com',
      emailVerified: true,
    });
    return true;
  }, [loginWithGoogleUser]);

  const loginAsGuest = useCallback((name = 'Guest User') => {
    const newUser: FitPrintUser = {
      fitprintId: generateFitprintId(),
      name,
      authMethod: 'guest',
      emailVerified: true,
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setProfile(null);
    setFeedbackHistory([]);
    setRecommendationHistory([]);
    localStorage.removeItem(STORAGE_KEY);
    showToast('Signed out successfully.');
  }, [showToast]);

  const saveProfile = useCallback((newProfile: FitProfile) => {
    const enhanced: FitProfile = {
      ...newProfile,
      bodyProfile: deriveBodyProfile(newProfile.measurements, newProfile.fitPreference),
    };
    setProfile(enhanced);
  }, []);

  const setFitProfile = useCallback((data: any) => {
    const defaultMeasurements: UserMeasurements = {
      chest: data.measurements?.chest || 98,
      waist: data.measurements?.waist || 82,
      hips: data.measurements?.hips || 98,
      shoulders: data.measurements?.shoulders || 46,
      sleeveLength: data.measurements?.sleeveLength || 62,
      inseam: data.measurements?.inseam || 80,
      thigh: data.measurements?.thigh || 56,
      neck: data.measurements?.neck || 39,
    };
    saveProfile({
      measurements: defaultMeasurements,
      fitPreference: (data.fitPreference || 'regular') as FitPreference,
      bodyProfile: data.bodyShape || 'Regular',
      createdVia: 'manual',
    });
  }, [saveProfile]);

  const clearProfile = useCallback(() => setProfile(null), []);

  const addFeedback = useCallback((feedback: FeedbackRecord) => {
    setFeedbackHistory(prev => [...prev, feedback]);
  }, []);

  const addRecommendation = useCallback((rec: RecommendationHistory) => {
    setRecommendationHistory(prev => [rec, ...prev.slice(0, 19)]);
  }, []);

  const fitAccuracy = computeFitAccuracy(feedbackHistory);

  return (
    <FitPrintContext.Provider value={{
      user, profile, feedbackHistory, recommendationHistory, isLoaded, toastMessage,
      fitAccuracy,
      loginWithEmail, signupWithEmail, verifyEmail, loginWithGoogle, loginWithGoogleUser, loginAsGuest, logout,
      showToast, clearToast,
      saveProfile, clearProfile, setFitProfile,
      addFeedback, addRecommendation,
    }}>
      {children}
    </FitPrintContext.Provider>
  );
}

export function useFitPrint() {
  return useContext(FitPrintContext);
}

export function useUserProfile() {
  const ctx = useFitPrint();
  const userProfile = ctx.user && ctx.profile ? {
    id: 'user-001',
    name: ctx.user.name,
    gender: 'male' as const,
    measurements: ctx.profile.measurements,
    fitPreference: ctx.profile.fitPreference,
    fitprintId: ctx.user.fitprintId,
    bodyProfile: ctx.profile.bodyProfile,
    createdAt: ctx.user.createdAt,
    feedbackHistory: ctx.feedbackHistory,
  } : null;
  return { userProfile, ...ctx };
}
