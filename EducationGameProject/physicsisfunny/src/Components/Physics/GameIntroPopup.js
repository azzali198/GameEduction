import React, { useState } from 'react';
import './GameIntroPopup.css';

const GameIntroPopup = ({ onClose }) => {
    const [currentStep, setCurrentStep] = useState(0);

    const introSteps = [
        {
            image: '/path/to/intro1.png',
            text: 'Welcome to Physics Game! This is an interactive board game where you can test your physics knowledge while having fun.'
        },
        {
            image: '/path/to/intro2.png',
            text: 'Roll the dice by clicking on the highlighted cell to move forward. Each cell represents a different physics topic.'
        },
        {
            image: '/path/to/intro3.png',
            text: 'Answer physics questions correctly to progress. Try to reach the finish line with the most correct answers!'
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