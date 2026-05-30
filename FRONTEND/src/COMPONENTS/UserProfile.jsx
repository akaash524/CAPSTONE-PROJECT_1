import { useState, useEffect } from "react";
import { useAuth } from "../STORES/authStore";
import { useNavigate } from "react-router";
import axios from "axios";
import { BASE_URL } from "../config/api.js";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
} from "lucide-react";

function UserProfile() {
  const currentUser = useAuth(
    (state) => state.currentUser
  );

  const navigate = useNavigate();

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Navigate To Article
  const navigateToArticleById = (articleObj) => {
    navigate(`/article/${articleObj._id}`, {
      state: articleObj,
    });
  };

  // Fetch Articles
  useEffect(() => {
    const getAllArticles = async () => {
      setLoading(true);

      try {
        const res = await axios.get(
          `${BASE_URL}/user-api/articles`,
          {
            withCredentials: true,
          }
        );

        setArticles(res.data.payload);
      } catch (err) {
        console.log("Err is ", err);

        setError(
          err.response?.data?.error ||
            "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    getAllArticles();
  }, []);

  // Format Date
  const formatDateIST = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <div className="w-14 h-14 border-[3px] border-blue-500 border-t-transparent animate-spin"></div>

          <p className="text-zinc-400 tracking-wide text-sm uppercase">
            Loading Articles
          </p>
        </div>
      </div>
    );
  }

    return (
      <div className="min-h-screen bg-cornsilk-500 text-black_forest-500 px-6 md:px-12 py-12">
        {/* Header */}
        <div className="border-b border-olive_leaf-300 pb-10 mb-14">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 bg-black_forest-500 flex items-center justify-center shadow-lg">
                  <BookOpen
                    size={28}
                    className="text-cornsilk-500"
                  />
                </div>

                <div>
                  <p className="uppercase tracking-[0.25em] text-sm font-semibold text-olive_leaf-500">
                    Community Blogs
                  </p>

                  <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-none text-black_forest-500">
                    Explore Articles
                  </h1>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-10 border-l-4 border-copperwood-500 bg-copperwood-900/20 px-5 py-4">
            <p className="text-copperwood-500 font-medium">
              {error}
            </p>
          </div>
        )}

        {/* Articles Grid */}
        {articles.length > 0 ? (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {articles.map((articleObj) => (
              <div
                key={articleObj._id}
                className="group bg-cornsilk-600 border border-olive_leaf-300 hover:border-copperwood-500 transition-all duration-300 flex flex-col shadow-sm hover:shadow-xl overflow-hidden"
              >
                {/* Accent Bar */}
                <div className="h-[5px] bg-olive_leaf-500 group-hover:bg-copperwood-500 transition-all duration-300"></div>

                <div className="p-7 flex flex-col flex-1">
                  {/* Date */}
                  <div className="flex items-center gap-2 text-sm text-olive_leaf-500 mb-6">
                    <CalendarDays size={16} />

                    <span>
                      {formatDateIST(
                        articleObj.createdAt
                      )}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-3xl font-extrabold leading-tight text-black_forest-500 group-hover:text-copperwood-500 transition duration-300">
                    {articleObj.title}
                  </h2>

                  {/* Content */}
                  <p className="text-olive_leaf-500 mt-5 leading-relaxed line-clamp-5 text-[15px]">
                    {articleObj.content}
                  </p>

                  {/* Button */}
                  <div className="mt-auto pt-10">
                    <button
                      onClick={() =>
                        navigateToArticleById(
                          articleObj
                        )
                      }
                      className="flex items-center gap-3 uppercase tracking-[0.15em] text-sm font-bold text-copperwood-500 hover:text-copperwood-400 transition"
                    >
                      Read Full Article

                      <ArrowRight
                        size={18}
                        className="group-hover:translate-x-1 transition-transform duration-300"
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="border border-olive_leaf-300 bg-cornsilk-600 py-24 px-8 text-center shadow-sm">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-black_forest-500 flex items-center justify-center">
                <BookOpen
                  size={38}
                  className="text-cornsilk-500"
                />
              </div>
            </div>

            <h2 className="text-4xl font-black text-black_forest-500">
              No Articles Available
            </h2>

            <p className="text-olive_leaf-500 mt-5 max-w-xl mx-auto leading-relaxed text-lg">
              Articles published by creators will appear
              here once content becomes available on the
              platform.
            </p>
          </div>
        )}
      </div>
    );
}

export default UserProfile;