import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import {
  formCard,
  formTitle,
  formGroup,
  labelClass,
  inputClass,
  submitBtn,
  errorClass,
  articlePageWrapper,
} from "../styles/common";
import { BASE_URL } from "../config/api.js";

function EditArticle() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const article = location.state;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // prefill form
  useEffect(() => {
    if (!article) return;

    setValue("title", article.title);
    setValue("category", article.category);
    setValue("content", article.content);
  }, [article]);

  const updateArticle = async (data) => {
    console.log(data);
    data.articleId = article._id;
    let res = await axios.put(`${BASE_URL}/author-api/articles`, data, { withCredentials: true });
    console.log("res update atricle", res);
    navigate(`/article/${article._id}`, {
      state: res.data.payload,
    });
  };

  return (

    <div className="min-h-screen bg-cornsilk-500 px-6 py-12">
      <div className="max-w-4xl mx-auto">
    {/* Card */}
    <div className="border border-olive_leaf-300 bg-cornsilk-600 shadow-sm overflow-hidden">

      {/* Accent Bar */}
      <div className="h-[6px] bg-copperwood-500"></div>

      <div className="p-10 md:p-12">

        {/* Header */}
        <div className="mb-10">

          <p className="uppercase tracking-[0.25em] text-xs font-bold text-copperwood-500 mb-3">
            Blogsphere Editor
          </p>

          <h1 className="text-5xl font-black text-black_forest-500 leading-none">
            Edit Article
          </h1>

          <p className="text-olive_leaf-500 mt-4 max-w-2xl leading-relaxed">
            Refine your content, update information,
            and improve your article before publishing.
          </p>

        </div>

        <form
          onSubmit={handleSubmit(updateArticle)}
          className="space-y-8"
        >

          {/* Title */}
          <div>

            <label className="block mb-3 uppercase tracking-[0.12em] text-xs font-bold text-black_forest-500">
              Article Title
            </label>

            <input
              {...register("title", {
                required: "Title required",
              })}
              className="
                w-full
                border border-olive_leaf-300
                bg-cornsilk-500
                px-5 py-4
                text-black_forest-500
                outline-none
                focus:border-copperwood-500
                transition
              "
            />

            {errors.title && (
              <p className="mt-2 text-copperwood-500 text-sm font-semibold">
                {errors.title.message}
              </p>
            )}

          </div>

          {/* Category */}
          <div>

            <label className="block mb-3 uppercase tracking-[0.12em] text-xs font-bold text-black_forest-500">
              Category
            </label>

            <select
              {...register("category", {
                required: "Category required",
              })}
              className="
                w-full
                border border-olive_leaf-300
                bg-cornsilk-500
                px-5 py-4
                text-black_forest-500
                outline-none
                focus:border-copperwood-500
                transition
              "
            >
              <option value="">
                Select category
              </option>

              <option value="technology">
                Technology
              </option>

              <option value="programming">
                Programming
              </option>

              <option value="ai">
                AI
              </option>

              <option value="web-development">
                Web Development
              </option>
            </select>

            {errors.category && (
              <p className="mt-2 text-copperwood-500 text-sm font-semibold">
                {errors.category.message}
              </p>
            )}

          </div>

          {/* Content */}
          <div>

            <label className="block mb-3 uppercase tracking-[0.12em] text-xs font-bold text-black_forest-500">
              Article Content
            </label>

            <textarea
              rows={14}
              {...register("content", {
                required: "Content required",
              })}
              className="
                w-full
                border border-olive_leaf-300
                bg-cornsilk-500
                px-5 py-4
                text-black_forest-500
                leading-8
                resize-none
                outline-none
                focus:border-copperwood-500
                transition
              "
            />

            {errors.content && (
              <p className="mt-2 text-copperwood-500 text-sm font-semibold">
                {errors.content.message}
              </p>
            )}

          </div>

          {/* Submit */}
          <button
            type="submit"
            className="
              w-full
              bg-black_forest-500
              hover:bg-copperwood-500
              text-cornsilk-500
              py-4
              uppercase
              tracking-[0.15em]
              text-sm
              font-black
              transition-all duration-300
            "
          >
            Update Article
          </button>

        </form>

      </div>
    </div>

  </div>

    </div>
  );

}

export default EditArticle;