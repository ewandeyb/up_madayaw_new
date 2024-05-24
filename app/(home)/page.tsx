'use client'

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
  type CarouselApi,
} from "@/components/ui/carousel"

export default function Home() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <section className="relative flex flex-col min-h-screen bg-gray-100 dark:bg-gray-800">
      <section className="top-0 left-0 w-full h-full flex items-center justify-center text-center flex-col gap-6 z-10 pointer-events-none">
        <div className="pointer-events-auto flex flex-col items-center space-y-6 w-full px-4"> {/* Added w-full and px-4 */}
          <h1 className="mt-[50px] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white p-4 rounded inline-block ">
            <span className="text-upcolor font-sans">UP Madayaw</span> Multi-Purpose Cooperative
          </h1>
          <p className="text-sm lg:text-lg text-black dark:text-white p-2 rounded inline-block">
            Empowering communities through sustainable development.
          </p>
          <Button size="sm" variant="up" className="text-white font-bold border mr-2 w-26">
            <a href="/apply">Apply Now</a>
          </Button>
          <div className="flex flex-col sm:flex-row justify-between w-full">
            <div className="w-full sm:w-3/5"> {/* Adjust the width as needed */}
              <div className="relative"> {/* Added relative container */}
                <Carousel setApi={setApi} className="w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl" opts={{ align: "start", loop: true }}>
                  <CarouselContent>
                    <CarouselItem>
                      <div className="p-1">
                        <Card>
                          <CardContent className="flex aspect-[16/9] items-center justify-center p-6">
                            <img src="/img/upmin.jpg" alt="Image 1" className="w-full h-full object-cover" />
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                    <CarouselItem>
                      <div className="p-1">
                        <Card>
                          <CardContent className="flex aspect-[16/9] items-center justify-center p-6">
                            <img src="/img/1.png" alt="Image 1" className="w-full h-full object-cover" />
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                    <CarouselItem>
                      <div className="p-1">
                        <Card>
                          <CardContent className="flex aspect-[16/9] items-center justify-center p-6">
                            <img src="/img/2.png" alt="Image 1" className="w-full h-full object-cover" />
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                    <CarouselItem>
                      <div className="p-1">
                        <Card>
                          <CardContent className="flex aspect-[16/9] items-center justify-center p-6">
                            <img src="/img/3.png" alt="Image 1" className="w-full h-full object-cover" />
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                    <CarouselItem>
                      <div className="p-1">
                        <Card>
                          <CardContent className="flex aspect-[16/9] items-center justify-center p-6">
                            <img src="/img/4.png" alt="Image 1" className="w-full h-full object-cover" />
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                    <CarouselItem>
                      <div className="p-1">
                        <Card>
                          <CardContent className="flex aspect-[16/9] items-center justify-center p-6">
                            <img src="/img/5.png" alt="Image 1" className="w-full h-full object-cover" />
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  </CarouselContent>
                  <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2" />
                  <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2" />
                </Carousel>
                <div className="py-5 text-center text-sm text-muted-foreground">
                  Slide {current} of {count}
                </div>
              </div>
            </div>
            <div className="w-full sm:w-3/5 mt-1 sm:mt-1 mb-6 sm:mb-6">
              <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md max-w-full mx-auto max-h-72 overflow-y-auto"> {/* Added max-h-72 and overflow-y-auto */}
                <h2 className="text-lg text-left font-bold mb-4">Announcements</h2>
                <ul>
                  <li className="mb-2">
                    <p className="text-sm sm:text-xs md:text-xs lg:text-xs xl:text-sm text-left">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Porta lorem mollis aliquam ut. Turpis massa tincidunt dui ut ornare lectus sit amet. Sed faucibus turpis in eu mi bibendum. In dictum non consectetur a erat. Dignissim enim sit amet venenatis urna cursus eget nunc scelerisque. Varius duis at consectetur lorem donec massa sapien faucibus. Sit amet venenatis urna cursus eget. Tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum. Sed velit dignissim sodales ut eu sem integer. Sed augue lacus viverra vitae congue eu consequat ac. Convallis posuere morbi leo urna molestie at elementum eu facilisis.</p>
                  </li>
                  <li className="mb-2">
                    <p className="text-sm sm:text-xs md:text-xs lg:text-xs xl:text-sm text-left">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Porta lorem mollis aliquam ut. Turpis massa tincidunt dui ut ornare lectus sit amet. Sed faucibus turpis in eu mi bibendum. In dictum non consectetur a erat. Dignissim enim sit amet venenatis urna cursus eget nunc scelerisque. Varius duis at consectetur lorem donec massa sapien faucibus. Sit amet venenatis urna cursus eget. Tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum. Sed velit dignissim sodales ut eu sem integer. Sed augue lacus viverra vitae congue eu consequat ac. Convallis posuere morbi leo urna molestie at elementum eu facilisis.</p>
                  </li>
                  <li className="mb-2">
                    <p className="text-sm sm:text-xs md:text-xs lg:text-xs xl:text-sm text-left">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Porta lorem mollis aliquam ut. Turpis massa tincidunt dui ut ornare lectus sit amet. Sed faucibus turpis in eu mi bibendum. In dictum non consectetur a erat. Dignissim enim sit amet venenatis urna cursus eget nunc scelerisque. Varius duis at consectetur lorem donec massa sapien faucibus.</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}