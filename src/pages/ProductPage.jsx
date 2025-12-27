import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { purchaseProduct, fetchProducts } from "../services/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  XCircle,
  MapPin,
  Clock,
  ShieldCheck,
  Star,
  Info,
  Calendar,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TourCard from "../components/corousal/TourCard";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [purchaseStatus, setPurchaseStatus] = useState("");

  // 1. Fetch Product Data & Similar Items
  useEffect(() => {
    let isMounted = true; // Prevents "Can't perform state update on unmounted component"

    const loadData = async () => {
      // 1. Reset View immediately
      window.scrollTo(0, 0);
      setLoading(true);

      try {
        // 2. Fetch Current Product
        const response = await fetch(
          `https://dubaicity-backend-7.onrender.com/api/products/${id}`
        );
        const data = await response.json();

        if (isMounted) {
          setProduct(data);

          // 3. Fetch Similar Items (Only if product loaded)
          if (data && data.categories) {
            const allProducts = await fetchProducts();
            const similar = allProducts
              .filter((p) => p.id !== data.id) // Exclude current
              .slice(0, 3); // Take 3

            if (isMounted) setSimilarProducts(similar);
          }

          setLoading(false);
        }
      } catch (err) {
        console.error("Failed to load product", err);
        if (isMounted) setLoading(false);
      }
    };

    loadData();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [id]);

  const handlePurchase = async () => {
    if (!user) {
      alert("Please login to purchase!");
      return;
    }
    setPurchaseStatus("Processing...");
    const result = await purchaseProduct(user.id, id);
    if (result && result.id) {
      setPurchaseStatus("✅ Booked Successfully!");
    } else {
      setPurchaseStatus("❌ Booking Failed.");
    }
  };

  if (loading)
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        Loading Experience...
      </div>
    );
  if (!product)
    return (
      <div className="text-center py-20 text-red-500 text-lg">
        Product Not Found
      </div>
    );

  const {
    title,
    pricing,
    images,
    overview,
    highlights,
    details,
    itinerary,
    faqs,
    destination,
  } = product;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-16 font-sans">
      {/* --- HERO SECTION (Fixed Height & Gradient) --- */}
      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
        <img
          src={images[0]?.url || "https://placehold.co/1200x500"}
          alt={title}
          className="w-full h-full object-cover"
        />
        {/* Dark Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end pb-8 md:pb-12">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-4xl">
              <Badge className="mb-3 bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 text-xs uppercase font-bold tracking-wider">
                {product.categories?.[0] || "Tour"}
              </Badge>
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight drop-shadow-lg">
                {title}
              </h1>

              {/* Meta Info Row */}
              <div className="flex flex-wrap items-center gap-4 md:gap-6 text-white/90 text-sm md:text-base font-medium">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-teal-400" />
                  <span>
                    {destination?.locationName}, {destination?.city}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-teal-400" />
                  <span>{details?.timings?.weekdays || "Flexible Hours"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>4.8 (120 Reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT LAYOUT --- */}
      <div className="container mx-auto px-4 md:px-8 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* --- LEFT COLUMN: DETAILS (2/3 Width) --- */}
        <div className="lg:col-span-2 space-y-8">
          {/* Overview Card */}
          <section className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl md:text-2xl font-bold mb-4 dark:text-white flex items-center gap-2">
              <Info className="w-5 h-5 text-teal-600" /> Overview
            </h2>
            <div className="text-gray-600 dark:text-gray-300 leading-7 text-base whitespace-pre-line">
              {overview}
            </div>
          </section>

          {/* Highlights Card */}
          <section className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl md:text-2xl font-bold mb-6 dark:text-white flex items-center gap-2">
              <Star className="w-5 h-5 text-teal-600" /> Highlights
            </h2>
            <ul className="grid md:grid-cols-2 gap-4">
              {highlights?.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg"
                >
                  <div className="mt-0.5 min-w-[20px] h-5 flex items-center justify-center bg-teal-100 text-teal-700 rounded-full text-[10px] font-bold">
                    {idx + 1}
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 text-sm font-medium leading-snug">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Itinerary (Timeline) */}
          {itinerary && itinerary.length > 0 && (
            <section className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <h2 className="text-xl md:text-2xl font-bold mb-8 dark:text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-teal-600" /> What To Expect
              </h2>
              <div className="relative border-l-2 border-gray-200 dark:border-gray-700 ml-3 pl-8 pb-4 space-y-8">
                {itinerary.map((step, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-[41px] space-x-3 top-2 w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold text-sm ring-4 ring-white dark:ring-gray-800 shadow-sm">
                            <h2> {step.stepNumber}</h2>  
                            
                    </div>
                    <h4 className="text-lg p-3 font-bold space-y-3 text-gray-900 dark:text-white mb-1">
                      {step.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {step.description}
                        </p>
                        <hr></hr>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Inclusions & Exclusions Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Included */}
            <section className="bg-green-50/60 dark:bg-green-900/10 p-6 rounded-xl border border-green-100 dark:border-green-800/30">
              <h3 className="text-lg font-bold mb-4 text-green-800 dark:text-green-400 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" /> What's Included
              </h3>
              <ul className="space-y-3">
                {details?.inclusions?.map((inc, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                  >
                    <span className="w-1.5 h-1.5 mt-1.5 bg-green-500 rounded-full shrink-0" />{" "}
                    {inc}
                  </li>
                ))}
              </ul>
            </section>

            {/* Excluded */}
            <section className="bg-red-50/60 dark:bg-red-900/10 p-6 rounded-xl border border-red-100 dark:border-red-800/30">
              <h3 className="text-lg font-bold mb-4 text-red-800 dark:text-red-400 flex items-center gap-2">
                <XCircle className="w-5 h-5" /> What's Excluded
              </h3>
              <ul className="space-y-3">
                {details?.exclusions?.map((exc, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                  >
                    <span className="w-1.5 h-1.5 mt-1.5 bg-red-500 rounded-full shrink-0" />{" "}
                    {exc}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* FAQs Accordion */}
          <section className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl md:text-2xl font-bold mb-6 dark:text-white">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs?.map((faq, idx) => (
                <AccordionItem
                  key={idx}
                  value={`item-${idx}`}
                  className="border-b-gray-100 dark:border-b-gray-700"
                >
                  <AccordionTrigger className="text-left font-medium text-gray-900 dark:text-white hover:text-teal-600 hover:no-underline py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-400 leading-relaxed pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        </div>

        {/* --- RIGHT COLUMN: STICKY SIDEBAR (1/3 Width) --- */}
        <div className="lg:col-span-1 relative">
          <div className="sticky top-24 space-y-6">
            {/* Price & Booking Card */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Teal Top Border */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-teal-500"></div>

              <div className="flex justify-between items-start mb-6 pt-2">
                <div>
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">
                    Starting from
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      {pricing?.currency} {pricing?.currentPrice}
                    </span>
                    {pricing?.originalPrice > pricing?.currentPrice && (
                      <span className="text-red-400 line-through text-sm font-medium">
                        {pricing?.currency} {pricing?.originalPrice}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">per person</p>
                </div>
                {pricing?.onSale && (
                  <Badge className="bg-red-100 text-red-600 hover:bg-red-200 border-0 px-2 py-1 shadow-sm">
                    Save 20%
                  </Badge>
                )}
              </div>

              {/* Date/Time Selectors (Visual Only) */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-sm font-medium">
                    <Calendar className="w-4 h-4 text-teal-600" />{" "}
                    <span>Date</span>
                  </div>
                  <span className="font-semibold text-blue-600 cursor-pointer text-sm hover:underline">
                    Select Date
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-sm font-medium">
                    <Clock className="w-4 h-4 text-teal-600" />{" "}
                    <span>Duration</span>
                  </div>
                  <span className="text-gray-900 dark:text-white text-sm font-medium">
                    Flexible
                  </span>
                </div>
              </div>

              {/* Booking Button */}
              <Button
                onClick={handlePurchase}
                className="w-full h-12 text-base bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-lg shadow-md transition-all active:scale-[0.98]"
                disabled={purchaseStatus !== ""}
              >
                {purchaseStatus || "Check Availability"}
              </Button>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500 font-medium">
                <ShieldCheck className="w-4 h-4 text-green-500" /> Secure
                Payment & Instant Confirmation
              </div>

              {!user && (
                <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200 text-xs text-center rounded-lg border border-amber-200 dark:border-amber-800/50">
                  Please Sign In to complete your booking
                </div>
              )}
            </div>

            {/* Support Card */}
            <div className="bg-blue-50/50 dark:bg-blue-900/10 p-5 rounded-xl border border-blue-100 dark:border-blue-800/30 text-center">
              <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-1">
                Need Help?
              </h4>
              <p className="text-xs text-blue-700 dark:text-blue-300 mb-3">
                Call our expert support team 24/7.
              </p>
              <a
                href="tel:+971505786965"
                className="text-lg font-bold text-teal-600 hover:underline"
              >
                +971 50 578 6965
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* --- SIMILAR EXPERIENCES (Bottom Section) --- */}
      <div className="container mx-auto px-4 md:px-8 mt-8 pt-10 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold dark:text-white">
            You Might Also Like
          </h2>
          <Button
            variant="ghost"
            className="text-teal-600 hover:text-teal-700 hover:bg-teal-50"
            onClick={() => navigate("/")}
          >
            View All
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {similarProducts.map((prod) => (
            <div key={prod.id} className="h-full">
              <TourCard
                id={prod.id}
                images={prod.images?.map((i) => i.url)}
                location={prod.destination?.city}
                title={prod.title}
                price={`${prod.pricing.currency} ${prod.pricing.currentPrice}`}
                oldPrice={
                  prod.pricing.originalPrice
                    ? `${prod.pricing.currency} ${prod.pricing.originalPrice}`
                    : null
                }
                isOnSale={prod.pricing.onSale}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
