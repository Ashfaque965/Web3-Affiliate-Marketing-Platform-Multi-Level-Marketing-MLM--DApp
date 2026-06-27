// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./interfaces/IToken.sol";

contract Treasury is AccessControl, ReentrancyGuard {
    bytes32 public constant ALLOCATOR_ROLE = keccak256("ALLOCATOR_ROLE");

    IToken public immutable token;

    // Allocation ratios (represented out of 10000 BPS)
    uint256 public rewardPoolShare = 6000;   // 60%
    uint256 public devShare = 2000;          // 20%
    uint256 public marketingShare = 2000;    // 20%
    uint256 public constant BPS_DENOMINATOR = 10000;

    address public devWallet;
    address public marketingWallet;
    address public rewardPoolAddress;

    event FundsDistributed(uint256 totalAmount, uint256 rewardAmount, uint256 devAmount, uint256 marketingAmount);
    event ShareConfigurationUpdated(uint256 rewardShare, uint256 devShare, uint256 marketingShare);

    constructor(address _token, address _dev, address _marketing, address _rewardPool) {
        token = IToken(_token);
        devWallet = _dev;
        marketingWallet = _marketing;
        rewardPoolAddress = _rewardPool;

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ALLOCATOR_ROLE, msg.sender);
    }

    /**
     * @notice Splits collected protocol fees or matrix registration funds across operations wallets.
     */
    function splitRevenue(uint256 amount) external onlyRole(ALLOCATOR_ROLE) nonReentrant {
        require(amount > 0, "No funds to distribute");

        uint256 rewardAmount = (amount * rewardPoolShare) / BPS_DENOMINATOR;
        uint256 devAmount = (amount * devShare) / BPS_DENOMINATOR;
        uint256 marketingAmount = amount - rewardAmount - devAmount; // Remainder protects against precision loss

        emit FundsDistributed(amount, rewardAmount, devAmount, marketingAmount);

        if (rewardAmount > 0) require(token.transfer(rewardPoolAddress, rewardAmount), "Reward split failed");
        if (devAmount > 0) require(token.transfer(devWallet, devAmount), "Dev split failed");
        if (marketingAmount > 0) require(token.transfer(marketingWallet, marketingAmount), "Marketing split failed");
    }

    function setShares(uint256 _rewardShare, uint256 _devShare, uint256 _marketingShare) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(_rewardShare + _devShare + _marketingShare == BPS_DENOMINATOR, "Total must equal 10000 BPS");
        rewardPoolShare = _rewardShare;
        devShare = _devShare;
        marketingShare = _marketingShare;
        
        emit ShareConfigurationUpdated(_rewardShare, _devShare, _marketingShare);
    }
}