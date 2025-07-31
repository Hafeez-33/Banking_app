import React from "react";

interface HeaderBoxProps {
  type?: "title" | "greeting";
  title: string;
  subtext: string;
  user?: string;
}

const HeaderBox = ({
  type = "title",
  title,
  subtext,
  user,
}: HeaderBoxProps) => {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl lg:text-30 font-semibold text-gray-900">
        {title}
        {type === "greeting" && (
          <span className="text-[#0179FE]">&nbsp;{user}</span>
        )}
      </h1>
      <p className="text-base lg:text-lg font-normal text-gray-600">
        {subtext}
      </p>
    </div>
  );
};

export default HeaderBox;
