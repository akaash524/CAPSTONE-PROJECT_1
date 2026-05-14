import React from "react";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../STORES/authStore";
import { PenSquare, LogOut, User } from "lucide-react";

function Header() {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const user = useAuth((state) => state.currentUser);
  const logout = useAuth((state) => state.logout);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

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

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/70 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <NavLink
            to="/"
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
              <li>
                <NavLink to="/" end className={navLinkStyle}>
                  Home
                </NavLink>
              </li>

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
                  <li>
                    <NavLink
                      to={getProfilePath()}
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-4 py-2 rounded-xl transition duration-300 font-medium ${
                          isActive
                            ? "bg-white/10 text-white"
                            : "text-zinc-300 hover:text-white hover:bg-white/5"
                        }`
                      }
                    >
                      <User size={18} />
                      Profile
                    </NavLink>
                  </li>

                  {/* Logout */}
                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-zinc-300 hover:text-white hover:bg-red-500/20 transition duration-300"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
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