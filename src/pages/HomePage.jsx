import { useEffect, useState } from "react";
import { fetchArticles } from "../services/articleService";

function HomePage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles().then(setArticles);
  }, []);

  return (
    <div>
      <h1>Nyhetssida</h1>
      <h2>Artiklar från API:</h2>
      {articles.map((article) => (
        <div key={article.id} style={{ marginBottom: "2rem" }}>
          <h3>{article.title}</h3>
          <p>{article.body}</p>
        </div>
      ))}
    </div>
  );
}

export default HomePage;
