import { BannerOptions } from '../types';

export function generateBannerUrl(banner: BannerOptions, name: string, title: string): string {
  if (banner.type === 'custom' && banner.customUrl) {
    return banner.customUrl;
  }

  const params = new URLSearchParams({
    type: banner.type,
    color: banner.color,
    height: banner.height.toString(),
    section: 'header',
    text: name,
    fontSize: '50',
    fontAlignY: '35',
    desc: title || '',
    descAlignY: '50',
  });

  return `https://capsule-render.vercel.app/api?${params.toString()}`;
}