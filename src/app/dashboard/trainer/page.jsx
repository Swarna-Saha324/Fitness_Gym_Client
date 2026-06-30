"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import Image from "next/image";

export default function TrainerOverviewPage() {
  const { data: session, isPending: sessionPending } = authClient.useSession();
  const user = session?.user;

  // ডাইনামিক স্টেটসমূহ
  const [stats, setStats] = useState({
    totalClassesCreated: 0,
    totalStudentsEnrolled: 0,
    forumPostsCount: 0, // এটি আলাদা এপিআই বা স্ট্যাটিক রাখতে পারেন
  });
  const [recentClasses, setRecentClasses] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchTrainerDashboardData = async () => {
      try {
        setDataLoading(true);
        
        // 🎯 আপনার অলরেডি তৈরি করা এপিআইটি এখানে কল করা হচ্ছে
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/trainer/classes?email=${user.email}`
        );
        
        if (!res.ok) throw new Error("Failed to fetch dashboard data");
        
        const allClasses = await res.json(); // এটি আপনার enrichedClasses এর অ্যারে রিটার্ন করবে
        
        // ১. ট্রেইনারের তৈরি করা মোট ক্লাসের সংখ্যা
        const totalClassesCreated = allClasses.length;

        // ২. ট্রেইনারের সব ক্লাস মিলিয়ে মোট কতজন স্টুডেন্ট এনরোল করেছে তার নিখুঁত হিসাব
        const totalStudentsEnrolled = allClasses.reduce(
          (acc, singleClass) => acc + (singleClass.attendees?.length || 0), 
          0
        );

        // ৩. রিসেন্ট ৩টি ক্লাস দেখানোর জন্য শর্ট করা (নতুনগুলো আগে আসবে)
        const sortedRecent = [...allClasses]
          .reverse() // ডাটাবেজের অর্ডার উল্টে লেটেস্ট ক্লাস আগে আনা হলো
          .slice(0, 3); // প্রথম ৩টি ক্লাস নেওয়া হলো

        // স্টেট আপডেট
        setStats(prev => ({
          ...prev,
          totalClassesCreated,
          totalStudentsEnrolled,
        }));
        setRecentClasses(sortedRecent);
        
      } catch (err) {
        console.error("Trainer Dashboard Fetch Error:", err);
      } finally {
        setDataLoading(false);
      }
    };

    fetchTrainerDashboardData();
  }, [user?.email]);

  if (sessionPending || dataLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="w-10 h-10 rounded-full border-4 border-slate-800 border-t-[#F59E0B] animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Context Titles */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Trainer Dashboard</h1>
        <p className="text-xs text-slate-400 mt-0.5">Welcome back, {user?.name || "Trainer"}!</p>
      </div>

      {/* METRIC VISUAL CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="bg-[#0F1424] border border-slate-800 p-5 rounded-2xl flex items-center gap-4">
          <div className="h-11 w-11 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-bold text-lg">📊</div>
          <div>
            <span className="text-xl font-extrabold text-white">{stats.totalClassesCreated}</span>
            <p className="text-xs font-medium text-slate-400 mt-0.5">Total Classes Created</p>
          </div>
        </div>

        <div className="bg-[#0F1424] border border-slate-800 p-5 rounded-2xl flex items-center gap-4">
          <div className="h-11 w-11 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 font-bold text-lg">👥</div>
          <div>
            <span className="text-xl font-extrabold text-white">{stats.totalStudentsEnrolled}</span>
            <p className="text-xs font-medium text-slate-400 mt-0.5">Total Students Enrolled</p>
          </div>
        </div>

        <div className="bg-[#0F1424] border border-slate-800 p-5 rounded-2xl flex items-center gap-4 sm:col-span-2 lg:col-span-1">
          <div className="h-11 w-11 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 font-bold text-lg">💬</div>
          <div>
            <span className="text-xl font-extrabold text-white">3</span> {/* ফোরাম পোস্ট চাইলে স্ট্যাটিক বা ৩ রাখতে পারেন */}
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
              src={user?.image || "https://unsplash.com"}
              alt="Trainer Avatar"
              width={64}
              height={64}
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

          <div className="flex flex-wrap gap-2.5">
            <Link href="/dashboard/trainer/add-class" className="text-xs font-bold bg-[#F59E0B] text-[#090D1A] px-3.5 py-2 rounded-xl hover:bg-amber-600 transition-all">
              + Add New Class
            </Link>
            <Link href="/dashboard/trainer/my-classes" className="text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-300 px-3.5 py-2 rounded-xl hover:bg-slate-800 transition-all">
              My Classes
            </Link>
          </div>
        </div>
      </div>

      {/* RECENT ENTRIES CLASSES ROW LIST */}
      <div className="bg-[#0F1424] border border-slate-800 rounded-2xl p-6">
        <h3 className="text-sm font-bold text-slate-300 mb-5 tracking-tight">Recent Classes</h3>
        <div className="divide-y divide-slate-800/60 space-y-3.5">
          {recentClasses.length === 0 ? (
            <p className="text-xs text-slate-500 py-2">You haven't created any classes yet.</p>
          ) : (
            recentClasses.map((cls) => (
              <div key={cls._id} className="flex items-center justify-between gap-4 pt-3.5 first:pt-0">
                <div>
                  <h4 className="text-sm font-bold text-white">{cls.name || cls.title}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{cls.category} • <span className="text-slate-500">{cls.difficulty || "All Levels"}</span></p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 px-2 py-0.5 rounded">
                    {cls.status || "Approved"}
                  </span>
                  <span className="text-sm font-extrabold text-[#F59E0B]">${cls.price}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
