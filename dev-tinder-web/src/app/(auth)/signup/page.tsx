"use client"
import { useState, useCallback, ChangeEvent, FormEvent, KeyboardEvent } from 'react';
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
  IoCloseOutline,
} from 'react-icons/io5';
import { signup } from '@/actions/user';
import toast from 'react-hot-toast';

interface FormState {
  name: string;
  email: string;
  password: string;
  gender: string;
  age: number | '';
  about: string;
  skills: string[];
}

const SignupPage: React.FC = () => {
  const router = useRouter();
  const [signupFormData, setSignupFormData] = useState<FormState>({
    name: '',
    email: '',
    password: '',
    gender: '',
    age: '',
    about: '',
    skills: [],
  });
  const [showPassword, setShowPassword] = useState(false);
  const [skillInput, setSkillInput] = useState('');

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setSignupFormData(prev => ({ ...prev, [name]: name === 'age' ? (value === '' ? '' : Number(value)) : value }));
    },
    [],
  );

  const handleAddSkill = useCallback(() => {
    const skill = skillInput.trim();
    if (!skill || signupFormData.skills.includes(skill) || signupFormData.skills.length >= 10) return;
    setSignupFormData(prev => ({ ...prev, skills: [...prev.skills, skill] }));
    setSkillInput('');
  }, [skillInput, signupFormData.skills]);

  const handleSkillKey = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddSkill();
    }
  }, [handleAddSkill]);

  const handleRemoveSkill = useCallback((skill: string) => {
    setSignupFormData(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }));
  }, []);

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await signup(signupFormData);
      toast.success(res?.message);
    } catch (error: any) {
      toast.error(error)
    }
  }, [signupFormData]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="p-5">
        <button onClick={() => router.back()} className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center">
          <IoArrowBackOutline size={24} className="text-gray-600 cursor-pointer" />
        </button>
      </div>
      <div className="flex-grow flex flex-col items-center px-5">
        <div className="bg-white rounded-full p-4 shadow-lg">
          <IoHeart size={50} className="text-red-500" />
        </div>
        <h1 className="mt-4 text-3xl font-bold text-gray-800">Dev Tinder</h1>
        <p className="mt-2 text-gray-600 text-center">Find your perfect match today</p>

        <form onSubmit={handleSubmit} className="w-full max-w-md mt-8 bg-white rounded-2xl p-6 shadow-lg space-y-6">
          {/* Name */}
          <div className="flex items-center border border-gray-200 rounded-lg bg-gray-100 px-4 h-12">
            <IoPersonOutline size={20} className="text-gray-500 mr-3" />
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              value={signupFormData.name}
              onChange={handleChange}
              className="flex-1 bg-transparent outline-none text-gray-700"
              required
            />
          </div>

          {/* Email */}
          <div className="flex items-center border border-gray-200 rounded-lg bg-gray-100 px-4 h-12">
            <IoMailOutline size={20} className="text-gray-500 mr-3" />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={signupFormData.email}
              onChange={handleChange}
              className="flex-1 bg-transparent outline-none text-gray-700"
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center border border-gray-200 rounded-lg bg-gray-100 px-4 h-12">
            <IoLockClosedOutline size={20} className="text-gray-500 mr-3" />
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={signupFormData.password}
              onChange={handleChange}
              className="flex-1 bg-transparent outline-none text-gray-700"
              required
            />
            <button type="button" onClick={() => setShowPassword(prev => !prev)} className="text-gray-500">
              {showPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
            </button>
          </div>

          {/* Gender */}
          <div className="flex items-center border border-gray-200 rounded-lg bg-gray-100 px-4 h-12">
            <select
              name="gender"
              value={signupFormData.gender}
              onChange={handleChange}
              className="flex-1 bg-transparent outline-none text-gray-700"
              required
            >
              <option value="" disabled>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Age */}
          <div className="flex items-center border border-gray-200 rounded-lg bg-gray-100 px-4 h-12">
            <input
              name="age"
              type="number"
              min={0}
              placeholder="Age"
              value={signupFormData.age}
              onChange={handleChange}
              className="flex-1 bg-transparent outline-none text-gray-700"
              required
            />
          </div>

          {/* About */}
          <div>
            <textarea
              name="about"
              placeholder="Tell us about yourself"
              value={signupFormData.about}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg bg-gray-100 px-4 py-2 outline-none text-gray-700 resize-none"
              rows={4}
            />
          </div>

          {/* Skills */}
          <div>
            <div className="flex items-center border border-gray-200 rounded-lg bg-gray-100 px-4 h-12">
              <input
                type="text"
                placeholder="Add a skill and press Enter"
                value={skillInput}
                onChange={e => setSkillInput(e.target.value)}
                onKeyDown={handleSkillKey}
                className="flex-1 bg-transparent outline-none text-gray-700"
              />
              <button type="button" onClick={handleAddSkill} className="text-gray-500">
                <IoArrowBackOutline size={20} className="transform rotate-180" />
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {signupFormData.skills.map(skill => (
                <span key={skill} className="flex items-center bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
                  {skill}
                  <button type="button" onClick={() => handleRemoveSkill(skill)} className="ml-2 cursor-pointer">
                    <IoCloseOutline size={16} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Terms */}
          <p className="text-xs text-gray-500">
            By signing up, you agree to our{' '}
            <a href="#" className="text-red-500 font-medium">Terms of Service</a> and{' '}
            <a href="#" className="text-red-500 font-medium">Privacy Policy</a>.
          </p>

          {/* Submit */}
          <button type="submit" className="w-full h-12 bg-[#E94057] hover:bg-[#e2233d] text-white font-bold rounded-lg shadow transition">
            Sign Up
          </button>

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