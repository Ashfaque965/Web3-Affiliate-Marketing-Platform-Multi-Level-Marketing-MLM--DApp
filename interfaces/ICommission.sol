// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface ICommission {
    event CommissionPaid(address indexed beneficiary, address indexed payer, uint256 amount, uint8 reason);

    function payCommission(address payer, uint256 amount, uint8 level) external payable;
    function getCommissionRates(uint8 level) external view returns (uint256);
    function totalCommissionsPaid() external view returns (uint256);
}