"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function AppNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Better-Auth real session integration
  const { data: session, isPending } = authClient.useSession();
  
  const isAuthenticated = !!session;
  const user = session?.user;

  // Static fallback data for dashboard dynamic parsing if role doesn't exist yet
  const userRole = user?.role || "member"; 

  // Public Navigation Links
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "All Classes", href: "/classes" },
    { label: "Community Forum", href: "/forum" },
  ];

  const isActive = (href) => pathname === href;

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          setIsProfileOpen(false);
          router.push("/login");
        },
      },
    });
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-800 bg-[#0F172A]/80 backdrop-blur-md text-[#FFFFFF]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Left Side: Brand Logo */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-slate-400 hover:bg-slate-800 hover:text-white sm:hidden focus:outline-none"
            >
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>

            <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
              <span className="w-3 h-6 rounded-sm bg-[#F59E0B]" />
              <span className="text-[#FFFFFF]">
                Apex<span className="text-[#F59E0B]">Fit</span>
              </span>
            </Link>
          </div>

          {/* Center: Desktop Navigation Links */}
          <div className="hidden sm:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors relative py-1 ${
                  isActive(link.href) ? "text-[#F59E0B] font-semibold" : "text-slate-400 hover:text-[#FFFFFF]"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#F59E0B] rounded-full" />
                )}
              </Link>
            ))}
            
            {/* Real Session Conditional Dashboard Link */}
            {isAuthenticated && (
              <Link
                href={`/dashboard/${userRole}`}
                className={`text-sm font-medium transition-colors relative py-1 ${
                  pathname.startsWith("/dashboard") ? "text-[#F59E0B] font-semibold" : "text-slate-400 hover:text-[#FFFFFF]"
                }`}
              >
                Dashboard
                {pathname.startsWith("/dashboard") && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#F59E0B] rounded-full" />
                )}
              </Link>
            )}
          </div>

          {/* Right Side: Dynamic Session Conditional Content */}
          <div className="flex items-center">
            {isPending ? (
              <div className="w-8 h-8 rounded-full border-2 border-slate-700 border-t-[#F59E0B] animate-spin" />
            ) : isAuthenticated ? (
              /* LOGGED IN STATUS: SHOW IMAGE WITH LOGOUT INTERACTION DROPDOWN */
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center focus:outline-none focus:ring-2 focus:ring-[#F59E0B] rounded-full"
                >
                  <img
                    className="h-9 w-9 rounded-full object-cover border-2 border-[#F59E0B] cursor-pointer"
                    src={user?.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"}
                    alt={user?.name || "User Avatar"}
                  />
                </button>

                {/* Secure Native Fallback Profile Menu Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl bg-[#0F172A] border border-slate-800 shadow-xl py-2 text-white z-50">
                    <div className="px-4 py-2 border-b border-slate-800/80">
                      <p className="font-normal text-slate-400 text-[11px]">Signed in as</p>
                      <p className="font-semibold text-sm truncate text-white">{user?.email}</p>
                    </div>
                    
                    <div className="px-4 py-1.5 capitalize text-[11px] text-slate-400">
                      Role: <span className="text-[#F59E0B] font-semibold">{userRole}</span>
                    </div>

                    <Link 
                      href={`/dashboard/${userRole}`}
                      onClick={() => setIsProfileOpen(false)}
                      className="block w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 transition-colors"
                    >
                      My Dashboard
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-rose-400 hover:bg-rose-950/30 transition-colors border-t border-slate-800/60 mt-1"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* LOGGED OUT STATUS: SHOW LOGIN AND SIGNUP ACTIONS */
              <div className="flex items-center gap-4">
                <Link 
                  href="/login" 
                  className="text-sm font-medium text-[#FFFFFF] hover:bg-slate-800 px-3 py-1.5 rounded-md transition-colors"
                >
                  Login
                </Link>
                
                <Link 
                  href="/register" 
                  className="text-sm font-semibold bg-[#F59E0B] text-[#0F172A] px-4 py-1.5 rounded-md shadow-lg shadow-amber-500/20 hover:bg-amber-600 transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMenuOpen && (
        <div className="sm:hidden bg-[#0F172A] border-t border-slate-800 px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={`block rounded-md px-3 py-2 text-base font-medium ${
                isActive(link.href) ? "bg-slate-800 text-[#F59E0B] font-bold" : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {isAuthenticated && (
            <Link
              href={`/dashboard/${userRole}`}
              onClick={() => setIsMenuOpen(false)}
              className={`block rounded-md px-3 py-2 text-base font-medium ${
                pathname.startsWith("/dashboard") ? "bg-slate-800 text-[#F59E0B] font-bold" : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              Dashboard <span className="text-[10px] uppercase px-2 py-0.5 rounded bg-slate-900 text-amber-400 ml-2">{userRole}</span>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}