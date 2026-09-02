'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap, LogOut, User, ChevronDown } from 'lucide-react';
import { useFitPrint } from '@/lib/context';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Create FitPrint', href: '/create' },
  { label: 'Compare Brands', href: '/compare' },
  { label: 'Brand Library', href: '/brands' },
  { label: 'About Us', href: '/#about' },
  { label: 'Try Demo', href: '/demo' },
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
            background: 'rgba(30, 23, 20, 0.92)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(196, 154, 108, 0.25)',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.6)',
          }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C49A6C] to-[#9C735D] flex items-center justify-center shadow-glow transition-transform group-hover:scale-105">
              <Zap className="w-4 h-4 text-[#120E0C]" />
            </div>
            <span className="font-display font-black tracking-tight text-lg text-[#F5EFE8] uppercase">
              Fit<span className="text-[#C49A6C]">Print</span>
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
                    ? { color: '#C49A6C', borderBottom: '2px solid #C49A6C' }
                    : { color: '#B9A99D' }
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
                  className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl transition-all duration-200 bg-[#2A201C] border border-[#C49A6C]/40 hover:border-[#C49A6C] cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#C49A6C] flex items-center justify-center text-xs font-black text-[#120E0C]">
                    {user.name[0]?.toUpperCase() || 'U'}
                  </div>
                  <span className="text-[#F5EFE8] text-xs font-bold font-mono">{user.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#C49A6C]" />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-52 rounded-2xl p-2 z-50 bg-[#1E1714] border border-[#C49A6C]/40 shadow-2xl space-y-1"
                    >
                      <div className="px-3 py-2 border-b border-[rgba(196,154,108,0.15)] mb-1">
                        <div className="text-[#F5EFE8] text-xs font-bold">{user.name}</div>
                        <div className="text-[#B9A99D] text-[10px] font-mono">{user.email || user.fitprintId}</div>
                      </div>

                      <Link href="/profile" onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-xs font-semibold text-[#F5EFE8] hover:bg-[#2A201C] hover:text-[#C49A6C] transition-all">
                        <User className="w-4 h-4 text-[#C49A6C]" /> Profile
                      </Link>

                      <Link href="/dashboard" onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-xs font-semibold text-[#F5EFE8] hover:bg-[#2A201C] hover:text-[#C49A6C] transition-all">
                        <Zap className="w-4 h-4 text-[#C49A6C]" /> My FitPrint
                      </Link>

                      <button onClick={() => { setUserMenuOpen(false); alert('Settings menu opened.'); }}
                        className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-xs font-semibold text-[#F5EFE8] hover:bg-[#2A201C] hover:text-[#C49A6C] transition-all cursor-pointer">
                        <ChevronDown className="w-4 h-4 text-[#C49A6C]" /> Settings
                      </button>

                      <div className="pt-1 border-t border-[rgba(196,154,108,0.15)]">
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
            className="lg:hidden p-2 rounded-lg text-white/60 hover:text-white transition-colors hover:bg-white/[0.06]"
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
              background: 'rgba(5,5,16,0.97)',
              border: '1px solid rgba(108,99,255,0.25)',
              backdropFilter: 'blur(24px)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
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
                  className="block px-4 py-3 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/[0.06] transition-all"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <hr className="border-white/10" />
            {user ? (
              <>
                <div className="px-4 py-2 text-white/40 text-xs font-mono">{user.fitprintId} · {user.name}</div>
                <button onClick={() => { handleLogout(); setMobileOpen(false); }}
                  className="w-full text-left px-4 py-3 rounded-xl text-sm text-red-400/70 hover:text-red-400 hover:bg-red-500/[0.06] transition-all flex items-center gap-2">
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
