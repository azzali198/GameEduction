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
import  './PhysicsGame.css'
const Physics =  () => {
const [displayWheel,setDisplayWheel] = useState(false);
const [displayQuiz, setDisplayQuiz] = useState(false);
const onFinishHandler = (chosen) => {return new Promise(resolve => setTimeout(resolve,1000)).then(() => {setDisplayWheel(false);setDisplayQuiz(true);});}
const onClickButtonHandler = () => {return new Promise(resolve => setTimeout(resolve,1400)).then(() => {setDisplayQuiz(false)})}
const propositions = ['Albert Einstein', 'Isaac Newton', 'Thoms Edison']
const rightResponse = 0;
const buttonGame = {
  padding: '0px',
  border: '2px solid blue',
};
// Import all images from BtnImgs directory
const gameImages = importAllImages(
  require.context('../../assets/images/BtnImgs', true, /\.(png|jpe?g|svg)$/)
);
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
  const renderGameCell = (imagePath) => (
    <Col className="game-cell" style={buttonGame}>
      <Button  style={buttonStyle}
        className="game-button"
        variant="light"
        onClick={() => setDisplayWheel(true)}
      >
        <img 
          src={gameImages[imagePath]}
          alt={`Game cell ${imagePath}`}
          className="cell-image"
        />
      </Button>
    </Col>
  );
return (<div >

<Container style={{paddingTop:'3px',paddingBottom:'3px'}}>
      <Row>
        <Col style={buttonGame}> <Button style={buttonStyle} variant ='light'  onClick={()=>{setDisplayWheel(true);}}> {<STR />} </Button></Col>
        {renderGameCell('62.png')}
        {renderGameCell('1.png')}
        {renderGameCell('2.png')}
        {renderGameCell('3.png')}
        {renderGameCell('4.png')}
        {renderGameCell('5.png')}
        {renderGameCell('6.png')}
      
      </Row>
      <Row>
      
        <Col style={{padding:'0px'}}></Col>
        <Col style={{padding:'0px'}}></Col>
        <Col style={{padding:'0px'}}></Col>
        <Col style={{padding:'0px'}}></Col>
        <Col style={{padding:'0px'}}></Col>
        <Col style={{padding:'0px'}}></Col>
        <Col style={{padding:'0px'}}></Col>
       {renderGameCell('7.png')}
      </Row>
      <Row>
      {renderGameCell('8.png')}
       {renderGameCell('9.png')}
       {renderGameCell('10.png')}
       {renderGameCell('11.png')}
       {renderGameCell('12.png')}
       {renderGameCell('13.png')}
       {renderGameCell('14.png')}
       {renderGameCell('15.png')}
    
      </Row>
      <Row>
     {renderGameCell('16.png')}
        <Col style={{padding:'0px'}}></Col>
        <Col style={{padding:'0px'}}></Col>
        <Col style={{padding:'0px'}}></Col>
        <Col style={{padding:'0px'}}></Col>
        <Col style={{padding:'0px'}}></Col>
        <Col style={{padding:'0px'}}></Col>
        <Col style={{padding:'0px'}}></Col>

      </Row>
      <Row>
     {renderGameCell('17.png')}
       {renderGameCell('18.png')}
       {renderGameCell('19.png')}
       {renderGameCell('20.png')}
       {renderGameCell('21.png')}
       {renderGameCell('22.png')}
       {renderGameCell('23.png')}
       {renderGameCell('24.png')}

      </Row>
      <Row>

        <Col style={{padding:'0px'}}></Col>
        <Col style={{padding:'0px'}}></Col>
        <Col style={{padding:'0px'}}></Col>
        <Col style={{padding:'0px'}}></Col>
        <Col style={{padding:'0px'}}></Col>
        <Col style={{padding:'0px'}}></Col>
        <Col style={{padding:'0px'}}></Col>
       {renderGameCell('25.png')}
      </Row>
      <Row>
     {renderGameCell('26.png')}
       {renderGameCell('27.png')}
       {renderGameCell('28.png')}
       {renderGameCell('29.png')}
       {renderGameCell('30.png')}
       {renderGameCell('31.png')}
       {renderGameCell('32.png')}
       {renderGameCell('33.png')}

      </Row>
      <Row>
     {renderGameCell('34.png')}
        <Col style={{padding:'0px'}}></Col>
        <Col style={{padding:'0px'}}></Col>
        <Col style={{padding:'0px'}}></Col>
        <Col style={{padding:'0px'}}></Col>
        <Col style={{padding:'0px'}}></Col>
        <Col style={{padding:'0px'}}></Col>
        <Col style={{padding:'0px'}}></Col>

      </Row>
      <Row>
     {renderGameCell('35.png')}
       {renderGameCell('36.png')}
       {renderGameCell('37.png')}
       {renderGameCell('38.png')}
       {renderGameCell('39.png')}
       {renderGameCell('40.png')}
       {renderGameCell('41.png')}
       {renderGameCell('42.png')}

      </Row>
      <Row>

        <Col style={{padding:'0px'}}></Col>
        <Col style={{padding:'0px'}}></Col>
        <Col style={{padding:'0px'}}></Col>
        <Col style={{padding:'0px'}}></Col>
        <Col style={{padding:'0px'}}></Col>
        <Col style={{padding:'0px'}}></Col>
        <Col style={{padding:'0px'}}></Col>
       {renderGameCell('43.png')}
      </Row>
      <Row>
        <Col style={buttonGame}><Button style={buttonStyle} variant ='light' onClick={()=>{setDisplayWheel(true);}}> { <FN style={{width:'100%',height:'100%'}}/>} </Button>  </Col>
       {renderGameCell('44.png')}
       {renderGameCell('45.png')}
       {renderGameCell('46.png')}
       {renderGameCell('47.png')}
       {renderGameCell('48.png')}
       {renderGameCell('49.png')}
       {renderGameCell('50.png')}

      </Row>
    </Container>
    {displayWheel &&<SpinningWheel isDisplayed={displayWheel} onFinishing= {onFinishHandler}/>}
    {displayQuiz && <QuizModal onClickButton ={onClickButtonHandler} items = {propositions} response ={rightResponse}/>}
</div>)

}


export default Physics;