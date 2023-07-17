import {MessageTemplateType, SelectCollectInformationType, TemplateContentType} from "@/util/enums/enum";
import ChatMessageByAdmin from "@/components/steps/ChatMessageByAdmin";
import SelectCollectionInformationItem from "@/components/steps/SelectCollectionInformationItem";
import {useCreateNFT} from "@/util/hooks/useCreateNFT";
import {selectedCollectInformation} from "@/util/statics/data";

const SelectCollectionInformation = () => {
  const creatNFT = useCreateNFT()

  // @ts-ignore
  const handleClick = (e, value) => {
    if (creatNFT.getCreateNFTInfo().selectedCollectInformation) {
      return
    }

    creatNFT.setCreateInfo('selectedCollectInformation', value)
    creatNFT.addChat({
      template: MessageTemplateType.DEFAULT,
      text: selectedCollectInformation.filter(item => item.type === value)[0].title
    })

    if (value === SelectCollectInformationType.IMAGE) {
      creatNFT.addChat({
        template: MessageTemplateType.SELECTED_INFORMATION_IMAGE,
        text: ''
      })
      creatNFT.setCurrentTemplate(MessageTemplateType.SELECTED_INFORMATION_IMAGE)
    } else if (value === SelectCollectInformationType.TEXT) {
      creatNFT.addChat({
        template: MessageTemplateType.SELECTED_INFORMATION_TEXT,
        text: ''
      })
      creatNFT.setCurrentTemplate(MessageTemplateType.SELECTED_INFORMATION_TEXT)
    } else if(value === SelectCollectInformationType.GPS) {
      creatNFT.addChat({
        template: MessageTemplateType.SELECTED_INFORMATION_COUNTRY,
        text: ''
      })
      creatNFT.setCurrentTemplate(MessageTemplateType.SELECTED_INFORMATION_COUNTRY)
    }
  }

  return (
    <div>
      <ChatMessageByAdmin text={'Based on the activity you have chosen, it is recommended to collect the following information.\n' +
        ' Please select an information collection option for the user.'}>
        {selectedCollectInformation.map((item, index) => {
          const selectCollectInformation = creatNFT.getCreateNFTInfo().selectedCollectInformation
          return <SelectCollectionInformationItem
            key={index}
            title={item.title}
            description={item.description}
            exampleNotice={item.exampleNotice}
            type={item.type}
            selected={selectCollectInformation === item.type}
            onClick={handleClick}
          />
        })}
      </ChatMessageByAdmin>
    </div>
  )
}

export default SelectCollectionInformation