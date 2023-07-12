import ChatMessageByAdmin from "@/components/steps/ChatMessageByAdmin";

const SelectActivityDuration = () => {
  return (
    <ChatMessageByAdmin text={'Please input the number of NFTs to be airdropped to the user.'}>
      <div className="w-[480px] h-[134px] p-6 bg-white rounded-[20px] border border-zinc-400 flex-col justify-start items-start gap-5 inline-flex">
        <div className="self-stretch h-[86px] flex-col justify-start items-start gap-1 flex">
          <div className="text-zinc-800 text-[22px] font-bold">Number of issues</div>
          <div className="self-stretch text-zinc-800 text-base font-medium">Please enter only numbers.</div>
          <div className="self-stretch text-zinc-500 text-sm font-medium">Example '100'</div>
        </div>
      </div>
    </ChatMessageByAdmin>
  )
}

export default SelectActivityDuration