import React from "react";
import offer1 from "../assets/img/1offer.png";
import offer2 from "../assets/img/2offer.png";
import offer3 from "../assets/img/3offer.png";
import offer4 from "../assets/img/4offer.png";

function OffersCarousel() {
  const offers = [
    { image: offer1, title: "SBI Credit Card Offer" },
    { image: offer2, title: "Sightseeing 50% Off" },
    { image: offer3, title: "Hotels Black Friday Sale" },
    { image: offer4, title: "Destination Offers" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-[#1a1a2e] mb-6">
        Find exciting offers and best deals
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {offers.map((offer, index) => (
          <div
            key={index}
            className="rounded-xl overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
          >
            <img
              src={offer.image}
              alt={offer.title}
              className="w-full h-48 object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default OffersCarousel;
