// filepath: my-react-tailwind-app/my-react-tailwind-app/src/audioDetection.js

import { createAudioMeter } from "./volume-meter";
import {
  MAX_INTERSPEECH_SILENCE_MSECS,
  SAMPLE_POLLING_MSECS,
  MIN_SIGNAL_DURATION,
  MIN_AVERAGE_SIGNAL_VOLUME,
} from "./audioDetectionConfig";

let volumeState = "mute";
let speechStarted = false;
let silenceItems = 0;
let signalItems = 0;
let speechstartTime;
let prerecordingItems = 0;
let speechVolumesList = [];

const average = (array) => array.reduce((a, b) => a + b) / array.length;

const averageSignal = () => average(speechVolumesList).toFixed(4);

const maxSilenceItems = Math.round(
  MAX_INTERSPEECH_SILENCE_MSECS / SAMPLE_POLLING_MSECS
);

const dispatchEvent = (eventName, eventData) =>
  document.dispatchEvent(new CustomEvent(eventName, eventData));

function mute(timestamp, duration, meter) {
  const eventData = {
    detail: {
      event: "mute",
      volume: meter.volume,
      timestamp,
      duration,
    },
  };

  dispatchEvent("mute", eventData);

  if (volumeState !== "mute") {
    dispatchEvent("mutedmic", eventData);
    volumeState = "mute";
  }
}

function signal(timestamp, duration, meter) {
  silenceItems = 0;

  const eventData = {
    detail: {
      event: "signal",
      volume: meter.volume,
      timestamp,
      duration,
      items: ++signalItems,
    },
  };

  if (!speechStarted) {
    dispatchEvent("speechstart", eventData);
    speechstartTime = timestamp;
    speechStarted = true;
    speechVolumesList = [];
  }

  speechVolumesList.push(meter.volume);
  dispatchEvent("signal", eventData);

  if (volumeState === "mute") {
    dispatchEvent("unmutedmic", eventData);
    volumeState = "signal";
  }
}

function silence(timestamp, duration, meter) {
  signalItems = 0;

  const eventData = {
    detail: {
      event: "silence",
      volume: meter.volume,
      timestamp,
      duration,
      items: ++silenceItems,
    },
  };

  dispatchEvent("silence", eventData);

  if (volumeState === "mute") {
    dispatchEvent("unmutedmic", eventData);
    volumeState = "silence";
  }

  if (speechStarted && silenceItems === maxSilenceItems) {
    const signalDuration = duration - MAX_INTERSPEECH_SILENCE_MSECS;
    const averageSignalValue = averageSignal();

    if (signalDuration < MIN_SIGNAL_DURATION) {
      eventData.detail.abort = `signal duration (${signalDuration}) < MIN_SIGNAL_DURATION (${MIN_SIGNAL_DURATION})`;
      dispatchEvent("speechabort", eventData);
    } else if (averageSignalValue < MIN_AVERAGE_SIGNAL_VOLUME) {
      eventData.detail.abort = `signal average volume (${averageSignalValue}) < MIN_AVERAGE_SIGNAL_VOLUME (${MIN_AVERAGE_SIGNAL_VOLUME})`;
      dispatchEvent("speechabort", eventData);
    } else {
      dispatchEvent("speechstop", eventData);
    }

    speechStarted = false;
  }
}

function sampleThresholdsDecision(muteVolume, speakingMinVolume, meter) {
  const timestamp = Date.now();
  const duration = timestamp - speechstartTime;

  if (meter.volume < muteVolume) {
    mute(timestamp, duration, meter);
  } else if (meter.volume > speakingMinVolume) {
    signal(timestamp, duration, meter);
  } else {
    silence(timestamp, duration, meter);
  }
}

function prerecording(prespeechstartMsecs, timeoutMsecs, meter) {
  ++prerecordingItems;

  const eventData = {
    detail: {
      volume: meter.volume,
      timestamp: Date.now(),
      items: prerecordingItems,
    },
  };

  if (prerecordingItems * timeoutMsecs >= prespeechstartMsecs) {
    if (!speechStarted) {
      dispatchEvent("prespeechstart", eventData);
    }
    prerecordingItems = 0;
  }
}

function audioDetection(config, meter) {
  setTimeout(() => {
    prerecording(config.prespeechstartMsecs, config.timeoutMsecs, meter);

    if (config.recordingEnabled) {
      sampleThresholdsDecision(
        config.muteVolume,
        config.speakingMinVolume,
        meter
      );
    }

    audioDetection(config, meter);
  }, config.timeoutMsecs);
}

export { audioDetection };
