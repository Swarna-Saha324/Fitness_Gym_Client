import { headers } from "next/headers";
import ClassDetailsClient from "../../../Components/ClassDetailsClient";
import { auth } from "@/lib/auth";

export default async function Page({ params }) {
  const { id } = await params;
  const session = await auth.api.getSession({
    headers: await headers()
  });
 
 // const res = await fetch(`http://localhost:5000/api/classes/${id}`, {
 const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/classes/${id}`, {  
    cache: "no-store",
   
  });

  const data = await res.json();
  
  
  return <ClassDetailsClient initialClassData={data} id={id} />;
//return <ClassDetailsClient initialClassData={data} id={id} session={session} />;


}
