import React, { useEffect, useMemo } from "react";
import ArticleList from "../components/ArticleList";
import SearchBar from "../components/SearchBar";
import ArticleForm from "../components/ArticleForm";
import { useToast } from "../components/ToastProvider";
import { useArticlesStore } from "../store/useArticlesStore";

const HomePage = () => {
  const {
    apiArticles,
    localArticles,
    fetchApiArticles,
    loadLocalArticles,
    addLocal,
    removeLocal,
    searchTerm,
    setSearchTerm,
    getAllArticles,
  } = useArticlesStore();

  const { showToast } = useToast();

  useEffect(() => {
    fetchApiArticles();
    loadLocalArticles();
  }, [fetchApiArticles, loadLocalArticles]);

  const handleAdd = ({ title, body }) => {
    const newArticle = addLocal({ title, body });
    showToast("Artikel skapad!", { type: "success" });
    return newArticle;
  };

  const handleDelete = (id) => {
    removeLocal(id);
    showToast("Artikel raderad", { type: "warning" });
  };

  const filteredArticles = useMemo(() => {
    const all = getAllArticles();
    const q = searchTerm.toLowerCase();
    return all.filter(
      (a) => a.title.toLowerCase().includes(q) || a.body.toLowerCase().includes(q)
    );
  }, [getAllArticles, searchTerm, apiArticles, localArticles]);

  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900">Nyhetssida</h1>
      </header>

      <ArticleForm
        onAdd={(newA) => {
          return handleAdd(newA);
        }}
      />

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Alla artiklar</h2>
        <span className="text-sm text-gray-500">
          {filteredArticles.length} träffar
        </span>
      </div>

      <ArticleList articles={filteredArticles} onDelete={handleDelete} />
    </div>
  );
};

export default HomePage;
