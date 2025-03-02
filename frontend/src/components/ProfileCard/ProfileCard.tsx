import { useState } from 'react';

interface Profile {
  _id: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  about: string;
  skills: string[];
};

interface ProfileCardProps {
  profile: Profile;
  onLike: (userId: string) => void;
  onDislike: (userId: string) => void;
};

const ProfileCard = ({ profile, onLike, onDislike }: ProfileCardProps) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="flex flex-col max-w-md w-full mx-4 bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Profile Image */}
      <div className="relative aspect-square w-full ">
        <img
          src={imageError ? 'https://geographyandyou.com/images/user-profile.png' : profile?.photoUrl}
          alt={`${profile?.firstName} ${profile?.lastName}`}
          className="w-full h-full object-cover"
          onError={handleImageError}
        />
      </div>

      {/* Profile Content */}
      <div className="p-6 flex flex-col gap-4">
        {/* Name */}
        <h2 className="text-2xl font-bold text-gray-800">
          {profile?.firstName} {profile?.lastName}
        </h2>

        {/* About */}
        <p className="text-gray-600">{profile?.about}</p>

        {/* Skills */}
        {profile?.skills?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {profile?.skills?.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between gap-4 mt-4">
          <button
            onClick={(e) => {
              e.preventDefault();
              onDislike(profile?._id);
            }}
            className="flex-1 py-3 px-6 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Pass
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              onLike(profile?._id);
            }}
            className="flex-1 py-3 px-6 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Like
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;