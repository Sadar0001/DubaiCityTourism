import React from "react";
import StoriesSection from "./StoriesSection";

function StoriesMain() {
  // Data matching the image_34be03.jpg
  const storiesData = [
    {
      image:
        "https://images.unsplash.com/photo-1572579878204-455b7661005a?q=80&w=400",
      overlayTitle: "Drinking Age in Dubai",
      title:
        "Drinking Age in Dubai (2025 Update): Rules, Fines & Tourist Guide",
      date: "28 Jan, 2025",
      description:
        "The legal drinking age in Dubai is 21 years old for both residents and tourists. Strict rules apply...",
      tag: "Guide",
    },
    {
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea904ac66de?q=80&w=400",
      overlayTitle: "Al Lulu Island in Abu Dhabi",
      title: "Al Lulu Island in Abu Dhabi: Location, Timings, Fee",
      date: "28 Jan, 2025",
      description:
        "Explore Al Lulu Island in Abu Dhabi, a hidden gem with pristine beaches and calm waters.",
      tag: "Guide",
    },
    {
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=400",
      overlayTitle: "Best Punjabi Restaurants in Dubai",
      title: "6 Best Punjabi Restaurants in Dubai: Popular, Tasteful",
      date: "28 Jan, 2025",
      description:
        "As of April 2024, the United Arab Emirates is home to a total of 3.91 million Indians...",
      tag: "Guide",
    },
    {
      image:
        "https://images.unsplash.com/photo-1580674285054-bed31e145f59?q=80&w=400",
      overlayTitle: "Riverland Dubai",
      title: "Riverland Dubai Tickets, Timings & 2025 Prices – Complete Guide",
      date: "28 Jan, 2025",
      description:
        "Riverland Dubai is a beautifully designed dining, entertainment, and relaxation destination...",
      tag: "Guide",
    },
  ];

    
  return <StoriesSection stories={storiesData} />;
}

export default StoriesMain;
