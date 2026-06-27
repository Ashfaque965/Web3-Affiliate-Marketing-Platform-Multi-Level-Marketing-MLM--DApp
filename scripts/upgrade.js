const hre = require("hardhat");
const { upgrades } = require("hardhat");

async function main() {
  // The address of your existing deployed Proxy contract
  const PROXY_ADDRESS = "0xYourExistingProxyAddressHere";

  console.log(`🔄 Preparing to upgrade Proxy at: ${PROXY_ADDRESS}`);

  // Fetch the new V2 logic implementation contract factory
  const MatrixV2 = await hre.ethers.getContractFactory("MatrixContractV2");
  
  console.log("Upgrading contract implementation...");
  const upgraded = await upgrades.upgradeProxy(PROXY_ADDRESS, MatrixV2);
  
  await upgraded.waitForDeployment();
  
  console.log(`✅ Contract upgraded successfully.`);
  console.log(`Implementation updated behind proxy at: ${PROXY_ADDRESS}`);
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}