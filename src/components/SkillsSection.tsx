import { useState } from 'react';
import { GlassCard } from './GlassCard';
import { SkillBadge } from './SkillBadge';
import { SKILLS_LIST } from '../utils/skillsList';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface SkillsSectionProps {
  skills: string[];
  onChange: (skills: string[]) => void;
}

export function SkillsSection({ skills, onChange }: SkillsSectionProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('Programming Languages');

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const toggleSkill = (skill: string) => {
    if (skills.includes(skill)) {
      onChange(skills.filter(s => s !== skill));
    } else {
      onChange([...skills, skill]);
    }
  };

  return (
    <GlassCard className="p-6">
      <h2 className="text-xl font-semibold mb-4 text-white">Skills</h2>
      
      {/* Selected Skills */}
      <div className="flex flex-wrap gap-3 mb-6 min-h-[40px]">
        {skills.map((skill, index) => (
          <SkillBadge
            key={index}
            skill={skill}
            onRemove={() => onChange(skills.filter((_, i) => i !== index))}
          />
        ))}
      </div>

      {/* Skills Categories */}
      <div className="space-y-4">
        {Object.entries(SKILLS_LIST).map(([category, categorySkills]) => (
          <div key={category} className="border border-white/10 rounded-lg overflow-hidden">
            <button
              className="w-full px-4 py-3 flex items-center justify-between bg-white/5 hover:bg-white/10 transition-colors"
              onClick={() => toggleCategory(category)}
            >
              <span className="font-medium text-white">{category}</span>
              {expandedCategory === category ? (
                <ChevronUp className="text-white/60" size={20} />
              ) : (
                <ChevronDown className="text-white/60" size={20} />
              )}
            </button>
            
            {expandedCategory === category && (
              <div className="p-4 bg-black/20">
                <div className="flex flex-wrap gap-2">
                  {categorySkills.map(skill => (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                        skills.includes(skill)
                          ? 'bg-[#6495ed] text-white'
                          : 'bg-white/5 text-white/80 hover:bg-white/10'
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </GlassCard>
  );
}