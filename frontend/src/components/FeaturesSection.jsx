// src/components/FeaturesSection.jsx
import React from 'react';
import { FaBolt, FaDollarSign, FaLock, FaHeadset } from 'react-icons/fa';

// --- Feature Data ---
const features = [
  { icon: FaBolt, title: "Fast Booking", description: "Instant flight search and booking. Get confirmed in seconds." },
  { icon: FaDollarSign, title: "Best Price Guarantee", description: "Competitive flight prices. We constantly monitor fares so you don't have to." },
  { icon: FaLock, title: "Secure Payments", description: "Safe and reliable transactions. Your financial data is always protected." },
  { icon: FaHeadset, title: "24/7 Support", description: "Assistance anytime for travelers. Our dedicated team is here to help, day or night." },
];

const FeaturesSection = () => (
  <section className="h-170  py-16 bg-white">
    <div className='flex items-center justify-center'>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
      <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">Why Choose Airstro?</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="p-6 text-center transition duration-300 transform hover:scale-[1.03] rounded-xl shadow-lg hover:shadow-xl bg-gray-50 border-t-4 border-indigo-500"
          >
            {/* Component Icon */}
            <feature.icon className="w-10 h-10 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
    
  </section>
);

export default FeaturesSection;