const hre = require("hardhat");
const deployToken = require("./deployToken");
const deployMatrix = require("./deployMatrix");
const deployNFT = require("./deployNFT");

async function main() {
  console.log("====================================");
  console.log("🏗️  STARTING FULL SYSTEM DEPLOYMENT");
  console.log("====================================\n");

  const [deployer] = await hre.ethers.getSigners();
  console.log(`Deploying contracts with account: ${deployer.address}\n`);

  // Run child deployments
  const tokenAddress = await deployToken();
  const matrixAddress = await deployMatrix();
  const nftAddress = await deployNFT();

  console.log("\n====================================");
  console.log("🎉 SYSTEM DEPLOYMENT COMPLETE SUMMARY");
  console.log("====================================");
  console.log(`🔹 Token Address:  ${tokenAddress}`);
  console.log(`🔹 Matrix Address: ${matrixAddress}`);
  console.log(`🔹 NFT Address:    ${nftAddress}`);
  console.log("====================================\n");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});