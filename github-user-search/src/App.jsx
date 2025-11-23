import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import UserCard from './components/UserCard';
import { fetchUserData } from './services/githubService';
import './App.css'; // Import the styles

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

    const handleSearch = async (username) => {
    if (!username || username.trim() === '') {
      setError("Please enter a username");
      return;
    }

    setLoading(true);
    setError(null);
    setUsers([]); // Clear previous results

    try {
      const data = await fetchUserData(username);
      console.log("API Response:", data); // Debug log
      
      if (data && data.items && data.items.length > 0) {
        setUsers(data.items);
      } else {
        setError("No users found. Try another search.");
      }
    } catch (err) {
      console.error("Search error:", err);
      setError(err.message || "Failed to fetch users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>GitHub User Search</h1>
      </header>

      <main>
        <SearchBar onSearch={handleSearch} />

        {loading && <p className="loading">Loading...</p>}
        {error && <p className="error">{error}</p>}

        <div className="user-grid">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
          
          {/* Show a message if search finished but no users found */}
          {!loading && !error && users.length === 0 && (
            <p className="no-results">Start by searching for a username.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
