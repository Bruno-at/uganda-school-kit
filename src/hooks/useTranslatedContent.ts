import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

// Cache translated content to avoid repeated API calls
const translationCache: Map<string, Map<string, string>> = new Map();

export const useTranslatedContent = () => {
  const { language } = useLanguage();

  const translateText = useCallback(async (text: string): Promise<string> => {
    if (!text || language === 'en') return text;

    // Check cache first
    const langCache = translationCache.get(language);
    if (langCache?.has(text)) {
      return langCache.get(text)!;
    }

    try {
      const response = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${language}&dt=t&q=${encodeURIComponent(text)}`
      );
      
      if (!response.ok) return text;
      
      const data = await response.json();
      const translatedText = data[0]?.map((item: any[]) => item[0]).join('') || text;

      // Cache the result
      if (!translationCache.has(language)) {
        translationCache.set(language, new Map());
      }
      translationCache.get(language)!.set(text, translatedText);

      return translatedText;
    } catch (error) {
      console.error('Translation error:', error);
      return text;
    }
  }, [language]);

  const translateMultiple = useCallback(async (texts: string[]): Promise<string[]> => {
    if (language === 'en') return texts;
    
    const results = await Promise.all(texts.map(text => translateText(text)));
    return results;
  }, [language, translateText]);

  return { translateText, translateMultiple, currentLanguage: language };
};

// Hook for translating a single string reactively
export const useTranslatedString = (text: string) => {
  const { language } = useLanguage();
  const [translated, setTranslated] = useState(text);
  const { translateText } = useTranslatedContent();

  useEffect(() => {
    if (language === 'en') {
      setTranslated(text);
      return;
    }

    translateText(text).then(setTranslated);
  }, [text, language, translateText]);

  return translated;
};

// Hook for translating an array of objects with specified keys
export const useTranslatedArray = <T extends Record<string, any>>(
  items: T[],
  keysToTranslate: (keyof T)[]
): T[] => {
  const { language } = useLanguage();
  const [translatedItems, setTranslatedItems] = useState<T[]>(items);
  const { translateText } = useTranslatedContent();

  useEffect(() => {
    if (language === 'en') {
      setTranslatedItems(items);
      return;
    }

    const translateItems = async () => {
      const translated = await Promise.all(
        items.map(async (item) => {
          const translatedItem = { ...item };
          for (const key of keysToTranslate) {
            if (typeof item[key] === 'string') {
              (translatedItem as any)[key] = await translateText(item[key] as string);
            }
          }
          return translatedItem;
        })
      );
      setTranslatedItems(translated);
    };

    translateItems();
  }, [items, language, keysToTranslate, translateText]);

  return translatedItems;
};
