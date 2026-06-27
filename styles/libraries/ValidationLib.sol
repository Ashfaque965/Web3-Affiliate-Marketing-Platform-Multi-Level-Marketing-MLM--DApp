// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

library ValidationLib {
    error InvalidAddress();
    error IdenticalAddresses();
    error OutOfBoundsValue();

    /// @notice Validates that an address is not the zero address
    function validateAddress(address account) internal pure {
        if (account == address(0)) revert InvalidAddress();
    }

    /// @notice Ensures no self-referral or circular dependency patterns occur
    function validateRelations(address accountA, address accountB) internal pure {
        if (accountA == accountB) revert IdenticalAddresses();
    }

    /// @notice Assures a percentage or rate value remains within reasonable parameters (e.g., under 100%)
    function validateBasisPoints(uint256 amount, uint256 maxLimit) internal pure {
        if (amount > maxLimit) revert OutOfBoundsValue();
    }
}