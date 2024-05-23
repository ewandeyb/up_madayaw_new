import * as React from "react"

import { Button } from "@/components/ui/button";
import Header from "../../components/Header";
import Footer from "@/components/Footer";

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function Home() {
  return (
    <section className="relative flex flex-col min-h-screen bg-gray-100">
      <section className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-center flex-col gap-6 z-10 pointer-events-none">
        <div className="pointer-events-auto flex flex-col items-center space-y-6"> {/* Added flex and items-center */}
          <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold text-black p-4 rounded inline-block ">
            <span className="text-upcolor font-sans">UP Madayaw</span> Multi-Purpose Cooperative
          </h1>
          <p className="text-lg text-black p-2 rounded inline-block">
            Empowering communities through sustainable development.
          </p>
          <Button size="sm" variant="up" className="text-white font-bold border mr-2 w-26">
            <a href="/apply">Apply Now</a>
          </Button>

          <Carousel className="w-full max-w-xs">
            <CarouselContent>
             {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="text-4xl font-semibold">{index + 1}</span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>
    </section>
  );
}