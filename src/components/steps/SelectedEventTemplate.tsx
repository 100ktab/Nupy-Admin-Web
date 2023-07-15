import ChatMessageByAdmin from "@/components/steps/ChatMessageByAdmin";
import Tag from "@/components/Tag";
import {MessageTemplateType, TemplateEventType} from "@/util/enums/enum";
import {useCreateNFT} from "@/util/hooks/useCreateNFT";
import {selectedItems} from "@/util/statics/data";

const SelectedEventTemplate = () => {
  const createNFT = useCreateNFT()

  // @ts-ignore
  const onClick = (e, value) => {
    console.log(value)
    createNFT.setEventTemplate(value)
    createNFT.addChat({
      template: MessageTemplateType.DEFAULT,
      text: selectedItems.filter(item => item.type === value)[0].title
    })
    createNFT.addChat({
      template: MessageTemplateType.SELECTED_INFORMATION,
      text: ''
    })
    createNFT.nextStep()
    console.log(value)
    console.log(createNFT.chatList)
  }

  return (
    <>
      <ChatMessageByAdmin text={'What activities are you preparing for?\n' +
        'If you choose what situation, we will recommend or generate corresponding activity question templates.'}>
        <div className={'w-[520px] justify-start items-start gap-3 inline-flex flex-wrap'}>
          {
            selectedItems.map((item, index) => {
              const selectedEventTemplate = createNFT.getSelectedEventTemplate()
              return <Tag
                key={index}
                text={item.title}
                onClick={onClick}
                selected={selectedEventTemplate === item.type}
                value={item.type}
              />
            })
          }
        </div>
      </ChatMessageByAdmin>
    </>
  )
}

export default SelectedEventTemplate