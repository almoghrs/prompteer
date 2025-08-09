import { useState } from 'react';
import { PromptForm } from './components/PromptForm';
import { PromptOutput } from './components/PromptOutput';

function App() {
  const [transformedPrompt, setTransformedPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTransform = async (rawPrompt: string, provider: 'openai' | 'anthropic', _apiKey: string) => {
    setIsLoading(true);
    try {
      // TODO: Implement actual transformation logic
      // For now, just simulate a transformation
      await new Promise(resolve => setTimeout(resolve, 1000));
      setTransformedPrompt(`[Transformed with ${provider}]\n\n${rawPrompt}`);
    } catch (error) {
      console.error('Error transforming prompt:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    console.log('Copied to clipboard:', text);
  };

  return (
    <div className="min-h-screen bg-neutralLight dark:bg-neutralDark font-sans p-6">
      <div className="max-w-4xl mx-auto">
        {/* Main Panel Container */}
        <div className="bg-white dark:bg-gray-800 rounded-panel shadow-lg p-6">
          {/* Header with gradient brand text */}
          <header className="mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primaryStart to-primaryEnd bg-clip-text text-transparent">
              Prompteer
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              AI-powered prompt engineering assistant
            </p>
          </header>

          {/* Prompt Form Section */}
          <div className="mb-6">
            <PromptForm 
              onTransform={handleTransform}
              isLoading={isLoading}
            />
          </div>

          {/* Prompt Output Section */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <PromptOutput 
              value={transformedPrompt}
              onCopy={handleCopy}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
