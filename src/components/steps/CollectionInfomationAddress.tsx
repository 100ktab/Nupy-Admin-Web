import ChatMessageByAdmin from "@/components/steps/ChatMessageByAdmin";

const CollectionInformationLocation = () => {
  return (
    <ChatMessageByAdmin
      text={'Please enter a more detailed address.'}
      withImage={true}
      childrenInBubble={<div className="text-zinc-500 text-[14px] font-medium">Example: 311, Gangnam-daero, Seocho-gu, Seoul, Republic of Korea</div>}
    />
  )
}

export default CollectionInformationLocation