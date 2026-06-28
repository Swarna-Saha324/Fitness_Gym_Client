"use client";
import React, { useEffect, useState } from "react";

export default function TransactionsLog() {
  const [txHistory, setTxHistory] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/transactions")
      .then(res => res.json())
      .then(data => setTxHistory(data));
  }, []);

  return (
    <div className="p-6 bg-[#090D1A] min-h-screen text-white space-y-6">
      <h1 className="text-xl font-bold tracking-tight">💳 Stripe Payment Ledger</h1>
      
      <div className="overflow-x-auto bg-[#0F1424] border border-slate-800 rounded-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-xs text-slate-400 bg-slate-900/40 font-mono">
              <th className="p-4">User Email</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Transaction ID</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-slate-800/60 font-mono text-slate-300">
            {txHistory.map(tx => (
              <tr key={tx._id} className="hover:bg-slate-900/20">
                <td className="p-4 text-slate-200 font-sans">{tx.userEmail}</td>
                <td className="p-4 text-amber-400 font-bold">${tx.price}</td>
                <td className="p-4 text-xs text-slate-400">{tx.transactionId}</td>
                <td className="p-4 text-xs text-slate-500">{new Date(tx.bookingDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}