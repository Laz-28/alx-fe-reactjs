import axios from 'axios';

const GITHUB_BASE_URL = 'https://api.github.com';

export const fetchUserData = async (username) => {
  if (!username || username.trim() === '') {
    throw new Error("Username cannot be empty");
  }

  const apiKey = import.meta.env.VITE_APP_GITHUB_API_KEY;
  
  const config = {
    headers: {
      // 'Accept': 'application/vnd.github.v3+json' // Optional, but good practice
    }
  };

  if (apiKey) {
    config.headers['Authorization'] = `token ${apiKey}`;
  }

  try {
    // UPDATED: Using the specific /users endpoint as required by the prompt
    // This returns a single user object, not a search result list.
    const response = await axios.get(
      `${GITHUB_BASE_URL}/users/${username}`,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching GitHub users:", error);
    // Keep the error simple or pass specific messages if needed
    throw error;
  }
};