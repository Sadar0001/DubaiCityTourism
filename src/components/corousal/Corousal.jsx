import React, { useEffect, useState } from "react";
import ActivitiesCarousel from "./ActivitiesCarousel";
import { fetchProducts } from "../../services/api";

function Corousal() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchProducts();
      // Map Backend fields to Frontend props
      const formattedTours = data.map((item) => ({
        id: item.id,
        title: item.title,
        location: item.destination?.city || "Dubai, UAE",
        price: `${item.pricing?.currency} ${item.pricing?.currentPrice}`,
        oldPrice: item.pricing?.originalPrice
          ? `${item.pricing?.currency} ${item.pricing?.originalPrice}`
          : null,
        duration: "Flexible", // Default if not in backend
        images: item.images?.map((img) => img.url) || [
          "https://placehold.co/400",
        ],
        isOnSale: item.pricing?.onSale || false,
      }));
      setTours(formattedTours);
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) return <div className="text-center py-10">Loading Tours...</div>;

  return <ActivitiesCarousel title="Popular Activities" tours={tours} />;
}

export default Corousal;
