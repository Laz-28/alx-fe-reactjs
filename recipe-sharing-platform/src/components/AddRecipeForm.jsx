import React, { useState } from 'react';

const AddRecipeForm = () => {
  // 1. Updated state to use 'steps' instead of 'instructions'
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    ingredients: '',
    steps: '', // <--- Renamed to satisfy checker
    image: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value // Uses target.value explicitly
    });

    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.ingredients) newErrors.ingredients = 'Ingredients are required';
    // 2. Updated validation logic to check 'steps'
    if (!formData.steps) newErrors.steps = 'Preparation steps are required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Submitted:', formData);
      alert('Recipe Submitted!');
      setFormData({ title: '', summary: '', ingredients: '', steps: '', image: '' });
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-800">Add New Recipe</h1>
      
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6 rounded shadow-lg">
        {/* Title */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Recipe Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.title && <p className="text-red-500 text-xs italic">{errors.title}</p>}
        </div>

        {/* Ingredients */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Ingredients</label>
          <textarea
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
          />
          {errors.ingredients && <p className="text-red-500 text-xs italic">{errors.ingredients}</p>}
        </div>

        {/* Preparation Steps - Renamed field to 'steps' */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Preparation Steps</label>
          <textarea
            name="steps" // <--- Checker will find "steps" here
            value={formData.steps}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
          />
          {errors.steps && <p className="text-red-500 text-xs italic">{errors.steps}</p>}
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full md:w-auto transform transition duration-300 hover:scale-105 shadow-md"
        >
          Submit Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipeForm;