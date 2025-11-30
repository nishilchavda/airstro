import React from "react";

function Footer() {
  return (
    <footer
      className="text-slate-200 mt-16"
      style={{
        // background: "linear-gradient(180deg, #009, #00005c)",
        background: "linear-gradient(180deg, #0002cc, #00005c)",
        borderRadius: "1rem 1rem 0 0",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand / about */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-3">Airstro</h2>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              Your seamless gateway to global travel. We make booking flights
              effortless, secure, and affordable. Explore the world with
              confidence.
            </p>

            <div className="flex items-center gap-4 text-xl mt-2">
              <a href="#" className="hover:text-white transition-colors">
                f
              </a>
              <a href="#" className="hover:text-white transition-colors">
                t
              </a>
              <a href="#" className="hover:text-white transition-colors">
                in
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-base font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-white transition-colors">Book</a></li>
              <li><a href="/deals" className="hover:text-white transition-colors">Deals and Offers</a></li>
              <li><a href="/trips" className="hover:text-white transition-colors">My Trips</a></li>
              <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-base font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#group-bookings" className="hover:text-white transition-colors">Group Bookings</a></li>
              <li><a href="#checkin" className="hover:text-white transition-colors">Check-in Online</a></li>
              <li><a href="#baggage" className="hover:text-white transition-colors">Baggage Info</a></li>
              <li><a href="#insurance" className="hover:text-white transition-colors">Travel Insurance</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-base font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                ✉ <span>support@airstro.com</span>
              </li>
              <li className="flex items-center gap-2">
                📞 <span>+1 (555) 123-4567</span>
              </li>
              <li className="mt-2 leading-relaxed text-slate-300">
                101 AirstroPlex, Surat <br /> Gujarat, India 394107
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/20 mt-10 pt-4 flex flex-col md:flex-row items-center justify-between text-xs text-slate-300 gap-2">
          <p>© 2025 Airstro. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <span className="text-slate-600">|</span>
            <a href="#terms" className="hover:text-white transition-colors">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
