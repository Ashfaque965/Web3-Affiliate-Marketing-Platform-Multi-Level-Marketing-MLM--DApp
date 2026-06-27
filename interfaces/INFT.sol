// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface INFT {
    event NFTMinted(address indexed owner, uint256 indexed tokenId, uint8 rarity);

    function mintNFT(address to, uint8 rarity) external returns (uint256);
    function burnNFT(uint256 tokenId) external;
    function getNFTRarity(uint256 tokenId) external view returns (uint8);
    function ownerOf(uint256 tokenId) external view returns (address);
}