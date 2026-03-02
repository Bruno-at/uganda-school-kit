import React, { useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

// Cache for translated text to avoid repeated API calls
const translationCache: Map<string, Map<string, string>> = new Map();

// Batch translate multiple texts at once for efficiency
async function batchTranslate(texts: string[], targetLang: string): Promise<string[]> {
  if (targetLang === 'en' || texts.length === 0) return texts;

  const langCache = translationCache.get(targetLang) || new Map();
  if (!translationCache.has(targetLang)) translationCache.set(targetLang, langCache);

  const uncachedTexts: string[] = [];
  const uncachedIndices: number[] = [];
  const results: string[] = new Array(texts.length);

  // Check cache first
  texts.forEach((text, i) => {
    if (langCache.has(text)) {
      results[i] = langCache.get(text)!;
    } else {
      uncachedTexts.push(text);
      uncachedIndices.push(i);
    }
  });

  if (uncachedTexts.length === 0) return results;

  // Batch translate uncached texts (max 50 at a time to avoid URL length limits)
  const batchSize = 30;
  for (let b = 0; b < uncachedTexts.length; b += batchSize) {
    const batch = uncachedTexts.slice(b, b + batchSize);
    try {
      const query = batch.map(t => `q=${encodeURIComponent(t)}`).join('&');
      const response = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&${query}`
      );
      
      if (!response.ok) {
        // Fallback: translate individually
        for (let i = 0; i < batch.length; i++) {
          const idx = uncachedIndices[b + i];
          try {
            const singleResponse = await fetch(
              `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(batch[i])}`
            );
            if (singleResponse.ok) {
              const data = await singleResponse.json();
              const translated = data[0]?.map((item: any[]) => item[0]).join('') || batch[i];
              langCache.set(batch[i], translated);
              results[idx] = translated;
            } else {
              results[idx] = batch[i];
            }
          } catch {
            results[idx] = batch[i];
          }
        }
        continue;
      }
      
      const data = await response.json();
      const translated = data[0]?.map((item: any[]) => item[0]).join('') || batch[0];
      
      // For single text in batch
      if (batch.length === 1) {
        langCache.set(batch[0], translated);
        results[uncachedIndices[b]] = translated;
      } else {
        // For multiple texts, translate individually as the batch API concatenates
        for (let i = 0; i < batch.length; i++) {
          const idx = uncachedIndices[b + i];
          try {
            const singleResponse = await fetch(
              `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(batch[i])}`
            );
            if (singleResponse.ok) {
              const sData = await singleResponse.json();
              const sTranslated = sData[0]?.map((item: any[]) => item[0]).join('') || batch[i];
              langCache.set(batch[i], sTranslated);
              results[idx] = sTranslated;
            } else {
              results[idx] = batch[i];
            }
          } catch {
            results[idx] = batch[i];
          }
        }
      }
    } catch (error) {
      // On error, fill with original text
      for (let i = 0; i < batch.length; i++) {
        const idx = uncachedIndices[b + i];
        if (!results[idx]) results[idx] = batch[i];
      }
    }
  }

  return results;
}

// Check if a text node should be translated
function shouldTranslateText(text: string): boolean {
  const trimmed = text.trim();
  if (!trimmed || trimmed.length < 2) return false;
  // Skip pure numbers, symbols, emails, URLs
  if (/^[\d\s.,+\-()%$€£¥#@!?&*=:;/\\|<>{}[\]"'`~^]+$/.test(trimmed)) return false;
  if (/^https?:\/\//.test(trimmed)) return false;
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return false;
  // Skip if already in data-original-lang
  return true;
}

// Get all translatable text nodes in an element
function getTextNodes(element: Element): Text[] {
  const textNodes: Text[] = [];
  const walker = document.createTreeWalker(
    element,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: (node) => {
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        // Skip script, style, textarea, input, select elements
        const tagName = parent.tagName.toLowerCase();
        if (['script', 'style', 'textarea', 'input', 'select', 'code', 'pre', 'noscript'].includes(tagName)) {
          return NodeFilter.FILTER_REJECT;
        }
        // Skip elements marked as no-translate
        if (parent.closest('[data-no-translate]')) return NodeFilter.FILTER_REJECT;
        // Skip language selector
        if (parent.closest('[data-language-selector]')) return NodeFilter.FILTER_REJECT;
        
        if (shouldTranslateText(node.textContent || '')) {
          return NodeFilter.FILTER_ACCEPT;
        }
        return NodeFilter.FILTER_REJECT;
      }
    }
  );

  while (walker.nextNode()) {
    textNodes.push(walker.currentNode as Text);
  }
  return textNodes;
}

// Store original text in a WeakMap
const originalTextMap = new WeakMap<Text, string>();

export const AutoTranslate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const translateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const observerRef = useRef<MutationObserver | null>(null);

  const translatePage = useCallback(async () => {
    if (!containerRef.current) return;

    const textNodes = getTextNodes(containerRef.current);
    
    if (language === 'en') {
      // Restore original text
      textNodes.forEach(node => {
        const original = originalTextMap.get(node);
        if (original && node.textContent !== original) {
          node.textContent = original;
        }
      });
      return;
    }

    // Store originals and collect texts to translate
    const textsToTranslate: string[] = [];
    const nodesToUpdate: Text[] = [];

    textNodes.forEach(node => {
      if (!originalTextMap.has(node)) {
        originalTextMap.set(node, node.textContent || '');
      }
      const originalText = originalTextMap.get(node) || node.textContent || '';
      if (shouldTranslateText(originalText)) {
        textsToTranslate.push(originalText.trim());
        nodesToUpdate.push(node);
      }
    });

    if (textsToTranslate.length === 0) return;

    // Translate in batches
    const batchSize = 10;
    for (let i = 0; i < textsToTranslate.length; i += batchSize) {
      const batch = textsToTranslate.slice(i, i + batchSize);
      const batchNodes = nodesToUpdate.slice(i, i + batchSize);
      
      const translated = await batchTranslate(batch, language);
      
      batchNodes.forEach((node, idx) => {
        if (node.parentElement && translated[idx]) {
          const original = originalTextMap.get(node) || '';
          // Preserve leading/trailing whitespace from original
          const leadingSpace = original.match(/^\s*/)?.[0] || '';
          const trailingSpace = original.match(/\s*$/)?.[0] || '';
          node.textContent = leadingSpace + translated[idx] + trailingSpace;
        }
      });
    }
  }, [language]);

  useEffect(() => {
    // Debounce translation to avoid rapid fire
    if (translateTimeoutRef.current) {
      clearTimeout(translateTimeoutRef.current);
    }
    
    translateTimeoutRef.current = setTimeout(() => {
      translatePage();
    }, 300);

    return () => {
      if (translateTimeoutRef.current) {
        clearTimeout(translateTimeoutRef.current);
      }
    };
  }, [language, translatePage]);

  // Observe DOM changes to translate dynamically added content
  useEffect(() => {
    if (!containerRef.current) return;

    observerRef.current = new MutationObserver((mutations) => {
      if (language === 'en') return;
      
      let hasNewText = false;
      for (const mutation of mutations) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          hasNewText = true;
          break;
        }
      }
      
      if (hasNewText) {
        if (translateTimeoutRef.current) {
          clearTimeout(translateTimeoutRef.current);
        }
        translateTimeoutRef.current = setTimeout(() => {
          translatePage();
        }, 500);
      }
    });

    observerRef.current.observe(containerRef.current, {
      childList: true,
      subtree: true,
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [language, translatePage]);

  // Also translate placeholder attributes for inputs
  useEffect(() => {
    if (!containerRef.current || language === 'en') return;

    const timer = setTimeout(async () => {
      if (!containerRef.current) return;
      const inputs = containerRef.current.querySelectorAll('input[placeholder], textarea[placeholder]');
      const placeholders: string[] = [];
      const elements: Element[] = [];

      inputs.forEach(el => {
        const placeholder = el.getAttribute('placeholder');
        if (placeholder && shouldTranslateText(placeholder)) {
          if (!el.getAttribute('data-original-placeholder')) {
            el.setAttribute('data-original-placeholder', placeholder);
          }
          placeholders.push(el.getAttribute('data-original-placeholder') || placeholder);
          elements.push(el);
        }
      });

      if (placeholders.length > 0) {
        const translated = await batchTranslate(placeholders, language);
        elements.forEach((el, i) => {
          if (translated[i]) {
            el.setAttribute('placeholder', translated[i]);
          }
        });
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [language]);

  // Translate button values and alt texts
  useEffect(() => {
    if (!containerRef.current || language === 'en') return;

    const timer = setTimeout(async () => {
      if (!containerRef.current) return;
      
      // Translate alt attributes on images
      const images = containerRef.current.querySelectorAll('img[alt]');
      const alts: string[] = [];
      const imgElements: Element[] = [];

      images.forEach(img => {
        const alt = img.getAttribute('alt');
        if (alt && shouldTranslateText(alt)) {
          if (!img.getAttribute('data-original-alt')) {
            img.setAttribute('data-original-alt', alt);
          }
          alts.push(img.getAttribute('data-original-alt') || alt);
          imgElements.push(img);
        }
      });

      if (alts.length > 0) {
        const translated = await batchTranslate(alts, language);
        imgElements.forEach((el, i) => {
          if (translated[i]) {
            el.setAttribute('alt', translated[i]);
          }
        });
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [language]);

  return (
    <div ref={containerRef} className="contents">
      {children}
    </div>
  );
};

export default AutoTranslate;
