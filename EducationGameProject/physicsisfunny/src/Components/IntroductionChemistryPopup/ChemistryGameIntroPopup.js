import React, { useState } from 'react';
import './ChemistryGameIntroPopup.css';

import image1 from '../../assets/images/BtnDemoImgs/albert_einstein_1_Chemistry.png'
import image2 from '../../assets/images/BtnDemoImgs/albert_einstein_2_Chemistry.png'
import image3 from '../../assets/images/BtnDemoImgs/albert_einstein_3_Chemistry.png'
import image4 from '../../assets/images/BtnDemoImgs/albert_einstein_4.png'
const ChemistryGameIntroPopup = ({ onClose }) => {
    const [currentStep, setCurrentStep] = useState(0);

    const introSteps = [
        {
            image: image1,
            text: 'Welcome to Chemistry Game! In this game, you will learn chemistry by building molecules. Your goal is to find the correct chemical formula for a given chemical product based on its definition.'
        },
        {
            image: image2,
            text: 'For each round, you will see a definition describing a chemical product. Below the definition, a visual shape will appear representing the molecule you need to build.'
        },
        {
            image: image3,
            text: 'Use the periodic table to drag and drop the correct atoms into the highlighted positions in the shape, composing the chemical formula that matches the definition.'
        },
        {
            image: image4,
            text: 'If you build the correct molecule, you score points and move to the next challenge. Try to solve as many as you can! Click "Start Game" to begin your chemistry adventure.'
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

export default ChemistryGameIntroPopup;