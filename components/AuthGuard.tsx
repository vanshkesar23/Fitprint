'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useFitPrint } from '@/lib/context';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, CheckCircle2, Lock } from 'lucide-react';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoaded, toastMessage, clearToast } = useFitPrint();
  const pathname = usePathname();
  const router = useRouter();

  const isUserFullyVerified = user && user.emailVerified;

  useEffect(() => {
    if (!isLoaded) return;

    // Strict Access Control:
    // If not authenticated or email not verified -> Redirect to /auth
    if (!isUserFullyVerified && pathname !== '/auth') {
      router.replace('/auth');
    } else if (isUserFullyVerified && pathname === '/auth') {
      router.replace('/');
    }
  }, [isUserFullyVerified, isLoaded, pathname, router]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#120E0C] flex items-center justify-center text-[#F5EFE8]">
        <div className="flex flex-col items-center gap-4">
          <div className="spinner w-8 h-8" />
          <span className="font-mono text-xs text-[#B9A99D] uppercase tracking-widest">
            Initializing FitPrint Security...
          </span>
        </div>
      </div>
    );
  }

  // If unauthenticated or unverified and trying to access protected route -> Show Security Lockout
  if (!isUserFullyVerified && pathname !== '/auth') {
    return (
      <div className="min-h-screen bg-[#120E0C] flex items-center justify-center text-[#F5EFE8] px-6 text-center">
        <div className="flex flex-col items-center gap-4 max-w-md p-8 rounded-3xl bg-[#1E1714] border border-[#C49A6C]/40 shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-[#C49A6C]/20 border border-[#C49A6C] flex items-center justify-center">
            <Lock className="w-7 h-7 text-[#C49A6C] animate-pulse" />
          </div>
          <h2 className="font-display font-black text-2xl text-[#F5EFE8] uppercase">
            STRICT SECURITY ACCESS GUARD
          </h2>
          <p className="text-xs text-[#B9A99D] leading-relaxed">
            Authentication & Verified Email required to access FitPrint. Redirecting to security login...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Toast Notification Banner */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -40, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -40, x: '-50%' }}
            className="fixed top-6 left-1/2 z-[10000] px-5 py-3 rounded-xl bg-[#2A201C] border border-[#C49A6C] shadow-2xl flex items-center gap-3 text-[#F5EFE8] text-xs font-mono font-bold tracking-wider uppercase pointer-events-auto"
          >
            <CheckCircle2 className="w-4 h-4 text-[#C49A6C]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {children}
    </>
  );
}
