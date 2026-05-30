import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../STORES/authStore";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config/api.js";
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
        `${BASE_URL}/author-api/articles`,
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
  <div className="min-h-screen bg-cornsilk-500 py-12 px-6 md:px-10">
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="border-b border-olive_leaf-300 pb-10 mb-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <div className="flex items-center gap-5 mb-6">
              {/* Icon */}
              <div className="w-16 h-16 bg-black_forest-500 flex items-center justify-center shadow-md">
                <PenSquare
                  className="text-cornsilk-500"
                  size={30}
                />
              </div>

              {/* Title */}
              <div>
                <p className="uppercase tracking-[0.22em] text-sm font-bold text-copperwood-500 mb-2">
                  Author Workspace
                </p>

                <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-none text-black_forest-500">
                  Write Article
                </h1>
              </div>
            </div>

            <p className="text-lg leading-relaxed max-w-2xl text-olive_leaf-500">
              Share technical knowledge, stories,
              experiences, and insights with readers
              across the platform.
            </p>
          </div>

          {/* Author Info */}
          <div className="border border-olive_leaf-300 bg-cornsilk-600 px-6 py-5 shadow-sm min-w-[260px]">
            <p className="uppercase tracking-[0.18em] text-xs font-semibold text-olive_leaf-500 mb-2">
              Publishing As
            </p>

            <h2 className="text-2xl font-black text-black_forest-500">
              {currentUser?.firstName}
            </h2>

            <p className="uppercase tracking-[0.15em] text-xs text-copperwood-500 font-bold mt-2">
              Author Account
            </p>
          </div>
        </div>
      </div>

      {/* Form Container */}
      <div className="border border-olive_leaf-300 bg-cornsilk-600 shadow-sm overflow-hidden">
        {/* Accent */}
        <div className="h-[6px] bg-copperwood-500"></div>

        <div className="p-8 md:p-14">
          <form
            onSubmit={handleSubmit(
              submitArticle
            )}
            className="space-y-10"
          >
            {/* Title */}
            <div>
              <label className="flex items-center gap-3 uppercase tracking-[0.12em] text-sm font-bold text-black_forest-500 mb-4">
                <FileText
                  size={18}
                  className="text-copperwood-500"
                />
                Article Title
              </label>

              <input
                type="text"
                {...register("title", {
                  required: true,
                })}
                placeholder="Enter article title..."
                className="w-full border border-olive_leaf-300 bg-cornsilk-500 px-6 py-5 text-2xl font-bold text-black_forest-500 placeholder:text-olive_leaf-400 outline-none focus:border-copperwood-500 transition duration-300"
              />

              {errors.title?.type ===
                "required" && (
                <p className="text-copperwood-500 mt-3 text-sm font-semibold uppercase tracking-wide">
                  Title is required
                </p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="flex items-center gap-3 uppercase tracking-[0.12em] text-sm font-bold text-black_forest-500 mb-4">
                <Layers3
                  size={18}
                  className="text-copperwood-500"
                />
                Category
              </label>

              <select
                {...register("category", {
                  required: true,
                })}
                className="w-full border border-olive_leaf-300 bg-cornsilk-500 px-6 py-5 text-black_forest-500 font-semibold outline-none focus:border-copperwood-500 transition duration-300"
                defaultValue=""
              >
                <option value="" disabled>
                  -- Select Category --
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

                <option value="Food">
                  Food
                </option>
              </select>

              {errors.category?.type ===
                "required" && (
                <p className="text-copperwood-500 mt-3 text-sm font-semibold uppercase tracking-wide">
                  Category is required
                </p>
              )}
            </div>

            {/* Content */}
            <div>
              <label className="flex items-center gap-3 uppercase tracking-[0.12em] text-sm font-bold text-black_forest-500 mb-4">
                <PenSquare
                  size={18}
                  className="text-copperwood-500"
                />
                Article Content
              </label>

              <textarea
                {...register("content", {
                  required: true,
                })}
                rows={16}
                placeholder="Write your article content here..."
                className="w-full border border-olive_leaf-300 bg-cornsilk-500 px-6 py-6 text-black_forest-500 placeholder:text-olive_leaf-400 outline-none focus:border-copperwood-500 transition duration-300 resize-none leading-[2rem] text-[17px]"
              ></textarea>

              {errors.content?.type ===
                "required" && (
                <p className="text-copperwood-500 mt-3 text-sm font-semibold uppercase tracking-wide">
                  Content is required
                </p>
              )}
            </div>

            {/* Submit */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={loading}
                className="
                  group
                  flex items-center gap-4
                  bg-black_forest-500 hover:bg-copperwood-500
                  disabled:opacity-70
                  text-cornsilk-500
                  px-8 py-4
                  uppercase tracking-[0.15em]
                  text-sm font-black
                  transition-all duration-300
                  shadow-lg
                "
              >
                {/* Icon */}
                <div className="w-10 h-10 border border-cornsilk-500/20 bg-cornsilk-500/10 flex items-center justify-center group-hover:rotate-90 transition duration-300">
                  <PenSquare size={18} />
                </div>

                <span>
                  {loading
                    ? "Publishing..."
                    : "Publish Article"}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
);
}

export default WriteArticle;