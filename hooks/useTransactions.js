import { useState, useEffect, useCallback } from 'react';

export const useTransactions = (filterType = 'all') => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTransactions = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate API/Explorer fetch delay
      await new Promise((resolve) => setTimeout(resolve, 1200));

      const mockHistory = [
        { id: 'tx_01', type: 'claim', amount: 150.25, asset: 'USDC', status: 'Confirmed', date: '2026-06-25' },
        { id: 'tx_02', type: 'deposit', amount: 0.5, asset: 'ETH', status: 'Confirmed', date: '2026-06-20' },
        { id: 'tx_03', type: 'withdrawal', amount: 1000, asset: 'GOLD', status: 'Pending', date: '2026-06-27' },
        { id: 'tx_04', type: 'claim', amount: 45.00, asset: 'USDC', status: 'Failed', date: '2026-06-15' },
      ];

      // Filter local mock data based on parameters
      const filteredData = filterType === 'all' 
        ? mockHistory 
        : mockHistory.filter(tx => tx.type === filterType);

      setTransactions(filteredData);
    } catch (err) {
      setError('Failed to load transaction history.');
    } finally {
      setIsLoading(false);
    }
  }, [filterType]);

  // Automatically refresh when the filter type shifts
  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return {
    transactions,
    isLoading,
    error,
    refreshTransactions: fetchTransactions,
  };
};