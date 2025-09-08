import React, { useState } from "react";
import { addLocalArticle } from "../services/articleService";
import { useToast } from "./ToastProvider";

const ArticleForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const { showToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !body.trim()) {
      showToast("Titel och innehåll får inte vara tomt", { type: "error" });
      return;
    }

    const newArticle = addLocalArticle({ title, body });
    onAdd(newArticle);

    showToast("Artikel skapad!", { type: "success" });
    setTitle("");
    setBody("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-lg shadow-md mb-6 border border-gray-200"
    >
      <h3 className="text-lg font-semibold mb-3">Skapa ny artikel</h3>

      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Titel
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Innehåll
        </label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full border rounded-md px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Skapa artikel
      </button>
    </form>
  );
};

export default ArticleForm;
