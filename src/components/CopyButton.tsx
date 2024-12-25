import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  text: string;
  className?: string;
}

export function CopyButton({ text, className = '' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`p-2 rounded-lg transition-colors ${
        copied 
          ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' 
          : 'bg-white/10 text-white/60 hover:bg-white/20'
      } ${className}`}
      title={copied ? 'Copied!' : 'Copy to clipboard'}
    >
      {copied ? <Check size={20} /> : <Copy size={20} />}
    </button>
  );
}