import { create } from 'zustand';

export const useRecipeStore = create((set) => ({
  // --- Existing Recipe State ---
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

  // --- Existing Search State ---
  searchTerm: '',
  filteredRecipes: [],
  setSearchTerm: (term) => set({ searchTerm: term }),
  filterRecipes: () =>
    set((state) => ({
      filteredRecipes: state.recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      ),
    })),

  // --- New Favorites & Recommendations State ---
  favorites: [], // Will store an array of recipe IDs
  recommendations: [],

  /**
   * Adds a recipe ID to the favorites array.
   */
  addFavorite: (recipeId) =>
    set((state) => ({
      // Avoid duplicates
      favorites: state.favorites.includes(recipeId)
        ? state.favorites
        : [...state.favorites, recipeId],
    })),

  /**
   * Removes a recipe ID from the favorites array.
   */
  removeFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== recipeId),
    })),

  /**
   * Generates a mock list of recommendations.
   * This mock implementation recommends a random subset of the user's favorites.
   * A real-world app would use a more complex algorithm.
   */
  generateRecommendations: () =>
    set((state) => {
      const recommended = state.recipes.filter(
        (recipe) => state.favorites.includes(recipe.id) && Math.random() > 0.5
      );
      return { recommendations: recommended };
    }),
}));