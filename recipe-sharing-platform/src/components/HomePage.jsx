import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // <--- Import Link
import recipeData from '../data.json';

const HomePage = () => {
  // ... (Keep existing state and useEffect logic) ...
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRecipes(recipeData);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8 my-8 text-blue-800">
        Recipe Sharing Platform
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out">
            <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2 text-gray-800">{recipe.title}</h2>
              <p className="text-gray-600 mb-4">{recipe.summary}</p>
              
              {/* UPDATED: Uses Link component for navigation */}
              <Link 
                to={`/recipe/${recipe.id}`} 
                className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                View Recipe
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;