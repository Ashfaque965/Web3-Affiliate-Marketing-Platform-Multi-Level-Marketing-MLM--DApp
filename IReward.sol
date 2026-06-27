// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IReward {
    function distributeReward(user, amount, rewardType) external;
    function getPendingRewards(user) external view returns (uint256);
    function claimRewards(user) external;
}