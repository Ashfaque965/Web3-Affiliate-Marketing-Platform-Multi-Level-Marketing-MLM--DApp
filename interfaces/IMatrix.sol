// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IMatrix {
    struct User {
        uint256 id;
        address referrer;
        uint256 partnersCount;
        mapping(uint8 => bool) activeLevels;
    }

    event Registration(address indexed user, address indexed referrer, uint256 indexed userId, uint256 referrerId);
    event Upgrade(address indexed user, address indexed referrer, uint8 matrix, uint8 level);
    event NewUserPlace(address indexed user, address indexed referrer, uint8 matrix, uint8 level, uint8 place);

    function register(address referrer) external payable;
    function buyNewLevel(uint8 matrix, uint8 level) external payable;
    function isUserExists(address user) external view returns (bool);
    function getUserMatrix(address user, uint8 matrix, uint8 level) external view returns (address, address[] memory, bool);
}