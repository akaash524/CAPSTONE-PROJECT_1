import React from "react";
import { Link } from "react-router-dom";
import { PenSquare } from "lucide-react";

function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-black text-white overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-125 h-125 bg-blue-600/10 blur-[120px] rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
                <PenSquare size={20} />
              </div>

              <h1 className="text-2xl font-extrabold tracking-tight">
                Blog<span className="text-blue-500">Sphere</span>
              </h1>
            </div>

            <p className="text-zinc-400 leading-relaxed">
              A modern blogging platform for developers, writers,
              and creators to share ideas with the world.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h2 className="text-lg font-semibold mb-5">
              Navigation
            </h2>

            <ul className="space-y-3 text-zinc-400">
              <li>
                <Link
                  to="/"
                  className="hover:text-white transition"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/"
                  className="hover:text-white transition"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  to="/login"
                  className="hover:text-white transition"
                >
                  Sign In
                </Link>
              </li>

              <li>
                <Link
                  to="/register"
                  className="hover:text-white transition"
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h2 className="text-lg font-semibold mb-5">
              Resources
            </h2>

            <ul className="space-y-3 text-zinc-400">
              <li>
                <Link
                  to="/"
                  className="hover:text-white transition"
                >
                  Blogs
                </Link>
              </li>

              <li>
                <Link
                  to="/"
                  className="hover:text-white transition"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  to="/"
                  className="hover:text-white transition"
                >
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link
                  to="/"
                  className="hover:text-white transition"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h2 className="text-lg font-semibold mb-5">
              Stay Updated
            </h2>

            <p className="text-zinc-400 mb-5 leading-relaxed">
              Get the latest articles, news, and updates directly
              in your inbox.
            </p>

            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-blue-500 text-white placeholder:text-zinc-500"
              />

              <button
              type="button"
                className="bg-blue-600 hover:bg-blue-700 rounded-2xl py-3 font-medium transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-14 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-500 text-sm">
            © 2026 BlogSphere. All rights reserved.
          </p>

          
        </div>
      </div>
    </footer>
  );
}

export default Footer;