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
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [audioLoadError, setAudioLoadError] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const audioRef = useRef(null);

  // Preload audio when component mounts
  useEffect(() => {
    const audio = new Audio();
    audio.preload = "auto";

    // Add loading timeout
    const loadingTimeout = setTimeout(() => {
      if (!audioLoaded) {
        setAudioLoadError(true);
      }
    }, 10000); // 10 second timeout

    const handleCanPlayThrough = () => {
      setAudioLoaded(true);
      audioRef.current = audio;
      clearTimeout(loadingTimeout);
    };

    const handleError = (error) => {
      console.error("Audio loading error:", error);
      setAudioLoadError(true);
      clearTimeout(loadingTimeout);
    };

    // Add loading state listener
    const handleLoadStart = () => {
      setAudioLoaded(false);
      setAudioLoadError(false);
    };

    audio.addEventListener("loadstart", handleLoadStart);
    audio.addEventListener("canplaythrough", handleCanPlayThrough);
    audio.addEventListener("error", handleError);

    // Set source after adding listeners
    audio.src = "/taylor-swift-22-21.mp3";
    audio.load();

    return () => {
      clearTimeout(loadingTimeout);
      audio.removeEventListener("loadstart", handleLoadStart);
      audio.removeEventListener("canplaythrough", handleCanPlayThrough);
      audio.removeEventListener("error", handleError);
      audio.pause();
      audio.src = "";
    };
  }, []);

  // Optimize audio playback
  useEffect(() => {
    if (blown && audioRef.current && audioLoaded) {
      const playAudio = async () => {
        try {
          audioRef.current.currentTime = 0;
          const playPromise = audioRef.current.play();

          if (playPromise !== undefined) {
            await playPromise;
          }
        } catch (error) {
          console.error("Audio playback failed:", error);
          // Single retry with increased delay
          setTimeout(async () => {
            try {
              await audioRef.current.play();
            } catch (retryError) {
              console.error("Final retry failed:", retryError);
            }
          }, 500); // Increased delay to 500ms
        }
      };

      playAudio();
    }
  }, [blown, audioLoaded]);

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
        <h1 className="text-4xl font-bold my-8">Happy 21st Birthday Asmae!!</h1>
        <Cake blown={blown} />
        <AudioStream />
        <DemoAudioDetectionListeners />
        {!blown && (
          <p className="mt-8 text-lg">
            {audioLoaded
              ? "Blow into your microphone to blow out the candle!"
              : "Loading... Please wait"}
          </p>
        )}
        {audioLoadError && (
          <p className="mt-4 text-red-400 text-sm">
            Audio failed to load. The experience might not be complete.
          </p>
        )}
      </div>
    </div>
  );
};

export default App;
