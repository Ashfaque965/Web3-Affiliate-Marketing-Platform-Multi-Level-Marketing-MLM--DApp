import { useState, useCallback } from 'react';

export const useReferral = () => {
  const [referralCode, setReferralCode] = useState('REF-983X2');
  const [referredUsers, setReferredUsers] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Generate a shareable referral link
  const getReferralLink = useCallback(() => {
    if (!referralCode) return '';
    return `${window.location.origin}?ref=${referralCode}`;
  }, [referralCode]);

  // Submit a code that the current user received from someone else
  const submitReferralCode = useCallback(async (code) => {
    setIsSubmitting(true);
    setError(null);
    try {
      // Simulate API verification and application
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      if (code === 'INVALID') {
        throw new Error('This referral code does not exist.');
      }
      
      return { success: true, message: 'Referral applied successfully!' };
    } catch (err) {
      setError(err.message || 'Failed to submit referral code.');
      return { success: false };
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  // Fetch users who signed up using this user's code
  const fetchReferredUsers = useCallback(async () => {
    try {
      // Mocking an API call
      const mockUsers = [
        { id: 1, username: 'User_Alpha', status: 'Completed', date: '2026-05-12' },
        { id: 2, username: 'Beta_Tester', status: 'Pending', date: '2026-06-01' },
      ];
      setReferredUsers(mockUsers);
    } catch (err) {
      setError('Failed to fetch referred history.');
    }
  }, []);

  return {
    referralCode,
    referralLink: getReferralLink(),
    referredUsers,
    isSubmitting,
    error,
    submitReferralCode,
    fetchReferredUsers,
  };
};