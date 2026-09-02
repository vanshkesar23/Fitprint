import type { Metadata } from 'next';
import './globals.css';
import { FitPrintProvider } from '@/lib/context';
import Navbar from '@/components/Navbar';
import ParticleField from '@/components/ParticleField';
import AuthGuard from '@/components/AuthGuard';

export const metadata: Metadata = {
  title: 'FitPrint — AI-Powered Clothing Fit Intelligence',
  description: 'FitPrint creates your personal Fit Identity and helps you find the right clothing size across different brands. One profile, the right fit everywhere.',
  keywords: 'clothing size, fit guide, AI fashion, size recommendation, FitPrint',
  openGraph: {
    title: 'FitPrint — One Profile. The Right Fit Everywhere.',
    description: 'AI-powered clothing size intelligence that understands YOU, not just your measurements.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        <FitPrintProvider>
          <AuthGuard>
            {/* Static dark background */}
            <div className="animated-bg" />

            {/* Live particle field — runs behind everything */}
            <ParticleField />

            <Navbar />
            <main className="relative z-10">{children}</main>
          </AuthGuard>
        </FitPrintProvider>
      </body>
    </html>
  );
}
