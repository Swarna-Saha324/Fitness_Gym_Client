"use client";

import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function AddForumPost() {
  const { data: session } = authClient.useSession();
  const [loading, setLoading] = useState(false);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const imageFile = form.image.files[0];

    try {
      // 📸 1. Imgbb Image Upload Pipeline
      const formData = new FormData();
      formData.append("image", imageFile);

      // আপনার Imgbb API Key এখানে বসাবেন (.env.local এ রাখা ভালো)
      const imgbbKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY || "YOUR_IMGBB_API_KEY"; 
      const imgbbRes = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
        method: "POST",
        body: formData,
      });
      const imgbbData = await imgbbRes.json();

      if (!imgbbData.success) {
        throw new Error("Image upload failed to Imgbb.");
      }

      const imageUrl = imgbbData.data.url;

      // 💾 2. Save Forum Post into Database
      const postPayload = {
        title,
        description,
        image: imageUrl,
        authorName: session?.user?.name || "Admin",
        authorEmail: session?.user?.email,
        authorRole: "admin", // Explicitly identified as admin post
        createdAt: new Date(),
        upVotes: [],
        downVotes: []
      };

      //const res = await fetch("http://localhost:5000/api/forums", {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/forums"`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postPayload),
      });

      if (res.ok) {
        toast.success("📣 Forum Post Published Successfully!");
        form.reset();
      } else {
        toast.error("Failed to post on Community Forum.");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Server Error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-[#090D1A] min-h-screen text-white space-y-6 max-w-3xl">
      <h1 className="text-xl font-bold tracking-tight">📣 Contribute to Community Forum</h1>

      <form onSubmit={handleCreatePost} className="bg-[#0F1424] border border-slate-800 p-6 rounded-2xl space-y-4 shadow-lg">
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Post Title</label>
          <input
            type="text"
            name="title"
            required
            placeholder="Enter a catchy title for the community..."
            className="w-full h-11 bg-slate-900 border border-slate-800 focus:border-amber-500 rounded-xl px-4 text-sm text-white outline-none transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Cover Image</label>
          <input
            type="file"
            name="image"
            required
            accept="image/*"
            className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-amber-500/10 file:text-amber-400 hover:file:bg-amber-500/20 text-slate-500 text-xs cursor-pointer bg-slate-900 border border-slate-800 p-2 rounded-xl outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Article Description</label>
          <textarea
            name="description"
            required
            rows="6"
            placeholder="Share informative fitness tips, guides, or updates..."
            className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500 rounded-xl p-4 text-sm text-white outline-none resize-none placeholder-slate-600 transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 bg-amber-500 hover:bg-amber-600 text-black font-black rounded-xl text-xs uppercase tracking-wider transition-all disabled:opacity-50"
        >
          {loading ? "Publishing Post..." : "Publish Forum Post"}
        </button>
      </form>
    </div>
  );
}