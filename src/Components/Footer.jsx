"use client";

import React from "react";
import Link from "next/link";

export default function AppFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#0F172A] border-t border-slate-800 text-[#FFFFFF] pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: Brand & About */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
              <span className="w-3 h-6 rounded-sm bg-[#F59E0B]" />
              <span className="text-[#FFFFFF]">
                Apex<span className="text-[#F59E0B]">Fit</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Elevate your fitness journey with our premium gym management platform. Discover classes, join a passionate community, and track your metrics effortlessly.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-[#F59E0B] uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-slate-400 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/classes" className="text-slate-400 hover:text-white transition-colors">All Classes</Link>
              </li>
              <li>
                <Link href="/forum" className="text-slate-400 hover:text-white transition-colors">Community Forum</Link>
              </li>
              <li>
                <Link href="/privacy" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Information */}
          <div>
            <h3 className="text-sm font-semibold text-[#F59E0B] uppercase tracking-wider mb-4">
              Contact Info
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <svg className="h-5 w-5 text-[#F59E0B] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0  z" />
                </svg>
                <span>Banani, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="h-5 w-5 text-[#F59E0B] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+880 1234-567890</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="h-5 w-5 text-[#F59E0B] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="break-all">support@apexfit.com</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Social Media Links */}
          <div>
            <h3 className="text-sm font-semibold text-[#F59E0B] uppercase tracking-wider mb-4">
              Follow Us
            </h3>
            <div className="flex items-center gap-4">
              {/* X (formerly Twitter) Logo */}
              <a 
                href="https://x.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all focus:outline-none"
                aria-label="Follow us on X"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Facebook */}
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all focus:outline-none"
                aria-label="Follow us on Facebook"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>

              {/* Instagram */}
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all focus:outline-none"
                aria-label="Follow us on Instagram"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.717.01 3.674.053 1.474.067 2.272.311 2.804.518.705.275 1.208.603 1.738 1.133.53.53.858 1.033 1.133 1.738.208.53.452 1.328.518 2.804.043.957.053 1.243.053 3.674s-.01 2.717-.053 3.674c-.067 1.474-.311 2.272-.518 2.804-.275.705-.603 1.208-1.133 1.738-.53.53-1.033.858-1.738 1.133-.53.208-1.328.452-2.804.518-.957.043-1.243.053-3.674.053s-2.717-.01-3.674-.053c-1.474-.067-2.272-.311-2.804-.518-.705-.275-1.208-.603-1.738-1.133-.53-.53-.858-1.033-1.133-1.738-.208-.53-.452-1.328-.518-2.804-.043-.957-.053-1.243-.053-3.674s.01-2.717.053-3.674c.067-1.474.311-2.272.518-2.804.275-.705.603-1.208 1.133-1.738.53-.53 1.033-.858 1.738-1.133.53-.208 1.328-.452 2.804-.518.958-.043 1.242-.053 3.674-.053zM12 6.865A5.135 5.135 0 1017.135 12 5.135 5.135 0 0012 6.865zm0 8.468A3.333 3.333 0 1115.333 12 3.333 3.333 0 0112 15.333zm5.94-8.796a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Divider & Copyright */}
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} ApexFit. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Cookies Settings</a>
          </div>
        </div>

      </div>
    </footer>
  );
}