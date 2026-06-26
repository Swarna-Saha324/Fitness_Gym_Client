"use client";

import React, { useState } from "react";

export default function MyClassesPage() {
  const [activeStudents, setActiveStudents] = useState(null); // Tracks model pop-ups payload
  const [classes, setClasses] = useState([
    { id: 1, name: "Cardio Blast HIIT", category: "Cardio", price: 25, attendees: [{ name: "Swarna Saha", email: "swarna@gmail.com" }] },
    { id: 2, name: "Endurance Builder", category: "Crossfit", price: 50, attendees: [] }
  ]);

  const handleDelete = (id) => {
    if (confirm("Are you absolute certain you want to drop this class entry?")) {
      setClasses(classes.filter(c => c.id !== id));
    }
  };

  return (
    <div className="bg-[#0F1424] border border-slate-800 rounded-2xl p-6 relative">
      <h2 className="text-lg font-bold text-white tracking-tight mb-5">Managed Classes Dashboard</h2>

      <div className="overflow-x-auto rounded-xl border border-slate-800/80">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-900 text-slate-400 text-xs uppercase border-b border-slate-800"><th className="p-4">Name</th><th className="p-4">Category</th><th className="p-4">Price</th><th className="p-4 text-right">Actions</th></tr>
          </thead>
          <tbody className="text-sm divide-y divide-slate-800/60 text-slate-200">
            {classes.map(c => (
              <tr key={c.id} className="hover:bg-slate-900/40">
                <td className="p-4 font-bold text-white">{c.name}</td>
                <td className="p-4 text-slate-400">{c.category}</td>
                <td className="p-4 text-[#F59E0B] font-bold">${c.price}</td>
                <td className="p-4 text-right space-x-2">
                  <button onClick={() => setActiveStudents(c.attendees)} className="text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1.5 rounded-lg hover:bg-blue-500 hover:text-white transition-all">View Students</button>
                  <button className="text-xs bg-slate-800 text-slate-300 border border-slate-700 px-3 py-1.5 rounded-lg hover:border-amber-500 hover:text-[#F59E0B]">Update</button>
                  <button onClick={() => handleDelete(c.id)} className="text-xs bg-rose-500/10 text-rose-400 border border-rose-500/20 px-3 py-1.5 rounded-lg hover:bg-rose-500 hover:text-white transition-all">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* DYNAMIC COMPONENT MODAL ATTENDEES LIGHTBOX OVERLAY */}
      {activeStudents && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0F1424] border border-slate-800 max-w-md w-full rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between"><h3 className="text-sm font-bold text-white">Enrolled Students Queue</h3><button onClick={() => setActiveStudents(null)} className="text-slate-400 hover:text-white text-lg">✕</button></div>
            <div className="divide-y divide-slate-800/60 max-h-60 overflow-y-auto">
              {activeStudents.length === 0 ? <p className="text-xs text-slate-500 py-4 text-center">No active student bookings found yet.</p> : activeStudents.map((st, i) => (
                <div key={i} className="py-2.5 first:pt-0"><p className="text-xs font-bold text-white">{st.name}</p><p className="text-[11px] text-slate-400">{st.email}</p></div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}