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
      toast.success("Logged in successfully ✨", {
        style: {
          background: "#18181b",
          color: "#fff",
          border: "1px solid #27272a",
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
          background: "#18181b",
          color: "#fff",
          border: "1px solid #27272a",
        },
      });
    }
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute w-112.5 h-112.5 bg-blue-600/20 blur-[120px] rounded-full"></div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-xl rounded-4xl p-8 shadow-2xl">
        {/* Top */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30">
            <LogIn size={28} className="text-white" />
          </div>

          <h1 className="text-4xl font-extrabold mt-6 text-white">
            Welcome Back
          </h1>

          <p className="text-zinc-400 mt-3 text-center">
            Sign in to continue your blogging journey.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(handleForm)}
          className="mt-10 space-y-6"
        >
          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
              })}
              className="w-full bg-white/5 border border-white/10 focus:border-blue-500 outline-none rounded-2xl px-5 py-4 text-white placeholder:text-zinc-500 transition"
            />

            {errors.email && (
              <p className="text-red-400 text-sm mt-2">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
              })}
              className="w-full bg-white/5 border border-white/10 focus:border-blue-500 outline-none rounded-2xl px-5 py-4 text-white placeholder:text-zinc-500 transition"
            />

            {errors.password && (
              <p className="text-red-400 text-sm mt-2">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white py-4 rounded-2xl font-semibold text-lg transition duration-300 shadow-lg shadow-blue-600/20"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Bottom */}
        <p className="text-zinc-400 text-center mt-8">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-400 hover:text-blue-300 font-medium"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;