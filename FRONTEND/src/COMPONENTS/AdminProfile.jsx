import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../config/api.js";
import {
  Users,
  Shield,
  UserX,
  UserCheck,
} from "lucide-react";

function AdminProfile() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] =
    useState(true);

  const getUsers = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/admin-api/users`,
        {
          withCredentials: true,
        }
      );

      setUsers(res.data.payload);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to fetch users"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const blockUser = async (id) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/admin-api/block`,
        { id },
        {
          withCredentials: true,
        }
      );

      toast.success(res.data.message);

      setUsers((prev) =>
        prev.map((u) =>
          u._id === id
            ? { ...u, isActive: false }
            : u
        )
      );
    } catch (err) {
      toast.error(
        err.response?.data?.message
      );
    }
  };

  const unblockUser = async (id) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/admin-api/unblock`,
        { id },
        {
          withCredentials: true,
        }
      );

      toast.success(res.data.message);

      setUsers((prev) =>
        prev.map((u) =>
          u._id === id
            ? { ...u, isActive: true }
            : u
        )
      );
    } catch (err) {
      toast.error(
        err.response?.data?.message
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cornsilk-500 flex items-center justify-center">
        <div className="w-14 h-14 border-4 border-copperwood-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cornsilk-500 px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="border border-olive_leaf-300 bg-cornsilk-600 mb-8">

          <div className="h-1.5 bg-copperwood-500"></div>

          <div className="p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div>
              <p className="uppercase tracking-[0.2em] text-xs font-bold text-copperwood-500 mb-2">
                Administration
              </p>

              <h1 className="text-5xl font-black text-black_forest-500">
                Admin Dashboard
              </h1>

              <p className="text-olive_leaf-500 mt-3">
                Manage platform users and
                permissions.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-black_forest-500 text-cornsilk-500 px-6 py-4">
              <Users size={20} />

              <span className="font-bold">
                {users.length} Users
              </span>
            </div>

          </div>
        </div>

        {/* Users Grid */}
        <div className="grid gap-6">

          {users.map((user) => (
            <div
              key={user._id}
              className="border border-olive_leaf-300 bg-cornsilk-600"
            >
              <div className="p-6">

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                  <div className="flex items-center gap-5">

                    <img
                      src={
                        user.profileImageUrl ||
                        "https://via.placeholder.com/80"
                      }
                      alt=""
                      className="w-16 h-16 object-cover border border-olive_leaf-300"
                    />

                    <div>
                      <h2 className="text-xl font-black text-black_forest-500">
                        {user.firstName}{" "}
                        {user.lastName}
                      </h2>

                      <p className="text-olive_leaf-500">
                        {user.email}
                      </p>

                      <div className="flex gap-3 mt-3">

                        <span className="bg-black_forest-500 text-cornsilk-500 px-3 py-1 text-xs font-bold uppercase tracking-wider">
                          {user.role}
                        </span>

                        <span
                          className={`px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                            user.isActive
                              ? "bg-green-600 text-white"
                              : "bg-red-600 text-white"
                          }`}
                        >
                          {user.isActive
                            ? "Active"
                            : "Blocked"}
                        </span>

                      </div>
                    </div>

                  </div>

                  <div>

                    {user.isActive ? (
                      <button
                        onClick={() =>
                          blockUser(user._id)
                        }
                        className="
                          flex items-center gap-3
                          bg-black_forest-500
                          hover:bg-copperwood-500
                          text-cornsilk-500
                          px-6 py-3
                          font-bold
                          transition
                        "
                      >
                        <UserX size={18} />
                        Block User
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          unblockUser(user._id)
                        }
                        className="
                          flex items-center gap-3
                          bg-black_forest-500
                          hover:bg-copperwood-500
                          text-cornsilk-500
                          px-6 py-3
                          font-bold
                          transition
                        "
                      >
                        <UserCheck size={18} />
                        Unblock User
                      </button>
                    )}

                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default AdminProfile;