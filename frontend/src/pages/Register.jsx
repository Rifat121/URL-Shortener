import { useState } from "react";
import api from "../services/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validate = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Name is required";

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
      await api.post("/auth/register", { name, email, password });

      setSuccess("Registration successful. Redirecting to login…");

      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (err) {
      setError((prev) => ({
        ...prev,
        server: err.response?.data?.message || "Registration failed",
      }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0f172a] to-[#020617]">
      <form
        onSubmit={handleSubmit}
        className="bg-[#111827] p-8 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] to-[#6366f1] text-center mb-6">
          Register
        </h2>

        <input
          className="w-full p-3 rounded-lg mb-4 border border-gray-700 bg-[#1f2937] text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#38bdf8] transition-all duration-200"
          placeholder="Enter Your Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        {error.name && (
          <p className="text-red-500 text-sm mt-1">{error.name}</p>
        )}

        <input
          type="email"
          className="w-full p-3 rounded-lg mb-4 border border-gray-700 bg-[#1f2937] text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#38bdf8] transition-all duration-200"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
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
        {success && (
          <p className="mb-2 text-sm text-green-400 bg-green-500/10 border border-green-500/20 rounded-md px-3 py-2 text-center">
            {success}
          </p>
        )}

        <button className="w-full p-3 rounded-lg font-semibold bg-gradient-to-r from-[#38bdf8] to-[#6366f1] text-[#020617] hover:scale-105 hover:shadow-lg transition-all duration-300">
          Register
        </button>
        <p className="text-gray-400 text-sm mt-4 text-center">
          Already registered?{" "}
          <a href="/login" className="text-[#38bdf8] hover:underline">
            Login here
          </a>
        </p>
      </form>
    </div>
  );
}
