const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("System Security Integrity Tests", function () {
  async function deploySecurityFixture() {
    const [owner, attacker] = await ethers.getSigners();
    const Matrix = await ethers.getContractFactory("MatrixContract");
    const matrix = await Matrix.deploy();
    
    // Malicious target contract framework
    const ExploitFactory = await ethers.getContractFactory("ReentrancyAttacker");
    const attackerContract = await ExploitFactory.deploy(await matrix.getAddress());
    
    return { matrix, attackerContract, owner, attacker };
  }

  it("Should intercept and deny cascading reentrancy attack executions", async function () {
    const { attackerContract } = await loadFixture(deploySecurityFixture);
    await expect(attackerContract.attack({ value: ethers.parseEther("1") })).to.be.reverted;
  });

  it("Should prevent unauthorized non-owner interaction sweeps on admin variables", async function () {
    const { matrix, attacker } = await loadFixture(deploySecurityFixture);
    await expect(matrix.connect(attacker).pauseProtocol()).to.be.revertedWithCustomError(matrix, "OwnableUnauthorizedAccount");
  });
});