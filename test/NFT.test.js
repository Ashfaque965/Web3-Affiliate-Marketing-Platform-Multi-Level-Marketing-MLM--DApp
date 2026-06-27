const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("NFT Boosters & Perks", function () {
  async function deployNFTFixture() {
    const [owner, user] = await ethers.getSigners();
    const NFT = await ethers.getContractFactory("NFTContract");
    const nft = await NFT.deploy("https://api.test/");
    return { nft, owner, user };
  }

  it("Should assign correct metadata and rarity levels upon minting", async function () {
    const { nft, user } = await loadFixture(deployNFTFixture);
    const rarityLevel = 2; // Elite / Gold Booster
    
    await nft.mintNFT(user.address, rarityLevel);
    expect(await nft.ownerOf(1)).to.equal(user.address);
    expect(await nft.getNFTRarity(1)).to.equal(rarityLevel);
  });
});