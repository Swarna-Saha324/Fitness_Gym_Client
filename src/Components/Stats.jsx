"use client";

import React from "react";
import { motion } from "framer-motion";

const stats = [
  { value: "15k+", label: "Active Members" },
  { value: "50+", label: "Expert Trainers" },
  { value: "120+", label: "Weekly Classes" },
  { value: "99.4%", label: "Satisfaction Rate" },
];

export default function Stats() {
  return (
    <section className="py-20 bg-[#0F172A] border-t border-slate-900/50 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-slate-800 p-8 sm:p-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="text-center space-y-2"
            >
              <div className="text-3xl sm:text-5xl font-extrabold text-[#F59E0B] tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-medium text-slate-400 uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}