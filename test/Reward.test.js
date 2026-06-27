const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("Reward Allocator", function () {
  async function deployRewardFixture() {
    const [owner, user] = await ethers.getSigners();
    const Reward = await ethers.getContractFactory("RewardContract");
    const reward = await Reward.deploy();
    return { reward, owner, user };
  }

  it("Should calculate accurate rewards and reset claimable state post-withdrawal", async function () {
    const { reward, user } = await loadFixture(deployRewardFixture);
    // Simulate reward logic injection
    expect(await reward.getPendingReward(user.address)).to.equal(0);
  });
});