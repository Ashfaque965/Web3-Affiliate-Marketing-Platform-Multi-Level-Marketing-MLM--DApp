// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./interfaces/IToken.sol";

contract Withdraw is AccessControl, ReentrancyGuard {
    bytes32 public constant WITHDRAW_MANAGER_ROLE = keccak256("WITHDRAW_MANAGER_ROLE");

    IToken public immutable token;
    uint256 public maxSingleWithdrawalLimit = 10000 * 10**18; // Limit per tx

    event WithdrawalProcessed(address indexed recipient, uint256 amount);
    event LimitUpdated(uint256 newLimit);

    constructor(address _token) {
        token = IToken(_token);
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(WITHDRAW_MANAGER_ROLE, msg.sender);
    }

    function executeWithdrawal(address recipient, uint256 amount) external onlyRole(WITHDRAW_MANAGER_ROLE) nonReentrant {
        require(amount <= maxSingleWithdrawalLimit, "Exceeds secure transaction threshold limit");
        require(recipient != address(0), "Cannot withdraw to dead address");

        emit WithdrawalProcessed(recipient, amount);
        require(token.transfer(recipient, amount), "Capital pool transfer failed");
    }

    function setWithdrawalLimit(uint256 newLimit) external onlyRole(DEFAULT_ADMIN_ROLE) {
        maxSingleWithdrawalLimit = newLimit;
        emit LimitUpdated(newLimit);
    }
}