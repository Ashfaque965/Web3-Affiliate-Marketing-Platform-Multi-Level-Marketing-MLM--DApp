// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./interfaces/IToken.sol";

contract Vesting is AccessControl, ReentrancyGuard {
    IToken public immutable token;

    struct Schedule {
        uint256 totalAmount;
        uint256 releasedAmount;
        uint256 start;
        uint256 cliff;
        uint256 duration;
    }

    mapping(address => Schedule) public vestingSchedules;

    event ScheduleCreated(address indexed beneficiary, uint256 amount);
    event TokensClaimed(address indexed beneficiary, uint256 amount);

    constructor(address _token) {
        token = IToken(_token);
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function createSchedule(
        address beneficiary,
        uint256 amount,
        uint256 start,
        uint256 cliffDuration,
        uint256 linearDuration
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(vestingSchedules[beneficiary].totalAmount == 0, "Schedule already exists");
        require(beneficiary != address(0), "Invalid beneficiary");

        vestingSchedules[beneficiary] = Schedule({
            totalAmount: amount,
            releasedAmount: 0,
            start: start,
            cliff: start + cliffDuration,
            duration: linearDuration
        });

        emit ScheduleCreated(beneficiary, amount);
    }

    function claimVestedTokens() external nonReentrant {
        Schedule storage schedule = vestingSchedules[msg.sender];
        require(schedule.totalAmount > 0, "No vesting schedule found");

        uint256 claimable = calculateClaimable(msg.sender);
        require(claimable > 0, "No tokens available for release yet");

        schedule.releasedAmount += claimable;
        emit TokensClaimed(msg.sender, claimable);

        require(token.transfer(msg.sender, claimable), "Vesting transfer failed");
    }

    function calculateClaimable(address beneficiary) public view returns (uint256) {
        Schedule memory schedule = vestingSchedules[beneficiary];
        if (block.timestamp < schedule.cliff) return 0;
        if (block.timestamp >= schedule.start + schedule.duration) {
            return schedule.totalAmount - schedule.releasedAmount;
        }

        uint256 timeElapsed = block.timestamp - schedule.start;
        uint256 totalVested = (schedule.totalAmount * timeElapsed) / schedule.duration;
        
        return totalVested - schedule.releasedAmount;
    }
}