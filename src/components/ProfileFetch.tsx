import { useState } from 'react';
import { Search } from 'lucide-react';
import { fetchGitHubProfile } from '../utils/github';
import { ProfileData } from '../types';

interface ProfileFetchProps {
  onProfileLoad: (data: Partial<ProfileData>) => void;
}

export function ProfileFetch({ onProfileLoad }: ProfileFetchProps) {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFetch = async () => {
    if (!username.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const profile = await fetchGitHubProfile(username);
      onProfileLoad({
        name: profile.name || username,
        about: profile.bio || '',
        location: profile.location || '',
        socialLinks: {
          github: profile.html_url,
          website: profile.blog || '',
          twitter: profile.twitter_username ? `https://twitter.com/${profile.twitter_username}` : '',
        },
      });
    } catch (err) {
      setError('Failed to fetch GitHub profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleFetch()}
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#6495ed]"
        />
        <button
          onClick={handleFetch}
          disabled={loading}
          className="px-4 py-2 bg-[#6495ed] rounded-lg hover:bg-[#4f7fd8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <Search size={20} />
          {loading ? 'Loading...' : 'Fetch'}
        </button>
      </div>
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  );
}