import { useState, useEffect, useCallback } from 'react';
import { getTransactions } from '../api/mockApi';

export function useTransactions() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const fetchTransactions = useCallback(() => {
    setLoading(true);
    setError('');

    getTransactions()
      .then((result) => {
        setTransactions(result);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return {
		transactions,
		loading,
		error,
		refetch: fetchTransactions
	};
}