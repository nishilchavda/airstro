// src/pages/StaffProfile.jsx
import React from "react";

const staffMembers = [
  {
    name: "Monu Sharma",
    role: "CEO",
    img: "https://i.pravatar.cc/150?img=1",
    email: "monu@example.com",
    bio: "Visionary leader driving company strategy and innovation.",
    linkedin: "https://linkedin.com/in/monusharma",
  },
  {
    name: "Ravi Kumar",
    role: "CTO",
    img: "https://i.pravatar.cc/150?img=2",
    email: "ravi@example.com",
    bio: "Tech architect passionate about scalable backend systems.",
    linkedin: "https://linkedin.com/in/ravikumar",
  },
  {
    name: "Anjali Verma",
    role: "Marketing Head",
    img: "https://i.pravatar.cc/150?img=3",
    email: "anjali@example.com",
    bio: "Creative marketing strategist and brand builder.",
    linkedin: "https://linkedin.com/in/anjaliverma",
  },
  {
    name: "Sandeep Singh",
    role: "Frontend Developer",
    img: "https://i.pravatar.cc/150?img=4",
    email: "sandeep@example.com",
    bio: "Frontend developer who loves React and smooth UI/UX.",
    linkedin: "https://linkedin.com/in/sandeepsingh",
  },
  {
    name: "Priya Patel",
    role: "Backend Developer",
    img: "https://i.pravatar.cc/150?img=5",
    email: "priya@example.com",
    bio: "Backend engineer building robust APIs and databases.",
    linkedin: "https://linkedin.com/in/priyapatel",
  },
  {
    name: "Amit Yadav",
    role: "DevOps Engineer",
    img: "https://i.pravatar.cc/150?img=6",
    email: "amit@example.com",
    bio: "Automating deployments and ensuring 24/7 uptime.",
    linkedin: "https://linkedin.com/in/amityadav",
  },
];

const StaffProfile = () => {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Spacer for top padding if needed */}
      <div className="h-8 md:h-0"></div>

      {/* Page Header */}
      <header className="text-center py-20 bg-black text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 mx-auto">Meet Our IT Team</h1>
        <p className="text-base md:text-lg max-w-xl mx-auto">
          Our talented team ensures smooth operations and innovative solutions for our company.
        </p>
      </header>

      {/* Company Mission */}
      <section className="max-w-6xl mx-auto py-8 px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Mission</h2>
        <p className="text-gray-700 max-w-2xl mx-auto">
          We strive to deliver high-quality software solutions, innovative technologies, and excellent services
          while fostering a collaborative and creative environment for our staff.
        </p>
      </section>

      {/* Staff Grid */}
      <section className="max-w-6xl mx-auto py-8 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
          {staffMembers.map((staff, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow p-4 flex flex-col items-center text-center w-[250px] hover:scale-105 transition-transform"
            >
              <img
                src={staff.img}
                alt={staff.name}
                className="w-20 h-20 rounded-full mb-3"
              />
              <h3 className="text-lg font-semibold">{staff.name}</h3>
              <p className="text-gray-500 mb-1">{staff.role}</p>
              <p className="text-gray-600 text-sm mb-1">{staff.bio}</p>
              <p className="text-blue-600 text-sm mb-2">{staff.email}</p>
              <a
                href={staff.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 transition-colors text-sm"
              >
                LinkedIn
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default StaffProfile;
