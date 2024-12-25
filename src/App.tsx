import { useState } from 'react';
import { Editor } from './components/Editor';
import { Preview } from './components/Preview';
import { ProfileFetch } from './components/ProfileFetch';
import { ProfileData } from './types';
import { FileCode } from 'lucide-react';
import { WorkExperience } from './components/sections/WorkExperience';
import { Education } from './components/sections/Education';
import { Projects } from './components/sections/Projects';
import { BannerSettings } from './components/BannerSettings';

const initialData: ProfileData = {
  name: '',
  title: '',
  about: '',
  location: '',
  socialLinks: {
    github: '',
    linkedin: '',
    twitter: '',
    website: '',
  },
  skills: [],
  workExperience: [],
  education: [],
  certifications: [],
  projects: [],
  stats: true,
  contact: '',
  customSections: [],
  banner: {
    type: 'waving',
    color: 'gradient',
    height: 200,
  },
};

export default function App() {
  const [data, setData] = useState<ProfileData>(initialData);

  const handleProfileLoad = (profile: Partial<ProfileData>) => {
    setData(current => ({
      ...current,
      ...profile,
    }));
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FileCode size={40} className="text-[#6495ed]" />
            <h1 className="text-4xl font-bold text-white">README Generator</h1>
          </div>
          <p className="text-[#6495ed]">Create your perfect GitHub profile README in minutes</p>
          <div className="mt-8 max-w-md mx-auto">
            <ProfileFetch onProfileLoad={handleProfileLoad} />
          </div>
        </header>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Editor data={data} onChange={setData} />
            <BannerSettings 
              banner={data.banner} 
              onChange={(banner) => setData({ ...data, banner })} 
            />
            <WorkExperience
              experiences={data.workExperience}
              onChange={(workExperience) => setData({ ...data, workExperience })}
            />
            <Education
              education={data.education}
              onChange={(education) => setData({ ...data, education })}
            />
            <Projects
              projects={data.projects}
              onChange={(projects) => setData({ ...data, projects })}
            />
          </div>
          <div className="lg:sticky lg:top-8 h-fit">
            <Preview data={data} />
          </div>
        </div>

        <footer className="mt-12 text-center text-sm text-gray-400">
          <p>Created with ❤️ by 
            <a 
              href="https://github.com/eshanized" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#6495ed] hover:text-[#4f7fd8] ml-1"
            >
              eshanized
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}