"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function CommunityForumPage() {
  const { data: session } = authClient.useSession();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Core global data load initialization logic 
  const fetchForumFeed = () => {
   // fetch ("http://localhost:5000/api/forums")
   fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/forums`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed loading public community dataset stream:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchForumFeed();
  }, []);

  // ... আগের ইমপোর্টগুলো
const handleVoteAction = async (postId, type) => {
  const userEmail = session?.user?.email; 

  if (!userEmail) {
    alert("Please login to vote!");
    return;
  }

  try {
   // const response = await fetch(`http://localhost:5000/api/forum/${postId}/vote`, {
   const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/forum/${postId}/vote`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        voteType: type, 
        userEmail: userEmail 
      })
    });

    const data = await response.json();
    
   if (data.success) {
       
        setPosts(prev => prev.map(p => {
          if (p._id === postId) {
            
            const newUpVotes = type === "upvote" 
              ? [...new Set([...(p.upVotes || []), userEmail])] 
              : (p.upVotes || []).filter(e => e !== userEmail);
            
            const newDownVotes = type === "downvote" 
              ? [...new Set([...(p.downVotes || []), userEmail])] 
              : (p.downVotes || []).filter(e => e !== userEmail);

            return { ...p, upVotes: newUpVotes, downVotes: newDownVotes };
          }
          return p;
        }));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const truncateText = (text, maxLength = 110) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center bg-[#090D1A]">
        <div className="w-10 h-10 rounded-full border-4 border-slate-800 border-t-[#F59E0B] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090D1A] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Community Forum</h1>
          <p className="text-xs text-slate-400 max-w-xl mx-auto">Insights & tips shared by professional trainers and admins.</p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-16 bg-[#0F1424] border border-slate-800 rounded-2xl max-w-md mx-auto">
            <p className="text-slate-400 text-sm font-medium">No articles published yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => {
              const isAdmin = post.trainerEmail === "admin@ironpulse.com" || post.isAdminPost;

              return (
                <div key={post._id} className="bg-[#0F1424] border border-slate-800/80 rounded-2xl overflow-hidden hover:border-slate-700 transition-all duration-300 flex flex-col justify-between">
                  
                  <div className="relative w-full h-48 bg-slate-900">
                    <img
                      className="w-full h-full object-cover"
                      src={post.image || "https://images.unsplash.com/photo-1517838277536-f5f99be501cd"}
                      alt={post.title}
                      onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1517838277536-f5f99be501cd"; }}
                    />
                    <span className={`absolute top-3 left-3 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md shadow ${
                      isAdmin ? "bg-purple-600 text-white" : "bg-amber-500 text-black"
                    }`}>
                      {isAdmin ? "Admin" : "Trainer"}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                        <span>By {post.trainerName || "Verified Specialist"}</span>
                        <span>•</span>
                        <span>{post.createdAt ? new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "Jun 25, 2026"}</span>
                      </div>
                      <h3 className="text-base font-bold text-white line-clamp-2">{post.title}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">{truncateText(post.description)}</p>
                    </div>

                    {/* VOTE TRIGGER BUTTONS COMPONENT GROUP CONTROLLER */}
                    <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between">
                      <div className="flex items-center gap-4 text-slate-400 text-xs">
                        {/* 👍 Thumbs Up Click Trigger */}
                       <button 
                    onClick={() => handleVoteAction(post._id, "upvote")}
                    className="flex items-center gap-1.5 hover:text-emerald-400 bg-slate-900 px-3 py-1.5 rounded-lg"
                  >
                    <span>👍</span>
                    <span className="font-semibold">{post.upVotes?.length || 0}</span>
                  </button>

                  <button 
                    onClick={() => handleVoteAction(post._id, "downvote")}
                    className="flex items-center gap-1.5 hover:text-rose-400 bg-slate-900 px-3 py-1.5 rounded-lg"
                  >
                    <span>👎</span>
                    <span className="font-semibold">{post.downVotes?.length || 0}</span>
                  </button>
                      </div>

                      <Link
                        href={`/community-forum/${post._id}`}
                        className="bg-slate-900 border border-slate-800 hover:border-[#F59E0B] hover:text-[#F59E0B] text-slate-300 text-xs font-bold px-4 py-2 rounded-xl transition-all"
                      >
                        Read More
                      </Link>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}