const hre = require("hardhat");

async function main() {
  console.log("🚀 Starting Token Deployment...");

  const Token = await hre.ethers.getContractFactory("TokenContract");
  const token = await Token.deploy();

  await token.waitForDeployment();
  const tokenAddress = await token.getAddress();

  console.log(`✅ Token deployed successfully at: ${tokenAddress}`);
  return tokenAddress;
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}

module.exports = main;