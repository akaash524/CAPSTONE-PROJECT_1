import { useParams, useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../STORES/authStore.js";
import toast from "react-hot-toast";
import {
  CalendarDays,
  MessageCircle,
  Pencil,
  Trash2,
  User,
  ChevronDown,
} from "lucide-react";

function ArticleByID() {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const user = useAuth((state) => state.currentUser);

  const [article, setArticle] = useState(
    location.state || null
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [showAllComments, setShowAllComments] =
    useState(false);

  useEffect(() => {
    if (article) return;

    const getArticle = async () => {
      setLoading(true);

      try {
        const res = await axios.get(
          `https://capstone-project-1-zhbo.onrender.com/user-api/article/${id}`,
          { withCredentials: true }
        );

        setArticle(res.data.payload);
      } catch (err) {
        setError(err.response?.data?.error);
      } finally {
        setLoading(false);
      }
    };

    getArticle();
  }, [id]);

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // Delete / Restore
  const toggleArticleStatus = async () => {
    const newStatus = !article.isArticleActive;

    const confirmMsg = newStatus
      ? "Restore this article?"
      : "Delete this article?";

    if (!window.confirm(confirmMsg)) return;
//      /author-api/articles/6a0b15865700e828a2f567dc/status is Invalid path
    try {
      const res = await axios.patch(
        `https://capstone-project-1-zhbo.onrender.com/author-api/articles/${id}/status`,
        { isArticleActive: newStatus },
        { withCredentials: true }
      );

      setArticle(res.data.payload);

      toast.success(res.data.message);
    } catch (err) {
      const msg = err.response?.data?.message;

      if (err.response?.status === 400) {
        toast(msg);
      } else {
        setError(msg || "Operation failed");
      }
    }
  };

  // Edit Article
  const editArticle = (articleObj) => {
    navigate("/edit-article", {
      state: articleObj,
    });
  };

  // Add Comment
  const addComment = async (commentObj) => {
    commentObj.articleId = article._id;

    const res = await axios.post(
      "https://capstone-project-1-zhbo.onrender.com/user-api/comment",
      commentObj,
      { withCredentials: true }
    );

    if (res.status === 200) {
      toast.success(res.data.message);

      setArticle(res.data.payload);
    }

    reset();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f7fb]">
        <div className="flex flex-col items-center gap-5">
          <div className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>

          <p className="text-zinc-600 text-lg">
            Loading Article...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 rounded-2xl p-4 text-center">
        {error}
      </div>
    );
  }

  if (!article) return null;

  const visibleComments = showAllComments
    ? article.comments
    : article.comments?.slice(0, 2);

  return (
    <div className="min-h-screen bg-[#f5f7fb] py-10">
      <div className="max-w-5xl mx-auto">
        {/* Article Card */}
        <div className="bg-white border border-zinc-200 rounded-[36px] shadow-sm overflow-hidden">
          {/* Top Section */}
          <div className="p-8 md:p-14 border-b border-zinc-200">
            {/* Category */}
            <span className="inline-flex bg-blue-50 text-blue-600 border border-blue-100 px-4 py-2 rounded-full text-sm font-medium">
              {article.category}
            </span>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mt-6 text-zinc-900">
              {article.title}
            </h1>

            {/* Author Row */}
            <div className="flex flex-wrap items-center justify-between gap-6 mt-10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
                   <img
                        src={
                          article.author?.profileImageUrl ||
                          "https://th.bing.com/th/id/OIP.cN620h43KlX8Sa15ZIsJfQHaHa?w=202&h=202&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3"
                        }
                        alt="profile"
                        className="w-10 h-10 rounded-full object-cover border border-white/20"
                    />
                </div>

                <div>
                  <p className="font-semibold text-zinc-900">
                    {article.author?.firstName ||
                      "Author"}
                  </p>

                  <p className="text-zinc-500 text-sm">
                    Article Author
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-zinc-500">
                <CalendarDays size={18} />

                <span>
                  {formatDate(article.createdAt)}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-14">
            <div className="prose prose-zinc max-w-none text-lg leading-9">
              <p className="whitespace-pre-line text-zinc-700">
                {article.content}
              </p>
            </div>

            {/* Author Actions */}
            {user?.role === "AUTHOR" && (
              <div className="flex gap-4 mt-12">
                <button
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl transition"
                  onClick={() => editArticle(article)}
                >
                  <Pencil size={18} />
                  Edit
                </button>

                <button
                  className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-2xl transition"
                  onClick={toggleArticleStatus}
                >
                  <Trash2 size={18} />

                  {article.isArticleActive
                    ? "Delete"
                    : "Restore"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-10 bg-white border border-zinc-200 rounded-[36px] p-8 md:p-10 shadow-sm">
          {/* Heading */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <MessageCircle className="text-blue-600" />

              <h2 className="text-2xl font-bold text-zinc-900">
                Comments
              </h2>
            </div>

            <div className="bg-zinc-100 text-zinc-700 px-4 py-2 rounded-full text-sm font-medium">
              {article.comments?.length || 0} Comments
            </div>
          </div>

          {/* Add Comment */}
          {user?.role === "USER" && (
            <form
              onSubmit={handleSubmit(addComment)}
              className="mb-10"
            >
              <textarea
                {...register("comment")}
                placeholder="Write your thoughts here..."
                rows={4}
                className="w-full border border-zinc-300 rounded-3xl p-5 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 resize-none text-zinc-700"
              />

              <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl transition font-medium">
                Add Comment
              </button>
            </form>
          )}

          {/* Comments List */}
          <div className="space-y-5">
            {visibleComments?.map((comment, index) => (
              <div
                key={index}
                className="bg-zinc-50 border border-zinc-200 rounded-3xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center">
                    <User
                      size={18}
                      className="text-blue-600"
                    />
                  </div>

                  <div>
                    <p className="font-semibold text-zinc-900">
                      {comment.user?.email}
                    </p>

                    <p className="text-sm text-zinc-500">
                      Reader
                    </p>
                  </div>
                </div>

                <p className="text-zinc-700 leading-7">
                  {comment.comment}
                </p>
              </div>
            ))}
          </div>

          {/* Show More Button */}
          {article.comments?.length > 2 && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() =>
                  setShowAllComments(!showAllComments)
                }
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition"
              >
                {showAllComments
                  ? "Show Less"
                  : "Show More Comments"}

                <ChevronDown
                  size={18}
                  className={`transition ${
                    showAllComments
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center text-zinc-500 mt-8">
          Last updated:{" "}
          {formatDate(article.updatedAt)}
        </div>
      </div>
    </div>
  );
}

export default ArticleByID;