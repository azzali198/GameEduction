import React from 'react';
import './Quiz.css';

const baseButtonClass = 'quiz-answer_btn';
const correctClass = 'quiz-answer_btn correct';
const wrongClass = 'quiz-answer_btn incorrect';

const QuizModal = (props) => {
    const [firstButtonClassCss, setFirstButtonClassCss] = React.useState(baseButtonClass);
    const [secondButtonClassCss, setSecondButtonClassCss] = React.useState(baseButtonClass);
    const [thirdButtonClassCss, setThirdButtonClassCss] = React.useState(baseButtonClass);
    const [disableButton, setDisableButton] = React.useState(false);
    const [rightResponse, setRightResponse] = React.useState(false);

    const handleButtonClick = (index) => {
        const isCorrect = props.items[index] === props.response;
        if (index === 0) setFirstButtonClassCss(isCorrect ? correctClass : wrongClass);
        if (index === 1) setSecondButtonClassCss(isCorrect ? correctClass : wrongClass);
        if (index === 2) setThirdButtonClassCss(isCorrect ? correctClass : wrongClass);
        setDisableButton(true);
        setRightResponse(isCorrect);
        props.onClickButton();
        // Call onCloseQuiz with rightResponse value after a delay
        setTimeout(() => {
            props.onCloseQuiz?.(isCorrect);
        }, 1400);
    };

    return (
        <div className="quiz-modal_overlay">
            <div className="quiz-modal_panel">
                <img src={props.image} alt="quiz-question" className="quiz-modal_image" />
                <h3>{props.question}</h3>
                <div className="grid grid-cols-1 gap-3">
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
