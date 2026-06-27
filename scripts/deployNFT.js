const hre = require("hardhat");

async function main() {
  console.log("🚀 Starting NFT Deployment...");

  const baseURI = "https://api.yourecosystem.com/metadata/";
  const NFT = await hre.ethers.getContractFactory("NFTContract");
  const nft = await NFT.deploy(baseURI);

  await nft.waitForDeployment();
  const nftAddress = await nft.getAddress();

  console.log(`✅ NFT deployed successfully at: ${nftAddress}`);
  return nftAddress;
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}

module.exports = main;