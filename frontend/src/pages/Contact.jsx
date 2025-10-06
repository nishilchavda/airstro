// src/pages/Contact.jsx
import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      {/* ===== Hero Section ===== */}
      <section className="relative bg-gradient-to-r  bg-black text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          We’re here to help you plan your next journey with Airstro.  
          Contact our support team for any assistance or queries.
        </p>
      </section>

      {/* ===== Contact Info & Form Section ===== */}
      <section className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-2 gap-12">
        {/* --- Left: Contact Info --- */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
          <p className="mb-8 text-gray-600">
            Have questions about flight bookings, cancellations, or offers?  
            Reach out to us anytime — we’d love to hear from you!
          </p>

          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-indigo-600 text-xl" />
              <p className="text-lg">+91 98765 43210</p>
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-indigo-600 text-xl" />
              <p className="text-lg">support@airstro.com</p>
            </div>
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-indigo-600-xl" />
              <p className="text-lg">Airstro HQ, Mumbai, India</p>
            </div>
          </div>

          {/* --- Social Media --- */}
          <div className="flex gap-4 mt-8">
            <a href="#" className="text-indigo-600 hover:text-blue-800 text-2xl transition-all">
              <FaFacebook />
            </a>
            <a href="#" className="text-indigo-600 hover:text-pink-600 text-2xl transition-all">
              <FaInstagram />
            </a>
            <a href="#" className="text-indigo-600 hover:text-sky-500 text-2xl transition-all">
              <FaTwitter />
            </a>
          </div>
        </div>

        {/* --- Right: Contact Form --- */}
        <div className="bg-white shadow-lg rounded-2xl p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Send a Message</h2>
          <form className="space-y-5">
            <div>
              <label className="block text-gray-600 mb-2">Full Name</label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-2">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-2">Message</label>
              <textarea
                placeholder="Write your message..."
                rows="5"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-all"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* ===== Map Section ===== */}
      <section className="w-full h-[400px]">
        <iframe
          title="Airstro Office Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.1161000845!2d72.74109992184714!3d19.08219783956543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b63f96a7d83d%3A0xf8d9f3abf67ab597!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1696775434342!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </section>
    </div>
  );
};

export default Contact;
