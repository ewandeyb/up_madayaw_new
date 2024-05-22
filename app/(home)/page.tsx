'use client';

import { Button } from "@/components/ui/button";
import Header from "../../components/Header";
import Footer from "@/components/Footer";
import Carousel from '@/components/Carousel'; // Import the Carousel component

export default function Home() {
  return (
    <section className="relative flex flex-col min-h-screen bg-gray-100">
      <Carousel />
      <section className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-center flex-col gap-6 z-10 pointer-events-none">
        <div className="pointer-events-auto flex flex-col items-center space-y-6"> {/* Added flex and items-center */}
          <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white bg-white dark:bg-black bg-opacity-50 p-4 rounded inline-block ">
            <span className="text-upcolor font-sans">UP Madayaw</span> Multi-Purpose Cooperative
          </h1>
          <p className="text-lg text-black dark:text-white bg-white dark:bg-black bg-opacity-50 p-2 rounded inline-block">
            Empowering communities through sustainable development.
          </p>
          <Button size="sm" variant="up" className="text-white font-bold border mr-2 w-26">
            <a href="/apply">Apply Now</a>
          </Button>
        </div>
      </section>
    </section>
  );
}