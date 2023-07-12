import ChatMessageByAdmin from "@/components/steps/ChatMessageByAdmin";

const NFTTitle = () => {
  return (
    <ChatMessageByAdmin text={'Below is the time to create the NFT passed to the customer! Please fill out the input forms below in order.'}>
      <div className="w-[480px] p-[24px] bg-white rounded-2xl border border-zinc-400">
        <div className="text-zinc-800 text-[22px] font-bold mb-[20px]">NFT Title</div>
        <div className="w-full px-5 py-4 rounded-2xl border border-zinc-400">
          <div className="grow shrink basis-0 text-[#27272A] text-[16px] font-medium">It is the nft title.</div>
        </div>
      </div>
    </ChatMessageByAdmin>
  )
}

export default NFTTitle