// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IToken {
    function mint(to, amount) external;
    function burn(from, amount) external;
    function balanceOf(account) external view returns (uint256);
    function transfer(to, amount) external returns (bool);
    function transferFrom(from, to, amount) external returns (bool);
}