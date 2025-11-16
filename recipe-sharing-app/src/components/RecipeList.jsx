import { useEffect } from 'react'; // 1. Import useEffect
import { useRecipeStore } from './recipeStore.js';
import { Link } from 'react-router-dom';

const RecipeList = () => {
  // 2. Select all necessary state
  const recipes = useRecipeStore((state) => state.recipes);
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes);
  const filterRecipes = useRecipeStore((state) => state.filterRecipes);
  const searchTerm = useRecipeStore((state) => state.searchTerm);

  // 3. Run the filter whenever the main 'recipes' list changes (e.g., add/delete)
  // This also populates 'filteredRecipes' on initial load
  useEffect(() => {
    filterRecipes();
  }, [recipes, filterRecipes]); // Re-run filter if recipes array changes

  return (
    <div>
      <h2>Recipes</h2>
      
      {/* 4. Improved logic for empty states */}
      {recipes.length === 0 ? (
        <p>No recipes yet. Add one!</p>
      ) : filteredRecipes.length === 0 && searchTerm.length > 0 ? (
        <p>No matching recipes found.</p>
      ) : (
        // 5. Render from filteredRecipes as requested
        filteredRecipes.map((recipe) => (
          <div
            key={recipe.id}
            style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}
          >
            <h3>
              <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
            </h3>
            <p>{recipe.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;