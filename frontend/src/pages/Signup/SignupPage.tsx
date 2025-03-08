import { useState, FC, ChangeEvent } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/slices/userSlice";
import { Link, useNavigate } from "react-router";
import CustomButton from "../../components/CustomButton";

interface FormDataTypes {
    firstName: string;
    lastName: string;
    emailId: string;
    password: string;
    photoUrl: string;
    about: string;
    skills: string[];
};

const SignupPage: FC = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<FormDataTypes>({
        firstName: "",
        lastName: "",
        emailId: "",
        password: "",
        photoUrl: "",
        about: "",
        skills: []
    });
    const [skillInput, setSkillInput] = useState<string>("");

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle changes for the skill input field
    const handleSkillInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSkillInput(e.target.value);
    };

    // Add a skill to the skills array
    const addSkill = () => {
        if (skillInput.trim() !== "") {
            setFormData(prev => ({
                ...prev,
                skills: [...prev.skills, skillInput.trim()],
            }));
            setSkillInput("");
        }
    };

    // Remove a skill from the skills array
    const removeSkill = (skillToRemove: string) => {
        setFormData(prev => ({
            ...prev,
            skills: prev.skills.filter(skill => skill !== skillToRemove),
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            const response = await axios.post(`${process.env.BASE_URL}/user/signup`, formData, {
                withCredentials: true
            });
            dispatch(addUser(response?.data?.user));
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-opacity-50 px-4 sm:px-0">
            <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="flex gap-x-2 mb-4">
                        <div>
                            <label
                                htmlFor="firstname"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                First Name
                            </label>
                            <input
                                name="firstName"
                                type="test"
                                placeholder="Ashar"
                                value={formData?.firstName}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="lastname"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Last Name
                            </label>
                            <input
                                name="lastName"
                                type="test"
                                placeholder="Ali Khan"
                                value={formData?.lastName}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="emailId"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Email
                        </label>
                        <input
                            name="emailId"
                            type="email"
                            placeholder="you@example.com"
                            value={formData?.emailId}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Password
                        </label>
                        <input
                            name="password"
                            type="password"
                            placeholder="********"
                            value={formData?.password}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="photoUrl"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            PhotoUrl
                        </label>
                        <input
                            name="photoUrl"
                            type="photoUrl"
                            placeholder="you@example.com"
                            value={formData?.photoUrl}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="about"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            About
                        </label>
                        <textarea
                            name="about"
                            placeholder="you@example.com"
                            value={formData?.about}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="skills" className="block text-gray-700 text-sm font-bold mb-2">Skills</label>
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                placeholder="Add a skill"
                                value={skillInput}
                                onChange={handleSkillInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="button"
                                onClick={addSkill}
                                className="bg-indigo-600 text-white px-4 py-2 rounded cursor-pointer"
                            >
                                Add
                            </button>
                        </div>
                        {/* Display skills as tags */}
                        <div className="mt-2 flex flex-wrap gap-2">
                            {formData?.skills?.map((skill, index) => (
                                <div key={index} className="bg-indigo-600 px-2 py-1 rounded flex items-center">
                                    <span className="text-white">{skill}</span>
                                    <button
                                        type="button"
                                        onClick={() => removeSkill(skill)}
                                        className="ml-2 text-gray-400 cursor-pointer"
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <CustomButton type="submit" className="w-full">Sign Up</CustomButton>
                    </div>
                </form>
                <div className="text-center mt-2 block text-gray-700 text-sm font-bold mb-2">Already have an account? <Link to={"/signin"} className="text-indigo-600">Sign In</Link></div>
            </div>
        </div>
    );
};

export default SignupPage;
