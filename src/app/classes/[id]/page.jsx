"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify"; // Ensure react-hot-toast or similar package is installed

export default function ClassDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = authClient.useSession();
  
  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasBooked, setHasBooked] = useState(false);
  const [hasFavorited, setHasFavorited] = useState(false);

  useEffect(() => {
    if (!id) return;

    // Fetch master core class configuration profile 
    fetch(`http://localhost:5000/api/classes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setClassData(data);
        
        // Fetch conditional states if user context session validation exists
        if (session?.user?.email) {
          fetch(`http://localhost:5000/api/classes/${id}/status`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: session.user.email }),
          })
            .then((res) => res.json())
            .then((status) => {
              setHasBooked(status.hasBooked);
              setHasFavorited(status.hasFavorited);
              setLoading(false);
            });
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id, session]);

 // 🎯 BOOK NOW ACTION TRIGGER PIPELINE
  const handleBookingRedirect = () => {
    if (!session) {
      toast.error("Please login to book a class");
      return;
    }

    // 🚨 STRICT ROLE VALIDATION GUARD
    if (session?.user?.role === "trainer" || session?.user?.role === "admin") {
      toast.error("Trainers or Admins are unauthorized to book training sessions!");
      return;
    }

    if (hasBooked) {
      toast.error("You have already booked this class");
      return;
    }
    
    const targetName = classData?.name || classData?.className || "Fitness Class";
    const targetPrice = classData?.price || 0;

    router.push(`/payment?classId=${classData._id}&price=${targetPrice}&name=${encodeURIComponent(targetName)}`);
  };

  // 🎯 CONDITIONAL ADD TO FAVORITES TOGGLE ACTION (এই ফাংশনটি ডিলিট হয়ে গিয়েছিল)
  const handleFavoriteToggle = async () => {
    if (!session) {
      toast.error("Please login to manage favorites");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/favorites/toggle",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            classId: classData._id,
            userEmail: session.user.email,
            className: classData.name,
            image: classData.image,
            price: classData.price,
          }),
        }
      );

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
    return (
      <div className="flex h-[70vh] items-center justify-center bg-[#090D1A]">
        <div className="w-10 h-10 rounded-full border-4 border-slate-800 border-t-[#F59E0B] animate-spin" />
      </div>
    );
  }

  if (!classData) return <div className="text-center py-20 text-slate-400">Class specifications missing.</div>;

  return (
    <div className="min-h-screen bg-[#090D1A] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Banner Frame UI section matching image_53022a.jpg */}
        <div className="relative h-72 w-full rounded-3xl overflow-hidden bg-slate-900 border border-slate-800/60 shadow-xl flex items-end">
          <img 
            className="absolute inset-0 w-full h-full object-cover opacity-60" 
            src={classData.image} 
            alt={classData.name} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090D1A] via-transparent to-transparent" />
          <div className="relative p-8 space-y-2 z-10">
            <div className="flex gap-2">
              <span className="text-[10px] font-bold uppercase bg-slate-950/80 px-2.5 py-1 rounded text-amber-500">{classData.category}</span>
              <span className="text-[10px] font-bold uppercase bg-slate-950/80 px-2.5 py-1 rounded text-purple-400">{classData.difficulty}</span>
            </div>
            <h1 className="text-3xl font-extrabold sm:text-4xl tracking-tight">{classData.name}</h1>
            <p className="text-xs text-slate-400">by {classData.trainerName}</p>
          </div>
          <div className="absolute right-8 bottom-8 text-right z-10">
            <span className="text-4xl font-black text-amber-400">${classData.price}</span>
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500">per session</p>
          </div>
        </div>

        {/* Info Grid Layer Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Main Description Block */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#0F1424] border border-slate-800/80 rounded-2xl p-6 space-y-3">
              <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">📑 About This Class</h3>
              <p className="text-sm text-slate-400 leading-relaxed font-light">{classData.description}</p>
            </div>

            <div className="bg-[#0F1424] border border-slate-800/80 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">⚙️ Class Details Layout</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="bg-slate-900/50 border border-slate-800/40 p-3 rounded-xl text-center">
                  <span className="text-[10px] text-slate-500 font-bold uppercase">⏱️ Duration</span>
                  <p className="text-sm font-bold mt-1 text-slate-300">{classData.duration} Mins</p>
                </div>
                <div className="bg-slate-900/50 border border-slate-800/40 p-3 rounded-xl text-center">
                  <span className="text-[10px] text-slate-500 font-bold uppercase">👥 Enrolled</span>
                  <p className="text-sm font-bold mt-1 text-slate-300">{classData.attendees?.length || 0} Students</p>
                </div>
                <div className="bg-slate-900/50 border border-slate-800/40 p-3 rounded-xl text-center col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-slate-500 font-bold uppercase">📅 Category</span>
                  <p className="text-sm font-bold mt-1 text-slate-300">{classData.category}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Interaction Controls Panel Side Widget */}
          <div className="space-y-4">
            <div className="bg-[#0F1424] border border-slate-800/80 rounded-2xl p-6 space-y-4 shadow-lg">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Weekly Schedule</span>
                <p className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-2 rounded-lg border border-emerald-500/10 inline-block w-full">
                  🕒 {classData.scheduleDays?.join(", ")} at {classData.scheduleTime}
                </p>
              </div>

              {/* 🎯 CONDITIONAL BOOK NOW TRIGGER BUTTON */}
              <button
                onClick={handleBookingRedirect}
                disabled={hasBooked}
                className={`w-full h-12 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all shadow ${
                  hasBooked
                    ? "bg-slate-800 text-slate-500 border border-slate-700/60 cursor-not-allowed"
                    : "bg-[#F59E0B] hover:bg-amber-500 text-black active:scale-[0.98]"
                }`}
              >
                {hasBooked ? "🔒 Already Booked" : `Book Now — $${classData.price}`}
              </button>

              {/* 🎯 CONDITIONAL ADD TO FAVORITES TOGGLE ACTION */}
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