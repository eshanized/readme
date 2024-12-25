export interface ProfileData {
  name: string;
  title: string;
  about: string;
  location: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  skills: string[];
  workExperience: WorkExperience[];
  education: Education[];
  certifications: Certification[];
  projects: Project[];
  stats: boolean;
  contact: string;
  customSections: CustomSection[];
  banner: BannerOptions;
}

export interface BannerOptions {
  type: string;
  color: string;
  height: number;
  customUrl?: string;
}

// ... rest of the existing interfaces ...