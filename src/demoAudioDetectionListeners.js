// filepath: my-react-tailwind-app/my-react-tailwind-app/src/demoAudioDetectionListeners.js
import React from 'react';

const dB = (signal) => -Math.round(20 * Math.log10(1 / signal));

const hystogramLine = (value) => {
  const maxCharsperLine = 200;
  const valueInChars = maxCharsperLine * value;
  const char = '█';
  return char.repeat(valueInChars);
};

const showConfiguration = () => {
  // Configuration display logic can be added here if needed
};

const DemoAudioDetectionListeners = () => {
  React.useEffect(() => {
    const signalHandler = (event) => {
      const volume = event.detail.volume.toFixed(9);
      const timestamp = event.detail.timestamp;
      const items = event.detail.items.toString().padEnd(3);
      const dBV = dB(event.detail.volume);
      const line = hystogramLine(volume);
      console.log('dbV', dBV);
      if (dBV >= -17) {
        console.log('Happy Birthday');
        // Call function to show cake or trigger animation
      }
      console.log(`signal  ${timestamp} ${items} ${volume} ${dBV} ${line}`);
    };

    const silenceHandler = (event) => {
      const volume = event.detail.volume.toFixed(9);
      const timestamp = event.detail.timestamp;
      const items = event.detail.items.toString().padEnd(3);
      const dBV = dB(event.detail.volume);
      console.log(`silence ${timestamp} ${items} ${volume} ${dBV}`);
    };

    const muteHandler = (event) => {
      const volume = event.detail.volume.toFixed(9);
      const timestamp = event.detail.timestamp;
      const dBV = dB(event.detail.volume);
      console.log(`mute    ${timestamp} ${volume} ${dBV}`);
    };

    const prespeechstartHandler = (event) => {
      const timestamp = event.detail.timestamp;
      console.log(`%cPRE SPEECH START   ${timestamp}`, 'color:blue');
      // Call function to restart recording
    };

    const speechstartHandler = (event) => {
      console.log('%cSPEECH START', 'color:greenyellow');
      // Call function to start recording
    };

    const speechstopHandler = (event) => {
      const duration = event.detail.duration;
      console.log('%cSPEECH STOP', 'color:lime');
      console.log(`Total Duration in msecs  : ${duration}`);
      // Call function to stop recording
    };

    const speechabortHandler = (event) => {
      const abort = event.detail.abort;
      const duration = event.detail.duration;
      console.log('%cSPEECH ABORT', 'color:red');
      console.log(`Abort reason             : ${abort}`);
      console.log(`Total Duration in msecs  : ${duration}`);
      // Call function to abort recording
    };

    const mutedmicHandler = () => {
      console.log('%cMICROPHONE MUTED', 'color:red');
    };

    const unmutedmicHandler = () => {
      console.log('%cMICROPHONE UNMUTED', 'color:green');
    };

    document.addEventListener('signal', signalHandler);
    document.addEventListener('silence', silenceHandler);
    document.addEventListener('mute', muteHandler);
    document.addEventListener('prespeechstart', prespeechstartHandler);
    document.addEventListener('speechstart', speechstartHandler);
    document.addEventListener('speechstop', speechstopHandler);
    document.addEventListener('speechabort', speechabortHandler);
    document.addEventListener('mutedmic', mutedmicHandler);
    document.addEventListener('unmutedmic', unmutedmicHandler);

    return () => {
      document.removeEventListener('signal', signalHandler);
      document.removeEventListener('silence', silenceHandler);
      document.removeEventListener('mute', muteHandler);
      document.removeEventListener('prespeechstart', prespeechstartHandler);
      document.removeEventListener('speechstart', speechstartHandler);
      document.removeEventListener('speechstop', speechstopHandler);
      document.removeEventListener('speechabort', speechabortHandler);
      document.removeEventListener('mutedmic', mutedmicHandler);
      document.removeEventListener('unmutedmic', unmutedmicHandler);
    };
  }, []);

  return null; // This component does not render anything
};

export default DemoAudioDetectionListeners;