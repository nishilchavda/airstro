

import React from "react";
import { Plane, Luggage, MapPin } from "lucide-react";

function AddOnsSection() {
  const addOns = [
    {
      icon: Plane,
      title: "Pre book Fast forward",
      description: "Priority check-in and anytime boarding",
      price: "up to 70% discount",
    },
    {
      icon: Luggage,
      title: "Pre-paid excess baggage",
      description: "Excess baggage and additional piece",
      price: "starting at ₹1515",
    },
    {
      icon: MapPin,
      title: "XL (Extra legroom) seat",
      description: "Window, aisle or seat with extra legroom",
      price: "starting at ₹500",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-[#1a1a2e] mb-6">
        Add more 6E Add-ons to your journey
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {addOns.map((addon, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
          >
            <addon.icon className="h-10 w-10 text-[#0000cc] mb-4" />
            <h3 className="text-lg font-bold text-[#1a1a2e] mb-2">
              {addon.title}
            </h3>
            <p className="text-sm text-gray-600 mb-2">{addon.description}</p>
            <p className="text-[#0000cc] font-semibold">{addon.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AddOnsSection;
