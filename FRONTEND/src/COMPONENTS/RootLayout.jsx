import React, { useEffect } from "react";
import { Outlet } from "react-router";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { useAuth } from "../STORES/authStore.js";

function RootLayout() {
  const checkAuth = useAuth((state) => state.checkAuth);
  const loading = useAuth((state) => state.loading);

  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-5">
          {/* Spinner */}
          <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

          <p className="text-zinc-300 text-lg tracking-wide">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Background Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-174 h-175 bg-blue-600/10 blur-[150px] rounded-full pointer-events-none"></div>

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 relative z-10">
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-8">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default RootLayout;