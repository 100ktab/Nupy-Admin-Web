'use client'

import InputMessage from "@/components/InputMessage";
import LNB from "@/components/lnb/LNB";
import ChatList from "@/components/ChatList";
import Header from "@/components/Header";
import {useEffect} from "react";
import {useCreateNFT} from "@/util/hooks/useCreateNFT";
import {useAccount} from "@/util/hooks/useAccount";
import {useRouter} from "next/navigation";

export default function Home() {
  const account = useAccount()
  const createNFT = useCreateNFT()
  const router = useRouter()

  useEffect(() => {
    if (!account.isLoggedIn()) {
      router.replace('/')
    }
    return () => {
      createNFT.resetChatList()
    }
  }, [])

  return (
    <>
      <Header/>
      <main className="w-full h-[calc(100vh-106px)] bg-white flex flex-row">
        <LNB/>
        <div className={'flex h-full max-w-full flex-1 flex-col bg-zinc-100'}>
          <div className="relative h-full w-full transition-width flex flex-col items-stretch flex-1">
            <ChatList/>
            <InputMessage/>
          </div>
        </div>
      </main>
    </>
  )
}
