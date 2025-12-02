import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddRecipeForm = () => {
  const navigate = useNavigate();
  // State to hold form data
  const [formData, setFormData] = useState({
    title: '',
    summary: '', // Optional: Adding a summary field for completeness
    ingredients: '',
    instructions: '',
    image: 'https://dummyimage.com/400x300/ccc/333&text=New+Recipe' // Default image
  });
  // State for validation messages
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Helper for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error immediately when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Step 2: Implement Form Validation Logic
  const validate = () => {
    let newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Recipe title is required.';
    }
    if (!formData.ingredients.trim()) {
      newErrors.ingredients = 'Ingredients list is required.';
    } else if (formData.ingredients.split('\n').filter(i => i.trim()).length < 2) {
       // Simple check for at least two non-empty ingredient lines
      newErrors.ingredients = 'Please list at least two ingredients.';
    }
    if (!formData.instructions.trim()) {
      newErrors.instructions = 'Preparation steps are required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Step 2: If validation passes
      console.log('Recipe Submitted Successfully:', formData);
      setIsSubmitted(true);
      // In a real application, you would POST this data to an API here.
      
      // For demonstration, navigate home after a short delay
      setTimeout(() => {
        alert("Recipe added (Check console for data)! Navigating home.");
        navigate('/');
      }, 500);

    } else {
      // Validation failed
      console.log('Form validation failed.');
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-800">
        Submit a New Recipe
      </h1>
      
      <form 
        onSubmit={handleSubmit} 
        className="max-w-3xl mx-auto bg-white p-6 md:p-10 rounded-xl shadow-2xl"
      >
        <div className="space-y-6">
          
          {/* Title Input */}
          <div>
            <label htmlFor="title" className="block text-lg font-medium text-gray-700 mb-1">Recipe Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              // Step 3: Tailwind Styling for responsiveness and focus
              className={`w-full p-3 border-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="e.g., Spicy Lentil Soup"
            />
            {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
          </div>

          {/* Summary/Description Input */}
          <div>
            <label htmlFor="summary" className="block text-lg font-medium text-gray-700 mb-1">Brief Summary (Optional):</label>
            <textarea
              id="summary"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              rows="2"
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              placeholder="A short description of the dish..."
            />
          </div>

          {/* Ingredients Textarea */}
          <div>
            <label htmlFor="ingredients" className="block text-lg font-medium text-gray-700 mb-1">Ingredients (One per line):</label>
            <textarea
              id="ingredients"
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              rows="6"
              className={`w-full p-3 border-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ${errors.ingredients ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="1 cup flour\n2 tsp baking soda\n..."
            />
            {errors.ingredients && <p className="mt-1 text-sm text-red-500">{errors.ingredients}</p>}
          </div>

          {/* Instructions Textarea */}
          <div>
            <label htmlFor="instructions" className="block text-lg font-medium text-gray-700 mb-1">Preparation Steps (One step per line):</label>
            <textarea
              id="instructions"
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              rows="8"
              className={`w-full p-3 border-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ${errors.instructions ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Preheat oven to 350°F.\nMix dry ingredients.\nFold in wet ingredients.\n..."
            />
            {errors.instructions && <p className="mt-1 text-sm text-red-500">{errors.instructions}</p>}
          </div>
          
        </div>
        
        {/* Submit Button */}
        <div className="mt-8">
          <button
            type="submit"
            disabled={isSubmitted}
            className={`w-full py-3 text-xl font-semibold rounded-lg text-white transition duration-200 
              ${isSubmitted 
                ? 'bg-green-500 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300'
              }`
            }
          >
            {isSubmitted ? 'Recipe Added!' : 'Submit Recipe'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRecipeForm;