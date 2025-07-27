import Image from "next/image";
import Link from "next/link";

interface ConnectionCardProps {
  user: {
    _id: string;
    name: string;
    email: string;
    age: number;
    gender: string;
    photoUrl: string;
    about: string;
    skills: string[];
  };
}

export default function ConnectionCard({ user }: ConnectionCardProps) {
  return (
    <div className="w-full max-w-sm bg-white border rounded-xl shadow-md p-4 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300">
      {/* Profile Image */}
      <div className="w-24 h-24 rounded-full overflow-hidden">
        <Image
          src={user.photoUrl}
          alt={user.name}
          width={96}
          height={96}
          className="object-cover"
        />
      </div>

      {/* Name & Info */}
      <h2 className="mt-3 text-lg font-semibold text-gray-800">{user.name}</h2>
      <p className="text-sm text-gray-600">{user.age} • {user.gender}</p>
      <p className="mt-1 text-sm text-gray-500 truncate max-w-xs">{user.email}</p>

      {/* About */}
      {user.about && (
        <p className="mt-2 text-sm text-gray-700">{user.about}</p>
      )}

      {/* Skills */}
      <div className="flex flex-wrap justify-center gap-2 mt-3">
        {user.skills.map((skill, index) => (
          <span
            key={index}
            className="bg-[#E94057] text-white text-xs font-medium py-1 px-3 rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-4">
        <button className="bg-[#E94057] hover:bg-[#e2233d] text-white text-sm font-medium py-2 px-4 rounded-md transition">
          <Link href={`/chat/${user._id}`}>
            Message
          </Link>
        </button>
        <button className="border border-gray-300 hover:bg-gray-100 text-sm font-medium py-2 px-4 rounded-md transition">
          View Profile
        </button>
      </div>
    </div>
  );
};