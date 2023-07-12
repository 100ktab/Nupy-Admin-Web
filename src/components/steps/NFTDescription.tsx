import ChatMessageByAdmin from "@/components/steps/ChatMessageByAdmin";

const NFTTitle = () => {
  return (
    <ChatMessageByAdmin text={''}>
      <div className="w-[480px] p-[24px] p-6 bg-white rounded-2xl border border-zinc-400 text-zinc-800">
        <div className="text-[22px] font-bold">NFT Description</div>
        <div className="text-[16px] font-medium">Please easily write down the instructions required for NFT.
          Automatically write articles.</div>
        <div className=" text-zinc-500 text-[14px] font-medium">Example : NFT Description</div>
      </div>
    </ChatMessageByAdmin>
  )
}

export default NFTTitle