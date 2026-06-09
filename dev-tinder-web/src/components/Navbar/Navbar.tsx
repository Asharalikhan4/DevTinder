"use client";

import { useEffect, useRef, useState } from "react";
import {
  FaCode,
  FaSun,
  FaMoon,
  FaBars,
  FaTimes,
  FaUserAlt,
  FaUserPlus,
  FaSignInAlt,
  FaBell,
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/authContext";
import { logout } from "@/actions/user";
import toast from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";
import { navLinks } from "@/constants";
import { NavLinkType } from "@/globalTypes";

export default function Navbar() {
  const { user, setUser } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const profileRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMobileMenuOpen(false);
    setProfileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const original = document.body.style.overflow;
    if (mobileMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = original || "";
    return () => {
      document.body.style.overflow = original || "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (profileRef.current && !profileRef.current.contains(target)) {
        setProfileMenuOpen(false);
      }
    };
    if (profileMenuOpen) document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [profileMenuOpen]);

  const handleLogout = async () => {
    try {
      setMobileMenuOpen(false);
      setProfileMenuOpen(false);
      const res = await logout();
      toast.success(res?.message || "Logged out");
      setUser(null);
      router.push("/signin");
    } catch (err: any) {
      toast.error(err?.message || "Logout failed");
    }
  };

  const initials =
    (user?.name || "")
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || null;

  return (
    <>
      {/* Header */}
      <header className="sticky top-4 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center justify-between gap-4 bg-white/70 backdrop-blur-md border border-gray-100 rounded-2xl py-3 px-4 shadow-sm">
            {/* Left: logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF3D7F] to-[#7C3AED] flex items-center justify-center text-white shadow-md">
                <FaCode className="w-5 h-5" />
              </div>
              <span className="font-semibold text-gray-800 text-lg">
                DevTinder
              </span>
            </Link>

            {/* Center: nav links (desktop) */}
            <div className="hidden md:flex md:items-center md:gap-8 flex-1 justify-center">
              <ul className="flex items-center gap-6">
                {navLinks.map((nl: NavLinkType) => (
                  <li key={nl.href}>
                    <Link
                      href={nl.href}
                      className="text-gray-600 hover:text-gray-900 font-medium transition"
                    >
                      {nl.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: actions */}
            <div className="flex items-center gap-3">
              {/* Theme toggle */}
              <button
                type="button"
                aria-label="Toggle theme"
                onClick={() =>
                  setTheme((t) => (t === "light" ? "dark" : "light"))
                }
                className="p-2 rounded-lg hover:bg-gray-100 transition"
              >
                {theme === "light" ? (
                  <FaSun className="w-5 h-5 text-[#E94057]" />
                ) : (
                  <FaMoon className="w-5 h-5 text-[#7C3AED]" />
                )}
              </button>

              {/* If logged in: avatar + desktop menu */}
              {user ? (
                <div
                  className="hidden md:flex items-center gap-3 relative"
                  ref={profileRef}
                >
                  {/* Notification (desktop) */}
                  <button
                    type="button"
                    className="hidden md:inline-flex p-2 rounded-lg hover:bg-gray-100 relative transition"
                    aria-label="Notifications"
                  >
                    <FaBell className="w-5 h-5 text-gray-600" />
                    {/* example badge */}
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                      3
                    </span>
                  </button>
                  
                  <button
                    onClick={() => setProfileMenuOpen((p) => !p)}
                    className="flex items-center gap-2 focus:outline-none"
                    aria-haspopup="true"
                    aria-expanded={profileMenuOpen}
                  >
                    {user.photoUrl ? (
                      <Image
                        src={user?.photoUrl}
                        width={36}
                        height={36}
                        alt="avatar"
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium">
                        {initials || <FaUserAlt />}
                      </div>
                    )}
                  </button>

                  {/* Desktop dropdown */}
                  {profileMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border py-2 z-10">
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm hover:bg-gray-50"
                      >
                        Profile
                      </Link>
                      <Link
                        href="/requests"
                        className="block px-4 py-2 text-sm hover:bg-gray-50"
                      >
                        Requests
                      </Link>
                      <Link
                        href="/connections"
                        className="block px-4 py-2 text-sm hover:bg-gray-50"
                      >
                        Connections
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                // Sign in / Sign up (desktop)
                <div className="hidden md:flex gap-2">
                  <Link
                    href="/signin"
                    className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium hover:bg-gray-50 transition"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/signup"
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#FF3D7F] to-[#7C3AED] text-white text-sm font-medium shadow hover:shadow-md transition"
                  >
                    Sign up
                  </Link>
                </div>
              )}

              {/* Mobile menu button (opens sidebar) */}
              <button
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <FaBars className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 transition-opacity duration-300 ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } z-40`}
        aria-hidden={!mobileMenuOpen}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile sidebar / drawer */}
      <aside
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-screen w-[72%] max-w-[420px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!mobileMenuOpen}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF3D7F] to-[#7C3AED] flex items-center justify-center text-white shadow-md">
              <FaCode />
            </div>
            <div>
              <h4 className="font-semibold">DevTinder</h4>
              <p className="text-xs text-gray-500">Find devs to collaborate</p>
            </div>
          </div>

          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 rounded-md hover:bg-gray-100"
            aria-label="Close menu"
          >
            <FaTimes className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto h-[calc(100vh-64px)]">
          {/* Logged in user snapshot */}
          {user ? (
            <>
              <div className="flex items-center gap-3 mb-4">
                {user?.photoUrl ? (
                  <Image
                    src={user?.photoUrl}
                    width={56}
                    height={56}
                    alt="avatar"
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium">
                    {initials || <FaUserAlt />}
                  </div>
                )}
                <div>
                  <div className="font-semibold">{user?.name}</div>
                  <div className="text-sm text-gray-500">{user?.email}</div>
                </div>
              </div>

              <nav className="mb-4">
                <ul className="space-y-2">
                  {navLinks.map((nl) => (
                    <li key={nl.href}>
                      <Link
                        href={nl.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition"
                      >
                        <span className="w-2.5 h-2.5 bg-[#FF3D7F] rounded-full" />
                        <span className="font-medium text-gray-700">
                          {nl.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="mt-4 border-t pt-4 space-y-2">
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block p-3 rounded-lg hover:bg-gray-50"
                >
                  View profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left p-3 rounded-lg hover:bg-gray-50"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            // Logged out -> Sign in / Sign up tiles
            <div>
              <div className="rounded-lg bg-gradient-to-br from-white to-white/60 p-3 mb-4">
                <h4 className="text-lg font-semibold text-gray-800">
                  Welcome to DevTinder
                </h4>
                <p className="text-sm text-gray-500">
                  Create an account or sign in to start swiping and connecting
                  with other developers.
                </p>
              </div>

              <div className="space-y-3">
                <Link
                  href="/signin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="group flex items-center gap-4 p-3 rounded-lg bg-gradient-to-r from-[#FF3D7F] to-[#7C3AED] text-white transition-shadow hover:shadow-lg"
                >
                  <span className="flex items-center justify-center w-10 h-10 rounded-md bg-white/20">
                    <FaSignInAlt className="w-5 h-5" />
                  </span>

                  <div className="flex-1 min-w-0">
                    <div className="font-semibold truncate">Sign in</div>
                    <div className="text-sm text-white/90 truncate">
                      Access your profile, matches & messages
                    </div>
                  </div>

                  <span className="opacity-90">→</span>
                </Link>

                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="group flex items-center gap-4 p-3 rounded-lg border border-gray-100 hover:shadow-sm transition"
                >
                  <span className="flex items-center justify-center w-10 h-10 rounded-md bg-gray-100 text-[#7C3AED]">
                    <FaUserPlus className="w-5 h-5" />
                  </span>

                  <div className="flex-1 min-w-0">
                    <div className="font-semibold truncate">Sign up</div>
                    <div className="text-sm text-gray-500 truncate">
                      Create your developer profile & start connecting
                    </div>
                  </div>

                  <span className="text-gray-400 group-hover:text-gray-600">
                    →
                  </span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
