import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { GlassCard } from '../GlassCard';
import { WorkExperience as WorkExperienceType } from '../../types';

interface WorkExperienceProps {
  experiences: WorkExperienceType[];
  onChange: (experiences: WorkExperienceType[]) => void;
}

export function WorkExperience({ experiences, onChange }: WorkExperienceProps) {
  const [isAdding, setIsAdding] = useState(false);

  const addExperience = (experience: WorkExperienceType) => {
    onChange([...experiences, experience]);
    setIsAdding(false);
  };

  const removeExperience = (index: number) => {
    onChange(experiences.filter((_, i) => i !== index));
  };

  return (
    <GlassCard className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Work Experience</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-3 py-1.5 bg-[#6495ed] rounded-lg hover:bg-[#6495ed]/80 transition-colors"
        >
          <Plus size={16} />
          Add Experience
        </button>
      </div>

      <div className="space-y-4">
        {experiences.map((exp, index) => (
          <div key={index} className="p-4 bg-white/5 rounded-lg relative group">
            <button
              onClick={() => removeExperience(index)}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="text-red-400 hover:text-red-500" size={16} />
            </button>
            <div className="flex justify-between mb-2">
              <div>
                <h3 className="font-medium text-white">{exp.position}</h3>
                <p className="text-white/60">{exp.company}</p>
              </div>
              <div className="text-sm text-white/60">
                {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
              </div>
            </div>
            <p className="text-white/80 text-sm mb-2">{exp.description}</p>
            <div className="flex flex-wrap gap-2">
              {exp.technologies.map((tech, i) => (
                <span key={i} className="px-2 py-1 bg-white/10 rounded text-xs text-white/80">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}

        {isAdding && (
          <ExperienceForm
            onSubmit={addExperience}
            onCancel={() => setIsAdding(false)}
          />
        )}
      </div>
    </GlassCard>
  );
}

function ExperienceForm({ onSubmit, onCancel }: {
  onSubmit: (experience: WorkExperienceType) => void;
  onCancel: () => void;
}) {
  const [experience, setExperience] = useState<WorkExperienceType>({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    technologies: [],
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(experience);
      }}
      className="p-4 bg-white/5 rounded-lg space-y-4"
    >
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Position"
          value={experience.position}
          onChange={(e) => setExperience({ ...experience, position: e.target.value })}
          className="glass-input"
          required
        />
        <input
          type="text"
          placeholder="Company"
          value={experience.company}
          onChange={(e) => setExperience({ ...experience, company: e.target.value })}
          className="glass-input"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="month"
          placeholder="Start Date"
          value={experience.startDate}
          onChange={(e) => setExperience({ ...experience, startDate: e.target.value })}
          className="glass-input"
          required
        />
        {!experience.current && (
          <input
            type="month"
            placeholder="End Date"
            value={experience.endDate}
            onChange={(e) => setExperience({ ...experience, endDate: e.target.value })}
            className="glass-input"
            required
          />
        )}
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="current"
          checked={experience.current}
          onChange={(e) => setExperience({ ...experience, current: e.target.checked })}
          className="rounded border-white/20 bg-white/5"
        />
        <label htmlFor="current" className="text-sm text-white/80">
          I currently work here
        </label>
      </div>

      <textarea
        placeholder="Description"
        value={experience.description}
        onChange={(e) => setExperience({ ...experience, description: e.target.value })}
        className="glass-input h-24"
        required
      />

      <input
        type="text"
        placeholder="Technologies (comma-separated)"
        value={experience.technologies.join(', ')}
        onChange={(e) => setExperience({
          ...experience,
          technologies: e.target.value.split(',').map(t => t.trim()).filter(Boolean)
        })}
        className="glass-input"
      />

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1.5 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-3 py-1.5 bg-[#6495ed] rounded-lg hover:bg-[#6495ed]/80 transition-colors"
        >
          Save
        </button>
      </div>
    </form>
  );
}