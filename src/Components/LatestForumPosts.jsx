
export default async function LatestForumPosts() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/forums/latest`, { cache: "no-store" });
    const posts = await res.json();

    if (!Array.isArray(posts)) {
        return <p className="text-center text-slate-400 py-10">No posts available.</p>;
    }

    return (
        <section className="py-20 bg-slate-950"> {/* ডার্ক ব্যাকগ্রাউন্ড */}
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-extrabold text-center text-amber-500 mb-12">Latest Forum Posts</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {posts.map(p => (
                        <div key={p._id} className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl hover:border-amber-500/50 transition-all duration-300">
                            {/* ইমেজ সেকশন */}
                            <div className="h-48 overflow-hidden">
                                <img 
                                    src={p.image || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48"} 
                                    alt={p.title} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                   
                                />
                            </div>

                            {/* কন্টেন্ট সেকশন */}
                            <div className="p-6">
                                <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">Discussion</span>
                                <h4 className="font-bold text-xl text-white mt-2 mb-3 group-hover:text-amber-400 transition-colors">
                                    {p.title}
                                </h4>
                                <p className="text-sm text-slate-400 leading-relaxed mb-4">
                                    {p.description?.slice(0, 80) || p.content?.slice(0, 80)}...
                                </p>
                                <button className="text-sm font-semibold text-white hover:text-amber-500 flex items-center gap-2">
                                    Read More →
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}