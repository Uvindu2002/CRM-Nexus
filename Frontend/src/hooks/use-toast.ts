import { useCallback } from 'react';

type ToastVariant = 'default' | 'destructive';

interface ToastOptions {
  title?: string;
  description?: string;
  variant?: ToastVariant;
}

export const useToast = () => {
  const toast = useCallback(({ title, description, variant = 'default' }: ToastOptions) => {
    // For now, we'll just console.log the toast
    console.log(`Toast: ${variant}`, { title, description });
  }, []);

  return toast;
};
