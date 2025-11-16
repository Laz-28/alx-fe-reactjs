import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore.js';
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';
import FavoriteButton from './FavoriteButton'; // 1. Import

const RecipeDetails = () => {
  const { recipeId } = useParams();
  const recipe = useRecipeStore((state) =>
    state.recipes.find((r) => r.id === Number(recipeId))
  );

  const [isEditing, setIsEditing] = useState(false);

  if (!recipe) {
    return (
      <div>
        <h2>Recipe Not Found</h2>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/">{'<'} Back to Home</Link>

      {isEditing ? (
        <EditRecipeForm recipe={recipe} onCancel={() => setIsEditing(false)} />
      ) : (
        <div>
          <h1>{recipe.title}</h1>
          <p>{recipe.description}</p>
          <button onClick={() => setIsEditing(true)}>Edit Recipe</button>
          <DeleteRecipeButton recipeId={recipe.id} />
          <FavoriteButton recipeId={recipe.id} /> {/* 2. Add button */}
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;