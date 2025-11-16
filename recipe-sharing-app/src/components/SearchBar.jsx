import React from 'react';
import { useRecipeStore } from './recipeStore.js';

const SearchBar = () => {
  // Get both the setter and the filter action from the store
  const setSearchTerm = useRecipeStore((state) => state.setSearchTerm);
  const filterRecipes = useRecipeStore((state) => state.filterRecipes);

  const handleChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term); // Update the search term in the store
    filterRecipes();     // Immediately trigger the filter action
  };

  return (
    <div style={{ margin: '20px 0' }}>
      <input
        type="text"
        placeholder="Search recipes by title..."
        onChange={handleChange}
        style={{ width: '300px', padding: '8px' }}
      />
    </div>
  );
};

export default SearchBar;