import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../STORES/authStore";
import {
  PenSquare,
  LogOut,
  ChevronDown,
} from "lucide-react";
function Header() {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const user = useAuth((state) => state.currentUser);
  const logout = useAuth((state) => state.logout);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef(null);
  // Decide profile route based on role
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

  const navLinkStyle = ({ isActive }) =>
    `px-4 py-2 rounded-xl transition duration-300 font-medium ${
      isActive
        ? "text-white"
        : "text-zinc-400 hover:text-white"
    }`;

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
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
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/70 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <NavLink
            to={isAuthenticated?getProfilePath():"/"}
            className="flex items-center gap-3 group"
          >
            <div className="w-11 h-11 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30 group-hover:scale-105 transition">
              <PenSquare size={20} className="text-white" />
            </div>

            <h1 className="text-2xl font-extrabold tracking-tight">
              Blog<span className="text-blue-500">Sphere</span>
            </h1>
          </NavLink>


          {/* Nav */}
          <nav>
            <ul className="flex items-center gap-2 md:gap-4">
              {/* Home */}
              {/* <li>
                <NavLink to="/" end className={navLinkStyle}>
                  Home
                </NavLink>
              </li> */}

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

                  {/* Get Started */}
                  <li>
                    <NavLink
                      to="/register"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition duration-300 shadow-lg shadow-blue-600/20"
                    >
                      Get Started
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  {/* Profile */}
                  <li className="relative" ref={dropdownRef}>
                    <button
                      onClick={() =>
                        setShowDropdown(!showDropdown)
                      }
                      className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-2 rounded-2xl transition duration-300"
                    >
                      <img
                        src={
                          user?.profileImageUrl ||
                          "https://th.bing.com/th/id/OIP.cN620h43KlX8Sa15ZIsJfQHaHa?w=202&h=202&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3"
                        }
                        alt="profile"
                        className="w-10 h-10 rounded-full object-cover border border-white/20"
                      />

                      <div className="hidden md:flex flex-col items-start">
                        <span className="text-sm font-medium text-white leading-none">
                          {user?.firstName || "User"}
                        </span>

                        <span className="text-xs text-zinc-400">
                          {user?.role}
                        </span>
                      </div>

                      <ChevronDown
                        size={16}
                        className={`text-zinc-400 transition ${
                          showDropdown ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Dropdown */}
                    {showDropdown && (
                      <div className="absolute right-0 mt-3 w-64 bg-[#111827] border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
                        {/* Top User Info */}
                        <div className="p-5 border-b border-white/10">
                          <div className="flex items-center gap-4">
                            <img
                              src={
                                user?.profileImageUrl ||
                                "https://th.bing.com/th/id/OIP.cN620h43KlX8Sa15ZIsJfQHaHa?w=202&h=202&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3"
                              }
                              alt="profile"
                              className="w-14 h-14 rounded-full object-cover"
                            />

                            <div>
                              <h3 className="font-semibold text-white">
                                {user?.firstName}{" "}
                                {user?.lastName}
                              </h3>

                              <p className="text-sm text-zinc-400 break-all">
                                {user?.email}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Menu */}
                        <div className="p-2">
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-400 hover:bg-red-500/10 transition"
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