import { FC, useState, useRef, ChangeEvent } from 'react';

interface UserProfile {
  _id: string;
  firstName: string;
  lastName: string;
  emailId: string;
  photoUrl: string;
  about: string;
  skills: string[];
  createdAt: string;
}

interface ProfileProps {
  user: UserProfile;
  onSave: (updatedData: Partial<UserProfile>) => void;
}

const ProfilePage: FC<ProfileProps> = ({ user, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<Partial<UserProfile>>({ ...user });
  const [newSkill, setNewSkill] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedData(prev => ({ ...prev, [name]: value }));
  };

  const handleSkillAdd = () => {
    if (newSkill.trim()) {
      setEditedData(prev => ({
        ...prev,
        skills: [...(prev.skills || []), newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const handleSkillRemove = (index: number) => {
    setEditedData(prev => ({
      ...prev,
      skills: (prev.skills || []).filter((_, i) => i !== index)
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setEditedData(prev => ({ ...prev, photoUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSave(editedData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header Section */}
          <div className="bg-indigo-100 p-6 sm:p-8 relative">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="relative group">
                <img
                  className="h-24 w-24 sm:h-32 sm:w-32 rounded-full object-cover ring-4 ring-white transition-transform duration-200 hover:scale-105"
                  src={editedData.photoUrl || user.photoUrl}
                  alt={`${user.firstName} ${user.lastName}`}
                />
                {isEditing && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      ref={fileInputRef}
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="text-white text-sm bg-indigo-600 px-3 py-1 rounded-md hover:bg-indigo-700"
                    >
                      Change
                    </button>
                  </div>
                )}
              </div>
              
              <div className="text-center sm:text-left flex-1">
                {isEditing ? (
                  <>
                    <input
                      name="firstName"
                      value={editedData.firstName}
                      onChange={handleInputChange}
                      className="text-2xl sm:text-3xl font-bold bg-gray-100 rounded-md px-3 py-1 mb-2 w-full sm:w-auto"
                    />
                    <input
                      name="lastName"
                      value={editedData.lastName}
                      onChange={handleInputChange}
                      className="text-2xl sm:text-3xl font-bold bg-gray-100 rounded-md px-3 py-1 w-full sm:w-auto"
                    />
                  </>
                ) : (
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {editedData.firstName} {editedData.lastName}
                  </h1>
                )}
                <p className="mt-2 text-gray-600">{user.emailId}</p>
                <p className="mt-2 text-sm text-gray-500">
                  Member since {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="absolute top-4 right-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </button>
          </div>

          {/* Editable Content */}
          <div className="grid md:grid-cols-2 gap-8 p-6 sm:p-8">
            {/* About Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">About Me</h2>
              {isEditing ? (
                <textarea
                  name="about"
                  value={editedData.about}
                  onChange={handleInputChange}
                  className="w-full h-32 px-3 py-2 border rounded-md bg-gray-100"
                />
              ) : (
                <p className="text-gray-600 leading-relaxed">
                  {editedData.about || 'No bio available'}
                </p>
              )}
            </div>

            {/* Skills Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Skills</h2>
              {isEditing ? (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      className="flex-1 px-3 py-1 border rounded-md"
                      placeholder="Add new skill"
                    />
                    <button
                      onClick={handleSkillAdd}
                      className="bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {editedData.skills?.map((skill, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-indigo-100 text-indigo-800 rounded-full pl-3 pr-2 py-1"
                      >
                        {skill}
                        <button
                          onClick={() => handleSkillRemove(index)}
                          className="ml-1 text-indigo-600 hover:text-indigo-800"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                editedData.skills?.length ? (
                  <div className="flex flex-wrap gap-2">
                    {editedData.skills.map((skill, index) => (
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
                )
              )}
            </div>
          </div>

          {/* Additional Info */}
          <div className="border-t border-gray-100 p-6 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              {/* ... (existing non-editable fields) */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;