import React from "react";
import ArticleCard from "./ArticleCard";

const ArticleList = ({ articles, onDelete }) => {
  if (!Array.isArray(articles) || articles.length === 0) {
    return <p className="text-gray-500">Inga artiklar att visa.</p>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          title={article.title}
          body={article.body}
          isLocal={article.isLocal}
          onDelete={() => onDelete && onDelete(article.id)}
        />
      ))}
    </div>
  );
};

export default ArticleList;
