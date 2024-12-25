// Map of common technologies to their badge colors
const BADGE_COLORS: Record<string, string> = {
  javascript: 'F7DF1E',
  typescript: '007ACC',
  react: '61DAFB',
  vue: '4FC08D',
  angular: 'DD0031',
  node: '339933',
  python: '3776AB',
  java: '007396',
  spring: '6DB33F',
  go: '00ADD8',
  rust: '000000',
  cpp: '00599C',
  docker: '2496ED',
  kubernetes: '326CE5',
  aws: '232F3E',
  azure: '0089D6',
  gcp: '4285F4',
};

export function getBadgeUrl(skill: string): string {
  const formattedSkill = skill.toLowerCase().replace(/\s+/g, '');
  const color = BADGE_COLORS[formattedSkill] || '555555';
  return `https://img.shields.io/badge/${skill}-${color}?style=for-the-badge&logo=${formattedSkill}&logoColor=white`;
}