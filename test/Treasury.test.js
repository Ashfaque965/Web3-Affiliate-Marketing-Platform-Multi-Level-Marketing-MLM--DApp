const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("Treasury Multi-sig and Asset Allocation", function () {
  async function deployTreasuryFixture() {
    const [owner, manager, recipient] = await ethers.getSigners();
    const Treasury = await ethers.getContractFactory("TreasuryContract");
    const treasury = await Treasury.deploy([owner.address, manager.address]);
    return { treasury, owner, manager, recipient };
  }

  it("Should accept direct protocol input transfers", async function () {
    const { treasury, owner } = await loadFixture(deployTreasuryFixture);
    await owner.sendTransaction({ to: await treasury.getAddress(), value: ethers.parseEther("5.0") });
    
    const balance = await ethers.provider.getBalance(await treasury.getAddress());
    expect(balance).to.equal(ethers.parseEther("5.0"));
  });
});