import Image from "next/image";
import HeroBanner from "../Components/HeroBanner";
import Features from "@/Components/Feature";
import Stats from "@/Components/Stats";
import FeaturedClasses from "@/Components/FeaturedClasses";
import LatestForumPosts from "@/Components/LatestForumPosts";
export default function Home() {
  return (
   <div>
    <HeroBanner />
    <FeaturedClasses />
    <LatestForumPosts />
    <Features />
    <Stats />

   </div>
  );
}
