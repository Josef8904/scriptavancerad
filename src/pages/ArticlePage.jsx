import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getArticles, getLocalArticles } from "../services/articleService";
import { useToast } from "../components/ToastProvider";

const REACTIONS_KEY = "articleReactions";

function getReactionsMap() {
  try {
    const raw = localStorage.getItem(REACTIONS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}
function saveReactionsMap(map) {
  localStorage.setItem(REACTIONS_KEY, JSON.stringify(map));
}
function loadReactionsFor(id, base) {
  const map = getReactionsMap();
  return map[id] ?? base ?? { likes: 0, dislikes: 0 };
}
function saveReactionsFor(id, reactions) {
  const map = getReactionsMap();
  map[id] = reactions;
  saveReactionsMap(map);
}

export default function ArticlePage() {
  const { id } = useParams();
  const { showToast } = useToast();
  const [article, setArticle] = useState(null);
  const [reactions, setReactions] = useState({ likes: 0, dislikes: 0 });

  const numericId = useMemo(() => id?.toString(), [id]);

  useEffect(() => {
    let isMounted = true;

    const local = getLocalArticles().find((a) => a.id.toString() === numericId);
    if (local) {
      if (!isMounted) return;
      setArticle(local);
      const base = local.reactions ?? { likes: 0, dislikes: 0 };
      setReactions(loadReactionsFor(numericId, base));
      return;
    }

    getArticles().then((arr) => {
      if (!isMounted) return;
      const apiArticle = arr.find((a) => a.id.toString() === numericId) || null;
      setArticle(apiArticle);
      const base = apiArticle?.reactions ?? { likes: 0, dislikes: 0 };
      setReactions(loadReactionsFor(numericId, base));
    });

    return () => {
      isMounted = false;
    };
  }, [numericId]);

  const handleLike = () => {
    const next = { ...reactions, likes: reactions.likes + 1 };
    setReactions(next);
    saveReactionsFor(numericId, next);
    showToast("👍 Like sparad", { type: "success" });
  };

  const handleDislike = () => {
    const next = { ...reactions, dislikes: reactions.dislikes + 1 };
    setReactions(next);
    saveReactionsFor(numericId, next);
    showToast("👎 Dislike sparad", { type: "warning" });
  };

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto">
        <p className="text-gray-500">Artikel kunde inte hittas…</p>
        <Link to="/" className="text-blue-600 hover:underline">← Tillbaka</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 border border-gray-200">
      <div className="mb-6">
        <Link to="/" className="text-blue-600 hover:underline">← Tillbaka</Link>
      </div>

      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <p className="text-gray-700 mb-6 whitespace-pre-line">{article.body}</p>

      <div className="flex items-center gap-4">
        <button
          onClick={handleLike}
          className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          👍 Like <span className="font-semibold">{reactions.likes}</span>
        </button>

        <button
          onClick={handleDislike}
          className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          👎 Dislike <span className="font-semibold">{reactions.dislikes}</span>
        </button>
      </div>
    </div>
  );
}
