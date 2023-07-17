import ChatMessageByAdmin from "@/components/steps/ChatMessageByAdmin";
import {mintAll} from "@/util/externals/wallet/wallet";
import {MessageTemplateType} from "@/util/enums/enum";
import {useCreateNFT} from "@/util/hooks/useCreateNFT";
import {useState} from "react";
import {storeAccessCode} from "@/util/externals/db/dynamo";
import {throws} from "assert";

const GenerateNFT = () => {
  const createNFT = useCreateNFT()
  const [loading, setLoading] = useState(false)

  const handleClickGenerate = () => {
    setLoading(true)
    const params = createNFT.getCreateNFTParams("")
    console.log(params)
    mintAll(params)
      .then(_=> {
        storeAccessCode(params.creator,params.enter_code, params.nft_collection_id)
          .then(_ => {
            createNFT.addChat({
              template: MessageTemplateType.END,
            })
            createNFT.setCurrentTemplate(MessageTemplateType.END)
            createNFT.nextStep()
            setLoading(true)
          }).catch(e => throws(e))
      })
      .catch(e => {
        setLoading(false)
        console.log(e)
      })
  }
  return (
    <ChatMessageByAdmin
      text={'All tasks completed!\nPress the button below to generate an NFT.'}
    >
      <button
        className="px-5 py-2.5 bg-green-500 rounded-xl text-white"
        onClick={handleClickGenerate}
      >
        {
          loading ?
            <div role="status">
              <span className="sr-only">Generating...</span>
            </div>:
            <div className="text-white text-base font-bold">Generate an NFT</div>
        }
      </button>
    </ChatMessageByAdmin>
  )
}

export default GenerateNFT