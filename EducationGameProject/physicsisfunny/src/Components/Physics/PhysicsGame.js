import React,{useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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

const renderGameCell = () => (
  <Col style={buttonGame}>
    <Button
      className="game-button"
      style={buttonStyle}
      variant="light"
      onClick={() => setDisplayWheel(true)}
    >
      <img 
        src={image1} 
        alt="Game cell" 
        style={imageStyle}
      />
    </Button>
  </Col>
);

return (<div >

<Container style={{paddingTop:'3px',paddingBottom:'3px'}}>
      <Row>
        <Col style={buttonGame}> <Button style={buttonStyle} variant ='light'  onClick={()=>{setDisplayWheel(true);}}> {<STR />} </Button></Col>
        <Col style={buttonGame}><Button  style={buttonStyle} variant ='light' onClick={()=>{setDisplayWheel(true);}}> {<CD />} </Button></Col>
        {renderGameCell()}
        {renderGameCell()}
        {renderGameCell()}
        {renderGameCell()}
        {renderGameCell()}
        {renderGameCell()}
      
      </Row>
      <Row>
      
        <Col style={{padding:'0px'}}></Col>
        <Col style={{padding:'0px'}}></Col>
        <Col style={{padding:'0px'}}></Col>
        <Col style={{padding:'0px'}}></Col>
        <Col style={{padding:'0px'}}></Col>
        <Col style={{padding:'0px'}}></Col>
        <Col style={{padding:'0px'}}></Col>
       {renderGameCell()}
      </Row>
      <Row>
      {renderGameCell()}
       {renderGameCell()}
       {renderGameCell()}
       {renderGameCell()}
       {renderGameCell()}
       {renderGameCell()}
       {renderGameCell()}
       {renderGameCell()}
    
      </Row>
      <Row>
     {renderGameCell()}
        <Col style={{padding:'0px'}}></Col>
        <Col style={{padding:'0px'}}></Col>
        <Col style={{padding:'0px'}}></Col>
        <Col style={{padding:'0px'}}></Col>
        <Col style={{padding:'0px'}}></Col>
        <Col style={{padding:'0px'}}></Col>
        <Col style={{padding:'0px'}}></Col>

      </Row>
      <Row>
     {renderGameCell()}
       {renderGameCell()}
       {renderGameCell()}
       {renderGameCell()}
       {renderGameCell()}
       {renderGameCell()}
       {renderGameCell()}
       {renderGameCell()}

      </Row>
      <Row>

        <Col style={{padding:'0px'}}></Col>
        <Col style={{padding:'0px'}}></Col>
        <Col style={{padding:'0px'}}></Col>
        <Col style={{padding:'0px'}}></Col>
        <Col style={{padding:'0px'}}></Col>
        <Col style={{padding:'0px'}}></Col>
        <Col style={{padding:'0px'}}></Col>
       {renderGameCell()}
      </Row>
      <Row>
     {renderGameCell()}
       {renderGameCell()}
       {renderGameCell()}
       {renderGameCell()}
       {renderGameCell()}
       {renderGameCell()}
       {renderGameCell()}
       {renderGameCell()}

      </Row>
      <Row>
     {renderGameCell()}
        <Col style={{padding:'0px'}}></Col>
        <Col style={{padding:'0px'}}></Col>
        <Col style={{padding:'0px'}}></Col>
        <Col style={{padding:'0px'}}></Col>
        <Col style={{padding:'0px'}}></Col>
        <Col style={{padding:'0px'}}></Col>
        <Col style={{padding:'0px'}}></Col>

      </Row>
      <Row>
     {renderGameCell()}
       {renderGameCell()}
       {renderGameCell()}
       {renderGameCell()}
       {renderGameCell()}
       {renderGameCell()}
       {renderGameCell()}
       {renderGameCell()}

      </Row>
      <Row>

        <Col style={{padding:'0px'}}></Col>
        <Col style={{padding:'0px'}}></Col>
        <Col style={{padding:'0px'}}></Col>
        <Col style={{padding:'0px'}}></Col>
        <Col style={{padding:'0px'}}></Col>
        <Col style={{padding:'0px'}}></Col>
        <Col style={{padding:'0px'}}></Col>
       {renderGameCell()}
      </Row>
      <Row>
        <Col style={buttonGame}><Button style={buttonStyle} variant ='light' onClick={()=>{setDisplayWheel(true);}}> { <FN style={{width:'100%',height:'100%'}}/>} </Button>  </Col>
       {renderGameCell()}
       {renderGameCell()}
       {renderGameCell()}
       {renderGameCell()}
       {renderGameCell()}
       {renderGameCell()}
       {renderGameCell()}

      </Row>
    </Container>
    {displayWheel &&<SpinningWheel isDisplayed={displayWheel} onFinishing= {onFinishHandler}/>}
    {displayQuiz && <QuizModal onClickButton ={onClickButtonHandler} items = {propositions} response ={rightResponse}/>}
</div>)

}


export default Physics;