"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`) // Ensure you have a global get users route
      .then(res => res.json())
      .then(data => setUsers(data));
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleAction = async (id, action) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action })
    });
    if (res.ok) {
      toast.success(`User updated configuration: ${action}`);
      fetchUsers(); // Refresh Table pipeline
    }
  };

  return (
    <div className="p-6 bg-[#090D1A] min-h-screen text-white space-y-6">
      <h1 className="text-xl font-bold tracking-tight">👥 Manage Platform Registrants</h1>
      
      <div className="overflow-x-auto bg-[#0F1424] border border-slate-800 rounded-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-xs text-slate-400 uppercase font-mono bg-slate-900/40">
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-slate-800/60">
            {users.map(u => (
              <tr key={u._id} className="hover:bg-slate-900/20 transition-colors">
                <td className="p-4 font-semibold text-slate-200">{u.name}</td>
                <td className="p-4 text-slate-400 font-mono text-xs">{u.email}</td>
                <td className="p-4"><span className="px-2 py-0.5 rounded text-xs bg-slate-800 font-bold uppercase">{u.role}</span></td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${u.status === 'blocked' ? 'bg-red-500/10 text-red-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                    {u.status || 'active'}
                  </span>
                </td>
                <td className="p-4 flex gap-2 justify-center">
                  {u.status === "blocked" ? (
                    <button onClick={() => handleAction(u._id, "unblock")} className="px-3 py-1 bg-emerald-500 text-black font-bold rounded-lg text-xs">Unblock</button>
                  ) : (
                    <button onClick={() => handleAction(u._id, "block")} className="px-3 py-1 bg-red-500 text-white font-bold rounded-lg text-xs">Block</button>
                  )}
                  {u.role !== "admin" && (
                    <button onClick={() => handleAction(u._id, "make-admin")} className="px-3 py-1 bg-amber-500 text-black font-bold rounded-lg text-xs">Make Admin</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}