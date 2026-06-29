/*"use client";

import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function AddClassPage() {
  const { data: session } = authClient.useSession();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  const [formData, setFormData] = useState({
    name: "", image: "", category: "Cardio", difficulty: "Beginner",
    duration: "", scheduleDays: "", scheduleTime: "", price: "", description: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg({ type: "", text: "" });

    const classPayload = {
      ...formData,
      trainerEmail: session?.user?.email,
      trainerName: session?.user?.name,
      price: parseFloat(formData.price),
      status: "Pending" // Strict default requirement management rule
    };

    try {
      const res = await fetch("http://localhost:5000/api/classes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(classPayload)
      });
      if (res.ok) {
        setMsg({ type: "success", text: "✓ Class added successfully with 'Pending' admin approval status!" });
        setFormData({ name: "", image: "", category: "Cardio", difficulty: "Beginner", duration: "", scheduleDays: "", scheduleTime: "", price: "", description: "" });
      } else {
        setMsg({ type: "error", text: "Failed to create class slot." });
      }
    } catch {
      setMsg({ type: "error", text: "Network database connectivity issue." });
    } finally { setLoading(false); }
  };

  return (
    <div className="max-w-3xl mx-auto bg-[#0F1424] border border-slate-800 rounded-2xl p-6 md:p-8">
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight">Add New Class Slot</h2>
        <p className="text-xs text-slate-400 mt-1">Setup course structure metadata. Newly added entries will default save as Pending state.</p>
      </div>

      {msg.text && (
        <div className={`mt-5 p-4 rounded-xl text-xs font-semibold ${msg.type === "success" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-rose-500/10 text-rose-400 border border-rose-500/20"}`}>
          {msg.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
        <div className="flex flex-col gap-1"><label className="text-slate-400 text-xs uppercase font-bold">Class Name</label>
          <input type="text" required className="bg-slate-900/80 border border-slate-800 focus:border-[#F59E0B] rounded-xl px-4 h-11 text-white text-sm outline-none" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
        </div>
        <div className="flex flex-col gap-1"><label className="text-slate-400 text-xs uppercase font-bold">Image URL</label>
          <input type="url" required className="bg-slate-900/80 border border-slate-800 focus:border-[#F59E0B] rounded-xl px-4 h-11 text-white text-sm outline-none" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} />
        </div>
        <div className="flex flex-col gap-1"><label className="text-slate-400 text-xs uppercase font-bold">Category</label>
          <select className="bg-slate-900/80 border border-slate-800 focus:border-[#F59E0B] rounded-xl px-3 h-11 text-white text-sm outline-none cursor-pointer" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}><option value="Cardio">Cardio</option><option value="Yoga">Yoga</option><option value="Weights">Weights</option></select>
        </div>
        <div className="flex flex-col gap-1"><label className="text-slate-400 text-xs uppercase font-bold">Difficulty Level</label>
          <select className="bg-slate-900/80 border border-slate-800 focus:border-[#F59E0B] rounded-xl px-3 h-11 text-white text-sm outline-none cursor-pointer" value={formData.difficulty} onChange={e => setFormData({...formData, difficulty: e.target.value})}><option value="Beginner">Beginner</option><option value="Intermediate">Intermediate</option><option value="Advanced">Advanced</option></select>
        </div>
        <div className="flex flex-col gap-1"><label className="text-slate-400 text-xs uppercase font-bold">Duration (mins)</label>
          <input type="number" required placeholder="e.g. 60" className="bg-slate-900/80 border border-slate-800 focus:border-[#F59E0B] rounded-xl px-4 h-11 text-white text-sm outline-none" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} />
        </div>
        <div className="flex flex-col gap-1"><label className="text-slate-400 text-xs uppercase font-bold">Price ($)</label>
          <input type="number" required placeholder="e.g. 49" className="bg-slate-900/80 border border-slate-800 focus:border-[#F59E0B] rounded-xl px-4 h-11 text-white text-sm outline-none" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
        </div>
        <div className="flex flex-col gap-1"><label className="text-slate-400 text-xs uppercase font-bold">Schedule Days</label>
          <input type="text" required placeholder="e.g. Mon, Wed, Fri" className="bg-slate-900/80 border border-slate-800 focus:border-[#F59E0B] rounded-xl px-4 h-11 text-white text-sm outline-none" value={formData.scheduleDays} onChange={e => setFormData({...formData, scheduleDays: e.target.value})} />
        </div>
        <div className="flex flex-col gap-1"><label className="text-slate-400 text-xs uppercase font-bold">Schedule Time</label>
          <input type="text" required placeholder="e.g. 08:00 AM" className="bg-slate-900/80 border border-slate-800 focus:border-[#F59E0B] rounded-xl px-4 h-11 text-white text-sm outline-none" value={formData.scheduleTime} onChange={e => setFormData({...formData, scheduleTime: e.target.value})} />
        </div>
        <div className="flex flex-col gap-1 md:col-span-2"><label className="text-slate-400 text-xs uppercase font-bold">Description</label>
          <textarea required rows="3" className="bg-slate-900/80 border border-slate-800 focus:border-[#F59E0B] rounded-xl p-4 text-white text-sm outline-none resize-none" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
        </div>
        
        <button type="submit" disabled={loading} className="md:col-span-2 bg-[#F59E0B] text-[#090D1A] font-bold h-11 rounded-xl hover:bg-amber-600 transition-all text-sm disabled:opacity-50">{loading ? "Processing Submission..." : "Launch Class Entry"}</button>
      </form>
    </div>
  );
}*/
"use client";

import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function AddClassPage() {
  const { data: session } = authClient.useSession();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  const [formData, setFormData] = useState({
    name: "", image: "", category: "Cardio", difficulty: "Beginner",
    duration: "", scheduleDays: "", scheduleTime: "", price: "", 
    description: "", totalSeats: 0 
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg({ type: "", text: "" });

    const classPayload = {
      ...formData,
      trainerEmail: session?.user?.email,
      trainerName: session?.user?.name,
      price: parseFloat(formData.price),
      totalSeats: parseInt(formData.totalSeats),
      bookedSlots: 0, // ডিফল্ট ভ্যালু
      status: "Pending" 
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/classes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(classPayload)
      });
      if (res.ok) {
        setMsg({ type: "success", text: "✓ Class added successfully!" });
        setFormData({ 
            name: "", image: "", category: "Cardio", difficulty: "Beginner", 
            duration: "", scheduleDays: "", scheduleTime: "", price: "", 
            description: "", totalSeats: 0 
        });
      } else {
        setMsg({ type: "error", text: "Failed to create class slot." });
      }
    } catch {
      setMsg({ type: "error", text: "Network database connectivity issue." });
    } finally { setLoading(false); }
  };

  return (
    <div className="max-w-3xl mx-auto bg-[#0F1424] border border-slate-800 rounded-2xl p-6 md:p-8">
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight">Add New Class Slot</h2>
        <p className="text-xs text-slate-400 mt-1">Setup course structure metadata. Entries will save as Pending state.</p>
      </div>

      {msg.text && (
        <div className={`mt-5 p-4 rounded-xl text-xs font-semibold ${msg.type === "success" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-rose-500/10 text-rose-400 border border-rose-500/20"}`}>
          {msg.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
        <div className="flex flex-col gap-1"><label className="text-slate-400 text-xs uppercase font-bold">Class Name</label>
          <input type="text" required className="bg-slate-900/80 border border-slate-800 focus:border-[#F59E0B] rounded-xl px-4 h-11 text-white text-sm outline-none" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
        </div>
        <div className="flex flex-col gap-1"><label className="text-slate-400 text-xs uppercase font-bold">Image URL</label>
          <input type="url" required className="bg-slate-900/80 border border-slate-800 focus:border-[#F59E0B] rounded-xl px-4 h-11 text-white text-sm outline-none" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} />
        </div>
        <div className="flex flex-col gap-1"><label className="text-slate-400 text-xs uppercase font-bold">Category</label>
          <select className="bg-slate-900/80 border border-slate-800 focus:border-[#F59E0B] rounded-xl px-3 h-11 text-white text-sm outline-none" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}><option value="Cardio">Cardio</option><option value="Yoga">Yoga</option><option value="Weights">Weights</option></select>
        </div>
        <div className="flex flex-col gap-1"><label className="text-slate-400 text-xs uppercase font-bold">Difficulty Level</label>
          <select className="bg-slate-900/80 border border-slate-800 focus:border-[#F59E0B] rounded-xl px-3 h-11 text-white text-sm outline-none" value={formData.difficulty} onChange={e => setFormData({...formData, difficulty: e.target.value})}><option value="Beginner">Beginner</option><option value="Intermediate">Intermediate</option><option value="Advanced">Advanced</option></select>
        </div>
        <div className="flex flex-col gap-1"><label className="text-slate-400 text-xs uppercase font-bold">Duration (mins)</label>
          <input type="number" required className="bg-slate-900/80 border border-slate-800 focus:border-[#F59E0B] rounded-xl px-4 h-11 text-white text-sm outline-none" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} />
        </div>
        <div className="flex flex-col gap-1"><label className="text-slate-400 text-xs uppercase font-bold">Price ($)</label>
          <input type="number" required className="bg-slate-900/80 border border-slate-800 focus:border-[#F59E0B] rounded-xl px-4 h-11 text-white text-sm outline-none" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
        </div>
        <div className="flex flex-col gap-1"><label className="text-slate-400 text-xs uppercase font-bold">Schedule Days</label>
          <input type="text" required className="bg-slate-900/80 border border-slate-800 focus:border-[#F59E0B] rounded-xl px-4 h-11 text-white text-sm outline-none" value={formData.scheduleDays} onChange={e => setFormData({...formData, scheduleDays: e.target.value})} />
        </div>
        <div className="flex flex-col gap-1"><label className="text-slate-400 text-xs uppercase font-bold">Schedule Time</label>
          <input type="text" required className="bg-slate-900/80 border border-slate-800 focus:border-[#F59E0B] rounded-xl px-4 h-11 text-white text-sm outline-none" value={formData.scheduleTime} onChange={e => setFormData({...formData, scheduleTime: e.target.value})} />
        </div>
        <div className="flex flex-col gap-1"><label className="text-slate-400 text-xs uppercase font-bold">Total Seats</label>
          <input type="number" required className="bg-slate-900/80 border border-slate-800 focus:border-[#F59E0B] rounded-xl px-4 h-11 text-white text-sm outline-none" value={formData.totalSeats} onChange={e => setFormData({...formData, totalSeats: e.target.value})} />
        </div>
        <div className="flex flex-col gap-1 md:col-span-2"><label className="text-slate-400 text-xs uppercase font-bold">Description</label>
          <textarea required rows="3" className="bg-slate-900/80 border border-slate-800 focus:border-[#F59E0B] rounded-xl p-4 text-white text-sm outline-none resize-none" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
        </div>
        <button type="submit" disabled={loading} className="md:col-span-2 bg-[#F59E0B] text-[#090D1A] font-bold h-11 rounded-xl hover:bg-amber-600 transition-all text-sm disabled:opacity-50">{loading ? "Processing..." : "Launch Class Entry"}</button>
      </form>
    </div>
  );
}