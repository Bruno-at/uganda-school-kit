import React from 'react';
import { useTranslatedString } from '@/hooks/useTranslatedContent';

interface TranslatedTextProps {
  children: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}

export const TranslatedText: React.FC<TranslatedTextProps> = ({ 
  children, 
  as: Component = 'span',
  className 
}) => {
  const translatedText = useTranslatedString(children);
  
  return React.createElement(Component, { className }, translatedText);
};

export default TranslatedText;
