"use client"

import { generateMnemonic } from 'bip39';
import {
    Dialog,
    DialogTrigger,
    DialogHeader,
    DialogContent
} from "@/components/ui/dialog";
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface WalletModalProps {
    children: React.ReactNode;
}

import { WalletForm } from './wallet-form';


export const WalletModal = ({ children }: WalletModalProps) => {




    

    return (
        <>
            <Dialog>
                <DialogTrigger>
                    {children}
                </DialogTrigger>

                <DialogContent className=" text-black flex  flex-col h-96 items-center ">

                <WalletForm />

                   
                </DialogContent>
            </Dialog>
        </>
    );
};
