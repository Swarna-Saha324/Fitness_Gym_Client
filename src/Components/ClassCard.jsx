"use client";

import React from "react";
import Link from "next/link";

export default function ClassCard({ fitnessClass }) {
  const {
    _id,
    name,
    image,
    category,
    difficulty,
    duration,
    trainerName,
    price,
    description,
    attendees = []
  } = fitnessClass;
  console.log("Card Data - Attendees:", fitnessClass.attendees);

  return (
    <div className="bg-[#0F1424] border border-slate-800/80 rounded-2xl overflow-hidden hover:border-slate-700 transition-all duration-300 flex flex-col justify-between group">
      
      {/* Image Block Layer with Dynamic Badges */}
      <div className="relative w-full h-48 bg-slate-900 overflow-hidden">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          src={image || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48"}
          alt={name}
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1534438327276-14e5300c3a48";
          }}
        />
        {/* Category Badge overlay */}
        <span className="absolute top-3 left-3 text-[10px] font-bold uppercase bg-slate-950/80 backdrop-blur-sm text-[#F59E0B] px-2 py-1 rounded-md border border-slate-800">
          {category || "Gym"}
        </span>
        {/* Price Tag overlay */}
        <span className="absolute top-3 right-3 text-xs font-bold bg-amber-500 text-black px-2 py-0.5 rounded font-mono">
          ${price}/Session
        </span>
      </div>

      {/* Main Structural Info Layer */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          
          <h3 className="text-lg font-bold text-white tracking-tight leading-snug line-clamp-1 group-hover:text-[#F59E0B] transition-colors">
            {name}
          </h3>
          
          <p className="text-xs text-slate-400 font-medium">
            by <span className="text-slate-300 font-semibold">{trainerName || "Expert Trainer"}</span>
          </p>

          {/* Difficulty & Booking Counts Metadata */}
          <div className="flex items-center gap-3 pt-1">
            <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
              difficulty === "Beginner" ? "bg-emerald-500/10 text-emerald-400" :
              difficulty === "Intermediate" ? "bg-blue-500/10 text-blue-400" : "bg-rose-500/10 text-rose-400"
            }`}>
              {difficulty || "General"}
            </span>
            <span className="text-slate-500 text-xs">•</span>
            <span className="text-slate-400 text-xs font-mono">
              ⏱️ {duration} min
            </span>
            <span className="text-slate-500 text-xs">•</span>
            <span className="text-slate-400 text-xs">
             
              👥 {attendees.length || 0} Booked
              
            </span>
          </div>

          <p className="text-xs text-slate-400/90 leading-relaxed line-clamp-2 pt-1">
            {description}
          </p>
        </div>

        {/* View Details Target Link Trigger Box */}
        <div className="pt-2">
          <Link
            href={`/classes/${_id}`}
            className="flex w-full h-10 items-center justify-center bg-slate-900 border border-slate-800 hover:border-[#F59E0B] text-slate-300 hover:text-[#F59E0B] text-xs font-bold rounded-xl transition-all shadow-sm"
          >
            View Details
          </Link>
        </div>
      </div>

    </div>
  );
}