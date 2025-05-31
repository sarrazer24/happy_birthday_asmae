# Blowing Out the Birthday Cake Candles with React and Tailwind CSS

This project is a React application that allows users to blow out the candles on a birthday cake using audio detection. The application utilizes Tailwind CSS for styling and includes various components for handling audio input and visual feedback.

## Live Demo

You can see the [LIVE DEMO HERE](https://mohammadshekari.github.io/Birthday-Cake-With-Blowing-Candle/index.html).

<img src="https://github.com/Mohammadshekari/Birthday-Cake-With-Blowing-Candle/blob/main/screenshots/cake-on.jpg?raw=true" width="600">
<img src="https://github.com/Mohammadshekari/Birthday-Cake-With-Blowing-Candle/blob/main/screenshots/cake-off.jpg?raw=true" width="600">

## Installation

1. Clone the repository:

    git clone https://github.com/Mohammadshekari/Birthday-Cake-With-Blowing-Candle.git

2. Navigate to the project directory:

    cd my-react-tailwind-app

3. Install the dependencies:

    npm install

4. Run the development server:

    npm run dev

5. Open your browser and navigate to `http://localhost:3000` to view the application.

## Project Structure

- **public/index.html**: Main HTML entry point that includes the root element for the React application.
- **src/App.jsx**: Main React component that serves as the entry point for the application.
- **src/index.jsx**: Entry point for the React application that renders the App component.
- **src/components/Cake.jsx**: React component rendering the birthday cake using Tailwind CSS.
- **src/styles/index.css**: Imports Tailwind CSS and includes custom styles.
- **src/audioDetection.js**: Implements audio detection logic.
- **src/audioDetectionConfig.js**: Configuration parameters for audio detection.
- **src/audioStream.js**: Handles audio stream from the user's microphone.
- **src/volume-meter.js**: Logic for measuring audio volume.
- **src/demoAudioRecorder.js**: Manages audio recording functionality.
- **src/demoAudioDetectionListeners.js**: Sets up event listeners for audio detection events.
- **src/cake.js**: Logic for displaying and animating the birthday cake.

## Tailwind CSS

This project uses Tailwind CSS for styling. You can customize the default settings in the `tailwind.config.js` file.

## License

This project is licensed under the MIT License.