// filepath: my-react-tailwind-app/my-react-tailwind-app/src/demoAudioRecorder.js
import React, { useState, useEffect } from 'react';

const DemoAudioRecorder = () => {
  const [recorder, setRecorder] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    const initRecorder = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (event) => {
        setAudioBlob(event.data);
      };

      setRecorder(mediaRecorder);
    };

    initRecorder();

    return () => {
      if (recorder) {
        recorder.stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startRecording = () => {
    if (recorder) {
      recorder.start();
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (recorder) {
      recorder.stop();
      setIsRecording(false);
    }
  };

  const playAudio = () => {
    if (audioBlob) {
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };

  return (
    <div>
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      <button onClick={playAudio} disabled={!audioBlob}>
        Play Audio
      </button>
    </div>
  );
};

export default DemoAudioRecorder;