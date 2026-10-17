'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogOut, User, ChevronDown, Zap } from 'lucide-react';
import { useFitPrint } from '@/lib/context';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Create', href: '/create' },
  { label: 'Compare', href: '/compare' },
  { label: 'Brands', href: '/brands' },
  { label: 'How It Works', href: '/#how-it-works' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useFitPrint();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setMobileOpen(false), [pathname]);

  function handleLogout() {
    logout();
    setUserMenuOpen(false);
    router.push('/auth');
  }

  if (pathname === '/auth') return null;

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-6 pt-4"
      >
        <div
          className="max-w-7xl mx-auto rounded-xl px-6 py-3.5 flex items-center justify-between transition-all duration-500"
          style={{
            background: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0, 0, 0, 0.25)',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.10)',
          }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-[#111111] flex items-center justify-center transition-transform group-hover:scale-105">
              <span className="text-[#FFFFFF] font-black text-sm">FP</span>
            </div>
            <span className="font-display font-black tracking-tight text-lg text-[#111111] uppercase">
              Fit<span className="text-[#111111]">Print</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href.split('#')[0]) && link.href !== '/#how-it-works');
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3.5 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 relative"
                  style={isActive
                    ? { color: '#111111', borderBottom: '2px solid #111111' }
                    : { color: '#5C5C5C' }
                  }
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: Auth controls */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              // Logged-in state with User Avatar & Dropdown
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(v => !v)}
                  className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl transition-all duration-200 bg-[#FFFFFF] border border-[#111111]/40 hover:border-[#111111] cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#111111] flex items-center justify-center text-xs font-black text-[#FFFFFF]">
                    {user.name[0]?.toUpperCase() || 'U'}
                  </div>
                  <span className="text-[#111111] text-xs font-bold font-mono">{user.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#111111]" />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-52 rounded-2xl p-2 z-50 bg-[#F4F2EE] border border-[#111111]/40 shadow-2xl space-y-1"
                    >
                      <div className="px-3 py-2 border-b border-[rgba(0,0,0,0.15)] mb-1">
                        <div className="text-[#111111] text-xs font-bold">{user.name}</div>
                        <div className="text-[#5C5C5C] text-[10px] font-mono">{user.email || user.fitprintId}</div>
                      </div>

                      <Link href="/profile" onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-xs font-semibold text-[#111111] hover:bg-[#FFFFFF] hover:text-[#111111] transition-all">
                        <User className="w-4 h-4 text-[#111111]" /> Profile
                      </Link>

                      <Link href="/dashboard" onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-xs font-semibold text-[#111111] hover:bg-[#FFFFFF] hover:text-[#111111] transition-all">
                        <Zap className="w-4 h-4 text-[#111111]" /> My FitPrint
                      </Link>

                      <button onClick={() => { setUserMenuOpen(false); alert('Settings menu opened.'); }}
                        className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-xs font-semibold text-[#111111] hover:bg-[#FFFFFF] hover:text-[#111111] transition-all cursor-pointer">
                        <ChevronDown className="w-4 h-4 text-[#111111]" /> Settings
                      </button>

                      <div className="pt-1 border-t border-[rgba(0,0,0,0.15)]">
                        <button onClick={handleLogout}
                          className="flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-xs font-bold text-red-400 hover:bg-red-950/40 transition-all cursor-pointer">
                          <span className="flex items-center gap-2">
                            <LogOut className="w-4 h-4 text-red-400" /> Sign Out
                          </span>
                          <span>→</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              // Logged-out state — redirect to /auth
              <Link
                href="/auth"
                className="btn-primary px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider"
              >
                Sign In / Sign Up
              </Link>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(v => !v)}
            className="lg:hidden p-2 rounded-lg text-black/70 hover:text-black transition-colors hover:bg-black/[0.04]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-4 top-20 z-40 rounded-2xl p-5 space-y-2"
            style={{
              background: 'rgba(255,255,255,0.97)',
              border: '1px solid rgba(0,0,0,0.18)',
              backdropFilter: 'blur(24px)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
            }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-xl text-sm font-medium text-black/70 hover:text-black hover:bg-black/[0.04] transition-all"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <hr className="border-black/10" />
            {user ? (
              <>
                <div className="px-4 py-2 text-black/40 text-xs font-mono">{user.fitprintId} · {user.name}</div>
                <button onClick={() => { handleLogout(); setMobileOpen(false); }}
                  className="w-full text-left px-4 py-3 rounded-xl text-sm text-red-500/80 hover:text-red-600 hover:bg-red-500/[0.06] transition-all flex items-center gap-2">
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="btn-primary block px-5 py-3 rounded-xl text-sm font-semibold text-center"
              >
                Get Started — Free
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for user menu */}
      {userMenuOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
      )}
    </>
  );
}
