// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./interfaces/IReferral.sol";
import "./interfaces/IReward.sol";

contract CommissionManager is AccessControl {
    bytes32 public constant DISTRIBUTOR_ROLE = keccak256("DISTRIBUTOR_ROLE");

    IReferral public immutable referralManager;
    IReward public immutable rewardPool;

    // Basis points representation (e.g., 1000 = 10%)
    uint256[] public levelPercentages;
    uint256 public constant BPS_DENOMINATOR = 10000;

    event CommissionPaid(address indexed beneficiary, address indexed source, uint256 level, uint256 amount);
    event LevelsUpdated(uint256[] newPercentages);

    constructor(address _referralManager, address _rewardPool) {
        referralManager = IReferral(_referralManager);
        rewardPool = IReward(_rewardPool);

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(DISTRIBUTOR_ROLE, msg.sender);

        // Default structural allocation settings: 3 tiers deep
        levelPercentages.push(1000); // Level 1: 10%
        levelPercentages.push(500);  // Level 2: 5%
        levelPercentages.push(200);  // Level 3: 2%
    }

    /**
     * @notice Traverses up the referral tree, calculating and allocating rewards per tier level.
     */
    function distributeCommissions(address downlineUser, uint256 totalVolume) external onlyRole(DISTRIBUTOR_ROLE) {
        address currentUpline = referralManager.getReferrer(downlineUser);
        
        for (uint256 i = 0; i < levelPercentages.length; i++) {
            if (currentUpline == address(0)) break;

            uint256 commissionAmount = (totalVolume * levelPercentages[i]) / BPS_DENOMINATOR;
            
            if (commissionAmount > 0) {
                rewardPool.distributeReward(currentUpline, commissionAmount, i + 1);
                emit CommissionPaid(currentUpline, downlineUser, i + 1, commissionAmount);
            }

            // Move up to the next generation level
            currentUpline = referralManager.getReferrer(currentUpline);
        }
    }

    function setLevelPercentages(uint256[] calldata newPercentages) external onlyRole(DEFAULT_ADMIN_ROLE) {
        levelPercentages = newPercentages;
        emit LevelsUpdated(newPercentages);
    }
}