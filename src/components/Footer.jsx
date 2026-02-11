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
    <footer className="pb-10 border-gray-800 px-6">
      {/* Risk Disclaimer - Crucial for Financial Design */}
      <div className="pt-8 border-t-1 border-gray-800 text-gray-600 leading-relaxed text-center">
        <p className="mt-6 font-medium uppercase tracking-[0.2em]">
          &copy; {currentYear} Aurelius Capital Management. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
