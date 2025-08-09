import { useState } from 'react';
import type { FormEvent } from 'react';
import { Tooltip } from './Tooltip';

interface PromptFormProps {
  onTransform: (rawPrompt: string, provider: 'openai' | 'anthropic', apiKey: string) => void;
  isLoading?: boolean;
}

export const PromptForm = ({ onTransform, isLoading = false }: PromptFormProps) => {
  const [rawPrompt, setRawPrompt] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [provider, setProvider] = useState<'openai' | 'anthropic'>('openai');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (rawPrompt.trim() && apiKey.trim()) {
      onTransform(rawPrompt, provider, apiKey);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Provider Selection */}
      <div>
        <label htmlFor="provider" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Provider
        </label>
        <select
          id="provider"
          value={provider}
          onChange={(e) => setProvider(e.target.value as 'openai' | 'anthropic')}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-panel bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primaryStart font-sans"
          disabled={isLoading}
        >
          <option value="openai">OpenAI</option>
          <option value="anthropic">Anthropic</option>
        </select>
      </div>

      {/* API Key Input */}
      <div>
        <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          <span className="inline-flex items-center gap-2">
            API Key
            <Tooltip text="Your API key is stored locally in your browser using chrome.storage and never sent to external servers." />
          </span>
        </label>
        <input
          id="apiKey"
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder={`Enter your ${provider === 'openai' ? 'OpenAI' : 'Anthropic'} API key`}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-panel bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primaryStart font-sans"
          disabled={isLoading}
        />
      </div>

      {/* Prompt Textarea */}
      <div>
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Prompt
        </label>
        <textarea
          id="prompt"
          value={rawPrompt}
          onChange={(e) => setRawPrompt(e.target.value)}
          placeholder="Enter your prompt here..."
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-panel bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primaryStart resize-none font-sans"
          rows={6}
          disabled={isLoading}
        />
      </div>

      {/* Submit Button */}
      <button 
        type="submit" 
        disabled={isLoading || !rawPrompt.trim() || !apiKey.trim()}
        className="px-6 py-2 bg-gradient-to-r from-primaryStart to-primaryEnd text-white font-semibold rounded-btn hover:opacity-90 transition-opacity font-sans disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Transforming...' : 'Transform'}
      </button>
    </form>
  );
};
