"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ManageForums() {
  const [posts, setPosts] = useState([]);

  const fetchAllForums = () => {
    fetch("http://localhost:5000/api/forums") // পাবলিক ফোরামের সব ডেটা রিড করার এন্ডপয়েন্ট
      .then((res) => res.json())
      .then((data) => setPosts(data || []))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchAllForums();
  }, []);

  const handleDeletePost = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this community post permanently?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/api/admin/forums/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("💥 Post removed by Admin Moderation successfully.");
        fetchAllForums(); // টেবিল রিফ্রেশ
      } else {
        toast.error("Failed to delete the forum post.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Moderation request pipeline failed.");
    }
  };

  return (
    <div className="p-6 bg-[#090D1A] min-h-screen text-white space-y-6">
      <h1 className="text-xl font-bold tracking-tight">🛡️ Global Community Moderation</h1>

      <div className="overflow-x-auto bg-[#0F1424] border border-slate-800 rounded-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-xs text-slate-400 uppercase font-mono bg-slate-900/40">
              <th className="p-4">Post Title</th>
              <th className="p-4">Author Email</th>
              <th className="p-4">Role Badge</th>
              <th className="p-4 text-center">Moderation Action</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-slate-800/60">
            {posts.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-8 text-center text-slate-500 font-medium">No community posts available on the platform feed.</td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post._id} className="hover:bg-slate-900/20 transition-colors">
                  <td className="p-4 font-semibold text-slate-200 max-w-xs truncate">{post.title}</td>
                  <td className="p-4 text-slate-400 font-mono text-xs">{post.authorEmail}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      post.authorRole === "admin" ? "bg-amber-500/10 text-amber-400" :
                      post.authorRole === "trainer" ? "bg-blue-500/10 text-blue-400" : "bg-slate-800 text-slate-400"
                    }`}>
                      {post.authorRole || "User"}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleDeletePost(post._id)}
                      className="px-3 py-1 bg-red-600/10 hover:bg-red-600 border border-red-500/30 text-red-400 hover:text-white font-bold rounded-lg text-xs transition-all"
                    >
                      Delete Post
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}