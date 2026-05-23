import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { loginUser, registerUser } from "../api/authApi";
import { useAuth } from "../context/authContext";
import { useEffect } from "react";

function Auth() {
  const navigate = useNavigate();

  const { fetchCurrentUser, user, loading: authLoading } = useAuth();

  const [isLogin, setIsLogin] = useState(true);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  useEffect
  (() => {
    if (!authLoading && user) {
      navigate("/dashboard");
    }
  }, [user, authLoading, navigate]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
    });
  };

  const handleToggleMode = () => {
    setIsLogin((prev) => !prev);

    setError("");

    resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      setError("");

      if (isLogin) {
        await loginUser({
          email: formData.email,
          password: formData.password,
        });
      } else {
        await registerUser(formData);
      }

      // IMPORTANT:
      // fetch user after cookie is set
      await fetchCurrentUser();

      navigate("/dashboard");
    } catch (error) {
      setError(error?.response?.data?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        min-h-screen
        flex items-center justify-center
        bg-gray-100
        px-4
      "
    >
      <form
        onSubmit={handleSubmit}
        className="
          bg-white
          p-8
          rounded-2xl
          shadow-md
          w-full
          max-w-md
        "
      >
        {/* Header */}
        <div className="mb-8 text-center">
          <h1
            className="
              text-4xl
              font-bold
              text-black
              mb-2
            "
          >
            AlgoTrack
          </h1>

          <p className="text-gray-500">Master DSA One Problem at a Time</p>
        </div>

        {/* Error Message */}
        {error && (
          <div
            className="
              bg-red-100
              text-red-700
              p-3
              rounded-lg
              mb-4
              text-sm
            "
          >
            {error}
          </div>
        )}

        {/* Name Field */}
        {!isLogin && (
          <div className="mb-4">
            <label
              className="
                block
                text-sm
                font-medium
                mb-2
              "
            >
              Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="
                w-full
                border border-gray-300
                p-3
                rounded-lg
                outline-none
                focus:ring-2
                focus:ring-black
              "
              required={!isLogin}
            />
          </div>
        )}

        {/* Email Field */}
        <div className="mb-4">
          <label
            className="
              block
              text-sm
              font-medium
              mb-2
            "
          >
            Email
          </label>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="
              w-full
              border border-gray-300
              p-3
              rounded-lg
              outline-none
              focus:ring-2
              focus:ring-black
            "
            required
          />
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label
            className="
              block
              text-sm
              font-medium
              mb-2
            "
          >
            Password
          </label>

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="
              w-full
              border border-gray-300
              p-3
              rounded-lg
              outline-none
              focus:ring-2
              focus:ring-black
            "
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="
            w-full
            bg-black
            text-white
            p-3
            rounded-lg
            hover:bg-gray-800
            transition
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          {loading ? "Please wait..." : isLogin ? "Login" : "Create Account"}
        </button>

        {/* Toggle Auth Mode */}
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={handleToggleMode}
            className="
              text-sm
              text-gray-600
              hover:text-black
              transition
            "
          >
            {isLogin
              ? "Don't have an account? Register"
              : "Already have an account? Login"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Auth;
