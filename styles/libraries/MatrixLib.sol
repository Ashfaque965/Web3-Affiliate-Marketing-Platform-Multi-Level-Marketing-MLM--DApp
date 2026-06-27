// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

library MatrixLib {
    struct MatrixState {
        address[] currentLevelReferrals;
        bool isBlocked;
    }

    /// @notice Calculates the correct position index inside a binary/ternary matrix structure
    /// @param totalPlaces Total spots filled in the current node
    /// @param maxPlaces Maximum width of the matrix row (e.g., 2 for Binary, 3 for Ternary)
    function isMatrixRowFull(uint256 totalPlaces, uint256 maxPlaces) internal pure returns (bool) {
        return totalPlaces >= maxPlaces;
    }

    /// @notice Helper to check if a matrix node has room for a new downline placement
    function findAvailableSlot(address[] memory referrals, uint256 maxWidth) internal pure returns (int256) {
        if (referrals.length < maxWidth) {
            return int256(referrals.length);
        }
        return -1; // Row full
    }
}