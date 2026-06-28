"use client";

import React, { useEffect, useState } from "react";
import ClassCard from "@/components/ClassCard";

export default function AllClassesPage() {
  const [classes, setClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Search & Tab Filter States tracking
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Yoga", "Cardio", "Weights", "Combat", "Dance"];

  useEffect(() => {
  setLoading(true);
  fetch("http://localhost:5000/api/public-classes", { cache: "no-cache" })
    .then((res) => res.json())
    .then((data) => {
      const classesArray = Array.isArray(data) ? data : [];
      
      setClasses(classesArray);
      setFilteredClasses(classesArray); 
      setLoading(false);
    })
    .catch((err) => {
      console.error("Error fetching available system classes:", err);
      setClasses([]);
      setFilteredClasses([]);
      setLoading(false);
    });
}, []);

  // 🎯 REAL-TIME SEARCH & FILTER ARRAYS LOGIC LOOP
  useEffect(() => {
    let result = classes;

    // 1. Search term string lookup filtering
    if (searchTerm.trim() !== "") {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 2. Category button selection filtering
    if (activeCategory !== "All") {
      result = result.filter(
        (item) => item.category?.toLowerCase() === activeCategory.toLowerCase()
      );
    }

    setFilteredClasses(result);
  }, [searchTerm, activeCategory, classes]);

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center bg-[#090D1A]">
        <div className="w-10 h-10 rounded-full border-4 border-slate-800 border-t-[#F59E0B] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090D1A] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Title Header Block */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Find Your <span className="text-[#F59E0B]">Perfect Class</span>
          </h1>
          <p className="text-xs text-slate-400 max-w-xl mx-auto">
            Browse our curated fitness classes led by expert trainers. Filter by category to discover the right fit for your goals.
          </p>
        </div>

        {/* 🔍 SEARCH AND FILTER INTERACTION ROW */}
        <div className="space-y-6 max-w-3xl mx-auto">
          {/* Input Text Box Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="🔍 Search fitness classes by name..."
              className="w-full bg-[#0F1424] border border-slate-800 focus:border-[#F59E0B] h-12 rounded-xl px-5 text-white text-sm outline-none shadow-inner placeholder-slate-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* 🏷️ FILTER BUTTON TABS PANELS */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-[#F59E0B] text-[#090D1A] border-[#F59E0B] shadow-md shadow-amber-500/10 scale-105"
                    : "bg-[#0F1424] text-slate-400 border-slate-800/80 hover:border-slate-700 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Class Counter text */}
        <div className="text-xs text-slate-500 font-semibold text-center sm:text-left">
          Showing {filteredClasses.length} of {classes.length} approved classes
        </div>

        {/* 🏋️ ALL CLASSES GRID CONTAINER LOOP MAPPING */}
        {filteredClasses.length === 0 ? (
          <div className="text-center py-20 bg-[#0F1424] border border-slate-800 rounded-3xl max-w-md mx-auto">
            <span className="text-3xl">📭</span>
            <p className="text-slate-400 text-sm mt-3 font-medium">No matching classes found matching parameters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClasses.map((item) => (
              <ClassCard key={item._id} fitnessClass={item} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}