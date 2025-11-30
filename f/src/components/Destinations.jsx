import React from "react";
// import { MapPin } from "lucide-react";

function Destinations() {
  const destinations = [
    {
      name: "Ayodhya, Uttar Pradesh",
      image:
        "https://www.goindigo.in/content/dam/s6web/in/en/assets/homepage/city/m-web/Ayodhya.jpg",
    },
    {
      name: "Bangkok, Thailand",
      image:
        "https://www.goindigo.in/content/dam/s6web/in/en/assets/homepage/city/m-web/Bangkok.jpg",
    },
    {
      name: "Bengaluru",
      image:
        "https://www.goindigo.in/content/dam/s6web/in/en/assets/homepage/city/m-web/Bengaluru.jpg",
    },
    {
      name: "Delhi",
      image:
        "https://www.goindigo.in/content/dam/s6web/in/en/assets/homepage/city/m-web/Delhi.jpg",
    },
    {
      name: "GOA",
      image:
        "https://www.goindigo.in/content/dam/s6web/in/en/assets/homepage/city/m-web/Goa.jpg",
    },
    {
      name: "Hyderabad, Telangana",
      image:
        "https://www.goindigo.in/content/dam/s6web/in/en/assets/homepage/city/m-web/Hyderabad.jpg",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-[#1a1a2e] mb-6">
        Embark on a journey of inspiration with Airstro
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {destinations.map((dest, index) => (
          <div
            key={index}
            className="relative rounded-xl overflow-hidden cursor-pointer group"
          >
            <img
              src={dest.image}
              alt={dest.name}
              className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent flex items-end p-3">
              <p className="text-white text-sm font-medium">{dest.name}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Destinations;
