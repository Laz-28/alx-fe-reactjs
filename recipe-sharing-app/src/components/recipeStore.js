import { create } from 'zustand';

// Note: Using 'export const' to align with the named import
// { useRecipeStore } used in the component files.
export const useRecipeStore = create((set) => ({
  recipes: [],
  addRecipe: (newRecipe) =>
    set((state) => ({ recipes: [...state.recipes, newRecipe] })),
  setRecipes: (recipes) => set({ recipes }),
}));