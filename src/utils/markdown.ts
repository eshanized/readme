import { ProfileData, WorkExperience, Education, Project } from '../types';
import { getBadgeUrl } from './badges';
import { getSocialBadge } from './socialBadges';
import { getGitHubStats } from './githubStats';
import { generateBannerUrl } from './banner';

export function generateMarkdown(data: ProfileData): string {
  const sections: string[] = [];

  // Banner
  const bannerUrl = generateBannerUrl(data.banner, data.name, data.title);
  sections.push(`<div align="center">
  <img src="${bannerUrl}" alt="header"/>
</div>`);

  // Title and About
  if (data.name || data.title) {
    sections.push(`<div align="center"> ${data.name}${data.title ? ` | ${data.title}` : ''} </div>`);
  }

  if (data.about) {
    sections.push(`<p align="center"> ${data.about} </p>`);
  }

  // Social Links
  const socialBadges = Object.entries(data.socialLinks)
    .filter(([_, url]) => url)
    .map(([platform, url]) => getSocialBadge(platform, url));

  if (socialBadges.length > 0) {
    sections.push(`<div align="center">

${socialBadges.join(' ')}

</div>`);
  }

  // Skills
  if (data.skills.length > 0) {
    sections.push(`<h2 align="center"> 🛠 Skills </h2>

<div align="center">

${data.skills.map(skill => `![${skill}](${getBadgeUrl(skill)})`).join(' ')}

</div>`);
  }

  // Work Experience
  if (data.workExperience.length > 0) {
    sections.push(`<h2 align="center"> 💼 Work Experience </h2>

${data.workExperience.map(formatWorkExperience).join('\n\n')}`);
  }

  // Education
  if (data.education.length > 0) {
    sections.push(`## 📚 Education

${data.education.map(formatEducation).join('\n\n')}`);
  }

  // Projects
  if (data.projects.length > 0) {
    const featuredProjects = data.projects.filter(p => p.featured);
    const otherProjects = data.projects.filter(p => !p.featured);

    if (featuredProjects.length > 0) {
      sections.push(`## ⭐ Featured Projects

${featuredProjects.map(formatProject).join('\n\n')}`);
    }

    if (otherProjects.length > 0) {
      sections.push(`## 🚀 Projects

${otherProjects.map(formatProject).join('\n\n')}`);
    }
  }

  // GitHub Stats
  if (data.stats && data.socialLinks.github) {
    const username = data.socialLinks.github.split('/').pop() || '';
    sections.push(`## 📊 GitHub Stats

<div align="center">

${getGitHubStats(username).join('\n\n')}

</div>`);
  }

  // Contact
  if (data.contact) {
    sections.push(`## 📫 Contact

${data.contact}`);
  }

  // Custom Sections
  data.customSections.forEach(section => {
    sections.push(`## ${section.title}

${section.content}`);
  });

  return sections.join('\n\n');
}

function formatWorkExperience(exp: WorkExperience): string {
  return `### ${exp.position} at ${exp.company}
📅 ${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}

${exp.description}

${exp.technologies.length > 0 ? '**Technologies:** ' + exp.technologies.join(', ') : ''}`;
}

function formatEducation(edu: Education): string {
  return `### ${edu.degree} in ${edu.field}
🏛 ${edu.institution}
📅 ${edu.startDate} - ${edu.current ? 'Present' : edu.endDate}

${edu.description}`;
}

function formatProject(project: Project): string {
  return `### ${project.name} ${project.featured ? '⭐' : ''}
${project.description}

🔗 [View Project](${project.url})

${project.technologies.length > 0 ? '**Technologies:** ' + project.technologies.join(', ') : ''}`;
}