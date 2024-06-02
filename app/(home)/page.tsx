"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import Header from "../../components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

import up from "@/public/img/upmin.jpg";
import sample1 from "@/public/img/1.png";
import sample2 from "@/public/img/2.png";
import sample3 from "@/public/img/3.png";
import sample4 from "@/public/img/4.png";
import sample5 from "@/public/img/5.png";
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

export default function Home() {
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

  return (
    <section className="relative flex flex-col min-h-screen bg-gradient-to-r from-[#FFFFFF] to-[#8E8E8E] dark:bg-gradient-to-r dark:from-[#B2B2B2] dark:to-[#202020]">
      <section className="top-0 left-0 w-full h-full flex items-center justify-center text-center flex-col gap-6 z-10 pointer-events-none">
        <div className="pointer-events-auto flex flex-col items-center space-y-6 w-full px-4 mb-8">
          <h1 className="mt-[50px] text-5xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white p-4 rounded inline-block ">
            <span className="text-upcolor font-sans">UP Madayaw</span>{" "}
            Multi-Purpose Cooperative
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-black dark:text-white p-2 rounded inline-block">
            Empowering communities through sustainable development.
          </p>
          <div className="flex flex-row">
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
              <Link href="./application_form.pdf" className="text-black dark:text-white">
                Download Form
              </Link>
            </Button>
          </div>
          <div className="flex flex-col lg:flex-row justify-between w-full max-w-[1400px] gap-6">
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
                          <CardContent className="flex items-center justify-center h-full p-6">
                            <Image
                              alt="Image1"
                              className="w-full h-full object-cover"
                              src={up}
                            />
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                    <CarouselItem>
                      <div className="p-1 h-full w-full">
                        <Card className="h-full">
                          <CardContent className="flex items-center justify-center h-full p-6">
                            <Image
                              alt="Image2"
                              className="w-full h-full object-cover"
                              src={sample1}
                            />
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                    <CarouselItem>
                      <div className="p-1 h-full w-full">
                        <Card className="h-full">
                          <CardContent className="flex items-center justify-center h-full p-6">
                            <Image
                              alt="Image3"
                              className="w-full h-full object-cover"
                              src={sample2}
                            />
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                    <CarouselItem>
                      <div className="p-1 h-full w-full">
                        <Card className="h-full">
                          <CardContent className="flex items-center justify-center h-full p-6">
                            <Image
                              alt="Image4"
                              className="w-full h-full object-cover"
                              src={sample3}
                            />
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                    <CarouselItem>
                      <div className="p-1 h-full w-full">
                        <Card className="h-full">
                          <CardContent className="flex items-center justify-center h-full p-6">
                            <Image
                              alt="Image5"
                              className="w-full h-full object-cover"
                              src={sample4}
                            />
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                    <CarouselItem>
                      <div className="p-1 h-full w-full">
                        <Card className="h-full">
                          <CardContent className="flex items-center justify-center h-full p-6">
                            <Image
                              alt="Image6"
                              className="w-full h-full object-cover"
                              src={sample5}
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
              <div className="text-center text-sm text-black dark:text-white mt-3">
                Slide {current} of {count}
              </div>
            </div>
            <div className="flex-1 flex flex-col">
              <div className="bg-white dark:bg-black p-4 rounded-lg shadow-md h-full overflow-y-auto">
                <h2 className="text-2xl text-left p-4 font-bold">
                  Announcements
                </h2>
                <ul className="h-[270px] p-4 sm:h-[270px] md:h-[270px] lg:h-[285px] xl:h-[370px] 2xl:h-[400px] text-left overflow-y-auto">
                  <li className="mb-2">
                    <p className="text-base sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-lg text-left">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Porta lorem mollis aliquam ut. Turpis massa
                      tincidunt dui ut ornare lectus sit amet. Sed faucibus
                      turpis in eu mi bibendum. In dictum non consectetur a
                      erat. Dignissim enim sit amet venenatis urna cursus eget
                      nunc scelerisque. Varius duis at consectetur lorem donec
                      massa sapien faucibus. Sit amet venenatis urna cursus
                      eget. Tellus pellentesque eu.
                    </p>
                  </li>
                  <li className="mb-2">
                    <p className="text-base sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-lg text-left">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Porta lorem mollis aliquam ut. Turpis massa
                      tincidunt dui ut ornare lectus sit amet. Sed faucibus
                      turpis in eu mi bibendum. In dictum non consectetur a
                      erat. Dignissim enim sit amet venenatis urna cursus eget
                      nunc scelerisque. Varius duis at consectetur lorem donec
                      massa sapien faucibus.
                    </p>
                  </li>
                  <li className="mb-2">
                    <p className="text-base sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-lg text-left">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Porta lorem mollis aliquam ut. Turpis massa
                      tincidunt dui ut ornare lectus sit amet. Sed faucibus
                      turpis in eu mi bibendum. In dictum non consectetur a
                      erat. Dignissim enim sit amet venenatis urna cursus eget
                      nunc scelerisque. Varius duis at consectetur lorem donec
                      massa sapien faucibus. Sit amet venenatis urna cursus
                      eget. Tellus pellentesque eu.
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