import { useState } from 'react';

interface PromptOutputProps {
  value: string;
  onCopy?: (text: string) => void;
}

export const PromptOutput = ({ value, onCopy }: PromptOutputProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (value) {
      try {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        if (onCopy) {
          onCopy(value);
        }
        // Reset copied state after 2 seconds
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy text:', err);
      }
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 font-sans">Output</h2>
        {value && onCopy !== undefined && (
          <button
            onClick={handleCopy}
            className="px-4 py-1 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-btn transition-colors font-sans"
            aria-label="Copy to clipboard"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>
      {value ? (
        <pre className="p-4 bg-gray-50 dark:bg-gray-900 rounded-panel border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 font-mono text-sm overflow-auto max-h-96">
          {value}
        </pre>
      ) : (
        <p className="text-gray-500 dark:text-gray-400 italic font-sans">
          No output yet. Transform a prompt to see results.
        </p>
      )}
    </div>
  );
};
