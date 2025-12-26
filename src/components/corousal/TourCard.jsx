import React from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const TourCard = ({
  id,
  images = [],
  location = "",
  title = "",
  oldPrice,
  price,
  duration = "",
  isOnSale = false,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to the product details page
    navigate(`/product/${id}`);
  };

  return (
    <Card
      onClick={handleClick}
      className="w-full h-full flex flex-col overflow-hidden rounded-xl border-0 shadow-md transition-all duration-300 group cursor-pointer bg-white hover:shadow-xl hover:-translate-y-2 dark:bg-gray-900"
    >
      <div className="relative h-48 sm:h-52 shrink-0 overflow-hidden bg-gray-200 dark:bg-gray-800">
        {isOnSale && (
          <Badge className="absolute top-3 right-3 z-10 bg-red-600 text-white px-3 py-1">
            On Sale
          </Badge>
        )}
        <img
          src={images[0] || "https://placehold.co/400"}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <CardContent className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-2">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
          <h3 className="font-bold text-gray-900 dark:text-white leading-tight line-clamp-2">
            {title}
          </h3>
        </div>

        <div>
          <hr className="border-gray-100 dark:border-gray-700 my-2" />
          <div className="flex items-end justify-between">
            <div className="flex flex-col">
              {oldPrice && (
                <span className="text-red-500 text-xs line-through">
                  {oldPrice}
                </span>
              )}
              <div className="flex items-baseline gap-1">
                <span className="text-gray-500 text-xs font-medium">From</span>
                <span className="text-black dark:text-white font-bold text-lg">
                  {price}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{duration}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TourCard;
