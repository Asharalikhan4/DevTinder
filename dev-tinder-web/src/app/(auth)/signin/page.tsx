"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  IoHeart,
  IoMailOutline,
  IoLockClosedOutline,
  IoEyeOutline,
  IoEyeOffOutline,
  IoLogoGoogle,
  IoLogoFacebook,
  IoLogoApple,
  IoArrowBackOutline,
} from 'react-icons/io5';

const SigninPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: handle sign-in logic
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="p-5">
        <button onClick={() => router.back()} className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center">
          <IoArrowBackOutline size={24} className="text-gray-600" />
        </button>
      </div>

      <div className="flex-grow flex flex-col items-center px-5">
        <div className="bg-white rounded-full p-4 shadow-lg">
          <IoHeart size={50} className="text-red-500" />
        </div>
        <h1 className="mt-4 text-3xl font-bold text-gray-800">Dev Tinder</h1>

        <form onSubmit={handleSubmit} className="w-full max-w-md mt-8 bg-white rounded-2xl p-6 shadow-lg space-y-6">
          {/* Email Input */}
          <div className="flex items-center border border-gray-200 rounded-lg bg-gray-100 px-4 h-12">
            <IoMailOutline size={20} className="text-gray-500 mr-3" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-transparent outline-none text-gray-700"
              required
            />
          </div>

          {/* Password Input */}
          <div className="flex items-center border border-gray-200 rounded-lg bg-gray-100 px-4 h-12">
            <IoLockClosedOutline size={20} className="text-gray-500 mr-3" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 bg-transparent outline-none text-gray-700"
              required
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-500">
              {showPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
            </button>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <button
              type="button"
              onClick={() => router.push('/forgot-password')}
              className="text-red-500 text-sm font-medium hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full h-12 bg-red-500 text-white font-bold rounded-lg shadow hover:bg-red-600 transition"
          >
            Sign In
          </button>

          {/* OR Divider */}
          <div className="flex items-center justify-center space-x-2">
            <span className="flex-1 h-px bg-gray-200" />
            <span className="text-gray-500 text-sm">OR</span>
            <span className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Social Buttons */}
          <div className="flex justify-evenly">
            <button type="button" className="w-12 h-12 bg-white rounded-full shadow flex items-center justify-center border border-gray-200">
              <IoLogoGoogle size={24} className="text-red-500" />
            </button>
            <button type="button" className="w-12 h-12 bg-white rounded-full shadow flex items-center justify-center border border-gray-200">
              <IoLogoFacebook size={24} className="text-blue-600" />
            </button>
            <button type="button" className="w-12 h-12 bg-white rounded-full shadow flex items-center justify-center border border-gray-200">
              <IoLogoApple size={24} className="text-gray-800" />
            </button>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500">
            Don&apos;t have an account?{' '}
            <button type="button" onClick={() => router.push('/signup')} className="text-red-500 font-medium hover:underlin cursor-pointer">
              Sign Up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SigninPage;