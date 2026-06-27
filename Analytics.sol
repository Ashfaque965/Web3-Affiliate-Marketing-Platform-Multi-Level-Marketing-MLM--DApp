// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract Analytics is AccessControl {
    bytes32 public constant TRACKER_ROLE = keccak256("TRACKER_ROLE");

    uint256 public globalVolume;
    uint256 public matrixCyclesCompleted;
    uint256 public totalAccountsRegistered;

    // Custom dimension mapping for flexible metrics tracking
    mapping(bytes32 => uint256) public customCounters;

    event MetricLogged(string metricName, uint256 currentValue);

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(TRACKER_ROLE, msg.sender);
    }

    function recordActivity(uint256 volumeDelta, bool cycleTriggered, bool newRegistration) external onlyRole(TRACKER_ROLE) {
        if (volumeDelta > 0) globalVolume += volumeDelta;
        if (cycleTriggered) matrixCyclesCompleted++;
        if (newRegistration) totalAccountsRegistered++;
    }

    function trackCustomMetric(string calldata metricName, uint256 delta) external onlyRole(TRACKER_ROLE) {
        bytes32 key = keccak256(abi.encodePacked(metricName));
        customCounters[key] += delta;
        
        emit MetricLogged(metricName, customCounters[key]);
    }
}