import ClassDetailsClient from "../../../Components/ClassDetailsClient";

export default async function Page({ params }) {
  const { id } = await params;
  const res = await fetch(`http://localhost:5000/api/classes/${id}`, { cache: "no-store" });
  const data = await res.json();
  
  return <ClassDetailsClient initialData={data} id={id} />;
}