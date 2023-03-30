import { warp, configureWallet } from "./configureWarpServer.js";
import { transactionId } from "../transactionId.js";

async function read() {
  const wallet = await configureWallet();
  const contract = warp.contract(transactionId).connect(wallet);
  const { cachedValue } = await contract.readState();
  console.log("Contract State:", JSON.stringify(cachedValue));
}
read();
