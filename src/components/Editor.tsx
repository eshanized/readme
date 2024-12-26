import { ProfileData } from '../types';
import { GlassCard } from './GlassCard';
import { SkillsSection } from './SkillsSection';
import { SocialLinks } from './SocialLinks';

export function Editor({ data, onChange }: { data: ProfileData; onChange: (data: ProfileData) => void }) {
  return (
    <div className="space-y-6 p-6">
      <GlassCard className="p-6">
      <h2 className="text-xl font-semibold mb-4 text-[#6495ed] text-center">Profile Information</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={data.name || ''}
            onChange={(e) => onChange({ ...data, name: e.target.value })}
            className="w-full bg-white/5 border border-[#6495ed]/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#6495ed] drop-shadow-[0_0_10px_#6495ed]"
          />
          <input
            type="text"
            placeholder="Professional Title"
            value={data.title || ''}
            onChange={(e) => onChange({ ...data, title: e.target.value })}
            className="w-full bg-white/5 border border-[#6495ed]/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#6495ed] drop-shadow-[0_0_10px_#6495ed]"
          />
          <textarea
            placeholder="About You"
            value={data.about || ''}
            onChange={(e) => onChange({ ...data, about: e.target.value })}
            className="w-full bg-white/5 border border-[#6495ed]/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#6495ed] h-32 drop-shadow-[0_0_10px_#6495ed]"
          />
        </div>
      </GlassCard>

      <GlassCard className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-[#6495ed]">Social Links</h2>
        <SocialLinks
          socialLinks={data.socialLinks}
          onChange={(socialLinks) => onChange({ ...data, socialLinks })}
        />
      </GlassCard>
      
      <SkillsSection
        skills={data.skills}
        onChange={(skills) => onChange({ ...data, skills })}
      />
    </div>
  );
}