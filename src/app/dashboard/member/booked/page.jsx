"use client";

import React, { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client"; // 💡 আপনার প্রজেক্টের Better-auth ক্লায়েন্ট পাথ অনুযায়ী নিশ্চিত হয়ে নিন

export default function BookedClassesPage() {
  const { data: session, isPending } = authClient.useSession();
  const [bookedClasses, setBookedClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    if (session?.user?.email) {
      setLoading(true);
      
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/transactions`, {
        cache: "no-cache"
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch transaction records");
          return res.json();
        })

        


        .then((data) => {
          // 🎯 ফিল্টার লজিক: ডাটাবেজের সব ট্রানজেকশন থেকে শুধুমাত্র এই ইউজারের ইমেইলের বুকিংগুলো আলাদা করা হচ্ছে
          const userRecords = data.filter(booking => booking.userEmail === session.user.email);
          setBookedClasses(userRecords);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error loading secure member bookings:", err);
          setLoading(false);
        });
    } else if (!isPending) {
      // সেশন লোড হওয়া শেষ কিন্তু ইউজার নাই, তখন লোডিং ফলস করে দেবে
      setLoading(false);
    }
  }, [session, isPending]);

  // 🔄 ডাটা লোড হওয়ার সময় ক্লিন ডার্ক স্পিনার দেখাবে
  if (loading || isPending) {
    return (
      <div className="flex justify-center items-center min-h-[250px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#0F1424] border border-slate-800 rounded-2xl p-6">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-white tracking-tight">Your Booked Classes</h2>
        <p className="text-xs text-slate-400 mt-0.5">List of courses you have securely enrolled and processed payment for.</p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-800/80">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-900/80 text-slate-400 text-xs font-semibold tracking-wider uppercase border-b border-slate-800">
              <th className="p-4">Class Name</th>
              <th className="p-4">Price Paid</th>
              <th className="p-4">Transaction ID</th>
              <th className="p-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-slate-800/60 text-slate-200">
            {/* 🎯 কন্ডিশনাল রেন্ডারিং: বুকিং না থাকলে এই নোটিশটি দেখাবে */}
            {bookedClasses.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-12 text-slate-500 text-xs font-medium">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <span className="text-2xl">🎟️</span>
                    <span>No booked classes found. Enrolled slots will appear here automatically!</span>
                  </div>
                </td>
              </tr>
            ) : (
             
              bookedClasses.map((item) => (
                <tr key={item._id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="p-4 font-bold text-white">{item.className || "Fitness Premium Class"}</td>
                  <td className="p-4 text-amber-500 font-semibold">${item.price}</td>
                  <td className="p-4 text-xs text-slate-400 font-mono tracking-tight">{item.transactionId || "Direct_Capture"}</td>
                  <td className="p-4 text-right">
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full font-medium uppercase tracking-wider">
                      Paid 
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}