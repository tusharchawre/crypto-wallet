"use client"

import nacl from "tweetnacl";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import { mnemonicToSeedSync } from "bip39";
import { useWallet } from '../context/WalletContext'; // Import the context

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import bs58 from "bs58";

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { wordsPush } from "./mnemo-dialog";
import { useState } from "react";
import { ethers } from "ethers";

const formSchema = z.object({
  WalletName: z.string().min(2),
  type: z.string().max(3),
});

export const WalletForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      WalletName: "Wallet1",
      type: ""
    },
  });

  const { addWallet } = useWallet(); // Use the context here
  const [currentIndex, setCurrentIndex] = useState(0);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const seed = mnemonicToSeedSync(wordsPush());

    
    function configureType() {
      if (values.type === "BTC") return "0'";
      if (values.type === "ETH") return "60'";
      if (values.type === "SOL") return "501'";
      return ""; // Default case
    }

    if(configureType() == "501'"){

    const path = `m/44'/501'/${currentIndex}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    setCurrentIndex(currentIndex + 1);
    const keyPair = Keypair.fromSecretKey(secret)
    addWallet({
      WalletName: values.WalletName,
      type: values.type,
      PublicKey: keyPair.publicKey.toBase58(),
      PrivateKey: bs58.encode(secret)
    });

    }

    else {
      const path = `m/44'/60'/${currentIndex}'/0'`;
      const derivedSeed = derivePath(path, seed.toString("hex")).key;

      const privateKey = Buffer.from(derivedSeed).toString("hex");
      let privateKeyEncoded : string = privateKey;

        const wallet = new ethers.Wallet(privateKey);
        let publicKeyEncoded : string = wallet.address;

        addWallet({
          WalletName: values.WalletName,
          type: values.type,
          PublicKey: publicKeyEncoded,
          PrivateKey: privateKeyEncoded
        });

    }



  }

  return (
    <>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="WalletName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>WalletName</FormLabel>
              <FormControl>
                <Input placeholder="WalletName" {...field} />
              </FormControl>
              <FormDescription>
                This is your wallet name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the crypto currency." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="BTC">BTC</SelectItem>
                  <SelectItem value="SOL">SOL</SelectItem>
                  <SelectItem value="ETH">ETH</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>



    </>
  );
};
