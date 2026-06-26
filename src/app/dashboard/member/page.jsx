"use client";

import React, { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";

export default function MemberOverviewPage() {
  const { data: session, isPending } = authClient.useSession();
  
  // Simulated stats tracking matching your strict layout blueprint
  const [stats, setStats] = useState({
    bookedClassesCount: 2,
    favoritesCount: 1,
    trainerApplicationStatus: "Pending", // Options: "none", "Pending", "Rejected"
    adminFeedback: "Your experience years criteria did not meet our current requirements. Please re-apply with updated certifications.",
  });

  // Simulated booking list items corresponding exactly to your structural visual sample
  const [recentBookings, setRecentBookings] = useState([
    { id: 1, name: "Cardio Blast HIIT", trainer: "Alex J.", schedule: "Tue, Thu, Sat at 06:00", price: 25 },
    { id: 2, name: "Endurance Builder Bootcamp", trainer: "Sarah K.", schedule: "Mon, Wed, Fri at 08:00", price: 50 },
  ]);

  if (isPending) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="w-10 h-10 rounded-full border-4 border-slate-800 border-t-[#F59E0B] animate-spin" />
      </div>
    );
  }

  const user = session?.user;
  const userRole = user?.role || "Member";

  return (
    <div className="space-y-8">
      {/* Top Welcome Title */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">User Dashboard</h1>
        <p className="text-xs text-slate-400 mt-0.5">Welcome back, {user?.name || "User"}!</p>
      </div>

      {/* THREE INTERACTIVE TOP METRIC VISUAL CARDS BLOCK */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Total Booked Classes Card */}
        <div className="bg-[#0F1424] border border-slate-800 p-5 rounded-2xl flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#F59E0B]">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">{stats.bookedClassesCount}</span>
            </div>
            <p className="text-xs font-medium text-slate-400 mt-0.5">Booked Classes</p>
          </div>
        </div>

        {/* Total Favorites Card */}
        <div className="bg-[#0F1424] border border-slate-800 p-5 rounded-2xl flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-500">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">{stats.favoritesCount}</span>
            </div>
            <p className="text-xs font-medium text-slate-400 mt-0.5">Favorites</p>
          </div>
        </div>

        {/* Dynamic User Identity Role Card */}
        <div className="bg-[#0F1424] border border-slate-800 p-5 rounded-2xl flex items-center gap-4 sm:col-span-2 lg:col-span-1">
          <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
          </div>
          <div>
            <span className="text-2xl font-bold text-white capitalize">{userRole}</span>
            <p className="text-xs font-medium text-slate-400 mt-0.5">Account Role Privilege</p>
          </div>
        </div>
      </div>

      {/* IDENTITY BASE GRID LAYER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Profile Card Container (7 Columns) */}
        <div className="lg:col-span-7 bg-[#0F1424] border border-slate-800 rounded-2xl p-6">
          <h3 className="text-sm font-bold text-slate-300 mb-5 tracking-tight">Profile Details</h3>
          <div className="flex items-center gap-5">
            <img
              className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-800 shadow-inner"
              src={user?.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"}
              alt="Profile image"
            />
            <div className="space-y-1.5 truncate">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white truncate">{user?.name || "Swarna Saha"}</h2>
                <span className="text-[10px] font-bold uppercase bg-[#F59E0B]/10 text-[#F59E0B] px-2 py-0.5 rounded">
                  {userRole}
                </span>
              </div>
              <p className="text-sm text-slate-400 truncate">{user?.email || "user@ironpulse.com"}</p>
            </div>
          </div>
        </div>

        {/* Trainer Application Conditional Handling Container (5 Columns) */}
        <div className="lg:col-span-5 bg-[#0F1424] border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-300 mb-4 tracking-tight">Trainer Application</h3>
            
            {/* Conditional Styling States Container */}
            {stats.trainerApplicationStatus === "none" && (
              <div className="text-center py-4">
                <p className="text-xs text-slate-400 mb-3">No application submitted yet.</p>
                <button className="text-xs font-bold text-[#F59E0B] hover:underline">+ Apply Now</button>
              </div>
            )}

            {stats.trainerApplicationStatus === "Pending" && (
              <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 flex items-start gap-3">
                <span className="h-2 w-2 rounded-full bg-amber-400 mt-1.5 animate-pulse shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-amber-400">Application Pending</h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">Our administration panel is currently auditing your submission. Check back soon!</p>
                </div>
              </div>
            )}

            {stats.trainerApplicationStatus === "Rejected" && (
              <div className="space-y-3">
                <div className="bg-rose-500/5 border border-rose-500/20 rounded-xl p-4 flex items-start gap-3">
                  <span className="h-2 w-2 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-rose-400">Application Rejected</h4>
                  </div>
                </div>
                {stats.adminFeedback && (
                  <div className="bg-slate-900/60 rounded-xl p-3 border border-slate-800">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Admin Feedback:</p>
                    <p className="text-xs text-slate-300 mt-1 italic leading-relaxed">"{stats.adminFeedback}"</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RECENT BOOKINGS ROW DATA CONTAINER */}
      <div className="bg-[#0F1424] border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-sm font-bold text-slate-300 tracking-tight">Recent Bookings</h3>
          <span className="text-[11px] text-slate-500">Live Status sync</span>
        </div>
        
        <div className="divide-y divide-slate-800/60 space-y-3">
          {recentBookings.map((booking) => (
            <div key={booking.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 first:pt-0">
              <div className="flex items-center gap-3.5">
                <div className="h-10 w-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 shrink-0">
                  🏋️
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white transition-colors hover:text-[#F59E0B] cursor-pointer">{booking.name}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Trainer: <span className="text-slate-300 font-medium">{booking.trainer}</span> • {booking.schedule}</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-sm font-extrabold text-[#F59E0B] bg-[#F59E0B]/10 px-3 py-1 rounded-lg border border-[#F59E0B]/10">
                  ${booking.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}