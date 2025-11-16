import { useRecipeStore } from './recipeStore.js';
import { Link } from 'react-router-dom';

const FavoritesList = () => {
  // --- FIX: Select each piece of state individually ---
  const recipes = useRecipeStore((state) => state.recipes);
  const favorites = useRecipeStore((state) => state.favorites);
  // --- End of Fix ---

  // Map favorite IDs to actual recipe objects
  const favoriteRecipes = favorites
    .map((id) => recipes.find((recipe) => recipe.id === id))
    .filter(Boolean); // Filter out any undefined (e.g., if a recipe was deleted)

  return (
    <div>
      <Link to="/">{'<'} Back to Home</Link>
      <h2>My Favorites</h2>
      {favoriteRecipes.length === 0 ? (
        <p>You haven't added any favorites yet.</p>
      ) : (
        favoriteRecipes.map((recipe) => (
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

export default FavoritesList;