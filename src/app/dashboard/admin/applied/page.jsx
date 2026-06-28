"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AppliedTrainers() {
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null); // মডাল ট্র্যাকিং স্টেট
  const [feedback, setFeedback] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchApplications = () => {
    fetch("http://localhost:5000/api/admin/applications/pending") // পেন্ডিং অ্যাপ্লিকেশনের এন্ডপয়েন্ট
      .then((res) => res.json())
      .then((data) => setApplications(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleReview = async (action) => {
    if (action === "reject" && !feedback.trim()) {
      toast.error("Please provide feedback before rejecting an application.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`http://localhost:5000/api/admin/trainers/review/${selectedApp._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action,
          feedback,
          userEmail: selectedApp.email, // ইউজার রোল আপডেট করার জন্য পাঠানো হচ্ছে
        }),
      });

      if (res.ok) {
        toast.success(`Application ${action === "approve" ? "Approved" : "Rejected"} Successfully!`);
        setSelectedApp(null);
        setFeedback("");
        fetchApplications();
      } else {
        toast.error("Failed to update application state.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server synchronization error.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 bg-[#090D1A] min-h-screen text-white space-y-6">
      <h1 className="text-xl font-bold tracking-tight">📩 Pending Trainer Applications</h1>

      <div className="overflow-x-auto bg-[#0F1424] border border-slate-800 rounded-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-xs text-slate-400 uppercase font-mono bg-slate-900/40">
              <th className="p-4">Applicant Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Specialty</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-slate-800/60">
            {applications.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-8 text-center text-slate-500 font-medium">No pending trainer applications found.</td>
              </tr>
            ) : (
              applications.map((app) => (
                <tr key={app._id} className="hover:bg-slate-900/20 transition-colors">
                  <td className="p-4 font-semibold text-slate-200">{app.name}</td>
                  <td className="p-4 text-slate-400 font-mono text-xs">{app.email}</td>
                  <td className="p-4 text-amber-400 font-medium">{app.specialty || "General Fitness"}</td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => setSelectedApp(app)}
                      className="px-4 py-1.5 bg-slate-900 border border-slate-800 hover:border-amber-500 text-slate-300 hover:text-amber-500 font-bold rounded-xl text-xs transition-all"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 📊 APPLICANT DETAILS POPUP MODAL FRAME */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#0F1424] border border-slate-800 p-6 rounded-2xl w-full max-w-lg space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-white">{selectedApp.name}</h3>
                <p className="text-xs text-slate-400 font-mono">{selectedApp.email}</p>
              </div>
              <button onClick={() => setSelectedApp(null)} className="text-slate-500 hover:text-white font-bold text-lg">✕</button>
            </div>

            <div className="border-t border-b border-slate-800/60 py-3 space-y-2 text-sm text-slate-300">
              <p>🎯 <span className="font-bold text-slate-400">Specialty:</span> {selectedApp.specialty}</p>
              <p>⏳ <span className="font-bold text-slate-400">Experience:</span> {selectedApp.experience} Years</p>
              <p>🕒 <span className="font-bold text-slate-400">Available Time:</span> {selectedApp.availableTime || "Not Specified"}</p>
            </div>

            {/* Admin Feedback Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Admin Feedback / Review Note</label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Write feedback reason (Required for Rejection)..."
                className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500 h-24 rounded-xl p-3 text-white text-xs outline-none resize-none placeholder-slate-600 transition-all"
              />
            </div>

            {/* Action Call Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                disabled={submitting}
                onClick={() => handleReview("reject")}
                className="h-10 bg-rose-600/10 hover:bg-rose-600 border border-rose-500/30 text-rose-400 hover:text-white font-bold rounded-xl text-xs transition-all uppercase tracking-wider disabled:opacity-50"
              >
                Reject Application
              </button>
              <button
                disabled={submitting}
                onClick={() => handleReview("approve")}
                className="h-10 bg-amber-500 hover:bg-amber-600 text-black font-black rounded-xl text-xs transition-all uppercase tracking-wider disabled:opacity-50"
              >
                Approve & Promote
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}