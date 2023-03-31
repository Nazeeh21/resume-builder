import { ArweaveWebWallet } from "arweave-wallet-connector";
import { useEffect, useState } from "react";
export const Navbar = () => {
  const [address, setAddress] = useState("");
  async function handleConnect() {
    const wallet = new ArweaveWebWallet({
      name: "PermaCV",
    });

    wallet.setUrl("arweave.app");
    await wallet.connect();
    setAddress(wallet.address);
  }

  useEffect(() => {
    console.log("wallet: ", window.arweaveWallet);
  }, []);

  return (
    <div className="w-full py-4 px-20 shadow-lg flex justify-between items-center">
      <h1 className="text-black font-bold text-2xl">PermaCV</h1>
      <button
        onClick={handleConnect}
        className="px-3 py-1 border-[3px] border-blue-400 rounded-md text-black"
      >
        {address ? `Connected` : "Connect wallet"}
      </button>
    </div>
  );
};
