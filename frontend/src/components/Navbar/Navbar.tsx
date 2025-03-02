import { FC, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CustomButton from "../CustomButton";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { removeUser } from "@/redux/slices/userSlice";

const Navbar: FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const user = useSelector((store: any) => store?.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async() => {
        try {
            const response = await axios.post(`${process.env.BASE_URL}/user/logout`, {
                withCredentials: true
            });
            dispatch(removeUser({}));
            navigate("/signin");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <nav className="flex items-center justify-between bg-white shadow-sm px-4 sm:px-6 lg:px-8 h-16 relative">
            {/* Left side - Brand */}
            <div className="flex-shrink-0">
                <Link to="/" className="text-xl font-bold text-indigo-600">DevTinder</Link>
            </div>

            {/* Right side - User info */}
            {user ? (
                <div
                    className="flex items-center space-x-4 relative"
                    onMouseEnter={() => setIsOpen(true)}
                    onMouseLeave={() => setIsOpen(false)}
                >

                    {/* Avatar container */}
                    <div className="relative h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden cursor-pointer">
                        <img
                            src={user?.photoUrl}
                            alt="User avatar"
                            className="h-full w-full object-cover"
                        />
                    </div>

                    {/* Dropdown Menu */}
                    {isOpen && (
                        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                            <Link
                                to="/profile"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Profile
                            </Link>
                            <Link
                                to="/settings"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Settings
                            </Link>
                            <Link
                                to="/connections"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Connections
                            </Link>
                            <Link
                                to="/requests"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Requests
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Logout
                            </button>
                        </div>
                    )}

                    <span className="hidden sm:inline-block text-gray-600 mr-2">
                        Hi, {user?.firstName}
                    </span>
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