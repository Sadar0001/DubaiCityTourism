import React, { useState, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import TourCard from "./TourCard";

const ActivitiesCarousel = ({ title = "Popular Activities", tours = [] }) => {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    // Safety check: sometimes scrollSnapList is empty initially
    const snaps = api.scrollSnapList();
    setCount(snaps.length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api, tours]); // Re-run when tours data arrives

  // SAFETY: If no tours, don't try to render the carousel (prevents crash)
  if (!tours || tours.length === 0) {
    return (
      <div className="text-center py-10">
        No activities available at the moment.
      </div>
    );
  }

  const handleDotClick = (index) => {
    if (api) {
      api.scrollTo(index);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 space-y-8">
      <div className="flex items-center justify-between relative">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          {title}
        </h2>
      </div>

      <Carousel
        setApi={setApi}
        plugins={[
          Autoplay({
            delay: 3000,
            stopOnInteraction: false,
          }),
        ]}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full relative"
      >
        <CarouselContent className="-ml-4 pb-4">
          {tours.map((tour, index) => (
            <CarouselItem
              key={tour.id || index} // Use ID if available, fallback to index
              className="pl-4 basis-full md:basis-1/2 lg:basis-1/4 h-auto"
            >
              <div className="h-full p-1">
                <TourCard
                  id={tour.id}
                  images={tour.images || []} // Safety fallback
                  location={tour.location || "Unknown Location"}
                  title={tour.title || "Untitled Tour"}
                  oldPrice={tour.oldPrice}
                  price={tour.price || "Check Price"}
                  duration={tour.duration || "Flexible"}
                  isOnSale={tour.isOnSale || false}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="hidden md:block">
          <CarouselPrevious className="absolute -top-14 right-[50px] z-10 h-10 w-10 bg-white dark:bg-gray-800" />
          <CarouselNext className="absolute -top-14 right-0 z-10 h-10 w-10 bg-white dark:bg-gray-800" />
        </div>
      </Carousel>

      {/* Pagination Dots */}
      <div className="flex justify-center items-center gap-4 pt-2 flex-wrap">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`text-sm font-medium px-3 py-1 rounded-md transition-all ${
              current === index + 1
                ? "bg-teal-600 text-white scale-110"
                : "bg-gray-100 dark:bg-gray-800 text-gray-400"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ActivitiesCarousel;
