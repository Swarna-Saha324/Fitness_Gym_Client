"use client";

import React, { useEffect, useState, Suspense } from "react"; // Added Suspense
import { useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { authClient } from "@/lib/auth-client";
import CheckoutForm from "@/Components/CheckoutForm";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

// 🔄 Main core functional logic wrapped inside a sub-component
function PaymentContent() {
  const searchParams = useSearchParams();
  const { data: session } = authClient.useSession();
  
  const classId = searchParams.get("classId");
  const price = searchParams.get("price");
  const className = searchParams.get("name");

  const [clientSecret, setClientSecret] = useState("");
  const [classDetails, setClassDetails] = useState(null);

  useEffect(() => {
    if (!classId || !price) return;

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/classes/${classId}`)
      .then((res) => res.json())
      .then((data) => {
        setClassDetails({
          id: classId,
          name: className || data.name,
          price: price || data.price,
          trainerName: data.trainerName,
          trainerEmail: data.trainerEmail
        });
      });

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price: parseFloat(price) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch((err) => console.error("Payment Intent retrieval flow failed", err));

  }, [classId, price, className]);

  

  if (!session) {
    return <div className="text-center py-20 text-slate-400">Verifying session context matrix...</div>;
  }

  if (!classDetails) {
    return <div className="text-center py-20 text-slate-400">Loading checkout breakdown layout...</div>;
  }

  return (
    <div className="min-h-screen bg-[#090D1A] text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
        <div className="md:col-span-3 bg-[#0F1424] border border-slate-800/80 rounded-2xl p-6 space-y-5">
          <h2 className="text-lg font-bold border-b border-slate-800 pb-3 text-slate-200">🧾 Booking Summary Ledger</h2>
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Selected Class</span>
              <p className="text-base font-extrabold text-white mt-0.5">{classDetails.name}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-1">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Expert Trainer</span>
                <p className="text-xs font-semibold text-slate-300 mt-0.5">{classDetails.trainerName || "Verified Professional"}</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Billing Client</span>
                <p className="text-xs font-semibold text-slate-300 mt-0.5 line-clamp-1">{session?.user?.name}</p>
              </div>
            </div>
            <div className="bg-slate-900/60 border border-slate-800/40 p-4 rounded-xl flex justify-between items-center mt-2">
              <span className="text-xs font-bold text-slate-400">Total Charged Amount</span>
              <span className="text-xl font-black text-amber-400">${classDetails.price}</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 bg-[#0F1424] border border-slate-800/80 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">🔒 Secure Checkout</h3>
            <p className="text-[10px] text-slate-500 font-medium">Encrypted card authorization layer standard protocol.</p>
          </div>
          {clientSecret && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm 
                clientSecret={clientSecret} 
                classDetails={classDetails} 
                userContext={{ name: session.user.name, email: session.user.email }} 
              />
            </Elements>
          )}
        </div>
      </div>
    </div>
  );
}

// 🎯 Export Default always stays clean with Suspense Guard
export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-slate-400">Loading Router Context...</div>}>
      <PaymentContent />
    </Suspense>
  );
}