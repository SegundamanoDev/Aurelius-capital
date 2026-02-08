import React from "react";
import { Link } from "react-router-dom";
import { RiCopperCoinLine } from "react-icons/ri";
import {
  FaTwitter,
  FaTelegramPlane,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#020408] pt-20 pb-10 border-t border-white/5 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Identity */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-sky-500 p-1.5 rounded-lg">
                <RiCopperCoinLine className="text-white text-xl" />
              </div>
              <span className="text-xl font-bold text-white uppercase tracking-wider">
                Aurelius
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed">
              Global headquarters in Zurich, Switzerland. Empowering private
              investors with institutional-grade AI trading technology since
              2018.
            </p>
            <div className="flex gap-4 text-gray-400">
              <FaTwitter className="hover:text-sky-400 cursor-pointer transition-colors" />
              <FaTelegramPlane className="hover:text-sky-400 cursor-pointer transition-colors" />
              <FaLinkedinIn className="hover:text-sky-400 cursor-pointer transition-colors" />
              <FaInstagram className="hover:text-sky-400 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6">Platform</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li>
                <Link
                  to="/invest"
                  className="hover:text-sky-400 transition-colors"
                >
                  Investment Tiers
                </Link>
              </li>
              <li>
                <Link
                  to="/academy"
                  className="hover:text-sky-400 transition-colors"
                >
                  Aurelius Academy
                </Link>
              </li>
              <li>
                <Link
                  to="/markets"
                  className="hover:text-sky-400 transition-colors"
                >
                  Live Markets
                </Link>
              </li>
              <li>
                <Link
                  to="/security"
                  className="hover:text-sky-400 transition-colors"
                >
                  Security Protocol
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li>
                <Link
                  to="/about"
                  className="hover:text-sky-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="hover:text-sky-400 transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/legal"
                  className="hover:text-sky-400 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-sky-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-6">Global Support</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li>support@aurelius.capital</li>
              <li>+41 44 123 45 67</li>
              <li className="pt-2">
                <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                  <p className="text-[10px] text-sky-400 font-bold uppercase mb-1">
                    Status
                  </p>
                  <p className="text-white font-medium text-xs">
                    All Systems Operational
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Risk Disclaimer - Crucial for Financial Design */}
        <div className="pt-8 border-t border-white/5 text-[11px] text-gray-600 leading-relaxed text-center">
          <p className="max-w-5xl mx-auto">
            RISK DISCLOSURE: Trading foreign exchange, cryptocurrencies, and
            other digital assets on margin carries a high level of risk and may
            not be suitable for all investors. Past performance is not
            indicative of future results. Aurelius Capital is an AI-driven
            management platform and does not guarantee profits. Please consult
            with a financial advisor before allocating capital.
          </p>
          <p className="mt-6 font-medium uppercase tracking-[0.2em]">
            &copy; {currentYear} Aurelius Capital Management. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
