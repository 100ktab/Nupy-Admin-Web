import ChatMessageByAdmin from "@/components/steps/ChatMessageByAdmin";

const CollectionInformationText = () => {
  return (
    <div>
      <ChatMessageByAdmin text={'You chose to collect text!'}>
        <ChatMessageByAdmin
          text={'Please fill out the phrase that will be shown on the user app.\nExample: Please leave a comment after eating the food!'}
          withImage={false}
        />
      </ChatMessageByAdmin>
    </div>
  )
}

export default CollectionInformationText