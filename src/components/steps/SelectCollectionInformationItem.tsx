type SelectCollectionInformationProps = {
  title: string;
  description: string;
  exampleNotice: string;
  selected: boolean;
  // @ts-ignore
  onClick: (e, value) => void;
  type: string;
}

const SelectCollectionInformationItem = ({title, description, exampleNotice, selected, type, onClick}: SelectCollectionInformationProps) => {
  return (
    <div className={`w-[480px] p-6  rounded-2xl border justify-between items-center gap-1 inline-flex
      ${selected ? 'bg-green-100 border-green-500' : 'bg-white border-zinc-400'}
    `}
     onClick={(e) => {onClick(e, type)}}
    >
      <div className="flex-col justify-start items-start gap-1 inline-flex">
        <div className="text-zinc-800 text-[20px] font-bold">{title}</div>
        <div className="text-zinc-800 text-[16px] font-medium">{description}</div>
        <div className="text-zinc-500 text-[14px] font-medium">{exampleNotice}</div>
      </div>
        {
          selected ?
            <div className="w-5 h-5 relative">
              <div className="w-5 h-5 left-0 top-0 absolute bg-green-500 rounded-full" />
              <div className="w-2 h-2 left-[6px] top-[6px] absolute bg-white rounded-full" />
            </div> :
            <div className="w-5 h-5 relative">
              <div className="w-5 h-5 left-0 top-0 absolute bg-white rounded-full border border-zinc-400" />
            </div>
        }
    </div>
  )
}

export default SelectCollectionInformationItem