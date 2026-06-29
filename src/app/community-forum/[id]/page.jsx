"use client";
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function PostDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
       // fetch(`http://localhost:5000/api/forums/${id}`)
        fetch(`process.env.NEXT_PUBLIC_BASE_URL/api/forums/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch");
                return res.json();
            })
            .then((data) => {
                setPost(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Fetch Error:", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center text-xl font-semibold bg-slate-950 text-white">
            Loading...
        </div>
    );

    if (!post) return (
        <div className="min-h-screen flex items-center justify-center text-red-500 bg-slate-950">
            Post not found!
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-950 text-white py-12 px-6">
            <div className="max-w-4xl mx-auto bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-800">

               
                <div className="relative w-full h-64 md:h-96 mb-8 rounded-xl overflow-hidden shadow-2xl border border-slate-700">
                    <img 
                        src={post?.image || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48"} 
                        alt={post?.title}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                </div>

                {/* Header Section */}
                <header className="mb-8 border-b border-slate-700 pb-6">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-amber-500 leading-tight">
                        {post?.title}
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-slate-400">
                        <span className="bg-slate-800 px-3 py-1 rounded-full font-medium">
                            By {post?.author || "Anonymous"}
                        </span>
                        <span>•</span>
                        <span>{post?.date || "June 29, 2026"}</span>
                    </div>
                </header>

                {/* Content Section */}
                <article className="prose prose-invert prose-lg max-w-none">
                    <p className="text-slate-300 leading-relaxed text-lg whitespace-pre-line">
                        {post?.content}
                    </p>
                </article>

                {/* Footer/Action Section */}
                <div className="mt-10 pt-6 border-t border-slate-700 flex justify-between items-center">
                    <button 
                        onClick={() => router.back()}
                        className="text-amber-500 hover:text-amber-400 transition font-semibold"
                    >
                        ← Back to Forum
                    </button>
                </div>
            </div>
        </div>
    );
}