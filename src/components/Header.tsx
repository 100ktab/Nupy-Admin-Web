'use client'

import Image from "next/image";
import {useAccount} from "@/util/hooks/useAccount";
import Link from "next/link";

const Header = () => {
  const account = useAccount()

  return (
    <div className="w-full h-[106px] relative bg-white fixed top-0 left-0 right-0">
      <div className="w-full px-[48px] py-[32px] flex border border-zinc-200 justify-between items-center w-max-[1824px]">
        <Link className="w-[131px] h-[32px] relative" href={'/home'}>
          <Image src={'/images/logos/logo.webp'} alt={'nupy'} fill sizes={'100vw'}/>
        </Link>
        <div className="justify-start items-end gap-3 flex">
          <div className="px-3 py-2.5 bg-zinc-100 rounded-[100px] justify-start items-start gap-2.5 flex">
            <div className="text-zinc-800 text-[14px] font-normal">{account.getAddress()}</div>
          </div>
          <Image src={'/images/profiles/profile.webp'} width={41.2} height={41.2} alt={'user profile'}/>
        </div>
      </div>
    </div>
  )
}

export default Header