import React from "react";
// Make sure to save the image from your example as hero-image.png in src/assets
import heroImage from "../assets/image21.png";

const HeroSection = () => {
  return (
    <div className="w-full p-5 relative shadow shadow-2xl drop-shadow-blue-950 rounded-lg overflow-hidden">
      {/*
        Image Container
        - h-[400px] sm:h-[500px] lg:h-[600px]: Sets responsive heights.
        - bg-gray-200 dark:bg-gray-800: Background color placeholder while loading.
      */}
      <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] bg-gray-200 dark:bg-gray-800">
        {/*
          The Hero Image
          - w-full h-full object-cover: Ensures the image covers the area without distortion.
          - no hover effects are applied.
        */}
        <img
          src={heroImage}
          alt="Your Gateway To Dubai's Iconic Adventures"
          className="w-full h-full object-cover rounded-4xl"
        />

        
      </div>

      {/*
        Text Content Overlay
        - absolute inset-0: Positions the text over the image.
        - flex flex-col justify-center items-center: Centers the text.
        - text-center text-white: Sets text alignment and color.
      */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
        {/* Main Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg mb-4 max-w-4xl">
          Your Gateway To Dubai’s Iconic Adventures
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl font-medium text-gray-100 drop-shadow-md max-w-2xl">
          Have An Amazing Desert Safari Tour And Dubai Tour With Us!
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
