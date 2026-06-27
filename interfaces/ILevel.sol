// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface ILevel {
    event LevelUnlocked(address indexed user, uint8 level);

    function setLevelPrice(uint8 level, uint256 price) external;
    function getLevelPrice(uint8 level) external view returns (uint256);
    function getUserCurrentLevel(address user) external view returns (uint8);
    function maxLevels() external view returns (uint8);
}