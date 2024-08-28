
"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Wallet {
  WalletName: string;
  type: string;
  PublicKey: string;
  PrivateKey: string;
}

interface WalletContextType {
  walletArray: Wallet[];
  addWallet: (wallet: Wallet) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [walletArray, setWalletArray] = useState<Wallet[]>([]);


  useEffect(() => {
    const storedWallets = localStorage.getItem('walletArray');
    if (storedWallets) {
      console.log("Loaded wallets from localStorage:", JSON.parse(storedWallets));
      setWalletArray(JSON.parse(storedWallets));
    }
  }, []);


  useEffect(() => {
    localStorage.setItem('walletArray', JSON.stringify(walletArray));
  }, [walletArray]);

  const addWallet = (wallet: Wallet) => {
    setWalletArray(prev => [...prev, wallet]);
  };

  return (
    <WalletContext.Provider value={{ walletArray, addWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
