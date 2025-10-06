// ... keep your imports from before
import { FaGlobeAsia, FaTrophy, FaHeart, FaPlane, FaStar, FaSpinner, FaAward, FaUsers, FaEnvelopeOpenText } from 'react-icons/fa';
import { useState } from 'react';
import Footer from '../components/Footer';
// ... keep your CustomerReviews component

// New Section: Achievements
const Achievements = () => (
  <section className="py-20 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-12">Our Achievements</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition transform hover:scale-105">
          <FaAward className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Top Travel Awards</h3>
          <p className="text-gray-600">Recognized as the best travel service platform 3 years in a row.</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition transform hover:scale-105">
          <FaUsers className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Over 1M Happy Customers</h3>
          <p className="text-gray-600">Trusted by travelers worldwide for seamless booking experiences.</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition transform hover:scale-105">
          <FaPlane className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Global Flight Network</h3>
          <p className="text-gray-600">Flights connecting 500+ destinations across 100+ countries.</p>
        </div>
      </div>
    </div>
  </section>
);

// New Section: Team
const Team = () => {
  const teamMembers = [
    { name: "Monu Sharma", role: "CEO", img: "https://randomuser.me/api/portraits/men/32.jpg" },
    { name: "Ravi Kumar", role: "CTO", img: "https://randomuser.me/api/portraits/men/45.jpg" },
    { name: "Anjali Verma", role: "Marketing Head", img: "https://randomuser.me/api/portraits/men/30.jpg" },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition transform hover:scale-105"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// New Section: Newsletter / Call-to-Action
const NewsletterCTA = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="py-20 bg-indigo-600 text-white text-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <FaEnvelopeOpenText className="w-16 h-16 mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
        <p className="mb-6">Get the latest travel deals and updates directly in your inbox.</p>
        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 rounded-md text-white w-full sm:w-auto flex-grow focus:outline-none focus:ring-2 focus:ring-white border-2 border-white"/>
            <button
              type="submit"
              className="bg-white text-indigo-600 font-semibold px-6 py-2 rounded-md hover:bg-gray-100 transition"
            >
              Subscribe
            </button>
          </form>
        ) : (
          <p className="text-green-200 font-semibold mt-4">Thank you for subscribing!</p>
        )}
      </div>
    </section>
  );
};

const About = () => {
  return (
    <>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gray-900 text-white py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 animate-fadeInDown" style={{ animationDelay: '0.2s' }}>
              Our Journey: Connecting Worlds
            </h1>
            <p className="text-xl text-indigo-300 mb-8 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              We believe in seamless travel, every time, everywhere.
            </p>
            <FaPlane className="w-16 h-16 mx-auto text-indigo-500 animate-slideInRight" style={{ animationDelay: '0.6s' }} />
          </div>
        </section>

        {/* Core Mission */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Core Mission</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="text-center p-6 transition-all duration-700 transform hover:scale-105">
                <FaGlobeAsia className="w-12 h-12 text-indigo-600 mx-auto mb-4 animate-scaleUp" style={{ animationDelay: '0.8s' }} />
                <h3 className="text-xl font-semibold mb-3">Global Access</h3>
                <p className="text-gray-600">To offer the widest network of flight options, ensuring travelers can reach any corner of the globe affordably and easily.</p>
              </div>
              <div className="text-center p-6 transition-all duration-700 transform hover:scale-105">
                <FaTrophy className="w-12 h-12 text-indigo-600 mx-auto mb-4 animate-scaleUp" style={{ animationDelay: '1.0s' }} />
                <h3 className="text-xl font-semibold mb-3">Price Excellence</h3>
                <p className="text-gray-600">Providing best-in-class deals and transparent pricing, guaranteeing that every booking offers maximum value without hidden fees.</p>
              </div>
              <div className="text-center p-6 transition-all duration-700 transform hover:scale-105">
                <FaHeart className="w-12 h-12 text-indigo-600 mx-auto mb-4 animate-scaleUp" style={{ animationDelay: '1.2s' }} />
                <h3 className="text-xl font-semibold mb-3">Customer Trust</h3>
                <p className="text-gray-600">Building trust through 24/7 dedicated support, instant confirmations, and reliable, secure payment infrastructure.</p>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-gray-200" />

        {/* Achievements */}
        <Achievements />

        {/* Team */}
        <Team />

        <hr className="border-gray-200" />

        {/* Customer Reviews */}

        {/* Newsletter / CTA */}
        <NewsletterCTA />
      </div>
    </>
  );
};

export default About;
