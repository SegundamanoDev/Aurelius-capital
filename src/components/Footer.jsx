import { Link } from "react-router-dom";
// Import professional icons
import {
  HiOutlineMail,
  HiOutlineLocationMarker,
  HiOutlinePhone,
  HiOutlineShieldCheck,
} from "react-icons/hi";
import { FaRegBuilding } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0b1a14] text-gray-300 pt-16 pb-8 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Brand & Credibility */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#FFD600]">
              <FaRegBuilding className="text-xl" />
              <h3 className="text-white text-xl font-black tracking-tighter">
                ABRADA-BIOTECH
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Leading Nigeria's shift to sustainable waste management through
              advanced anaerobic biotechnology. Turning waste into wealth.
            </p>
            <div className="pt-2">
              <span className="flex items-center gap-2 text-[10px] bg-green-900/30 text-green-400 px-3 py-1 rounded-full border border-green-800 font-bold uppercase tracking-widest w-fit">
                <HiOutlineShieldCheck className="text-xs" />
                CAC: BN 8941617
              </span>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest border-l-2 border-[#FFD600] pl-3">
              Navigation
            </h4>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <Link
                  to="/"
                  className="hover:text-[#FFD600] transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-green-800 rounded-full"></span>
                  Home Experience
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className="hover:text-[#FFD600] transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-green-800 rounded-full"></span>
                  Technical Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-[#FFD600] transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-green-800 rounded-full"></span>
                  About the Proprietor
                </Link>
              </li>
              <li>
                <Link
                  to="/training"
                  className="hover:text-[#FFD600] transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-green-800 rounded-full"></span>
                  Training Academy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Support */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest border-l-2 border-[#FFD600] pl-3">
              Contact Office
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <HiOutlineLocationMarker className="text-[#FFD600] text-xl mt-0.5 shrink-0" />
                <span className="text-gray-400">
                  20, Ogie Street, Off Akure Road, Benin City, Edo State.
                </span>
              </li>
              <li className="flex items-center gap-3">
                <HiOutlinePhone className="text-[#FFD600] text-lg shrink-0" />
                <span className="text-gray-400">08053311594</span>
              </li>
              <li className="flex items-center gap-3">
                <HiOutlineMail className="text-[#FFD600] text-lg shrink-0" />
                <span className="text-gray-400">
                  abradabiotechengineering@gmail.com
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal & Tax */}
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-[#FFD600]/30 transition-colors">
            <h4 className="text-white font-bold mb-4 uppercase text-[10px] tracking-widest">
              Legal Verification
            </h4>
            <div className="space-y-4">
              <div>
                <p className="text-[9px] text-gray-500 uppercase font-black tracking-wider">
                  Tax Identification (TIN)
                </p>
                <p className="text-sm font-mono text-[#FFD600] mt-0.5">
                  33641157-0001
                </p>
              </div>
              <div className="pt-2 border-t border-white/5">
                <p className="text-[9px] text-gray-500 uppercase font-black tracking-wider">
                  Registration Body
                </p>
                <p className="text-[11px] text-gray-200 uppercase mt-0.5 font-bold">
                  Fed. Republic of Nigeria (CAC)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.2em] font-bold text-gray-600">
          <p>© {currentYear} Abrada-Biotech Enterprise. All Rights Reserved.</p>
          <p className="mt-4 md:mt-0">
            Engineered by{" "}
            <span className="text-gray-400">
              WELLINGTON OLUWASEGUN AKITIKORI
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
