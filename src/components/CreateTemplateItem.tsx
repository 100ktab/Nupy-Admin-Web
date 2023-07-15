import Link from "next/link";
import Image from "next/image";

const CreateTemplateItem = () => {
  return (
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
  )
}

export default CreateTemplateItem