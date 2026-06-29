"use client"; // এটি অবশ্যই একদম শুরুতে থাকতে হবে
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client"; 
import { toast } from "react-toastify"; 

export default function ClassDetailsClient({ initialClassData }) {
  const params = useParams(); 
  const id = params.id;
  const router = useRouter();
  

  const { data: session } = authClient.useSession(); 

  const [classData, setClassData] = useState(initialClassData);
  const [loading, setLoading] = useState(false); 
  const [hasBooked, setHasBooked] = useState(false);
  const [hasFavorited, setHasFavorited] = useState(false);
  useEffect(() => {
     if (!id) return;
 
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/classes/${id}`
     )
        .then((res) => res.json())
        .then((data) => {
          setClassData(data);
          
          // Fetch User Specific Status
          if (session?.user?.email) {
            fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/classes/${id}/status`, {
              method: "POST",
             
              body: JSON.stringify({ email: session.user.email }),
            })
              .then((res) => res.json())
              .then((status) => {
                setHasBooked(status.hasBooked);
                setHasFavorited(status.hasFavorited);
              });
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error:", err);
          setLoading(false);
        });
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
  
      /*router.push(`/payment?classId=${id}&price=${classData.price}&name=${encodeURIComponent(classData.name)}`);*/
      router.push(`/payment?classId=${id}&price=${classData?.price}&name=${encodeURIComponent(classData?.className || classData?.name || "Fitness Class")}`);

    };
  
    const handleFavoriteToggle = async () => {
      if (!session?.user?.email) {
        toast.error("Please login to manage favorites");
        return;
      }
      // API logic for favorite toggle...
    };
  
    /*if (loading) return <div>Loading...</div>;
    if (!classData) return <div>Class not found</div>;*/
  
    return (
      <div className="min-h-screen bg-[#090D1A] text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Banner Frame */}
          <div className="relative h-72 w-full rounded-3xl overflow-hidden bg-slate-900 border border-slate-800/60 shadow-xl flex items-end">
             <img className="absolute inset-0 w-full h-full object-cover opacity-60" src={classData.image} alt={classData.name} />
             <div className="relative p-8 z-10">
                <h1 className="text-3xl font-extrabold">{classData.name}</h1>
                <p className="text-xs text-slate-400">by {classData.trainerName}</p>
             </div>
             <div className="absolute right-8 bottom-8 text-right z-10">
                <span className="text-4xl font-black text-amber-400">${classData.price}</span>
             </div>
          </div>
  
          {/* Info Grid Layer */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-[#0F1424] border border-slate-800/80 rounded-2xl p-6">
                <h3 className="text-sm font-bold text-slate-300 uppercase mb-3">📑 About This Class</h3>
                <p className="text-sm text-slate-400">{classData.description}</p>
              </div>
            </div>
  
            {/* Action Panel */}
            <div className="space-y-4">
              <div className="bg-[#0F1424] border border-slate-800/80 rounded-2xl p-6 space-y-4">
                <p className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-2 rounded-lg">
                  🕒 {Array.isArray(classData.scheduleDays) ? classData.scheduleDays.join(", ") : classData.scheduleDays} at {classData.scheduleTime}
                </p>
                <button
                  onClick={handleBookingRedirect}
                  disabled={hasBooked}
                  className={`w-full h-12 rounded-xl font-extrabold ${hasBooked ? "bg-slate-800 cursor-not-allowed" : "bg-[#F59E0B] text-black"}`}
                >
                  {hasBooked ? "🔒 Already Booked" : `Book Now — $${classData.price}`}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}