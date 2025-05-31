import React from "react";

const GiftBox = ({ onClick, isOpen }) => (
  <div
    onClick={onClick}
    className={`cursor-pointer transform transition-transform duration-300 hover:scale-105 ${
      isOpen ? "scale-0" : "scale-100"
    }`}
  >
    <div className="relative w-24 h-24">
      {/* Box lid */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="w-full h-6 bg-pink-500 rounded-t-lg" /> {/* Lid top */}
        <div className="w-full h-2 bg-pink-600" /> {/* Lid bottom */}
      </div>
      {/* Box body */}
      <div className="absolute top-8 left-0 w-full h-16 bg-pink-400 rounded-b-lg" />
      {/* Ribbon */}
      <div className="absolute top-0 left-1/2 w-4 h-24 bg-purple-500 transform -translate-x-1/2" />
      <div className="absolute top-8 left-0 w-24 h-4 bg-purple-500" />
      {/* Bow */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
        <div className="w-8 h-8 bg-purple-400 rounded-full" />
      </div>
      {/* Text */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
        <p className="text-white font-semibold text-lg animate-bounce">
          Open me! 🎁
        </p>
      </div>
    </div>
  </div>
);

export default GiftBox;
