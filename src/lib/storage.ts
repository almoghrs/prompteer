export interface StorageData {
  prompts: string[];
  settings: {
    apiKey?: string;
    model?: string;
    temperature?: number;
  };
}

export const storage = {
  async get<K extends keyof StorageData>(key: K): Promise<StorageData[K] | undefined> {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      const result = await chrome.storage.local.get(key);
      return result[key];
    }
    // Fallback for development
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : undefined;
  },

  async set<K extends keyof StorageData>(key: K, value: StorageData[K]): Promise<void> {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      await chrome.storage.local.set({ [key]: value });
    } else {
      // Fallback for development
      localStorage.setItem(key, JSON.stringify(value));
    }
  },

  async clear(): Promise<void> {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      await chrome.storage.local.clear();
    } else {
      localStorage.clear();
    }
  },
};

// Dedicated API key storage helpers
export const apiKeyStorage = {
  /**
   * Get the stored API key from chrome.storage.local or localStorage
   * @returns Promise<string | undefined> The API key if found, undefined otherwise
   */
  async getApiKey(): Promise<string | undefined> {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      const result = await chrome.storage.local.get('prompteer.apiKey');
      return result['prompteer.apiKey'];
    }
    // Fallback to localStorage for development in regular browser
    return localStorage.getItem('prompteer.apiKey') || undefined;
  },

  /**
   * Set the API key in chrome.storage.local or localStorage
   * @param apiKey The API key to store
   * @returns Promise<void>
   */
  async setApiKey(apiKey: string): Promise<void> {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      await chrome.storage.local.set({ 'prompteer.apiKey': apiKey });
    } else {
      // Fallback to localStorage for development in regular browser
      localStorage.setItem('prompteer.apiKey', apiKey);
    }
  },

  /**
   * Remove the stored API key
   * @returns Promise<void>
   */
  async removeApiKey(): Promise<void> {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      await chrome.storage.local.remove('prompteer.apiKey');
    } else {
      // Fallback to localStorage for development in regular browser
      localStorage.removeItem('prompteer.apiKey');
    }
  },
};
