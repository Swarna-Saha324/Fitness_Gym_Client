"use client";

import React, { useState } from "react";

export default function BookedClassesPage() {
  const [bookedClasses] = useState([
    { id: 1, name: "Cardio Blast HIIT", trainer: "Alex Johnson", schedule: "Tue, Thu, Sat at 06:00 AM" },
    { id: 2, name: "Endurance Builder Bootcamp", trainer: "Sarah Connor", schedule: "Mon, Wed, Fri at 08:00 AM" },
  ]);

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
              <th className="p-4">Trainer Name</th>
              <th className="p-4">Schedule Details</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-slate-800/60 text-slate-200">
            {bookedClasses.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-8 text-slate-500 text-xs">No slot dynamic booking entries identified.</td>
              </tr>
            ) : (
              bookedClasses.map((item) => (
                <tr key={item.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="p-4 font-bold text-white">{item.name}</td>
                  <td className="p-4 text-slate-300">{item.trainer}</td>
                  <td className="p-4 text-xs text-slate-400">{item.schedule}</td>
                  <td className="p-4 text-right">
                    <button className="text-xs bg-slate-800 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 hover:border-amber-500 hover:text-[#F59E0B] transition-all">
                      View Details
                    </button>
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