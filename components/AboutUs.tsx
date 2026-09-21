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
          <span className="text-xs font-mono font-bold tracking-widest text-[#C49A6C] uppercase mb-4 block">THE PEOPLE BEHIND FITPRINT</span>
          <h2 className="font-display font-black text-5xl sm:text-6xl md:text-7xl text-[#F5EFE8] mb-6 tracking-tight">
            ONE PRODUCT. ONE MISSION. <br />
            <span className="gradient-text">ONE FITPRINT.</span>
          </h2>
          <p className="text-[#B9A99D] text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            We are a team of student innovators building technology to solve one of the most frustrating problems in online fashion: inconsistent sizing across brands.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto text-center">
          <div className="border-b border-[rgba(196,154,108,0.2)] pb-4 mb-10 font-mono text-xs font-bold text-[#B9A99D] uppercase tracking-widest">
            BUILT BY THE TEAM
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-[#2A201C] border border-[rgba(196,154,108,0.3)] shadow-2xl space-y-4"
            >
              <div className="font-mono text-2xl font-black text-[#C49A6C]">VK</div>
              <h3 className="font-display font-black text-3xl text-[#F5EFE8]">Vansh Kesar</h3>
              <div className="text-xs font-mono font-semibold text-[#C49A6C] uppercase">Product & Development</div>
              <p className="text-[#B9A99D] text-sm leading-relaxed">Building the product, shaping the experience, and driving the FitPrint vision.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="p-8 rounded-2xl bg-[#2A201C] border border-[rgba(196,154,108,0.3)] shadow-2xl space-y-4"
            >
              <div className="font-mono text-2xl font-black text-[#C49A6C]">AM</div>
              <h3 className="font-display font-black text-3xl text-[#F5EFE8]">Achyut Magotra</h3>
              <div className="text-xs font-mono font-semibold text-[#C49A6C] uppercase">Presentation & Visual Storytelling</div>
              <p className="text-[#B9A99D] text-sm leading-relaxed">Helping shape the story, presentation, and visual communication of FitPrint.</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
