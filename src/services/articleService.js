
export async function fetchArticles() {
  const res = await fetch("https://dummyjson.com/posts");
  const data = await res.json();
  return data.posts; 
}

export function getLocalArticles() {
  const saved = localStorage.getItem("articles");
  return saved ? JSON.parse(saved) : [];
}

export function saveLocalArticles(articles) {
  localStorage.setItem("articles", JSON.stringify(articles));
}
