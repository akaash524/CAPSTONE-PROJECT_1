import { useEffect } from "react";
import { useAuth } from "../STORES/authStore";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { LogIn } from "lucide-react";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const login = useAuth((state) => state.login);
  const isAuthenticated = useAuth(
    (state) => state.isAuthenticated
  );
  const currentUser = useAuth((state) => state.currentUser);
  const error = useAuth((state) => state.error);
  const loading = useAuth((state) => state.loading);

  const navigate = useNavigate();

  // Handle Login
  const handleForm = async (userCred) => {
    await login(userCred);
  };

  // Success Navigation
  useEffect(() => {
    if (isAuthenticated && currentUser) {
      toast.success("Logged in successfully", {
            style: {
              background: "#283618",
              color: "#fefae0",
              border: "1px solid #606c38",
            },
          });
      if (currentUser.role === "USER") {
        navigate("/user-profile");
      }

      if (currentUser.role === "AUTHOR") {
        navigate("/author-profile");
      }

      if (currentUser.role === "ADMIN") {
        navigate("/admin-profile");
      }
    }
  }, [isAuthenticated, currentUser]);

  // Error Toast
  useEffect(() => {
    if (error) {
      toast.error(error, {
          style: {
            background: "#bc6c25",
            color: "#fefae0",
            border: "1px solid #96561e",
          },
        });
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-cornsilk-500 flex items-center justify-center px-6 py-12">

      {/* Container */}
      <div className="w-full max-w-md">

        {/* Card */}
        <div className="border border-olive_leaf-300 bg-cornsilk-600 shadow-sm overflow-hidden">

          {/* Accent Bar */}
          <div className="h-1.5 bg-copperwood-500"></div>

          <div className="p-10">

            {/* Header */}
            <div className="text-center mb-10">

              <div className="w-18 h-18 bg-black_forest-500 flex items-center justify-center mx-auto mb-6">
                <LogIn
                  size={30}
                  className="text-cornsilk-500"
                />
              </div>

              <p className="uppercase tracking-[0.25em] text-xs font-bold text-copperwood-500 mb-3">
                Blogsphere
              </p>

              <h1 className="text-5xl font-black text-black_forest-500 leading-none">
                Welcome Back
              </h1>

              <p className="text-olive_leaf-500 mt-4 leading-relaxed">
                Sign in to continue reading, writing,
                and sharing stories.
              </p>

            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit(handleForm)}
              className="space-y-7"
            >

              {/* Email */}
              <div>
                <label className="block mb-3 uppercase tracking-[0.12em] text-xs font-bold text-black_forest-500">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="you@example.com"
                  {...register("email", {
                    required: "Email is required",
                  })}
                  className="
                    w-full
                    border border-olive_leaf-300
                    bg-cornsilk-500
                    px-5 py-4
                    text-black_forest-500
                    placeholder:text-olive_leaf-400
                    outline-none
                    focus:border-copperwood-500
                    transition
                  "
                />

                {errors.email && (
                  <p className="mt-2 text-copperwood-500 text-sm font-semibold">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block mb-3 uppercase tracking-[0.12em] text-xs font-bold text-black_forest-500">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="
                    w-full
                    border border-olive_leaf-300
                    bg-cornsilk-500
                    px-5 py-4
                    text-black_forest-500
                    placeholder:text-olive_leaf-400
                    outline-none
                    focus:border-copperwood-500
                    transition
                  "
                />

                {errors.password && (
                  <p className="mt-2 text-copperwood-500 text-sm font-semibold">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="
                  w-full
                  bg-black_forest-500
                  hover:bg-copperwood-500
                  disabled:opacity-70
                  text-cornsilk-500
                  py-4
                  uppercase
                  tracking-[0.15em]
                  text-sm
                  font-black
                  transition-all duration-300
                "
              >
                {loading
                  ? "Signing In..."
                  : "Sign In"}
              </button>

            </form>

            {/* Footer */}
            <div className="mt-10 pt-8 border-t border-olive_leaf-300 text-center">

              <p className="text-olive_leaf-500">
                Don't have an account?
              </p>

              <Link
                to="/register"
                className="
                  inline-block
                  mt-3
                  uppercase
                  tracking-[0.15em]
                  text-sm
                  font-bold
                  text-copperwood-500
                  hover:text-black_forest-500
                  transition
                "
              >
                Create Account
              </Link>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;