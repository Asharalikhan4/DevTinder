"use client";
import { useState } from "react";
import { FaCode, FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/authContext";
import { logout } from "@/actions/user";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, setUser } = useAuth();
    const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  const handleLogout = async () => {
    try {
      const res = await logout();
      toast.success(res?.message);
      setUser(null);
      router.push("/signin")
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <nav className="bg-[#E94057] py-4 px-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white">
          <FaCode className="w-6 h-6" />
          <span>DevTinder</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex lg:items-center lg:gap-6">
          {user?.name ? (
            <>
              <p className="text-white">Welcome, <b>{user.name}</b></p>
              <div className="relative">
                <button onClick={toggleMobileMenu} className="btn btn-ghost btn-circle avatar p-0">
                  <div className="w-10 rounded-full overflow-hidden">
                    <Image src={user.photoUrl} width={40} height={40} alt="User avatar" />
                  </div>
                </button>

                {mobileMenuOpen && (
                  <ul className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg w-48">
                    <li className="font-bold px-4 py-2">My Account</li>
                    <li><Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link></li>
                    <li><Link href="/requests" className="block px-4 py-2 hover:bg-gray-100">Requests</Link></li>
                    <li><Link href="/connections" className="block px-4 py-2 hover:bg-gray-100">Connections</Link></li>
                    <li onClick={handleLogout}><span className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">Logout</span></li>
                  </ul>
                )}
              </div>
            </>
          ) : (
            <Link href="/signin" className="btn btn-primary text-white">
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={toggleMobileMenu} className="lg:hidden text-white focus:outline-none">
          {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-4 px-4">
          {user?.name ? (
            <>
              <p className="text-white mb-2">Welcome, <b>{user.name}</b></p>
              <ul className="space-y-2">
                <li><Link href="/profile" className="block text-white py-2">Profile</Link></li>
                <li><Link href="/requests" className="block text-white py-2">Requests</Link></li>
                <li><Link href="/connections" className="block text-white py-2">Connections</Link></li>
                <li onClick={handleLogout}><span className="block text-white py-2 cursor-pointer">Logout</span></li>
              </ul>
            </>
          ) : (
            <Link href="/signin" className="btn btn-primary w-full text-center">
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
