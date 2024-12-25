interface BadgeConfig {
  icon: string;
  color: string;
  label: string;
}

const SOCIAL_BADGES: Record<string, BadgeConfig> = {
  github: {
    icon: 'github',
    color: '181717',
    label: 'GitHub'
  },
  linkedin: {
    icon: 'linkedin',
    color: '0A66C2',
    label: 'LinkedIn'
  },
  twitter: {
    icon: 'twitter',
    color: '1DA1F2',
    label: 'Twitter'
  },
  website: {
    icon: 'globe',
    color: '4CAF50',
    label: 'Website'
  }
};

export function getSocialBadge(platform: string, url: string): string {
  const config = SOCIAL_BADGES[platform.toLowerCase()];
  if (!config) return '';
  
  return `[![${config.label}](https://img.shields.io/badge/${config.label}-${config.color}?style=for-the-badge&logo=${config.icon})](${url})`;
}