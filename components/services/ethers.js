import { ethers } from 'ethers';

export const ethersService = {
  getProvider() {
    if (!window.ethereum) throw new Error('No Web3 wallet detected.');
    return new ethers.providers.Web3Provider(window.ethereum);
  },

  async getSigner() {
    const provider = this.getProvider();
    return provider.getSigner();
  },

  async getNetwork() {
    const provider = this.getProvider();
    return provider.getNetwork();
  },

  // Format utility wrapper
  formatEther(wei) {
    return ethers.utils.formatEther(wei);
  },

  parseEther(ether) {
    return ethers.utils.parseEther(ether);
  }
};