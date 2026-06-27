import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseUnits, formatUnits } from "viem";

// Fallback constant configuration markers
const MATRIX_ADDRESS = process.env.NEXT_PUBLIC_LINKTUM_MATRIX_CONTRACT || "0x0";
const TOKEN_ADDRESS = process.env.NEXT_PUBLIC_LINKTUM_TOKEN_CONTRACT || "0x0";
const TOKEN_DECIMALS = Number(process.env.NEXT_PUBLIC_TOKEN_DECIMALS || 18);

// Minimal hardcoded ABI array segments to handle core contract structural layouts
const CORE_MATRIX_ABI = [
  { name: "users", type: "function", stateMutability: "view", inputs: [{ name: "", type: "address" }], outputs: [{ name: "id", type: "uint256" }, { name: "referrer", type: "address" }, { name: "partnersCount", type: "uint256" }] },
  { name: "getUserMatrixState", type: "function", stateMutability: "view", inputs: [{ name: "userAddress", type: "address" }, { name: "program", type: "uint8" }, { name: "level", type: "uint256" }], outputs: [{ name: "active", type: "bool" }, { name: "filledSlots", type: "uint256" }] },
  { name: "registrationExt", type: "function", stateMutability: "payable", inputs: [{ name: "referrerAddress", type: "address" }], outputs: [] },
  { name: "buyNewLevel", type: "function", stateMutability: "payable", inputs: [{ name: "program", type: "uint8" }, { name: "level", type: "uint256" }], outputs: [] }
];

const CORE_TOKEN_ABI = [
  { name: "balanceOf", type: "function", stateMutability: "view", inputs: [{ name: "account", type: "address" }], outputs: [{ name: "", type: "uint256" }] },
  { name: "allowance", type: "function", stateMutability: "view", inputs: [{ name: "owner", type: "address" }, { name: "spender", type: "address" }], outputs: [{ name: "", type: "uint256" }] },
  { name: "approve", type: "function", stateMutability: "nonpayable", inputs: [{ name: "spender", type: "address" }, { name: "amount", type: "uint256" }], outputs: [{ name: "", type: "bool" }] }
];

// ================= HOOK 1: FETCH ERC20 TOKEN METRICS =================
export function useTokenData() {
  const { address } = useAccount();

  const { data: balanceRaw, refetch: refetchBalance } = useReadContract({
    address: TOKEN_ADDRESS,
    abi: CORE_TOKEN_ABI,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: { enabled: !!address }
  });

  const { data: allowanceRaw, refetch: refetchAllowance } = useReadContract({
    address: TOKEN_ADDRESS,
    abi: CORE_TOKEN_ABI,
    functionName: "allowance",
    args: address ? [address, MATRIX_ADDRESS] : undefined,
    query: { enabled: !!address }
  });

  return {
    balance: balanceRaw ? formatUnits(balanceRaw, TOKEN_DECIMALS) : "0",
    allowance: allowanceRaw ? formatUnits(allowanceRaw, TOKEN_DECIMALS) : "0",
    refreshTokens: () => {
      refetchBalance();
      refetchAllowance();
    }
  };
}

// ================= HOOK 2: FETCH USER ACCOUNT STATUS =================
export function useUserData(targetAddress) {
  const { address: connectedAddress } = useAccount();
  const lookupUser = targetAddress || connectedAddress;

  const { data: userProfile, isLoading, refetch } = useReadContract({
    address: MATRIX_ADDRESS,
    abi: CORE_MATRIX_ABI,
    functionName: "users",
    args: lookupUser ? [lookupUser] : undefined,
    query: { enabled: !!lookupUser }
  });

  const userId = userProfile ? userProfile[0].toString() : null;
  const isRegistered = userId && userId !== "0";

  return {
    userId,
    referrer: userProfile ? userProfile[1] : null,
    partnersCount: userProfile ? userProfile[2].toString() : "0",
    isRegistered,
    isLoading,
    refreshUser: refetch
  };
}

// ================= HOOK 3: FETCH ADVANCED MATRIX TREE PROGRESS =================
export function useMatrixData(programName, level) {
  const { address } = useAccount();
  const programId = programName?.toLowerCase() === "xxx" ? 2 : 1; // 1 = x4, 2 = xXx

  const { data: matrixState, refetch } = useReadContract({
    address: MATRIX_ADDRESS,
    abi: CORE_MATRIX_ABI,
    functionName: "getUserMatrixState",
    args: address ? [address, programId, BigInt(level || 1)] : undefined,
    query: { enabled: !!address }
  });

  return {
    isActive: matrixState ? matrixState[0] : false,
    filledSlots: matrixState ? Number(matrixState[1]) : 0,
    refreshMatrix: refetch
  };
}

// ================= HOOK 4: TRANSACTION EXECUTION OPERATIONS =================
export function useMatrixActions() {
  const { writeContractAsync, data: txHash } = useWriteContract();
  
  const { isLoading: isTxPending } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  // Action A: Approve ERC20 Token Allowances
  const approveToken = async (amountString) => {
    const parsedAmount = parseUnits(amountString, TOKEN_DECIMALS);
    return await writeContractAsync({
      address: TOKEN_ADDRESS,
      abi: CORE_TOKEN_ABI,
      functionName: "approve",
      args: [MATRIX_ADDRESS, parsedAmount],
    });
  };

  // Action B: Onboard New User Account Registration
  const registerUser = async (referrerWallet) => {
    return await writeContractAsync({
      address: MATRIX_ADDRESS,
      abi: CORE_MATRIX_ABI,
      functionName: "registrationExt",
      args: [referrerWallet],
    });
  };

  // Action C: Buy/Upgrade Matrix Level Tiers
  const purchaseLevel = async (programName, level, costString) => {
    const programId = programName.toLowerCase() === "xxx" ? 2 : 1;
    return await writeContractAsync({
      address: MATRIX_ADDRESS,
      abi: CORE_MATRIX_ABI,
      functionName: "buyNewLevel",
      args: [programId, BigInt(level)],
    });
  };

  return {
    approveToken,
    registerUser,
    purchaseLevel,
    isTxPending
  };
}