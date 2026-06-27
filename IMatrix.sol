// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IMatrix {
    function positionUserInMatrix(user, poolId) external;
    function getMatrixStructure(user, poolId) external view returns (address[] memory children, address parent);
    function isMatrixCycleComplete(user, poolId) external view returns (bool);
}