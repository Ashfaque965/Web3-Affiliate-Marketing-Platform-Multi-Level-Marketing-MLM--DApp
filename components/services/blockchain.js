import { ethers } from 'ethers';
import { ethersService } from './ethers';

const REWARDS_CONTRACT_ADDRESS = '0x0000000000000000000000000000000000000000';
const REWARDS_ABI = [
  'function claimableRewards(address user) view returns (uint256)',
  'function claim() external returns (bool)'
];

export const blockchainService = {
  async getRewardsContract(withSigner = false) {
    const provider = ethersService.getProvider();
    const contract = new ethers.Contract(REWARDS_CONTRACT_ADDRESS, REWARDS_ABI, provider);
    
    if (withSigner) {
      const signer = await ethersService.getSigner();
      return contract.connect(signer);
    }
    return contract;
  },

  async fetchChainRewards(address) {
    const contract = await this.getRewardsContract();
    const rawBalance = await contract.claimableRewards(address);
    return ethersService.formatEther(rawBalance);
  },

  async executeClaim() {
    const contract = await this.getRewardsContract(true);
    const tx = await contract.claim();
    return await tx.wait(); // Wait for confirmation block
  }
};