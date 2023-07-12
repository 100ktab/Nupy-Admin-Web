import {MessageTemplateType, SelectCollectInformationType, TemplateContentType} from "@/util/enums/enum";
import ChatMessageByAdmin from "@/components/steps/ChatMessageByAdmin";
import SelectCollectionInformationItem from "@/components/steps/SelectCollectionInformationItem";
import {useCreateNFT} from "@/util/hooks/useCreateNFT";

const CollectionInformationImage = () => {
  return (
    <div>
      <ChatMessageByAdmin text={'이미지 수집을 선택하셨군요!'}>
        <ChatMessageByAdmin
          text={'사용자 앱에 보여질 문구를 작성해주세요.\n예시 : 저희 서비스를 이용하신 후 부스가 잘 보이도록 인증샷을 찍어주세요! 추첨을 통해 NFT를 드리고 있어요.'}
          withImage={false}
        />
      </ChatMessageByAdmin>
    </div>
  )
}

export default CollectionInformationImage