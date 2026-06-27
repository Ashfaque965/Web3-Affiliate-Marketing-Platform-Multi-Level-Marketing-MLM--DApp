// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

library ReferralLib {
    struct ReferralTree {
        address referrer;
        address[] downlines;
        uint32 depthLevel;
    }

    /// @notice Traverses the tree upward to find an uplifted referrer up to a certain generation max
    function getUplineAtGeneration(
        mapping(address => address) storage referrers, 
        address user, 
        uint8 generation
    ) internal view returns (address) {
        address currentUpline = user;
        for (uint8 i = 0; i < generation; i++) {
            currentUpline = referrers[currentUpline];
            if (currentUpline == address(0)) break;
        }
        return currentUpline;
    }
}