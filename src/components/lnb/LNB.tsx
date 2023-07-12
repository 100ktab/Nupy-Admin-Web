import {CreateNFTStep} from "@/util/enums/enum";
import LNBItem from "@/components/lnb/LNBItem";
import {useCreateNFT} from "@/util/hooks/useCreateNFT";

const LNB = () => {
  const lnb = useCreateNFT()
  const LNBs = [
    {
      step: CreateNFTStep.step1,
      text: "Select Event Type",
    },
    {
      step: CreateNFTStep.step2,
      text: "Configuration issues",
    },
    {
      step: CreateNFTStep.step3,
      text: "NFT distribution",
    },
    {
      step: CreateNFTStep.step4,
      text: "Set Entry Code",
    },
  ]

  return (
    <div className="w-[300px] py-[40px] px-[20px] bg-white border border-zinc-200 flex-none">
      <div className="flex-col justify-start items-start gap-8 inline-flex">
        {
          LNBs.map((item, index) => {
            const currentStep = lnb.getStep()
            return (
              <LNBItem
                key={index}
                step={item.step}
                text={item.text}
                completed={currentStep > item.step}
                current={currentStep === item.step}
              />
            )
          })
        }
      </div>
    </div>
  )
}

export default LNB