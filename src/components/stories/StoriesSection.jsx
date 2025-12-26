import React, { useState, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import GuideCard from "./GuideCard"; // Import the card we just made

const StoriesSection = ({
  title = "Inspiration, Guides, Stories",
  stories = [],
}) => {
  const [api, setApi] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
  }, [api]);

  return (
    <div className="container mx-auto px-4 py-12 space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between relative">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          {title}
        </h2>
        {/* Buttons are positioned absolutely inside the carousel container below */}
      </div>

      {/* Carousel Section */}
      <Carousel
        setApi={setApi}
        plugins={[
          Autoplay({
            delay: 4000, // Slower for reading text
            stopOnInteraction: false,
          }),
        ]}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full relative group"
      >
        <CarouselContent className="-ml-4 pb-4">
          {stories.map((story, index) => (
            <CarouselItem
              key={index}
              className="pl-4 basis-full md:basis-1/2 lg:basis-1/4 h-auto"
            >
              <div className="h-full p-1">
                <GuideCard
                  image={story.image}
                  overlayTitle={story.overlayTitle}
                  title={story.title}
                  date={story.date}
                  description={story.description}
                  tag={story.tag}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Buttons */}
        <div className="hidden md:block">
          <CarouselPrevious className="absolute -top-14 right-[50px] z-10 h-10 w-10 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700" />
          <CarouselNext className="absolute -top-14 right-0 z-10 h-10 w-10 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700" />
        </div>
      </Carousel>

      {/* Footer: "See All Stories" Button */}
      <div className="flex justify-center pt-4">
        <Button
          variant="outline"
          className="rounded-full px-8 border-teal-500 text-teal-600 hover:bg-teal-50 hover:text-teal-700 dark:border-teal-400 dark:text-teal-400 dark:hover:bg-gray-800 dark:hover:text-teal-300"
        >
          See All Stories
        </Button>
      </div>
    </div>
  );
};

export default StoriesSection;
