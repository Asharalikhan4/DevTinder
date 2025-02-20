import { FC } from "react";
import { useSelector } from "react-redux";
import CustomButton from "../CustomButton";
import { useNavigate } from "react-router";

const Navbar: FC = () => {

    const user = useSelector((store: any) => store?.user);
    const navigate = useNavigate();

    return (
        <nav className="flex items-center justify-between bg-white shadow-sm px-4 sm:px-6 lg:px-8 h-16">
            {/* Left side - Brand */}
            <div className="flex-shrink-0">
                <h1 className="text-xl font-bold text-indigo-600">DevTinder</h1>
            </div>

            {/* Right side - User info */}
            {user ? (
                <div className="flex items-center space-x-4">
                    <span className="hidden sm:inline-block text-gray-600 mr-2">
                        Hi, {user?.firstName}
                    </span>

                    {/* Avatar container */}
                    <div className="relative h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                        <img
                            src={user?.photoUrl}
                            alt="User avatar"
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>
            ) : (
                <div>
                    <CustomButton onClick={() => navigate("/signin")}>Signin</CustomButton>
                </div>
            )}
        </nav>
    );
};

export default Navbar;