import { useState } from "react";
import api from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validate = () => {
    const newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!emailRegex.test(email)) newErrors.email = "Invalid email format";

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!password) newErrors.password = "Password is required";
    else if (!passwordRegex.test(password))
      newErrors.password =
        "Password must be at least 8 characters with uppercase & lowercase letters";

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      window.location.href = "/";
    } catch (err) {
      setError({
        server: err.response?.data?.message || "Invalid email or password",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0f172a] to-[#020617]">
      <form onSubmit={handleSubmit} className="card w-96">
        <h2 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#38bdf8] to-[#6366f1]">
          URL Shortener
        </h2>

        <input
          className="w-full p-3 rounded-lg mb-4 border border-gray-700 bg-[#1f2937] text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#38bdf8] transition-all duration-200"
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        {error.email && (
          <p className="mb-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-md px-3 py-1">
            {error.email}
          </p>
        )}
        <input
          type="password"
          className="w-full p-3 rounded-lg mb-6 border border-gray-700 bg-[#1f2937] text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#38bdf8] transition-all duration-200"
          placeholder="Enter Your Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {error.password && (
          <p className="mb-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-md px-3 py-1">
            {error.password}
          </p>
        )}
        {error.server && (
          <p className="mb-2 text-sm text-center text-red-400 bg-red-500/10 border border-red-500/20 rounded-md px-3 py-1">
            {error.server}
          </p>
        )}
        <button className="btn-primary w-full">Login</button>
        <p className="text-gray-400 text-sm mt-4 text-center">
          Not registered yet?{" "}
          <a href="/register" className="text-[#38bdf8] hover:underline">
            Register here
          </a>
        </p>
      </form>
    </div>
  );
}
