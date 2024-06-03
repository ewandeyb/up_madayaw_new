"use client";

import { createClient } from "@supabase/supabase-js";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Header from "../../components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

import announcement from "@/public/img/435670229_10229073373972540_655227071983454797_n.jpg";
import pic1 from "@/public/img/441991842_909479770998104_3806478304152707033_n.png";
import pic2 from "@/public/img/441990033_1444290863143208_8684292486800113276_n.png";
import pic3 from "@/public/img/442513757_1194265108603502_5056427485082478971_n.png";
import pic4 from "@/public/img/442513223_2250324095308429_168426729195928915_n.png";
import pic5 from "@/public/img/441990003_1156813188841562_7283860083811358527_n.png";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { redirect, useParams, useSearchParams } from "next/navigation";

export default function Home() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    console.log(event, session);

    if (event === "INITIAL_SESSION") {
      // handle initial session
    } else if (event === "SIGNED_IN") {
      redirect("/dashboard");
    } else if (event === "SIGNED_OUT") {
      // handle sign out event
    } else if (event === "PASSWORD_RECOVERY") {
      redirect("/password_change");
    } else if (event === "TOKEN_REFRESHED") {
      // handle token refreshed event
    } else if (event === "USER_UPDATED") {
      // handle user updated event
    }
  });

  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const [isMuted, setIsMuted] = useState(true); // Initially muted

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <section className="relative flex flex-col min-h-screen bg-gradient-to-r from-[#FFFFFF] to-[#8E8E8E] dark:bg-gradient-to-r dark:from-[#B2B2B2] dark:to-[#202020]">
      <section className="relative flex flex-col items-center justify-center text-center gap-6 z-10 w-full h-full pointer-events-none">
        {/* Add a container for the heading, paragraph, and buttons */}
        <div className="relative w-full max-w-screen-full mx-auto py-20 lg:py-40 pointer-events-auto">
          <video
            className="absolute top-0 left-0 w-full h-full object-fill z-0"
            src="/vid/An_ytOQq3P_uCD36bUhg62gDG35HRdsZA111PJEAz_2g_qSiO20wceMcwi50CDcgAHZHoMX2y_B6lozpBns9RP_H.mp4"
            autoPlay
            loop
            muted={isMuted} // Toggle mute based on state
          ></video>
          <button
            className="absolute top-4 right-4 bg-white dark:bg-black text-black dark:text-white px-2 py-1 rounded-md"
            onClick={handleToggleMute}
          >
            {isMuted ? "Unmute" : "Mute"}
          </button>
          <div className="relative z-10">
            <h1 className="mt-[30px] text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white dark:text-gray-200 p-4 rounded inline-block text-shadow-glow animate-glow">
              <span className="text-red-600 font-sans">UP Madayaw</span>{" "}
              Multi-Purpose Cooperative
            </h1>

            <div className="relative">
              <div className="bg-opacity-80 dark:bg-black dark:bg-opacity-80 p-2 rounded inline-block mt-6">
                <p className="text-white sm:text-base lg:text-lg  font-semibold dark:text-white text-shadow-glow animate-glow">
                  Empowering communities through sustainable development.
                </p>
              </div>
            </div>
            <div className="flex flex-row justify-center mt-6">
              <Button
                size="sm"
                variant="up"
                className="text-white font-bold border mr-2 w-26"
              >
                <Link href="/apply">Apply Now</Link>
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="text-white font-bold border mr-2 w-26"
              >
                <Link
                  href="./application_form.pdf"
                  className="text-black dark:text-white"
                >
                  Download Form
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-between w-full max-w-[1400px] gap-6 pointer-events-auto p-4">
          <div className="flex-1 flex flex-col">
            <div className="relative h-full w-full mx-auto">
              <Carousel
                setApi={setApi}
                className="w-full"
                opts={{ align: "start", loop: true }}
              >
                <CarouselContent>
                  <CarouselItem>
                    <div className="p-1 h-full w-full">
                      <Card className="h-full">
                        <CardContent className="flex items-center justify-center h-[475px] p-6">
                          <Image
                            alt="Image1"
                            className="w-full h-full object-contain"
                            src={pic1}
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div className="p-1 h-full w-full">
                      <Card className="h-full">
                        <CardContent className="flex items-center justify-center h-[475px] p-6">
                          <Image
                            alt="Image2"
                            className="w-full h-full object-contain"
                            src={pic2}
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div className="p-1 h-full w-full">
                      <Card className="h-full">
                        <CardContent className="flex items-center justify-center h-[475px] p-6">
                          <Image
                            alt="Image3"
                            className="w-full h-full object-contain"
                            src={pic3}
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div className="p-1 h-full w-full">
                      <Card className="h-full">
                        <CardContent className="flex items-center justify-center h-[475px] p-6">
                          <Image
                            alt="Image4"
                            className="w-full h-full object-contain"
                            src={pic4}
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div className="p-1 h-full w-full">
                      <Card className="h-full">
                        <CardContent className="flex items-center justify-center h-[475px] p-6">
                          <Image
                            alt="Image5"
                            className="w-full h-full object-contain"
                            src={pic5}
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious className="absolute left-0 top-[45%] transform -translate-y-1/2" />
                <CarouselNext className="absolute right-0 top-[45%] transform -translate-y-1/2" />
              </Carousel>
            </div>
            <div className="text-center text-sm text-black dark:text-white mt-3 mb-6">
              Slide {current} of {count}
            </div>
          </div>
          <div className="flex-1 flex flex-col">
            <div className="bg-white dark:bg-black p-4 rounded-lg shadow-md h-full overflow-y-auto mb-9">
              <h2 className="text-2xl text-left p-4 font-bold">
                Announcements
              </h2>
              <div className="flex flex-col lg:flex-row items-center gap-6">
                <Image
                  alt="Image5"
                  className="w-full h-full lg:w-56 lg:h-56 xl:w-80 xl:h-80 object-contain p-4"
                  src={announcement}
                />
                <ul className=" w-full h-[270px] p-4 sm:h-[270px] md:h-[270px] lg:h-[400px] xl:h-[400px] 2xl:h-[405px] text-left overflow-y-auto p-4">
                  <li className="mb-2">
                    <p className="text-base sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-lg text-left">
                      Meet the New Team
                    </p>
                  </li>
                  <li className="mb-2">
                    <p className="text-base sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-lg text-left">
                      UPMMPC Board of Directors 2024-2025
                    </p>
                  </li>
                  <li className="mb-2">
                    <p className="text-base sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-lg text-left">
                      Chairperson - Michael Gatela
                    </p>
                  </li>
                  <li className="mb-2">
                    <p className="text-base sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-lg text-left">
                      Vice Chairperson - Marilou Montiflor
                    </p>
                  </li>
                  <li className="mb-2">
                    <p className="text-base sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-lg text-left">
                      Board Director - Jo-An Garcia
                    </p>
                  </li>
                  <li className="mb-2">
                    <p className="text-base sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-lg text-left">
                      Board Director - Lynda Buenaobra
                    </p>
                  </li>
                  <li className="mb-2">
                    <p className="text-base sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-lg text-left">
                      Board Director- Liza Fulvadora
                    </p>
                  </li>
                  <li className="mb-2">
                    <p className="text-base sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-lg text-left">
                      Board Secretary - Ruelyn Peronilla
                    </p>
                  </li>
                  <li className="mb-2">
                    <p className="text-base sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-lg text-left">
                      Board Treasurer - Annalyn Paz Pasaol
                    </p>
                  </li>
                  <li className="mb-2">
                    <p className="text-base sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-lg text-left">
                      Daghang salamat sa inyong padayon na Pagsalig Kanamo!!!
                    </p>
                  </li>
                  <li className="mb-2">
                    <p className="text-base sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-lg text-left">
                      UPMMPC, Serving the University Community!!!
                    </p>
                  </li>
                  {/* Add more announcements as needed */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
