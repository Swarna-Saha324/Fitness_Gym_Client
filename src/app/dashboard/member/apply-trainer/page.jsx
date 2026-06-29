"use client";

import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function ApplyTrainerPage() {
  const { data: session } = authClient.useSession();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  const [formData, setFormData] = useState({
    experience: "",
    specialty: "Yoga",
    bio: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    // Validate if current session details tracking data array blocks exist
    if (!session?.user?.email) {
      setErrorMessage("Authentication required. Please login again.");
      setLoading(false);
      return;
    }

    // Creating structured object payloads containing session context variables
    const applicationPayload = {
      name: session.user.name,
      email: session.user.email,
      experience: formData.experience,
      specialty: formData.specialty,
      bio: formData.bio,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/apply-trainer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(applicationPayload),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccessMessage('✓ Application submitted successfully! Your tracking status is now set to "Pending".');
        setFormData({ experience: "", specialty: "Yoga", bio: "" }); // Clear form states
      } else {
        setErrorMessage(data.message || "Something went wrong while submitting application.");
      }
    } catch (error) {
      setErrorMessage("Failed to connect to the backend server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-[#0F1424] border border-slate-800 rounded-2xl p-6 md:p-8">
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight">Apply as Trainer</h2>
        <p className="text-xs text-slate-400 mt-1">
          Share your credentials and specialty. Our admin team will review your application within 2-3 business days.
        </p>
      </div>

      {successMessage && (
        <div className="mt-6 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm p-4 rounded-xl font-medium">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="mt-6 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm p-4 rounded-xl font-medium">
          ❌ {errorMessage}
        </div>
      )}

      {!successMessage && (
        <form onSubmit={handleSubmit} className="space-y-5 mt-6">
          <div className="flex flex-col gap-1.5">
            <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Years of Experience</label>
            <input
              type="number" required min="0" placeholder="e.g. 5"
              className="bg-slate-900/80 border border-slate-800 focus:border-[#F59E0B] focus:outline-none h-11 rounded-xl px-4 text-white text-sm"
              value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Specialty</label>
            <select
              className="bg-slate-900/80 border border-slate-800 focus:border-[#F59E0B] focus:outline-none h-11 rounded-xl px-3 text-white text-sm cursor-pointer"
              value={formData.specialty} onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
            >
              <option value="Yoga">Yoga</option>
              <option value="Weights">Weights</option>
              <option value="Cardio">Cardio</option>
              <option value="Crossfit">Crossfit</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Bio / Description</label>
            <textarea
              required rows="4" placeholder="Tell us about your fitness journey and achievements..."
              className="bg-slate-900/80 border border-slate-800 focus:border-[#F59E0B] focus:outline-none rounded-xl p-4 text-white text-sm resize-none"
              value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            />
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full bg-[#F59E0B] text-[#090D1A] font-bold h-11 rounded-xl mt-2 hover:bg-amber-600 active:scale-[0.99] transition-all text-sm disabled:opacity-50"
          >
            {loading ? "Submitting Proposal..." : "Submit Application"}
          </button>
        </form>
      )}
    </div>
  );
}