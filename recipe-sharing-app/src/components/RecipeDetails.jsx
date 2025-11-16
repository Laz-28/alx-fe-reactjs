import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useRecipeStore } from '../recipeStore.js';
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeDetails = () => {
  const { recipeId } = useParams(); // Gets the ID from the URL
  const recipe = useRecipeStore((state) =>
    // Find the recipe. Note: useParams returns a string, so we convert ID to Number
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
        // Show edit form if we are editing
        <EditRecipeForm recipe={recipe} onCancel={() => setIsEditing(false)} />
      ) : (
        // Otherwise, show recipe details
        <div>
          <h1>{recipe.title}</h1>
          <p>{recipe.description}</p>
          <button onClick={() => setIsEditing(true)}>Edit Recipe</button>
          <DeleteRecipeButton recipeId={recipe.id} />
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;