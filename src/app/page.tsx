'use client'

import InputMessage from "@/components/InputMessage";
import LNB from "@/components/lnb/LNB";
import ChatList from "@/components/ChatList";
import Header from "@/components/Header";
import {useEffect} from "react";
import {useAccount} from "@/util/hooks/useAccount";
import {useRouter} from "next/navigation";
import {login} from "@/util/externals/wallet/wallet";
import Image from "next/image";

export default function Home() {
  const router = useRouter()
  const account = useAccount()

  const handleClickSignIn = async () => {
    login()
    .then(loginAccount => {
      account.setAccount(loginAccount)
      router.push('/home')
    })
  }

  return (
    <main className="w-full min-h-screen flex flex-row relative">
      <div className={'absolute top-[60px] left-[60px]'}>
        <div className="w-[131px] h-[32px] relative">
          <Image src={'/images/logos/logo.webp'} alt={'nupy'} fill sizes={'100vw'}/>
        </div>
      </div>
      <div className={"w-[662px] flex-none p-[60px] flex flex-col justify-center items-center bg-[url('/images/backgrounds/bg-paper.webp')] bg-repeat bg-cover"}>
        <div className="w-[500px] h-52 flex-col justify-start items-start gap-10 inline-flex">
          <div className="flex-col justify-center items-start gap-1 flex">
            <div className="text-black text-[56px] font-bold">Sign in</div>
            <div className="text-zinc-700 text-base font-medium">Create NFTs easily with NUPY!</div>
          </div>
          <button
            className="w-[300px] h-14 px-5 bg-black rounded--xl justify-center items-center gap-3 inline-flex"
            onClick={handleClickSignIn}
          >
            <div className="text-white text-base font-bold">Wallet Login</div>
          </button>
        </div>
      </div>
      <div className={"h-[100vh] grow flex justify-center items-center bg-[url('/images/backgrounds/tada-nupy.webp')] bg-no-repeat bg-cover"}>
        <Image src={'/images/backgrounds//tada-nupy.webp'} alt={'tada-nupy'} width={1} height={1} className={'opacity-0'}/>
      </div>
    </main>
  )
}
