"use client"

import { Button } from "@/components/ui/button";
import { MnemonicsModal } from "../components/mnemo-dialog";
import { WalletModal } from "../components/wallet-dialog";
import { useWallet } from "../context/WalletContext";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

export default function Wallets() {
  const { walletArray } = useWallet();
  
  const [inputValue, setInputValue] = useState('');


  const handleSearch = async (event: React.KeyboardEvent<HTMLInputElement>) =>{
    if (event.key === 'Enter') {
      try {
        const response = await fetch('/api/example', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ input: inputValue }),
        });

        const data = await response.json();
        console.log(data.message);

        setInputValue('');
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }

  return (
    <div className="min-h-screen bg-black p-6 overflow-hidden">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">My Wallets</h1>

        <div className="flex  gap-10 justify-around items-center">
          <div className="my-10  w-full" >
          <Input 
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)} onKeyUp={handleSearch} className="bg-black text-white border-slate-700 " placeholder="Search a wallet" />
          </div>

  

        <div className="my-10 ">
          <MnemonicsModal>
            <Button variant="outline">Generate Mnemonics</Button>
          </MnemonicsModal>
        </div>

        <div className="my-10 ">
          <WalletModal>
            <Button variant="outline">Create a wallet</Button>
          </WalletModal>
        </div>

        </div>

        <div className=" flex gap-10 w-[100vw] flex-wrap">
          {walletArray.map((wallet, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-lg w-300px h-fit  text-pretty	">
              <h2 className="text-xl font-semibold mb-2">{wallet.WalletName}</h2>
              <p className="text-gray-700">Type: {wallet.type}</p>
              <p className="text-gray-500 text-sm mt-2"><span className="font-bold">Public Key:</span> {wallet.PublicKey}</p>
              <p className="text-gray-500 text-sm mt-2 break-all"><span className="font-bold">Private Key:</span>  {".".repeat(wallet.PrivateKey.length)}</p>

              <Button className="mt-5">Show Details</Button>

              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
