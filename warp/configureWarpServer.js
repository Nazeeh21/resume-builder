import { WarpFactory } from "warp-contracts";
import fs from "fs";
import { DeployPlugin } from "warp-contracts-plugin-deploy";

const environment = process.env.NEXT_PUBLIC_WARPENV || "testnet";

let warp;

if (environment === "testnet") {
  warp = WarpFactory.forTestnet().use(new DeployPlugin());
} else {
  warp = WarpFactory.forMainnet().use(new DeployPlugin());
}

async function configureWallet() {
  try {
    if (environment === "testnet") {
      try {
        return JSON.parse(fs.readFileSync("./testwallet.json", "utf-8"));
      } catch (e) {
        const { jwk } = await warp.generateWallet();
        fs.writeFileSync("./testwallet.json", JSON.stringify(jwk));
        return jwk;
      }
    } else {
      return JSON.parse(fs.readFileSync("../wallet.json", "utf-8"));
    }
  } catch (e) {
    console.log("Error configuring wallet", e);
  }
}

export { configureWallet, warp };
