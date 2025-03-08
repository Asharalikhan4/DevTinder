import React, { FC, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/slices/userSlice";
import { Link, useNavigate } from "react-router";
import CustomButton from "../../components/CustomButton";

const SigninPage: FC = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [emailId, setEmailId] = useState<string>("ashar.khan@gmail.com");
    const [password, setPassword] = useState<string>("asharAliKhan01+");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            const response = await axios.post(`${process.env.BASE_URL}/user/signin`, {
                emailId,
                password
            },{
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
                <h2 className="text-2xl font-semibold mb-6 text-center">Sign In</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={emailId}
                            onChange={(e) => setEmailId(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <CustomButton type="submit" className="w-full">Sign In</CustomButton>
                    </div>
                </form>
                <div className="text-center mt-2 block text-gray-700 text-sm font-bold mb-2">Don't have an account? <Link to={"/signup"} className="text-indigo-600">Sign Up</Link></div>
            </div>
        </div>
    );
};

export default SigninPage;
