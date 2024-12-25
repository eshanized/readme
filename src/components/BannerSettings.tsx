import { useState } from 'react';
import { GlassCard } from './GlassCard';
import { BannerOptions } from '../types';
import { Image } from 'lucide-react';

interface BannerSettingsProps {
  banner: BannerOptions;
  onChange: (banner: BannerOptions) => void;
}

export function BannerSettings({ banner, onChange }: BannerSettingsProps) {
  const [showCustomUrl, setShowCustomUrl] = useState(banner.type === 'custom');

  const bannerTypes = [
    { value: 'waving', label: 'Waving' },
    { value: 'slice', label: 'Slice' },
    { value: 'cylinder', label: 'Cylinder' },
    { value: 'rect', label: 'Rectangle' },
    { value: 'custom', label: 'Custom URL' }
  ];

  const gradientColors = [
    { value: 'gradient', label: 'Purple Gradient' },
    { value: '0:EEFF00,100:a82da8', label: 'Gold to Purple' },
    { value: '0:FF0000,100:00FF00', label: 'Red to Green' },
    { value: '0:3498db,100:2980b9', label: 'Blue Shades' }
  ];

  return (
    <GlassCard className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Image size={24} className="text-[#6495ed]" />
        <h2 className="text-xl font-semibold text-white">Banner Settings</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            Banner Style
          </label>
          <select
            value={banner.type}
            onChange={(e) => {
              setShowCustomUrl(e.target.value === 'custom');
              onChange({ ...banner, type: e.target.value });
            }}
            className="glass-input w-full"
          >
            {bannerTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>

        {showCustomUrl ? (
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Custom Banner URL
            </label>
            <input
              type="url"
              value={banner.customUrl || ''}
              onChange={(e) => onChange({ ...banner, customUrl: e.target.value })}
              placeholder="https://example.com/banner.png"
              className="glass-input w-full"
            />
          </div>
        ) : (
          <>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Color Theme
              </label>
              <select
                value={banner.color}
                onChange={(e) => onChange({ ...banner, color: e.target.value })}
                className="glass-input w-full"
              >
                {gradientColors.map(color => (
                  <option key={color.value} value={color.value}>{color.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Height (px)
              </label>
              <input
                type="number"
                value={banner.height}
                onChange={(e) => onChange({ ...banner, height: Number(e.target.value) })}
                min="100"
                max="400"
                step="10"
                className="glass-input w-full"
              />
            </div>
          </>
        )}
      </div>
    </GlassCard>
  );
}