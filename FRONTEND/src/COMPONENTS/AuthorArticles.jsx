import { useEffect, useState } from "react";
import axios from "axios";
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
          `https://capstone-project-1-zhbo.onrender.com/author-api/articles/${user.userId}`,
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
      <div className="min-h-[60vh] flex items-center justify-center">

        <div className="bg-white border border-zinc-200 rounded-[32px] p-12 text-center max-w-lg shadow-sm">

          <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-6">

            <FileText
              size={36}
              className="text-blue-600"
            />

          </div>

          <h2 className="text-3xl font-bold text-zinc-900 mb-3">
            No Articles Yet
          </h2>

          <p className="text-zinc-500 leading-7">
            Start sharing your thoughts and
            ideas with the world by creating
            your first article.
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="px-4 md:px-8 py-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">

        <div>

          <h1 className="text-4xl font-extrabold text-zinc-900">
            Your Articles
          </h1>

          <p className="text-zinc-500 mt-2">
            Manage, edit, and track all your
            published articles.
          </p>

        </div>

        <div className="bg-blue-50 border border-blue-100 text-blue-700 px-5 py-3 rounded-2xl font-medium w-fit">
          {articles.length} Articles
        </div>

      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

        {articles.map((article) => (

          <div
            key={article._id}
            className="
              group
              bg-white
              border border-zinc-200
              rounded-[32px]
              p-7
              hover:shadow-2xl
              hover:shadow-black/5
              transition-all duration-300
              hover:-translate-y-1
              flex flex-col
            "
          >

            {/* Top */}
            <div className="flex items-start justify-between gap-4 mb-6">

              <div className="flex flex-col gap-3">

                <span className="w-fit bg-blue-50 text-blue-600 border border-blue-100 px-4 py-1.5 rounded-full text-sm font-medium">
                  {article.category}
                </span>

                <span
                  className={`w-fit px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${
                    article.isArticleActive
                      ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                      : "bg-red-50 text-red-500 border border-red-100"
                  }`}
                >
                  {article.isArticleActive
                    ? "ACTIVE"
                    : "DELETED"}
                </span>

              </div>

              <ArrowUpRight
                size={22}
                className="text-zinc-300 group-hover:text-blue-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition"
              />

            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-zinc-900 leading-snug mb-4 line-clamp-2">
              {article.title}
            </h2>

            {/* Content */}
            <p className="text-zinc-600 leading-7 line-clamp-4 mb-8">
              {article.content}
            </p>

            {/* Footer */}
            <div className="mt-auto flex items-center justify-between pt-6 border-t border-zinc-100">

              <div className="flex items-center gap-2 text-zinc-500 text-sm">

                <CalendarDays size={16} />

                <span>
                  {formatDate(
                    article.createdAt
                  )}
                </span>

              </div>

              <button
                onClick={() =>
                  openArticle(article)
                }
                className="
                  bg-zinc-900
                  hover:bg-blue-600
                  text-white
                  px-5 py-2.5
                  rounded-2xl
                  text-sm
                  font-medium
                  transition
                "
              >
                Open
              </button>

            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default AuthorArticles;