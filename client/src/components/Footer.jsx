import { Link } from "react-router-dom";
import {
  HiOutlineLocationMarker,
  HiOutlinePhone,
  HiOutlineClock,
} from "react-icons/hi";

const Footer = () => (
  <footer className="bg-espresso-800 text-cream-100 mt-24">
    <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8 py-14 grid gap-10 md:grid-cols-3">

      {/* Brand */}
      <div>
        <h4 className="font-display text-2xl mb-3">
          ☕ Brew & Bite
        </h4>

        <p className="text-sm text-cream-200/80 leading-relaxed max-w-sm">
          Fresh coffee, honest food, and a warm place to slow down for a while.
        </p>
      </div>

      {/* Explore */}
      <div>
        <h5 className="font-semibold mb-3 text-cream-50">
          Explore
        </h5>

        <ul className="space-y-2 text-sm text-cream-200/80">
          <li>
            <Link
              to="/menu"
              className="hover:text-gold-400 transition-colors"
            >
              Full Menu
            </Link>
          </li>

          <li>
            <Link
              to="/reservation"
              className="hover:text-gold-400 transition-colors"
            >
              Book a Table
            </Link>
          </li>

          <li>
            <Link
              to="/orders"
              className="hover:text-gold-400 transition-colors"
            >
              Track an Order
            </Link>
          </li>
        </ul>
      </div>

      {/* Visit Us */}
      <div>
        <h5 className="font-semibold mb-3 text-cream-50">
          Visit Us
        </h5>

        <ul className="space-y-3 text-sm text-cream-200/80">
          <li className="flex items-start gap-2">
            <HiOutlineLocationMarker className="w-4 h-4 mt-0.5 shrink-0" />
            <span>12 Coffee Lane, Downtown</span>
          </li>

          <li className="flex items-center gap-2">
            <HiOutlinePhone className="w-4 h-4 shrink-0" />
            <span>+92 300 1234567</span>
          </li>

          <li className="flex items-start gap-2">
            <HiOutlineClock className="w-4 h-4 mt-0.5 shrink-0" />
            <span>8:00 AM – 11:00 PM, Daily</span>
          </li>
        </ul>
      </div>

    </div>

    {/* Copyright */}
    <div className="border-t border-cream-100/10 py-5 px-5 text-center text-xs text-cream-200/60">
      © {new Date().getFullYear()} Brew & Bite. All rights reserved.
    </div>
  </footer>
);

export default Footer;


