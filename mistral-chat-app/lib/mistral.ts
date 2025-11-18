import { Mistral } from '@mistralai/mistralai';

export const getMistralClient = () => {
  const apiKey = process.env.NEXT_PUBLIC_MISTRAL_API_KEY;
  
  if (!apiKey) {
    throw new Error('NEXT_PUBLIC_MISTRAL_API_KEY is not set');
  }
  
  return new Mistral({ apiKey });
};

export const MISTRAL_MODELS = {
  TINY: 'mistral-tiny-latest',
  SMALL: 'mistral-small-latest',
  MEDIUM: 'mistral-medium-latest',
  LARGE: 'mistral-large-latest',
} as const;
