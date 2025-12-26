import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

export default function StickyWhatsAppButton() {
  const phoneNumber = "7679514423";
  const message = "Hello, I am interested in your services.";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    // Container handles the positioning (Fixed at bottom right)
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
      {/* Mobile Button (Icon + 'Chat') */}
      <Button
        className="md:hidden rounded-full shadow-lg bg-teal-500 text-white hover:bg-white hover:border-2 hover:border-teal-500 hover:text-teal-500 transition-all duration-300 transform hover:scale-105"
        onClick={() => window.open(whatsappUrl, "_blank")}
      >
        <MessageCircle size={20} className="mr-2" />
        Chat
      </Button>

      {/* Desktop Button (Icon + Full Text) */}
      <Button
        className="hidden md:flex rounded-full shadow-xl h-12 px-6 bg-teal-500 text-white hover:bg-white hover:border-2 hover:border-teal-500 hover:text-teal-500 transition-all duration-300 transform hover:-translate-y-1"
        onClick={() => window.open(whatsappUrl, "_blank")}
      >
        <MessageCircle size={20} className="mr-2" />
        How can we help you?
      </Button>
    </div>
  );
}
