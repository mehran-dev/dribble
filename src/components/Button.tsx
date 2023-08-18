import Image from "next/image";
import React, { MouseEventHandler } from "react";

type Props = {
  children: React.ReactNode;
  leftIcon?: string;
  rightIcon?: string;
  handleClick?: MouseEventHandler;
  isSubmitting?: boolean;
  type: "button" | "submit";
  textColor?: string;
  bgColor?: string;
};

export default function Button({
  children,
  leftIcon,
  rightIcon,
  handleClick,
  isSubmitting,
  type,
  textColor,
  bgColor,
}: Props) {
  return (
    <button
      type={type || "button"}
      disabled={isSubmitting}
      className="flexCenter gap-3 px-4 py-3"
      onClick={handleClick}
    >
      {leftIcon && <Image src={leftIcon} width={14} height={14} alt="left" />}
      {children}
      {rightIcon && (
        <Image src={rightIcon} width={14} height={14} alt="right" />
      )}
    </button>
  );
}
