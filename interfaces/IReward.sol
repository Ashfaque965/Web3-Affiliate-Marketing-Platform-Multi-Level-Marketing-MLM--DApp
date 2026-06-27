// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IReward {
    event RewardClaimed(address indexed user, uint256 amount);
    event RewardDistributed(address indexed sender, uint256 amount);

    function claimReward() external;
    function distributeRewards() external payable;
    function getPendingReward(address user) external view returns (uint256);
    function totalRewardsDistributed() external view returns (uint256);
}