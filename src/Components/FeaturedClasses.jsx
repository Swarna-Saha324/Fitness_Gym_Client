// components/FeaturedClasses.jsx
import ClassCard from './ClassCard';

export default async function FeaturedClasses() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/classes/featured`, { cache: "no-store" });
    const classes = await res.json();

    if (!Array.isArray(classes)) {
        return <p>No classes found or data format error.</p> }

    return (
        <section className="py-16  bg-slate-950">
            <h2 className="text-3xl font-bold mb-8 text-center text-amber-500">Featured Classes</h2>
          
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {classes.map((item) => (
                              <ClassCard key={item._id} fitnessClass={item} />
                            ))}
                          </div>
            
            
        </section>
    );
}