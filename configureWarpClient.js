import { WarpFactory } from "warp-contracts";
import { transactionId } from "./transactionId";
import wallet from "./warp/testwallet.json";

/*
 *  environment can be 'local' | 'testnet' | 'mainnet' | 'custom';
 */

const environment = process.env.NEXT_PUBLIC_WARPENV || "testnet";
let warp;
let contract;

async function getContract() {
  if (environment == "testnet") {
    warp = WarpFactory.forTestnet();
    contract = warp.contract(transactionId).connect(wallet);
  } else if (environment === "mainnet") {
    warp = WarpFactory.forMainnet();
    contract = warp.contract(transactionId).connect();
  } else {
    throw new Error("Environment configured improperly...");
  }
  return contract;
}

export { getContract };
