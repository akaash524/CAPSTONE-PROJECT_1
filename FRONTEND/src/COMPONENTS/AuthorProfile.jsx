import { Outlet, useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

function AuthorProfile() {

  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen">

      <Outlet />

      <button
        onClick={() =>
          navigate("write-article")
        }
        className="
          fixed bottom-8 right-8 z-50
          flex items-center gap-3
          bg-blue-600 hover:bg-blue-700
          text-white
          px-6 py-4
          rounded-2xl
          shadow-2xl shadow-blue-600/30
          transition-all duration-300
          hover:scale-105
          group
        "
      >
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
          <Plus
            size={20}
            className="group-hover:rotate-90 transition"
          />
        </div>

        <span className="font-medium text-sm md:text-base">
          Write Article
        </span>
      </button>
    </div>
  );
}

export default AuthorProfile;