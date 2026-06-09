import { ReactNode } from "react";

interface CardProps {
  logo: ReactNode;
  heading: string;
  paragraph: string;
}

export default function Card({ logo, heading, paragraph }: CardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-transparent hover:shadow-lg hover:border-gray-100 transition">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#FF3D7F] to-[#7C3AED] text-white flex items-center justify-center">
          {logo}
        </div>

        <div>
          <h4 className="text-lg font-semibold text-gray-800">{heading}</h4>
          <p className="mt-2 text-sm text-gray-600">{paragraph}</p>
        </div>
      </div>
    </div>
  );
}