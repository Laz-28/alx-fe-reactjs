import { useEffect } from 'react';
import { useRecipeStore } from './recipeStore.js';
import { Link } from 'react-router-dom';

const RecommendationsList = () => {
  // --- FIX: Select each piece of state individually ---
  const recommendations = useRecipeStore((state) => state.recommendations);
  const generateRecommendations = useRecipeStore(
    (state) => state.generateRecommendations
  );
  const favorites = useRecipeStore((state) => state.favorites);
  // --- End of Fix ---

  // Generate recommendations when the component loads or when favorites change
  useEffect(() => {
    generateRecommendations();
  }, [generateRecommendations, favorites]); // This dependency array is now safe

  return (
    <div>
      <Link to="/">{'<'} Back to Home</Link>
      <h2>Personalized Recommendations</h2>
      <button onClick={generateRecommendations}>Refresh Recommendations</button>

      {recommendations.length === 0 ? (
        <p>
          No recommendations available. Add some favorites to get started!
        </p>
      ) : (
        recommendations.map((recipe) => (
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

export default RecommendationsList;