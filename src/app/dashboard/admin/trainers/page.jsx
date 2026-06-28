"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ManageTrainers() {
  const [trainers, setTrainers] = useState([]);

  const fetchTrainers = () => {
    fetch("http://localhost:5000/api/trainers") // আপনার প্ল্যাটফর্মের সব একটিভ ট্রেইনারদের রুট
      .then((res) => res.json())
      .then((data) => setTrainers(data || []))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  const handleDemote = async (email, name) => {
    const confirmAction = window.confirm(`Are you absolutely sure you want to remove trainer privileges from "${name}"?`);
    
    if (!confirmAction) return;

    try {
      const res = await fetch("http://localhost:5000/api/admin/trainers/demote", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        toast.success(`"${name}" has been successfully demoted to standard member.`);
        fetchTrainers(); // রিফ্রেশ টেবিল ডাটা
      } else {
        toast.error("Failed to strip trainer credentials.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server validation mismatch error.");
    }
  };

  return (
    <div className="p-6 bg-[#090D1A] min-h-screen text-white space-y-6">
      <h1 className="text-xl font-bold tracking-tight">🏋️ Manage Active System Trainers</h1>

      <div className="overflow-x-auto bg-[#0F1424] border border-slate-800 rounded-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-xs text-slate-400 uppercase font-mono bg-slate-900/40">
              <th className="p-4">Trainer Name</th>
              <th className="p-4">Email Address</th>
              <th className="p-4">Specialty Badge</th>
              <th className="p-4 text-center">Action Authority</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-slate-800/60">
            {trainers.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-8 text-center text-slate-500 font-medium">No active trainers found on the ledger grid.</td>
              </tr>
            ) : (
              trainers.map((t) => (
                <tr key={t._id} className="hover:bg-slate-900/20 transition-colors">
                  <td className="p-4 font-semibold text-slate-200">{t.name}</td>
                  <td className="p-4 text-slate-400 font-mono text-xs">{t.email}</td>
                  <td className="p-4 text-xs font-bold text-amber-400 uppercase tracking-wide">{t.specialty || "Fitness Coach"}</td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleDemote(t.email, t.name)}
                      className="px-3 py-1 bg-red-600/10 hover:bg-red-600 border border-red-500/30 text-red-400 hover:text-white font-bold rounded-lg text-xs transition-all"
                    >
                      Demote to User
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