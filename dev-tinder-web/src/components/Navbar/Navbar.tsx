import { FaCode } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

interface userTypes {
    name: string;
    photoUrl: string;
}

const user: userTypes = {
    name: "",
    photoUrl: ""
};

export default function Navbar() {
    return (
        <nav className="bg-[#E94057] py-4 px-2">
            <div className="lg:container lg:mx-auto flex">
                <div className="flex-1">
                    <Link
                        href="/"
                        className="flex items-center gap-1 sm:gap-2 font-bold text-lg sm:text-xl">
                        <FaCode className="w-5 h-5 sm:h-6 sm:w-6 text-white" />
                        <span className="text-white">DevTinder</span>
                    </Link>
                </div>
                {user?.name ? (
                    <div className="flex items-center gap-4 text-sm">
                        <p className="sm:block hidden">
                            Welcome, <b>{user?.name}</b>
                        </p>

                        <div className="dropdown dropdown-end">
                            <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <Image
                                        alt="Tailwind CSS Navbar component"
                                        src={user.photoUrl}
                                    />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-base dropdown-content bg-base-100 rounded-box z-1 w-40 shadow p-0 py-2">
                                <p className="font-bold px-3">My Account</p>
                                <div className="divider m-0 mt-1"></div>
                                <div className="space-y-1">
                                    <li>
                                        <Link href="/profile">Profile</Link>
                                    </li>
                                    <li>
                                        <Link href="/requests">Requests</Link>
                                    </li>
                                    <li>
                                        <Link href="/connections">Connections</Link>
                                    </li>
                                    <li>
                                        <span>Logout</span>
                                    </li>
                                </div>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <button className="btn btn-primary text-white">
                        <Link href="/signin">Sign In</Link>
                    </button>
                )}
            </div>
        </nav>
    );
};
