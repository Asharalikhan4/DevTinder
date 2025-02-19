import { FC } from "react";

const Navbar: FC = () => {
    return (
        <div className="flex items-center justify-between bg-white px-4 py-3 shadow-sm">
            <div className="flex-1">
                <a className="px-4 py-2 text-xl font-semibold text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                    👩🏼‍💻 DevTinder
                </a>
            </div>
            <div className="flex items-center gap-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search"
                        className="border border-gray-300 rounded-md px-4 py-1.5 w-32 md:w-48 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                </div>
                
                <div className="relative group">
                    <button className="focus:outline-none">
                        <div className="w-10 h-10 rounded-full overflow-hidden hover:ring-2 ring-blue-500 transition-all">
                            <img
                                alt="Profile"
                                className="w-full h-full object-cover"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                            />
                        </div>
                    </button>

                    <div className="absolute right-0 mt-2 w-48 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none opacity-0 invisible group-focus-within:opacity-100 group-focus-within:visible transition-opacity">
                        <div className="py-1">
                            <a className="flex justify-between items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                Profile
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    New
                                </span>
                            </a>
                            <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                            <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;