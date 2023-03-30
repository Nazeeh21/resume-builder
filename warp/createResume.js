import { warp, configureWallet } from "./configureWarpServer.js";
import { transactionId } from "../transactionId.js";
import { v4 as uuid } from "uuid";

async function createResume() {
  const wallet = await configureWallet();
  const contract = warp.contract(transactionId).connect(wallet);

  await contract.writeInteraction({
    function: "createResume",
    resume: {
      id: uuid(),
      name: "Miral",
      address: "katargam",
      city: "Surat",
      state: "GJ",
      zip: "395004",
    },
  });
}

createResume();
