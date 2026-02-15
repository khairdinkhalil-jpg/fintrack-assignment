import { useState, useEffect, useCallback } from 'react';
import { getCategories } from '../api/mockApi';

export function useCategories() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const fetchCategories = useCallback(() => {
    setLoading(true);
    setError('');

    getCategories()
      .then((result) => {
        setCategories(result);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
        categories,
        loading,
        error,
        refetch: fetchCategories
    };
}