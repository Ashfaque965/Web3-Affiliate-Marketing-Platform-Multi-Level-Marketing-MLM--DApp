import { useState, useEffect, useCallback } from 'react';

export const useLeaderboard = (timeframe = 'weekly') => {
  const [leaders, setLeaders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLeaderboard = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Replace with your actual API endpoint
      // const response = await fetch(`/api/leaderboard?timeframe=${timeframe}`);
      // const data = await response.json();
      
      // Mock Data response
      await new Promise((resolve) => setTimeout(resolve, 800));
      const mockData = [
        { rank: 1, username: 'CryptoKing', score: 25000 },
        { rank: 2, username: 'AlphaDev', score: 22100 },
        { rank: 3, username: 'Web3Warrior', score: 19800 },
        { rank: 4, username: 'Satoshi99', score: 15400 },
        { rank: 5, username: 'HodlGod', score: 12000 },
      ];

      setLeaders(mockData);
    } catch (err) {
      setError('Failed to load leaderboard data.');
    } finally {
      setIsLoading(false);
    }
  }, [timeframe]);

  // Fetch data automatically when timeframe changes
  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  return {
    leaders,
    isLoading,
    error,
    refresh: fetchLeaderboard,
  };
};