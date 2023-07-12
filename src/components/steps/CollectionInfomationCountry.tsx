import ChatMessageByAdmin from "@/components/steps/ChatMessageByAdmin";

const CollectionInformationGPS = () => {
  return (
    <div>
      <ChatMessageByAdmin text={'You have chosen to collect user location information!'}>
        <ChatMessageByAdmin
          text={'Detailed location information needs to be set. Please enter the country/region where you want to collect location information.'}
          withImage={false}
          childrenInBubble={ <div className="text-zinc-500 text-[14px] font-medium">Example: Republic of Korea</div>}
        />
      </ChatMessageByAdmin>
    </div>
  )
}

export default CollectionInformationGPS