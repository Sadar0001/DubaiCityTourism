import React from "react";
import { MapPin, Phone, Mail, Facebook, Instagram } from "lucide-react";
import { Separator } from "@/components/ui/separator";

// Reusable component for footer section headings
const FooterHeading = ({ children }) => (
  <h3 className="text-lg font-semibold mb-4 text-white">{children}</h3>
);

// Reusable component for footer links
const FooterLink = ({ href, children }) => (
  <li>
    <a
      href={href}
      className="text-gray-300 hover:text-teal-500 transition-colors duration-200"
    >
      {children}
    </a>
  </li>
);

const Footer = () => {
  return (
    // Main Footer Container with dark background
    <footer className="bg-[#1a1a1a] text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        {/* Top Section: 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Logo and Contact Info */}
          <div className="space-y-6">
            {/* Replace with your actual Logo Image */}
            <div className="mb-4">
              <h2 className="text-3xl font-bold text-teal-500">Dubai</h2>
              <span className="text-sm tracking-widest text-teal-500">
                CITY TOURISM
              </span>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-teal-500 shrink-0 mt-0.5" />
                <span>Al- Murar 5152, Sikka 67A Street, Office 204</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-teal-500 shrink-0" />
                <span>+971 - 505 786 965</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-teal-500 shrink-0" />
                <a
                  href="mailto:info@dubaicitytourism.com"
                  className="hover:text-teal-500"
                >
                  info@dubaicitytourism.com
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Top Activities Links */}
          <div>
            <FooterHeading>Top Activities</FooterHeading>
            <ul className="space-y-3 text-sm">
              <FooterLink href="/">Desert Safari Tour</FooterLink>
              <FooterLink href="/">Escorted Tours</FooterLink>
              <FooterLink href="/">Self Guided Tours</FooterLink>
              <FooterLink href="/">Explore More Activities</FooterLink>
            </ul>
          </div>

          {/* Column 3: Information Links */}
          <div>
            <FooterHeading>Information</FooterHeading>
            <ul className="space-y-3 text-sm">
              <FooterLink href="/">Help & FAQs</FooterLink>
              <FooterLink href="/">Contact us</FooterLink>
              <FooterLink href="/">Blogs</FooterLink>
            </ul>
          </div>

          {/* Column 4: Social Media & Payments */}
          <div>
            {/* Social Media */}
            <FooterHeading>Follow Us</FooterHeading>
            <div className="flex gap-4 mb-8">
              <a
                href="#"
                className="bg-blue-600 p-2 rounded-full hover:opacity-90 transition text-white"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-pink-600 p-2 rounded-full hover:opacity-90 transition text-white"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>

            {/* Payment Methods Placeholders */}
            <FooterHeading>We Accept</FooterHeading>
            <div className="grid grid-cols-4 gap-2">
              {/* Replace these divs with actual <img> tags for your payment icons */}
              <div className="bg-white h-8 rounded shadow-sm flex items-center justify-center text-xs text-black font-bold">
                VISA
              </div>
              <div className="bg-white h-8 rounded shadow-sm flex items-center justify-center text-xs text-black font-bold">
                MC
              </div>
              <div className="bg-white h-8 rounded shadow-sm flex items-center justify-center text-xs text-black font-bold">
                AMEX
              </div>
              <div className="bg-white h-8 rounded shadow-sm flex items-center justify-center text-xs text-black font-bold">
                PayPal
              </div>
              <div className="bg-white h-8 rounded shadow-sm flex items-center justify-center text-xs text-black font-bold">
                Apple
              </div>
              <div className="bg-white h-8 rounded shadow-sm flex items-center justify-center text-xs text-black font-bold">
                GPay
              </div>
            </div>
          </div>
        </div>

        {/* Shadcn Separator Line */}
        <Separator className="bg-gray-700 my-8" />

        {/* Bottom Copyright Section */}
        <div className="text-center text-sm text-gray-400">
          <p>Copyright © 2025 Dubai City Tourism. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
