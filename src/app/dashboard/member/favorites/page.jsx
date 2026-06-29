"use client";

import React, { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function FavoriteClassesPage() {
  const { data: session, isPending } = authClient.useSession();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    if (session?.user?.email) {
      setLoading(true);
      fetch(`http://localhost:5000/api/favorites?email=${session.user.email}`, {
        cache: "no-cache",
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch favorites");
          return res.json();
        })
        .then((data) => {
          setFavorites(Array.isArray(data) ? data : []);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error loading favorite classes:", err);
          setLoading(false);
        });
    } else if (!isPending) {
      setLoading(false);
    }
  }, [session, isPending]);

  
  const handleRemove = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/favorites/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.deletedCount > 0) {
       
        setFavorites(favorites.filter((item) => item._id !== id));
        toast.success("Removed from favorites directory! 📋");
      }
    } catch (err) {
      console.error("Delete handler routine error:", err);
      toast.error("Failed to drop bookmark item.");
    }
  };

  if (isPending || loading) {
    return (
      <div className="flex justify-center items-center min-h-[250px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
      </div>
    );
  }
   // ২. লোডিং শেষ হওয়ার পর চেক করুন ডাটা আছে কি নেই
  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-slate-400 font-medium">No favorite classes found yet.</p>
        <button 
          onClick={() => window.location.href = '/all-classes'} 
          className="mt-4 text-amber-500 hover:underline"
        >
          Explore Classes
        </button>
      </div>
    );
  }

  // ৩. ডাটা থাকলে তালিকা দেখান
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {favorites.map((item) => (
        <div key={item._id} className="bg-[#0F1424] border border-slate-800 p-5 rounded-2xl flex items-center justify-between gap-4">
          <div className="truncate w-full">
            <span className="text-[10px] font-bold uppercase text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
              {item.level || item.classLevel || "General Workout"}
            </span>
            <h3 className="text-sm font-bold text-white mt-2 truncate">
              {item.className || item.name || "Fitness Class"}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5 truncate">
              Lead Mentor: <span className="text-slate-300 font-medium">{item.trainerName || item.trainer || "Expert Trainer"}</span>
            </p>
            {item.price && (
              <p className="text-[11px] text-amber-500/80 font-semibold mt-1">Price: ${item.price}</p>
            )}
          </div>
          <button
            onClick={() => handleRemove(item._id)}
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
  );
}