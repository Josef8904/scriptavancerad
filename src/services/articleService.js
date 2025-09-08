const LS_KEY = "localArticles";

export async function getArticles() {
  const res = await fetch("https://dummyjson.com/posts");
  const data = await res.json();
  return data.posts; 
}

export function getLocalArticles() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveLocalArticles(list) {
  localStorage.setItem(LS_KEY, JSON.stringify(list));
}

export function addLocalArticle({ title, body }) {
  const list = getLocalArticles();
  const newArticle = {
    id: Date.now(),       
    title,
    body,
    isLocal: true,        
  };
  const updated = [newArticle, ...list];
  saveLocalArticles(updated);
  return newArticle;
}

export function deleteLocalArticle(id) {
  const list = getLocalArticles();
  const updated = list.filter((a) => a.id !== id);
  saveLocalArticles(updated);
  return updated;
}
