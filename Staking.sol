// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./interfaces/IToken.sol";

contract Staking is AccessControl, ReentrancyGuard {
    IToken public immutable stakingToken;

    struct Stake {
        uint256 amount;
        uint256 timestamp;
        uint256 rewardDebt;
    }

    // Annual Percentage Yield expressed in BPS (e.g., 1200 = 12% APY)
    uint256 public constant APY_BPS = 1200;
    uint256 public constant BPS_DENOMINATOR = 10000;
    uint256 public constant SECONDS_IN_YEAR = 365 days;

    mapping(address => Stake) public userStakes;
    uint256 public totalTokensStaked;

    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount, uint256 reward);

    constructor(address _stakingToken) {
        stakingToken = IToken(_stakingToken);
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function stake(uint256 amount) external nonReentrant {
        require(amount > 0, "Cannot stake 0 tokens");
        
        Stake storage position = userStakes[msg.sender];
        
        // Claim any existing accrued yield before adding to principal pool balance
        uint256 pendingYield = calculateYield(msg.sender);
        
        position.amount += amount;
        position.timestamp = block.timestamp;
        position.rewardDebt += pendingYield;
        
        totalTokensStaked += amount;
        
        emit Staked(msg.sender, amount);
        require(stakingToken.transferFrom(msg.sender, address(position), amount), "Deposit failed");
    }

    function unstake() external nonReentrant {
        Stake storage position = userStakes[msg.sender];
        uint256 principal = position.amount;
        require(principal > 0, "No active stake found");

        uint256 totalPayout = principal + calculateYield(msg.sender) + position.rewardDebt;

        totalTokensStaked -= principal;
        delete userStakes[msg.sender];

        emit Unstaked(msg.sender, principal, totalPayout - principal);
        require(stakingToken.transfer(msg.sender, totalPayout), "Withdraw payout execution failed");
    }

    function calculateYield(address user) public view returns (uint256) {
        Stake storage position = userStakes[user];
        if (position.amount == 0) return 0;

        uint256 stakingDuration = block.timestamp - position.timestamp;
        uint256 accruedInterest = (position.amount * APY_BPS * stakingDuration) / (BPS_DENOMINATOR * SECONDS_IN_YEAR);
        
        return accruedInterest;
    }
}