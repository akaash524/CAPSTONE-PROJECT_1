import React from "react";
import { Link } from "react-router-dom";
import { PenSquare } from "lucide-react";

function Footer() {
  return (
    <footer className="relative border-t border-olive_leaf-300 bg-cornsilk-500 overflow-hidden">
      {/* Background Accent */}
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-125 h-125 bg-sunlit_clay-500/10 blur-[120px]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-16">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              {/* Logo */}
              <div className="w-14 h-14 bg-black_forest-500 flex items-center justify-center shadow-md">
                <PenSquare
                  size={24}
                  className="text-cornsilk-500"
                />
              </div>

              {/* Title */}
              <div>
                <h1 className="text-3xl font-black tracking-tight text-black_forest-500">
                  Blog
                  <span className="text-copperwood-500">
                    Sphere
                  </span>
                </h1>

                <p className="text-[11px] uppercase tracking-[0.22em] text-olive_leaf-500 mt-1">
                  Creative Publishing Platform
                </p>
              </div>
            </div>

            <p className="text-olive_leaf-500 leading-relaxed text-[15px]">
              A modern publishing platform where
              developers, writers, and creators share
              ideas, stories, technical knowledge, and
              experiences with the world.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h2 className="text-lg font-black uppercase tracking-[0.15em] text-black_forest-500 mb-6">
              Navigation
            </h2>

            <ul className="space-y-4">
              {[
                "Home",
                "About",
                "Sign In",
                "Get Started",
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    to="/"
                    className="text-olive_leaf-500 hover:text-copperwood-500 transition duration-300 uppercase tracking-wide text-sm font-medium"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h2 className="text-lg font-black uppercase tracking-[0.15em] text-black_forest-500 mb-6">
              Resources
            </h2>

            <ul className="space-y-4">
              {[
                "Blogs",
                "Privacy Policy",
                "Terms & Conditions",
                "Contact",
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    to="/"
                    className="text-olive_leaf-500 hover:text-copperwood-500 transition duration-300 uppercase tracking-wide text-sm font-medium"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h2 className="text-lg font-black uppercase tracking-[0.15em] text-black_forest-500 mb-6">
              Stay Updated
            </h2>

            <p className="text-olive_leaf-500 leading-relaxed text-[15px] mb-6">
              Receive the latest articles, platform
              updates, and curated content directly in
              your inbox.
            </p>

            <form className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="border border-olive_leaf-300 bg-cornsilk-600 px-5 py-3 outline-none focus:border-copperwood-500 text-black_forest-500 placeholder:text-olive_leaf-400 transition duration-300"
              />

              <button
                type="button"
                className="bg-copperwood-500 hover:bg-copperwood-400 text-cornsilk-500 uppercase tracking-[0.15em] text-sm font-bold py-3 transition duration-300 shadow-md"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-olive_leaf-300 mt-16 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm uppercase tracking-[0.12em] text-olive_leaf-500">
            © 2026 BlogSphere. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="text-sm uppercase tracking-[0.12em] text-olive_leaf-500 hover:text-copperwood-500 transition"
            >
              Privacy
            </Link>

            <Link
              to="/"
              className="text-sm uppercase tracking-[0.12em] text-olive_leaf-500 hover:text-copperwood-500 transition"
            >
              Terms
            </Link>

            <Link
              to="/"
              className="text-sm uppercase tracking-[0.12em] text-olive_leaf-500 hover:text-copperwood-500 transition"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;