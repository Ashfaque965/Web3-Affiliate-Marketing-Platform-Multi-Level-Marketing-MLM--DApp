const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("MatrixMLM Core Logic", function () {
  async function deployMatrixFixture() {
    const [owner, user1, user2, user3] = await ethers.getSigners();
    const Matrix = await ethers.getContractFactory("MatrixContract");
    const matrix = await Matrix.deploy();
    return { matrix, owner, user1, user2, user3 };
  }

  it("Should register a user with a valid referrer", async function () {
    const { matrix, owner, user1 } = await loadFixture(deployMatrixFixture);
    await matrix.connect(user1).register(owner.address);
    expect(await matrix.isUserExists(user1.address)).to.be.true;
  });

  it("Should fail registration if user already exists", async function () {
    const { matrix, owner, user1 } = await loadFixture(deployMatrixFixture);
    await matrix.connect(user1).register(owner.address);
    await expect(matrix.connect(user1).register(owner.address)).to.be.revertedWith("User already registered");
  });
});