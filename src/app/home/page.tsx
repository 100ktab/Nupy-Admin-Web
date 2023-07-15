'use client'

import Header from "@/components/Header";
import {useAccount} from "@/util/hooks/useAccount";
import {useRouter} from "next/navigation";
import Image from "next/image";
import {getCreateNFTs} from "@/util/externals/wallet/wallet";
import {selectedItems} from "@/util/statics/data";
import Link from "next/link";

export default function Home() {
  const account = useAccount()
  const router = useRouter()

  const getNFTs = async () => {
    const result = await getCreateNFTs(account.getAddress())
    console.log(result)
  }

  return (
    <>
      <Header/>
      <main className="w-full h-[calc(100vh-106px)] bg-zinc-100 p-[40px]">
        <div className="w-[1000px] p-[40px] bg-white rounded-[20px] mb-[40px] my-0 mx-auto">
          <div className="text-black text-2xl font-bold mb-[20px]">List of created templates</div>
          <div className="justify-start items-start gap-4 inline-flex">
            <Link
              className="w-[200px] h-[200px] bg-green-500 rounded-2xl justify-center items-center gap-2.5 inline-flex"
              href={'/nft'}
            >
              <div className="p-4 bg-white bg-opacity-20 rounded-[100px] justify-start items-center gap-1 flex">
                <div className="w-5 h-5 relative mr-[1px]">
                  <Image src={'/images/icons/icon-plus.webp'} alt={'create event'} fill/>
                </div>
                <div className="text-white text-lg font-bold">create event</div>
              </div>
            </Link>
            {
              <Link href={'/detail/2023_ETH_SEOUL'}>
                <div className="w-[200px] h-[200px] px-4 pt-7 pb-5 bg-zinc-100 rounded-2xl relative text-center">
                  <div className="absolute right-[12px] top-[12px]">
                    <Image src={"/images/icons/icon-more.webp"} alt={'show more'} width={16} height={16}/>
                  </div>
                  <div className="w-[88px] h-[88px] relative my-0 mx-auto">
                    <div className="w-[88px] h-[88px] bg-gray-700 rounded-lg">
                    </div>
                  </div>
                  <div className="text-black text-base font-bold my-[12px] truncate">Nuffy Hackathon Event</div>
                  <div className="text-zinc-500 text-xs font-normal">Creation Date 2023.04.08</div>
                </div>
              </Link>
            }
          </div>
        </div>
        <div className="w-[1000px] p-[40px] bg-white rounded-[20px] my-0 mx-auto">
          <div className="text-zinc-800 text-2xl font-bold mb-[20px]">Try our prepared templates!</div>
          <div className="self-stretch justify-start items-start gap-5 inline-flex flex-wrap mb-[20px]">
            {
              selectedItems.map((item, index) => {
                return (
                  <button
                    key={index}
                    className="basis-[23%] p-5 bg-zinc-100 rounded-xl gap-[20px] text-left"
                  >
                    <Image src={item.icon} alt={item.title} width={24} height={24} className={'mb-[16px]'}/>
                    <div className="text-black text-base font-bold">{item.title}</div>
                  </button>
                )
              })
            }
          </div>
          <div className="text-center">
            <button className="px-[20px] py-[10px] bg-zinc-100 rounded-lg mx-auto my-0">
              <div className="text-zinc-700 text-xs font-normal">+ view more</div>
            </button>
          </div>
        </div>
      </main>
    </>
  )
}
