const hre = require("hardhat");

async function main() {
  console.log("🚀 Starting Matrix Core Deployment...");

  // 1. Deploy required libraries first
  const MatrixLib = await hre.ethers.getContractFactory("MatrixLib");
  const matrixLib = await MatrixLib.deploy();
  await matrixLib.waitForDeployment();
  const libAddress = await matrixLib.getAddress();
  console.log(`📦 MatrixLib deployed at: ${libAddress}`);

  // 2. Link library to the Matrix Contract Factory
  const Matrix = await hre.ethers.getContractFactory("MatrixContract", {
    libraries: {
      MatrixLib: libAddress,
    },
  });

  // Example parameters: initialization requirements
  const matrix = await Matrix.deploy();
  await matrix.waitForDeployment();
  const matrixAddress = await matrix.getAddress();

  console.log(`✅ Matrix Core deployed successfully at: ${matrixAddress}`);
  return matrixAddress;
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}

module.exports = main;