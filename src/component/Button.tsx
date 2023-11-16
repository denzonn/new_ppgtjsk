import React, { FC } from "react";

interface ButtonProps {
  label: string;
  className?: string;
  onClick?: React.MouseEventHandler;
  type?: "button" | "submit" | "reset";
  icon?: React.ReactNode;
}

const Button: FC<ButtonProps> = ({ label, className, onClick, type, icon }) => {
  return (
    <div>
      {icon}
      <button
        onClick={onClick}
        type={type}
        className={`${className} bg-primaryButton hover:bg-[#4a62c9] text-white px-10 py-2 rounded-md`}
      >
        {label}
      </button>
    </div>
  );
};

export default Button;
