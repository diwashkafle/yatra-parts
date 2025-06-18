import { create } from "zustand";

interface Category {
  id: string;
  name: string;
}

interface CategoryState {
  categories: Category[];
  setCategories: (cats: Category[]) => void;
  addCategory: (cat: Category) => void;
  removeCategory: (id: string) => void;
  updateCategory: (id: string, newName: string) => void; // ✅ New action to update category
  fetchCategories: () => Promise<void>;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  categories: [],

  setCategories: (cats) => set({ categories: cats }), 

  addCategory: (cat) =>
    set((state) => ({ categories: [...state.categories, cat] })),

  removeCategory: (id:string) =>
    set((state) => ({
      categories: state.categories.filter((category) => category.id !== id),
    })),

  updateCategory: (id, newName) =>
    set((state) => ({
      categories: state.categories.map((category) =>
        category.id === id ? { ...category, name: newName } : category
      ),
    })),

  fetchCategories: async () => {
    try {
      const res = await fetch("/api/category/getall");
      if (!res.ok) throw new Error("Failed to fetch categories");

      const data: Category[] = await res.json();
      set({ categories: data });
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  },
}));
