// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./interfaces/IMatrix.sol";
import "./interfaces/IReferral.sol";

contract MatrixManager is IMatrix, AccessControl {
    bytes32 public constant ENGINE_ROLE = keccak256("ENGINE_ROLE");
    
    IReferral public immutable referralManager;
    uint256 public constant MAX_CHILDREN = 2; // Binary Matrix standard

    struct Node {
        address parent;
        address[] children;
        bool isCompleted;
    }

    // Maps: Pool ID => (User Address => Node Data)
    mapping(uint256 => mapping(address => Node)) public matrixPools;

    event NodePlaced(uint256 indexed poolId, address indexed user, address indexed parent);
    event MatrixCompleted(uint256 indexed poolId, address indexed user);

    constructor(address _referralManager) {
        referralManager = IReferral(_referralManager);
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ENGINE_ROLE, msg.sender);
    }

    function positionUserInMatrix(address user, uint256 poolId) external override onlyRole(ENGINE_ROLE) {
        address referrer = referralManager.getReferrer(user);
        if (referrer == address(0)) {
            referrer = msg.sender; // Fallback to engine root if direct referrer is empty
        }

        address targetParent = findAvailableSlot(referrer, poolId);
        
        matrixPools[poolId][user].parent = targetParent;
        matrixPools[poolId][targetParent].children.push(user);

        emit NodePlaced(poolId, user, targetParent);

        // Check if placement completes the immediate parent node
        if (matrixPools[poolId][targetParent].children.length == MAX_CHILDREN) {
            matrixPools[poolId][targetParent].isCompleted = true;
            emit MatrixCompleted(poolId, targetParent);
        }
    }

    // Level-order traversal fallback to locate open branches under an upline node
    function findAvailableSlot(address root, uint256 poolId) public view returns (address) {
        if (matrixPools[poolId][root].children.length < MAX_CHILDREN) {
            return root;
        }
        
        // Return first-line child with open capacity for simpler implementations
        for (uint256 i = 0; i < matrixPools[poolId][root].children.length; i++) {
            address child = matrixPools[poolId][root].children[i];
            if (matrixPools[poolId][poolId][child].children.length < MAX_CHILDREN) {
                return child;
            }
        }
        return root;
    }

    function getMatrixStructure(address user, uint256 poolId) external view override returns (address[] memory children, address parent) {
        Node storage node = matrixPools[poolId][user];
        return (node.children, node.parent);
    }

    function isMatrixCycleComplete(address user, uint256 poolId) external view override returns (bool) {
        return matrixPools[poolId][user].isCompleted;
    }
}