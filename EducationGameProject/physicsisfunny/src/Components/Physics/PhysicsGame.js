import React, { useState, useEffect, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { importAllImages } from '../../utils/imageLoader';
import image1 from '../../images/formule1.png'
import { ReactComponent as IMG } from '../../images/formule1.svg'
import { ReactComponent as STR } from '../../images/START.svg'
import { ReactComponent as FN } from '../../images/FINISH.svg'
import { ReactComponent as CD } from '../../images/formule2.svg'
import Button from 'react-bootstrap/Button';
import SpinningWheel from './SpinWheel'
import QuizModal from './Quiz'
import ImageButton from 'react-image-button';
import GameIntroPopup from '../IntroductionPopup/GameIntroPopup';
import './PhysicsGame.css'
import { countQuestionsByBranch, getQuestionByBranchAndIndex } from '../../services/getQuestionsService';
import Swal from 'sweetalert2';
import einsteinImg from '../../assets/images/BtnDemoImgs/einsteinCongratulate.png';
import congrats from '../../images/congratulations-7600.gif'
import { addConnection } from '../../services/score';

const CartoonChrono = ({ seconds }) => (
  <div
    style={{
      position: 'absolute',
      top: '120px', // Move chrono down from the very top
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 100,
      background: '#ffe066',
      border: '4px solid #ff9800',
      borderRadius: '50px',
      padding: '10px 32px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      fontFamily: 'Comic Sans MS, Comic Sans, cursive',
      fontSize: '2rem',
      color: '#ff5722',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      width: 'fit-content',
      justifyContent: 'center'
    }}
  >
    <span>
      {String(Math.floor(seconds / 3600)).padStart(2, '0')}:
      {String(Math.floor((seconds % 3600) / 60)).padStart(2, '0')}:
      {String(seconds % 60).padStart(2, '0')}
    </span>
  </div>
);

const Physics = () => {
  const [displayWheel, setDisplayWheel] = useState(false);
  const [displayQuiz, setDisplayQuiz] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [questionsCount, setQuestionsCount] = useState(0);
  const [chrono, setChrono] = useState(0);
  const [chronoActive, setChronoActive] = useState(false);
  const chronoRef = useRef();
  const onFinishHandler = (chosen) => { return new Promise(resolve => setTimeout(resolve, 1000)).then(() => { setChos(chosen); setDisplayWheel(false); setDisplayQuiz(true); }); }
  const onClickButtonHandler = () => { return new Promise(resolve => setTimeout(resolve, 1400)).then(() => { setDisplayQuiz(false); }); }
  const [propositions, setPropositions] = useState(['Albert Einstein', 'Isaac Newton', 'Thoms Edison']);
  const [rightResponse, setRightResponse] = useState("");
  const [image, setImage] = useState("");
  const [counter, setCounter] = useState(0);
  const [chos, setChos] = useState('');
  const [winner, setWinner] = useState(false);
  const [question, setQuestion] = useState('');
  const API_URL = (process.env.REACT_APP_API_URL || 'https://localhost:5001').replace(/\/api$/, '');
  const [quizQuestions, setQuizQuestions] = useState([]);
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
    "② Relativity": 2,
    "③ Thermodynamics": 3,
    "④ Optic": 4,
    "⑤ Electromagnetism": 5
  };
  const branchs = {

    "⓪ Modern Physics": "Modern Physics",
    "① Mechanics": "Mechanics",
    "② Relativity": "Relativity",
    "③ Thermodynamics": "Thermodynamics",
    "④ Optic": "Optics",
    "⑤ Electromagnetism": "Electromagnetism"
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
    width: '160px'
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

  useEffect(() => {
    // Fetch number of physics questions when the page is displayed
    const fetchQuestionsCount = async () => {
      try {
        const response = await countQuestionsByBranch();
        setQuestionsCount(response.data);
        setQuizQuestions([]);
      } catch (error) {
        setQuestionsCount(0);
      }
    };
    fetchQuestionsCount();
  }, [showIntro]);

  useEffect(() => {
    // When wheel spinner is hidden, fetch a question by branch and index
    if (!displayWheel && chos && questionsCount[branchs[chos]?.replace(/\s+/g, '').toLowerCase()] > 0 && counter <= 58) {

      const fetchQuestion = async () => {

        var randomIndex = Math.floor(Math.random() * questionsCount[branchs[chos]?.replace(/\s+/g, '').toLowerCase()]);
        while (quizQuestions.includes(chos + '-' + randomIndex)) {
          // Get a random index between 0 and questionsCount - 1
          randomIndex = Math.floor(Math.random() * questionsCount[branchs[chos]?.replace(/\s+/g, '').toLowerCase()]);
        }
        if (displayQuiz) {
          setQuizQuestions(prev => [...prev, chos + '-' + randomIndex]);

          try {

            const response = await getQuestionByBranchAndIndex(branchs[chos]?.replace(/\s+/g, ''), randomIndex);
            setPropositions([response.data.ResponseAEn, response.data.ResponseBEn, response.data.ResponseCEn]);
            setRightResponse(response.data.RightResponseEn);
            setImage(API_URL + '/Files/' + branchs[chos] + '/' + response.data.Image + '.png');

            // Do something with response.data (e.g., setQuestion, setOptions, etc.)
            setQuestion(response.data.QuestionEn);
            console.log('Fetched question:', response.data);

          } catch (error) {
            console.error('Error fetching question:', error);
          }
        }
      };
      fetchQuestion();
    }

    else {
      setPropositions([]);
      setRightResponse(null);
      setImage(null);
      setQuestion(null);
      //setChos(null);
    }
  }, [displayWheel, chos, displayQuiz]);
  useEffect(() => {
    if (counter > 58) {
      addConnection(
        sessionStorage.getItem('userName'),
        String(chrono), // Use chronometer value instead of counter
        null, // Set actual chemistry score if available
        new Date().toISOString().slice(0, 10)
      );
      Swal.fire({
        title: 'Congratulations!',
        backdrop: `
      rgba(0,0,123,0.4)
      url(`+ congrats + `)
       center / cover
      no-repeat
      `,
        html: `
        <div style="display:flex; flex-direction:column; align-items:center;">
          <img src="${einsteinImg}" alt="Einstein" style="width:120px; margin-bottom:16px;" />
          <div>You've completed the Physics Game!<br>Do you want to replay?</div>
        </div>
      `,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        customClass: {
          popup: 'congrats-popup'
        }
      }).then(async (result) => {
        // Call addConnection service here


        if (result.isConfirmed) {

          resetChronometer();
          setWinner(true);
          setCounter(0);
          setPropositions([]);
          setRightResponse(null);
          setImage(null);
          setQuestion(null);
          setChos(null);
          setQuizQuestions([]);
          setChronoActive(true);


        } else {



          // Navigate to home page
          window.location.href = '/';
        }
      });
    }
  }, [counter])
  useEffect(() => {
    chronoRef.current = setInterval(() => {
      setChrono((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(chronoRef.current);
  }, [counter]);
  // Add this function inside your Physics component
  const resetChronometer = () => {
    setChrono(0);
    setChronoActive(false);
    if (chronoRef.current) {
      clearInterval(chronoRef.current);
    }
  };
  return (
    <div className="physics-game-wrapper">
      {/* Chronometer centered horizontally at the top */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        {chronoActive && <CartoonChrono seconds={chrono} />}
      </div>
      <br /><br /><br /><br />
      {showIntro && (
        <GameIntroPopup
          onClose={() => {
            setShowIntro(false);
            setChronoActive(true); // Start chronometer when intro modal closes
          }}
        />
      )}
      <div style={{ position: 'relative' }}>
        <Container style={{ paddingTop: '3px', paddingBottom: '3px' }}>
          <Row>
            {renderGameCell('start.png', counter === 0)}
            {renderGameCell('2.png', counter === 1)}
            {renderGameCell('3.png', counter === 2)}
            {renderGameCell('4.png', counter === 3)}
            {renderGameCell('5.png', counter === 4)}
            {renderGameCell('6.png', counter === 5)}
            {renderGameCell('7.png', counter === 6)}
            {renderGameCell('8.png', counter === 7)}
            {renderGameCell('9.png', counter === 8)}

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
            {renderGameCell('10.png', counter === 9)}
          </Row>
          <Row>
            {renderGameCell('11.png', counter === 18)}
            {renderGameCell('12.png', counter === 17)}
            {renderGameCell('13.png', counter === 16)}
            {renderGameCell('14.png', counter === 15)}
            {renderGameCell('15.png', counter === 14)}
            {renderGameCell('16.png', counter === 13)}
            {renderGameCell('17.png', counter === 12)}
            {renderGameCell('18.png', counter === 11)}
            {renderGameCell('19.png', counter === 10)}

          </Row>
          <Row>
            {renderGameCell('20.png', counter === 19)}
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

            {renderGameCell('21.png', counter === 20)}
            {renderGameCell('22.png', counter === 21)}
            {renderGameCell('23.png', counter === 22)}
            {renderGameCell('24.png', counter === 23)}
            {renderGameCell('25.png', counter === 24)}
            {renderGameCell('26.png', counter === 25)}
            {renderGameCell('27.png', counter === 26)}
            {renderGameCell('28.png', counter === 27)}
            {renderGameCell('29.png', counter === 28)}

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
            {renderGameCell('30.png', counter === 29)}
          </Row>
          <Row>

            {renderGameCell('31.png', counter === 38)}
            {renderGameCell('32.png', counter === 37)}
            {renderGameCell('33.png', counter === 36)}
            {renderGameCell('34.png', counter === 35)}
            {renderGameCell('35.png', counter === 34)}
            {renderGameCell('36.png', counter === 33)}
            {renderGameCell('37.png', counter === 32)}
            {renderGameCell('38.png', counter === 31)}
            {renderGameCell('39.png', counter === 30)}

          </Row>
          <Row>
            {renderGameCell('40.png', counter === 39)}
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

            {renderGameCell('41.png', counter === 40)}
            {renderGameCell('42.png', counter === 41)}
            {renderGameCell('43.png', counter === 42)}
            {renderGameCell('44.png', counter === 43)}
            {renderGameCell('45.png', counter === 44)}
            {renderGameCell('46.png', counter === 45)}
            {renderGameCell('47.png', counter === 46)}
            {renderGameCell('48.png', counter === 47)}
            {renderGameCell('49.png', counter === 48)}

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
            {renderGameCell('50.png', counter === 49)}
          </Row>
          <Row>

            {renderGameCell('finish.png', counter === 58)}
            {renderGameCell('52.png', counter === 57)}
            {renderGameCell('53.png', counter === 56)}
            {renderGameCell('54.png', counter === 55)}
            {renderGameCell('55.png', counter === 54)}
            {renderGameCell('56.png', counter === 53)}
            {renderGameCell('57.png', counter === 52)}
            {renderGameCell('58.png', counter === 51)}
            {renderGameCell('60.png', counter === 50)}


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
              setDisplayQuiz(false);
              if (isCorrect) setCounter(counter + segmentMap[chos]);
            }}
            items={propositions}
            image={image}
            response={rightResponse}
            question={question}
          />
        )}
      </div>
    </div>
  )

}


export default Physics;