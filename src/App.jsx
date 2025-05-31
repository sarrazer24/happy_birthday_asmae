// filepath: my-react-tailwind-app/my-react-tailwind-app/src/App.jsx
import React, { useState, useEffect, useRef } from "react";
import Cake from "./components/Cake";
import "./styles/index.css";
import "./styles/galaxy.css";
import AudioStream from "./audioStream";
import DemoAudioDetectionListeners from "./demoAudioDetectionListeners";
import Confetti from "react-confetti";

const App = () => {
  const [blown, setBlown] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const audioRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleBlow = () => setBlown(true);

    // Only blow out the candle on a valid "speechstop" (sustained burst)
    const speechStopHandler = () => {
      handleBlow();
    };

    document.addEventListener("speechstop", speechStopHandler);
    return () => document.removeEventListener("speechstop", speechStopHandler);
  }, []);

  // Play Taylor Swift "22" (turning 21) clip when blown becomes true
  useEffect(() => {
    if (blown && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  }, [blown]);

  return (
    <div className="bg-gray-800 text-white text-center min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <div className="galaxy-bg">
        <div className="stars">
          {[...Array(80)].map((_, i) => {
            const size = Math.random() * 2 + 1;
            const left = Math.random() * 100;
            const duration = Math.random() * 8 + 11; // Changed from 6 to 11 to add 5 seconds
            const delay = Math.random() * 8;
            return (
              <div
                key={i}
                className="star"
                style={{
                  left: `${left}%`,
                  top: `-${size * 2}px`,
                  width: `${size}px`,
                  height: `${size}px`,
                  animationDuration: `${duration}s`,
                  animationDelay: `${delay}s`,
                }}
              />
            );
          })}
        </div>
      </div>
      {blown && (
        <Confetti
          width={dimensions.width}
          height={dimensions.height}
          numberOfPieces={300}
          recycle={false}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 50,
            pointerEvents: "none",
          }}
        />
      )}
      <div
        className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white text-center"
        style={{ textShadow: "0 2px 8px #000, 0 0px 2px #1a237e" }}
      >
        {/* Taylor Swift "22" - "it's supposed to be fun turning 21" */}
        <audio ref={audioRef} src="/taylor-swift-22-21.mp3" />
        <h1 className="text-4xl font-bold my-8">Happy 21st Birthday Asmae!!</h1>
        <Cake blown={blown} />
        <AudioStream />
        <DemoAudioDetectionListeners />
        {!blown && (
          <p className="mt-8 text-lg">
            Blow into your microphone to blow out the candle!
          </p>
        )}
      </div>
    </div>
  );
};

export default App;
