"use client"

import { Button } from "@/components/ui/button";
import { MnemonicsModal } from "../components/mnemo-dialog";
import { WalletModal } from "../components/wallet-dialog";
import { useWallet } from "../context/WalletContext";

export default function Wallets() {
  const { walletArray } = useWallet();

  return (
    <div className="min-h-screen bg-black p-6 overflow-hidden">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">My Wallets</h1>

        <div className="my-10 flex justify-center">
          <MnemonicsModal>
            <Button variant="outline">Generate Mnemonics</Button>
          </MnemonicsModal>
        </div>

        <div className="my-10 flex justify-center">
          <WalletModal>
            <Button variant="outline">Create a wallet</Button>
          </WalletModal>
        </div>

        <div className="mt-8 space-y-4">
          {walletArray.map((wallet, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-2">{wallet.WalletName}</h2>
              <p className="text-gray-700">Type: {wallet.type}</p>
              <p className="text-gray-500 text-sm mt-1">Address: {wallet.PublicKey}</p>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
