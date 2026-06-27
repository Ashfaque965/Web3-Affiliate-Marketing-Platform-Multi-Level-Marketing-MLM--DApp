// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "./interfaces/IToken.sol";

contract Airdrop is AccessControl {
    IToken public immutable token;
    bytes32 public merkleRoot;

    mapping(address => bool) public hasClaimed;

    event AirdropClaimed(address indexed claimant, uint256 amount);
    event MerkleRootUpdated(bytes32 indexed oldRoot, bytes32 indexed newRoot);

    constructor(address _token) {
        token = IToken(_token);
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function setMerkleRoot(bytes32 _merkleRoot) external onlyRole(DEFAULT_ADMIN_ROLE) {
        emit MerkleRootUpdated(merkleRoot, _merkleRoot);
        merkleRoot = _merkleRoot;
    }

    /**
     * @notice Allows users to claim their promotional tokens by submitting a valid proof.
     */
    function claimAirdrop(uint256 amount, bytes32[] calldata proof) external {
        require(!hasClaimed[msg.sender], "Airdrop already claimed");
        require(merkleRoot != bytes32(0), "Claim parameters not active");

        // Verify leaf payload node matching configuration parameters
        bytes32 leaf = keccak256(bytes.concat(keccak256(abi.encode(msg.sender, amount))));
        require(MerkleProof.verify(proof, merkleRoot, leaf), "Invalid claim verification proof");

        hasClaimed[msg.sender] = true;
        emit AirdropClaimed(msg.sender, amount);

        require(token.transfer(msg.sender, amount), "Distribution execution failed");
    }
}