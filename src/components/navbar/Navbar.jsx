import React, { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import logo from "../../assets/logo.webp";

import { NavLinkWrapper } from "./NavLinkWrapper.jsx";
import { Menu, LogOut, History, User } from "lucide-react";
import SearchGroup from "./SearchGroup.jsx";
import WhatsAppButton from "./WhatsAppButton.jsx";
import { ModeToggle } from "./ModeToggle.jsx";

// Import Auth Logic (Added registerUser)
import { useAuth } from "../../context/AuthContext";
import { loginUser, registerUser, fetchUserHistory } from "../../services/api";

function Navbar() {
  const { user, login, logout } = useAuth();

  // Form States
  const [isLoginView, setIsLoginView] = useState(true); // Toggle between Login/Signup
  const [name, setName] = useState(""); // Only for Signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [historyData, setHistoryData] = useState([]);

  // Handle Authentication (Login or Signup)
  const handleAuth = async (e) => {
    e.preventDefault();

    if (isLoginView) {
      // --- LOGIN LOGIC ---
      const userData = await loginUser(email, password);
      if (userData) {
        login(userData);
        setShowLoginModal(false);
      } else {
        alert("Invalid Credentials! Try: sarah.travels@example.com / pass123");
      }
    } else {
      // --- SIGNUP LOGIC ---
      if (!name || !email || !password) {
        alert("Please fill in all fields");
        return;
      }

      const result = await registerUser(name, email, password);

      if (result === "User registered successfully") {
        alert("Account created! Please Login.");
        setIsLoginView(true); // Switch to login view
      } else {
        alert("Signup Failed: " + result);
      }
    }
  };

  // Handle History View
  const handleHistory = async () => {
    if (user) {
      const data = await fetchUserHistory(user.id);
      setHistoryData(data);
      setShowHistory(true);
    }
  };

  const openAuthModal = () => {
    setIsLoginView(true); // Always default to Login
    setShowLoginModal(true);
  };

  return (
    <div className="w-full flex items-center justify-between px-4 md:px-8 py-4 bg-white dark:bg-gray-900 text-black dark:text-white shadow-sm transition-colors duration-300 relative z-50">
      {/* --- LOGO SECTION --- */}
      <div className="flex shrink-0 items-center">
        <img src={logo} alt="Your Company" className="h-8 w-auto" />
      </div>

      {/* --- DESKTOP MENU --- */}
      <div className="hidden md:flex md:items-center md:space-x-6">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavLinkWrapper href="/">Home</NavLinkWrapper>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Tours</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[400px] gap-3 p-4">
                  <NavLinkWrapper href="/">Wildlife</NavLinkWrapper>
                  <NavLinkWrapper href="/">Cruise Tour</NavLinkWrapper>
                  <NavLinkWrapper href="/">Tour & Cruise</NavLinkWrapper>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Destination</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[400px] gap-3 p-4">
                  <NavLinkWrapper href="/">Dubai City</NavLinkWrapper>
                  <NavLinkWrapper href="/">Hatta Village</NavLinkWrapper>
                  <NavLinkWrapper href="/">Ras Al Khaima City</NavLinkWrapper>
                  <NavLinkWrapper href="/">Fujairah City</NavLinkWrapper>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Deals</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[400px] gap-3 p-4">
                  <NavLinkWrapper href="/">Desert Safari Deals</NavLinkWrapper>
                  <NavLinkWrapper href="/">Group Deals</NavLinkWrapper>
                  <NavLinkWrapper href="/">Corporate Tours</NavLinkWrapper>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavLinkWrapper href="/">Contact Us</NavLinkWrapper>
            </NavigationMenuItem>
          </NavigationMenuList>
          <NavigationMenuViewport />
        </NavigationMenu>
      </div>

      {/* --- DESKTOP SEARCH --- */}
      <div className="hidden md:flex md:items-center">
        <SearchGroup />
      </div>

      {/* --- RIGHT SIDE ACTIONS --- */}
      <div className="flex items-center gap-2">
        <WhatsAppButton />
        <ModeToggle />

        {/* AUTH BUTTONS (Desktop) */}
        {user ? (
          <div className="hidden md:flex items-center gap-2">
            <span
              className="text-sm font-bold text-teal-600 truncate max-w-[100px]"
              title={user.name}
            >
              Hi, {user.name.split(" ")[0]}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleHistory}
              title="History"
            >
              <History className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={logout} title="Logout">
              <LogOut className="h-5 w-5 text-red-500" />
            </Button>
          </div>
        ) : (
          <Button
            onClick={openAuthModal}
            className="hidden md:flex bg-teal-600 hover:bg-teal-700 text-white"
          >
            Sign In
          </Button>
        )}

        {/* MOBILE MENU */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger className="flex items-center p-2">
              <Menu size={25} />
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] overflow-y-auto">
              <SheetTitle className="text-lg mb-5 font-bold text-teal-600 mx-3">
                Menu
              </SheetTitle>

              <div className="mb-6 px-2 border-b pb-4 border-gray-100 dark:border-gray-800">
                {user ? (
                  <div className="flex flex-col gap-3">
                    <div className="font-bold flex items-center gap-2 text-gray-800 dark:text-gray-200">
                      <User className="h-4 w-4" /> {user.name}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleHistory}
                      className="w-full justify-start"
                    >
                      <History className="mr-2 h-4 w-4" /> View History
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={logout}
                      className="w-full justify-start"
                    >
                      <LogOut className="mr-2 h-4 w-4" /> Sign Out
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={openAuthModal}
                    className="w-full bg-teal-600"
                  >
                    Sign In
                  </Button>
                )}
              </div>

              {/* Mobile Links (Simplified for brevity) */}
              <div className="flex flex-col space-y-4 mx-2 my-2">
                <a
                  href="/"
                  className="text-sm font-medium hover:text-teal-500 py-2"
                >
                  Home
                </a>
                {/* ... other mobile links ... */}
                <a
                  href="/contact"
                  className="text-sm font-medium hover:text-teal-500 py-2"
                >
                  Contact Us
                </a>
                <div className="pt-4">
                  <SearchGroup />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* --- AUTH MODAL (LOGIN & SIGNUP) --- */}
      <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isLoginView ? "Login to Account" : "Create New Account"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleAuth} className="flex flex-col gap-4 py-4">
            {/* Show Name field ONLY for Signup */}
            {!isLoginView && (
              <Input
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            )}

            <Input
              placeholder="Email (e.g. sadar@lpu.in)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 text-white"
            >
              {isLoginView ? "Login" : "Sign Up"}
            </Button>
          </form>

          {/* Toggle between Login and Signup */}
          <div className="text-center text-sm text-gray-500">
            {isLoginView
              ? "Don't have an account? "
              : "Already have an account? "}
            <button
              onClick={() => setIsLoginView(!isLoginView)}
              className="text-teal-600 font-bold hover:underline"
            >
              {isLoginView ? "Sign Up" : "Login"}
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* --- HISTORY MODAL --- */}
      <Dialog open={showHistory} onOpenChange={setShowHistory}>
        <DialogContent className="max-w-md max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Your Purchase History</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto space-y-3 pr-2">
            {historyData.length === 0 ? (
              <p className="text-center text-gray-500 py-4">
                No bookings found.
              </p>
            ) : (
              historyData.map((order) => (
                <div
                  key={order.id}
                  className="border p-3 rounded-lg shadow-sm bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                >
                  <p className="font-bold text-sm dark:text-gray-200">
                    {order.productTitle}
                  </p>
                  <div className="flex justify-between mt-2 text-xs text-gray-600 dark:text-gray-400">
                    <span>
                      {new Date(order.bookingDate).toLocaleDateString()}
                    </span>
                    <span className="font-bold text-green-600 dark:text-green-400">
                      AED {order.amount}
                    </span>
                  </div>
                  <span className="inline-block mt-2 text-[10px] bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-2 py-0.5 rounded">
                    {order.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Navbar;
