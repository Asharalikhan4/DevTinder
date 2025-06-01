"use client"

import { useState, useRef } from 'react';
import { IoHeart, IoCloseOutline } from 'react-icons/io5';

const users = [
  {
    _id: "1",
    name: "Sophia",
    age: 26,
    gender: "Female",
    photoUrl: "https://randomuser.me/api/portraits/women/10.jpg",
    about: "Frontend developer who loves React and design systems.",
    skills: ["React", "TailwindCSS", "Figma"]
  },
  {
    _id: "2",
    name: "Ethan",
    age: 30,
    gender: "Male",
    photoUrl: "https://randomuser.me/api/portraits/men/20.jpg",
    about: "Backend engineer passionate about Node.js and databases.",
    skills: ["Node.js", "MongoDB", "Express"]
  },
  // Add more profiles here
];

export default function CustomTinderCardDeck() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const cardRef = useRef(null);
  const startX = useRef(null);

  const handleTouchStart = (e: any) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: any) => {
    const endX = e.changedTouches[0].clientX;
    if (startX.current !== null) {
      const diffX = endX - startX.current;
      if (diffX > 100) triggerSwipe('right');
      else if (diffX < -100) triggerSwipe('left');
    }
  };

  const triggerSwipe = (direction: any) => {
    setSwipeDirection(direction);
    setTimeout(() => {
      setSwipeDirection(null);
      setCurrentIndex((prev) => (prev + 1) % users.length);
    }, 300);
  };

  const user = users[currentIndex];
  const { name, about, age, gender, photoUrl, skills } = user;

  return (
    <div>
      {/* <div className="mb-6 text-center">
        <div className="bg-white rounded-full p-4 shadow-lg inline-block">
          <IoHeart size={50} className="text-red-500" />
        </div>
        <h1 className="mt-4 text-3xl font-bold text-gray-800">Dev Tinder</h1>
        <p className="mt-2 text-gray-600">Swipe to connect with other developers</p>
      </div> */}

      <div
        ref={cardRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className={`relative w-full max-w-sm sm:max-w-md md:max-w-lg h-[500px] md:h-[550px] bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col items-center p-6 transform transition-transform duration-300 ease-in-out
          ${swipeDirection === 'left' ? '-translate-x-[150%] rotate-[-12deg]' : ''}
          ${swipeDirection === 'right' ? 'translate-x-[150%] rotate-[12deg]' : ''}`}
      >
        <img
          src={photoUrl}
          alt={name}
          className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-white shadow-md"
        />
        <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-600 mt-1">Age: <span className="font-medium">{age}</span></p>
        <p className="text-sm text-gray-600">Gender: <span className="font-medium">{gender}</span></p>
        <p className="text-sm text-gray-600 text-center mt-3 mb-4 px-2 line-clamp-3 font-medium">{about}</p>

        <div className="flex flex-wrap justify-center gap-2">
          {skills?.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm shadow font-medium"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="flex justify-center gap-10 mt-20">
          <button
            onClick={() => triggerSwipe('left')}
            className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 shadow-lg"
          >
            <IoCloseOutline size={28} />
          </button>
          <button
            onClick={() => triggerSwipe('right')}
            className="w-14 h-14 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg"
          >
            <IoHeart size={28} />
          </button>
        </div>
      </div>

    </div>
  );
}
