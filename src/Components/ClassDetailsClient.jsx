"use client"; 

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client"; 
import { toast } from "react-toastify"; 

export default function ClassDetailsClient({ initialClassData }) {
  const params = useParams(); 
  const id = params?.id;
  const router = useRouter();
  
  const { data: session } = authClient.useSession(); 

  const [classData, setClassData] = useState(initialClassData);
  const [loading, setLoading] = useState(!initialClassData); // initialData থাকলে লোডিং ফলস হবে
  const [hasBooked, setHasBooked] = useState(false);
  const [hasFavorited, setHasFavorited] = useState(false);

  useEffect(() => {
    if (!id) return;
 
    
    if (session?.user?.email) {
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/classes/${id}/status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: session.user.email }),
      })
        .then((res) => res.json())
        .then((status) => {
          setHasBooked(status.hasBooked);
          setHasFavorited(status.hasFavorited);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Status check error:", err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [id, session]);
  
  const handleBookingRedirect = () => {
    if (!session?.user?.email) {
      toast.error("Please login to book a class");
      return;
    }
    // Strict Role Guard
    if (session.user.role === "trainer" || session.user.role === "admin") {
      toast.error("Trainers or Admins are unauthorized to book training sessions!");
      return;
    }
    if (hasBooked) {
      toast.error("You have already booked this class");
      return;
    }

    router.push(`/payment?classId=${id}&price=${classData?.price}&name=${encodeURIComponent(classData?.title || classData?.name || "Fitness Class")}`);
  };
  
  const handleFavoriteToggle = async () => {
    if (!session?.user?.email) {
      toast.error("Please login to manage favorites");
      return;
    }
    
    try {
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/favorites/toggle`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          classId: classData?._id,
          userEmail: session.user.email,
          className: classData?.title || classData?.name,
          image: classData?.image,
          price: classData?.price,
        }),
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        setHasFavorited(resData.isFavorited);
        if (resData.isFavorited) {
          toast.success("Successfully added to Favorites!");
        } else {
          toast.success("Removed from Favorites");
        }
      } else {
        toast.error(resData.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server Error");
    }
  };

  
  if (loading) {
    return <div className="min-h-screen bg-[#090D1A] text-white flex items-center justify-center">Loading...</div>;
  }

  if (!classData) {
    return <div className="min-h-screen bg-[#090D1A] text-white flex items-center justify-center">Class not found</div>;
  }
  
  return (
    <div className="min-h-screen bg-[#090D1A] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Banner Frame */}
        <div className="relative h-72 w-full rounded-3xl overflow-hidden bg-slate-900 border border-slate-800/60 shadow-xl flex items-end">
        <img 
  className="absolute inset-0 w-full h-full object-cover opacity-60" 
  src={classData?.image} 
  alt={classData?.title || classData?.name} 
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = "https://unsplash.com";
  }} 
/>

           <div className="relative p-8 z-10">
              <h1 className="text-3xl font-extrabold">{classData?.title || classData?.name}</h1>
              <p className="text-xs text-slate-400">by {classData?.trainer || classData?.trainerName}</p>
           </div>
           <div className="absolute right-8 bottom-8 text-right z-10">
              <span className="text-4xl font-black text-amber-400">${classData?.price}</span>
           </div>
        </div>

        {/* Info Grid Layer */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#0F1424] border border-slate-800/80 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-slate-300 uppercase mb-3">📑 About This Class</h3>
              <p className="text-sm text-slate-400">{classData?.description}</p>
            </div>

            <div className="bg-[#0F1424] border border-slate-800/80 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">⚙️ Class Details Layout</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="bg-slate-900/50 border border-slate-800/40 p-3 rounded-xl text-center">
                  <span className="text-[10px] text-slate-500 font-bold uppercase">⏱️ Duration</span>
                  <p className="text-sm font-bold mt-1 text-slate-300">{classData?.duration}</p>
                </div>
                <div className="bg-slate-900/50 border border-slate-800/40 p-3 rounded-xl text-center">
                  <span className="text-[10px] text-slate-500 font-bold uppercase">👥 Enrolled</span>
                  <p className="text-sm font-bold mt-1 text-slate-300">{classData?.attendees?.length || classData?.bookedSlots || 0} Students</p>
                </div>
                <div className="bg-slate-900/50 border border-slate-800/40 p-3 rounded-xl text-center col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-slate-500 font-bold uppercase">📅 Category</span>
                  <p className="text-sm font-bold mt-1 text-slate-300">{classData?.category}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Panel */}
          <div className="space-y-4">
            <div className="bg-[#0F1424] border border-slate-800/80 rounded-2xl p-6 space-y-4">
              <p className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-2 rounded-lg">
                🕒 {classData?.schedule || "Schedule not available"}
              </p>
              <button
                onClick={handleBookingRedirect}
                disabled={hasBooked}
                className={`w-full h-12 rounded-xl font-extrabold transition-all ${hasBooked ? "bg-slate-800 text-slate-500 cursor-not-allowed" : "bg-[#F59E0B] hover:bg-amber-600 text-black"}`}
              >
                {hasBooked ? "🔒 Already Booked" : `Book Now — $${classData?.price}`}
              </button>
              
              <button
                onClick={handleFavoriteToggle}
                className={`w-full h-11 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all ${
                  hasFavorited
                    ? "bg-rose-500/10 text-rose-400 border-rose-500/30 hover:bg-rose-500/20"
                    : "bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700"
                }`}
              >
                <span>❤️</span>
                {hasFavorited ? "Remove Favorite" : "Add to Favorites"}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
