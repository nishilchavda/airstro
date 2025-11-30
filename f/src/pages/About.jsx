import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import howtoearn from "../assets/img/How-to-earn.avif";
import airstro from "../assets/img/airstro.avif";
import blockout from "../assets/img/blockoutdates.avif";
import {
  Star,
  Gift,
  ShieldCheck,
  CreditCard,
  Plane,
  Ticket,
  Globe2,
  Users,
  BarChart3,
} from "lucide-react";

function About() {
  return (
    <div className="bg-gradient-to-b from-[#e6f3ff] to-white min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero / Intro */}
        <section className="max-w-7xl mx-auto px-4 pt-16 pb-10">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.2em] text-[#0000cc] mb-2 uppercase">
              ABOUT US
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-[#101828] mb-3">
              Airstro BluChips Loyalty Program
            </h1>
            <p className="text-sm md:text-base text-gray-600">
              Fly, earn and enjoy exclusive travel rewards with Airstro BluChips
              – our simple and rewarding loyalty program designed for frequent
              flyers, family vacations and business trips alike.
            </p>
          </div>
        </section>

        {/* Sign up benefits section */}
        <section className="max-w-7xl mx-auto px-4 pt-10 pb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
            Sign up and get access to{" "}
            <span className="text-[#0000cc]">
              exciting privileges and benefits
            </span>
          </h2>

          <div className="bg-white rounded-[2.5rem] shadow-sm border border-[#eef2ff] px-4 py-6 md:px-6 md:py-8">
            {/* 3 cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
              <BenefitCard
                image={airstro}
                title="Earn Airstro BluChips"
                description="Earn BluChips on every Airstro flight and select add-ons like seats, meals and baggage – turn every journey into rewards."
              />
              <BenefitCard
                image={blockout}
                title="No blackout dates"
                description="Redeem your Airstro BluChips on any eligible flight, any time of the year – no blackout dates, no hidden restrictions."
              />
              <BenefitCard
                image="https://images.pexels.com/photos/39396/hourglass-time-hours-sand-39396.jpeg"
                title="Lifetime validity"
                description="Your Airstro BluChips stay active as long as your account is active and you keep flying with us."
              />
            </div>

            {/* Enroll button */}
            <div className="flex justify-center">
              <button className="flex items-center gap-2 px-8 py-3 rounded-full bg-[#0000cc] text-white text-sm md:text-base font-medium hover:bg-[#0000aa]">
                Enrol Now
                <span className="h-8 w-8 rounded-full bg-white flex items-center justify-center text-[#0000cc] text-sm">
                  <Plane />
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* Learn more about earning & redeeming section */}
        <section className="max-w-7xl mx-auto px-4 py-10">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
            Learn More about <span className="text-[#0000cc]">Earning</span> and{" "}
            <span className="text-[#0000cc]">Redeeming Airstro BluChips</span>
          </h2>

          <div className="bg-white rounded-[2.5rem] shadow-sm border border-[#eef2ff] px-4 py-5 md:px-6 md:py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <LearnCard
                image={howtoearn}
                title="Read more about earning Airstro BluChips"
                description="As a member, earn BluChips on every Airstro flight and on select add-ons such as seats, meals and baggage – the more you travel, the faster you earn."
              />
              <LearnCard
                image={airstro}
                title="Read more about redeeming Airstro BluChips"
                description="Redeem your BluChips on Airstro flights, upgrades and more – anytime, anywhere, for yourself and your loved ones."
              />
            </div>
          </div>
        </section>

        {/* Network / stats cards – Indigo style */}
        <section className="bg-white/80 border-t border-[#e0e7ff]">
          <div className="max-w-7xl mx-auto px-4 py-10">
            <h2 className="text-xl md:text-2xl font-bold text-[#101828] mb-6 text-center">
              Airstro at a glance
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Big left card */}
              <div className="bg-[#0000cc] rounded-[2.5rem] text-white px-8 py-10 flex flex-col justify-between min-h-[210px]">
                <div>
                  <div className="text-4xl md:text-5xl font-semibold mb-4">
                    2,200+
                  </div>
                  <div className="text-2xl leading-tight font-medium">
                    Daily
                    <br />
                    Flights
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-md">
                    <span className="text-[#0000cc] text-lg"><Plane/></span>
                  </div>
                </div>
              </div>

              {/* Right side 4 cards */}
              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <StatCard value="90+" label="Domestic Destinations" />
                <StatCard value="40+" label="International Destinations" />
                <StatCard value="750 Mn+" label="Happy Customers" />
                <StatCard value="400+" label="Fleet Strong" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function StatCard({ value, label }) {
  return (
    <div className="rounded-[2.5rem] border border-[#c7ddff] bg-white px-6 py-6 flex flex-col justify-center">
      <div className="text-2xl md:text-3xl font-semibold text-[#0000cc] mb-2">
        {value}
      </div>
      <div className="text-sm md:text-base text-[#0000cc] leading-snug">
        {label}
      </div>
    </div>
  );
}

function LearnCard({ image, title, description }) {
  return (
    <div className="relative rounded-[2rem] overflow-hidden min-h-[260px]">
      {/* Background image */}
      <img src={image} alt={title} className="w-full h-full object-cover" />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* Bottom pill with text */}
      <div className="absolute left-0 right-0 bottom-0 p-4 md:p-6">
        <div className="bg-black/60 md:bg-black/55 backdrop-blur-sm rounded-[1.5rem] px-4 py-3 md:px-6 md:py-4 flex items-center justify-between gap-4 text-white">
          <div>
            <h3 className="font-semibold text-sm md:text-base mb-1 leading-snug">
              {title}
            </h3>
            <p className="text-[11px] md:text-xs leading-snug text-white/90">
              {description}
            </p>
          </div>

          <div className="flex-shrink-0 h-9 w-9 md:h-10 md:w-10 rounded-full bg-white flex items-center justify-center shadow-md">
            <span className="text-[#0000cc] text-lg">↗</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function BenefitCard({ image, title, description }) {
  return (
    <div className="relative rounded-[2rem] overflow-hidden min-h-[260px]">
      {/* Background image */}
      <img src={image} alt={title} className="w-full h-full object-cover" />

      {/* Soft overlay to darken bottom area slightly */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent" />

      {/* Inner pill with text (like Indigo) */}
      <div className="absolute left-0 right-0 bottom-0 p-4 md:p-6">
        <div className="bg-black/55 backdrop-blur-sm rounded-[1.5rem] px-4 py-3 md:px-6 md:py-4 flex items-center justify-between gap-4 text-white">
          <div>
            <h3 className="font-semibold text-sm md:text-base mb-1 leading-snug">
              {title}
            </h3>
            <p className="text-[11px] md:text-xs leading-snug text-white/90">
              {description}
            </p>
          </div>

          <div className="flex-shrink-0 h-9 w-9 md:h-10 md:w-10 rounded-full bg-white flex items-center justify-center shadow-md">
            <span className="text-[#0000cc] text-lg">↗</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
