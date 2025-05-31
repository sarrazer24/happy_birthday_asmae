// filepath: my-react-tailwind-app/my-react-tailwind-app/src/audioStream.js
import { useEffect } from "react";
import { createAudioMeter } from "./volume-meter";
import { audioDetection } from "./audioDetection";
import { DEFAULT_PARAMETERS_CONFIGURATION } from "./audioDetectionConfig";

const audioStream = (stream) => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const mediaStreamSource = audioContext.createMediaStreamSource(stream);
  const meter = createAudioMeter(audioContext);

  mediaStreamSource.connect(meter);
  audioDetection(DEFAULT_PARAMETERS_CONFIGURATION, meter); // Pass meter here
};

const AudioStream = () => {
  useEffect(() => {
    const getUserMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        audioStream(stream);
      } catch (error) {
        console.error("Error accessing audio stream:", error);
      }
    };

    getUserMedia();
  }, []);

  return null; // This component does not render anything
};

export default AudioStream;
