"use client";

import React, { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function MyClassesPage() {
  const { data: session, isPending } = authClient.useSession();
  const [activeStudents, setActiveStudents] = useState(null); 
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  // // 🔄 ডাটাবেজ থেকে এই ট্রেইনারের ক্লাসগুলো ফেচ করা
  useEffect(() => {
    if (session?.user?.email) {
      setLoading(true);
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/trainer/classes?email=${session.user.email}`, {
        cache: "no-cache",
      })
        .then(async (res) => {
          if (!res.ok) {
            // 🎯 ব্যাকএন্ড সার্ভার আসলে কী এরর দিচ্ছে তা অবজেক্ট থেকে রিড করা হচ্ছে
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.message || `Server responded with status ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          setClasses(Array.isArray(data) ? data : []);
          setLoading(false);
        })
        .catch((err) => {
          console.error("🔍 DETAILED TRAINER FETCH ERROR:", err);
          // স্ক্রিনে আসল এরর মেসেজটি পপ-আপ বা শো করবে
          toast.error(err.message || "Failed to load trainer classes");
          setLoading(false);
        });
    } else if (!isPending) {
      setLoading(false);
    }
  }, [session, isPending]);

  // 🗑️ ক্লাস ডিলিট হ্যান্ডলার
  const handleDelete = async (id) => {
    if (confirm("Are you absolutely certain you want to drop this class entry?")) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/classes/${id}`, {
          method: "DELETE",
        });
        const data = await res.json();

        if (data.deletedCount > 0) {
          setClasses(classes.filter((c) => c._id !== id));
          toast.success("Class successfully removed!");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete class.");
      }
    }
  };

  if (isPending || loading) {
    return (
      <div className="flex justify-center items-center min-h-[250px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#0F1424] border border-slate-800 rounded-2xl p-6 relative">
      <h2 className="text-lg font-bold text-white tracking-tight mb-5">Managed Classes Dashboard</h2>

      <div className="overflow-x-auto rounded-xl border border-slate-800/80">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-900 text-slate-400 text-xs uppercase border-b border-slate-800">
              <th className="p-4">Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-slate-800/60 text-slate-200">
            {classes.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-10 text-slate-500 text-xs">
                  No managed classes found for your account yet.
                </td>
              </tr>
            ) : (
              classes.map((c) => (
                <tr key={c._id} className="hover:bg-slate-900/40">
                  <td className="p-4 font-bold text-white">{c.name || c.className}</td>
                  <td className="p-4 text-slate-400">{c.category}</td>
                  <td className="p-4 text-[#F59E0B] font-bold">${c.price}</td>
                  <td className="p-4">
                    {/* 🚦 লাইভ পেন্ডিং বা অ্যাপ্রুভড স্ট্যাটাস ব্যাজ */}
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                      c.status === "approved" 
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                        : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                    }`}>
                      {c.status || "pending"}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button 
                      onClick={() => setActiveStudents(c.attendees || [])} 
                      className="text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1.5 rounded-lg hover:bg-blue-500 hover:text-white transition-all"
                    >
                      View Students
                    </button>
                    <button className="text-xs bg-slate-800 text-slate-300 border border-slate-700 px-3 py-1.5 rounded-lg hover:border-amber-500 hover:text-[#F59E0B]">
                      Update
                    </button>
                    <button 
                      onClick={() => handleDelete(c._id)} 
                      className="text-xs bg-rose-500/10 text-rose-400 border border-rose-500/20 px-3 py-1.5 rounded-lg hover:bg-rose-500 hover:text-white transition-all"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* DYNAMIC COMPONENT MODAL ATTENDEES LIGHTBOX OVERLAY */}
      {activeStudents && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0F1424] border border-slate-800 max-w-md w-full rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">Enrolled Students Queue</h3>
              <button onClick={() => setActiveStudents(null)} className="text-slate-400 hover:text-white text-lg">✕</button>
            </div>
            <div className="divide-y divide-slate-800/60 max-h-60 overflow-y-auto">
              {activeStudents.length === 0 ? (
                <p className="text-xs text-slate-500 py-4 text-center">No active student bookings found yet.</p>
              ) : (
                activeStudents.map((st, i) => (
                  <div key={i} className="py-2.5 first:pt-0">
                    <p className="text-xs font-bold text-white">{st.name || "Anonymous Member"}</p>
                    <p className="text-[11px] text-slate-400">{st.email}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}