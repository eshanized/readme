import { useState } from 'react';
import { Plus, Trash2, Star } from 'lucide-react';
import { GlassCard } from '../GlassCard';
import { Project } from '../../types';

interface ProjectsProps {
  projects: Project[];
  onChange: (projects: Project[]) => void;
}

export function Projects({ projects, onChange }: ProjectsProps) {
  const [isAdding, setIsAdding] = useState(false);

  const addProject = (project: Project) => {
    onChange([...projects, project]);
    setIsAdding(false);
  };

  const removeProject = (index: number) => {
    onChange(projects.filter((_, i) => i !== index));
  };

  const toggleFeatured = (index: number) => {
    const updatedProjects = [...projects];
    updatedProjects[index] = {
      ...updatedProjects[index],
      featured: !updatedProjects[index].featured
    };
    onChange(updatedProjects);
  };

  return (
    <GlassCard className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Projects</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-3 py-1.5 bg-[#6495ed] rounded-lg hover:bg-[#6495ed]/80 transition-colors"
        >
          <Plus size={16} />
          Add Project
        </button>
      </div>

      <div className="space-y-4">
        {projects.map((project, index) => (
          <div key={index} className="p-4 bg-white/5 rounded-lg relative group">
            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => toggleFeatured(index)}
                className={`${project.featured ? 'text-yellow-400' : 'text-white/60'} hover:text-yellow-400`}
              >
                <Star size={16} fill={project.featured ? 'currentColor' : 'none'} />
              </button>
              <button onClick={() => removeProject(index)}>
                <Trash2 className="text-red-400 hover:text-red-500" size={16} />
              </button>
            </div>
            
            <div className="mb-2">
              <h3 className="font-medium text-white flex items-center gap-2">
                {project.name}
                {project.featured && (
                  <Star size={14} className="text-yellow-400" fill="currentColor" />
                )}
              </h3>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-purple-400 hover:text-purple-300"
              >
                {project.url}
              </a>
            </div>
            
            <p className="text-white/80 text-sm mb-2">{project.description}</p>
            
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, i) => (
                <span key={i} className="px-2 py-1 bg-white/10 rounded text-xs text-white/80">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}

        {isAdding && (
          <ProjectForm
            onSubmit={addProject}
            onCancel={() => setIsAdding(false)}
          />
        )}
      </div>
    </GlassCard>
  );
}

function ProjectForm({ onSubmit, onCancel }: {
  onSubmit: (project: Project) => void;
  onCancel: () => void;
}) {
  const [project, setProject] = useState<Project>({
    name: '',
    description: '',
    url: '',
    technologies: [],
    featured: false,
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(project);
      }}
      className="p-4 bg-white/5 rounded-lg space-y-4"
    >
      <input
        type="text"
        placeholder="Project Name"
        value={project.name}
        onChange={(e) => setProject({ ...project, name: e.target.value })}
        className="glass-input w-full"
        required
      />

      <input
        type="url"
        placeholder="Project URL"
        value={project.url}
        onChange={(e) => setProject({ ...project, url: e.target.value })}
        className="glass-input w-full"
        required
      />

      <textarea
        placeholder="Description"
        value={project.description}
        onChange={(e) => setProject({ ...project, description: e.target.value })}
        className="glass-input h-24"
        required
      />

      <input
        type="text"
        placeholder="Technologies (comma-separated)"
        value={project.technologies.join(', ')}
        onChange={(e) => setProject({
          ...project,
          technologies: e.target.value.split(',').map(t => t.trim()).filter(Boolean)
        })}
        className="glass-input"
      />

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="featured"
          checked={project.featured}
          onChange={(e) => setProject({ ...project, featured: e.target.checked })}
          className="rounded border-white/20 bg-white/5"
        />
        <label htmlFor="featured" className="text-sm text-white/80">
          Featured project
        </label>
      </div>

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