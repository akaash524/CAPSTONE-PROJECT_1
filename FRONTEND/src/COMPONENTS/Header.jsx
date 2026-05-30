import React, {
  useState,
  useRef,
  useEffect,
} from "react";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../STORES/authStore";

import {
  PenSquare,
  LogOut,
  ChevronDown,
} from "lucide-react";

function Header() {
  const isAuthenticated = useAuth(
    (state) => state.isAuthenticated
  );

  const user = useAuth(
    (state) => state.currentUser
  );

  const logout = useAuth((state) => state.logout);

  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] =
    useState(false);

  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // Profile Route
  const getProfilePath = () => {
    if (!user) return "/";

    switch (user.role) {
      case "AUTHOR":
        return "/author-profile";

      case "ADMIN":
        return "/admin-profile";

      default:
        return "/user-profile";
    }
  };

  // Active Nav Style
  const navLinkStyle = ({ isActive }) =>
    `px-5 py-2.5 uppercase tracking-[0.15em] text-sm font-semibold transition duration-300 border ${
      isActive
        ? "bg-black_forest-500 text-cornsilk-500 border-black_forest-500"
        : "border-olive_leaf-300 text-olive_leaf-500 hover:border-copperwood-500 hover:text-copperwood-500"
    }`;

  // Close Dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target
        )
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-cornsilk-500/90 border-b border-olive_leaf-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="h-20 flex items-center justify-between">
          {/* Logo */}
          <NavLink
            to={
              isAuthenticated
                ? getProfilePath()
                : "/"
            }
            className="flex items-center gap-4 group"
          >
            {/* Logo Icon */}
            <div className="w-12 h-12 bg-black_forest-500 flex items-center justify-center shadow-md group-hover:bg-copperwood-500 transition duration-300">
              <PenSquare
                size={22}
                className="text-cornsilk-500"
              />
            </div>

            {/* Logo Text */}
            <div className="leading-none">
              <h1 className="text-3xl font-black tracking-tight text-black_forest-500">
                Blog
                <span className="text-copperwood-500">
                  Sphere
                </span>
              </h1>

              <p className="text-[11px] uppercase tracking-[0.25em] text-olive_leaf-500 mt-1">
                Creative Publishing Platform
              </p>
            </div>
          </NavLink>

          {/* Navigation */}
          <nav>
            <ul className="flex items-center gap-3">
              {!isAuthenticated ? (
                <>
                  {/* Sign In */}
                  <li>
                    <NavLink
                      to="/login"
                      className={navLinkStyle}
                    >
                      Sign In
                    </NavLink>
                  </li>

                  {/* Register */}
                  <li>
                    <NavLink
                      to="/register"
                      className="px-5 py-2.5 uppercase tracking-[0.15em] text-sm font-bold bg-copperwood-500 hover:bg-copperwood-400 text-cornsilk-500 transition duration-300 shadow-md"
                    >
                      Get Started
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  {/* Profile Dropdown */}
                  <li
                    className="relative"
                    ref={dropdownRef}
                  >
                    <button
                      onClick={() =>
                        setShowDropdown(
                          !showDropdown
                        )
                      }
                      className="flex items-center gap-4 border border-olive_leaf-300 bg-cornsilk-600 hover:border-copperwood-500 px-4 py-2.5 transition duration-300 shadow-sm"
                    >
                      {/* Profile Image */}
                      <img
                        src={
                          user?.profileImageUrl ||
                          "https://th.bing.com/th/id/OIP.cN620h43KlX8Sa15ZIsJfQHaHa?w=202&h=202&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3"
                        }
                        alt="profile"
                        className="w-11 h-11 object-cover border border-olive_leaf-300"
                      />

                      {/* User Info */}
                      <div className="hidden md:flex flex-col items-start text-left">
                        <span className="text-sm font-bold uppercase tracking-wide text-black_forest-500">
                          {user?.firstName}
                        </span>

                        <span className="text-xs uppercase tracking-[0.18em] text-olive_leaf-500">
                          {user?.role}
                        </span>
                      </div>

                      {/* Arrow */}
                      <ChevronDown
                        size={18}
                        className={`text-olive_leaf-500 transition duration-300 ${
                          showDropdown
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    </button>

                    {/* Dropdown */}
                    {showDropdown && (
                      <div className="absolute right-0 mt-4 w-72 bg-cornsilk-600 border border-olive_leaf-300 shadow-2xl overflow-hidden">
                        {/* User Info */}
                        <div className="p-6 border-b border-olive_leaf-300">
                          <div className="flex items-center gap-4">
                            <img
                              src={
                                user?.profileImageUrl ||
                                "https://th.bing.com/th/id/OIP.cN620h43KlX8Sa15ZIsJfQHaHa?w=202&h=202&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3"
                              }
                              alt="profile"
                              className="w-16 h-16 object-cover border border-olive_leaf-300"
                            />

                            <div>
                              <h3 className="text-lg font-bold text-black_forest-500">
                                {user?.firstName}{" "}
                                {user?.lastName}
                              </h3>

                              <p className="text-sm text-olive_leaf-500 break-all">
                                {user?.email}
                              </p>

                              <p className="mt-2 inline-block text-xs uppercase tracking-[0.18em] bg-black_forest-500 text-cornsilk-500 px-2 py-1">
                                {user?.role}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Menu */}
                        <div className="p-3">
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 border border-transparent hover:border-copperwood-500 hover:bg-copperwood-900/20 text-copperwood-500 font-semibold uppercase tracking-[0.15em] text-sm transition duration-300"
                          >
                            <LogOut size={18} />
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;