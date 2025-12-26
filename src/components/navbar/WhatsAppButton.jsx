import { Button } from "@/components/ui/button"; // Assuming you are using Shadcn Button
import { MessageCircle } from "lucide-react"; // Import WhatsApp icon (or any icon)

export default function WhatsAppButton() {
    
  const phoneNumber = "7679514423";
  const message = "Hello, I am interested in your services."; 

    
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

    return (
      <>
        <Button
          className="md:hidden bg-teal-500 text-white shrink hover:bg-white hover:border-2 hover:border-teal-500 hover:text-teal-500 transition duration-300 transform hover:translate-x-2 hover:translate-y-0.5"
          onClick={() => window.open(whatsappUrl, "_blank")} // Opens in new tab
        >
          <MessageCircle size={20} />
          Chat
        </Button>

        <Button
          className="hidden md:flex bg-teal-500 text-white shrink hover:bg-white hover:border-2 hover:border-teal-500 hover:text-teal-500 transition duration-300 transform hover:translate-x-2 hover:translate-y-0.5"
          onClick={() => window.open(whatsappUrl, "_blank")} // Opens in new tab
        >
          <MessageCircle size={20} />
          Chat on WhatsApp
        </Button>
      </>
    );
}

