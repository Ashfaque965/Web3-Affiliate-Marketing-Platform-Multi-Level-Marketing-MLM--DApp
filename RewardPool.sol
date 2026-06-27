// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./interfaces/IReward.sol";
import "./interfaces/IToken.sol";

contract RewardPool is IReward, AccessControl, ReentrancyGuard {
    bytes32 public constant ALLOCATOR_ROLE = keccak256("ALLOCATOR_ROLE");

    IToken public immutable rewardToken;
    
    mapping(address => uint256) private _pendingBalances;
    uint256 public totalDistributedClaimed;

    event RewardAllocated(address indexed user, uint256 amount, uint256 indexed allocationType);
    event RewardClaimed(address indexed user, uint256 amount);

    constructor(address _rewardToken) {
        rewardToken = IToken(_rewardToken);
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ALLOCATOR_ROLE, msg.sender);
    }

    function distributeReward(address user, uint256 amount, uint256 rewardType) external override onlyRole(ALLOCATOR_ROLE) {
        require(user != address(0), "Cannot award dead address");
        _pendingBalances[user] += amount;
        
        emit RewardAllocated(user, amount, rewardType);
    }

    function claimRewards(address user) external override nonReentrant {
        // Enforce that individuals can only request execution operations on their own assets
        require(msg.sender == user, "Unauthorized claimant configuration");
        
        uint256 amountToClaim = _pendingBalances[user];
        require(amountToClaim > 0, "No rewards available");

        _pendingBalances[user] = 0;
        totalDistributedClaimed += amountToClaim;

        emit RewardClaimed(user, amountToClaim);
        
        // Dispatches asset delivery via token contract interfaces
        require(rewardToken.transfer(user, amountToClaim), "Token distribution failed");
    }

    function getPendingRewards(address user) external view override returns (uint256) {
        return _pendingBalances[user];
    }
}