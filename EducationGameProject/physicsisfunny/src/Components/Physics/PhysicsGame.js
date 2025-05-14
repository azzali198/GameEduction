import React,{useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { importAllImages } from '../../utils/imageLoader';
import image1  from '../../images/formule1.png'
import {ReactComponent as IMG}  from '../../images/formule1.svg'
import {ReactComponent as STR}  from '../../images/START.svg'
import {ReactComponent as FN}  from '../../images/FINISH.svg'
import {ReactComponent as CD}  from '../../images/formule2.svg'
import Button from 'react-bootstrap/Button';
import SpinningWheel from './SpinWheel'
import QuizModal from './Quiz'
import ImageButton from 'react-image-button';
import GameIntroPopup from './GameIntroPopup';
import  './PhysicsGame.css'

const Physics =  () => {
const [displayWheel,setDisplayWheel] = useState(false);
const [displayQuiz, setDisplayQuiz] = useState(false);
const [showIntro, setShowIntro] = useState(true);
const onFinishHandler = (chosen) => {return new Promise(resolve => setTimeout(resolve,1000)).then(() => {setChos(chosen);setDisplayWheel(false);setDisplayQuiz(true);});}
const onClickButtonHandler = () => {return new Promise(resolve => setTimeout(resolve,1400)).then(() => {setDisplayQuiz(false); });}
const propositions = ['Albert Einstein', 'Isaac Newton', 'Thoms Edison']
const rightResponse = 0;
const [counter, setCounter] = useState(0);
const [chos ,setChos] = useState('');
const [winner, setWinner] = useState(false);
const buttonGame = {
  padding: '0px',
  border: '2px solid blue',
};
// Import all images from BtnImgs directory
const gameImages = importAllImages(
  require.context('../../assets/images/BtnImgs', true, /\.(png|jpe?g|svg)$/)
);
       const segmentMap = {
        "⓪ Modern Physics": 0,
        "① Mechanics": 1,
        "② Quantic Physics": 2,
        "③ Thermodynamics": 3,
        "④ Optic": 4,
        "⑤ Gravity": 5
    };
const buttonStyle = {
  width: '100%',
  height: '100%',
  padding: '0',
  borderRadius: '0px',
  overflow: 'hidden', // Prevent image overflow
  display: 'flex', // Enable flex layout
  alignItems: 'center',
  justifyContent: 'center',
  width:'160px'
};

const imageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover', // Make image cover the entire space
  display: 'block' // Remove extra space below image
};

  // Update renderGameCell to use dynamic images
  const renderGameCell = (imageName, isActive) => {
    return (
        <Col >
            <Button

                disabled={!isActive}
                className={`game-cell ${isActive ? 'game-cell-active' : 'game-button'}`}
                onClick={() => {
                    if (isActive) {
                        setDisplayWheel(true);
                    }
                }}
            >
                <img 
                    src={gameImages[imageName]} 
                    alt={imageName}
                    className="cell-image"
                />
            </Button>
        </Col>
    );
};

  // Update empty cells
  const renderEmptyCell = () => (
    <Col />
  );

return (
  <div className="physics-game-wrapper">
    {showIntro && <GameIntroPopup onClose={() => setShowIntro(false)} />}
    <div style={{ position: 'relative' }}>
      <Container style={{paddingTop:'3px',paddingBottom:'3px'}}>
        <Row>
          {renderGameCell('65.png', counter === 0)}
          {renderGameCell('66.png', counter === 1)} 
          {renderGameCell('62.png', counter === 2)}
          {renderGameCell('1.png', counter === 3)}
          {renderGameCell('2.png', counter === 4)}
          {renderGameCell('3.png', counter === 5)}
          {renderGameCell('4.png', counter === 6)}
          {renderGameCell('5.png', counter === 7)}
          {renderGameCell('6.png', counter === 8)}
        
        </Row>
        <Row>
        
          {renderEmptyCell()}
          {renderEmptyCell()}
          {renderEmptyCell()}
          {renderEmptyCell()}
          {renderEmptyCell()}
          {renderEmptyCell()}
          {renderEmptyCell()}
          {renderEmptyCell()}
         {renderGameCell('7.png', counter === 9)}
        </Row>
        <Row>
        {renderGameCell('8.png', counter === 18)}
         {renderGameCell('9.png', counter === 17)}
         {renderGameCell('10.png', counter === 16)}
         {renderGameCell('11.png', counter === 15)}
         {renderGameCell('12.png', counter === 14)}
         {renderGameCell('13.png', counter === 13)}
         {renderGameCell('14.png', counter === 12)}
         {renderGameCell('15.png', counter === 11)}
          {renderGameCell('15.png', counter === 10)}
      
        </Row>
        <Row>
       {renderGameCell('16.png', counter === 19)}
          {renderEmptyCell()}
          {renderEmptyCell()}
          {renderEmptyCell()}
          {renderEmptyCell()}
          {renderEmptyCell()}
          {renderEmptyCell()}
          {renderEmptyCell()}
          {renderEmptyCell()}
  
        </Row>
        <Row>
      
         {renderGameCell('18.png', counter === 20)}
         {renderGameCell('19.png', counter === 21)}
         {renderGameCell('20.png', counter === 22)}
         {renderGameCell('21.png', counter === 23)}
         {renderGameCell('22.png', counter === 24)}
         {renderGameCell('23.png', counter === 25)}
         {renderGameCell('24.png', counter === 26)}
          {renderGameCell('17.png', counter === 27)}
           {renderGameCell('17.png', counter === 28)}
  
        </Row>
        <Row>
  
          {renderEmptyCell()}
          {renderEmptyCell()}
          {renderEmptyCell()}
          {renderEmptyCell()}
          {renderEmptyCell()}
          {renderEmptyCell()}
          {renderEmptyCell()}
          {renderEmptyCell()}
         {renderGameCell('25.png', counter === 29)}
        </Row>
        <Row>
  
         {renderGameCell('28.png', counter === 38)}
         {renderGameCell('29.png', counter === 37)}
         {renderGameCell('30.png', counter === 36)}
         {renderGameCell('31.png', counter === 35)}
         {renderGameCell('32.png', counter === 34)}
         {renderGameCell('33.png', counter === 33)}
         {renderGameCell('26.png', counter === 32)}
         {renderGameCell('27.png', counter === 31)}
        {renderGameCell('27.png', counter === 30)}
  
        </Row>
        <Row>
       {renderGameCell('34.png', counter === 39)}
          {renderEmptyCell()}
          {renderEmptyCell()}
          {renderEmptyCell()}
          {renderEmptyCell()}
          {renderEmptyCell()}
          {renderEmptyCell()}
          {renderEmptyCell()}
          {renderEmptyCell()}
  
        </Row>
        <Row>
       
         {renderGameCell('37.png', counter === 39)}
         {renderGameCell('38.png', counter === 40)}
         {renderGameCell('39.png', counter === 41)}
         {renderGameCell('40.png', counter === 42)}
         {renderGameCell('41.png', counter === 43)}
         {renderGameCell('42.png', counter === 44)}
         {renderGameCell('35.png', counter === 45)}
         {renderGameCell('36.png', counter === 46)}
          {renderGameCell('36.png', counter === 47)}
  
        </Row>
        <Row>
  
          {renderEmptyCell()}
          {renderEmptyCell()}
          {renderEmptyCell()}
          {renderEmptyCell()}
          {renderEmptyCell()}
          {renderEmptyCell()}
          {renderEmptyCell()}
           {renderEmptyCell()}
         {renderGameCell('43.png', counter === 48)}
        </Row>
        <Row>
        
         {renderGameCell('46.png', counter === 57)}
         {renderGameCell('46.png', counter === 56)}
         {renderGameCell('47.png', counter === 55)}
         {renderGameCell('48.png', counter === 54)}
         {renderGameCell('49.png', counter === 53)}
         {renderGameCell('50.png', counter === 52)}
         {renderGameCell('68.png', counter === 51)}
         {renderGameCell('44.png', counter === 50)}
         {renderGameCell('45.png', counter === 49)}
         
  
        </Row>
      </Container>
      
      {displayWheel && (
        <div className="wheel-overlay">
          <SpinningWheel 
            isDisplayed={displayWheel} 
            onFinishing={onFinishHandler}
          />
        </div>
      )}
      
      {displayQuiz && (
        <QuizModal 
          onClickButton={onClickButtonHandler}
          onCloseQuiz={(isCorrect) => {
              // Handle the quiz result here
              console.log('Quiz completed with result:', isCorrect);           
              setDisplayQuiz(false);
              if(isCorrect) setCounter(counter + segmentMap[chos]);
          }}
          items={propositions} 
          response={rightResponse}
        />
      )}
    </div>
  </div>
)

}


export default Physics;