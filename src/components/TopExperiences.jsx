import React from "react";
import adventureImg from "../assets/image1.png";
import waterImg from "../assets/image2.png";

const ExperienceCard = ({ image, title, description, buttonText, link }) => {
  return (
    <div className="relative group overflow-hidden rounded-2xl h-[300px] md:h-[350px] w-full shadow-lg">
      {/* 1. Background Image with Zoom Effect */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Dark Overlay for text readability (adjustable opacity) */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
      </div>

      {/* 2. Content Overlay */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end items-start">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-md">
          {title}
        </h3>
        <p className="text-gray-200 text-sm md:text-base mb-6 max-w-md drop-shadow-sm">
          {description}
        </p>

        {/* 3. Button */}
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="
            bg-white text-teal-700 font-semibold px-6 py-2.5 rounded-full 
            transition-all duration-300 shadow-md
            hover:bg-teal-600 hover:text-white hover:shadow-lg hover:-translate-y-1
            dark:bg-gray-800 dark:text-white dark:hover:bg-teal-600
          "
        >
          {buttonText}
        </a>
      </div>
    </div>
  );
};

const TopExperiences = () => {
  return (
    <div className="container mx-auto px-4 py-12 space-y-8">
      {/* Section Header */}
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
        Top Experiences
      </h2>

      {/* Grid Layout: 1 col on mobile, 2 cols on tablet/desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Adventure */}
        <ExperienceCard
          image={adventureImg} // Replace with your variable
          title="Adventure Awaits"
          description="Dive into a world of excitement at Dubai's top theme parks with thrilling roller coaster rides."
          buttonText="See All Activities"
          link="https://google.com"
        />

        {/* Card 2: Water */}
        <ExperienceCard
          image={waterImg} // Replace with your variable
          title="Beneath the Waves"
          description="Uncover the treasures beneath Dubai's waters with these thrilling marine tours."
          buttonText="See All Water Activities"
          link="https://google.com"
        />
      </div>
    </div>
  );
};

export default TopExperiences;
