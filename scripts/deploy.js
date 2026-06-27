const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("====================================================");
  console.log("🚀 Initializing Matrix Smart Contract Infrastructure...");
  console.log("====================================================");

  // 1. Recover standard signer keys from provider execution contexts
  const [deployer] = await hre.ethers.getSigners();
  console.log(`📡 Deploying contracts using account node: ${deployer.address}`);
  
  const initialBalance = await hre.ethers.provider.getBalance(deployer.address);
  console.log(`💰 Deployer Starting Balance: ${hre.ethers.formatEther(initialBalance)} ETH`);

  // --- STEP 1: DEPLOY LINKTUM UTILITY TOKEN ---
  console.log("\n📦 Compiling and deploying LinkTumToken ERC-20...");
  const TokenFactory = await hre.ethers.getContractFactory("LinkTumToken");
  
  // Arguments: Token Name, Token Symbol, Initial Mint Allocation Unit Supply
  const initialSupply = 100000000; // 100 Million Tokens
  const tokenContract = await TokenFactory.deploy("LinkTum Token", "LINKTUM", initialSupply);
  await tokenContract.waitForDeployment();
  
  const tokenAddress = await tokenContract.getAddress();
  console.log(`✅ LinkTumToken successfully anchored at: ${tokenAddress}`);

  // --- STEP 2: DEPLOY MAIN MATRIX ENGINE CONTRACT ---
  console.log("\n📦 Compiling and deploying core LinkTumMatrix engine...");
  const MatrixFactory = await hre.ethers.getContractFactory("LinkTumMatrix");
  
  // Setting base enrollment configuration registration fee value (10 LINKTUM with 18 Decimals)
  const baseRegPrice = hre.ethers.parseUnits("10", 18);
  const matrixContract = await MatrixFactory.deploy(tokenAddress, baseRegPrice);
  await matrixContract.waitForDeployment();

  const matrixAddress = await matrixContract.getAddress();
  console.log(`✅ LinkTumMatrix successfully anchored at: ${matrixAddress}`);

  // --- STEP 3: LOG DEPLOYMENT SUMMARY AND SAVE ARTIFACT ADDRESSES ---
  console.log("\n====================================================");
  console.log("🎉 SUCCESS: Deployment Cycle Complete!");
  console.log(`🔗 Token Address:  ${tokenAddress}`);
  console.log(`🔗 Matrix Address: ${matrixAddress}`);
  console.log("====================================================");

  // 4. Save deployed configuration JSON details right back to frontend paths automatically
  const targetConfigDirectory = path.join(__dirname, "../config");
  
  if (!fs.existsSync(targetConfigDirectory)){
      fs.mkdirSync(targetConfigDirectory, { recursive: true });
  }

  const deploymentMetadata = {
    networkChainId: hre.network.config.chainId || 31337,
    networkName: hre.network.name,
    tokenAddress: tokenAddress,
    matrixAddress: matrixAddress,
    updatedAt: new Date().toISOString()
  };

  fs.writeFileSync(
    path.join(targetConfigDirectory, "contractAddresses.json"),
    JSON.stringify(deploymentMetadata, null, 2)
  );
  
  console.log("💾 Frontend environment synchronization file saved to: /config/contractAddresses.json");
}

// Execute core pipeline loop catches to match node process management expectations
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Fatal deployment crash detected:");
    console.error(error);
    process.exit(1);
  });