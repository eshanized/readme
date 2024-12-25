import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { GlassCard } from '../GlassCard';
import { Education as EducationType } from '../../types';

interface EducationProps {
  education: EducationType[];
  onChange: (education: EducationType[]) => void;
}

export function Education({ education, onChange }: EducationProps) {
  const [isAdding, setIsAdding] = useState(false);

  const addEducation = (edu: EducationType) => {
    onChange([...education, edu]);
    setIsAdding(false);
  };

  const removeEducation = (index: number) => {
    onChange(education.filter((_, i) => i !== index));
  };

  return (
    <GlassCard className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Education</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-3 py-1.5 bg-[#6495ed] rounded-lg hover:bg-[#6495ed]/80 transition-colors"
        >
          <Plus size={16} />
          Add Education
        </button>
      </div>

      <div className="space-y-4">
        {education.map((edu, index) => (
          <div key={index} className="p-4 bg-white/5 rounded-lg relative group">
            <button
              onClick={() => removeEducation(index)}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="text-red-400 hover:text-red-500" size={16} />
            </button>
            <div className="flex justify-between mb-2">
              <div>
                <h3 className="font-medium text-white">{edu.degree} in {edu.field}</h3>
                <p className="text-white/60">{edu.institution}</p>
              </div>
              <div className="text-sm text-white/60">
                {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
              </div>
            </div>
            <p className="text-white/80 text-sm">{edu.description}</p>
          </div>
        ))}

        {isAdding && (
          <EducationForm
            onSubmit={addEducation}
            onCancel={() => setIsAdding(false)}
          />
        )}
      </div>
    </GlassCard>
  );
}

function EducationForm({ onSubmit, onCancel }: {
  onSubmit: (education: EducationType) => void;
  onCancel: () => void;
}) {
  const [education, setEducation] = useState<EducationType>({
    institution: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(education);
      }}
      className="p-4 bg-white/5 rounded-lg space-y-4"
    >
      <input
        type="text"
        placeholder="Institution"
        value={education.institution}
        onChange={(e) => setEducation({ ...education, institution: e.target.value })}
        className="glass-input w-full"
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Degree"
          value={education.degree}
          onChange={(e) => setEducation({ ...education, degree: e.target.value })}
          className="glass-input"
          required
        />
        <input
          type="text"
          placeholder="Field of Study"
          value={education.field}
          onChange={(e) => setEducation({ ...education, field: e.target.value })}
          className="glass-input"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="month"
          placeholder="Start Date"
          value={education.startDate}
          onChange={(e) => setEducation({ ...education, startDate: e.target.value })}
          className="glass-input"
          required
        />
        {!education.current && (
          <input
            type="month"
            placeholder="End Date"
            value={education.endDate}
            onChange={(e) => setEducation({ ...education, endDate: e.target.value })}
            className="glass-input"
            required
          />
        )}
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="current-education"
          checked={education.current}
          onChange={(e) => setEducation({ ...education, current: e.target.checked })}
          className="rounded border-white/20 bg-white/5"
        />
        <label htmlFor="current-education" className="text-sm text-white/80">
          I am currently studying here
        </label>
      </div>

      <textarea
        placeholder="Description"
        value={education.description}
        onChange={(e) => setEducation({ ...education, description: e.target.value })}
        className="glass-input h-24"
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