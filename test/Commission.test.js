const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("Commission Distribution Math", function () {
  async function deployCommissionFixture() {
    const [owner, receiver] = await ethers.getSigners();
    const Commission = await ethers.getContractFactory("CommissionContract");
    const commission = await Commission.deploy();
    return { commission, owner, receiver };
  }

  it("Should disperse correct percentage to specified generations", async function () {
    const { commission, receiver } = await loadFixture(deployCommissionFixture);
    const amount = ethers.parseEther("1.0");

    // Assuming level 1 pays out 10% commission
    await expect(commission.payCommission(receiver.address, amount, 1, { value: amount }))
      .to.emit(commission, "CommissionPaid")
      .withArgs(receiver.address, amount / 10n);
  });
});