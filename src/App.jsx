import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import StickyWhatsAppButton from "./components/StickyWhatsAppButton.jsx";
import { AuthProvider } from "./context/AuthContext";

// Import Pages
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />

          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:id" element={<ProductPage />} />
            </Routes>
          </main>

          <StickyWhatsAppButton />
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
