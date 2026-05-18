import { useState, useEffect } from "react";
import { useAuth } from "../STORES/authStore";
import { useNavigate } from "react-router";
import axios from "axios";
import {
  ArrowRight,
  BookOpen,
  User,
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
          "https://capstone-project-1-zhbo.onrender.com/user-api/articles",
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

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-5">
          <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

          <p className="text-zinc-300 text-lg">
            Loading Articles...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="text-zinc-900">
      {/* Error */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-2xl p-4 mb-8 text-center">
          {error}
        </div>
      )}

      {/* Profile Section  is shifted to header */}
      

      {/* Heading */}
      <div className="flex items-center gap-3 mb-10">
        <BookOpen className="text-blue-600" />

        <div>
          <h2 className="text-3xl font-extrabold">
            Explore Articles
          </h2>

          <p className="text-zinc-500 mt-1">
            Discover stories and ideas from creators.
          </p>
        </div>
      </div>

      {/* Articles */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
        {articles.map((articleObj) => (
          <div
            key={articleObj._id}
            className="group bg-white border border-zinc-200 rounded-[28px] p-7 hover:border-blue-300 hover:shadow-lg transition duration-300 flex flex-col"
          >
            {/* Date */}
            <p className="text-zinc-500 text-sm mb-5">
              {formatDateIST(articleObj.createdAt)}
            </p>

            {/* Title */}
            <h2 className="text-2xl font-bold leading-snug text-black group-hover:text-blue-400 transition">
              {articleObj.title}
            </h2>

            {/* Content */}
            <p className="text-zinc-600 mt-5 leading-relaxed line-clamp-4">
              {articleObj.content}
            </p>

            {/* Button */}
            <button
              onClick={() =>
                navigateToArticleById(articleObj)
              }
              className="mt-8 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition"
            >
              Read Article

              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition"
              />
            </button>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {!loading && articles.length === 0 && (
        <div className="text-center py-24">
          <h2 className="text-3xl font-bold">
            No Articles Available
          </h2>

          <p className="text-zinc-400 mt-4">
            Articles published by authors will appear here.
          </p>
        </div>
      )}
    </div>
  );
}

export default UserProfile;