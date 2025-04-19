import React from 'react';

import image1 from '../../images/M1259.png'

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
    const [rightResponse ,setRightResponse] = React.useState(false);

    return (
        <div className={modalOverlayClasses}  style= {{backgroundImage : rightResponse ? 'url(' + require('../../images/congratulations-7600.gif') + ')' : null}}>
            <div className={modalContentClasses}>
                <img src={image1} alt="quiz-question" className="mb-4 rounded-lg" />
                <h3 className="text-2xl font-bold text-center mb-4">Who is the scientist that discovered the law of gravity?</h3>
                <div className="grid grid-cols-1 gap-4">
                    <button className={firstButtonClassCss} onClick={() => { if (props.items[0] === props.items[props.response]) { setFirstButtonClassCss(rightResponseClass); setRightResponse(true) } else { setFirstButtonClassCss(wrongResponseClass) } setDisableButton(true);props.onClickButton(); }} disabled={disableButton}>{props.items[0]}</button>
                    <button className={secondButtonClassCss} onClick={() => { if (props.items[1] === props.items[props.response]) { setSecondButtonClassCss(rightResponseClass) ; setRightResponse(true)} else { setSecondButtonClassCss(wrongResponseClass) } setDisableButton(true);props.onClickButton(); }} disabled={disableButton}>{props.items[1]}</button>
                    <button className={thirdButtonClassCss} onClick={() => { if (props.items[2] === props.items[props.response]) { setThirdButtonClassCss(rightResponseClass); setRightResponse(true) } else { setThirdButtonClassCss(wrongResponseClass) } setDisableButton(true);props.onClickButton(); }} disabled={disableButton}>{props.items[2]}</button>
                </div>
            </div>
        </div>
    )
}

export default QuizModal