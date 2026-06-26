"use client";

import React, { useState } from "react";

export default function FavoriteClassesPage() {
  const [favorites, setFavorites] = useState([
    { id: 101, name: "Power Yoga Flow", trainer: "Maliha Rahman", level: "Beginner Friendly" },
    { id: 102, name: "Muscle Build & Weights", trainer: "Hrithik Roshan", level: "Advanced Hardcore" },
  ]);

  const handleRemove = (id) => {
    setFavorites(favorites.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-bold text-white tracking-tight">Favorite Classes</h2>
        <p className="text-xs text-slate-400 mt-0.5">Your shortlisted items stack. Click remove to drop any items from dashboard tracker.</p>
      </div>

      {favorites.length === 0 ? (
        <div className="bg-[#0F1424] border border-dashed border-slate-800 text-center py-12 rounded-2xl text-xs text-slate-500">
          Your bookmark directory layer is currently empty.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {favorites.map((item) => (
            <div key={item.id} className="bg-[#0F1424] border border-slate-800 p-5 rounded-2xl flex items-center justify-between gap-4">
              <div className="truncate">
                <span className="text-[10px] font-bold uppercase text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                  {item.level}
                </span>
                <h3 className="text-sm font-bold text-white mt-2 truncate">{item.name}</h3>
                <p className="text-xs text-slate-400 mt-0.5">Lead Mentor: {item.trainer}</p>
              </div>
              
              <button
                onClick={() => handleRemove(item.id)}
                className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white border border-rose-500/10 transition-all shrink-0"
                title="Remove from favorites"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-16v4M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}