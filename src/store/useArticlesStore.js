import { create } from "zustand";
import {
  getArticles as fetchFromApi,
  getLocalArticles,
  addLocalArticle,
  deleteLocalArticle,
} from "../services/articleService";

export const useArticlesStore = create((set, get) => ({
  
  apiArticles: [],
  localArticles: [],
  searchTerm: "",

  setSearchTerm: (term) => set({ searchTerm: term }),

  fetchApiArticles: async () => {
    const data = await fetchFromApi(); 
    set({ apiArticles: data });
  },

  loadLocalArticles: () => {
    const data = getLocalArticles(); 
    set({ localArticles: data });
  },

  addLocal: ({ title, body }) => {
    const newArt = addLocalArticle({ title, body });
    set({ localArticles: [newArt, ...get().localArticles] });
    return newArt;
  },

  removeLocal: (id) => {
    const updated = deleteLocalArticle(id);
    set({ localArticles: updated });
  },

  getAllArticles: () => {
    const { apiArticles, localArticles } = get();
    return [
      ...localArticles,
      ...apiArticles.map((a) => ({ ...a, isLocal: false })),
    ];
  },
}));
