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

interface MnemonicsModalProps {
    children: React.ReactNode;
}

function convertMnemonicsToArray(mnemonics: string): string[] {
    if (typeof mnemonics !== 'string') {
        throw new Error('Mnemonics should be a string');
    }
    return mnemonics.split(' ');
}

const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        console.log('Text copied to clipboard');
      })
      .catch(err => {
        console.error('Could not copy text: ', err);
      });
  };


  const words = generateMnemonic();
  
  export const wordsPush = () =>{
    return words;
  }





export const MnemonicsModal = ({ children }: MnemonicsModalProps) => {
    const [mnemonicsArray, setMnemonicsArray] = useState<string[]>([]);
    const [isCopied, setIsCopied] = useState(false);


    const handleOpenDialog = () => {
        const mnemonics = convertMnemonicsToArray(words);
        setMnemonicsArray(mnemonics);
        setIsCopied(false)

    };

    const handleCopy = () =>{
        copyToClipboard(words);
        setIsCopied(true)
    }

    return (
        <>
            <Dialog>
                <DialogTrigger onClick={handleOpenDialog}>
                    {children}
                </DialogTrigger>

                <DialogContent className=" text-black flex  flex-col h-96 items-center ">
                    <h2 className="text-lg font-semibold">Generated Mnemonics</h2>
                    <div className="grid grid-cols-4 grid-rows-3 gap-4 mt-4">
                        {mnemonicsArray.map((word, index) => (
                            <div key={index} className="bg-gray-100 p-2 rounded text-center">
                                {word}
                            </div>
                        ))}
                    </div>

                    

                    <Button className='my-8' onClick={handleCopy}>
                        {
                            isCopied ? 'Copied' : 'Copied to Clipboard'
                        }
                        </Button>
                

                   
                </DialogContent>
            </Dialog>
        </>
    );
};
