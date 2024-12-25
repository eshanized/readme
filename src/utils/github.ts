const GITHUB_API_BASE = 'https://api.github.com';

export async function fetchGitHubProfile(username: string) {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/users/${username}`);
    if (!response.ok) {
      throw new Error('Failed to fetch GitHub profile');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching GitHub profile:', error);
    throw error;
  }
}