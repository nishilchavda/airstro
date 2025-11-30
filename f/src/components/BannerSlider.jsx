import React, { useState, useEffect } from "react";
import banner1 from "../assets/img/1offerbanner.png";
import banner2 from "../assets/img/2offerbanner.png";
import banner3 from "../assets/img/3offerbanner.png";

function BannerSlider() {
  const banners = [
    {
      image: banner1,
      title: "Black Friday Sale",
    },
    {
      image: banner2,         
      title: "Student Discount Offer",
    },
    {
      image: banner3,
      title: "Winter Sale",
    },
  ];

  const [index, setIndex] = useState(0);

  // Auto slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [banners.length]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div
        className="
          relative 
          rounded-2xl 
          overflow-hidden 
          shadow-[0_5px_22px_rgba(0,0,0,0.15)]
          h-[280px] md:h-[360px] lg:h-[650px]   /* 👈 height on wrapper */
        "
      >
        {/* Slides */}
        {banners.map((banner, i) => (
          <img
            key={i}
            src={banner.image}
            alt={banner.title}
            className={`
              absolute inset-0
              w-full h-full           /* 👈 fill wrapper */
              object-cover
              transition-opacity duration-700
              ${index === i ? "opacity-100" : "opacity-0"}
            `}
          />
        ))}

        {/* Pagination dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full transition ${
                index === i ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default BannerSlider;
