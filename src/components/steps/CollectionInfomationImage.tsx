import ChatMessageByAdmin from "@/components/steps/ChatMessageByAdmin";

const CollectionInformationImage = () => {
  return (
    <div>
      <ChatMessageByAdmin text={'You chose to collect images!'}>
        <ChatMessageByAdmin
          text={'Please fill out the phrase that will be shown on the user app.\nExample: After using our service, please take a proof shot so that the booth can be seen well! We\'re giving out NFTs through a lottery.'}
          withImage={false}
        />
      </ChatMessageByAdmin>
    </div>
  )
}

export default CollectionInformationImage