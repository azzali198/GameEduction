import React, { useState } from 'react';
import './GameIntroPopup.css';

import image1 from '../../assets/images/BtnDemoImgs/albert_einstein.png'
import image2 from '../../assets/images/BtnDemoImgs/albert_einstein_2.png'
import image3 from '../../assets/images/BtnDemoImgs/albert_einstein_3.png'
import image4 from '../../assets/images/BtnDemoImgs/albert_einstein_4.png'
const GameIntroPopup = ({ onClose }) => {
    const [currentStep, setCurrentStep] = useState(0);

    const introSteps = [
        {
            image: image1,
            text: 'Welcome to Physics Game! This is an interactive board game where you can test your physics knowledge while having fun.The  board is divided into different cells, each representing a physics topic.when you click on a cell, a spinnig wheel will be displayed.'
        },
        {
            image: image2,
            text: 'This interactive spinning wheel is designed to make learning physics fun and it contains six topics from the world of physics:Mechanics, Optics, Modern physics, Relativity, Thermodynamics and Magnetism. Each topic corresponds to the number of cells that you can pass through from the highlighted cell.'
        },
        {
            image: image3,
            text: 'After spinning, the selected topic will appear below the wheel.Then you get a quiz related to that topic.Answer physics question correctly to progress and try to reach the finish final cell with the most correct answers!'
        },
        {
            image: image4,
            text: 'Good luck and have fun playing the game! Click "Start Game" to begin.'
        }
    ];

    const handleNext = () => {
        if (currentStep < introSteps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <div className="intro-popup">
            <div className="popup-content">
                <img 
                    src={introSteps[currentStep].image}
                    alt={`Tutorial step ${currentStep + 1}`}
                    className="popup-image"
                />
                <p className="popup-text">
                    {introSteps[currentStep].text}
                </p>
                <div className="popup-buttons">
                    {currentStep > 0 && (
                        <button 
                            className="popup-button prev-button"
                            onClick={handlePrev}
                        >
                            Previous
                        </button>
                    )}
                    {currentStep < introSteps.length - 1 ? (
                        <button 
                            className="popup-button next-button"
                            onClick={handleNext}
                        >
                            Next
                        </button>
                    ) : (
                        <button 
                            className="popup-button start-button"
                            onClick={onClose}
                        >
                            Start Game
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GameIntroPopup;