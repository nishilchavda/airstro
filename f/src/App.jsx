import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BookingWidget from "./components/BookingWidget";
import OffersCarousel from "./components/OffersCarousel";
import BannerSlider from "./components/BannerSlider";
import Destinations from "./components/Destinations";
import AddOnsSection from "./components/AddOnsSection";
import Footer from "./components/Footer";
import "./globals.css";
function App() {
  return (
    <div className="bg-linear-to-b from-[#e6f3ff] to-white">
      <Navbar />
      <Hero />
      <BookingWidget />
      <OffersCarousel />
      <BannerSlider />
      <Destinations />
      <AddOnsSection />
      <Footer />
    </div>
  );
}
export default App;