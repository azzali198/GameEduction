import React from 'react'
import './ChemistryGame.css';

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Shapes from './Shapes.js'
import Carousels from './Carousel.js'
import ElementsTable from './ElementsTable.js'
import { useSelector, useDispatch } from 'react-redux'
import { increment, selectScore, initialize, clearDropResults, resetScore } from './ScoreSlice'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import congrats from '../../images/congratulations-7600.gif'
import Swal from "sweetalert2";
import { getChemistryQuestionsCount, getChemistryQuestionByIndex } from '../../services/importChemistryXmlService';
import ChemistryGameIntroPopup from '../IntroductionChemistryPopup/ChemistryGameIntroPopup';
import einsteinImg from '../../assets/images/BtnDemoImgs/einsteinCongratulate.png';
import { addConnection } from '../../services/score';

const ChemistryGame = () => {
    const score = useSelector(selectScore)
    const [result, setResult] = React.useState(1);
    const Dispatch = useDispatch();
    const period = React.useMemo(() => { return Date.now() + 20000 }, [])
    const counterRef = React.useRef();
    const congratsTimeoutRef = React.useRef(null);
    const isFetchingQuestionRef = React.useRef(false);
    const [questionsCount, setQuestionsCount] = React.useState(0);
    const [question, setQuestion] = React.useState("");
    const [chemicalData, setChemicalData] = React.useState([]);
    const [title, setTitle] = React.useState("");
    const [questionsIndex, setQuestionsIndex] = React.useState([]);
    const [showIntro, setShowIntro] = React.useState(true);
    const [chronoActive, setChronoActive] = React.useState(true);
    const chronoRef = React.useRef();
    const [chrono, setChrono] = React.useState(30); // Start from 30 seconds
    const [scoreTotal, setScoreTotal] = React.useState(0);

    // chronometer display component
    const CartoonChrono = ({ seconds }) => (
        <div
            style={{
                position: 'relative',

                left: '10%',
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

    // Fetch a chemistry question by selecting a random unused index.
    // This function uses the component state for `questionsIndex` so callers should not pass a
    // stale array. To reset the seen questions, call `setQuestionsIndex([])` before calling this.
    const fetchAndSetRandomQuestion = async () => {
        // prevent concurrent fetches which can cause duplicate state updates
        if (isFetchingQuestionRef.current) return;
        isFetchingQuestionRef.current = true;
        try {
            Dispatch(resetScore());

            const countResp = await getChemistryQuestionsCount();
            const total = countResp.data;
            setQuestionsCount(total);

        // If all questions have been used, show Game Over
        if (questionsIndex.length >= total) {
            Swal.fire({
                icon: 'info',
                title: 'Game Over',
                text: 'All questions have been answered!',
                showCancelButton: true,
                confirmButtonText: 'Play Again',
                cancelButtonText: 'Exit to Home'
            }).then((res) => {
                if (res.isConfirmed) {
                    // reset seen questions and start over
                    setQuestionsIndex([]);
                    setScoreTotal(0);
                    setChrono(30);
                    setChronoActive(true);
                    setTimeout(() => {
                        fetchAndSetRandomQuestion();
                    }, 0);
                } else {
                    window.location.href = '/';
                }
            });
            return;
        }

        // pick a random unused index
        let randomIndex = null;
        let attempts = 0;
        do {
            randomIndex = Math.floor(Math.random() * total);
            attempts++;
            if (attempts > 1000) break; // safety in case something goes wrong
        } while (questionsIndex.includes(randomIndex));

        // Add to seen list using functional update to avoid stale state races
        setQuestionsIndex(prev => [...prev, randomIndex]);

    const qResp = await getChemistryQuestionByIndex(randomIndex);
        if (qResp.data) {
            setQuestion(qResp.data.Definition || "");
            const chemData = [];
            (qResp.data.ChemicalData || '').split(';').forEach(row => {
                if (row) chemData.push(row.split(','));
            });
            setResult(qResp.data.RightResponse || 0);
            setChemicalData(chemData);
            // Replace /sub with <sub> and sub/ with </sub> in ResponseText
            const formattedResponseText = (qResp.data.ResponseText || '')
                .replace(/\/sub/g, '<sub>')
                .replace(/sub\//g, '</sub>');
            setTitle(formattedResponseText || "");
    }
    } finally {
            isFetchingQuestionRef.current = false;
        }
    };

    // (fetching flag is cleared at the end of the function; callers are also guarded)

    React.useEffect(() => {
        if (!chronoActive) return;
        chronoRef.current = setInterval(() => {
            setChrono((prev) => {
                if (prev > 0) {
                    return prev - 1;
                } else {
                    clearInterval(chronoRef.current);
                    // When time is out and answer is not correct, show alert and fetch next question
                    if (score !== result) {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Time is out!',
                            text: 'You did not answer in time.',
                            confirmButtonText: 'OK'
                        }).then(() => {
                            fetchAndSetRandomQuestion();
                            setChrono(30);         // Reinitialize to 30 seconds
                            setChronoActive(true); // Start chronometer

                        });
                    }
                    return 0;
                }
            });
        }, 1000);
        return () => clearInterval(chronoRef.current);
    }, [chronoActive, score, result, chrono]);

    const resetChronometer = () => {
        setChrono(30); // Reset to 30 seconds
        setChronoActive(false);
        if (chronoRef.current) {
            clearInterval(chronoRef.current);
        }
    };
    React.useEffect(() => {
        // fetchAndSetRandomQuestion();
    }, [questionsIndex]);

    React.useEffect(() => {
        if (score === 0) {
            fetchAndSetRandomQuestion();
        }

        if (score === result) {
                // increment total score and record connection immediately (use functional update to avoid
                // triggering this effect again due to scoreTotal change)
                setScoreTotal(prev => prev + 1);
            addConnection(
                sessionStorage.getItem('userName'),
                "", // Use chronometer value instead of counter
                String(scoreTotal + 1), // Set actual chemistry score if available
                new Date().toISOString().slice(0, 10)
            );

            // Stop the chronometer so it stops decrementing when the user answers correctly
            if (chronoRef.current) {
                clearInterval(chronoRef.current);
                chronoRef.current = null;
            }
            setChronoActive(false);

            // Delay the congratulations popup by 10 seconds
            // Use a ref to clear the timeout if component unmounts or score changes
            if (!congratsTimeoutRef.current) {
                // schedule the congratulations popup 10 seconds later
                congratsTimeoutRef.current = setTimeout(() => {
                    Swal.fire({
                        title: 'Congratulations!',
                        showConfirmButton: false,
                        timer: 5000,
                        backdrop: `
                                    rgba(0,0,123,0.4)
                                    url(${congrats})
                                    center / cover
                                    no-repeat
                                    `,
                        html: `
                                <div style="display:flex; flex-direction:column; align-items:center;">
                                <img src="${einsteinImg}" alt="Einstein" style="width:120px; margin-bottom:16px;" />
                                <div>${title}</div>
                                </div>
                      `,
                        customClass: {
                            popup: 'congrats-popup'
                        }
                    }).then(() => {
                        Dispatch(initialize())
                        Dispatch(clearDropResults());
                        setChemicalData([]);
                        fetchAndSetRandomQuestion();
                        setChrono(30);         // Reinitialize to 30 seconds
                        setChronoActive(true); // Start chronometer

                    });
                    congratsTimeoutRef.current = null;
                }, 2000);
            }
        }
    
        // cleanup for delayed congrats popup
    return () => {
        if (congratsTimeoutRef.current) {
            clearTimeout(congratsTimeoutRef.current);
            congratsTimeoutRef.current = null;
        }
    };
    }, [score, result])
    const onCompletePeriod = () => { }
    const onTickCounter = () => { }
    const onStopCounter = () => { }

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="chemistry-game-container">
                {showIntro && (
                    <ChemistryGameIntroPopup
                        onClose={() => {
                            setShowIntro(false);
                            setChrono(30);         // Reinitialize to 30 seconds
                            setChronoActive(true); // Start chronometer
                        }}
                    />
                )}
                <Row>
                    <Col xs={12}>
                        <div className="question-container">
                            <h4 className="question-text">{question}</h4>
                        </div>
                    </Col>
                </Row>
                <Row>
                    {/* Chronometer centered horizontally in the row */}
                    <Col xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                        {/* Always display the chronometer UI. chronoActive controls whether it decrements. */}
                        <CartoonChrono seconds={chrono} />
                    </Col>
                </Row>

                <Row>
                    <Col xs={12}>
                        <div
                            className="shapes-container"
                        >
                            <Shapes className="shape" Data={chemicalData} />
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col xs={12}>
                        <div className="carousel-container">
                            <Carousels />
                        </div>
                    </Col>
                </Row>
            </div>
        </DndProvider>
    );
    /* <Row >
     <ElementsTable />
 </Row>*/
}

export default ChemistryGame;
