import axios from 'axios';

const GITHUB_SEARCH_URL = 'https://api.github.com/search/users';

/**
 * Fetches users based on advanced search criteria.
 * * @param {Object} params - The search parameters.
 * @param {string} params.username - The username to search for (optional).
 * @param {string} params.location - The user's location (optional).
 * @param {number} params.minRepos - The minimum number of repositories (optional).
 * @param {number} params.page - The page number for pagination (default: 1).
 */
export const fetchUserData = async ({ username, location, minRepos, page = 1 }) => {
  const apiKey = import.meta.env.VITE_APP_GITHUB_API_KEY;
  
  // Construct the query string for GitHub's search API
  // Format: q=username+location:location+repos:>minRepos
  let query = '';
  
  if (username) {
    query += `${username}`;
  }
  
  if (location) {
    // Add a space or plus if query already has content
    query += query ? `+location:${location}` : `location:${location}`;
  }
  
  if (minRepos) {
    query += query ? `+repos:>${minRepos}` : `repos:>${minRepos}`;
  }

  // If no search terms are provided, we cannot search
  if (!query) {
     // Return empty structure to avoid errors
    return { items: [], total_count: 0 };
  }

  const config = {
    headers: apiKey ? { Authorization: `token ${apiKey}` } : {},
    params: {
      q: query,
      page: page,
      per_page: 30 // GitHub default is 30, max is 100
    }
  };

  try {
    // We use axios to perform the search
    // Note: The 'q' parameter in params is URL encoded automatically by Axios,
    // but GitHub requires specific formatting like '+', so sometimes manual string
    // construction in the URL is safer. However, Axios params usually handle space as '+'.
    // For strict control, we can pass the full URL or ensure Axios encodes correctly.
    const response = await axios.get(GITHUB_SEARCH_URL, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching advanced search results:", error);
    throw error;
  }
};