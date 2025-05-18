"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  IoArrowBackOutline,
  IoHeart,
  IoPersonOutline,
  IoMailOutline,
  IoLockClosedOutline,
  IoEyeOutline,
  IoEyeOffOutline,
  IoLogoGoogle,
  IoLogoFacebook,
  IoLogoApple,
} from 'react-icons/io5';

const SignupPage: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: handle signup logic
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
        <p className="mt-2 text-gray-600 text-center">Find your perfect match today</p>

        <form onSubmit={handleSubmit} className="w-full max-w-md mt-8 bg-white rounded-2xl p-6 shadow-lg space-y-6">
          {/* Name Input */}
          <div className="flex items-center border border-gray-200 rounded-lg bg-gray-100 px-4 h-12">
            <IoPersonOutline size={20} className="text-gray-500 mr-3" />
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 bg-transparent outline-none text-gray-700"
              required
            />
          </div>

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

          {/* Terms */}
          <p className="text-xs text-gray-500">
            By signing up, you agree to our{' '}
            <a href="#" className="text-red-500 font-medium">Terms of Service</a> and{' '}
            <a href="#" className="text-red-500 font-medium">Privacy Policy</a>.
          </p>

          {/* Sign Up Button */}
          <button type="submit" className="w-full h-12 bg-red-500 text-white font-bold rounded-lg shadow hover:bg-red-600 transition">
            Sign Up
          </button>

          {/* OR Divider */}
          <div className="flex items-center justify-center space-x-2">
            <span className="flex-1 h-px bg-gray-200"></span>
            <span className="text-gray-500 text-sm">OR</span>
            <span className="flex-1 h-px bg-gray-200"></span>
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
            Already have an account?{' '}
            <button type="button" onClick={() => router.push('/signin')} className="text-red-500 font-medium cursor-pointer">
              Sign In
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
