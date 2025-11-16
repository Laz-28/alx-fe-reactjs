import { useRecipeStore } from '../recipeStore.js';
import { useNavigate } from 'react-router-dom';

const DeleteRecipeButton = ({ recipeId }) => {
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);
  const navigate = useNavigate(); // Hook to redirect after deletion

  const handleDelete = () => {
    // Add a confirmation before deleting
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      deleteRecipe(recipeId);
      navigate('/'); // Redirect to the home page
    }
  };

  return (
    <button onClick={handleDelete} style={{ marginLeft: '10px', background: 'red' }}>
      Delete Recipe
    </button>
  );
};

export default DeleteRecipeButton;