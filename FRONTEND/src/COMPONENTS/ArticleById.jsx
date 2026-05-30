import { useParams, useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { BASE_URL } from "../config/api.js";
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
          `${BASE_URL}/user-api/article/${id}`,
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
        `${BASE_URL}/author-api/articles/${id}/status`,
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
      `${BASE_URL}/user-api/comment`,
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
  <div className="min-h-screen bg-cornsilk-500 py-12 px-6 md:px-10">
    <div className="max-w-5xl mx-auto">
      {/* Article Container */}
      <div className="border border-olive_leaf-300 bg-cornsilk-600 shadow-sm overflow-hidden">
        {/* Accent Bar */}
        <div className="h-1.5 bg-copperwood-500"></div>

        {/* Hero Section */}
        <div className="p-8 md:p-14 border-b border-olive_leaf-300">
          {/* Category */}
          <span className="inline-flex bg-black_forest-500 text-cornsilk-500 px-5 py-2 uppercase tracking-[0.18em] text-xs font-bold shadow-sm">
            {article.category}
          </span>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight mt-8 text-black_forest-500">
            {article.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center justify-between gap-8 mt-12">
            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 border border-olive_leaf-300 overflow-hidden shadow-sm">
                <img
                  src={
                    article.author
                      ?.profileImageUrl ||
                    "https://th.bing.com/th/id/OIP.cN620h43KlX8Sa15ZIsJfQHaHa?w=202&h=202&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3"
                  }
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <p className="text-lg font-bold text-black_forest-500">
                  {article.author?.firstName ||
                    "Author"}
                </p>

                <p className="uppercase tracking-[0.15em] text-xs text-olive_leaf-500 font-semibold">
                  Article Author
                </p>
              </div>
            </div>

            {/* Date */}
            <div className="flex items-center gap-3 border border-olive_leaf-300 bg-cornsilk-500 px-5 py-3 shadow-sm">
              <CalendarDays
                size={18}
                className="text-copperwood-500"
              />

              <span className="text-black_forest-500 font-medium">
                {formatDate(article.createdAt)}
              </span>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="p-8 md:p-14">
          <div className="max-w-none">
            <p className="whitespace-pre-line text-[18px] leading-[2.2rem] text-black_forest-500 font-[450]">
              {article.content}
            </p>
          </div>

          {/* Author Actions */}
          {user?.role === "AUTHOR" && (
            <div className="flex flex-wrap gap-4 mt-14">
              {/* Edit */}
              <button
                className="flex items-center gap-3 bg-black_forest-500 hover:bg-black_forest-600 text-cornsilk-500 px-7 py-3 uppercase tracking-[0.12em] text-sm font-bold transition duration-300 shadow-md"
                onClick={() =>
                  editArticle(article)
                }
              >
                <Pencil size={18} />
                Edit Article
              </button>

              {/* Delete / Restore */}
              <button
                className={`flex items-center gap-3 px-7 py-3 uppercase tracking-[0.12em] text-sm font-bold transition duration-300 shadow-md ${
                  article.isArticleActive
                    ? "bg-copperwood-500 hover:bg-copperwood-400 text-cornsilk-500"
                    : "bg-olive_leaf-500 hover:bg-olive_leaf-600 text-cornsilk-500"
                }`}
                onClick={toggleArticleStatus}
              >
                <Trash2 size={18} />

                {article.isArticleActive
                  ? "Delete Article"
                  : "Restore Article"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-10 border border-olive_leaf-300 bg-cornsilk-600 shadow-sm overflow-hidden">
        {/* Top Accent */}
        <div className="h-[5px] bg-black_forest-500"></div>

        <div className="p-8 md:p-10">
          {/* Heading */}
          <div className="flex flex-wrap items-center justify-between gap-5 mb-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-copperwood-500 flex items-center justify-center">
                <MessageCircle
                  className="text-cornsilk-500"
                  size={22}
                />
              </div>

              <div>
                <h2 className="text-3xl font-black text-black_forest-500">
                  Comments
                </h2>

                <p className="uppercase tracking-[0.15em] text-xs text-olive_leaf-500 font-semibold mt-1">
                  Community Discussion
                </p>
              </div>
            </div>

            {/* Count */}
            <div className="border border-olive_leaf-300 bg-cornsilk-500 px-5 py-3 text-black_forest-500 font-bold shadow-sm">
              {article.comments?.length || 0} Comments
            </div>
          </div>

          {/* Add Comment */}
          {user?.role === "USER" && (
            <form
              onSubmit={handleSubmit(addComment)}
              className="mb-12"
            >
              <textarea
                {...register("comment")}
                placeholder="Share your thoughts..."
                rows={2}
                className="w-full border border-olive_leaf-300 bg-cornsilk-500 p-5 outline-none focus:border-copperwood-500 resize-none text-black_forest-500 placeholder:text-olive_leaf-400 leading-relaxed transition duration-300"
              />

              <button className="mt-5 bg-copperwood-500 hover:bg-copperwood-400 text-cornsilk-500 px-7 py-3 uppercase tracking-[0.15em] text-sm font-bold transition duration-300 shadow-md">
                Add Comment
              </button>
            </form>
          )}

          {/* Comments List */}
          <div className="space-y-6">
            {visibleComments?.map(
              (comment, index) => (
                <div
                  key={index}
                  className="border border-olive_leaf-300 bg-cornsilk-500 p-6 shadow-sm"
                >
                  {/* User */}
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 bg-black_forest-500 flex items-center justify-center">
                      <User
                        size={18}
                        className="text-cornsilk-500"
                      />
                    </div>

                    <div>
                      <p className="font-bold text-black_forest-500">
                        {comment.user?.email}
                      </p>

                      <p className="uppercase tracking-[0.15em] text-xs text-olive_leaf-500 font-semibold">
                        Reader
                      </p>
                    </div>
                  </div>

                  {/* Comment */}
                  <p className="text-black_forest-500 leading-8">
                    {comment.comment}
                  </p>
                </div>
              )
            )}
          </div>

          {/* Show More */}
          {article.comments?.length > 2 && (
            <div className="flex justify-center mt-10">
              <button
                onClick={() =>
                  setShowAllComments(
                    !showAllComments
                  )
                }
                className="flex items-center gap-3 uppercase tracking-[0.12em] text-sm font-bold text-copperwood-500 hover:text-copperwood-400 transition"
              >
                {showAllComments
                  ? "Show Less"
                  : "Show More Comments"}

                <ChevronDown
                  size={18}
                  className={`transition duration-300 ${
                    showAllComments
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-8 border-t border-olive_leaf-300 pt-6">
        <p className="uppercase tracking-[0.15em] text-xs text-olive_leaf-500 font-semibold">
          Last Updated
        </p>

        <p className="text-black_forest-500 font-bold mt-2">
          {formatDate(article.updatedAt)}
        </p>
      </div>
    </div>
  </div>
);
}

export default ArticleByID;