import axios from 'axios';

const GITHUB_BASE_URL = 'https://api.github.com';

export const fetchUserData = async (username) => {
  if (!username || username.trim() === '') {
    throw new Error("Username cannot be empty");
  }

  const apiKey = import.meta.env.VITE_APP_GITHUB_API_KEY;
  
  const config = {
    headers: {
      'Accept': 'application/vnd.github.v3+json'
    }
  };

  if (apiKey) {
    config.headers['Authorization'] = `token ${apiKey}`;
  }

  try {
    const response = await axios.get(
      `${GITHUB_BASE_URL}/search/users?q=${encodeURIComponent(username)}&per_page=30`,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching GitHub users:", error);
    throw new Error(error.response?.data?.message || error.message);
  }
};