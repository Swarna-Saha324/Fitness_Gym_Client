"use client";

import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function CheckoutForm({ clientSecret, classDetails, userContext }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) return;

    setProcessing(true);

    const card = elements.getElement(CardElement);
    if (card === null) return;

    // Confirm total charge intent execution
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: userContext.name || "Anonymous Student",
          email: userContext.email || "unknown@user.com",
        },
      },
    });

    if (error) {
      toast.error(error.message);
      setProcessing(false);
    } else if (paymentIntent.status === "succeeded") {
      toast.success(`Payment Secured! ID: ${paymentIntent.id}`);
      
      // Hit database confirmation route array
      try {
        const confirmRes = await fetch("http://localhost:5000/api/bookings/confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            classId: classDetails.id,
            className: classDetails.name,
            price: parseFloat(classDetails.price),
            trainerEmail: classDetails.trainerEmail,
            trainerName: classDetails.trainerName,
            userEmail: userContext.email,
            userName: userContext.name,
            transactionId: paymentIntent.id
          }),
          
        });

        if (confirmRes.ok) {
          router.push("/dashboard/member/booked");
        }

        if (confirmRes.ok) {
  await fetch(`http://localhost:5000/api/classes/increment-booking/${classDetails.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail: userContext.email })
    });
    
    router.push("/dashboard/member/booked");
    
   );
  }
      } catch (err) {
        console.error("Confirmation routine error:", err);
      } finally {
        setProcessing(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "14px",
                color: "#ffffff",
                "::placeholder": { color: "#64748b" },
              },
              invalid: { color: "#f43f5e" },
            },
          }}
        />
      </div>

      <button
        type="submit"
        disabled={!stripe || processing || !clientSecret}
        className="w-full h-12 bg-[#F59E0B] hover:bg-amber-500 disabled:bg-slate-800 text-black disabled:text-slate-500 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all shadow-md active:scale-[0.99]"
      >
        {processing ? "🔄 Finalizing Secure Transaction..." : `Pay Now $${classDetails.price}`}
      </button>
    </form>
  );
}