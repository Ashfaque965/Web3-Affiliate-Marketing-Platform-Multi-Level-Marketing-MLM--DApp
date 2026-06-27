// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

library RewardLib {
    struct RewardPool {
        uint256 totalPoolBalance;
        uint256 totalPoints;
        uint256 rewardPerPoint;
    }

    /// @notice Calculates the dynamic share of a reward pool using a points-based system
    function calculateShare(uint256 userPoints, uint256 poolBalance, uint256 totalPoints) internal pure returns (uint256) {
        if (totalPoints == 0) return 0;
        return (userPoints * poolBalance) / totalPoints;
    }

    /// @notice Formulates penalty deductions if a user claims early (e.g., a 10% operational cut)
    function calculateEarlyClaimTax(uint256 amount, uint256 basisPoints) internal pure returns (uint256 tax, uint256 netAmount) {
        tax = (amount * basisPoints) / 10000;
        netAmount = amount - tax;
    }
}