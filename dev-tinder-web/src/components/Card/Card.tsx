import { ReactNode } from "react";

interface CardProps {
  logo: ReactNode;
  heading: string;
  paragraph: string;
};

export default function Card({ logo, heading, paragraph }: CardProps) {
    return (
        <div className="border border-[#E94057] p-2 rounded-md max-w-80">
            <div className="flex items-center gap-x-2">
                <div>{logo}</div>
                <h4 className="text-xl font-bold">{heading}</h4>
            </div>
            <div>
                <p className="font-medium">{paragraph}</p>
            </div>
        </div>
    );
};