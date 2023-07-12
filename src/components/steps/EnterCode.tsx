import ChatMessageByAdmin from "@/components/steps/ChatMessageByAdmin";

const EnterCode = () => {
  return (
    <ChatMessageByAdmin
      text={'You need to set an entry code to log in to the channel room on the user app.\n' +
        'After entering the entry code, the channel room URL can be generated and provided to users.'}
    >
      <div className="w-[480px] h-[139px] p-6 bg-white rounded-[20px] border border-zinc-400 flex-col justify-start items-start gap-5 inline-flex">
        <div className="self-stretch h-[91px] flex-col justify-start items-start gap-1 flex">
          <div className="self-stretch text-zinc-800 text-[22px] font-bold">Please enter the code for entering the room.</div>
          <div className="self-stretch text-zinc-500 text-sm font-medium">Example: 2023 ETH_SEOUL</div>
        </div>
      </div>
    </ChatMessageByAdmin>
  )
}

export default EnterCode