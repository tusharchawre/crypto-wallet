import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <>
    
    <div className="bg-black overflow-hidden">

    <div className="">
      {/* Image */}
    </div>

    <div className="flex flex-col w-[100vw] justify-center items-center h-[100vh] text-slate-200">
      <h1 className="text-9xl">Crypto Wallet</h1>
      <p className="pb-7">Cohort 3.0 Project</p>
      <Link href="/wallets">
      <Button variant="outline" className="text-black">Continue</Button>
      </Link>
    </div>

    </div>
    </>
   
  )
}

