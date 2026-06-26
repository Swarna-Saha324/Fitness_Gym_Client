"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@heroui/react";

export default function UniqueHero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0F172A] px-4 sm:px-6 lg:px-8">
      
      {/* 1. background ambient glowing grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b10_1px,transparent_1px),linear-gradient(to_bottom,#1e293b10_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.25, 0.15],
          x: [0, 20, 0],
          y: [0, -20, 0] 
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-[#F59E0B] to-amber-600 rounded-full blur-[140px] pointer-events-none"
      />

      {/* 2. Floating interactive UI elements (Recruiter Hook) */}
      {/* Left Widget: Performance Tracker Milestones */}
      <motion.div 
        initial={{ opacity: 0, x: -60, rotate: -10 }}
        animate={{ opacity: 1, x: 0, rotate: -4 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        whileHover={{ scale: 1.05, rotate: 0, zIndex: 30 }}
        className="absolute left-6 bottom-16 lg:left-24 lg:top-1/3 hidden md:block bg-slate-900/80 backdrop-blur-md p-4 rounded-xl border border-slate-800 shadow-2xl w-60 cursor-pointer select-none"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-400">DAILY ACTIVITY</span>
          <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full font-bold">LIVE</span>
        </div>
        <p className="text-2xl font-black text-white">8,432 <span className="text-xs font-normal text-slate-400">Kcal</span></p>
        <div className="w-full bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "78%" }}
            transition={{ duration: 1.5, delay: 1 }}
            className="bg-[#F59E0B] h-full rounded-full"
          />
        </div>
        <p className="text-[11px] text-slate-500 mt-2">78% of your weekly target reached</p>
      </motion.div>

      {/* Right Widget: Live Trainer Booking Indicator */}
      <motion.div 
        initial={{ opacity: 0, x: 60, rotate: 10 }}
        animate={{ opacity: 1, x: 0, rotate: 4 }}
        transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
        whileHover={{ scale: 1.05, rotate: 0, zIndex: 30 }}
        className="absolute right-6 top-16 lg:right-24 lg:bottom-1/3 hidden md:block bg-slate-900/80 backdrop-blur-md p-4 rounded-xl border border-slate-800 shadow-2xl w-56 cursor-pointer select-none"
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full" />
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-lg font-bold border border-slate-700">🔥</div>
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Next HIIT Class</h4>
            <p className="text-xs text-slate-400">Starts in 14 mins</p>
          </div>
        </div>
        <div className="mt-4 flex gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-bounce" />
          <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-bounce [animation-delay:0.2s]" />
          <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-bounce [animation-delay:0.4s]" />
          <span className="text-[11px] text-slate-400 font-medium ml-1">12 Members Joined</span>
        </div>
      </motion.div>


      {/* 3. Central Content Area */}
      <div className="relative z-10 max-w-4xl text-center space-y-8">
        
        {/* Dynamic Interactive Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-slate-900 to-slate-950 text-slate-300 text-xs font-semibold rounded-full border border-slate-800 shadow-inner"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F59E0B] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F59E0B]"></span>
          </span>
          THE FUTURE OF PERFORMANCE MANAGEMENT
        </motion.div>

        {/* Cinematic Title Layer */}
        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="text-5xl sm:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[0.95]"
          >
            WORK HARDER.<br />
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] via-amber-400 to-amber-200">
              EVOLVE FASTER.
            
            </span>
          </motion.h1>
        </div>

        {/* Clean, Decent Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-xl mx-auto text-sm sm:text-base text-slate-400 font-medium leading-relaxed"
        >
          ApexFit converges elite coaching, robust booking infrastructure, and analytical community forums into a centralized premium fitness workspace.
        </motion.p>

        {/* CTA Actions Wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <Button
            as={Link}
            href="/classes"
            size="lg"
            className="w-full sm:w-auto bg-[#F59E0B] text-[#0F172A] font-bold px-8 py-6 rounded-md shadow-xl shadow-amber-500/10 hover:shadow-amber-500/25 hover:bg-amber-600 group transition-all"
          >
            Explore Classes
            <span className="inline-block transition-transform group-hover:translate-x-1 ml-1">→</span>
          </Button>

          <Button
            as={Link}
            href="/forum"
            size="lg"
            variant="bordered"
            className="w-full sm:w-auto border-slate-800 text-white hover:bg-slate-900 font-medium px-8 py-6 rounded-md transition-all"
          >
            Join Community
          </Button>
        </motion.div>
      </div>

    </section>
  );
}