// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

contract Emergency is Pausable, AccessControl {
    bytes32 public constant GUARDIAN_ROLE = keccak256("GUARDIAN_ROLE");

    event EmergencyPauseTriggered(address indexed account);
    event EmergencyPauseLifted(address indexed account);

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(GUARDIAN_ROLE, msg.sender);
    }

    /**
     * @notice Pauses contract interactions across connected system modules.
     */
    function triggerPause() external onlyRole(GUARDIAN_ROLE) {
        _pause();
        emit EmergencyPauseTriggered(msg.sender);
    }

    /**
     * @notice Unpauses contract interactions once the threat has been resolved.
     */
    function liftPause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
        emit EmergencyPauseLifted(msg.sender);
    }
}