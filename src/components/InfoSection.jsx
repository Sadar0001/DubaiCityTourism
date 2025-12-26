import React from "react";
import { Globe, TicketPercent, Umbrella, Award } from "lucide-react";

const InfoSection = () => {
  // Data for the 4 features
  const features = [
    {
      icon: (
        <Globe
          className="w-12 h-12 text-teal-600 dark:text-teal-400 mb-4"
          strokeWidth={1.5}
        />
      ),
      title: "Discover the possibilities",
      description:
        "With nearly half a million attractions, hotels & more, you're sure to find joy.",
    },
    {
      icon: (
        <TicketPercent
          className="w-12 h-12 text-teal-600 dark:text-teal-400 mb-4"
          strokeWidth={1.5}
        />
      ),
      title: "Enjoy deals & delights",
      description:
        "Quality activities. Great prices. Plus, earn credits to save more.",
    },
    {
      icon: (
        <Umbrella
          className="w-12 h-12 text-teal-600 dark:text-teal-400 mb-4"
          strokeWidth={1.5}
        />
      ),
      title: "Exploring made easy",
      description:
        "Book last minute, skip lines & get free cancellation for easier exploring.",
    },
    {
      icon: (
        <Award
          className="w-12 h-12 text-teal-600 dark:text-teal-400 mb-4"
          strokeWidth={1.5}
        />
      ),
      title: "Travel you can trust",
      description:
        "Read reviews & get reliable customer support. We're with you at every step.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16 space-y-20">
      {/* 1. NEWSLETTER BANNER SECTION */}
      {/* Dark Mode Adjustment: 
          - 'dark:from-teal-600' makes the start slightly darker.
          - 'dark:to-transparent' ensures the gradient fades into your navy background 
            instead of fading to white (teal-50).
      */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-teal-500 to-teal-50 dark:from-teal-600 dark:to-transparent shadow-sm dark:shadow-none dark:border dark:border-white/10">
        <div className="px-8 py-12 md:px-12 md:py-16 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Get 10% off
          </h2>
          <p className="text-teal-50 dark:text-gray-200 text-lg md:text-xl leading-relaxed">
            Join our newsletter and discover new destinations to inspire the
            traveler within. Plus, get 20% off on booking of all tours.
          </p>
        </div>
      </div>

      {/* 2. FEATURES GRID SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 text-center">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center group">
            {/* Icon Container with Hover Effect */}
            {/* Dark Mode: 'dark:bg-card' uses your custom lighter-blue card color 
               so the circle is visible against the deep navy background.
            */}
            <div className="p-3 rounded-full bg-teal-50 dark:bg-card mb-4 group-hover:bg-teal-100 dark:group-hover:bg-teal-900/30 transition-colors duration-300">
              {feature.icon}
            </div>

            {/* Title: Dark mode uses white text */}
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
              {feature.title}
            </h3>

            {/* Description: Dark mode uses lighter gray */}
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-[250px]">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoSection;
