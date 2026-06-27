// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title LinkTum Platform Native Utility Token
 * @dev Custom ERC20 token implementation supporting onboarding allocation distributions
 * for the LinkTum Matrix Network engine.
 */
contract LinkTumToken is ERC20, Ownable {

    /**
     * @dev Sets up token parameters and mints initial liquidity limits to deployer.
     * Passes msg.sender directly to OpenZeppelin v5 Ownable initialization handlers.
     */
    constructor(
        string memory name, 
        string memory symbol, 
        uint256 initialSupply
    ) ERC20(name, symbol) Ownable(msg.sender) {
        // Mint target base amounts directly into platform owner deployment wallet
        _mint(msg.sender, initialSupply * (10 ** decimals()));
    }

    /**
     * @notice Admin parameter to mint additional platform tokens if needed for user air-drops.
     * @param to Destination wallet address receiving utility tokens.
     * @param amount Quantitative token unit parameters to generate (scaled for decimals).
     */
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}