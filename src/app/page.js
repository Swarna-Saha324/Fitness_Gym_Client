import Image from "next/image";
import HeroBanner from "../Components/HeroBanner";
import Features from "@/Components/Feature";
import Stats from "@/Components/Stats";
export default function Home() {
  return (
   <div>
    <HeroBanner />
    <Features />
    <Stats />

   </div>
  );
}
