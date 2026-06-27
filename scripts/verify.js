const hre = require("hardhat");

async function verifyContract(contractAddress, args = []) {
  console.log(`🔍 Verifying contract at ${contractAddress}...`);
  try {
    await hre.run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
    console.log("🟢 Verification Successful!");
  } catch (error) {
    if (error.message.toLowerCase().includes("already verified")) {
      console.log("🟡 Contract is already verified.");
    } else {
      console.error("🔴 Verification failed:", error);
    }
  }
}

async function main() {
  // Replace these values with your actual deployed addresses post-deployment
  const TOKEN_ADDRESS = "0x...";
  const NFT_ADDRESS = "0x...";
  const BASE_URI = "https://api.yourecosystem.com/metadata/";

  await verifyContract(TOKEN_ADDRESS, []);
  await verifyContract(NFT_ADDRESS, [BASE_URI]);
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}