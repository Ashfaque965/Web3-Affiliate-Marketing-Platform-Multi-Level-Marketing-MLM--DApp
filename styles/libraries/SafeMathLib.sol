// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

library SafeMathLib {
    /// @notice Bypasses Solidity 0.8 default overflow checks for explicitly safe loops or operations to minimize gas costs
    function uncheckedAdd(uint256 a, uint256 b) internal pure returns (uint256) {
        unchecked { return a + b; }
    }

    /// @notice Unchecked subtraction for performance-critical logic where conditions are pre-verified
    function uncheckedSub(uint256 a, uint256 b) internal pure returns (uint256) {
        unchecked { return a - b; }
    }
}