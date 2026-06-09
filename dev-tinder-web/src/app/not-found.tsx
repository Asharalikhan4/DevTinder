import { IoHeartDislikeOutline, IoArrowBackOutline } from "react-icons/io5";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="bg-gradient-to-br from-[#FF3D7F] to-[#7C3AED] p-6 rounded-full shadow-lg mb-6">
        <IoHeartDislikeOutline size={60} className="text-white" />
      </div>
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404: This page swiped left on you</h1>
      <p className="text-gray-600 mb-6">It ghosted us — try heading back home to find a better match.</p>


      <Link href={"/"}>
        <button className="flex items-center px-6 py-3 bg-[#E94057] text-white font-semibold rounded-lg shadow hover:bg-[#e2233d] transition cursor-pointer">
          <IoArrowBackOutline size={20} className="mr-2" />
          Back to Home
        </button>
      </Link>
    </div>
  );
}
