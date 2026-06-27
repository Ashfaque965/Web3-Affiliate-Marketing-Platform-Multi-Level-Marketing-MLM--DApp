import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { holesky, localhost } from "wagmi/chains";
import { http } from "viem";

// 1. Gather environmental configuration parameters with fallback protection chains
const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "YOUR_WALLET_CONNECT_PROJECT_ID_FALLBACK";
const platformAppName = process.env.NEXT_PUBLIC_APP_NAME || "LinkTum Matrix Platform";
const targetChainId = Number(process.env.NEXT_PUBLIC_CHAIN_ID || 17000);
const customRpcUrl = process.env.NEXT_PUBLIC_RPC_URL;

// 2. Isolate the target array configurations based on configured chain environment selectors
const activeChains = targetChainId === 31337 ? [localhost] : [holesky];

// 3. Define the custom transport layer mapping mechanisms
const customTransports = {
  [holesky.id]: customRpcUrl ? http(customRpcUrl) : http("https://ethereum-holesky-rpc.publicnode.com"),
  [localhost.id]: http("http://127.0.0.1:8545"),
};

// 4. Export standard boilerplate configuration parameters instance to index views
export const config = getDefaultConfig({
  appName: platformAppName,
  projectId: projectId,
  chains: activeChains,
  transports: customTransports,
  ssr: true, // Configures server-side hydration safety markers matching Next.js execution styles
});