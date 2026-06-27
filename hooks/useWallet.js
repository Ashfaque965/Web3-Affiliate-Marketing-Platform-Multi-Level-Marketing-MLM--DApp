import { useState, useEffect, useCallback } from 'react';

export const useWallet = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check if wallet was previously connected
  useEffect(() => {
    const savedAddress = localStorage.getItem('connectedWallet');
    if (savedAddress) {
      setWalletAddress(savedAddress);
      fetchBalance(savedAddress);
    }
  }, []);

  // Fetch wallet balance (Mocking an API or RPC call)
  const fetchBalance = async (address) => {
    try {
      // Replace with actual RPC/API call (e.g., provider.getBalance)
      const mockBalance = (Math.random() * 10).toFixed(4); 
      setBalance(Number(mockBalance));
    } catch (err) {
      setError('Failed to fetch balance');
    }
  };

  // Connect Wallet
  const connectWallet = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate wallet connection delay (e.g., MetaMask popup)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const mockAddress = '0x71C...3A9b'; // Replace with actual address fetching
      setWalletAddress(mockAddress);
      localStorage.setItem('connectedWallet', mockAddress);
      await fetchBalance(mockAddress);
    } catch (err) {
      setError('Connection rejected by user');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Disconnect Wallet
  const disconnectWallet = useCallback(() => {
    setWalletAddress(null);
    setBalance(0);
    localStorage.removeItem('connectedWallet');
  }, []);

  return {
    walletAddress,
    balance,
    isConnected: !!walletAddress,
    isLoading,
    error,
    connectWallet,
    disconnectWallet,
  };
};