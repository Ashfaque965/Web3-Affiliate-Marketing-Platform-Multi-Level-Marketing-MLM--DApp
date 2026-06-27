const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("Referral Tree Mechanics", function () {
  async function deployReferralFixture() {
    const [owner, line1, line2] = await ethers.getSigners();
    const Referral = await ethers.getContractFactory("ReferralContract");
    const referral = await Referral.deploy();
    return { referral, owner, line1, line2 };
  }

  it("Should accurately track multi-generational uplines", async function () {
    const { referral, owner, line1, line2 } = await loadFixture(deployReferralFixture);
    
    await referral.connect(line1).recordReferral(line1.address, owner.address);
    await referral.connect(line2).recordReferral(line2.address, line1.address);

    expect(await referral.getReferrer(line2.address)).to.equal(line1.address);
    expect(await referral.getReferrer(line1.address)).to.equal(owner.address);
  });
});