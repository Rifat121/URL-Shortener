import { useEffect, useState, useCallback } from "react";
import UrlForm from "../components/UrlForm";
import UrlTable from "../components/UrlTable";
import api from "../services/api";

export default function Dashboard() {
  const [urls, setUrls] = useState([]);

  // Fetch URLs
  const fetchUrls = useCallback(async () => {
    try {
      const res = await api.get("/url");
      setUrls(res.data.data);
    } catch (err) {
      console.error("Failed to fetch URLs", err);
    }
  }, []);

  useEffect(() => {
    fetchUrls();
  }, [fetchUrls]);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token"); // remove JWT
    window.location.href = "/login"; // redirect to login page
  };

  // Calculate total clicks
  const totalClicks = urls.reduce((sum, u) => sum + u.clicks, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#020617] p-8">
      {/* Header + Logout */}
      <div className="flex items-center mb-8">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] to-[#6366f1]">
          Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="ml-auto px-4 py-2 rounded-lg font-semibold bg-red-600 hover:bg-red-500 hover:shadow-lg text-white transition-all duration-300"
        >
          Logout
        </button>
      </div>

      {/* Stats Cards */}
      <div className="flex gap-6 mb-8 flex-wrap">
        <div className="bg-[#111827] p-4 rounded-xl shadow-lg flex-1 flex flex-col items-center justify-center hover:shadow-blue-500/40 transition-shadow duration-300 min-w-[150px]">
          <span className="text-gray-400">Total URLs</span>
          <span className="text-[#38bdf8] text-2xl font-semibold">
            {urls.length}
          </span>
        </div>
        <div className="bg-[#111827] p-4 rounded-xl shadow-lg flex-1 flex flex-col items-center justify-center hover:shadow-purple-500/40 transition-shadow duration-300 min-w-[150px]">
          <span className="text-gray-400">Total Clicks</span>
          <span className="text-purple-400 text-2xl font-semibold">
            {totalClicks}
          </span>
        </div>
        <div className="bg-[#111827] p-4 rounded-xl shadow-lg flex-1 flex flex-col items-center justify-center hover:shadow-green-500/40 transition-shadow duration-300 min-w-[150px]">
          <span className="text-gray-400">Free URLs Left</span>
          <span className="text-green-400 text-2xl font-semibold">
            {Math.max(100 - urls.length, 0)}
          </span>
        </div>
      </div>

      {/* URL Input Form */}
      <UrlForm onCreated={fetchUrls} />

      {/* URL Table */}
      <UrlTable urls={urls} onDelete={fetchUrls} />
    </div>
  );
}
