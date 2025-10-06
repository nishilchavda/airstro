// eslint-disable no-unused-vars
import DestinationsSection from "../components/FlightsSection";
import FeaturesSection from "../components/FeaturesSection";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";
import FlightReview from "../components/Review";

export default function Home() {
  return (
    <>
    <HeroSection />
    <DestinationsSection />
    <FeaturesSection />
    <FlightReview/>
    <Footer />
    </>
  );
}
