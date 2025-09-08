import React, { useEffect, useState } from "react";
import { getArticles, getLocalArticles, deleteLocalArticle } from "../services/articleService";
import ArticleList from "../components/ArticleList";
import SearchBar from "../components/SearchBar";
import ArticleForm from "../components/ArticleForm";
import { useToast } from "../components/ToastProvider";

const HomePage = () => {
  const [apiArticles, setApiArticles] = useState([]);
  const [localArticles, setLocalArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { showToast } = useToast();

  useEffect(() => {
    getArticles().then((data) => {
      setApiArticles(data);
    });
  }, []);

  useEffect(() => {
    setLocalArticles(getLocalArticles());
  }, []);

  const handleAdd = (newArticle) => {
    setLocalArticles([newArticle, ...localArticles]);
  };

  const handleDelete = (id) => {
    const updated = deleteLocalArticle(id);
    setLocalArticles(updated);
    showToast("Artikel raderad", { type: "warning" });
  };

  const allArticles = [
    ...localArticles,
    ...apiArticles.map((a) => ({ ...a, isLocal: false })),
  ];

  const filteredArticles = allArticles.filter(
    (a) =>
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900">Nyhetssida</h1>
        <p className="text-gray-600 mt-1">
          Läs artiklar från API eller skapa egna här.
        </p>
      </header>

      <ArticleForm onAdd={handleAdd} />

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Alla artiklar
        </h2>
        <span className="text-sm text-gray-500">
          {filteredArticles.length} träffar
        </span>
      </div>

      <ArticleList articles={filteredArticles} onDelete={handleDelete} />
    </div>
  );
};

export default HomePage;
