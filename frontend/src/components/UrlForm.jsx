import { useState } from "react";
import api from "../services/api";

export default function UrlForm({ onCreated }) {
  const [url, setUrl] = useState("");

  const submit = async () => {
    await api.post("/url", { originalUrl: url });
    setUrl("");
    onCreated();
  };

  return (
    <div className="bg-[#111827] p-6 rounded-xl shadow-lg mb-8">
      <div className="flex gap-4">
        {/* URL Input */}
        <input
          type="text"
          placeholder="Paste long URL here"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 p-3 rounded-lg border border-gray-700 bg-[#1f2937] text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:border-transparent transition-all duration-200"
        />

        {/* Shorten Button */}
        <button
          onClick={submit}
          className="px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-[#38bdf8] to-[#6366f1] text-[#020617] hover:scale-105 hover:shadow-lg transition-all duration-300"
        >
          Shorten
        </button>
      </div>
    </div>
  );
}
