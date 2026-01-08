import api from "../services/api";
import { FiClipboard } from "react-icons/fi";

export default function UrlTable({ urls, onDelete }) {
  const del = async (id) => {
    await api.delete(`/url/${id}`);
    onDelete();
  };

  return (
    <div className="bg-[#111827] rounded-xl shadow-lg overflow-x-auto p-4">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-[#1f2937] text-gray-400 uppercase text-sm tracking-wide">
            <th className="p-4 text-left">Original URL</th>
            <th className="p-4">Short URL</th>
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
              <td className="p-4 truncate max-w-xs" title={u.originalUrl}>
                {u.originalUrl}
              </td>

              <td className="p-4 flex items-center justify-between max-w-[150px]">
                {/* <a
                  href={u.shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#38bdf8] hover:underline font-medium"
                >
                  {u.shortCode}
                </a> */}
                <span
                  className="truncate font-medium text-[#38bdf8]"
                  title={u.shortUrl}
                >
                  {u.shortCode}
                </span>
                <button
                  onClick={() => navigator.clipboard.writeText(u.shortUrl)}
                  className="p-1 hover:text-[#38bdf8] transition-colors duration-200"
                  title="Copy short URL"
                >
                  <FiClipboard size={18} className="text-gray-200" />
                </button>
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
