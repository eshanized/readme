import { Github, Linkedin, Twitter, Globe } from 'lucide-react';
import { ProfileData } from '../types';

interface SocialLinksProps {
  socialLinks: ProfileData['socialLinks'];
  onChange: (socialLinks: ProfileData['socialLinks']) => void;
}

export function SocialLinks({ socialLinks, onChange }: SocialLinksProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-3">
        <Github className="text-[#6495ed]" size={20} />
        <input
          type="text"
          placeholder="GitHub Profile URL"
          value={socialLinks.github || ''}
          onChange={(e) => onChange({ ...socialLinks, github: e.target.value })}
          className="flex-1 bg-white/5 border border-[#6495ed]/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#6495ed]"
        />
      </div>
      <div className="flex items-center space-x-3">
        <Linkedin className="text-[#6495ed]" size={20} />
        <input
          type="text"
          placeholder="LinkedIn Profile URL"
          value={socialLinks.linkedin || ''}
          onChange={(e) => onChange({ ...socialLinks, linkedin: e.target.value })}
          className="flex-1 bg-white/5 border border-[#6495ed]/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#6495ed]"
        />
      </div>
      <div className="flex items-center space-x-3">
        <Twitter className="text-[#6495ed]" size={20} />
        <input
          type="text"
          placeholder="Twitter Profile URL"
          value={socialLinks.twitter || ''}
          onChange={(e) => onChange({ ...socialLinks, twitter: e.target.value })}
          className="flex-1 bg-white/5 border border-[#6495ed]/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#6495ed]"
        />
      </div>
      <div className="flex items-center space-x-3">
        <Globe className="text-[#6495ed]" size={20} />
        <input
          type="text"
          placeholder="Website URL"
          value={socialLinks.website || ''}
          onChange={(e) => onChange({ ...socialLinks, website: e.target.value })}
          className="flex-1 bg-white/5 border border-[#6495ed]/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#6495ed]"
        />
      </div>
    </div>
  );
}