import ChatMessageByAdmin from "@/components/steps/ChatMessageByAdmin";
import {useCreateNFT} from "@/util/hooks/useCreateNFT";
import Link from "next/link";

const EndCreateNFT = () => {
  const createNFT = useCreateNFT()
  console.log(createNFT.getCreateNFTInfo())

  const handleClickCopy = async () => {
    try {
      await navigator.clipboard.writeText(`https://android_nupy?code=${createNFT.getCreateNFTInfo().enterCode}`)
      console.log('Text copied to clipboard');
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }

  return (
    <ChatMessageByAdmin
      text={`${createNFT.getCreateNFTInfo().enterCode} has been confirmed. \n Next, generate the URL to enter the room!`}
    >
      <div className="w-[480px] p-6 bg-white rounded-[20px] border border-zinc-400 flex-col justify-start items-start gap-5 inline-flex">
        <div className="text-zinc-800 text-xl font-bold">
          {`https://android_nupy?code=${createNFT.getCreateNFTInfo().enterCode}`}
        </div>
        <button
          className="px-5 py-2.5 bg-green-500 rounded-xl"
          onClick={handleClickCopy}
        >
          <div className="text-white text-base font-bold">Copy Link</div>
        </button>
      </div>
      <div className="w-[481px] p-5 bg-white rounded-tr-[25px] rounded-bl-[25px] rounded-br-[25px] border border-zinc-300 justify-center items-center gap-[9px] inline-flex">
        <div className="text-zinc-800 text-base font-bold">Please return to the homepage to check the release status!</div>
      </div>
      <Link
        href={'/home'}
        className="px-5 py-2.5 bg-green-500 rounded-xl"
      >
        <div className="text-white text-base font-bold">Return to Home Page</div>
      </Link>
    </ChatMessageByAdmin>
  )
}

export default EndCreateNFT