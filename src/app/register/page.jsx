"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image: "",
    password: "",
    role: "member", // Default configuration state set to member
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validatePassword = (password) => {
    const minLength = password.length >= 6;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    return minLength && hasUpper && hasLower;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validatePassword(formData.password)) {
      setError("Password must be at least 6 characters, with 1 uppercase & 1 lowercase letter.");
      return;
    }

    setLoading(true);

    // Better-Auth email signup with additional backend metadata field passing
    const { error: authError } = await authClient.signUp.email({
      email: formData.email,
      password: formData.password,
      name: formData.name,
      image: formData.image || undefined,
      role: formData.role, // Dynamically parsing the selected role schema to MongoDB adapter
    });

    setLoading(false);

    if (authError) {
      setError(authError.message || "An unexpected registration error occurred.");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-[#090D1A] flex items-center justify-center p-4 md:p-6 lg:p-8 text-white">
      <div className="w-full max-w-5xl grid md:grid-cols-12 bg-[#0F1424] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl min-h-[600px]">
        
        {/* LEFT SIDE: Branding */}
        <div className="md:col-span-5 bg-gradient-to-br from-[#291A05] via-[#0F1424] to-[#090D1A] p-8 md:p-10 flex flex-col justify-between relative overflow-hidden border-r border-slate-800/50">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.12),transparent_50%)] pointer-events-none" />
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
              <span className="w-3 h-6 rounded-sm bg-[#F59E0B]" />
              <span>Apex<span className="text-[#F59E0B]">Fit</span></span>
            </Link>

            <h1 className="text-3xl font-extrabold text-white tracking-tight mt-12 leading-tight">
              Start Your <span className="text-[#F59E0B]">Journey</span> <br />Today
            </h1>
            <p className="text-slate-400 text-sm mt-4 leading-relaxed">
              Create your free account and unlock access to world-class workouts, nutrition guidance, and a thriving athlete community.
            </p>

            <div className="mt-8 space-y-3">
              {["Personalized Training Plans", "Progress Tracking Dashboard", "Direct Trainer Messaging"].map((feature, i) => (
                <div key={i} className="flex items-center gap-3 bg-slate-900/50 backdrop-blur-sm border border-slate-800/60 px-4 py-3 rounded-xl text-xs font-medium text-slate-300">
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#F59E0B]/20 text-[#F59E0B]">✓</span>
                  {feature}
                </div>
              ))}
            </div>
          </div>
          <div className="text-xs text-slate-500 mt-8 z-10">© 2026 ApexFit. All rights reserved.</div>
        </div>

        {/* RIGHT SIDE: Dynamic Stacked Form */}
        <div className="md:col-span-7 p-8 md:p-12 flex flex-col justify-center bg-[#0B0F19]">
          <div className="w-full max-w-md mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white tracking-tight">Create account</h2>
              <p className="text-sm text-slate-400 mt-1">
                Already have an account?{" "}
                <Link href="/login" className="text-[#F59E0B] hover:underline font-semibold">Sign in</Link>
              </p>
            </div>

            {error && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4 text-xs font-medium text-rose-400 bg-rose-500/10 border border-rose-500/20 px-4 py-3 rounded-xl">
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-slate-400 text-xs font-semibold">Full Name</label>
                <input
                  type="text" required placeholder="Alex Johnson"
                  className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 focus:border-[#F59E0B] focus:outline-none h-11 rounded-xl px-3 text-white text-sm transition-all"
                  value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-slate-400 text-xs font-semibold">Email address</label>
                <input
                  type="email" required placeholder="you@example.com"
                  className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 focus:border-[#F59E0B] focus:outline-none h-11 rounded-xl px-3 text-white text-sm transition-all"
                  value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              {/* Profile Image */}
              <div className="flex flex-col gap-1.5">
                <label className="text-slate-400 text-xs font-semibold">Profile Image (optional)</label>
                <input
                  type="url" placeholder="Paste image image URL link"
                  className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 focus:border-[#F59E0B] focus:outline-none h-11 rounded-xl px-3 text-white text-sm transition-all"
                  value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
              </div>

              {/* Account Category Role Selection Dropdown */}
              <div className="flex flex-col gap-1.5">
                <label className="text-slate-400 text-xs font-semibold">Account Category</label>
                <select
                  className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 focus:border-[#F59E0B] focus:outline-none h-11 rounded-xl px-3 text-white text-sm transition-all cursor-pointer appearance-none"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                >
                  <option value="member" className="bg-[#0B0F19] text-white">Member (Default Athlete)</option>
                  <option value="trainer" className="bg-[#0B0F19] text-white">Fitness Trainer</option>
                </select>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <label className="text-slate-400 text-xs font-semibold">Password</label>
                <input
                  type="password" required placeholder="••••••••"
                  className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 focus:border-[#F59E0B] focus:outline-none h-11 rounded-xl px-3 text-white text-sm transition-all"
                  value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit" disabled={loading}
                className="w-full bg-[#F59E0B] text-[#090D1A] font-bold h-11 rounded-xl mt-2 hover:bg-amber-600 active:scale-[0.98] transition-all shadow-lg shadow-amber-500/10 text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
              >
                {loading ? "Creating Account..." : "Create Account →"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}