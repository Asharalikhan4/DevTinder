import CustomButton from '../../components/CustomButton';
import { FC } from 'react';
import { useSelector } from 'react-redux';

const ProfilePage: FC = () => {

    const user = useSelector((store: any) => store?.user) || {};

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* Profile Header */}
                    <div className="flex flex-col md:flex-row gap-2 md:justify-between md:items-center bg-indigo-100 p-6 sm:p-8">
                        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                            <img
                                className="h-24 w-24 sm:h-32 sm:w-32 rounded-full object-cover ring-4 ring-white transition-transform duration-200 hover:scale-105"
                                src={user?.photoUrl}
                                alt={`${user?.firstName} ${user?.lastName}`}
                            />
                            <div className="text-center sm:text-left">
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                                    {user?.firstName} {user?.lastName}
                                </h1>
                                <p className="mt-2 text-gray-600">{user.emailId}</p>
                                <p className="mt-2 text-sm text-gray-500">
                                    Member since {new Date(user?.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                        <CustomButton>
                            Edit Profile
                        </CustomButton>
                    </div>

                    {/* Profile Content */}
                    <div className="grid md:grid-cols-2 gap-8 p-6 sm:p-8">
                        {/* About Section */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-gray-800">About Me</h2>
                            <p className="text-gray-600 leading-relaxed">
                                {user?.about || 'No bio available'}
                            </p>
                        </div>

                        {/* Skills Section */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-gray-800">Skills</h2>
                            {user?.skills?.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {user?.skills?.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500">No skills added yet</p>
                            )}
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="border-t border-gray-100 p-6 sm:p-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            <div className="space-y-1">
                                <p className="text-gray-500">First Name</p>
                                <p className="font-medium text-gray-900">{user.firstName}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-gray-500">Last Name</p>
                                <p className="font-medium text-gray-900">{user.lastName}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-gray-500">Email Address</p>
                                <p className="font-medium text-gray-900 break-all">{user.emailId}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-gray-500">User ID</p>
                                <p className="font-medium text-gray-900 break-all">{user._id}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;