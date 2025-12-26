import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const GuideCard = ({
  image,
  overlayTitle,
  title,
  date,
  description,
  tag = "Guide",
}) => {
  return (
    <Card
      className="
        w-full h-full flex flex-col
        overflow-hidden rounded-xl border border-gray-100 shadow-sm
        group cursor-pointer
        bg-white hover:shadow-lg transition-all duration-300
        dark:bg-gray-900 dark:border-gray-800 dark:hover:shadow-gray-900/50
      "
    >
      {/* 1. Image Section with Text Overlay */}
      <div className="relative h-48 shrink-0 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
        />
        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Overlay Title (e.g. "Drinking Age in Dubai") */}
        <h3 className="absolute bottom-3 left-3 text-white font-bold text-sm md:text-base drop-shadow-md line-clamp-1">
          {overlayTitle}
        </h3>
      </div>

      {/* 2. Content Section */}
      <CardContent className="p-4 flex flex-col flex-1 gap-2">
        {/* Tag (e.g. Guide) */}
        <div>
          <Badge
            variant="secondary"
            className="bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 rounded-md font-normal px-2 py-0.5 text-xs"
          >
            {tag}
          </Badge>
        </div>

        {/* Main Title */}
        <h4 className="font-bold text-gray-900 dark:text-gray-100 text-[15px] leading-snug line-clamp-2 min-h-[42px]">
          {title}
        </h4>

        {/* Date */}
        <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">
          {date}
        </p>

        {/* Description */}
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-3">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default GuideCard;
