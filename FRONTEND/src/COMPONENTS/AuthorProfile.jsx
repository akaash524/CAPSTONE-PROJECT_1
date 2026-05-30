import {
  Outlet,
  useNavigate,
} from "react-router-dom";

import { Plus } from "lucide-react";

function AuthorProfile() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-cornsilk-500">
      {/* Content */}
      <Outlet />

      {/* Floating Write Button */}
      <button
        onClick={() =>
          navigate("write-article")
        }
        className="
          fixed bottom-8 right-8 z-50
          group
          flex items-center gap-4
          bg-black_forest-500 hover:bg-copperwood-500
          text-cornsilk-500
          px-7 py-4
          border border-olive_leaf-300
          shadow-2xl
          transition-all duration-300
          hover:-translate-y-1
        "
      >
        {/* Icon Box */}
        <div
          className="
            w-10 h-10
            bg-cornsilk-500/50
            border border-cornsilk-500/50
            flex items-center justify-center
            transition duration-300
            group-hover:rotate-90
          "
        >
          <Plus size={22} />
        </div>

        {/* Text */}
        <div className="flex flex-col items-start leading-none">
          <span className="uppercase tracking-[0.18em] text-[11px] font-semibold text-cornsilk-500/70 mb-1">
            Create
          </span>

          <span className="font-black text-sm md:text-base tracking-wide">
            Write Article
          </span>
        </div>
      </button>
    </div>
  );
}

export default AuthorProfile;