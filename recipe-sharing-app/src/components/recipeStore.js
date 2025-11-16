import { create } from 'zustand';

export const useRecipeStore = create((set) => ({
  // --- Existing State ---
  recipes: [],
  addRecipe: (newRecipe) =>
    set((state) => ({ recipes: [...state.recipes, newRecipe] })),
  deleteRecipe: (recipeId) =>
    set((state) => ({
      recipes: state.recipes.filter((recipe) => recipe.id !== recipeId),
    })),
  updateRecipe: (updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      ),
    })),
  setRecipes: (recipes) => set({ recipes }),

  // --- New State for Search/Filtering ---
  searchTerm: '',
  filteredRecipes: [], // This will hold the recipes to be displayed
  
  // Action to update the search term
  setSearchTerm: (term) => set({ searchTerm: term }),

  // Action to compute the filtered list
  // It filters 'recipes' based on 'searchTerm' and stores it in 'filteredRecipes'
  filterRecipes: () =>
    set((state) => ({
      filteredRecipes: state.recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      ),
    })),
}));