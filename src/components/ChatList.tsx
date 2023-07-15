import ChatMessage from "@/components/steps/ChatMessage";
import {MessageTemplateType} from "@/util/enums/enum";
import SelectedEventTemplate from "@/components/steps/SelectedEventTemplate";
import ChatMessageByAdmin from "@/components/steps/ChatMessageByAdmin";
import SelectCollectionInformation from "@/components/steps/SelectCollectionInformation";
import CollectionInformationImage from "@/components/steps/CollectionInfomationImageOrText";
import {useCreateNFT} from "@/util/hooks/useCreateNFT";
import {useEffect, useRef} from "react";
import CollectionInfomationCountry from "@/components/steps/CollectionInfomationCountry";
import CollectionInformationAddress from "@/components/steps/CollectionInfomationAddress";
import CollectionInfomationLocation from "@/components/steps/CollectionInfomationLocation";
import NFTTitle from "@/components/steps/NFTTitle";
import NFTDescription from "@/components/steps/NFTDescription";
import NFTImage from "@/components/steps/NFTImage";
import NFTDescriptionTone from "@/components/steps/NFTDescriptionTone";
import SelectActivityDuration from "@/components/steps/SelectActivityDuration";
import EnterCode from "@/components/steps/EnterCode";
import EndCreateNFT from "@/components/steps/EndCreateNFT";
import SelectNumberOfIssues from "@/components/steps/SelectNumberOfIssues";
import GenerateNFT from "@/components/steps/GenerateNFT";

const ChatList = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const createNFT = useCreateNFT()

  useEffect(() => {
    if (scrollRef.current) {
      // @ts-ignore
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [createNFT.chatList])

  return (
    <div className={'overflow-y-auto w-full'}>
      <div className={'w-[600px] mt-0 mx-auto pt-[48px]'} id="chatList" >
        {
          // @ts-ignore
          createNFT.chatList.map((item, index) => {
            if (item.template === MessageTemplateType.SELECTED_EVENT) {
              return <SelectedEventTemplate key={index}/>
            } else if (item.template === MessageTemplateType.DEFAULT) {
              return <ChatMessage key={index} text={item.text} imageURL={item.imageURL}/>
            } else if (item.template === MessageTemplateType.DEFAULT_BY_ADMIN) {
              return <ChatMessageByAdmin key={index} text={item.text as string}/>
            } else if (item.template === MessageTemplateType.SELECTED_INFORMATION) {
              return <SelectCollectionInformation key={index}/>
            } else if (item.template === MessageTemplateType.SELECTED_INFORMATION_IMAGE) {
              return <CollectionInformationImage key={index}/>
            } else if (item.template === MessageTemplateType.SELECTED_INFORMATION_COUNTRY) {
              return <CollectionInfomationCountry key={index}/>
            } else if (item.template === MessageTemplateType.SELECTED_INFORMATION_ADDRESS) {
              return <CollectionInformationAddress key={index}/>
            } else if (item.template === MessageTemplateType.SELECTED_INFORMATION_LOCATION) {
              return <CollectionInfomationLocation key={index}/>
            } else if (item.template === MessageTemplateType.NFT_TITLE) {
              return <NFTTitle key={index}/>
            } else if (item.template === MessageTemplateType.NFT_DESCRIPTION) {
              return <NFTDescription key={index}/>
            } else if (item.template === MessageTemplateType.NFT_IMAGE) {
              return <NFTImage key={index}/>
            } else if (item.template === MessageTemplateType.NFT_DESCRIPTION_TONE) {
              return <NFTDescriptionTone key={index}/>
            } else if (item.template === MessageTemplateType.ACTIVITY_DURATION) {
              return <SelectActivityDuration key={index}/>
            } else if (item.template === MessageTemplateType.ENTER_CODE) {
              return <EnterCode key={index}/>
            } else if (item.template === MessageTemplateType.END) {
              return <EndCreateNFT key={index}/>
            } else if (item.template === MessageTemplateType.NUMBER_OF_ISSUES) {
              return <SelectNumberOfIssues key={index}/>
            } else if (item.template === MessageTemplateType.GENERATE_NFT) {
              return <GenerateNFT key={index}/>
            }
          })
        }
      </div>
      <div className="h-32 md:h-48 flex-shrink-0" ref={scrollRef}></div>
    </div>
  )
}

export default ChatList