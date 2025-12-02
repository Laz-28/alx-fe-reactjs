import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Added useNavigate for the back button
import recipeData from '../data.json';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Hook for navigation
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    // Wrap the logic in a setTimeout to simulate a fetch delay
    // This solves the "Synchronous State" error
    const timer = setTimeout(() => {
        const recipeId = parseInt(id);
        const foundRecipe = recipeData.find((item) => item.id === recipeId);
        setRecipe(foundRecipe);
    }, 100);

    // Cleanup the timer if the component unmounts
    return () => clearTimeout(timer);
  }, [id]);

  if (!recipe) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)} // Uses react-router logic to go back
        className="mb-4 bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
      >
        &larr; Back
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto">
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          className="w-full h-64 object-cover"
        />
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-4 text-blue-800">{recipe.title}</h1>
          <p className="text-gray-600 mb-6">{recipe.summary}</p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Ingredients Section */}
            <div>
              <h2 className="text-2xl font-semibold mb-3 text-gray-800">Ingredients</h2>
              <ul className="list-disc list-inside text-gray-700">
                {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="mb-1">{ingredient}</li>
                ))}
              </ul>
            </div>

            {/* Instructions Section */}
            <div>
              <h2 className="text-2xl font-semibold mb-3 text-gray-800">Instructions</h2>
              <ol className="list-decimal list-inside text-gray-700">
                 {recipe.instructions && recipe.instructions.map((step, index) => (
                  <li key={index} className="mb-2">{step}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;