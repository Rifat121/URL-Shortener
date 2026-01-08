import api from "../services/api";
import { useState } from "react";
import { FiClipboard } from "react-icons/fi";

export default function UrlTable({ urls, onDelete }) {
  const [copiedId, setCopiedId] = useState(null);
  const handleCopy = (id, url) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);

    setTimeout(() => {
      setCopiedId(null);
    }, 1500);
  };

  const del = async (id) => {
    await api.delete(`/url/${id}`);
    onDelete();
  };

  return (
    <div className="bg-[#111827] rounded-xl shadow-lg overflow-x-auto p-4">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-[#1f2937] text-gray-400 uppercase text-sm tracking-wide">
            <th className="p-4 text-left w-[25%]">Original URL</th>
            <th className="p-4 w-[12%]">Short Code</th>
            <th className="p-4 w-[30%]">Short URL</th>
            <th className="p-4 text-center">Clicks</th>
            <th className="p-4 text-center">Created At</th>
            <th className="p-4 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((u) => (
            <tr
              key={u.id}
              className="border-b border-gray-700 hover:bg-gradient-to-r hover:from-blue-900 hover:to-purple-900 transition-all duration-300"
            >
              <td className="p-4 max-w-[220px] truncate text-gray-300" title={u.originalUrl}>
                {u.originalUrl}
              </td>
              <td className="p-4 text-center text-gray-200 font-medium">
                {u.shortCode}
              </td>
              <td className="p-4">
                <div className="flex items-center justify-between gap-3">
                  <span
                    className="truncate font-medium text-[#38bdf8]"
                    title={u.shortUrl}
                  >
                    {u.shortUrl}
                  </span>

                  <div className="relative">
                    <button
                      onClick={() => handleCopy(u.id, u.shortUrl)}
                      className="p-1 hover:text-[#38bdf8] transition-colors duration-200"
                      title="Copy short URL"
                    >
                      <FiClipboard size={18} className="text-gray-200" />
                    </button>
                    {copiedId === u.id && (
                      <span className="absolute -top-6 right-0 text-xs text-green-400 bg-green-500/10 border border-green-500/20 rounded px-2 py-0.5">
                        Copied
                      </span>
                    )}
                  </div>
                </div>
              </td>
              <td className="p-4 text-center text-gray-200 font-medium">
                {u.clicks}
              </td>
              <td className="p-4 text-center text-gray-200 font-medium">
                {new Date(u.createdAt).toLocaleString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true
                })}
              </td>

              <td className="p-4 text-center">
                <button
                  onClick={() => del(u.id)}
                  className="text-red-500 hover:text-red-400 font-semibold transition-colors duration-200"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
