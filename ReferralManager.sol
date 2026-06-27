// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./interfaces/IReferral.sol";

contract ReferralManager is IReferral, AccessControl {
    bytes32 public constant MANAGER_ROLE = keccak256("MANAGER_ROLE");

    // Maps: User address => Referrer address
    mapping(address => address) private _referrers;
    // Maps: User address => Array of direct referrals
    mapping(address => address[]) private _referrals;
    // Track registration states
    mapping(address => bool) private _isRegistered;

    uint256 public totalUsers;

    event UserRegistered(address indexed user, address indexed referrer);

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MANAGER_ROLE, msg.sender);
        
        // Root system configuration
        _isRegistered[msg.sender] = true;
        totalUsers = 1;
    }

    function registerUser(address user, address referrer) external override onlyRole(MANAGER_ROLE) {
        require(user != address(0), "Invalid user address");
        require(!_isRegistered[user], "User already registered");
        require(_isRegistered[referrer], "Referrer must be registered");
        require(user != referrer, "Cannot refer yourself");

        _referrers[user] = referrer;
        _referrals[referrer].push(user);
        _isRegistered[user] = true;
        totalUsers++;

        emit UserRegistered(user, referrer);
    }

    function getReferrer(address user) external view override returns (address) {
        return _referrers[user];
    }

    function getReferrals(address user) external view override returns (address[] memory) {
        return _referrals[user];
    }

    function isRegistered(address user) external view override returns (bool) {
        return _isRegistered[user];
    }
}