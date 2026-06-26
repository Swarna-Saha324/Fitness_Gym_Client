"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  
  // Real session text validation fallback dynamically mapped
  const userRole = session?.user?.role || "member";

  // Navigation schema configured specifically for standard "member" roles
  const memberLinks = [
    { label: "Overview Status", href: `/dashboard/${userRole}` },
    { label: "Booked Classes", href: `/dashboard/${userRole}/booked` },
    { label: "Apply as Trainer", href: `/dashboard/${userRole}/apply-trainer` },
    { label: "Favorite Classes", href: `/dashboard/${userRole}/favorites` },
  ];

  const isActive = (href) => pathname === href;

  return (
    <aside className="w-full md:w-64 bg-[#0F172A] border-r border-slate-800 p-5 flex flex-col justify-between shrink-0 min-h-screen">
      <div>
        {/* Profile Identity Card */}
        <div className="flex items-center gap-3 pb-6 border-b border-slate-800/80 mb-6">
          <Image
            className="w-10 h-10 rounded-full border border-amber-500 object-cover"
            src={session?.user?.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"}
            alt="User avatar"
            width={40}
            height={40}
          />
          <div className="truncate">
            <h4 className="text-sm font-bold text-white leading-tight truncate">{session?.user?.name || "Swarna Saha"}</h4>
            <span className="text-[10px] uppercase font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full mt-1 inline-block">
              {userRole} Dashboard
            </span>
          </div>
        </div>

        {/* Dynamic Nested Links Array Layer */}
        <nav className="space-y-1.5">
          {memberLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-xl transition-all ${
                isActive(link.href)
                  ? "bg-[#F59E0B] text-[#0F172A] font-bold shadow-lg shadow-amber-500/10"
                  : "text-slate-400 hover:bg-slate-900 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Quick Navigation Redirect to Public Section */}
      <div className="pt-4 border-t border-slate-800/80 mt-auto">
        <Link
          href="/"
          className="flex items-center justify-center text-xs font-semibold border border-slate-800 hover:bg-slate-900 py-2 rounded-xl text-slate-300 transition-all"
        >
          ← Back to Main Home
        </Link>
      </div>
    </aside>
  );
}