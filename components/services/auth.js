import { api } from './api';

export const authService = {
  // Requests a unique cryptographic nonce from your backend for Web3 login
  async getNonce(address) {
    return api.post('/auth/nonce', { address });
  },

  // Verifies the signature from the wallet on your backend
  async verifySignature(address, signature) {
    const { token, user } = await api.post('/auth/verify', { address, signature });
    localStorage.setItem('authToken', token);
    return user;
  },

  logout() {
    localStorage.removeItem('authToken');
    window.location.reload();
  },

  isAuthenticated() {
    return !!localStorage.getItem('authToken');
  }
};