import { IoHeartDislikeOutline, IoArrowBackOutline } from 'react-icons/io5';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="h-[calc(100vh-4rem)] bg-gray-50 flex flex-col items-center justify-center px-6 py-12 text-center">
            <div className="bg-white p-6 rounded-full shadow-lg mb-6">
                <IoHeartDislikeOutline size={60} className="text-red-500" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Oops! Page Not Found</h1>
            <p className="text-gray-600 mb-6">
                We couldn't find the page you're looking for. It might have been removed or doesn't exist.
            </p>
            <Link href={"/"}>
                <button className="flex items-center px-6 py-3 bg-[#E94057] text-white font-semibold rounded-lg shadow hover:bg-[#e2233d] transition cursor-pointer">
                    <IoArrowBackOutline size={20} className="mr-2" />
                    Back to Home
                </button>
            </Link>
        </div>
    );
};