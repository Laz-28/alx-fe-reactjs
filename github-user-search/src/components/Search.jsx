import React, { useState } from 'react';
import { fetchUserData } from '../services/githubService';

const Search = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false); // Store error state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false); // Reset error
    setUserData(null); // Reset previous data

    try {
      const data = await fetchUserData(username);
      setUserData(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4">
      {/* Search Input Form */}
      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Search
        </button>
      </form>

      {/* Conditional Rendering */}
      
      {loading && <p className="text-center text-gray-600">Loading...</p>}

      {error && <p className="text-center text-red-500">Looks like we cant find the user</p>}

      {userData && (
        <div className="bg-white border rounded-lg shadow-md p-6 text-center">
          <img
            src={userData.avatar_url}
            alt={userData.login}
            className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-gray-100"
          />
          <h2 className="text-xl font-bold text-gray-800">
            {userData.name || userData.login}
          </h2>
          <p className="text-gray-500 mb-4">@{userData.login}</p>
          
          <a
            href={userData.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-blue-500 hover:underline"
          >
            View Profile
          </a>
        </div>
      )}
    </div>
  );
};

export default Search;