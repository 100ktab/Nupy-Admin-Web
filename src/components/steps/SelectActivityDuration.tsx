import ChatMessageByAdmin from "@/components/steps/ChatMessageByAdmin"
import React, {useState} from "react";
import InputDatePicker from "@/components/InputDatePicker";
import {useCreateNFT} from "@/util/hooks/useCreateNFT";
import {MessageTemplateType} from "@/util/enums/enum";

const SelectActivityDuration = () => {
  const createNFT = useCreateNFT()

  const handleChangeStartDateTime = (startTimeStamp: number) => {
    createNFT.setCreateInfo('startDateTime', startTimeStamp)
    console.log(createNFT.getCreateNFTInfo('endDateTime'))
    if (createNFT.getCreateNFTInfo('endDateTime')) {
      nextStep()
    }
  }

  const handleChangeEndDateTime = (endTimeStamp: number) => {
    createNFT.setCreateInfo('endDateTime', endTimeStamp)
    console.log(createNFT.getCreateNFTInfo('startDateTime'))
    if (createNFT.getCreateNFTInfo('startDateTime')) {
      nextStep()
    }
  }

  const nextStep = () => {
    createNFT.addChat({
      template: MessageTemplateType.NUMBER_OF_ISSUES,
    })
    createNFT.setCurrentTemplate(MessageTemplateType.NUMBER_OF_ISSUES)
  }

  return (
    <ChatMessageByAdmin text={'Please set the validity period for the channel room for the user.'}>
      <div className="w-[480px] h-[157px] p-6 bg-white rounded-[20px] border border-zinc-400 flex-col justify-start items-start gap-5 inline-flex">
        <div className="text-zinc-800 text-[22px] font-bold">Activity duration</div>
        <div className="justify-between items-start flex w-full gap-[12px]">
          <div className="grow shrink">
            <InputDatePicker
              placeholder={'Start date'}
              onClick={handleChangeStartDateTime}
            />
          </div>
          <div className="grow shrink">
            <InputDatePicker
              placeholder={'End date'}
              onClick={handleChangeEndDateTime}
            />
          </div>
        </div>
      </div>
    </ChatMessageByAdmin>
  )
}

export default SelectActivityDuration