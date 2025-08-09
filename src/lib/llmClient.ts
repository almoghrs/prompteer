/**
 * LLM Client for transforming prompts using OpenAI and Anthropic APIs
 */

const SYSTEM_PROMPT = `You are an expert prompt engineer. Transform the given raw prompt into a structured, role-aware, chain-of-thought prompt that:
1. Clearly defines the role and context
2. Breaks down complex tasks into logical steps
3. Includes specific instructions for desired output format
4. Adds reasoning steps where appropriate
Return only the transformed prompt without any additional explanation.`;

/**
 * Transform a prompt using OpenAI's API
 * @param apiKey - OpenAI API key
 * @param prompt - Raw prompt to transform
 * @returns Transformed prompt string
 */
export async function transformWithOpenAI(apiKey: string, prompt: string): Promise<string> {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: SYSTEM_PROMPT
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.2,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid OpenAI response format');
    }

    return data.choices[0].message.content;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`OpenAI request failed: ${error.message}`);
    }
    throw new Error('OpenAI request failed');
  }
}

/**
 * Transform a prompt using Anthropic's API
 * @param apiKey - Anthropic API key
 * @param prompt - Raw prompt to transform
 * @returns Transformed prompt string
 */
export async function transformWithAnthropic(apiKey: string, prompt: string): Promise<string> {
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.2,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.content || !Array.isArray(data.content) || data.content.length === 0) {
      throw new Error('Invalid Anthropic response format');
    }

    // Extract text from the first content block
    const firstContent = data.content[0];
    if (!firstContent || firstContent.type !== 'text' || !firstContent.text) {
      throw new Error('Invalid Anthropic content block');
    }

    return firstContent.text;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Anthropic request failed: ${error.message}`);
    }
    throw new Error('Anthropic request failed');
  }
}
