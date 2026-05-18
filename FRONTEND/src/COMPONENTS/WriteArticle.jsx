import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../STORES/authStore";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {
  PenSquare,
  FileText,
  Layers3,
} from "lucide-react";

function WriteArticle() {
  let {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const currentUser = useAuth(
    (state) => state.currentUser
  );

  const submitArticle = async (articleObj) => {
    setLoading(true);

    // add authorId
    articleObj.author = currentUser.userId;

    try {
      await axios.post(
        "https://capstone-project-1-zhbo.onrender.com/author-api/articles",
        articleObj,
        { withCredentials: true }
      );

      toast.success(
        "Article published successfully!"
      );

      reset();

      navigate("/author-profile/articles");
    } catch (err) {
      toast.error(
        err.response?.data?.error ||
          "Failed to publish article"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] py-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
              <PenSquare
                className="text-blue-600"
                size={28}
              />
            </div>

            <div>
              <h1 className="text-4xl font-extrabold text-zinc-900">
                Write New Article
              </h1>

              <p className="text-zinc-500 mt-1">
                Share your ideas with readers around
                the world.
              </p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white border border-zinc-200 rounded-[36px] shadow-sm p-8 md:p-12">
          <form
            onSubmit={handleSubmit(submitArticle)}
            className="space-y-8"
          >
            {/* Title */}
            <div>
              <label className="flex items-center gap-2 text-zinc-800 font-semibold mb-3">
                <FileText size={18} />
                Article Title
              </label>

              <input
                type="text"
                {...register("title", {
                  required: true,
                })}
                placeholder="Enter article title..."
                className="w-full border border-zinc-300 rounded-2xl px-5 py-4 text-lg outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition"
              />

              {errors.title?.type ===
                "required" && (
                <p className="text-red-500 mt-2 text-sm">
                  Title is required
                </p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="flex items-center gap-2 text-zinc-800 font-semibold mb-3">
                <Layers3 size={18} />
                Category
              </label>

              <select
                {...register("category", {
                  required: true,
                })}
                className="w-full border border-zinc-300 rounded-2xl px-5 py-4 text-zinc-700 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition bg-white"
                defaultValue=""
              >
                <option value="" disabled>
                  -- Select a Category --
                </option>

                <option value="Personal">
                  Personal
                </option>

                <option value="Business">
                  Business
                </option>

                <option value="Technology">
                  Technology
                </option>

                <option value="Travel">
                  Travel
                </option>

                <option value="Food">Food</option>
              </select>

              {errors.category?.type ===
                "required" && (
                <p className="text-red-500 mt-2 text-sm">
                  Category is required
                </p>
              )}
            </div>

            {/* Content */}
            <div>
              <label className="text-zinc-800 font-semibold mb-3 block">
                Article Content
              </label>

              <textarea
                {...register("content", {
                  required: true,
                })}
                rows={14}
                placeholder="Write your article content here..."
                className="w-full border border-zinc-300 rounded-3xl px-5 py-5 text-zinc-700 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition resize-none leading-8"
              ></textarea>

              {errors.content?.type ===
                "required" && (
                <p className="text-red-500 mt-2 text-sm">
                  Content is required
                </p>
              )}
            </div>

            {/* Submit */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition shadow-lg shadow-blue-100"
              >
                {loading
                  ? "Publishing..."
                  : "Publish Article"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default WriteArticle;