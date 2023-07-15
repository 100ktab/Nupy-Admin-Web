import {MessageTemplateType, Tone} from "@/util/enums/enum";
import Tag from "@/components/Tag";
import {useCreateNFT} from "@/util/hooks/useCreateNFT";
import ChatMessageByAdmin from "@/components/steps/ChatMessageByAdmin";

const NFTDescriptionTone = () => {
  const createNFT = useCreateNFT()
  const tones = [
    {
      type: Tone.FRIENDLY,
      title: 'Kind'
    },
    {
      type: Tone.PLEASANT,
      title: 'Pleasant',
    },
    {
      type:Tone.PROFESSIONAL,
      title: 'Professional',
    }
    ]

  const onClick = (value: string) => {
    createNFT.addChat({
      template: MessageTemplateType.DEFAULT,
      text: tones.filter(item => item.type === value)[0].title
    })
    createNFT.setCreateInfo('tone', value)
    createNFT.setCurrentTemplate(MessageTemplateType.NFT_DESCRIPTION)
    createNFT.addChat({
      template: MessageTemplateType.NFT_DESCRIPTION,
      text: ''
    })
  }

  return (
    <ChatMessageByAdmin text={""}>
      <div className="w-[480px] p-[24px] bg-white rounded-2xl border border-zinc-400 text-zinc-800">
        <div className="text-[22px] font-bold">Choose NFT to indicate tone</div>
        <div className="text-[16px] font-medium">When filling in the statement to be displayed on the user app, please choose the tone you want.</div>
        <div className="justify-start items-start gap-3 inline-flex mt-[20px]">
          {
            tones.map((item, index) => {
              const tone = createNFT.getCreateNFTInfo('tone')
              return <Tag
                key={index}
                text={item.title}
                onClick={() => {onClick(item.type)}}
                selected={tone === item.type}
                value={item.type}
              />
            })
          }
        </div>
      </div>
    </ChatMessageByAdmin>
  )
}

export default NFTDescriptionTone