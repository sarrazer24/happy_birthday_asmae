// filepath: my-react-tailwind-app/my-react-tailwind-app/src/cake.js
import React from 'react';

const Cake = () => {
    const showCake = () => {
        document.querySelector('#cake-holder').classList.add('done');
    };

    return (
        <div id="cake-holder" className="opacity-0 transition-opacity duration-1000">
            <div className="relative inline-block">
                <div className="absolute w-64 h-32 bg-brown-800 rounded-full top-0 left-1/2 transform -translate-x-1/2"></div>
                <div className="absolute w-64 h-32 bg-brown-600 rounded-full top-8 left-1/2 transform -translate-x-1/2"></div>
                <div className="absolute w-64 h-32 bg-brown-400 rounded-full top-16 left-1/2 transform -translate-x-1/2"></div>
                <div className="absolute w-64 h-16 bg-white rounded-full top-2 left-1/2 transform -translate-x-1/2"></div>
                <div className="absolute w-4 h-12 bg-red-600 rounded-md top-0 left-1/2 transform -translate-x-1/2"></div>
                <div className="absolute w-4 h-4 bg-yellow-400 rounded-full top-0 left-1/2 transform -translate-x-1/2 -translate-y-4"></div>
            </div>
            <div className="text-center">
                <h5 className="cake-off text-2xl font-bold">❣ Happy Birthday Dude ❣</h5>
                <p className="cake-off">❤ Wish you best ❤</p>
            </div>
        </div>
    );
};

export default Cake;