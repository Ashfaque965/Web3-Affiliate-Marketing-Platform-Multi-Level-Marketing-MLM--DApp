import { useState, useCallback } from 'react';

export const useRewards = () => {
  const [claimableRewards, setClaimableRewards] = useState(150.25); // e.g., $150.25 worth of tokens
  const [isClaiming, setIsClaiming] = useState(false);
  const [claimHistory, setClaimHistory] = useState([]);

  // Claim pending rewards
  const claimRewards = useCallback(async () => {
    if (claimableRewards <= 0) return { success: false, error: 'No rewards to claim.' };

    setIsClaiming(true);
    try {
      // Simulate blockchain tx or backend distribution
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const newClaim = {
        id: Date.now(),
        amount: claimableRewards,
        timestamp: new Date().toISOString(),
        status: 'Success',
      };

      setClaimHistory((prev) => [newClaim, ...prev]);
      setClaimableRewards(0); // Reset balance upon success
      
      return { success: true, amount: newClaim.amount };
    } catch (err) {
      return { success: false, error: 'Failed to claim rewards. Try again.' };
    } finally {
      setIsClaiming(false);
    }
  }, [claimableRewards]);

  return {
    claimableRewards,
    isClaiming,
    claimHistory,
    claimRewards,
  };
};