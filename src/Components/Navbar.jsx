"use client";

import React, { useState } from "react";

import { usePathname } from "next/navigation";
import Link from "next/link"; // Next Link verified placement
import {
  Dropdown,
  Avatar,
} from "@heroui/react";

export default function AppNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // --- Mock Authentication State ---
  const isAuthenticated = false; 
  const user = {
    name: "Swarna Saha",
    email: "swarna@example.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    role: "admin", // "member", "trainer", or "admin"
  };

  // Public Navigation Links
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "All Classes", href: "/classes" },
    { label: "Community Forum", href: "/forum" },
  ];

  const isActive = (href) => pathname === href;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-800 bg-[#0F172A]/80 backdrop-blur-md text-[#FFFFFF]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Left Side: Brand & Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            {/* Mobile Burger Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-slate-400 hover:bg-slate-800 hover:text-white sm:hidden focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>

            {/* Brand Logo */}
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
            
            {/* Conditional Dashboard Link */}
            {isAuthenticated && (
              <Link
                href={`/dashboard/${user.role}`}
                className={`text-sm font-medium transition-colors relative py-1 ${
                  isActive("/dashboard") ? "text-[#F59E0B] font-semibold" : "text-slate-400 hover:text-[#FFFFFF]"
                }`}
              >
                Dashboard
                {isActive("/dashboard") && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#F59E0B] rounded-full" />
                )}
              </Link>
            )}
          </div>

          {/* Right Side: Auth Actions / Profile Dropdown */}
          <div className="flex items-center">
            {isAuthenticated ? (
              <Dropdown placement="bottom-end" className="bg-[#0F172A] border border-slate-800 text-[#FFFFFF]">
                <Dropdown.Trigger>
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform border-[#F59E0B] cursor-pointer"
                    color="warning"
                    name={user.name}
                    size="sm"
                    src={user.avatar}
                  />
                </Dropdown.Trigger>
                <Dropdown.Menu aria-label="Profile Actions" className="text-white">
                  <Dropdown.Item key="profile" textValue="Profile Info" className="h-14 border-b border-slate-800 rounded-none">
                    <p className="font-normal text-slate-400 text-xs">Signed in as</p>
                    <p className="font-semibold text-[#FFFFFF]">{user.email}</p>
                  </Dropdown.Item>
                  <Dropdown.Item key="role" textValue="User Role" className="capitalize text-xs text-slate-400">
                    Role: <span className="text-[#F59E0B] font-semibold">{user.role}</span>
                  </Dropdown.Item>
                  <Dropdown.Item key="dashboard" textValue="Dashboard Link" className="hover:bg-slate-800 rounded-md p-0">
                    <Link href={`/dashboard/${user.role}`} className="block w-full h-full px-4 py-2">
                      My Dashboard
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item 
                    key="logout" 
                    textValue="Logout" 
                    color="danger" 
                    className="text-rose-500 hover:bg-rose-950/30 rounded-md"
                  >
                    Log Out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
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

      {/* Mobile Drawer Dropdown Menu */}
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
              href={`/dashboard/${user.role}`}
              onClick={() => setIsMenuOpen(false)}
              className={`block rounded-md px-3 py-2 text-base font-medium ${
                isActive("/dashboard") ? "bg-slate-800 text-[#F59E0B] font-bold" : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              Dashboard <span className="text-xs uppercase px-2 py-0.5 rounded bg-slate-900 text-amber-400 ml-2">{user.role}</span>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}