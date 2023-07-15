import {MessageTemplateType, SelectCollectInformationType, TemplateContentType} from "@/util/enums/enum";
import ChatMessageByAdmin from "@/components/steps/ChatMessageByAdmin";
import SelectCollectionInformationItem from "@/components/steps/SelectCollectionInformationItem";
import {useCreateNFT} from "@/util/hooks/useCreateNFT";

const SelectCollectionInformation = () => {
  const creatNFT = useCreateNFT()
  const selectedItems = [
    {
      type: SelectCollectInformationType.GPS,
      title: 'Collect user location information',
      description: 'Can collect user GPS values.',
      exampleNotice: 'Example: Only those who verify the location of the event site can receive it.',
      next: 3,
    },
    {
      type: SelectCollectInformationType.IMAGE,
      title: 'Collect images',
      description: 'Images can be collected.',
      exampleNotice: 'Example: Please submit a celebration certification photo!',
      next: 2,
    },
    {
      type: SelectCollectInformationType.TEXT,
      title: 'Collect Text',
      description: 'Text values can be collected.',
      exampleNotice: 'Example: Please leave a comment after eating the food!',
      next: 4,
    },
  ]

  // @ts-ignore
  const handleClick = (e, value) => {
    if (creatNFT.getSelectedCollectInformation()) {
      return
    }

    creatNFT.setCollectInformation(value)
    creatNFT.addChat({
      template: MessageTemplateType.DEFAULT,
      text: selectedItems.filter(item => item.type === value)[0].title
    })

    if (value === SelectCollectInformationType.IMAGE) {
      creatNFT.addChat({
        template: MessageTemplateType.SELECTED_INFORMATION_IMAGE,
        text: ''
      })
      creatNFT.setCurrentTemplate(MessageTemplateType.SELECTED_INFORMATION_IMAGE)
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
        {selectedItems.map((item, index) => {
          const selectCollectInformation = creatNFT.getSelectedCollectInformation()
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