"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ManageClasses() {
  const [classes, setClasses] = useState([]);

  const fetchAllClasses = () => {
    //fetch("http://localhost:5000/api/admin/all-classes") // ব্যাকএন্ডের অল-ক্লাস গেট এন্ডপয়েন্ট
    fetch(`process.env.NEXT_PUBLIC_BASE_URL/api/admin/all-classes"`) 
      .then((res) => res.json())
      .then((data) => setClasses(data || []))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchAllClasses();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
     // const res = await fetch(`http://localhost:5000/api/admin/classes/${id}`, {
     const res = await fetch(`process.env.NEXT_PUBLIC_BASE_URL/api/admin/classes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        toast.success(`Class state updated to: ${status}`);
        fetchAllClasses();
      }
    } catch (err) {
      console.error(err);
      toast.error("Error setting system configuration status.");
    }
  };

  const handleDeleteClass = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this fitness class record?")) return;

    try {
      //const res = await fetch(`http://localhost:5000/api/admin/classes/${id}`, {
       const res = await fetch(`process.env.NEXT_PUBLIC_BASE_URL/api/admin/classes/${id}`, {
        
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Class entry purged from database.");
        fetchAllClasses();
      }
    } catch (err) {
      console.error(err);
      toast.error("Deletion execution halted.");
    }
  };

  return (
    <div className="p-6 bg-[#090D1A] min-h-screen text-white space-y-6">
      <h1 className="text-xl font-bold tracking-tight">📝 Moderating Class Catalog Matrix</h1>

      <div className="overflow-x-auto bg-[#0F1424] border border-slate-800 rounded-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-xs text-slate-400 uppercase font-mono bg-slate-900/40">
              <th className="p-4">Class Title</th>
              <th className="p-4">Trainer Email</th>
              <th className="p-4">Price / Session</th>
              <th className="p-4">Current Status</th>
              <th className="p-4 text-center">Operational Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-slate-800/60">
            {classes.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-8 text-center text-slate-500 font-medium">No class configuration files registered.</td>
              </tr>
            ) : (
              classes.map((cls) => (
                <tr key={cls._id} className="hover:bg-slate-900/20 transition-colors">
                  <td className="p-4 font-semibold text-slate-200">{cls.name}</td>
                  <td className="p-4 text-slate-400 font-mono text-xs">{cls.trainerEmail}</td>
                  <td className="p-4 text-amber-500 font-bold font-mono">${cls.price}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wide ${
                      cls.status === "approved" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                      cls.status === "rejected" ? "bg-rose-500/10 text-rose-400 border border-rose-500/20" : 
                      "bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse"
                    }`}>
                      {cls.status || "pending"}
                    </span>
                  </td>
                  <td className="p-4 flex justify-center gap-2">
                    {cls.status !== "approved" && (
                      <button
                        onClick={() => handleStatusChange(cls._id, "approved")}
                        className="px-2 py-1 bg-emerald-500 hover:bg-emerald-600 text-black font-bold text-xs rounded-lg transition-all"
                      >
                        Approve
                      </button>
                    )}
                    {cls.status !== "rejected" && cls.status !== "approved" && (
                      <button
                        onClick={() => handleStatusChange(cls._id, "rejected")}
                        className="px-2 py-1 bg-amber-500 hover:bg-amber-600 text-black font-bold text-xs rounded-lg transition-all"
                      >
                        Reject
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteClass(cls._id)}
                      className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-lg transition-all"
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
    </div>
  );
}