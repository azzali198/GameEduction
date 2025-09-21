import React from 'react';



const modalOverlayClasses = 'fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'
const modalContentClasses = 'bg-white w-full max-w-md p-6 rounded-lg shadow-lg'
const buttonClasses = 'bg-blue-500 text-white p-4 rounded-lg border border-primary hover:bg-blue-500/80'
const rightResponseClass = 'bg-green-500 text-white p-4 rounded-lg border border-green-500'
const wrongResponseClass = 'bg-red-500 text-white p-4 rounded-lg border border-red-500'

const QuizModal = (props) => {
    const [firstButtonClassCss, setFirstButtonClassCss] = React.useState(buttonClasses);
    const [secondButtonClassCss, setSecondButtonClassCss] = React.useState(buttonClasses);
    const [thirdButtonClassCss, setThirdButtonClassCss] = React.useState(buttonClasses);
    const [disableButton, setDisableButton] = React.useState(false);
    const [rightResponse, setRightResponse] = React.useState(false);

    const handleButtonClick = (index) => {
        const isCorrect = props.items[index] === props.response;
        if (index === 0) setFirstButtonClassCss(isCorrect ? rightResponseClass : wrongResponseClass);
        if (index === 1) setSecondButtonClassCss(isCorrect ? rightResponseClass : wrongResponseClass);
        if (index === 2) setThirdButtonClassCss(isCorrect ? rightResponseClass : wrongResponseClass);
        setDisableButton(true);
        setRightResponse(isCorrect);
        props.onClickButton();
        // Call onCloseQuiz with rightResponse value after a delay
        setTimeout(() => {
            props.onCloseQuiz?.(isCorrect);
        }, 1400);
    };

    return (
        <div className={modalOverlayClasses} >
            <div className={modalContentClasses}>
                <img src={props.image} alt="quiz-question" className="mb-4 rounded-lg" />
                <h3 className="text-2xl font-bold text-center mb-4">{props.question}</h3>
                <div className="grid grid-cols-1 gap-4">
                    <button 
                        className={firstButtonClassCss} 
                        onClick={() => handleButtonClick(0)} 
                        disabled={disableButton}
                    >
                        {props.items[0]}
                    </button>
                    <button 
                        className={secondButtonClassCss} 
                        onClick={() => handleButtonClick(1)} 
                        disabled={disableButton}
                    >
                        {props.items[1]}
                    </button>
                    <button 
                        className={thirdButtonClassCss} 
                        onClick={() => handleButtonClick(2)} 
                        disabled={disableButton}
                    >
                        {props.items[2]}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuizModal;