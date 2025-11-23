import React, { useState } from 'react';
import { fetchUserData } from '../services/githubService';

const Search = () => {
  // State for form inputs
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  
  // State for results and UI status
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setUsers([]); // Clear previous results
    setPage(1); // Reset to first page

    try {
      // We pass an object with all criteria to the service
      const data = await fetchUserData({ 
        username, 
        location, 
        minRepos, 
        page: 1 
      });
      
      if (data.items) {
        setUsers(data.items);
        setTotalCount(data.total_count);
      }
    } catch {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  // Handle "Load More" functionality
  const handleLoadMore = async () => {
    const nextPage = page + 1;
    setLoading(true);

    try {
      const data = await fetchUserData({ 
        username, 
        location, 
        minRepos, 
        page: nextPage 
      });
      
      if (data.items) {
        // Append new users to the existing list
        setUsers((prevUsers) => [...prevUsers, ...data.items]);
        setPage(nextPage);
      }
    } catch {
      setError("Failed to load more users");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Advanced Search Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
          <input
            type="number"
            placeholder="Min Repositories"
            value={minRepos}
            onChange={(e) => setMinRepos(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
        >
          Search
        </button>
      </form>

      {/* Error Message */}
      {error && <p className="text-center text-red-500 mb-4">{error}</p>}

      {/* Results Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {users.map((user) => (
          <div key={user.id} className="bg-white border rounded-lg shadow-sm overflow-hidden hover:shadow-md transition">
            <div className="p-6 text-center">
              <img
                src={user.avatar_url}
                alt={user.login}
                className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-gray-100"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{user.login}</h3>
              <div className="text-sm text-gray-500 mb-4">
                {/* Note: 'location' and 'repos' are not returned in the standard search list response. 
                    We would need to fetch each user individually to get that data, which hits rate limits.
                    For now, we display the basic info returned by the search endpoint. */}
                <p>ID: {user.id}</p>
              </div>
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline font-medium"
              >
                View Profile
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Loading Indicator */}
      {loading && <p className="text-center text-gray-600 mt-4">Loading...</p>}

      {/* Load More Button */}
      {!loading && users.length > 0 && users.length < totalCount && (
        <div className="text-center mt-8">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-50 transition"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Search;