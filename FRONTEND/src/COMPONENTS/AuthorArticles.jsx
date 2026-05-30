import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config/api.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../STORES/authStore";

import {
  CalendarDays,
  ArrowUpRight,
  FileText,
} from "lucide-react";

function AuthorArticles() {

  const navigate = useNavigate();

  const user = useAuth(
    (state) => state.currentUser
  );

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] =
    useState(false);

  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;

    const getAuthorArticles = async () => {

      setLoading(true);

      try {

        const res = await axios.get(
          `${BASE_URL}/author-api/articles/${user.userId}`,
          {
            withCredentials: true,
          }
        );

        setArticles(res.data.payload);

      } catch (err) {

        console.log(err);

        setError(
          err.response?.data?.error ||
            "Failed to fetch articles"
        );

      } finally {

        setLoading(false);
      }
    };

    getAuthorArticles();

  }, [user]);

  const openArticle = (article) => {

    navigate(`/article/${article._id}`, {
      state: article,
    });
  };

  const formatDate = (date) => {

    return new Date(date).toLocaleString(
      "en-IN",
      {
        timeZone: "Asia/Kolkata",
        dateStyle: "medium",
      }
    );
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-5">

          <div className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>

          <p className="text-zinc-500 text-lg">
            Loading your articles...
          </p>

        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 rounded-3xl p-6 text-center">
        {error}
      </div>
    );
  }

    if (articles.length === 0) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center px-6">
          <div className="border border-olive_leaf-300 bg-cornsilk-600 shadow-sm p-12 text-center max-w-lg">

            {/* Icon */}
            <div className="w-20 h-20 bg-black_forest-500 flex items-center justify-center mx-auto mb-6">
              <FileText
                size={34}
                className="text-cornsilk-500"
              />
            </div>

            {/* Title */}
            <h2 className="text-3xl font-black text-black_forest-500 mb-4">
              No Articles Yet
            </h2>

            {/* Description */}
            <p className="text-olive_leaf-500 leading-relaxed text-[15px] max-w-md mx-auto">
              Start sharing your thoughts, ideas, and knowledge with the world by creating your first article.
            </p>

            {/* Optional CTA hint */}
            <div className="mt-8">
              <p className="uppercase tracking-[0.15em] text-xs font-semibold text-copperwood-500">
                Use “Write Article” button to begin
              </p>
            </div>

          </div>
        </div>
      );
    }

    return (
        <div className="min-h-screen bg-cornsilk-500 px-6 md:px-10 py-12">
          <div className="max-w-7xl mx-auto">

            {/* Header */}
            <div className="border-b border-olive_leaf-300 pb-10 mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-8">

              <div>
                <p className="uppercase tracking-[0.22em] text-sm font-bold text-copperwood-500 mb-3">
                  Author Dashboard
                </p>

                <h1 className="text-5xl md:text-6xl font-black text-black_forest-500 leading-tight">
                  Your Articles
                </h1>

                <p className="mt-4 text-olive_leaf-500 max-w-2xl text-lg leading-relaxed">
                  Manage, edit, and track all your published articles in one place.
                </p>
              </div>

              <div className="border border-olive_leaf-300 bg-cornsilk-600 px-6 py-4 shadow-sm">
                <p className="uppercase tracking-[0.18em] text-xs text-olive_leaf-500 font-semibold">
                  Total Articles
                </p>

                <p className="text-3xl font-black text-black_forest-500 mt-1">
                  {articles.length}
                </p>
              </div>

            </div>

            {/* Empty State */}
            {articles.length === 0 ? (
              <div className="border border-olive_leaf-300 bg-cornsilk-600 py-24 px-8 text-center">
                <div className="w-20 h-20 bg-black_forest-500 flex items-center justify-center mx-auto mb-6">
                  <FileText className="text-cornsilk-500" size={34} />
                </div>

                <h2 className="text-3xl font-black text-black_forest-500">
                  No Articles Yet
                </h2>

                <p className="text-olive_leaf-500 mt-4 max-w-lg mx-auto leading-relaxed">
                  Start writing and publishing your thoughts to build your presence on the platform.
                </p>
              </div>
            ) : (
              /* Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

                {articles.map((article) => (
                  <div
                    key={article._id}
                    className="group border border-olive_leaf-300 bg-cornsilk-600 shadow-sm flex flex-col hover:border-copperwood-500 transition duration-300"
                  >

                    {/* Accent Bar */}
                    <div className="h-[5px] bg-olive_leaf-500 group-hover:bg-copperwood-500 transition" />

                    <div className="p-7 flex flex-col flex-1">

                      {/* Top badges */}
                      <div className="flex items-start justify-between mb-6">

                        <div className="flex flex-col gap-3">

                          <span className="w-fit bg-black_forest-500 text-cornsilk-500 px-4 py-1 uppercase tracking-[0.15em] text-xs font-bold">
                            {article.category}
                          </span>

                          <span
                            className={`w-fit px-3 py-1 uppercase tracking-[0.15em] text-xs font-bold border ${
                              article.isArticleActive
                                ? "bg-olive_leaf-800 text-black_forest-500 border-olive_leaf-300"
                                : "bg-copperwood-800 text-black_forest-500 border-copperwood-300"
                            }`}
                          >
                            {article.isArticleActive ? "ACTIVE" : "DELETED"}
                          </span>

                        </div>

                        <ArrowUpRight
                          size={20}
                          className="text-olive_leaf-400 group-hover:text-copperwood-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition"
                        />

                      </div>

                      {/* Title */}
                      <h2 className="text-2xl font-black text-black_forest-500 leading-snug mb-4 line-clamp-2 group-hover:text-copperwood-500 transition">
                        {article.title}
                      </h2>

                      {/* Content */}
                      <p className="text-olive_leaf-500 leading-relaxed line-clamp-4 mb-8 text-[15px]">
                        {article.content}
                      </p>

                      {/* Footer */}
                      <div className="mt-auto flex items-center justify-between border-t border-olive_leaf-300 pt-6">

                        <div className="flex items-center gap-2 text-olive_leaf-500 text-sm">
                          <CalendarDays size={16} />
                          <span>
                            {formatDate(article.createdAt)}
                          </span>
                        </div>

                        <button
                          onClick={() => openArticle(article)}
                          className="bg-copperwood-500 hover:bg-copperwood-400 text-cornsilk-500 px-6 py-2 uppercase tracking-[0.12em] text-sm font-bold transition"
                        >
                          Open
                        </button>

                      </div>

                    </div>
                  </div>
                ))}

              </div>
            )}

          </div>
        </div>
      );
}

export default AuthorArticles;