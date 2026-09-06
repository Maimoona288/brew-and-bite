import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const Profile = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  // Check whether logged-in user is admin
  const isAdmin = user?.role === "admin";

  const [form, setForm] = useState({
    name: user.name,
    phone: user.phone || "",
    address: user.address || "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setSaving(true);

    try {
      // Basic profile data
      const payload = {
        name: form.name,
      };

      // Phone & address only for normal users
      if (!isAdmin) {
        payload.phone = form.phone;
        payload.address = form.address;
      }

      // Password only if entered
      if (form.password) {
        payload.password = form.password;
      }

      const { data } = await api.put("/auth/me", payload);

      updateUser(data);

      setMessage("Profile updated successfully.");

      setForm({
        ...form,
        password: "",
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to update your profile."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto px-5 md:px-8 py-12">

      <div className="flex items-center justify-between mb-8">
  <h1 className="font-display text-3xl text-espresso-800">
    My Profile
  </h1>

  <button
    type="button"
    onClick={() => navigate(isAdmin ? "/admin" : "/")}
    className="px-4 py-2 rounded-xl border border-espresso-200 text-espresso-600 hover:bg-cream-100 transition"
  >
    ← Back
  </button>
</div>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Email */}
        <div>
          <label className="text-sm text-espresso-500 mb-1 block">
            Email
          </label>

          <input
            disabled
            value={user.email}
            className="input-field bg-cream-100 text-espresso-400"
          />
        </div>

        {/* Full Name */}
        <div>
          <label className="text-sm text-espresso-500 mb-1 block">
            Full Name
          </label>

          <input
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            className="input-field"
          />
        </div>

        {/* Phone - Only normal users */}
        {!isAdmin && (
          <div>
            <label className="text-sm text-espresso-500 mb-1 block">
              Phone
            </label>

            <input
              value={form.phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value,
                })
              }
              className="input-field"
            />
          </div>
        )}

        {/* Delivery Address - Only normal users */}
        {!isAdmin && (
          <div>
            <label className="text-sm text-espresso-500 mb-1 block">
              Delivery Address
            </label>

            <input
              value={form.address}
              onChange={(e) =>
                setForm({
                  ...form,
                  address: e.target.value,
                })
              }
              className="input-field"
            />
          </div>
        )}

        {/* New Password */}
        <div>
          <label className="text-sm text-espresso-500 mb-1 block">
            New Password (optional)
          </label>

          <input
            type="password"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
            placeholder="Leave blank to keep current password"
            className="input-field"
          />
        </div>

        {/* Messages */}
        {message && (
          <p className="text-sm text-green-600">
            {message}
          </p>
        )}

        {error && (
          <p className="text-sm text-red-600">
            {error}
          </p>
        )}

        {/* Save */}
        <button
          type="submit"
          disabled={saving}
          className="btn-primary w-full"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>

      </form>
    </div>
  );
};

export default Profile;