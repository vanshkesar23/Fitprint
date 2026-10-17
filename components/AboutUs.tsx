'use client';

import { motion } from 'framer-motion';

export default function AboutUs() {
  return (
    <section id="about" className="py-28 relative bg-[#FFFFFF] text-[#111111] border-t border-[rgba(0,0,0,0.15)]">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-xs font-mono font-bold tracking-widest text-[#111111] uppercase mb-4 block">
            THE PEOPLE BEHIND FITPRINT
          </span>
          <h2 className="font-display font-black text-5xl sm:text-6xl text-[#111111] mb-5 tracking-tight">
            ONE PRODUCT. ONE MISSION. <br />
            <span className="gradient-text">ONE FITPRINT.</span>
          </h2>
          <p className="text-[#5C5C5C] text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            A student-built fashion technology product focused on making online sizing simpler and more personal.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-[#FFFFFF] border border-[rgba(0,0,0,0.28)] shadow-2xl"
          >
            <div className="font-mono text-2xl font-black text-[#111111] mb-5">VK</div>
            <h3 className="font-display font-black text-3xl text-[#111111]">Vansh Kesar</h3>
            <div className="text-xs font-mono font-semibold text-[#111111] uppercase mt-2 mb-4">Product & Development</div>
            <p className="text-[#5C5C5C] text-sm leading-relaxed">
              Building the product, shaping the experience, and driving the FitPrint vision.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="p-8 rounded-2xl bg-[#FFFFFF] border border-[rgba(0,0,0,0.28)] shadow-2xl"
          >
            <div className="font-mono text-2xl font-black text-[#111111] mb-5">AM</div>
            <h3 className="font-display font-black text-3xl text-[#111111]">Achyut Magotra</h3>
            <div className="text-xs font-mono font-semibold text-[#111111] uppercase mt-2 mb-4">Presentation & Visual Storytelling</div>
            <p className="text-[#5C5C5C] text-sm leading-relaxed">
              Helping shape the story, presentation, and visual communication of FitPrint.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
