"use client";
import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function AdminOverview() {
  const { data: session } = authClient.useSession();
  const [stats, setStats] = useState({ totalUsers: 0, totalClasses: 0, totalBooked: 0, totalRevenue: 0 });

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/stats")
      .then((res) => res.json())
      .then((data) => setStats(data));
  }, []);

  return (
    <div className="space-y-8 p-6 bg-[#090D1A] min-h-screen text-white">
      {/* Profile Card Header */}
      <div className="bg-[#0F1424] p-6 rounded-2xl border border-slate-800 flex items-center gap-4">
        <img src={session?.user?.image} alt="Admin" className="w-16 h-16 rounded-full border-2 border-amber-400" />
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold">{session?.user?.name}</h2>
            <span className="bg-amber-500/10 text-amber-400 text-[10px] uppercase font-extrabold px-2 py-0.5 rounded border border-amber-500/20">Admin Badge</span>
          </div>
          <p className="text-xs text-slate-400">{session?.user?.email}</p>
        </div>
      </div>

      {/* Grid Stats Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Users", val: stats.totalUsers, icon: "👥" },
          { label: "Total Classes", val: stats.totalClasses, icon: "🏋️" },
          { label: "Booked Slots", val: stats.totalBooked, icon: "🎟️" },
          { label: "Total Revenue", val: `$${stats.totalRevenue}`, icon: "💰" }
        ].map((card, i) => (
          <div key={i} className="bg-[#0F1424] border border-slate-800/80 p-5 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{card.label}</span>
              <p className="text-2xl font-black text-slate-100 mt-1">{card.val}</p>
            </div>
            <span className="text-2xl bg-slate-900 p-3 rounded-xl border border-slate-800">{card.icon}</span>
          </div>
        ))}
      </div>
    </div>
  );
}