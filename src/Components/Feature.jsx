"use client";

import React from "react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Elite Training Staff",
    desc: "Learn from certified industry professionals dedicated to building structured, injury-free pathways for your goals.",
    icon: "💪",
  },
  {
    title: "Flexible Class Schedules",
    desc: "From early morning yoga to late-night HIIT sessions, book anytime that fits into your hectic schedule seamlessly.",
    icon: "📅",
  },
  {
    title: "Premium Global Analytics",
    desc: "Track your strength progression, body composition milestones, and class attendance in your customized dashboard.",
    icon: "⚡",
  },
];

// Parent staggered container configuration
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Features() {
  return (
    <section className="py-24 bg-[#0F172A] px-4 sm:px-6 lg:px-8 border-t border-slate-900">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-[#F59E0B]">Why ApexFit</h2>
          <p className="text-3xl sm:text-4xl font-bold text-white">Engineered for Transformation</p>
        </div>

        {/* Motion Grid Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((feat, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -6, borderColor: "#F59E0B" }}
              className="bg-slate-900/40 p-8 rounded-xl border border-slate-800/80 hover:bg-slate-900 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center text-2xl mb-6 border border-slate-700">
                {feat.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feat.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}