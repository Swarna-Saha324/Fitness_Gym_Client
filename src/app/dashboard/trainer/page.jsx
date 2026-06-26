"use client";

import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import Image from "next/image";

export default function TrainerOverviewPage() {
  const { data: session, isPending } = authClient.useSession();
  
  // Stats tracker tailored specifically for trainer criteria matching your screen snapshot
  const [trainerStats] = useState({
    totalClassesCreated: 5,
    totalStudentsEnrolled: 2,
    forumPostsCount: 3,
  });

  const [recentClasses] = useState([
    { id: 1, name: "Cardio Blast HIIT", category: "Cardio", difficulty: "Beginner", price: 25, status: "Approved" },
    { id: 2, name: "Endurance Builder Bootcamp", category: "Cardio", difficulty: "Intermediate", price: 50, status: "Approved" },
    { id: 3, name: "Fat Burn Cardio Circuit", category: "Cardio", difficulty: "Intermediate", price: 20, status: "Approved" },
  ]);

  if (isPending) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="w-10 h-10 rounded-full border-4 border-slate-800 border-t-[#F59E0B] animate-spin" />
      </div>
    );
  }

  const user = session?.user;

  return (
    <div className="space-y-8">
      {/* Header Context Titles */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Trainer Dashboard</h1>
        <p className="text-xs text-slate-400 mt-0.5">Welcome back, Trainer!</p>
      </div>

      {/* METRIC VISUAL CARDS GRID GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="bg-[#0F1424] border border-slate-800 p-5 rounded-2xl flex items-center gap-4">
          <div className="h-11 w-11 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-bold text-lg">📊</div>
          <div>
            <span className="text-xl font-extrabold text-white">{trainerStats.totalClassesCreated}</span>
            <p className="text-xs font-medium text-slate-400 mt-0.5">Total Classes Created</p>
          </div>
        </div>

        <div className="bg-[#0F1424] border border-slate-800 p-5 rounded-2xl flex items-center gap-4">
          <div className="h-11 w-11 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 font-bold text-lg">👥</div>
          <div>
            <span className="text-xl font-extrabold text-white">{trainerStats.totalStudentsEnrolled}</span>
            <p className="text-xs font-medium text-slate-400 mt-0.5">Total Students Enrolled</p>
          </div>
        </div>

        <div className="bg-[#0F1424] border border-slate-800 p-5 rounded-2xl flex items-center gap-4 sm:col-span-2 lg:col-span-1">
          <div className="h-11 w-11 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 font-bold text-lg">💬</div>
          <div>
            <span className="text-xl font-extrabold text-white">{trainerStats.forumPostsCount}</span>
            <p className="text-xs font-medium text-slate-400 mt-0.5">Forum Posts</p>
          </div>
        </div>
      </div>

      {/* PROFILE BLOCK CARD CONTAINER */}
      <div className="bg-[#0F1424] border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <Image
              className="w-16 h-16 rounded-full object-cover border-2 border-amber-500 shadow-md"
              src={user?.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"}
              alt="Trainer Avatar"
              width={50}
              height={50}
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">{user?.name || "Trainer Profile"}</h2>
                <span className="text-[10px] font-bold uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded">
                  Trainer
                </span>
              </div>
              <p className="text-xs text-slate-400">{user?.email || "trainer@ironpulse.com"}</p>
            </div>
          </div>

          {/* Quick Action Quick Links Row Layer */}
          <div className="flex flex-wrap gap-2.5">
            <Link href="/dashboard/trainer/add-class" className="text-xs font-bold bg-[#F59E0B] text-[#090D1A] px-3.5 py-2 rounded-xl hover:bg-amber-600 transition-all">
              + Add New Class
            </Link>
            <button className="text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-300 px-3.5 py-2 rounded-xl hover:bg-slate-800 transition-all">
              My Classes
            </button>
          </div>
        </div>
      </div>

      {/* RECENT ENTRIES CLASSES ROW LIST */}
      <div className="bg-[#0F1424] border border-slate-800 rounded-2xl p-6">
        <h3 className="text-sm font-bold text-slate-300 mb-5 tracking-tight">Recent Classes</h3>
        <div className="divide-y divide-slate-800/60 space-y-3.5">
          {recentClasses.map((cls) => (
            <div key={cls.id} className="flex items-center justify-between gap-4 pt-3.5 first:pt-0">
              <div>
                <h4 className="text-sm font-bold text-white">{cls.name}</h4>
                <p className="text-xs text-slate-400 mt-0.5">{cls.category} • <span className="text-slate-500">{cls.difficulty}</span></p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 px-2 py-0.5 rounded">
                  {cls.status}
                </span>
                <span className="text-sm font-extrabold text-[#F59E0B]">${cls.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}