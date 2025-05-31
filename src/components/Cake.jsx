// filepath: my-react-tailwind-app/my-react-tailwind-app/src/components/Cake.jsx
import React from "react";

const Cake = ({ blown }) => (
  <div className="flex flex-col items-center">
    {/* Candle */}
    <div className="relative z-10 flex flex-col items-center mb-2">
      {/* Enhanced Flame */}
      {!blown && (
        <div className="relative w-4 h-6 mb-1">
          {/* Outer flame glow */}
          <div className="absolute inset-0 bg-yellow-100 rounded-full opacity-30 animate-pulse"></div>
          {/* Main flame */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-orange-400 via-yellow-300 to-yellow-100 
                         rounded-full transform origin-bottom animate-flicker"
          ></div>
          {/* Inner flame core */}
          <div
            className="absolute inset-1 bg-gradient-to-t from-white via-yellow-200 to-transparent 
                         rounded-full transform origin-bottom animate-flicker 
                         [animation-delay:-0.5s]"
          ></div>
          {/* Hot spot */}
          <div
            className="absolute inset-2 top-3 bg-blue-50 rounded-full opacity-50 
                         animate-pulse [animation-duration:1s]"
          ></div>
        </div>
      )}
      {/* Candle body */}
      <div className="w-2 h-10 bg-gradient-to-b from-pink-400 to-pink-600 rounded-full"></div>
    </div>
    {/* Cake body */}
    <div className="w-32 h-20 bg-gradient-to-b from-pink-200 to-pink-400 rounded-t-2xl shadow-lg flex flex-col items-center justify-end relative">
      {/* Sprinkles */}
      <div className="absolute top-2 left-8 w-2 h-2 bg-yellow-400 rounded-full"></div>
      <div className="absolute top-4 left-20 w-2 h-2 bg-blue-400 rounded-full"></div>
      <div className="absolute top-6 left-16 w-2 h-2 bg-green-400 rounded-full"></div>
      <div className="absolute top-3 left-24 w-2 h-2 bg-red-400 rounded-full"></div>
    </div>
    {/* Cake base */}
    <div className="w-36 h-4 bg-pink-700 rounded-b-2xl mt-[-8px] shadow-md"></div>
    {/* Message */}
    <div className="text-center mt-8">
      <h5 className="text-2xl font-bold">
        {blown ? "🎉 Happy Birthday! 🎉" : "❣ Happy Birthday ❣"}
      </h5>
      <p>
        {blown
          ? "Wishing you a year filled with laughter, love, and all your dreams coming true, Asmae!"
          : "❤ Wish you the best ❤"}
      </p>
    </div>
  </div>
);

export default Cake;
