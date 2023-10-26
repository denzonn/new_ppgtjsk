import React, { FC } from "react";
import Button from "./Button";

interface CardProps {
  picture?: string;
  program?: string;
  activity?: string;
  desctiption?: string;
  onClick?: React.MouseEventHandler;
}

const Card: FC<CardProps> = ({
  picture,
  program,
  activity,
  desctiption,
  onClick,
}) => {
  return (
    <div className="w-full p-4 my-10 lg:mt-0 lg:mb-4 bg-white rounded-lg shadow relative flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/3 rounded-md -translate-y-8 lg:-translate-x-8 lg:-translate-y-0">
        <img
          src="../../public/pengurus.jpg"
          alt=""
          className="w-full h-full object-cover rounded-lg lg:w-40 lg:h-40"
        />
      </div>
      <div className="lg:-translate-x-2">
        <div className="text-[#8e8c8c] font-semibold">Turut Laksana</div>
        <div className="text-2xl text-[#4facfe] font-semibold">Porseni</div>
        <div className="font-light opacity-70">
          kenapa dia makan makanan itu tetapi tidak enak
        </div>
      <Button label="Read More" className="bg-button mt-3 px-3 text-sm"/>
      </div>
    </div>
  );
};

export default Card;
