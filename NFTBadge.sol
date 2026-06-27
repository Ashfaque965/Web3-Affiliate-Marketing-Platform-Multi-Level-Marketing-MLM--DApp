// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract NFTBadge is ERC721, ERC721URIStorage, AccessControl {
    bytes32 public constant ISSUER_ROLE = keccak256("ISSUER_ROLE");
    uint256 private _tokenIds;

    event BadgeAwarded(address indexed recipient, uint256 indexed badgeId, string tokenURI);

    constructor() ERC721("LinkTum Achievement Badges", "LTUM-BADGE") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ISSUER_ROLE, msg.sender);
    }

    /**
     * @notice Issues an achievement badge to a specific user.
     */
    function awardBadge(address recipient, string calldata badgeMetadataURI) external onlyRole(ISSUER_ROLE) returns (uint256) {
        uint256 newBadgeId = _tokenIds++;
        
        _safeMint(recipient, newBadgeId);
        _setTokenURI(newBadgeId, badgeMetadataURI);

        emit BadgeAwarded(recipient, newBadgeId, badgeMetadataURI);
        return newBadgeId;
    }

    // Mandatory solidity overrides for storage inheritances
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}