"use client";

import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function AddForumPostPage() {
  const { data: session } = authClient.useSession();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });
  const [post, setPost] = useState({ title: "", image: "", description: "" });

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg({ type: "", text: "" });

    if (!session?.user?.email) {
      setMsg({ type: "error", text: "Session missing. Please login again." });
      setLoading(false);
      return;
    }

    // Creating integrated structural object matching backend format criteria
    const forumPayload = {
      title: post.title,
      image: post.image,
      description: post.description,
      trainerEmail: session.user.email,
      trainerName: session.user.name,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/forums`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(forumPayload),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMsg({ type: "success", text: "✓ Forum entry published successfully on public platform layer!" });
        setPost({ title: "", image: "", description: "" }); // Clean forms state tracking
      } else {
        setMsg({ type: "error", text: data.message || "Failed to publish article." });
      }
    } catch (error) {
      setMsg({ type: "error", text: "Failed to connect to the backend server pipeline." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-[#0F1424] border border-slate-800 rounded-2xl p-6">
      <h2 className="text-md font-bold text-white uppercase tracking-wider mb-1">Contribute to Community Forum</h2>
      <p className="text-xs text-slate-400 mb-5">Share educational articles, diet guidelines or insights instantly.</p>
      
      {msg.text && (
        <div className={`p-3 text-xs rounded-xl font-medium mb-4 ${
          msg.type === "success" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
        }`}>
          {msg.text}
        </div>
      )}
      
      <form onSubmit={handlePostSubmit} className="space-y-4">
        <div className="flex flex-col gap-1">
          <label className="text-slate-400 text-xs font-bold">Article Title</label>
          <input 
            type="text" required placeholder="e.g. 5 Rules of Fast Hypertrophy" 
            className="bg-slate-900 border border-slate-800 focus:border-[#F59E0B] rounded-xl px-4 h-11 text-white text-sm outline-none" 
            value={post.title} onChange={e => setPost({...post, title: e.target.value})} 
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-slate-400 text-xs font-bold">Hosted Image Link (Direct ImgBB link with .jpg/.png)</label>
          <input 
            type="url" required placeholder="https://i.ibb.co.com/.../image.jpg"
            className="bg-slate-900 border border-slate-800 focus:border-[#F59E0B] rounded-xl px-4 h-11 text-white text-sm outline-none" 
            value={post.image} onChange={e => setPost({...post, image: e.target.value})} 
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-slate-400 text-xs font-bold">Description Content</label>
          <textarea 
            required rows="5" placeholder="Write comprehensive content guidelines here..."
            className="bg-slate-900 border border-slate-800 focus:border-[#F59E0B] rounded-xl p-4 text-white text-sm outline-none resize-none" 
            value={post.description} onChange={e => setPost({...post, description: e.target.value})} 
          />
        </div>
        <button 
          type="submit" disabled={loading} 
          className="w-full bg-[#F59E0B] text-[#090D1A] font-bold h-11 rounded-xl text-sm transition-all hover:bg-amber-600 disabled:opacity-50"
        >
          {loading ? "Uploading Post Array..." : "Publish Forum Entry"}
        </button>
      </form>
    </div>
  );
}