// LLM Provider types
export type Provider = "openai" | "anthropic";

// Request type for LLM transformation
export interface TransformRequest {
  raw: string;
  provider: Provider;
  apiKey: string;
}

// Result type for LLM transformation
export interface TransformResult {
  output: string;
}

export interface LLMResponse {
  content: string;
  timestamp: string;
  model?: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface LLMError {
  message: string;
  code?: string;
  details?: unknown;
}

export interface PromptTemplate {
  id: string;
  name: string;
  template: string;
  variables: string[];
  category?: string;
}

export interface GenerationOptions {
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
  stopSequences?: string[];
}
