import React from 'react';
import Search from './components/Search';
import './App.css'; // Ensure you have basic styles or Tailwind setup

function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
        GitHub User Search
      </h1>
      
      {/* The Search component now handles the logic and display */}
      <Search />
    </div>
  );
}

export default App;