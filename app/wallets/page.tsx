"use client"
import { Button } from "@/components/ui/button";
import { useState } from "react";



const walletsData = [
    {
      id: 1,
      name: 'Wallet 1',
      balance: '2.5 ETH',
      address: '0x123...abc',
    },
    {
      id: 2,
      name: 'Wallet 2',
      balance: '1.2 BTC',
      address: '0x456...def',
    },
    {
      id: 3,
      name: 'Wallet 3',
      balance: '1000 USDT',
      address: '0x789...ghi',
    },
    // Add more wallets here
  ];

export default function wallets(){
    const [wallets] = useState(walletsData);


    
  return (
    <div className="min-h-screen bg-black p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">My Wallets</h1>

        <Button>Generate Mnemonics</Button>



        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wallets.map((wallet) => (
            <div key={wallet.id} className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-2">{wallet.name}</h2>
              <p className="text-gray-700">Balance: {wallet.balance}</p>
              <p className="text-gray-500 text-sm mt-1">Address: {wallet.address}</p>
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