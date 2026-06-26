"use client";

import React, { useState } from "react";

export default function AddForumPostPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [post, setPost] = useState({ title: "", image: "", description: "" });

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSuccess(true); setPost({ title: "", image: "", description: "" }); }, 1000);
  };

  return (
    <div className="max-w-xl mx-auto bg-[#0F1424] border border-slate-800 rounded-2xl p-6">
      <h2 className="text-md font-bold text-white uppercase tracking-wider mb-1">Contribute to Community Forum</h2>
      <p className="text-xs text-slate-400 mb-5">Share educational articles, diet guidelines or insights instantly.</p>
      
      {success && <div className="p-3 bg-emerald-500/10 text-emerald-400 text-xs rounded-xl font-medium mb-4">✓ Forum entry published successfully on public platform layer!</div>}
      
      <form onSubmit={handlePostSubmit} className="space-y-4">
        <div className="flex flex-col gap-1"><label className="text-slate-400 text-xs font-bold">Article Title</label>
          <input type="text" required placeholder="e.g. 5 Rules of Fast Hypertrophy" className="bg-slate-900 border border-slate-800 focus:border-[#F59E0B] rounded-xl px-4 h-11 text-white text-sm outline-none" value={post.title} onChange={e => setPost({...post, title: e.target.value})} />
        </div>
        <div className="flex flex-col gap-1"><label className="text-slate-400 text-xs font-bold">Hosted Image Link (Imgbb/Unsplash)</label>
          <input type="url" required className="bg-slate-900 border border-slate-800 focus:border-[#F59E0B] rounded-xl px-4 h-11 text-white text-sm outline-none" value={post.image} onChange={e => setPost({...post, image: e.target.value})} />
        </div>
        <div className="flex flex-col gap-1"><label className="text-slate-400 text-xs font-bold">Description Content</label>
          <textarea required rows="5" className="bg-slate-900 border border-slate-800 focus:border-[#F59E0B] rounded-xl p-4 text-white text-sm outline-none resize-none" value={post.description} onChange={e => setPost({...post, description: e.target.value})} />
        </div>
        <button type="submit" disabled={loading} className="w-full bg-[#F59E0B] text-[#090D1A] font-bold h-11 rounded-xl text-sm transition-all">{loading ? "Uploading Post Array..." : "Publish Forum Entry"}</button>
      </form>
    </div>
  );
}