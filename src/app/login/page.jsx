"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: authError } = await authClient.signIn.email({
      email: formData.email,
      password: formData.password,
      callbackURL: "/", 
    });

    setLoading(false);

    if (authError) {
      setError(authError.message || "Invalid email or password.");
    } else {
      router.push("/");
    }
  };

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
     
    });
  };

  return (
    <div className="min-h-screen bg-[#090D1A] flex items-center justify-center p-4 md:p-6 lg:p-8 text-white">
      <div className="w-full max-w-5xl grid md:grid-cols-12 bg-[#0F1424] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl min-h-[550px]">
        
        {/* LEFT SIDE: Branding */}
        <div className="md:col-span-5 bg-gradient-to-br from-[#291A05] via-[#0F1424] to-[#090D1A] p-8 md:p-10 flex flex-col justify-between relative overflow-hidden border-r border-slate-800/50">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.12),transparent_50%)] pointer-events-none" />
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
              <span className="w-3 h-6 rounded-sm bg-[#F59E0B]" />
              <span>Apex<span className="text-[#F59E0B]">Fit</span></span>
            </Link>
            <h1 className="text-3xl font-extrabold text-white tracking-tight mt-12 leading-tight">
              Welcome <br />Back to <span className="text-[#F59E0B]">ApexFit</span>
            </h1>
            <p className="text-slate-400 text-sm mt-4 leading-relaxed">
              Log in to access your customized routine dashboard, monitor statistics, and sync with your fitness instructor.
            </p>
          </div>
          <div className="text-xs text-slate-500 mt-8 z-10">© 2026 ApexFit. All rights reserved.</div>
        </div>

        {/* RIGHT SIDE: Form Container */}
        <div className="md:col-span-7 p-8 md:p-12 flex flex-col justify-center bg-[#0B0F19]">
          <div className="w-full max-w-md mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white tracking-tight">Sign in to account</h2>
              <p className="text-sm text-slate-400 mt-1">
                New to ApexFit?{" "}
                <Link href="/register" className="text-[#F59E0B] hover:underline font-semibold">Create an account</Link>
              </p>
            </div>

            {error && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4 text-xs font-medium text-rose-400 bg-rose-500/10 border border-rose-500/20 px-4 py-3 rounded-xl">
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-slate-400 text-xs font-semibold">Email address</label>
                <input
                  type="email" required placeholder="you@example.com"
                  className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 focus:border-[#F59E0B] focus:outline-none h-11 rounded-xl px-3 text-white text-sm transition-all"
                  value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-slate-400 text-xs font-semibold">Password</label>
                <input
                  type="password" required placeholder="••••••••"
                  className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 focus:border-[#F59E0B] focus:outline-none h-11 rounded-xl px-3 text-white text-sm transition-all"
                  value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>

              <button
                type="submit" disabled={loading}
                className="w-full bg-[#F59E0B] text-[#090D1A] font-bold h-11 rounded-xl mt-2 hover:bg-amber-600 active:scale-[0.98] transition-all shadow-lg shadow-amber-500/10 text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
              >
                {loading ? "Signing In..." : "Sign In →"}
              </button>
            </form>

            <div className="relative my-5 text-center">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-800/80" /></div>
              <span className="relative bg-[#0B0F19] px-3 text-xs text-slate-500 font-medium">OR</span>
            </div>

            <button
              onClick={handleGoogleLogin} type="button"
              className="w-full h-11 bg-transparent border border-slate-800 hover:bg-slate-900/50 hover:text-white rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 3.47 2.18 7.06l3.63 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}