"use client"
import { useState, useCallback, ChangeEvent, FormEvent, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  IoArrowBackOutline,
  IoPersonOutline,
  IoMailOutline,
  IoCalendarOutline,
  IoTransgenderOutline,
  IoSaveOutline,
  IoCloseOutline
} from 'react-icons/io5';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/authContext';

interface FormState {
  name: string;
  email: string;
  age: number | '';
  gender: string;
  about: string;
  skills: string[];
}

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();

  // initialize form data from user
  const initialForm = useMemo<FormState>(
    () => ({
      name: user?.name || '',
      email: user?.email || '',
      age: user?.age || '',
      gender: user?.gender || '',
      about: user?.about || '',
      skills: user?.skills || [],
    }),
    [user]
  );

  const [formData, setFormData] = useState<FormState>(initialForm);
  const [skillInput, setSkillInput] = useState('');

  // compare formData to initial to detect changes
  const isChanged = useMemo(
    () => JSON.stringify(formData) !== JSON.stringify(initialForm),
    [formData, initialForm]
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: name === 'age' ? (value === '' ? '' : Number(value)) : value,
      }));
    },
    []
  );

  const handleAddSkill = useCallback(() => {
    const skill = skillInput.trim();
    if (!skill || formData.skills.includes(skill) || formData.skills.length >= 10) return;
    setFormData(prev => ({ ...prev, skills: [...prev.skills, skill] }));
    setSkillInput('');
  }, [skillInput, formData.skills]);

  const handleSkillKey = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault();
        handleAddSkill();
      }
    },
    [handleAddSkill]
  );

  const handleRemoveSkill = useCallback((skill: string) => {
    setFormData(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }));
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (!isChanged) return;
      try {
        // await updateUser(user._id, formData);
        toast.success('Profile updated successfully');
      } catch (err: any) {
        toast.error(err?.message || 'Failed to update profile');
      }
    },
    [formData, user?._id, isChanged]
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="p-5">
        <button onClick={() => router.back()} className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center">
          <IoArrowBackOutline size={24} className="text-gray-600" />
        </button>
      </div>
      <div className="flex-grow flex flex-col items-center px-5">
        <div className="bg-primary-100 rounded-full p-1 shadow-lg">
          <img src={user?.photoUrl} alt="Avatar" className="w-32 h-32 rounded-full object-cover" />
        </div>
        <h1 className="mt-4 text-3xl font-bold text-primary-600">Your Profile</h1>

        <form onSubmit={handleSubmit} className="w-full max-w-lg mt-8 bg-white rounded-2xl p-6 shadow-lg space-y-6">
          {/* Name */}
          <div className="flex items-center border border-gray-200 rounded-lg px-4 h-12 bg-white">
            <IoPersonOutline size={20} className="text-primary-500 mr-3" />
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="flex-1 outline-none text-gray-700"
              required
            />
          </div>

          {/* Email */}
          <div className="flex items-center border border-gray-200 rounded-lg px-4 h-12 bg-white">
            <IoMailOutline size={20} className="text-primary-500 mr-3" />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="flex-1 outline-none text-gray-700"
              required
            />
          </div>

          {/* Gender & Age */}
          <div className="flex space-x-4">
            <div className="flex items-center border border-gray-200 rounded-lg px-4 h-12 flex-1 bg-white">
              <IoTransgenderOutline size={20} className="text-primary-500 mr-3" />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="flex-1 outline-none text-gray-700"
                required
              >
                <option value="" disabled>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="flex items-center border border-gray-200 rounded-lg px-4 h-12 w-24 bg-white">
              <IoCalendarOutline size={20} className="text-primary-500 mr-3" />
              <input
                name="age"
                type="number"
                min={0}
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
                className="flex-1 outline-none text-gray-700"
                required
              />
            </div>
          </div>

          {/* About */}
          <textarea
            name="about"
            placeholder="About Yourself"
            value={formData.about}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-4 py-2 outline-none text-gray-700 resize-none"
            rows={4}
          />

          {/* Skills */}
          <div>
            <div className="flex items-center border border-gray-200 rounded-lg px-4 h-12 bg-white">
              <input
                type="text"
                placeholder="Add a skill and press Enter"
                value={skillInput}
                onChange={e => setSkillInput(e.target.value)}
                onKeyDown={handleSkillKey}
                className="flex-1 outline-none text-gray-700"
              />
              <button type="button" onClick={handleAddSkill} className="text-primary-500 font-bold">
                +
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.skills.map(skill => (
                <span key={skill} className="flex items-center bg-primary-100 text-primary-600 px-3 py-1 rounded-full text-sm">
                  {skill}
                  <button type="button" onClick={() => handleRemoveSkill(skill)} className="ml-2">
                    <IoCloseOutline size={16} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Update Button */}
          <button
            type="submit"
            disabled={!isChanged}
            className={`w-full h-12 font-bold rounded-lg shadow flex items-center justify-center transition 
              ${isChanged ? 'cursor-pointer bg-[#E94057] hover:bg-[#e2233d]' : 'bg-gray-300 hover:bg-gray-300 cursor-not-allowed'} text-white`}
          >
            <IoSaveOutline size={20} className="mr-2" />
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
