import { ProfileData } from '../types';
import { GlassCard } from './GlassCard';
import { generateMarkdown } from '../utils/markdown';
import { CopyButton } from './CopyButton';
import ReactMarkdown from 'react-markdown';

interface PreviewProps {
  data: ProfileData;
}

export function Preview({ data }: PreviewProps) {
  const markdown = generateMarkdown(data);

  return (
    <GlassCard className="p-6">
      <h2 className="text-xl font-semibold mb-4 text-[#6495ed]">Preview</h2>
      
      {/* Raw Markdown */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-medium text-white/80">Raw Markdown</h3>
          <CopyButton text={markdown} />
        </div>
        <div className="bg-black/30 p-4 rounded-lg overflow-x-auto">
          <pre className="text-sm text-white/90">
            <code>{markdown}</code>
          </pre>
        </div>
      </div>

      {/* Rendered Preview */}
      <div>
        <h3 className="text-lg font-medium text-white/80 mb-2">Rendered Preview</h3>
        <div className="prose prose-invert max-w-none bg-black/30 p-4 rounded-lg prose-img:inline-block prose-img:m-1">
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
      </div>
    </GlassCard>
  );
}