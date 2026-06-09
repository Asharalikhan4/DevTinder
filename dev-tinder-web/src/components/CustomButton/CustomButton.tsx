import { CustomButtonProps } from "@/globalTypes";
import { ButtonHTMLAttributes } from "react";

export default function CustomButton({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & CustomButtonProps) {
  return (
    <button className="cursor-pointer" {...props}>
      {children}
    </button>
  );
};