'use client';

import { motion } from 'framer-motion';

export default function AboutUs() {
  return (
    <section id="about" className="py-32 relative bg-[#120E0C] text-[#F5EFE8] border-t border-[rgba(196,154,108,0.15)]">
      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <span className="text-xs font-mono font-bold tracking-widest text-[#C49A6C] uppercase mb-4 block">
            THE PEOPLE BEHIND FITPRINT
          </span>
          <h2 className="font-display font-black text-5xl sm:text-6xl md:text-7xl text-[#F5EFE8] mb-6 tracking-tight">
            SIX MINDS. ONE MISSION. <br />
            <span className="gradient-text">ONE FITPRINT.</span>
          </h2>
          <p className="text-[#B9A99D] text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            We are a team of student innovators building technology to solve one of the most frustrating problems in online fashion: inconsistent sizing across brands.
          </p>
        </motion.div>

        {/* ── 1. CORE BUILDERS (Featured Dark Espresso Cards) ────────────────── */}
        <div className="mb-24">
          <div className="border-b border-[rgba(196,154,108,0.2)] pb-4 mb-12 flex items-center justify-between font-mono text-xs font-bold text-[#C49A6C] uppercase tracking-widest">
            <span>01 / CORE BUILDERS</span>
            <span>Turning the idea into a working product</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Vansh Kesar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-[#2A201C] border border-[rgba(196,154,108,0.3)] shadow-2xl space-y-4 hover:border-[#C49A6C] transition-all"
            >
              <div className="flex items-center justify-between border-b border-[rgba(196,154,108,0.15)] pb-4">
                <span className="font-mono text-2xl font-black text-[#C49A6C]">VK</span>
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase bg-[#C49A6C] text-[#120E0C] px-3 py-1 rounded-full">
                  LEAD DEVELOPER & PRODUCT LEAD
                </span>
              </div>
              <h3 className="font-display font-black text-3xl text-[#F5EFE8]">Vansh Kesar</h3>
              <p className="text-[#B9A99D] text-sm leading-relaxed">
                "Leading product development, technical implementation, and the overall vision behind FitPrint."
              </p>
            </motion.div>

            {/* Keshav Singhal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-2xl bg-[#2A201C] border border-[rgba(196,154,108,0.3)] shadow-2xl space-y-4 hover:border-[#C49A6C] transition-all"
            >
              <div className="flex items-center justify-between border-b border-[rgba(196,154,108,0.15)] pb-4">
                <span className="font-mono text-2xl font-black text-[#66B8C9]">KS</span>
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase bg-[#66B8C9] text-[#120E0C] px-3 py-1 rounded-full">
                  LEAD DEVELOPER
                </span>
              </div>
              <h3 className="font-display font-black text-3xl text-[#F5EFE8]">Keshav Singhal</h3>
              <p className="text-[#B9A99D] text-sm leading-relaxed">
                "Leading the technical development and helping build the core FitPrint experience."
              </p>
            </motion.div>
          </div>
        </div>

        {/* ── 2. RESEARCH & VALIDATION ──────────────────────────────────── */}
        <div className="mb-24">
          <div className="border-b border-[rgba(196,154,108,0.2)] pb-4 mb-12 flex items-center justify-between font-mono text-xs font-bold text-[#B9A99D] uppercase tracking-widest">
            <span>02 / RESEARCH & VALIDATION</span>
            <span>Understanding the problem before building the solution</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { initials: 'DK', name: 'Devanshi Kashyap', role: 'Research & Problem Validation', desc: '"Researching real user problems and validating the FitPrint solution."', color: '#7D6B9E' },
              { initials: 'SS', name: 'Simran Suman', role: 'Research & Problem Validation', desc: '"Analyzing user needs, market problems and validating product assumptions."', color: '#D69A4D' },
              { initials: 'JC', name: 'Jhanvi Chauhan', role: 'Research & Problem Validation', desc: '"Conducting research and helping validate the real-world problem FitPrint solves."', color: '#4A90A4' },
            ].map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-6 rounded-2xl bg-[#1E1714] border border-[rgba(196,154,108,0.18)] hover:border-[#C49A6C] transition-all space-y-3"
              >
                <div className="font-mono text-lg font-bold" style={{ color: m.color }}>{m.initials}</div>
                <h4 className="font-display font-bold text-xl text-[#F5EFE8]">{m.name}</h4>
                <div className="text-xs font-mono font-semibold uppercase" style={{ color: m.color }}>{m.role}</div>
                <p className="text-[#B9A99D] text-xs leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── 3. PRESENTATION & STORYTELLING ────────────────────────────── */}
        <div className="max-w-xl mx-auto text-center">
          <div className="border-b border-[rgba(196,154,108,0.2)] pb-4 mb-8 font-mono text-xs font-bold text-[#B9A99D] uppercase tracking-widest">
            03 / PRESENTATION & STORYTELLING
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-[#2A201C] border border-[rgba(196,154,108,0.25)] space-y-3 inline-block w-full"
          >
            <div className="font-mono text-xl font-bold text-[#C49A6C]">AM</div>
            <h4 className="font-display font-black text-2xl text-[#F5EFE8]">Achyut Magotra</h4>
            <div className="text-xs font-mono font-semibold text-[#C49A6C] uppercase">Presentation & Visual Storytelling</div>
            <p className="text-[#B9A99D] text-xs leading-relaxed max-w-md mx-auto">
              "Responsible for shaping and presenting the FitPrint story through the project presentation."
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
