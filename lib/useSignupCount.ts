// lib/useSignupCount.ts
import { useState, useEffect } from 'react';

export function useSignupCount() {
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/signup-count');
        
        if (!response.ok) {
          throw new Error('Failed to fetch signup count');
        }
        
        const data = await response.json();
        setCount(data.count);
        setError(null);
      } catch (err) {
        console.error('Error fetching signup count:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        setCount(0); // Fallback to 0
      } finally {
        setLoading(false);
      }
    };

    fetchCount();
  }, []);

  return { count, loading, error };
}