import React, { FC } from "react";

interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  type?: string;
  name?: string;
  className?: string;
  required?: boolean;
  onBlur?: (event: any) => void;
  onChange?: (value: any) => void;
}

const Input: FC<InputProps> = ({
  label,
  placeholder,
  value,
  type,
  name,
  className,
  required,
  onBlur,
  onChange,
}) => {
  const pathname = location.pathname;

  return (
    <div>
      {pathname === "/" ? (
        <div className="flex flex-col">
          <label
            htmlFor=""
            className={`text-[#595959] text-lg ${
              required ? 'before:content-["*"] before:text-red-600' : ""
            }`}
          >
            {label}
          </label>
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            name={name}
            className={` ${className} bg-transparent border rounded-md focus:outline-none py-[0.4375rem] px-[0.875rem] mt-1`}
          />
        </div>
      ) : (
        <div className="flex flex-col">
          <label
            htmlFor=""
            className={`text-[#697a8d] text-base mb-1 ${
              required ? 'after:content-["*"] after:text-red-600'  : ""
            }`}
          >
            {label}
          </label>
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            name={name}
            className={` ${className} bg-transparent border rounded-md focus:outline-none py-[0.6rem] px-[0.875rem] mt-1 font-light text-sm mb-6 text-[#697a8d]`}
          />
        </div>
      )}
    </div>
  );
};

export default Input;
