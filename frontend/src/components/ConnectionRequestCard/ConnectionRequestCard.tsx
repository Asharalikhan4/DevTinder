import React from 'react';

type Sender = {
  _id: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  about: string;
  skills: string[];
};

export type ConnectionRequest = {
  _id: string;
  senderId: Sender;
  status: string;
  createdAt: string;
};

interface ConnectionRequestCardProps {
  request: ConnectionRequest;
  reviewRequest: (status: string, requestId: string) => void;
}

const getTimeAgo = (dateStr: string): string => {
  const now = new Date();
  const created = new Date(dateStr);
  const diffMs = now.getTime() - created.getTime();
  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else {
    return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
  }
};

const ConnectionRequestCard: React.FC<ConnectionRequestCardProps> = ({ request, reviewRequest }) => {
  const timeAgo = getTimeAgo(request.createdAt);

  return (
    <div className="max-w-md w-full bg-white shadow-md rounded-lg p-4 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
      <img
        className="w-20 h-20 rounded-full object-cover"
        src={request.senderId.photoUrl}
        alt={`${request.senderId.firstName} ${request.senderId.lastName}`}
      />
      <div className="flex-1">
        <h2 className="text-xl font-bold">
          {request.senderId.firstName} {request.senderId.lastName}
        </h2>
        <p className="text-gray-600">{request.senderId.about}</p>
        <div className="mt-2 text-gray-500 text-sm">Sent {timeAgo}</div>
        <div className="mt-2">
          <span className="text-gray-700 font-medium">Skills: </span>
          {request.senderId.skills.join(', ')}
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <button
          onClick={() => reviewRequest("accepted", request._id)}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
        >
          Accept
        </button>
        <button
          onClick={() => reviewRequest("rejected", request._id)}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default ConnectionRequestCard;
