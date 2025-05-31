// filepath: my-react-tailwind-app/my-react-tailwind-app/src/components/Cake.jsx
import React from "react";

const CandleNumber = ({ number, showFlame, color }) => (
  <div className="flex flex-col items-center mx-2">
    {/* Flame directly above the number */}
    {showFlame && (
      <div className="w-4 h-4 bg-gradient-to-t from-yellow-300 via-yellow-100 to-white rounded-full shadow-lg mb-1 animate-pulse" />
    )}
    {/* Number as the candle */}
    <span
      className={`text-4xl font-extrabold ${color} drop-shadow-sm select-none`}
      style={{
        lineHeight: "2.5rem",
        textShadow: "0 2px 8px #f7b6d2, 0 0px 2px #fff6fb",
      }}
    >
      {number}
    </span>
  </div>
);

const Cake = ({ blown }) => (
  <div className="flex flex-col items-center">
    {/* Candles: 2 and 1 as numbers with flames */}
    <div className="relative z-10 flex flex-row items-end mb-2">
      <CandleNumber number={2} showFlame={!blown} color="text-pink-400" />
      <CandleNumber number={1} showFlame={!blown} color="text-purple-300" />
    </div>
    {/* Cake body */}
    <div className="w-40 h-20 bg-gradient-to-b from-pink-100 via-pink-200 to-pink-300 rounded-t-3xl shadow-xl flex flex-col items-center justify-end relative border-4 border-pink-100">
      {/* Sprinkles */}
      <div className="absolute top-3 left-10 w-2 h-2 bg-yellow-300 rounded-full"></div>
      <div className="absolute top-6 left-28 w-2 h-2 bg-blue-300 rounded-full"></div>
      <div className="absolute top-8 left-20 w-2 h-2 bg-green-300 rounded-full"></div>
      <div className="absolute top-4 left-32 w-2 h-2 bg-red-300 rounded-full"></div>
      <div className="absolute top-7 left-24 w-2 h-2 bg-purple-300 rounded-full"></div>
      <div className="absolute top-5 left-16 w-2 h-2 bg-orange-300 rounded-full"></div>
    </div>
    {/* Cake base */}
    <div className="w-44 h-6 bg-pink-700 rounded-b-3xl mt-[-12px] shadow" />
    {/* Message */}
    <div className="text-center mt-8">
      <h5 className="text-2xl font-semibold tracking-wide">
        {blown ? "Happy Birthday, Asmae!" : "Happy 21st Birthday!"}
      </h5>
      <p className="mt-2 text-base text-pink-100">
        {blown
          ? "Wishing you a year as wonderful as you are."
          : "Make a wish and blow out the candles!"}
      </p>
    </div>
  </div>
);

export default Cake;
