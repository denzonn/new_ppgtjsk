import React, { FC } from "react";
import Button from "./Button";

interface CardProps {
  picture?: string;
  program?: string;
  activity?: string;
  description?: string;
  link?: string;

  color?: string;
  onClick?: React.MouseEventHandler;
}

interface DashboardCardProps {
  types?: string;
  unit?: string;
  total?: number;
  dashboard?: boolean;
  icon?: string;
}

interface PengurusCardProps {
  pengurus?: boolean;
  label?: string;
}

type CardType = CardProps & DashboardCardProps & PengurusCardProps;

const Card: FC<CardType> = ({
  picture,
  program,
  activity,
  description,
  dashboard,
  icon,
  color,
  types,
  total,
  link,
  unit,
  pengurus,
  label,
  onClick,
}) => {
  return dashboard ? (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <div className="grid grid-cols-4">
        <div className="col-span-3">
          <div className="text-base text-[#8790a3] uppercase font-sans font-semibold">
            {types}
          </div>
          <div className="text-[#344767] font-semibold text-xl">
            {total} <span className="text-base font-medium">{unit}</span>
          </div>
        </div>
        <div className="col-span-1 mx-auto">
          <div
            className={`bg-${color} rounded-full w-12 h-12 flex justify-center items-center`}
          >
            <i className={`${icon} text-white`}></i>
          </div>
        </div>
      </div>
      <div className="mt-2 text-[#8790a3] font-opensans">
        <span className="text-green-500 font-semibold">+55</span> orang sejak
        Januari
      </div>
    </div>
  ) : pengurus ? (
    <div className="bg-white rounded-2xl px-4 py-6 shadow-sm">
      <div className="grid grid-cols-4">
        <div className="col-span-1 mx-auto">
          <div
            className={`bg-${color} rounded-full w-12 h-12 flex justify-center items-center`}
          >
            <i className={`${icon} text-white`}></i>
          </div>
        </div>
        <div className="col-span-3">
          <div className="text-sm text-[#8790a3] font-sans font-light">
            {types}
          </div>
          <div className="text-[#344767] font-semibold text-xl">{label}</div>
        </div>
      </div>
    </div>
  ) : (
    <div className="w-full min-h-12 p-4 my-10 lg:mt-0 lg:mb-4 bg-white rounded-lg shadow relative flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/3 rounded-md -translate-y-8 lg:-translate-x-8 lg:-translate-y-0">
        <img
          src={picture}
          alt=""
          className="w-full h-full object-cover rounded-lg lg:w-40 lg:h-40"
        />
      </div>
      <div className="lg:-translate-x-2">
        <div className="text-[#8e8c8c] font-semibold">{program}</div>
        <div className="text-2xl text-[#4facfe] font-semibold">{activity}</div>
        <div className="font-light opacity-70">{description}</div>
        <div className="mt-3">
          <a
            href={link}
            className="bg-button  px-3 text-white py-2 rounded-md"
            onClick={onClick}
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;
