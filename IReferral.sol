// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IReferral {
    function registerUser(user, referrer) external;
    function getReferrer(user) external view returns (address);
    function getReferrals(user) external view returns (address[] memory);
    function isRegistered(user) external view returns (bool);
}