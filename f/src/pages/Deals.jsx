import React from "react";
import Navbar from "../components/Navbar";
import OffersCarousel from "../components/OffersCarousel";
import BannerSlider from "../components/BannerSlider";
import Destinations from "../components/Destinations";
import AddOnsSection from "../components/AddOnsSection";
import Footer from "../components/Footer";


function Deals() {
  return (
    <div className="bg-linear-to-b from-[#e6f3ff] to-white">
      <Navbar />
      <OffersCarousel />
      <BannerSlider />
      <Destinations />
      <AddOnsSection />
      <Footer />
    </div>
  );
}
export default Deals;

