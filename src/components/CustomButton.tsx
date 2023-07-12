'use client'

import React, {ReactNode} from "react";

type ButtonPropsType = {
  wrapperClasses?: string;
  customClasses?: string;
  classes?: string;
  buttonText: string;
  onClick: Function;
  suffixIcon?: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  variant?: string;
  fullWidth?: boolean
}
const CustomButton = ({buttonText, customClasses, onClick, suffixIcon, wrapperClasses, loading, disabled}: ButtonPropsType) => {

    const defaultButton = ` bg-white rounded-2xl shadow border border border border border-black border-opacity-20 justify-center items-center gap-2 inline-flex text-black text-[16px] font-bold`

    const getButtonClass = () => {
      return defaultButton
    }

    return (
      <div className={wrapperClasses || "w-full mb-5"}>
        <button
          disabled={disabled || false}
          className={customClasses || getButtonClass()}
          onClick={(e) => {e.stopPropagation();onClick();}}
        >
          {
            loading ?
              <div
                className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              >
              <span
                className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
              >
                Loading...
              </span>
              </div>
              :
              <div className={'flex justify-center items-center'}>
                {buttonText}
                {
                  suffixIcon &&
                  <span className={"ml-2"}>{suffixIcon}</span>
                }
              </div>
          }
        </button>
      </div>
    )
}

export default CustomButton