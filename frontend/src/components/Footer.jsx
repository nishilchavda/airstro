// src/components/Footer.jsx
import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaEnvelope, FaPhone } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 border-b border-gray-700 pb-10">
          
          {/* Column 1: Company Info */}
          <div className="col-span-2 md:col-span-2">
            <h3 className="text-3xl font-bold text-indigo-600 mb-4">Airstro</h3>
            <p className="text-gray-400 mb-4">
              Your seamless gateway to global travel. We make booking flights effortless, secure, and affordable. Explore the world with confidence.
            </p>
            
            {/* Social Icons */}
            <div className="flex space-x-4 mt-4">
              <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-indigo-600 transition">
                <FaFacebookF className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-indigo-600 transition">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-indigo-600 transition">
                <FaInstagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-200">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-indigo-600 transition">About Us</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition">Our Fleet</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition">Careers</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition">FAQ</a></li>
            </ul>
          </div>

          {/* Column 3: Travel Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-200">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-indigo-600 transition">Group Bookings</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition">Check-in Online</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition">Baggage Info</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition">Travel Insurance</a></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-200">Contact Us</h4>
            <div className="space-y-3 text-gray-400">
              <p className="flex items-center">
                <FaEnvelope className="mr-2 text-indigo-600" /> 
                <a href="mailto:support@airstro.com" className="hover:text-indigo-400 transition">support@airstro.com</a>
              </p>
              <p className="flex items-center">
                <FaPhone className="mr-2 text-indigo-600" /> 
                <a href="tel:+15551234567" className="hover:text-indigo-400 transition">+1 (555) 123-4567</a>
              </p>
              <p>
                101 Aviation Plaza, Skyview City, CA 90210
              </p>
            </div>
          </div>
        </div>

        {/* Copyright and Legal */}
        <div className="mt-8 pt-4 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; {currentYear} Airstro. All rights reserved.</p>
          <div className="flex space-x-4 mt-3 md:mt-0">
            <a href="#" className="hover:text-indigo-400 transition">Privacy Policy</a>
            <span className="text-gray-600">|</span>
            <a href="#" className="hover:text-indigo-400 transition">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;