import React, {useState} from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import dayjs from "dayjs";

export interface Props {
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  buttonOnly?: boolean;
  value?: any;
  onClick? : any;
  InputProps?: any;
}

const InputDatePicker = React.forwardRef<HTMLElement, Props>(
  ({ placeholder, value, onClick, disabled, readOnly, buttonOnly, ...props }, ref) => {
   const [date, setDate] = useState()
    // @ts-ignore
    const handleChangeDatePicker = (date) => {
      setDate(date.getTime())
      onClick(date.getTime())
    }

    return (
      <>
        <DatePicker
          onChange={handleChangeDatePicker}
          dateFormat="dd/MM/yyyy"
          customInput={
          <div className="w-[210px] h-14 px-5 py-4 bg-white rounded-2xl border border-zinc-400 justify-between items-center gap-[9px] inline-flex">
            <div className="text-zinc-400 text-base font-medium">{date ? dayjs(date).format('DD/MM/YYYY') : placeholder}</div>
            <div className="w-5 h-5 relative">
              <Image src={"/images/icons/icon-calendar.webp"} alt={"select date"} fill />
            </div>
          </div>}
        />
      </>
    );
  }
);

export default InputDatePicker;