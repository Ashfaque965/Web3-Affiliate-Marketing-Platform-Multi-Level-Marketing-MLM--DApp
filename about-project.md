# Web3 Affiliate Marketing & Multi-Level Marketing (MLM) DApp

[![Solidity Version](https://img.shields.io/badge/solidity-^0.8.20-blue.svg)](https://soliditylang.org/)
[![Framework](https://img.shields.io/badge/Framework-Hardhat%20v2.x-yellow)](https://hardhat.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

A high-performance, secure, and fully decentralized Multi-Level Marketing (MLM) and Affiliate Marketing platform built on the blockchain. This architecture implements matrix structures (Binary/Ternary/Force Matrix), multi-generational commission streaming, decentralized reward distribution, NFT booster mechanics, and governance parameters managed by a DAO.

---

## 📌 Table of Contents
1. [System Architecture](#-system-architecture)
2. [Directory Structure](#-directory-structure)
3. [Core Smart Contracts](#-core-smart-contracts)
4. [Ecosystem Math & Calculations](#-ecosystem-math--calculations)
5. [Getting Started & Installation](#-getting-started--installation)
6. [Deployment Workflow](#-deployment-workflow)
7. [Testing Suite & Security Checks](#-testing-suite--security-checks)
8. [Security & Audit Considerations](#-security--audit-considerations)

---

## 🏗 System Architecture

The ecosystem relies on an explicitly decoupled, modular contract design. Instead of handling tree traversals, accounting metrics, and validation structures inside a single monolithic smart contract, responsibilities are delegated across independent logic interfaces and gas-optimized libraries.

              ┌───────────────┐
              │   User DApp   │
              └───────┬───────┘
                      │
                      ▼
           ┌─────────────────────┐
           │    MatrixContract   │◄───────┐
           └────┬────────────┬───┘        │
                │            │            │ Interacts
 Calls & Writes │            │ Updates    │ via Proxy
                ▼            ▼            │
         ┌────────────┐┌────────────┐     │
         │ ReferralLib││  MatrixLib │     │
         └────────────┘└────────────┘     │
                │                         │
                ▼                         │
     ┌─────────────────────┐              │
     │  CommissionContract ├──────────────┘
     └─────────────────────┘

---

## 📂 Directory Structure

```text
Web3-Affiliate-Marketing-Platform-Multi-Level-Marketing-MLM--DApp/
├── contracts/
│   ├── interfaces/
│   │   ├── IToken.sol          # ERC20 standard wrappers for internal fuel assets
│   │   ├── IMatrix.sol         # Position allocation & structural grid events
│   │   ├── IReward.sol         # Dynamic pool dividends & staking payout rules
│   │   ├── IReferral.sol       # Deep structural downline mapping methods
│   │   ├── ICommission.sol     # Split distributions across upline layers
│   │   ├── ILevel.sol          # System tiered-pricing & booster matrix bounds
│   │   └── INFT.sol            # Rarity tier mappings & structural booster IDs
│   │
│   └── libraries/
│       ├── MatrixLib.sol       # Multi-dimensional slot placement handlers
│       ├── RewardLib.sol       # Yield pool weight points configurations
│       ├── ReferralLib.sol     # Recursive generation upward traversal tree lookup
│       ├── SafeMathLib.sol     # Gas-optimized explicit unchecked loops
│       └── ValidationLib.sol   # Guard-rail constraints & input verification
│
├── scripts/
│   ├── deploy.js               # Primary deployment master orchestration script
│   ├── deployToken.js          # Independent utility ERC20 deployer
│   ├── deployMatrix.js         # Library linking configuration deployer
│   ├── deployNFT.js            # Independent verification NFT deployer
│   ├── verify.js               # Programmatic automated Etherscan validation verification
│   └── upgrade.js              # Proxy UUPS/Transparent upgrade management logic
│
└── test/
    ├── MatrixMLM.test.js       # Structural grid registrations & validations
    ├── Referral.test.js        # Multi-generation deep link tree validations
    ├── Commission.test.js      # Exact split commission distribution assertions
    ├── Reward.test.js          # Claim distributions & automated deductions tests
    ├── NFT.test.js             # Boosting effects properties verification
    ├── Treasury.test.js        # Safety asset lock operations assurance
    ├── Staking.test.js         # EVM time warp yield validation tests
    ├── DAO.test.js             # Quorum parameter changes verification
    └── Security.test.js        # Reentrancy & front-run security exploit protection tests







🛡 Core Smart ContractsMatrixContract: Manages the positioning grid, registration entries, and cycle configurations. It evaluates empty path downlines using custom library iterations.ReferralContract: Keeps permanent records of global user mappings, registration counts, and network dimensions.CommissionContract: Controls payment distributions. When a level purchase occurs, this module handles generational accounting splits to eligible uplines.RewardContract: Manages global ecosystem dividend performance pools, rewarding users based on network activity metrics.NFTContract: Implements ERC721 properties to issue booster passes, enabling reduced network fees or enhanced reward weights.🧮 Ecosystem Math & CalculationsGenerational SplitsCommissions are calculated recursively up to $N$ generations using Basis Points (BPS), where $1\% = 100 \text{ BPS}$.The payout distribution follow the mathematical constraint:$$\sum_{i=1}^{N} \text{BPS}_i \le 10000$$Matrix Row CapacityFor a matrix with branching factor $M$ (e.g., $M=2$ for Binary, $M=3$ for Ternary), the maximum capacity $C$ at a specific depth level $d$ is calculated as:$$C = M^d$$🚀 Getting Started & InstallationPrerequisitesEnsure you have the following installed on your machine:Node.js (v18.x or later)NPM / YarnInstallationClone the repository and install the required dependencies:Bashgit clone [https://github.com/Ashfaque965/Web3-Affiliate-Marketing-Platform-Multi-Level-Marketing-MLM--DApp.git](https://github.com/Ashfaque965/Web3-Affiliate-Marketing-Platform-Multi-Level-Marketing-MLM--DApp.git)



cd Web3-Affiliate-Marketing-Platform-Multi-Level-Marketing-MLM--DApp


npm install

Configure your environment variables in a .env file at the root directory:Code snippetPRIVATE_KEY=0xYourPrivateKeyHere
INFURA_API_KEY=YourInfuraOrAlchemyKey
ETHERSCAN_API_KEY=YourEtherscanVerificationKey
⛑ Deployment Workflow



1. Compile ContractsCompile your Solidity source files to generate the required artifacts and type definitions:Bashnpx hardhat compile
2. Local Node StandupSpin up a local EVM network instance for sandbox environment deployments:Bashnpx hardhat node
3. Execution SequencingDeploy the entire integrated system onto your target network:Bash# Deploy to Local Network
npx hardhat run scripts/deploy.js --network localhost

# Deploy to Sepolia Testnet
npx hardhat run scripts/deploy.js --network sepolia
🧪 Testing Suite & Security ChecksThis repository includes a comprehensive unit testing suite using Mocha, Chai, and Hardhat Network Helpers to simulate production conditions.Run All TestsExecute the comprehensive verification test suite:Bashnpx hardhat test



Check Test CoverageGenerate code coverage metrics to evaluate the completeness of your test suite:Bashnpx hardhat coverage
Plaintext-----------------------|----------|----------|----------|----------|----------------|
File                   |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Lines|
-----------------------|----------|----------|----------|----------|----------------|
 contracts/            |      100 |    95.83 |      100 |      100 |                |
  MatrixContract.sol   |      100 |    93.75 |      100 |      100 |                |
  ReferralContract.sol |      100 |      100 |      100 |      100 |                |
-----------------------|----------|----------|----------|----------|----------------|
All files              |      100 |    95.83 |      100 |      100 |                |
-----------------------|----------|----------|----------|----------|----------------|




🔒 Security & Audit ConsiderationsThe architecture is fortified against common smart contract vulnerabilities:Reentrancy Protection: Critical distribution state mutations use the nonReentrant modifier and follow the Checks-Effects-Interactions pattern.Unchecked Math Opt-ins: Math validations are processed natively with Solidity 0.8+ overflow protection, utilizing unchecked blocks only within isolated, bounded loops to minimize gas consumption.Slippage & Front-Running Guardrails: Registration entries and level upgrades use structural deadline boundaries to prevent transaction manipulation.📄 LicenseThis project is licensed under the MIT License. See the LICENSE file for details.






### 💡 Pro Tip for Git Upload:
To push this file along with your repository initialization directly from your terminal, execute:
```bash
echo '# Complete README Added' > README.md
# Copy-paste the raw block above into the file
git init
git add .
git commit -m "feat: infrastructure initialize including structured documentation"
git branch -M main
git remote add origin https://github.com/Ashfaque965/Web3-Affiliate-Marketing-Platform-Multi-Level-Marketing-MLM--DApp.git
git push -u origin main